import { NextResponse } from "next/server";
// Load from public at runtime to avoid bundling/import path issues

type Item = {
  id: string;
  url: string;
  site_name?: string;
};

// Use Node runtime to access public file via fs when needed
export const runtime = "nodejs";
export const dynamic = "force-static";

export async function GET() {
  try {
    // Read from the local filesystem under public/random.json
    const { readFile } = await import("fs/promises");
    const { join } = await import("path");
    const file = await readFile(join(process.cwd(), "public", "random.json"), "utf8");
    const list = JSON.parse(file) as unknown as Item[];
    const items = (list as unknown as Item[])
      .filter((it) => typeof it?.url === "string")
      .filter(
        (it) =>
          !/^(https?:)?\/\/(www\.)?youtube\.com\//i.test(it.url) &&
          !/^(https?:)?\/\/(www\.)?youtu\.be\//i.test(it.url)
      );
    if (items.length === 0) {
      return NextResponse.json({ id: "0", url: "https://example.com" });
    }
    const randomIndex = Math.floor(Math.random() * items.length);
    const item = items[randomIndex];
    return NextResponse.json(item);
  } catch {
    return NextResponse.json(
      { id: "0", url: "https://example.com" },
      { status: 200 }
    );
  }
}


