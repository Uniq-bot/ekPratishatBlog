import { NextResponse } from "next/server";
import { join } from "path";
import { stat, readFile } from "fs/promises";

const IMAGE_DIR = process.env.IMAGE_DIR || "/srv/images";

function getContentType(filename: string) {
  const ext = filename.split('.').pop()?.toLowerCase();
  switch (ext) {
    case 'jpg':
    case 'jpeg':
      return 'image/jpeg';
    case 'png':
      return 'image/png';
    case 'webp':
      return 'image/webp';
    case 'gif':
      return 'image/gif';
    case 'svg':
      return 'image/svg+xml';
    default:
      return 'application/octet-stream';
  }
}

export async function GET(_req: Request, { params }: { params: Promise<{ path: string[] }> }) {
  try {
    const { path } = await params;
    const parts = path || [];
    if (parts.length === 0) {
      return NextResponse.json({ message: 'Image not specified' }, { status: 400 });
    }

    // Prevent path traversal
    const filename = parts.join('/');
    if (filename.includes('..')) {
      return NextResponse.json({ message: 'Invalid path' }, { status: 400 });
    }

    const filepath = join(IMAGE_DIR, filename);

    const s = await stat(filepath);
    if (!s.isFile()) {
      return NextResponse.json({ message: 'Not found' }, { status: 404 });
    }

    const buffer = await readFile(filepath);
    const contentType = getContentType(filename);

    return new NextResponse(buffer, {
      status: 200,
      headers: {
        'Content-Type': contentType,
        'Cache-Control': 'public, max-age=31536000, immutable',
      },
    });
  } catch (err: any) {
    if (process.env.NODE_ENV !== 'production') {
      console.error('Image serve error:', err);
    }
    return NextResponse.json({ message: 'Failed to serve image' }, { status: 500 });
  }
}
