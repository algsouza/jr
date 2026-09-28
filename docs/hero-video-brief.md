# Hero Cinematic Video — Creative Brief

Status: **generated and integrated.** Concept "From Detail to Home",
generated with Higgsfield (Kling v3.0, `pro` mode, 10s, 16:9, sound off).
Two iterations were run; see "Generation log" below for the evaluation that
led to using the second one.

## Where the final file is

```
assets/video/hero-home-services.mp4   <- live, H.264, 1280x720, ~7.1MB
assets/video/hero-poster.jpg          <- live, first frame, ~190KB
```

No `.webm` was generated — the single H.264 source is well under the
original size target and covers all evergreen browsers; add a `.webm` only
if a specific browser gap shows up in testing.

## Generation log

**Iteration 1** (prompt: multi-beat description mentioning a workshop bench,
then the wider home) produced excellent individual frames — realistic
hands, convincing wood/brass texture, natural light — but the transition
from macro close-up to the wide interior was a **hard cut** to a visually
unrelated room, not a camera move. Rejected.

**Iteration 2** (prompt rewritten to explicitly demand "single unbroken
continuous camera shot, no cuts, no scene changes" and describe the
pull-back as a continuous dolly/slider move within the *same* physical
room) fixed the spatial coherence — the reveal stays in one consistent
kitchen/living space, lighting is continuous, and the navy architectural
column reads as a nice subtle brand-color accent. The pull-back itself
still compresses the macro→wide transition into roughly 1.5s rather than a
fully mechanical, evenly-paced slide — a real limitation of current
text-to-video models on extreme macro-to-wide scale changes within a
single ~10s generation, not a prompt-wording issue. This is the version
that shipped; a third iteration with the same model was judged unlikely to
fix the underlying limitation.

**If revisited later:** the two-clip-plus-crossfade approach (one clip
that stays close, one that stays wide, blended in CSS) would give more
control over pacing at the cost of no longer being a genuine single take —
noted as an option, not pursued for this pass.

The Hero section in `index.html` already has a `<video>` element wired to
these exact paths (`#hero-video`). `script.js` only reveals the video once
the browser successfully loads a frame (`loadeddata` event); until then, or
if the file is missing/fails, the existing navy gradient background is the
entire visual — nothing depends on the video existing.

## Creative concept

**Working title:** "Every Detail, Handled."

A short (6–10s), quiet, confident sequence — not a highlight reel, not a
sales pitch. The camera moves the way a careful professional works: slow,
deliberate, close. We see craftsmanship as texture and light, never as
spectacle.

**Narrative arc (single continuous feel, can be 3–4 cuts):**

1. Exterior establishing shot — an American suburban home at soft morning
   light, shallow depth of field, slight push-in. Sets "this is somebody's
   home," not a job site.
2. A close, tactile detail shot: hands adjusting a tool, tightening a
   fitting, or a level being placed against a doorframe. Natural light,
   visible texture (wood grain, brushed metal, worn leather of a tool
   belt). This is the "craftsmanship" beat.
3. A second trade beat for range — an HVAC vent, an electrical panel, or a
   painted wall catching light — reinforcing "one team, many disciplines"
   without listing all 11 services literally.
4. Slow pull-back or gentle rack-focus that resolves on negative space
   (a clean wall, an open doorway, soft sky) where the JR mark can sit.
   The logo appears as a still, composed graphic overlay in the final
   1–2 seconds — not animated in with motion, not spinning, just present,
   the way a nameplate would be. Fade to the navy gradient that the site
   already uses, so the loop point is invisible.

**Mood references (describe, do not fetch):** the calm of a Kohler or
Andersen Windows brand film; the tactile close-ups of a high-end
contractor's Instagram reel shot on a cinema camera; morning light through
a clean American colonial or craftsman-style home.

**Explicitly avoid:** spinning logo, lens flares, neon, particle effects,
fast cuts, stock-footage-with-actors energy, upbeat corporate stock music
cues, on-screen text/lower-thirds, gamer/startup aesthetic, cartoon or
illustrated elements.

## Higgsfield prompt (ready to run)

Use as a `generate_video` prompt (or the closest cinematic/product-film
preset available). Suggested aspect ratio: `16:9`, duration 8–10s if the
model supports it; generate in 2–3 shorter segments and edit together in
Premiere if the model caps duration lower.

```
Cinematic commercial video, American suburban home exterior at soft golden-hour
morning light, slow gentle push-in on a well-maintained house facade, then a
smooth transition to an extreme close-up of a craftsman's hands carefully
tightening a metal fitting with a wrench, shallow depth of field, warm natural
window light, visible texture on tools and hands, no faces in focus, then a
second close-up beat of a freshly painted navy-blue interior wall catching soft
light, slow rack focus, calm and deliberate camera movement throughout, muted
confident color grade in navy blue and warm neutral tones, high-end
architectural and product-film photography style, premium realistic
cinematography, no text overlays, no logos, no fast cuts, no flares, no
particle effects, quiet and professional atmosphere, 16:9, seamless loop-friendly
ending on soft negative space
```

If the model exposes separate shot-by-shot generation, split into:

- **Shot A (establishing):** `Cinematic slow push-in on an American suburban home exterior, soft golden-hour morning light, clean architectural composition, no people, no text, premium realistic photography, 16:9`
- **Shot B (craft detail):** `Extreme close-up cinematic shot of a craftsman's hands tightening a metal pipe fitting with a wrench, shallow depth of field, warm natural light, visible texture, no face in frame, premium realistic photography, 16:9`
- **Shot C (finish detail):** `Cinematic close-up of a paint roller smoothing fresh navy-blue paint on an interior wall, soft window light, slow rack focus, premium realistic photography, 16:9`
- **Shot D (resolve):** `Slow cinematic pull-back revealing a clean bright doorway with open negative space, soft natural light, calm composition, premium realistic photography, 16:9`

Edit A → B → C → D, hold on D's negative space for the logo overlay, then
crossfade to the site's existing navy hero gradient for a seamless loop.

## Technical delivery spec

- Format: H.264 `.mp4` (required), VP9 `.webm` (optional, smaller)
- Resolution: 1920×1080 minimum; site scales via `object-fit: cover`
- Duration: 6–10s, seamless loop (last frame ≈ first frame, or crossfade to
  the navy gradient already used as the CSS fallback)
- File size target: under 4–6MB for the mp4 (compress in Premiere/Handbrake;
  the site loads it with `preload="none"` so it never blocks first paint)
- Audio: none required — element is `muted` regardless
- Poster: export one frame (ideally from the "resolve" beat, shot D) as
  `assets/video/hero-poster.jpg`, optimized under ~150KB

## Next step

Live on the Hero now. Review on both desktop and a throttled mobile
connection; the video is intentionally skipped on viewports ≤860px (see
`script.js`) so mobile always gets the poster frame instead. If a future
pass wants a true continuous single-take reveal, see the two-clip-crossfade
note in the generation log above.
