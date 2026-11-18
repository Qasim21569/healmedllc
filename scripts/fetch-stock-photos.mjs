// Downloads the chosen Unsplash photos (Unsplash License) and crops each to its slot.
import sharp from "sharp";
import { writeFileSync, readFileSync, existsSync } from "node:fs";
// Usage: node scripts/fetch-stock-photos.mjs <empty download dir> [ahmed-portrait-file]
const SRC = process.argv[2];
const OUT = "public/photos";
const R = { r169: [2880, 1620], r45: [1600, 2000], r219: [2400, 1029], r43: [1600, 1200], r32: [1600, 1067], r11: [1600, 1600] };
const slots = {
  "01": ["photo-1664902265139-934219cee42f", "r169"],
  "03": ["photo-1581090466619-e945d2e2980e", "r45"],
  "04": ["photo-1630128295920-627fb9aff5a4", "r45"],
  "05": ["photo-1691935071222-c008a4ccc2ca", "r45"],
  "06": ["photo-1595464144526-5fb181b74625", "r45"],
  "07": ["photo-1526930382372-67bf22c0fce2", "r45"],
  "09": ["photo-1517420704952-d9f39e95b43e", "r45"],
  "11": ["photo-1518181835702-6eef8b4b2113", "r45"],
  "12": ["photo-1640955785023-1854685dae05", "r45"],
  "13": ["photo-1619641805634-b867f535071c", "r45"],
  "14": ["photo-1559000357-f6b52ddfbe37", "r219"],
  "15": ["photo-1758691463203-cce9d415b2b5", "r45"],
  "16": ["photo-1454165804606-c3d57bc86b40", "r45"],
  "17": ["photo-1764795850513-fa8a469a4600", "r45"],
  "18": ["photo-1769355104335-acef3aa4c9b6", "r219"],
  "19": ["photo-1664902273035-82c35762a0b1", "r45"],
  "20": ["photo-1691935071222-c008a4ccc2ca", "r45"],
  "21": ["photo-1725859189283-eaeb03a0a1c9", "r45"],
  "22": ["photo-1518152006812-edab29b069ac", "r45"],
  "26": ["photo-1760842543713-108c3cadbba1", "r45"],
  "27": ["photo-1630531210843-d6f343ad1f90", "r43"],
  "28": ["photo-1581092918056-0c4c3acd3789", "r219"],
  "29": ["photo-1630128295920-627fb9aff5a4", "r45"],
  "30": ["photo-1691933880096-4046bc9e2fa0", "r45"],
  "31": ["photo-1602052577122-f73b9710adba", "r45"],
  "32": ["photo-1764835711461-117d67799a7d", "r219"],
  "35": ["photo-1644079446600-219068676743", "r219"],
  "36": ["photo-1518181835702-6eef8b4b2113", "r45"],
  "37": ["photo-1640955785023-1854685dae05", "r45"],
  "38": ["photo-1619641805634-b867f535071c", "r45"],
  "39": ["photo-1721332154191-ba5f1534266e", "r45"],
  "40": ["photo-1620455800201-7f00aeef12ed", "r32"],
  "41": ["photo-1710194572710-bbd92a2d3f9c", "r11"],
};
const report = {};
for (const [slot, [id, ratio]] of Object.entries(slots)) {
  const raw = `${SRC}/${id}.jpg`;
  if (!existsSync(raw)) {
    const res = await fetch(`https://images.unsplash.com/${id}?w=3000&q=85&fm=jpg`);
    if (!res.ok) throw new Error(`${slot} ${id} ${res.status}`);
    writeFileSync(raw, Buffer.from(await res.arrayBuffer()));
  }
  const [w, h] = R[ratio];
  const meta = await sharp(raw).metadata();
  // Never upscale past the source: shrink the target box to fit.
  const scale = Math.min(1, meta.width / w, meta.height / h);
  const tw = Math.round(w * scale), th = Math.round(h * scale);
  let q = 74, buf;
  do {
    buf = await sharp(raw).resize(tw, th, { fit: "cover", position: "attention" }).webp({ quality: q }).toBuffer();
    q -= 6;
  } while (buf.length > (slot === "01" ? 450 : 350) * 1024 && q > 40);
  writeFileSync(`${OUT}/p${slot}.webp`, buf);
  report[slot] = { id, w: tw, h: th, kb: Math.round(buf.length / 1024) };
}
// Ahmed's portrait (supplied by Qasim), 4:5 crop from the top.
const ahmed = process.argv[3];
if (ahmed) {
  const m = await sharp(ahmed).metadata();
  const h = m.height, w = Math.round((h * 4) / 5);
  const buf = await sharp(ahmed).extract({ left: Math.round((m.width - w) / 2), top: 0, width: w, height: h }).webp({ quality: 80 }).toBuffer();
  writeFileSync(`${OUT}/p33.webp`, buf);
  report["33"] = { id: "supplied", w, h, kb: Math.round(buf.length / 1024) };
}

console.log(JSON.stringify(report));
