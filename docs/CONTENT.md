# CONTENT: all site copy

> Move this into typed objects in `src/content/` (BUILD-PLAYBOOK §3.3). Break headlines and paragraphs into `lines` arrays yourself, under ~45 characters per line, breaking at natural phrase boundaries; add a `mobile` array only where the desktop breaks read badly at 375px.
> **[confirm]** = placeholder: store `null`, render nothing. **[need]** = a value Ahmed must supply (also `null`).
> Editable copy deck with the same text: https://claude.ai/artifact/Ruk8c9Sm9qzt2zbAHVaAw9 (if they differ, this file wins).
> **Last updated:** 2026-11-18

## Naming

- **HEAL** in display type, headlines and running copy ("Why HEAL", "sell to HEAL").
- **Heal Med LLC** in legal and formal places: footer copyright, privacy, terms, JSON-LD `legalName`, contact details card, Home hero eyebrow.
- Never "HEAL Medical". The logo artwork reads "HEAL MEDICAL LLC"; that's an open question for Ahmed, the site text follows the legal name.
All site copy. Move it into typed objects under `content/`. Lines marked **[confirm]** are placeholders: give them an optional field and render nothing until filled. Editable copy deck: https://claude.ai/artifact/Ruk8c9Sm9qzt2zbAHVaAw9

## Voice

Short declarative headlines. Engineer-precise, calm body copy. Sentence case everywhere, verbs on buttons. No exclamation marks, no em dashes, no superlatives, no unconfirmed claims.

## Global

- **Brand line:** Providing a second life to your asset.
- **Nav:** Equipment Planning · Asset Disposition · Service · About · Shop · Contact
- **Header button:** Sell equipment → `/asset-disposition#offer`
- **Footer CTA:** Retiring equipment? Let's give it a second life. Buttons: Request a consultation (→ `/contact`), Call (347) 837-9746
- **Footer columns:** Services (Equipment Planning, Asset Disposition, Service) · Company (Our story, Team, Careers) · Shop (Cables, Parts, Batteries, eBay store, DOTmed store)
- **Footer details:** 8315 Grandstaff Dr, Sacramento, CA 95818 · info@healmedllc.com
- **Legal row:** © {year} Heal Med LLC · Privacy · Terms · LinkedIn [need URL] · Instagram [need URL]
- **Stores:** eBay store URL [need] · DOTmed listings URL [need]

## Home `/`

**Hero (brand)**
- Eyebrow: Heal Med LLC · Sacramento, CA
- Right label: Planning · Disposition · Service
- H1: Providing a second life to your asset.
- Lead: We plan, buy, service and responsibly retire hospital equipment, so your capital keeps working and nothing useful goes to waste.
- Buttons: Sell your equipment (→ disposition) · Browse inventory (→ shop)
- End-of-reveal caption (shown when the photo fills the screen): Every device, inspected by an engineer.

**Statement (light)**
- Eyebrow: Why HEAL
- Text: Hospitals retire equipment every day. Most of it still has years of good work left. We find it a second life, and give its owners back value they thought was gone.
- Four points: 01 Engineer-led · Every device is assessed by a biomedical engineer. / 02 Fair value · Offers based on real condition and market price. / 03 Data protected · Data-bearing devices are wiped before they move on. / 04 Less waste · What cannot be reused is recycled responsibly.

**What we do (white)**
- Eyebrow: What we do · H2: Plan it, sell it, service it.
- Rows: 01 Equipment Planning (Consultation, Capital planning, Asset management) · 02 Asset Disposition (What we buy, Fair dollar value, Get an offer) · 03 Service (Ventilators, Ultrasound, Histology, More to come)

**We buy (light)**
- Eyebrow: 02 · Asset disposition · H2: We buy medical equipment, and pay a fair value for it. · Button: Get an offer
- Tiles: Ventilators · Ultrasound systems · Patient monitors · Histology and lab · Infusion pumps [confirm] · Parts and batteries

**Lifecycle (tint)**
- Eyebrow: The lifecycle · H2: From your floor to its next home.
- 01 Assess · You send your list. We review it and make a fair offer.
- 02 Decommission · Safe removal, with data-bearing devices wiped.
- 03 Inspect and restore · A biomedical engineer tests and repairs every device.
- 04 Second life · Redeployed, resold or responsibly recycled.

**Who we are (dark)**
- Eyebrow: Who we are · H2: Run by a biomedical engineer.
- Body: Every device we buy or service is checked by someone who has spent a career keeping hospital equipment running. Honest assessments, fair offers, equipment that works when it reaches its next home.
- List: Engineer-led inspection · Fair, transparent value · Data protection built in · Less waste, longer life
- Button: Our story

**Marquee:** Ventilators · Ultrasound · Histology · Patient monitors

**Shop (white)**
- Eyebrow: Shop · H2: Tested equipment, parts and accessories. · Buttons: Shop on eBay · Shop on DOTmed
- Tiles: Cables · Parts · Batteries

## Equipment Planning `/equipment-planning`

