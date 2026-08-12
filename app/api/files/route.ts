import { NextResponse } from "next/server";
import path from "path";
import fs from "fs/promises";
import { prisma } from "@/libs/prisma";

const UPLOAD_DIR = "/srv/files";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();

    const fileTitle = formData.get("fileTitle");
    const blogId = formData.get("blogId");
    const file = formData.get("file");

    if (typeof fileTitle !== "string" || !fileTitle.trim()) {
      return NextResponse.json(
        { message: "File title is required" },
        { status: 400 },
      );
    }

    if (blogId !== null && typeof blogId !== "string") {
      return NextResponse.json(
        { message: "Invalid blog ID" },
        { status: 400 },
      );
    }

    const normalizedBlogId = typeof blogId === "string" ? blogId.trim() || null : null;

    if (normalizedBlogId) {
      const blogExists = await prisma.blogPost.findUnique({
        where: { id: normalizedBlogId },
      });

      if (!blogExists) {
        return NextResponse.json(
          { message: "Blog post not found" },
          { status: 404 },
        );
      }
    }

    if (normalizedBlogId) {
      const blogHasAudio = await prisma.fileSystem.findFirst({
        where: {
          blogPostId: normalizedBlogId,
          fileType: "AUDIO",
        },
      });

      if (blogHasAudio) {
        const filePath = resolveStoredFilePath(blogHasAudio.url);

        await fs.unlink(filePath).catch(() => {});

        await prisma.fileSystem.delete({
          where: {
            id: blogHasAudio.id,
          },
        });
      }
    }

    if (!(file instanceof File)) {
      return NextResponse.json(
        { message: "File is required" },
        { status: 400 },
      );
    }

    const fileType = getType(file);
    const safeTitle = sanitizeFileTitle(fileTitle);
    const { filePath, url, filename } = await getFileURL({
      file,
      fileTitle: safeTitle,
    });

    await fs.mkdir(path.dirname(filePath), { recursive: true });
    await fs.writeFile(filePath, Buffer.from(await file.arrayBuffer()));

    try {
      await prisma.fileSystem.create({
        data: {
          fileName: filename,
          originalName: safeTitle,
          url,
          fileType,
          mimeType: file.type,
          fileSize: file.size,
          blogPostId: normalizedBlogId,
        },
      });

    } catch (error) {
      await fs.unlink(filePath).catch(() => {});
      throw error;
    }

    return NextResponse.json({
      message: "File uploaded successfully",
      url,
      fileType,
    });
  } catch (error) {
    console.error("File upload error:", error);

    return NextResponse.json(
      { message: "Failed to upload file" },
      { status: 500 },
    );
  }
}

function getType(file: File) {
  const mimeType = file.type;

  if (mimeType.startsWith("audio/")) {
    return "AUDIO";
  } else if (mimeType.startsWith("image/")) {
    return "IMAGE";
  } else if (mimeType.startsWith("video/")) {
    return "VIDEO";
  } else if (mimeType === "application/pdf") {
    return "PDF";
  } else if (
    mimeType ===
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
  ) {
    return "DOCX";
  } else {
    return "OTHER";
  }
}

function sanitizeFileTitle(fileTitle: string) {
  return fileTitle
    .trim()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-zA-Z0-9._-]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^[-.]+|[-.]+$/g, "")
    .slice(0, 80) || "file";
}

async function getFileURL({ file, fileTitle }: { file: File; fileTitle: string }) {
  const extension = path.extname(file.name).toLowerCase();
  const baseName = sanitizeFileTitle(fileTitle);
  const fileName = `${baseName}${extension}`;
  const resolvedPath = await getUniqueFilePath(UPLOAD_DIR, fileName);
  const relativePath = path.relative(UPLOAD_DIR, resolvedPath);
  const url = `/files/${relativePath.replace(/\\/g, "/")}`;

  return {
    filePath: resolvedPath,
    url,
    filename: path.basename(resolvedPath),
  };
}

async function getUniqueFilePath(uploadDir: string, fileName: string) {
  const extension = path.extname(fileName);
  const baseName = path.basename(fileName, extension);
  let candidateName = fileName;
  let counter = 1;

  while (true) {
    const candidatePath = path.join(uploadDir, candidateName);

    try {
      await fs.access(candidatePath);
      candidateName = `${baseName}-${counter}${extension}`;
      counter += 1;
    } catch {
      return candidatePath;
    }
  }
}

function resolveStoredFilePath(url: string) {
  const normalizedUrl = url.replace(/^\/+/, "");
  const resolvedPath = path.resolve("/srv", normalizedUrl);

  if (resolvedPath !== "/srv" && !resolvedPath.startsWith("/srv/")) {
    throw new Error("Invalid file path");
  }

  return resolvedPath;
}

export async function DELETE(req: Request) {
  try {
    const formData = await req.formData();
    const deleteFileID = formData.get("fileId");

    if (typeof deleteFileID !== "string" || !deleteFileID.trim()) {
      return NextResponse.json(
        { message: "File ID is required" },
        { status: 400 },
      );
    }

    const file = await prisma.fileSystem.findUnique({
      where: {
        id: deleteFileID,
      },
    });

    if (!file) {
      return NextResponse.json(
        { message: "File not found" },
        { status: 404 },
      );
    }

    const filePath = resolveStoredFilePath(file.url);

    await fs.unlink(filePath).catch(() => {});

    await prisma.fileSystem.delete({
      where: {
        id: file.id,
      },
    });

    return NextResponse.json({
      message: "File deleted successfully",
    });
  } catch (error) {
    console.error("File delete error:", error);

    return NextResponse.json(
      { message: "Failed to delete file" },
      { status: 500 },
    );
  }
}

export async function GET() {
  try {
    const files = await prisma.fileSystem.findMany({
      orderBy: {
        createdAt: "desc",
      },
      include: {
        blogPost: {
          select: {
            translations: {
              select: {
                title: true,
                language: true,
              },
            },
          },
        },
      },
    });

    return NextResponse.json(files);
  } catch (error) {
    console.error("File fetch error:", error);

    return NextResponse.json(
      { message: "Failed to fetch files" },
      { status: 500 },
    );
  }
}