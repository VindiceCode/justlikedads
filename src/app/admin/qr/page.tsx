"use client";

import { useState } from "react";
import Link from "next/link";

export default function QRCodeGenerator() {
  const [source, setSource] = useState("qr-businesscard");
  const [size, setSize] = useState("400");
  const [format, setFormat] = useState<"png" | "svg">("png");

  const qrUrl = `/api/qr?source=${source}&size=${size}&format=${format}`;

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-[#8b0000] text-white py-4 px-6">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-4">
            <Link href="/admin" className="text-white/80 hover:text-white">
              ← Back to Dashboard
            </Link>
            <h1 className="font-oswald text-2xl font-bold uppercase tracking-wider">
              QR Code Generator
            </h1>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto py-8 px-6">
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="font-oswald text-xl font-bold uppercase text-gray-800 mb-4">
              Settings
            </h2>

            <div className="space-y-4">
              <div>
                <label
                  htmlFor="source"
                  className="block mb-2 font-oswald font-medium uppercase tracking-wide text-sm text-gray-800"
                >
                  Source Tag
                </label>
                <select
                  id="source"
                  value={source}
                  onChange={(e) => setSource(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-200 text-base focus:outline-none focus:border-[#8b0000] transition-colors bg-white"
                >
                  <option value="qr-businesscard">Business Card</option>
                  <option value="qr-flyer">Flyer</option>
                  <option value="qr-banner">Banner</option>
                  <option value="qr-other">Other</option>
                </select>
                <p className="text-xs text-gray-500 mt-1">
                  This tag helps track where leads come from
                </p>
              </div>

              <div>
                <label
                  htmlFor="size"
                  className="block mb-2 font-oswald font-medium uppercase tracking-wide text-sm text-gray-800"
                >
                  Size (pixels)
                </label>
                <select
                  id="size"
                  value={size}
                  onChange={(e) => setSize(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-200 text-base focus:outline-none focus:border-[#8b0000] transition-colors bg-white"
                >
                  <option value="200">Small (200px)</option>
                  <option value="400">Medium (400px)</option>
                  <option value="600">Large (600px)</option>
                  <option value="800">Extra Large (800px)</option>
                </select>
              </div>

              <div>
                <label
                  htmlFor="format"
                  className="block mb-2 font-oswald font-medium uppercase tracking-wide text-sm text-gray-800"
                >
                  Format
                </label>
                <select
                  id="format"
                  value={format}
                  onChange={(e) => setFormat(e.target.value as "png" | "svg")}
                  className="w-full px-4 py-3 border-2 border-gray-200 text-base focus:outline-none focus:border-[#8b0000] transition-colors bg-white"
                >
                  <option value="png">PNG (for print)</option>
                  <option value="svg">SVG (scalable)</option>
                </select>
              </div>

              <a
                href={qrUrl}
                download={`justlikedads-qr-${source}.${format}`}
                className="block w-full bg-[#8b0000] text-white py-4 font-oswald text-lg font-bold uppercase tracking-wider hover:bg-[#a00] transition-colors text-center"
              >
                Download QR Code
              </a>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="font-oswald text-xl font-bold uppercase text-gray-800 mb-4">
              Preview
            </h2>
            <div className="flex items-center justify-center bg-gray-50 p-8 rounded">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={qrUrl}
                alt="QR Code Preview"
                className="max-w-full"
                style={{ maxHeight: "300px" }}
              />
            </div>
            <p className="text-sm text-gray-500 mt-4 text-center">
              Scans will be tagged as: <code className="bg-gray-100 px-2 py-1 rounded">{source}</code>
            </p>
          </div>
        </div>

        <div className="mt-8 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <h3 className="font-bold text-yellow-800 mb-2">Tips for Business Cards</h3>
          <ul className="text-sm text-yellow-700 space-y-1">
            <li>• Use at least 400px for good print quality</li>
            <li>• SVG format scales better for large prints</li>
            <li>• Test the QR code with your phone before printing</li>
            <li>• Keep the QR code area clean with some white space around it</li>
          </ul>
        </div>
      </main>
    </div>
  );
}