- Breadcrumb: Home / 01 · Equipment Planning
- H1: Plan the whole life of every device.
- Lead: From the first purchase decision to the day it is retired, we help you spend capital where it matters most.
- Buttons: Book a consultation · See how it works
- Sub-nav: Consultation · Capital planning · Asset management

**01 · Consultation**: H2: An engineer's view before you buy, upgrade or retire. Lead: We walk your floors, look at what you own and tell you plainly what to keep, fix or replace. Bullets: Equipment walkthroughs and audits · Repair-or-replace recommendations · Vendor-neutral advice on refurbished vs new

**02 · Capital planning**: H2: Prioritize spending using clinical need, budget and lifecycle data. Lead: A clear multi-year view of what needs replacing and when, in a format leadership can approve. Bullets: Lifecycle and end-of-support review · Multi-year replacement roadmap · Budget scenarios you can take to leadership

**03 · Asset management**: H2: Know what you own, where it is and when it needs attention. Lead: Tagging, preventive maintenance and lifecycle reporting, backed by a proper CMMS. Bullets: Inventory and asset tagging · Preventive maintenance scheduling · Lifecycle and condition reporting. Partner card: We are partnering with a CMMS provider [name to confirm] so inventory, maintenance and lifecycle live in one place.

**How it works (dark)**: H2: Three steps from first call to a plan. 01 Talk · A 30-minute call about your equipment and goals [confirm length]. 02 Review · We audit the floor or your asset list and flag priorities. 03 Plan · You get a written plan with timelines and budget ranges. Button: Book a consultation


## Asset Disposition `/asset-disposition`

