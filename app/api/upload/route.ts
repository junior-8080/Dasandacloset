import { NextRequest, NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import path from "path";
import os from "os";

const MAX_SIZE = 5 * 1024 * 1024;
const ALLOWED = ["image/jpeg", "image/png", "image/webp"];

function getUploadDir() {
  return process.env.UPLOAD_DIR ?? path.join(os.homedir(), "dasanda-uploads");
}

export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const files = formData.getAll("images") as File[];

  if (!files.length) {
    return NextResponse.json({ error: "No files provided" }, { status: 400 });
  }

  const uploadDir = getUploadDir();
  await mkdir(uploadDir, { recursive: true });

  const urls: string[] = [];

  for (const file of files) {
    if (!ALLOWED.includes(file.type)) {
      return NextResponse.json({ error: `Invalid file type: ${file.type}` }, { status: 400 });
    }
    if (file.size > MAX_SIZE) {
      return NextResponse.json({ error: `${file.name} exceeds 5 MB` }, { status: 400 });
    }

    const ext = file.name.split(".").pop() ?? "jpg";
    const filename = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
    const dest = path.join(uploadDir, filename);
    await writeFile(dest, Buffer.from(await file.arrayBuffer()));
    urls.push(`/api/files/${filename}`);
  }

  return NextResponse.json({ urls });
}