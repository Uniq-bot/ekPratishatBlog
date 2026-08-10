"use client";

import React, { useEffect, useRef, useState } from "react";

type AudioPlayerProps = {
  audioFileUrl: string;
};

const AudioPlayer = ({ audioFileUrl }: AudioPlayerProps) => {
  const audioRef = useRef<HTMLAudioElement>(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [playbackRate, setPlaybackRate] = useState(1);

  useEffect(() => {
    const audio = audioRef.current;

    if (!audio) return;

    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
    };

    const handleLoadedMetadata = () => {
      setDuration(audio.duration);
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
  }, []);

  const togglePlay = () => {
    const audio = audioRef.current;

    if (!audio) return;

    if (audio.paused) {
      audio.play();
      setIsPlaying(true);
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

  return (
    <div className="w-full max-w-2xl  border border-[#e9d7b1] bg-white/95 p-6 shadow-[0_26px_48px_rgba(15,23,42,0.09)] backdrop-blur-sm">
      <audio ref={audioRef} src={audioFileUrl} preload="metadata" className="hidden" />

      <div className="flex flex-col gap-5">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="min-w-0">
            <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-[#fff4dc] px-3 py-2 text-xs font-semibold uppercase tracking-[0.26em] text-[#9b6f1b] shadow-sm shadow-[#f4e5c6]/70">
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-[#f7e5c2] text-[#8a5b0d]">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" className="text-current">
                  <path d="M3 7a9 9 0 0 1 18 0v10a9 9 0 0 1-18 0V7Zm2 0v10a7 7 0 0 0 14 0V7a7 7 0 0 0-14 0Zm8 11a1 1 0 0 0 0-2h-1V8h1a1 1 0 1 0 0-2h-1a3 3 0 0 0-3 3v6a3 3 0 0 0 3 3h1Zm5-6a1 1 0 0 0-1 1 3 3 0 0 1-3 3v2a5 5 0 0 0 5-5 1 1 0 0 0-1-1Z" />
                </svg>
              </span>
              Audio narration
            </div>
            <p className="max-w-xl text-sm leading-6 text-slate-600 sm:text-base">
              Listen to the audio version directly from the blog detail page.
            </p>
          </div>

          <button
            type="button"
            onClick={togglePlay}
            className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-slate-950 text-white shadow-lg shadow-slate-950/10 transition hover:bg-slate-800"
            aria-label={isPlaying ? "Pause audio" : "Play audio"}
          >
            {isPlaying ? (
              <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                <rect x="6" y="5" width="4" height="14" rx="1" />
                <rect x="14" y="5" width="4" height="14" rx="1" />
              </svg>
            ) : (
              <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                <path d="M8 5v14l11-7z" />
              </svg>
            )}
          </button>
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between text-sm text-slate-500">
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
            className="h-2 w-full cursor-pointer appearance-none rounded-full bg-slate-200 accent-slate-950"
            aria-label="Audio progress"
          />
        </div>

        <div className="grid gap-3 sm:grid-cols-[1fr_auto] sm:items-center">
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-2 rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-700">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-slate-600">
                <path d="M11 5 6 9H2v6h4l5 4V5Z" />
              </svg>
              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={volume}
                onChange={handleVolume}
                className="h-1.5 w-28 cursor-pointer accent-slate-950"
                aria-label="Volume"
              />
            </div>

            <button
              type="button"
              onClick={changePlaybackRate}
              className="rounded-2xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
            >
              {playbackRate}x speed
            </button>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-600">
            {isPlaying ? "Playing now" : "Paused"}
            <span className="mx-2 hidden sm:inline">•</span>
            <span>{duration ? "Ready to play" : "Loading audio…"}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AudioPlayer;