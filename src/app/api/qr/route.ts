import { NextRequest, NextResponse } from "next/server";
import QRCode from "qrcode";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const format = searchParams.get("format") || "png";
  const source = searchParams.get("source") || "qr";
  const size = parseInt(searchParams.get("size") || "300", 10);

  // Build the target URL with tracking parameter
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
  const targetUrl = `${baseUrl}?source=${source}`;

  try {
    if (format === "svg") {
      const svg = await QRCode.toString(targetUrl, {
        type: "svg",
        width: size,
        margin: 2,
        color: {
          dark: "#8b0000",
          light: "#ffffff",
        },
      });

      return new NextResponse(svg, {
        headers: {
          "Content-Type": "image/svg+xml",
          "Cache-Control": "public, max-age=86400",
        },
      });
    }

    // Default to PNG
    const buffer = await QRCode.toBuffer(targetUrl, {
      type: "png",
      width: size,
      margin: 2,
      color: {
        dark: "#8b0000",
        light: "#ffffff",
      },
    });

    return new NextResponse(new Uint8Array(buffer), {
      headers: {
        "Content-Type": "image/png",
        "Content-Disposition": `inline; filename="justlikedads-qr-${source}.png"`,
        "Cache-Control": "public, max-age=86400",
      },
    });
  } catch (error) {
    console.error("QR generation error:", error);
    return NextResponse.json(
      { error: "Failed to generate QR code" },
      { status: 500 }
    );
  }
}
