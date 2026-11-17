// Extracts the HEAL logo mark from the supplied violet-background PNG into
// transparent white and violet versions, plus app icons from the H circle.
// Run: node scripts/build-logo.mjs   (input: public/brand/heal-logo-violet.png)
import sharp from "sharp";

const SRC = "public/brand/heal-logo-violet.png";
const BG = [101, 86, 184]; // #6556B8, the logo ground
const FG = [244, 246, 252]; // #F4F6FC, logo white

const { data, info } = await sharp(SRC).removeAlpha().raw().toBuffer({ resolveWithObject: true });
const { width, height } = info;
const alpha = new Uint8Array(width * height);
for (let i = 0; i < width * height; i++) {
  let t = 0;
  for (let c = 0; c < 3; c++) t += (data[i * 3 + c] - BG[c]) / (FG[c] - BG[c]);
  alpha[i] = Math.round(Math.min(1, Math.max(0, t / 3)) * 255);
}

async function tinted(rgb, file, crop) {
  const out = Buffer.alloc(width * height * 4);
  for (let i = 0; i < width * height; i++) {
    out.set([...rgb, alpha[i]], i * 4);
  }
  let img = sharp(out, { raw: { width, height, channels: 4 } });
  if (crop) img = img.extract(crop);
  await img.trim({ threshold: 1 }).png({ compressionLevel: 9 }).toFile(file);
  return sharp(file).metadata();
}

const white = await tinted(FG, "public/brand/heal-logo-white.png");
const violet = await tinted(BG, "public/brand/heal-logo-violet-mark.png");
console.log("white", white.width, white.height, "violet", violet.width, violet.height);

// H circle bbox: white pixels in the left 40% of the image.
let minX = width, minY = height, maxX = 0, maxY = 0;
for (let y = 0; y < height; y++)
  for (let x = 0; x < width * 0.4; x++)
    if (alpha[y * width + x] > 128) {
      minX = Math.min(minX, x); maxX = Math.max(maxX, x);
      minY = Math.min(minY, y); maxY = Math.max(maxY, y);
    }
const w = maxX - minX + 1, h = maxY - minY + 1;
const side = Math.max(w, h);
const pad = Math.round(side * 0.16);
console.log("mark bbox", { minX, minY, w, h });

for (const [file, px] of [["src/app/icon.png", 512], ["src/app/apple-icon.png", 180]]) {
  const mark = await sharp(SRC).extract({ left: minX, top: minY, width: w, height: h })
    .extend({
      top: pad + Math.floor((side - h) / 2), bottom: pad + Math.ceil((side - h) / 2),
      left: pad + Math.floor((side - w) / 2), right: pad + Math.ceil((side - w) / 2),
      background: { r: BG[0], g: BG[1], b: BG[2] },
    })
    .png().toBuffer();
  await sharp(mark).resize(px, px, { kernel: "lanczos3" }).png().toFile(file);
}
console.log("icons written");
