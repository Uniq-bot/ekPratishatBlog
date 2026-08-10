import path from "path";
import fs from "fs/promises";
import { prisma } from "@/libs/prisma";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const formData = await req.formData();
  const audioFile = formData.get("audioBook") as File | null;

  const allowedExtensions = [".mp3", ".wav", ".m4a", ".ogg", ".aac"];

  if (!audioFile) {
    return new Response(JSON.stringify({ message: "Audio file is required" }), {
      status: 400,
    });
  }

  const extension = path.extname(audioFile.name).toLowerCase();

  if (!allowedExtensions.includes(extension)) {
    return new Response(
      JSON.stringify({ message: "Unsupported audio format" }),
      { status: 400 },
    );
  }

  if (
    !audioFile.type.startsWith("audio/") ||
    !allowedExtensions.includes(extension)
  ) {
    return new Response(
      JSON.stringify({ message: "Only audio files are allowed" }),
      { status: 400 },
    );
  }

  const uploadDir = "/srv/audioBook";

  await fs.mkdir(uploadDir, { recursive: true });

  const fileName = `${Date.now()}-${audioFile.name}`;
  const filePath = path.join(uploadDir, fileName);

  const arrayBuffer = await audioFile.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  await fs.writeFile(filePath, buffer);

  await prisma.audioBook.create({
    data:{
      audioFile: `/audioBook/${fileName}`
    }
  })

  revalidatePath("/admin");

  return NextResponse.json({
    message:"Audio uploaded successfully",
    
  })

}


export async function GET(req:Request){
  try {
    const audioBooks = await prisma.audioBook.findMany();

    return NextResponse.json({
      message:"Audio Books fetched Success",
      data:audioBooks
    })
    
  } catch (error) {
    return NextResponse.json({
      message:"Error fetching audio books",
      error:error
    })
  }
}


