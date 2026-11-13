# Sutherland Farm website: setup notes

A single-page static site. No build step, no database. Open `index.html` to preview.

## Before it goes live (checklist)
1. **Waitlist form**: create a free form at formspree.io (or Netlify Forms / Web3Forms), paste the endpoint into `FORM_ENDPOINT` near the bottom of `index.html`. Until then the form shows "thank you" but does NOT save signups.
2. **Facebook / Instagram links**: replace `href="#"` on the `fb` and `ig` links in the footer.
3. **Garlic description**: confirm the wording in "Siberian Hardneck" is accurate (cold-hardy, grown, cured and packed on the farm, stamped kraft bags). Add flavour notes and bulb size if you want them.
4. **Pricing**: $3/bulb and $15/lb are the 2026 prices. Edit when 2027 pricing is set.
5. **Delivery area / pick-up location**: add a line in "How it works" once decided.

## Hosting and domain
- Free hosting: Cloudflare Pages, Netlify or GitHub Pages. Drag the whole folder in.
- Domain: register a `.ca` (about $15 to $20 per year), for example sutherlandfarm.ca if it's free. Check availability first.

## Updating
- Sold out / back in stock: edit the status pill text at the top of the hero.
- Photos: drop a new image into `images/` and change the filename in the `<img>` tag.

## Single bulb: hover animation (first card)
Hover (or tap on a phone) and the bulb shakes, then 24 paper-thin flakes peel off one after another and float around it. Each flake is a cut-out of the skin-on bulb photo (`images/shards/`), so it reveals the matching patch of the bare bulb when it lifts, and it flies back to the exact spot it came from at the end.
The bare bulb is your original bare photo, so the clove that falls is the bulb's own front-right clove, cut from that photo (`bare-clove.webp`, with a root cap from a real clove photo added). The same image sits in the bulb, then tips out about its base. As it comes away it turns about its own length (a 3D-style flip through an edge-on moment), and a real photo of a clove's other side (`clove-back.webp`) opens up, so it never dissolves or morphs. It then bounces on the black shape (the first bounce is the highest), slides off its edge, and the flakes fly home. The photo with that clove missing (`bulb-bare-hole.webp`) shows underneath.
Files: `bulb.webp` (skin on), `bulb-bare.webp` (bare, whole), `bulb-bare-hole.webp` (clove missing), `bare-clove.webp`, `clove-back.webp`. The three bulb photos share one 900x1200 frame; the clove is positioned over the hole with CSS (`.cl`). To change the bulb, replace them (same framing) and re-cut the flakes. Motion and physics are in `index.html` (`tickPieces`, `dropClove`).
