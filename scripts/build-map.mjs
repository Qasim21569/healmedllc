// Static map of the HEAL address from OpenStreetMap tiles (ODbL, attribution on the image).
import sharp from "sharp";
const lat = 38.4607353, lon = -121.4200371, z = 17;
const W = 1600, H = 1200, T = 256;
const n = 2 ** z;
const px = ((lon + 180) / 360) * n * T;
const rad = (lat * Math.PI) / 180;
const py = ((1 - Math.log(Math.tan(rad) + 1 / Math.cos(rad)) / Math.PI) / 2) * n * T;
const x0 = px - W / 2, y0 = py - H / 2;
const tiles = [];
for (let tx = Math.floor(x0 / T); tx <= Math.floor((x0 + W) / T); tx++) {
  for (let ty = Math.floor(y0 / T); ty <= Math.floor((y0 + H) / T); ty++) {
    const res = await fetch(`https://tile.openstreetmap.org/${z}/${tx}/${ty}.png`, {
      headers: { "User-Agent": "heal-web-build/1.0 (one-off static map)" },
    });
    if (!res.ok) throw new Error(`tile ${tx},${ty}: ${res.status}`);
    tiles.push({ input: Buffer.from(await res.arrayBuffer()), left: Math.round(tx * T - x0), top: Math.round(ty * T - y0) });
    await new Promise((r) => setTimeout(r, 150));
  }
}
const base = await sharp({ create: { width: W, height: H, channels: 3, background: "#fff" } })
  .composite(tiles.filter((t) => t.left > -T && t.top > -T))
  .png()
  .toBuffer();
// Violet tint: greyscale, then map to the logo violet ramp.
const grey = await sharp(base).grayscale().linear(0.6, 100).png().toBuffer();
const tinted = await sharp(grey).tint({ r: 101, g: 86, b: 184 }).png().toBuffer();
const credit = Buffer.from(
  `<svg width="${W}" height="${H}"><rect x="${W - 300}" y="${H - 36}" width="300" height="36" fill="white" fill-opacity="0.85"/><text x="${W - 14}" y="${H - 12}" text-anchor="end" font-size="18" font-family="Arial" fill="#3F3676">© OpenStreetMap contributors</text></svg>`,
);
const info = await sharp(tinted).composite([{ input: credit }]).webp({ quality: 72 }).toFile("public/photos/pmap.webp");
console.log(info.width, info.height, Math.round(info.size / 1024) + "KB", tiles.length, "tiles");
