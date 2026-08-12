"use client";

import React, { useEffect, useRef, useState } from "react";
import {
  Gauge,
  Headphones,
  Pause,
  Play,
  Volume2,
  VolumeX,
} from "lucide-react";

type AudioPlayerProps = {
  audioFileUrl: string;
  blogTitle?: string;
  fileTitle?: string;
};

const AudioPlayer = ({ audioFileUrl, blogTitle, fileTitle }: AudioPlayerProps) => {
  const audioRef = useRef<HTMLAudioElement>(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;

    if (!audio) return;

    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
    };

    const handleLoadedMetadata = () => {
      setDuration(audio.duration);
      setIsReady(Number.isFinite(audio.duration) && audio.duration > 0);
    };

    const handleEnded = () => {
      setIsPlaying(false);
      setCurrentTime(0);
    };

    audio.addEventListener("timeupdate", handleTimeUpdate);
    audio.addEventListener("loadedmetadata", handleLoadedMetadata);
    audio.addEventListener("ended", handleEnded);

    return () => {
      audio.removeEventListener("timeupdate", handleTimeUpdate);
      audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
      audio.removeEventListener("ended", handleEnded);
    };
  }, [audioFileUrl]);

  const togglePlay = async () => {
    const audio = audioRef.current;

    if (!audio) return;

    if (audio.paused) {
      try {
        await audio.play();
        setIsPlaying(true);
      } catch {
        setIsPlaying(false);
      }
    } else {
      audio.pause();
      setIsPlaying(false);
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const audio = audioRef.current;

    if (!audio) return;

    const time = Number(e.target.value);

    audio.currentTime = time;
    setCurrentTime(time);
  };

  const handleVolume = (e: React.ChangeEvent<HTMLInputElement>) => {
    const audio = audioRef.current;

    if (!audio) return;

    const value = Number(e.target.value);

    audio.volume = value;
    setVolume(value);
  };

  const changePlaybackRate = () => {
    const audio = audioRef.current;

    if (!audio) return;

    const rates = [1, 1.25, 1.5, 1.75, 2];
    const currentIndex = rates.indexOf(playbackRate);
    const nextRate = rates[(currentIndex + 1) % rates.length];

    audio.playbackRate = nextRate;
    setPlaybackRate(nextRate);
  };

  const formatTime = (time: number) => {
    if (!Number.isFinite(time)) return "0:00";

    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);

    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  const getStatusText = () => {
    if (!isReady) return "Preparing audio…";
    if (isPlaying) return "Now playing";
    if (currentTime > 0) return "Paused — pick up where you left off";
    return "Press play to start listening";
  };

  const displayTitle = fileTitle || blogTitle || "Article audio";
  const VolumeIcon = volume === 0 ? VolumeX : Volume2;

  return (
    <div className="w-full border border-[#eadcb4] bg-[linear-gradient(180deg,#ffffff_0%,#faf6ec_100%)] p-5 shadow-[0_12px_32px_rgba(0,0,0,0.06)] sm:p-6">
      <audio ref={audioRef} src={audioFileUrl} preload="metadata" className="hidden" />

      <div className="flex flex-col gap-5">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div className="min-w-0 flex-1">
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-[#eadcb4] bg-[#fffaf0] px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-[#8a6b12]">
              <Headphones size={14} />
              Audio version
            </div>

            <h3 className="text-lg font-bold leading-snug text-black sm:text-xl">
              {displayTitle}
            </h3>

            {blogTitle && fileTitle && fileTitle !== blogTitle && (
              <p className="mt-1 text-sm text-black/60"> {blogTitle}</p>
            )}

            <p className="mt-2 max-w-xl text-sm leading-6 text-black/65">
              Prefer listening over reading? Play the audio version of this article at your own pace.
            </p>
          </div>

          <button
            type="button"
            onClick={togglePlay}
            disabled={!isReady && !audioFileUrl}
            className="inline-flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-[#8a6b12] text-white shadow-lg shadow-[#8a6b12]/20 transition hover:bg-[#735a0f] disabled:cursor-not-allowed disabled:opacity-50"
            aria-label={isPlaying ? "Pause audio" : "Play audio"}
          >
            {isPlaying ? <Pause size={22} fill="currentColor" /> : <Play size={22} fill="currentColor" />}
          </button>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs font-medium text-black/50 sm:text-sm">
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(duration)}</span>
          </div>
          <input
            type="range"
            min="0"
            max={duration || 0}
            step="0.1"
            value={currentTime}
            onChange={handleSeek}
            disabled={!isReady}
            className="h-2 w-full cursor-pointer appearance-none rounded-full bg-[#eadcb4] accent-[#8a6b12] disabled:cursor-not-allowed disabled:opacity-50"
            aria-label="Audio progress"
          />
        </div>

        <div className="grid gap-3 sm:grid-cols-[1fr_auto] sm:items-center">
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-2 rounded-xl border border-[#eadcb4] bg-[#fffdf7] px-3 py-2">
              <VolumeIcon size={16} className="shrink-0 text-[#8a6b12]" />
              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={volume}
                onChange={handleVolume}
                className="h-1.5 w-24 cursor-pointer accent-[#8a6b12] sm:w-28"
                aria-label="Volume"
              />
            </div>

            <button
              type="button"
              onClick={changePlaybackRate}
              className="inline-flex items-center gap-1.5 rounded-xl border border-[#eadcb4] bg-white px-3 py-2 text-sm font-semibold text-[#8a6b12] transition hover:bg-[#fffaf0]"
              aria-label={`Playback speed ${playbackRate}x`}
            >
              <Gauge size={15} />
              {playbackRate}x
            </button>
          </div>

          <p className="rounded-xl border border-[#eadcb4] bg-[#fffaf0] px-4 py-2.5 text-sm text-black/70">
            {getStatusText()}
          </p>
        </div>
      </div>
    </div>
  );
};

export default AudioPlayer;
