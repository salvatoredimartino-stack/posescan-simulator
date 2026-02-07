import React, { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";

/* =========================================
   ERROR BOUNDARY
   ========================================= */
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { error: null };
  }
  componentDidCatch(error) {
    this.setState({ error });
  }
  render() {
    if (this.state.error) {
      return (
        <div style={{ padding: 20, fontFamily: "system-ui", color: "#0f172a" }}>
          <div
            style={{
              padding: 16,
              borderRadius: 14,
              border: "1px solid rgba(15,23,42,.2)",
              background: "rgba(255,255,255,.95)",
              boxShadow: "0 10px 25px rgba(15,23,42,.12)",
            }}
          >
            <div style={{ fontWeight: 900, fontSize: 18, marginBottom: 10 }}>App crashed (runtime error)</div>
            <pre
              style={{
                margin: 0,
                whiteSpace: "pre-wrap",
                fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace",
              }}
            >
              {String(this.state.error)}
            </pre>
            <div style={{ marginTop: 12, color: "#475569", lineHeight: 1.4 }}>
              This screen is intentional so you don’t get a blank page. Fix the error above and the UI will load.
            </div>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

/* =========================================
   ASSET PATHS (CRITICAL)
   ========================================= */
const ASSET = (p) => `${import.meta.env.BASE_URL}${String(p).replace(/^\/+/, "")}`;

/* =========================================
   FULL DATA (as you provided)
   ========================================= */
const BASE_GENRES = [
  {
    id: "beauty",
    name: "Beauty",
    sets: [
      {
        id: "beauty_set1_seated_stool",
        name: "SET 1 — SEATED (STOOL)",
        bases: [
          {
            id: "beauty_seated_base1",
            name: "Base Pose 1",
            curated: true,
            flow: [
              { uid: "beauty_seated_base1_step1", label: "Base Pose 1", cue: "Edge of stool, 45°, feet down, hands flat", img: ASSET("poses/beauty/set1-seated/base1/step1.png") },
              { uid: "beauty_seated_base1_step2", label: "Pose 2", cue: "Hands between legs, elbows relaxed inward", img: ASSET("poses/beauty/set1-seated/base1/step1.png") },
              { uid: "beauty_seated_base1_step3", label: "Pose 3", cue: "Rotate side-on, maintain torso length", img: ASSET("poses/beauty/set1-seated/base1/step1.png") },
              { uid: "beauty_seated_base1_step4", label: "Pose 4", cue: "Change composition, tighten crop", img: ASSET("poses/beauty/set1-seated/base1/step1.png") },
              { uid: "beauty_seated_base1_step5", label: "Pose 5", cue: "Horizontal camera, same body position", img: ASSET("poses/beauty/set1-seated/base1/step1.png") },
              { uid: "beauty_seated_base1_step6", label: "Pose 6", cue: "Alternate composition, hold expression", img: ASSET("poses/beauty/set1-seated/base1/step1.png") },
            ],
          },
          {
            id: "beauty_seated_base2",
            name: "Base Pose 2",
            curated: true,
            flow: [
              { uid: "beauty_seated_base2_step1", label: "Base Pose 2", cue: "Left foot raised, elbow on knee, torso forward", img: ASSET("poses/beauty/set1-seated/base2/step1.png") },
              { uid: "beauty_seated_base2_step2", label: "Pose 2", cue: "Cup fingers softly, relax wrists", img: ASSET("poses/beauty/set1-seated/base2/step1.png") },
              { uid: "beauty_seated_base2_step3", label: "Pose 3", cue: "Right hand back pocket, chest open", img: ASSET("poses/beauty/set1-seated/base2/step1.png") },
              { uid: "beauty_seated_base2_step4", label: "Pose 4", cue: "Hands between legs, weight grounded", img: ASSET("poses/beauty/set1-seated/base2/step1.png") },
              { uid: "beauty_seated_base2_step5", label: "Pose 5", cue: "Lean back slightly, tilt, compose wide", img: ASSET("poses/beauty/set1-seated/base2/step1.png") },
              { uid: "beauty_seated_base2_step6", label: "Pose 6", cue: "Elbow out, knee support maintained", img: ASSET("poses/beauty/set1-seated/base2/step1.png") },
              { uid: "beauty_seated_base2_step7", label: "Pose 7", cue: "Hands forward, connect elbows visually", img: ASSET("poses/beauty/set1-seated/base2/step1.png") },
            ],
          },
          {
            id: "beauty_seated_base3",
            name: "Base Pose 3",
            curated: true,
            flow: [
              { uid: "beauty_seated_base3_step1", label: "Base Pose 3", cue: "Open to camera, elbow on knee, hand on thigh", img: ASSET("poses/beauty/set1-seated/base3/step1.png") },
              { uid: "beauty_seated_base3_step2", label: "Pose 2", cue: "Hand to chin, thoughtful pause", img: ASSET("poses/beauty/set1-seated/base3/step1.png") },
              { uid: "beauty_seated_base3_step3", label: "Pose 3", cue: "Big smile, hold structure", img: ASSET("poses/beauty/set1-seated/base3/step1.png") },
              { uid: "beauty_seated_base3_step4", label: "Pose 4", cue: "Tilt head, smile, hands crossed low", img: ASSET("poses/beauty/set1-seated/base3/step1.png") },
            ],
          },
          {
            id: "beauty_seated_base4",
            name: "Base Pose 4",
            curated: true,
            flow: [
              { uid: "beauty_seated_base4_step1", label: "Base Pose 4", cue: "Body forward, legs crossed, arms staggered", img: ASSET("poses/beauty/set1-seated/base4/step1.png") },
              { uid: "beauty_seated_base4_step2", label: "Pose 2", cue: "Hand to chin, other grounded", img: ASSET("poses/beauty/set1-seated/base4/step1.png") },
              { uid: "beauty_seated_base4_step3", label: "Pose 3", cue: "Smoking-style fingers, relaxed wrist", img: ASSET("poses/beauty/set1-seated/base4/step1.png") },
              { uid: "beauty_seated_base4_step4", label: "Pose 4", cue: "Hands down, big smile, head tilt", img: ASSET("poses/beauty/set1-seated/base4/step1.png") },
            ],
          },
        ],
      },
      {
        id: "beauty_set2_standing",
        name: "SET 2 — STANDING",
        bases: [
          {
            id: "beauty_standing_base1",
            name: "Base Pose 1",
            curated: true,
            flow: [
              { uid: "beauty_standing_base1_step1", label: "Base Pose 1", cue: "Feet apart, hip rocked, hands on hips", img: ASSET("poses/beauty/set2-standing/base1/step1.png") },
              { uid: "beauty_standing_base1_step2", label: "Pose 2", cue: "Change composition, shoot low", img: ASSET("poses/beauty/set2-standing/base1/step1.png") },
            ],
          },
          {
            id: "beauty_standing_base2",
            name: "Base Pose 2",
            curated: true,
            flow: [
              { uid: "beauty_standing_base2_step1", label: "Base Pose 2", cue: "Rotate body, foot elevated, chin 45°", img: ASSET("poses/beauty/set2-standing/base2/step1.png") },
              { uid: "beauty_standing_base2_step2", label: "Pose 2", cue: "Elbow tucked, slight left tilt", img: ASSET("poses/beauty/set2-standing/base2/step1.png") },
              { uid: "beauty_standing_base2_step3", label: "Pose 3", cue: "Chin back to camera", img: ASSET("poses/beauty/set2-standing/base2/step1.png") },
              { uid: "beauty_standing_base2_step4", label: "Pose 4", cue: "Rotate, look back, keep breast line", img: ASSET("poses/beauty/set2-standing/base2/step1.png") },
            ],
          },
        ],
      },
      {
        id: "beauty_set3_wall",
        name: "SET 3 — WALL",
        bases: [
          {
            id: "beauty_wall_base1",
            name: "Base Pose 1",
            curated: true,
            flow: [
              { uid: "beauty_wall_base1_step1", label: "Base Pose 1", cue: "45° to camera, weight back, knee forward", img: ASSET("poses/beauty/set3-wall/base1/step1.png") },
              { uid: "beauty_wall_base1_step2", label: "Pose 2", cue: "Same pose, tighter composition", img: ASSET("poses/beauty/set3-wall/base1/step1.png") },
              { uid: "beauty_wall_base1_step3", label: "Pose 3", cue: "Hands crossed, left under", img: ASSET("poses/beauty/set3-wall/base1/step1.png") },
            ],
          },
          {
            id: "beauty_wall_base2",
            name: "Base Pose 2",
            curated: true,
            flow: [
              { uid: "beauty_wall_base2_step1", label: "Base Pose 2", cue: "Rotate body, shift weight forward", img: ASSET("poses/beauty/set3-wall/base2/step1.png") },
              { uid: "beauty_wall_base2_step2", label: "Pose 2", cue: "Face wall, flatten shoulders", img: ASSET("poses/beauty/set3-wall/base2/step1.png") },
              { uid: "beauty_wall_base2_step3", label: "Pose 3", cue: "Change composition, widen frame", img: ASSET("poses/beauty/set3-wall/base2/step1.png") },
              { uid: "beauty_wall_base2_step4", label: "Pose 4", cue: "Hands down, soften posture", img: ASSET("poses/beauty/set3-wall/base2/step1.png") },
            ],
          },
        ],
      },
      {
        id: "beauty_set4_table",
        name: "SET 4 — TABLE",
        bases: [
          {
            id: "beauty_table_base1",
            name: "Base Pose 1",
            curated: true,
            flow: [
              { uid: "beauty_table_base1_step1", label: "Base Pose 1", cue: "Symmetric elbows, tapered arms", img: ASSET("poses/beauty/set4-table/base1/step1.png") },
              { uid: "beauty_table_base1_step2", label: "Pose 2", cue: "Asymmetric, right elbow out", img: ASSET("poses/beauty/set4-table/base1/step1.png") },
              { uid: "beauty_table_base1_step3", label: "Pose 3", cue: "Hands up, right higher, tilt", img: ASSET("poses/beauty/set4-table/base1/step1.png") },
              { uid: "beauty_table_base1_step4", label: "Pose 4", cue: "Elbows together, frame face", img: ASSET("poses/beauty/set4-table/base1/step1.png") },
              { uid: "beauty_table_base1_step5", label: "Pose 5", cue: "Chest away, neck long", img: ASSET("poses/beauty/set4-table/base1/step1.png") },
              { uid: "beauty_table_base1_step6", label: "Pose 6", cue: "Hands out, crossing lightly", img: ASSET("poses/beauty/set4-table/base1/step1.png") },
              { uid: "beauty_table_base1_step7", label: "Pose 7", cue: "Smoking hands, elbows in", img: ASSET("poses/beauty/set4-table/base1/step1.png") },
              { uid: "beauty_table_base1_step8", label: "Pose 8", cue: "Hands behind hair, elbows crossed", img: ASSET("poses/beauty/set4-table/base1/step1.png") },
              { uid: "beauty_table_base1_step9", label: "Pose 9", cue: "Elbow one way, hands across", img: ASSET("poses/beauty/set4-table/base1/step1.png") },
              { uid: "beauty_table_base1_step10", label: "Pose 10", cue: "Body out, head left", img: ASSET("poses/beauty/set4-table/base1/step1.png") },
              { uid: "beauty_table_base1_step11", label: "Pose 11", cue: "Hand in hair, body sideways", img: ASSET("poses/beauty/set4-table/base1/step1.png") },
              { uid: "beauty_table_base1_step12", label: "Pose 12", cue: "Both hands up", img: ASSET("poses/beauty/set4-table/base1/step1.png") },
              { uid: "beauty_table_base1_step13", label: "Pose 13", cue: "Hands tucked, tight composition", img: ASSET("poses/beauty/set4-table/base1/step1.png") },
              { uid: "beauty_table_base1_step14", label: "Pose 14", cue: "Hugging motion, one hand off", img: ASSET("poses/beauty/set4-table/base1/step1.png") },
              { uid: "beauty_table_base1_step15", label: "Pose 15", cue: "Double hug, compress shape", img: ASSET("poses/beauty/set4-table/base1/step1.png") },
              { uid: "beauty_table_base1_step16", label: "Pose 16", cue: "Elbow off, one up one down, tilt", img: ASSET("poses/beauty/set4-table/base1/step1.png") },
            ],
          },
        ],
      },
      {
        id: "beauty_set5_staggered_box",
        name: "SET 5 — STAGGERED SEATING (BOX)",
        bases: [
          {
            id: "beauty_box_base1",
            name: "Base Pose 1",
            curated: true,
            flow: [
              { uid: "beauty_box_base1_step1", label: "Base Pose 1", cue: "Recline on box, elbow down, body relaxed", img: ASSET("poses/beauty/set5-box/base1/step1.png") },
              { uid: "beauty_box_base1_step2", label: "Pose 2", cue: "Hands inside, elbows supported", img: ASSET("poses/beauty/set5-box/base1/step1.png") },
              { uid: "beauty_box_base1_step3", label: "Pose 3", cue: "Hand behind hair", img: ASSET("poses/beauty/set5-box/base1/step1.png") },
              { uid: "beauty_box_base1_step4", label: "Pose 4", cue: "Triangle shape, elbow anchored", img: ASSET("poses/beauty/set5-box/base1/step1.png") },
              { uid: "beauty_box_base1_step5", label: "Pose 5", cue: "Elbows together, hands on chin", img: ASSET("poses/beauty/set5-box/base1/step1.png") },
              { uid: "beauty_box_base1_step6", label: "Pose 6", cue: "Rotate body around elbows", img: ASSET("poses/beauty/set5-box/base1/step1.png") },
              { uid: "beauty_box_base1_step7", label: "Pose 7", cue: "Feet on box, hug knees", img: ASSET("poses/beauty/set5-box/base1/step1.png") },
              { uid: "beauty_box_base1_step8", label: "Pose 8", cue: "Remove box, horizontal tilt", img: ASSET("poses/beauty/set5-box/base1/step1.png") },
              { uid: "beauty_box_base1_step9", label: "Pose 9", cue: "Big smile, tilt, hold", img: ASSET("poses/beauty/set5-box/base1/step1.png") },
              { uid: "beauty_box_base1_step10", label: "Pose 10", cue: "One knee hugged, elbow down", img: ASSET("poses/beauty/set5-box/base1/step1.png") },
            ],
          },
          {
            id: "beauty_box_base2",
            name: "Base Pose 2",
            curated: true,
            flow: [
              { uid: "beauty_box_base2_step1", label: "Base Pose 2", cue: "Seated sideways on box, torso upright, knees angled", img: ASSET("poses/beauty/set5-box/base2/step1.png") },
              { uid: "beauty_box_base2_step2", label: "Pose 2", cue: "Elbow resting on knee, hand relaxed", img: ASSET("poses/beauty/set5-box/base2/step1.png") },
              { uid: "beauty_box_base2_step3", label: "Pose 3", cue: "Lean slightly forward, keep spine long", img: ASSET("poses/beauty/set5-box/base2/step1.png") },
              { uid: "beauty_box_base2_step4", label: "Pose 4", cue: "Hands together, soften shoulders", img: ASSET("poses/beauty/set5-box/base2/step1.png") },
              { uid: "beauty_box_base2_step5", label: "Pose 5", cue: "Chin around, small tilt", img: ASSET("poses/beauty/set5-box/base2/step1.png") },
              { uid: "beauty_box_base2_step6", label: "Pose 6", cue: "Change composition, tighter crop", img: ASSET("poses/beauty/set5-box/base2/step1.png") },
            ],
          },
        ],
      },
    ],
  },

  {
    id: "fifty_plus",
    name: "Age 50+",
    sets: [
      {
        id: "50p_set1_apple_box_bright_gold",
        name: "SET 1 — APPLE BOX (BRIGHT / GOLD)",
        bases: [
          {
            id: "50p_base1",
            name: "Base Pose 1",
            curated: true,
            flow: [
              { uid: "50p_set1_base1_step1", label: "Base Pose 1", cue: "Seated tall, apple box, chin around, fingertips light" },
              { uid: "50p_set1_base1_step2", label: "Pose 2", cue: `Hands together and down and forward\nShoulders dropped\nRemove the second box` },
              { uid: "50p_set1_base1_step3", label: "Pose 3", cue: "Comp 1 Baby smile" },
              { uid: "50p_set1_base1_step4", label: "Pose 4", cue: "Comp 2" },
            ],
          },
        ],
      },
      {
        id: "50p_set2_wall_white_bright",
        name: "SET 2 — WALL (WHITE / BRIGHT)",
        bases: [
          {
            id: "50p_base2",
            name: "Base Pose 2",
            curated: true,
            flow: [
              {
                uid: "50p_set2_base2_step1",
                label: "Base Pose 2",
                cue: `Take your body away from the wall
45 degrees
Touch body with your hands
Lean with your body
Touch up and back
Chin around
Tilt the camera`,
              },
              { uid: "50p_set2_base2_step2", label: "Pose 3", cue: "Chin around, soften eyes" },
              { uid: "50p_set2_base2_step3", label: "Pose 4", cue: "Chin down, baby smile" },
              { uid: "50p_set2_base2_step4", label: "Pose 5", cue: "Chin down and horizontal" },
              { uid: "50p_set2_base2_step5", label: "Pose 6", cue: `Keep your shoulder drop to me\nRoll your shoulder back to the wall\nChange weight to the other foot` },
              { uid: "50p_set2_base2_step6", label: "Pose 7", cue: `Hold hands around the body\nShoulders down to me` },
            ],
          },
        ],
      },
      {
        id: "50p_set5_standing_bright_gold",
        name: "SET 5 — STANDING (BRIGHT / GOLD)",
        bases: [
          {
            id: "50p_base5",
            name: "Base Pose 5",
            curated: true,
            flow: [
              { uid: "50p_set5_base5_step1", label: "Base Pose 5", cue: `Hands down\nTouch\nElbow back\nFoot towards me\nChin forward and down\nDrop shoulder down\nTilt camera` },
              { uid: "50p_set5_base5_step2", label: "Pose 6", cue: "Horizontal" },
              { uid: "50p_set5_base5_step3", label: "Pose 7", cue: "Chin forward and down" },
              { uid: "50p_set5_base5_step4", label: "Pose 8", cue: "More air, chin around" },
            ],
          },
        ],
      },
    ],
  },

  {
    id: "personal_branding_man",
    name: "Personal Branding (Man)",
    sets: [
      {
        id: "pbm_set1_stool_dark_side_light",
        name: "SET 1 — STOOL (DARK / SIDE LIGHT)",
        bases: [
          {
            id: "pbm_base1",
            name: "Base Pose 1",
            curated: true,
            flow: [
              { uid: "pbm_set1_base1_step1", label: "Base Pose 1", cue: `Sitting on a stool\n45 degrees\nOne foot raised\nHands together\nSit upright\nChin towards me` },
              { uid: "pbm_set1_base1_step2", label: "Pose 2", cue: "Step back, easy smile" },
              { uid: "pbm_set1_base1_step3", label: "Pose 3", cue: `Lean onto that knee a bit more\nDrop right back shoulder\nChin forward\nSoft smile` },
              { uid: "pbm_set1_base1_step4", label: "Pose 4", cue: "Relax your posture and chin around to me" },
              { uid: "pbm_set1_base1_step5", label: "Pose 5", cue: "More smile" },
              { uid: "pbm_set1_base1_step6", label: "Pose 6", cue: "Hands on your thigh, easy smile" },
            ],
          },
        ],
      },
      {
        id: "pbm_set2_real_casual_armani",
        name: "SET 2 — REAL CASUAL (ARMANI)",
        bases: [
          {
            id: "pbm_base2",
            name: "Base Pose 2",
            curated: true,
            flow: [
              { uid: "pbm_set2_base2_step1", label: "Base Pose 2", cue: "Same pose but go down, fingers together" },
              { uid: "pbm_set2_base2_step2", label: "Pose 3", cue: "Hands together" },
              { uid: "pbm_set2_base2_step3", label: "Pose 4", cue: "Easy smile, show me some teeth" },
            ],
          },
        ],
      },
      {
        id: "pbm_set3_more_casual_wall_standing",
        name: "SET 3 — MORE CASUAL LOOK, STANDING ON THE WALL",
        bases: [
          {
            id: "pbm_base3",
            name: "Base Pose 3",
            curated: true,
            flow: [
              { uid: "pbm_set3_base3_step1", label: "Base Pose 3", cue: "45 degrees, weight on the back foot, arms crossed" },
              { uid: "pbm_set3_base3_step2", label: "Pose 4", cue: "Arms crossed low, weight settled" },
              { uid: "pbm_set3_base3_step3", label: "Pose 5", cue: "Arms down, open shoulders" },
              { uid: "pbm_set3_base3_step4", label: "Pose 6", cue: `Stand away from the wall\nFeet apart\nShoulders to me` },
            ],
          },
        ],
      },
      {
        id: "pbm_set4_seated_chair",
        name: "SET 4 — SEATED (CHAIR)",
        bases: [
          {
            id: "pbm_base4",
            name: "Base Pose 4",
            curated: true,
            flow: [
              { uid: "pbm_set4_base4_step1", label: "Base Pose 4", cue: `Sit tall, 45 degrees\nBack foot on a half box\nHands on thigh, loose` },
              { uid: "pbm_set4_base4_step2", label: "Pose 5", cue: "Rotate a bit more, relax into that posture" },
              { uid: "pbm_set4_base4_step3", label: "Pose 6", cue: "Easy smile" },
            ],
          },
        ],
      },
    ],
  },
];

/* =========================================
   UI SETTINGS
   ========================================= */
const RHYTHMS = [
  { id: "slow", label: "Slow", seconds: 10 },
  { id: "normal", label: "Normal", seconds: 8 },
  { id: "fast", label: "Fast", seconds: 6 },
];

const STORAGE_KEY = "pose_rehearsal_app_state_css_v5_measuredbars";

/* =========================================
   HELPERS
   ========================================= */
function safeJsonParse(str, fallback) {
  try {
    return JSON.parse(str);
  } catch {
    return fallback;
  }
}
function deepClone(x) {
  return JSON.parse(JSON.stringify(x));
}
function makeId(prefix = "id") {
  return `${prefix}_${Math.random().toString(16).slice(2)}_${Date.now().toString(16)}`;
}
function mergeUserBasesIntoGenres(baseGenres, userBasesBySet) {
  if (!userBasesBySet) return baseGenres;
  const genres = deepClone(baseGenres);
  for (const g of genres) {
    for (const s of g.sets || []) {
      const extra = userBasesBySet[s.id];
      if (Array.isArray(extra) && extra.length) {
        s.bases = [...(s.bases || []), ...extra];
      }
    }
  }
  return genres;
}
function clamp(n, a, b) {
  return Math.max(a, Math.min(b, n));
}
function cueTierFromText(cue = "") {
  const text = String(cue);
  const normalized = text.replace(/\s+/g, " ").trim();
  const len = normalized.length;
  const lines = (text.match(/\n/g) || []).length + 1;
  const words = normalized ? normalized.split(" ").length : 0;

  if (lines >= 6 || len >= 180 || words >= 22) return "t4";
  if (lines >= 5 || len >= 150 || words >= 18) return "t3";
  if (lines >= 4 || len >= 120 || words >= 14) return "t2";
  return "t1";
}
function normalizeMyPrefix(name) {
  let n = String(name || "").trim();
  while (n.toLowerCase().startsWith("my ")) n = n.slice(3).trim();
  return n;
}
function makeDuplicateName(originalName, existingNames) {
  const base = normalizeMyPrefix(originalName);
  const cleanBase = base || "Base Pose";
  const prefix = `My ${cleanBase}`;

  if (!existingNames || !existingNames.length) return prefix;

  const lowerExisting = new Set(existingNames.map((x) => String(x).toLowerCase()));
  if (!lowerExisting.has(prefix.toLowerCase())) return prefix;

  let k = 2;
  while (lowerExisting.has(`${prefix} (${k})`.toLowerCase())) k += 1;
  return `${prefix} (${k})`;
}

/* =========================================
   NO-TAILWIND CSS
   ========================================= */
function Styles() {
  return (
    <style>{`
      :root{
        --ink:#0f172a;
        --muted:#475569;
        --line:rgba(15,23,42,.14);
        --card:rgba(255,255,255,.86);
        --shadow: 0 20px 45px rgba(15,23,42,.12);
        --shadow2: 0 10px 25px rgba(15,23,42,.10);
        --radius: 22px;
        --radius2: 28px;
        --grad: linear-gradient(90deg,#4f46e5,#d946ef,#fb7185);
        --bg: linear-gradient(135deg,#fff7fb,#ffffff,#f2f6ff);
      }

      *{ box-sizing:border-box; }
      html, body{ height:100%; }
      body{
        margin:0;
        background:var(--bg);
        color:var(--ink);
        font-family: ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial;
        overflow-y: auto;
      }

      .wrap{ max-width: 980px; margin: 0 auto; padding: 24px 16px 44px; }

      .pill{ display:inline-flex; align-items:center; gap:8px; padding:6px 10px; border:1px solid var(--line); background:rgba(255,255,255,.85); border-radius:999px; font-size:12px; color:var(--muted); box-shadow: 0 2px 10px rgba(15,23,42,.06); }
      .dot{ width:8px; height:8px; border-radius:999px; background:#f59e0b; }

      .h1{ font-size: clamp(26px, 3.8vw, 52px); line-height: 1.02; margin: 14px 0 8px; letter-spacing:-0.03em; }
      .sub{ margin:0; font-size: 16px; color: var(--muted); }

      .card{
        margin-top: 18px;
        border:1px solid var(--line);
        background: var(--card);
        border-radius: var(--radius2);
        box-shadow: var(--shadow);
        backdrop-filter: blur(10px);
        overflow: hidden;
      }
      .cardInner{ padding: 18px; }
      @media (min-width: 860px){ .cardInner{ padding: 22px; } }

      .grid{ display:grid; grid-template-columns: 1fr; gap: 14px; }
      @media (min-width: 860px){ .grid{ grid-template-columns: 1fr 1fr 1fr; } }

      .label{ font-size:12px; font-weight: 900; color: var(--muted); display:flex; align-items:center; gap:8px; }

      .helpIcon{
        width: 18px; height: 18px;
        border-radius: 999px;
        border: 1px solid var(--line);
        background: rgba(255,255,255,.92);
        color: var(--muted);
        font-weight: 950;
        font-size: 12px;
        display:inline-flex;
        align-items:center;
        justify-content:center;
        user-select:none;
      }

      .helper{
        margin-top: 6px;
        font-size: 13px;
        color: var(--muted);
        line-height: 1.35;
      }

      .control{
        margin-top:8px;
        width:100%;
        height: 46px;
        border-radius: 16px;
        border:1px solid var(--line);
        background: rgba(255,255,255,.96);
        padding: 0 14px;
        font-size: 14px;
        color: var(--ink);
        outline: none;
        box-shadow: 0 2px 12px rgba(15,23,42,.06);
      }
      .control:focus{
        border-color: rgba(79,70,229,.55);
        box-shadow: 0 0 0 5px rgba(79,70,229,.18), 0 2px 12px rgba(15,23,42,.06);
      }

      .row{ display:flex; align-items:center; justify-content:space-between; gap:12px; margin-top: 12px; flex-wrap:wrap; }
      .check{ display:flex; align-items:center; gap:10px; color:var(--muted); font-size:14px; user-select:none; }
      .check input{ width:18px; height:18px; accent-color: #4f46e5; }

      .btn{
        height: 44px;
        padding: 0 14px;
        border-radius: 16px;
        border:1px solid var(--line);
        background: rgba(255,255,255,.95);
        color: var(--ink);
        font-weight: 900;
        font-size: 14px;
        cursor: pointer;
        box-shadow: 0 8px 18px rgba(15,23,42,.08);
      }
      .btn:hover{ background: rgba(255,255,255,1); }
      .btn:disabled{ opacity:.45; cursor: not-allowed; }

      .btnPrimary{
        border: none !important;
        background: var(--grad) !important;
        color: #ffffff !important;
      }
      .btnPrimary:hover{ filter: brightness(1.06); }
      .btnPrimary:active{ background: var(--grad) !important; color:#ffffff !important; }
      .btnPrimary:focus{ background: var(--grad) !important; color:#ffffff !important; }
      .btnPrimary:focus-visible{
        outline: 3px solid rgba(79,70,229,.35);
        outline-offset: 2px;
      }

      .btnIcon{
        width: 46px;
        padding:0;
        display:flex;
        align-items:center;
        justify-content:center;
        font-size: 18px;
      }

      .footerActions{ margin-top: 16px; display:flex; justify-content:flex-end; gap:10px; flex-wrap:wrap; }

      /* Rehearsal plan grid */
      .planGrid{ margin-top:14px; display:grid; grid-template-columns: 1fr; gap: 10px; }
      @media (min-width: 860px){ .planGrid{ grid-template-columns: 1fr 1fr; } }
      .planItem{
        border:1px solid var(--line);
        background: rgba(255,255,255,.92);
        border-radius: 18px;
        padding: 14px;
        box-shadow: 0 8px 18px rgba(15,23,42,.06);
      }
      .planDay{ font-size:12px; font-weight: 900; color: var(--muted); }
      .planText{ margin-top:6px; font-size: 15px; font-weight: 900; color: var(--ink); }

      /* Onboarding */
      .overlay{
        position: fixed; inset: 0; z-index: 10000;
        background: rgba(15,23,42,.45);
        display:flex;
        align-items:center;
        justify-content:center;
        padding: 18px;
      }
      .modal{
        width: min(720px, 100%);
        border-radius: 22px;
        border:1px solid rgba(255,255,255,.25);
        background: rgba(255,255,255,.96);
        box-shadow: 0 30px 70px rgba(15,23,42,.28);
        overflow:hidden;
      }
      .modalInner{ padding: 18px; }
      @media (min-width: 860px){ .modalInner{ padding: 22px; } }
      .modalTitle{ font-size: 18px; font-weight: 950; }
      .modalBody{ margin-top: 10px; color: var(--muted); line-height: 1.45; font-size: 14px; }
      .modalList{ margin-top: 10px; padding-left: 18px; color: var(--muted); line-height: 1.45; font-size: 14px; }
      .modalActions{ display:flex; justify-content:flex-end; gap:10px; margin-top: 14px; flex-wrap:wrap; }

      /* Toast */
      .toastWrap{
        position: fixed;
        left: 12px;
        right: 12px;
        bottom: 12px;
        z-index: 12000;
        display:flex;
        justify-content:center;
        pointer-events:none;
      }
      .toast{
        max-width: 720px;
        border-radius: 999px;
        border: 1px solid rgba(15,23,42,.16);
        background: rgba(255,255,255,.95);
        box-shadow: 0 12px 26px rgba(15,23,42,.14);
        padding: 10px 14px;
        font-size: 13px;
        font-weight: 850;
        color: var(--ink);
      }

      /* SESSION */
      .session{
        position: fixed; inset: 0; z-index: 9999;
        background: var(--bg);
        color: var(--ink);
        --topbar-h: 0px;
        --bottombar-h: 0px;
      }
      .topBar{
        position: fixed; left:0; right:0; top:0; z-index: 2;
        padding-top: env(safe-area-inset-top);
        background: rgba(255,255,255,.92);
        border-bottom: 1px solid var(--line);
        backdrop-filter: blur(10px);
      }
      .topInner{ padding: 10px 12px; }
      @media (min-width: 860px){ .topInner{ padding: 12px 14px; } }

      .topRow{ display:flex; align-items:flex-start; justify-content:space-between; gap: 12px; flex-wrap:wrap; }
      .progLabel{ font-size:12px; font-weight: 900; color: var(--muted); }
      .progNums{ font-size:12px; color: var(--muted); margin-top: 4px; }
      .bar{
        margin-top:10px;
        height: 16px;
        border-radius: 999px;
        background: rgba(15,23,42,.06);
        border: 1px solid var(--line);
        overflow:hidden;
      }
      .barFill{
        height:100%;
        width: 0%;
        background: var(--grad);
        border-radius: 999px;
        transition: width .18s ease;
      }

      /* MOBILE-FIRST SESSION CONTROLS */
      .topControls{
        display:grid;
        grid-template-columns: 1fr 1fr;
        gap: 8px;
        width: 100%;
        margin-top: 10px;
      }
      @media (min-width: 860px){
        .topControls{
          display:flex;
          align-items:center;
          justify-content:flex-end;
          gap:10px;
          flex-wrap:wrap;
          width:auto;
          margin-top: 0;
        }
      }

      .toggle{
        display:flex; align-items:center; justify-content:center; gap:8px;
        font-size: 13px; color: var(--muted);
        padding: 8px 10px;
        border: 1px solid var(--line);
        border-radius: 16px;
        background: rgba(255,255,255,.9);
        user-select:none;
        white-space: nowrap;
        width: 100%;
      }
      @media (min-width: 860px){
        .toggle{
          width:auto;
          border-radius: 999px;
          justify-content:flex-start;
        }
      }
      .toggle input{ width:18px; height:18px; accent-color:#4f46e5; }

      .rhythmSelect{
        margin-top: 0;
        height: 42px;
        width: 100%;
        border-radius: 16px;
      }
      @media (min-width: 860px){
        .rhythmSelect{ width: 170px; }
      }

      .exitBtn{
        grid-column: 1 / -1;
      }
      @media (min-width: 860px){
        .exitBtn{ grid-column:auto; }
      }

      /* ✅ FIX: NO HARDCODED PADDING. MEASURED VARIABLES. */
      .main{
        position:absolute; inset:0;
        padding-top: calc(env(safe-area-inset-top) + var(--topbar-h, 0px));
        padding-bottom: calc(env(safe-area-inset-bottom) + var(--bottombar-h, 0px));
      }

      .mainPad{ height:100%; padding: 14px; }
      .stage{
        height:100%;
        border-radius: var(--radius2);
        border: 1px solid var(--line);
        background: rgba(255,255,255,.88);
        box-shadow: var(--shadow);
        backdrop-filter: blur(10px);
        position: relative;
        overflow:hidden;
        display:flex;
        align-items:center;
        justify-content:center;
        padding: 22px;
      }

      .ref{
        position:absolute;
        right: 12px;
        top: 12px;
        width: 92px;
        height: 92px;
        border-radius: 18px;
        border:1px solid var(--line);
        background: rgba(255,255,255,.95);
        box-shadow: var(--shadow2);
        padding: 8px;
        display:flex;
        align-items:center;
        justify-content:center;
      }
      @media (min-width: 860px){
        .ref{
          right: 14px;
          top: 14px;
          width: 160px;
          height: 160px;
          border-radius: 20px;
          padding: 10px;
        }
      }
      .ref img{ max-width:100%; max-height:100%; object-fit:contain; border-radius: 14px; }

      .cueWrap{
        width: 100%;
        max-width: 40ch;
        text-align: left;
        position: relative;
        z-index: 1;
        overflow: visible;
        max-height: none;
      }

      .cue{
        font-weight: 950;
        letter-spacing: -0.02em;
        white-space: pre-line;
        word-break: break-word;
      }
      .cue.t1{ font-size: clamp(24px, 5.4vw, 56px); line-height: 1.07; }
      .cue.t2{ font-size: clamp(20px, 4.6vw, 46px); line-height: 1.09; }
      .cue.t3{ font-size: clamp(18px, 4.0vw, 38px); line-height: 1.11; }
      .cue.t4{ font-size: clamp(16px, 3.6vw, 32px); line-height: 1.14; }

      .nextBox{
        margin-top: 18px;
        border-radius: 18px;
        border: 1px solid var(--line);
        background: rgba(255,255,255,.94);
        padding: 12px 14px;
        box-shadow: 0 10px 22px rgba(15,23,42,.08);
      }
      .nextLabel{ font-size:12px; font-weight: 900; color: var(--muted); }
      .nextCue{
        margin-top:6px;
        font-size: 15px;
        font-weight: 850;
        white-space: pre-line;
        line-height: 1.22;
      }

      .hint{ margin-top: 14px; font-size: 13px; color: var(--muted); }

      .tapZone{
        position:absolute; inset:0;
        cursor: pointer;
      }

      .bottomBar{
        position: fixed; left:0; right:0; bottom:0; z-index: 2;
        padding-bottom: env(safe-area-inset-bottom);
        background: rgba(255,255,255,.92);
        border-top: 1px solid var(--line);
        backdrop-filter: blur(10px);
      }
      .bottomInner{ padding: 12px 14px; }
      .navRow{ display:flex; gap: 12px; }
      .navBtn{
        flex: 1;
        height: 62px;
        border-radius: 20px;
        font-size: 18px;
        font-weight: 950;
      }

      .warn{
        margin-top: 14px;
        padding: 12px 14px;
        border-radius: 18px;
        border: 1px solid rgba(251,113,133,.35);
        background: rgba(251,113,133,.08);
        color: #9f1239;
        font-weight: 900;
      }
    `}</style>
  );
}

/* =========================================
   APP
   ========================================= */
function AppInner() {
  const persisted = useMemo(() => safeJsonParse(localStorage.getItem(STORAGE_KEY), null), []);

  const [showFullLibrary, setShowFullLibrary] = useState(!!persisted?.showFullLibrary);
  const [favorites, setFavorites] = useState(persisted?.favorites ?? {});
  const [userBasesBySet, setUserBasesBySet] = useState(persisted?.userBasesBySet ?? {});
  const [lastSelection, setLastSelection] = useState(persisted?.lastSelection ?? null);

  const GENRES = useMemo(() => mergeUserBasesIntoGenres(BASE_GENRES, userBasesBySet), [userBasesBySet]);

  const [mode, setMode] = useState("prep"); // prep | session

  const [showOnboarding, setShowOnboarding] = useState(() => {
    const seen = persisted?.seenOnboarding;
    return !seen;
  });

  // Toast
  const [toast, setToast] = useState(null);
  const toastTimer = useRef(null);
  const pushToast = useCallback((msg) => {
    setToast(String(msg));
    if (toastTimer.current) clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToast(null), 2200);
  }, []);

  // ✅ MEASURED BAR FIX (refs)
  const sessionRef = useRef(null);
  const topBarRef = useRef(null);
  const bottomBarRef = useRef(null);

  const fallbackGenreId = GENRES?.[0]?.id ?? "beauty";
  const [genreId, setGenreId] = useState(() => lastSelection?.genreId ?? fallbackGenreId);
  const genre = useMemo(() => GENRES.find((g) => g.id === genreId) ?? GENRES[0] ?? null, [GENRES, genreId]);

  const [setId, setSetId] = useState(() => {
    const byLast = lastSelection?.setId;
    if (byLast && genre?.sets?.some((s) => s.id === byLast)) return byLast;
    return genre?.sets?.[0]?.id ?? "";
  });

  useEffect(() => {
    const byLast = lastSelection?.setId;
    const nextSet = byLast && genre?.sets?.some((s) => s.id === byLast) ? byLast : genre?.sets?.[0]?.id ?? "";
    setSetId(nextSet);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [genreId, lastSelection, genre?.sets]);

  const selectedSet = useMemo(() => genre?.sets?.find((s) => s.id === setId) ?? genre?.sets?.[0] ?? null, [genre, setId]);

  const availableBases = useMemo(() => {
    const bases = selectedSet?.bases ?? [];
    if (showFullLibrary) return bases;
    const curated = bases.filter((b) => b.curated);
    return curated.length ? curated : bases;
  }, [selectedSet, showFullLibrary]);

  const [baseId, setBaseId] = useState(() => {
    const basesAll = selectedSet?.bases ?? [];
    const fav = favorites?.[setId];
    if (fav && basesAll.some((b) => b.id === fav)) return fav;

    const byLast = lastSelection?.baseId;
    if (byLast && basesAll.some((b) => b.id === byLast)) return byLast;

    return availableBases?.[0]?.id ?? "";
  });

  useEffect(() => {
    const basesAll = selectedSet?.bases ?? [];
    const fav = favorites?.[setId];
    if (fav && basesAll.some((b) => b.id === fav)) {
      setBaseId(fav);
      return;
    }
    const byLast = lastSelection?.baseId;
    if (byLast && basesAll.some((b) => b.id === byLast)) {
      setBaseId(byLast);
      return;
    }
    setBaseId(availableBases?.[0]?.id ?? "");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setId, selectedSet?.bases, favorites, lastSelection, availableBases]);

  const selectedBase = useMemo(() => {
    const all = selectedSet?.bases ?? [];
    return all.find((b) => b.id === baseId) ?? availableBases?.[0] ?? null;
  }, [selectedSet, baseId, availableBases]);

  const flow = useMemo(() => selectedBase?.flow ?? [], [selectedBase]);

  // Session state
  const [idx, setIdx] = useState(0);
  const [isOver, setIsOver] = useState(false);

  // Auto-advance
  const [autoOn, setAutoOn] = useState(false);
  const [rhythmId, setRhythmId] = useState("normal");
  const rhythm = useMemo(() => RHYTHMS.find((r) => r.id === rhythmId) ?? RHYTHMS[1], [rhythmId]);

  // Reference image + next hint
  const [showRefImage, setShowRefImage] = useState(persisted?.showRefImage ?? true);
  const [showNextPreview, setShowNextPreview] = useState(persisted?.showNextPreview ?? true);

  const current = useMemo(() => {
    if (!flow.length) return null;
    return flow[clamp(idx, 0, flow.length - 1)] ?? null;
  }, [flow, idx]);

  const nextStep = useMemo(() => {
    if (!flow.length) return null;
    const ni = idx + 1;
    if (ni >= flow.length) return null;
    return flow[ni] ?? null;
  }, [flow, idx]);

  const stepNow = useMemo(() => {
    if (!flow.length) return 0;
    return isOver ? flow.length : clamp(idx + 1, 1, flow.length);
  }, [flow.length, idx, isOver]);

  const progressPct = useMemo(() => {
    if (!flow.length) return 0;
    return Math.round((stepNow / flow.length) * 100);
  }, [flow.length, stepNow]);

  const restartFlow = useCallback(() => {
    setIdx(0);
    setIsOver(false);
    setAutoOn(false);
  }, []);

  const advance = useCallback(() => {
    if (!flow.length) return;
    if (isOver) return;

    const ni = idx + 1;
    if (ni >= flow.length) {
      setIsOver(true);
      setAutoOn(false);
      return;
    }
    setIdx(ni);
  }, [flow.length, idx, isOver]);

  const back = useCallback(() => {
    if (!flow.length) return;

    if (isOver) {
      setIsOver(false);
      setIdx(Math.max(0, flow.length - 1));
      return;
    }

    const pi = idx - 1;
    if (pi < 0) return;
    setIdx(pi);
  }, [flow.length, idx, isOver]);

  // ✅ MEASURE TOP/BOTTOM BAR HEIGHTS (NO GUESSES)
  useLayoutEffect(() => {
    if (mode !== "session") return;
    const elSession = sessionRef.current;
    if (!elSession) return;

    const apply = () => {
      const topH = topBarRef.current ? Math.ceil(topBarRef.current.getBoundingClientRect().height) : 0;
      const bottomH = bottomBarRef.current ? Math.ceil(bottomBarRef.current.getBoundingClientRect().height) : 0;
      elSession.style.setProperty("--topbar-h", `${topH}px`);
      elSession.style.setProperty("--bottombar-h", `${bottomH}px`);
    };

    apply();

    const canRO = typeof ResizeObserver !== "undefined";
    const ro = canRO ? new ResizeObserver(() => apply()) : null;

    if (ro && topBarRef.current) ro.observe(topBarRef.current);
    if (ro && bottomBarRef.current) ro.observe(bottomBarRef.current);

    window.addEventListener("resize", apply);
    window.addEventListener("orientationchange", apply);

    return () => {
      if (ro) ro.disconnect();
      window.removeEventListener("resize", apply);
      window.removeEventListener("orientationchange", apply);
    };
  }, [mode, autoOn, rhythmId, showNextPreview, showRefImage, isOver, flow.length]);

  // Auto-advance timer
  useEffect(() => {
    if (mode !== "session") return;
    if (!autoOn) return;
    if (isOver) return;
    if (!flow.length) return;

    const ms = (rhythm?.seconds
