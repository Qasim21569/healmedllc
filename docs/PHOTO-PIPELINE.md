# PHOTO-PIPELINE: imagery end to end

> Self-contained: you can hand this file to Ahmed or a photographer. Owner doc for `public/photos/`, `src/content/photos.ts` and `ui/Photo`.
> **Last updated:** 2026-11-18

## 1. Current state

No real photos yet. Every slot renders the `Photo` placeholder (violet-100 frame, camera icon, mono id + subject) at the right ratio, so layouts are final before photos arrive. Swapping in a file is: drop it in `public/photos/`, set `src` in `photos.ts`.

## 2. Art direction

1. **Product cut-outs (I5):** one device, three-quarter view, eye level, background removed, transparent PNG/WebP. Crop tight to the device, no shadow baked in (the panel adds it). The device must be taller than wide or the breakout loses its point. Same camera height across the set so the tiles line up.
2. **Hands at work:** real inspection and repair: Ahmed at the bench, a probe under test, an asset tag being scanned. Natural light. No posed stock doctors.
3. **Places:** calm, wide shots of the workshop or staged equipment. Never patient areas, never visible patient data or screens with data.
4. **Hero photo 01 (I1):** seen first through the HEAL letters, then full screen. High contrast, detail-rich across the whole frame (the zoom lands on the L, right of centre), no text in frame, cool light. 16:9 at 2880px wide minimum.
5. **Shutter photo 10 (I2):** Ahmed at the bench, wide, 16:9, subject in the middle third so it reads while the window is still a slit.

**Grade:** one preset on every photo (slightly cool white balance, saturation −10%). On dark sections a photo may get a violet duotone (`mix-blend-mode: luminosity` over `--violet-600` at 55%); never on cut-outs.

## 3. Shot list

| ID | Subject | Ratio | Where | Pattern | Source |
| --- | --- | --- | --- | --- | --- |
| 01 | Equipment detail, high contrast | 16:9 | Home hero | I1 | Shoot |
| 03 | Technician at work | 4:5 | Home "What we do" follow card (row 1) | I7 | Shoot |
| 04 | Ventilator | cut-out | Home We buy | I5, I8 | eBay photo → cut-out |
| 05 | Ultrasound system | cut-out | Home We buy | I5, I8 | eBay → cut-out |
| 06 | Patient monitor | cut-out | Home We buy | I5, I8 | eBay → cut-out |
| 07 | Histology / lab instrument | cut-out | Home We buy | I5, I8 | eBay → cut-out |
| 08 | Infusion pump [confirm] | cut-out | Home We buy | I5, I8 | eBay → cut-out |
| 09 | Parts and batteries group | cut-out | Home We buy | I5, I8 | eBay → cut-out |
| 10 | Ahmed at the bench, wide | 16:9 (4:5 crop on phones) | Home Who we are | I2 | Shoot |
| 11–13 | Cables, parts, batteries | cut-out | Home Shop | I5 | eBay → cut-out |
| 14 | Engineer reviewing equipment on a floor | 21:9 (4:3 crop) | Planning hero, Home row 1 | I3, I4 | Shoot or licensed stock |
| 15 | Walkthrough with clinical staff | 4:5 | Planning Consultation | I6 | Licensed stock |
| 16 | Planning session, laptop and equipment list | 4:5 | Planning Capital planning | I6 | Shoot or stock |
| 17 | Asset tag being scanned | 4:5 | Planning Asset management | I6 | Shoot |
| 18 | Equipment staged for collection | 21:9 (4:3 crop) | Disposition hero, Home row 2 | I3, I4 | Shoot |
| 19–26 | 8 buy categories | cut-out | Disposition What we buy | I5 | eBay → cut-out |
| 27 | Device label and serial plate | 4:3 | Disposition offer form | I3 | Shoot |
| 28 | Hands repairing a ventilator | 21:9 (4:3 crop) | Service hero, Home row 3 | I3, I4 | Shoot |
| 29–31 | Ventilator, ultrasound, histology | cut-out | Service cards | I5 | Shoot or cut-out |
| 32 | Workshop or warehouse, wide | 21:9 (4:3 crop) | About hero | I3, I4 | Shoot |
| 33 | Ahmed portrait | 4:5 | About team | I3 | Shoot |
| 34 | Second team member [confirm] | 4:5 | About team | I3 | Shoot |
| 35 | Shelf of parts and batteries | 21:9 (4:3 crop) | Shop hero | I3, I4 | Shoot |
| 36–38 | Cables, parts, batteries | cut-out | Shop categories | I5 | eBay → cut-out (can reuse 11–13) |
| 39 | Bench detail, tools and a device open | 4:5 | About story collage (left, 0.9×) | I4 | Shoot |
| 40 | Equipment loaded for pickup | 3:2 | About story collage (centre, 1.1×) | I4 | Shoot |
| 41 | Close-up: probe or connector under test | 1:1 | About story collage (right, 1.25×) | I4 | Shoot |
| map | Static map of 8315 Grandstaff Dr, violet tint | 4:3 | Contact | none | Mapbox/Stadia static export, tinted |

## 4. Getting the photos

1. **Ahmed shoots on a phone:** daylight, plain wall or floor, device filling about 70% of the frame, one landscape and one portrait per subject.
2. **Use the eBay listing photos** he already has for cut-outs.
3. **Remove backgrounds** (Canva, Photoshop, remove.bg), export transparent PNG.
4. **Grade once** with one preset.
5. **Licensed stock only for people and places**, commercial license, keep the license record. Never AI-generated equipment.

## 5. Files and code

- `public/photos/p01.webp`, `p04.png`... Cut-outs keep alpha (`.webp` with alpha or `.png`). Masters stay out of the repo.
- Export: 2880px long edge for 01 and 10, 2400px for 21:9 bands, 1600px for cards and cut-outs. Under 350 KB each (01 under 450 KB).
- `src/content/photos.ts`: `id → { src: string | null, alt, subject, width, height, backdrop: 'ice' | 'lilac' | 'violet' | 'none', cutout: boolean }`. Alt text describes the thing ("Refurbished ICU ventilator on a stand"), never "photo of".
- `<Photo id="04" />`: `next/image` with `placeholder="blur"` (generate `blurDataURL` at build with `plaiceholder` or a tiny inline base64 per entry) when `src` exists, else the placeholder frame. Photo 01: `priority`, `fetchPriority="high"`.
- Every `Photo` gets `sizes` from its layout (e.g. 4-up tiles `(min-width:1024px) 25vw, (min-width:768px) 33vw, 50vw`).