- Breadcrumb: Home / 02 · Asset Disposition
- H1: We buy medical equipment.
- Lead: Closing, upgrading or clearing space? Get a fair offer for surplus and retired equipment, and let us handle the rest.
- Buttons: Get an offer (→ #offer) · See what we buy (→ #buy)

**What we buy**: H2: Working or not, most hospital equipment has value. Side note: Don't see your equipment? Send us the list anyway. Tiles: Ventilators and respiratory · Ultrasound systems and probes · Patient monitoring · Histology and lab · Infusion pumps [confirm] · Imaging [confirm] · Surgical and OR [confirm] · Parts, batteries, accessories

**How it works (tint)**: H2: Four steps, one partner. 01 Send your list · Make, model, quantity and a few photos. A spreadsheet is fine. 02 Get an offer · We review condition and market value and send a fair offer. 03 We remove and decommission · Pickup scheduled around your team; data-bearing devices wiped [confirm logistics]. 04 Get paid · Payment once equipment is collected [confirm terms].

**Why sell to HEAL (dark)**: H2: Fair offers from someone who knows the equipment. Engineer-assessed value · Offers based on real condition, not a blanket scrap price. / One partner, start to finish · Assessment, removal, data wiping and resale handled together. / Responsible by default · What cannot be reused is recycled responsibly. / Paperwork for your records · Documentation of what left your facility [confirm documents].

**Offer form (#offer)**: Eyebrow: Get an offer · H2: Tell us what you have. · Lead: A list and a few photos is enough to start. We reply by email with next steps. Fields: Name* · Work email* · Phone · Organization* · Facility location (City, state)* · What are you selling?* (textarea, placeholder "e.g. 6 ventilators, 2 ultrasound carts") · Timeline (As soon as possible / 1 to 3 months / Just exploring) · Upload a list or photos (xlsx, csv, jpg, up to 20 MB). Button: Request an offer.

**FAQ**: H2: Questions sellers ask. Do you buy equipment that doesn't work? [confirm] · Do you buy single items or only full lots? [confirm] · How do you handle patient data? Data-bearing devices are wiped before they leave our hands [confirm method] · Where do you operate? We are based in Sacramento, California [confirm service area].


## Service `/service`

- Breadcrumb: Home / 03 · Service · H1: Biomedical service that keeps equipment working.
- Lead: Repair, preventive maintenance and technical support from an engineer who knows the equipment inside out.
- Buttons: Request service (→ #request) · What we service (→ #equipment)

**What we service**: H2: Three equipment families today, more on the way.
- Ventilators · Diagnostics, repair and performance verification, so units go back on the floor with confidence. Spec: Respiratory · ICU · Transport [confirm]
- Ultrasound · System and probe troubleshooting and repair for imaging teams who can't wait on downtime. Spec: Cart · Portable · Probes [confirm]
- Histology · Service for the instruments behind the lab's daily work. Spec: Microtomes · Processors · Embedding [confirm]
- Banner: More coming soon. Have equipment we didn't list? Ask us.

**How we help (dark)**: H2: From a fault today to fewer faults next year. Repair · Fault finding and fixes, on site or in our shop [confirm on-site]. / Preventive maintenance · Scheduled checks that catch problems early. / Performance testing · Verification against manufacturer specs before equipment goes back into use. / Technical support · A direct line to the engineer, not a call center.

**Service request (#request)**: H2: Something down? Tell us. Lead: The make, model and what's happening is enough to start. For urgent issues, call (347) 837-9746. Fields: Name* · Work email* · Phone · Organization* · Equipment type (Ventilator / Ultrasound / Histology / Other) · Make and model (placeholder "As printed on the device label") · What's happening?* · How urgent? (Down now / This week / Planning ahead). Button: Send service request.


## About `/about`

- Breadcrumb: Home / 04 · About · H1: Good equipment deserves a second life.
- Lead: HEAL plans, buys, services and responsibly retires medical equipment for hospitals, clinics and labs. Buttons: Work with us · Careers
- **Our story:** HEAL started with one job: helping healthcare facilities sell equipment they no longer needed. / Working with hospitals, clinics and manufacturers, we saw how much of it still had years of service left. Today we plan, buy, service and responsibly retire medical equipment, always with patient safety, data protection and the environment in mind.
- **The name (brand band):** HEAL is what we do for equipment. We give it a second life, and give its owners back value they thought was gone.
- **What we value:** H2: Three things we never trade off. Engineer-led · Every decision starts with how the equipment actually works. / Fair · Clear offers and honest assessments. / Responsible · Safe decommissioning, protected data, less waste.
- **Team:** H2: Small team, direct line to the engineer. Ahmed Kharodia · Founder, Service and Operations Engineer [confirm] · bio [Ahmed to supply]. Second member [confirm or remove].
- **Careers (dark):** H2: We're small and growing. Body: If you're a biomedical technician or you love medical technology, we'd like to hear from you. Button: Send your CV (mailto:info@healmedllc.com)

## Shop `/shop`

- Breadcrumb: Home / 05 · Shop · H1: Tested equipment, parts and accessories.
- Lead: Browse what's in stock. Our full inventory is listed on our eBay and DOTmed stores. Buttons: Shop on eBay · Shop on DOTmed
- **Categories:** Cables · Patient cables, leads and power cables for common systems. / Parts · Tested replacement parts pulled from retired equipment. / Batteries · Replacement batteries for monitors, ventilators and carts.
- **Store cards:** Store 01 · eBay · Shop on eBay · Refurbished equipment, parts and accessories, shipped across the US. · Open store / Store 02 · DOTmed · Shop on DOTmed · Equipment listings for hospitals and biomed teams. · Open listings
- **Stock check (tint):** Eyebrow: Can't find it? H2: Tell us the make and model and we'll check. Fields: Make and model · Work email. Button: Check stock.

## Contact `/contact`

- H1: Let's talk. Lead: Tell us what you have, what you need or what's broken.
- Form: I'm looking to (Sell equipment / Buy equipment / Get service / Plan equipment / Something else) · Name* · Work email* · Phone · Organization · Message*. Button: Send message. Note: Protected by an invisible spam check. We reply by email.
- Details card (heading "Heal Med LLC"): Call (347) 837-9746 · Email info@healmedllc.com · Visit 8315 Grandstaff Dr, Sacramento, CA 95818 · Hours [confirm]
- Map: violet-tinted static map of the address.

## Form states (all forms)

| State | Copy |
| --- | --- |
| Required empty | Please add your {field}. |
| Bad email | That email doesn't look right. Check for typos. |
| Sending | Sending… |
| Success | Thanks. We've got your request and will reply by email. |
| Error | Something went wrong and your message didn't send. Try again, or email info@healmedllc.com. |


## SEO (title template `%s | Heal Med LLC`)

| Route | Title | Description |
| --- | --- | --- |
| `/` | HEAL · Providing a second life to your asset (absolute, no template) | We plan, buy, service and responsibly retire hospital equipment from Sacramento, California. Engineer-led, fair value, data protected. |
| `/equipment-planning` | Medical Equipment Planning & Capital Planning | Consultation, capital planning and asset management for hospitals and clinics, led by a biomedical engineer. |
| `/asset-disposition` | Sell Used Medical Equipment · Hospital Asset Disposition | Get a fair offer for surplus and retired medical equipment. Engineer-assessed value, decommissioning and responsible resale. |
| `/service` | Ventilator, Ultrasound & Histology Equipment Repair | Repair, preventive maintenance and performance testing for ventilators, ultrasound and histology equipment. |
| `/about` | About HEAL | HEAL plans, buys, services and responsibly retires medical equipment for hospitals, clinics and labs. |
| `/shop` | Medical Equipment Parts, Cables & Batteries | Tested equipment, cables, parts and batteries. Full inventory on our eBay and DOTmed stores. |
| `/contact` | Contact | Call (347) 837-9746, email info@healmedllc.com or send us a message. Sacramento, California. |
| `/privacy`, `/terms` | Privacy policy / Terms of use | Short factual descriptions. |

## Legal pages `/privacy`, `/terms`

Brand-light page hero (no photo band), then a single text column. Structure only in v1: what the site collects (form fields, uploaded files, basic analytics), why (to reply to requests), who processes it (email provider, file storage, spam check), retention, contact for requests (info@healmedllc.com), Heal Med LLC as the operator, governing law California. Mark the whole body `[confirm]` for Ahmed or a lawyer to review; render a short "This page is being updated. Questions: info@healmedllc.com" line until approved.

## 404

H1: This page has moved on. · Lead: The equipment might have found a new home. Let's get you back. · Buttons: Home · Contact
