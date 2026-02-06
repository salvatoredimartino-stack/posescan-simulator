import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";

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
    name: "50+",
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

const STORAGE_KEY = "pose_rehearsal_app_state_css_v3";

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
function firstTruthy(arr, fn) {
  for (const x of arr || []) if (fn(x)) return x;
  return null;
}
function clamp(n, a, b) {
  return Math.max(a, Math.min(b, n));
}
function cueTierFromText(cue = "") {
  // Prevent “in-card scrolling” by scaling type down when content is long.
  const text = String(cue);
  const len = text.replace(/\s+/g, " ").trim().length;

  // Multiple lines should reduce size earlier.
  const lines = (text.match(/\n/g) || []).length + 1;

  // Conservative tiers (keeps readability, avoids overflow).
  if (lines >= 6 || len >= 170) return "t3";
  if (lines >= 4 || len >= 120) return "t2";
  return "t1";
}

/* =========================================
   NO-TAILWIND CSS (works on GitHub Pages)
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
      body{
        margin:0;
        background:var(--bg);
        color:var(--ink);
        font-family: ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial;
      }

      .wrap{ max-width: 980px; margin: 0 auto; padding: 24px 16px 44px; }

      .pill{ display:inline-flex; align-items:center; gap:8px; padding:6px 10px; border:1px solid var(--line); background:rgba(255,255,255,.85); border-radius:999px; font-size:12px; color:var(--muted); box-shadow: 0 2px 10px rgba(15,23,42,.06); }
      .dot{ width:8px; height:8px; border-radius:999px; background:#f59e0b; }
      .dot.session{ background:#10b981; }

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

      .label{ font-size:12px; font-weight: 800; color: var(--muted); display:flex; align-items:center; gap:8px; }
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
        cursor: default;
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

      .row{ display:flex; align-items:center; justify-content:space-between; gap:12px; margin-top: 12px; }
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
        border: none;
        background: var(--grad);
        color: white;
      }
      .btnPrimary:hover{ filter: brightness(1.06); }

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
        pointer-events:none;
        max-width: 720px;
        width: fit-content;
        border-radius: 999px;
        border: 1px solid rgba(15,23,42,.16);
        background: rgba(255,255,255,.95);
        box-shadow: 0 12px 26px rgba(15,23,42,.14);
        padding: 10px 14px;
        font-size: 13px;
        font-weight: 850;
        color: var(--ink);
      }

      /* SESSION overlay */
      .session{
        position: fixed; inset: 0; z-index: 9999;
        background: var(--bg);
        color: var(--ink);
      }
      .topBar{
        position: fixed; left:0; right:0; top:0; z-index: 2;
        padding-top: env(safe-area-inset-top);
        background: rgba(255,255,255,.92);
        border-bottom: 1px solid var(--line);
        backdrop-filter: blur(10px);
      }
      .topInner{ padding: 12px 14px; }
      .topRow{ display:flex; align-items:center; justify-content:space-between; gap: 12px; flex-wrap:wrap; }
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

      .topControls{ display:flex; align-items:center; gap:10px; flex-wrap:wrap; justify-content:flex-end; }
      .toggle{
        display:flex; align-items:center; gap:8px; font-size: 13px; color: var(--muted);
        padding: 8px 10px; border: 1px solid var(--line); border-radius: 999px;
        background: rgba(255,255,255,.9);
        user-select:none;
      }
      .toggle input{ width:18px; height:18px; accent-color:#4f46e5; }

      .main{
        position:absolute; inset:0;
        padding-top: calc(env(safe-area-inset-top) + 118px);
        padding-bottom: calc(env(safe-area-inset-bottom) + 96px);
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

      /* Reference image (bigger + clearer) */
      .ref{
        position:absolute;
        right: 14px;
        top: 14px;
        width: 160px;
        height: 160px;
        border-radius: 20px;
        border:1px solid var(--line);
        background: rgba(255,255,255,.95);
        box-shadow: var(--shadow2);
        padding: 10px;
        display:flex;
        align-items:center;
        justify-content:center;
      }
      .ref img{ max-width:100%; max-height:100%; object-fit:contain; border-radius: 14px; }

      .cueWrap{
        width: 100%;
        max-width: 34ch;
        text-align: left;
        position: relative;
        z-index: 1;
        padding-right: 4px;

        /* Important: avoid inner scrolling (audit issue). */
        overflow: visible;
        max-height: none;
      }

      /* Cue tiers (responsive typography to prevent overflow/scroll) */
      .cue{
        line-height: 1.06;
        font-weight: 950;
        letter-spacing: -0.02em;
        white-space: pre-line;
        word-break: break-word;
      }
      .cue.t1{ font-size: clamp(28px, 4.0vw, 56px); }
      .cue.t2{ font-size: clamp(22px, 3.2vw, 46px); line-height: 1.08; }
      .cue.t3{ font-size: clamp(18px, 2.6vw, 36px); line-height: 1.10; }

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

      .muted{ color: var(--muted); }
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

  // Beginner onboarding (shown once; can be re-opened via "?" badge)
  const [showOnboarding, setShowOnboarding] = useState(() => {
    const seen = persisted?.seenOnboarding;
    return !seen; // first time: true
  });

  // Toast
  const [toast, setToast] = useState(null);
  const toastTimer = useRef(null);
  const pushToast = useCallback((msg) => {
    setToast(String(msg));
    if (toastTimer.current) clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToast(null), 2200);
  }, []);

  // Safe defaults even if data is missing
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

  const selectedSet = useMemo(
    () => genre?.sets?.find((s) => s.id === setId) ?? genre?.sets?.[0] ?? null,
    [genre, setId]
  );

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

  // Reference image + next hint (kept optional)
  const [showRefImage, setShowRefImage] = useState(persisted?.showRefImage ?? true);
  const [showNextPreview, setShowNextPreview] = useState(persisted?.showNextPreview ?? true);

  const current = useMemo(() => {
    if (!flow.length) return null;
    const clampedIdx = clamp(idx, 0, flow.length - 1);
    return flow[clampedIdx] ?? null;
  }, [flow, idx]);

  const nextStep = useMemo(() => {
    if (!flow.length) return null;
    const ni = idx + 1;
    if (ni >= flow.length) return null;
    return flow[ni] ?? null;
  }, [flow, idx]);

  // Always derive progress strictly from idx + isOver (avoid mismatch)
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

  // Auto-advance timer (use setTimeout loop to reduce “stale” behavior)
  useEffect(() => {
    if (mode !== "session") return;
    if (!autoOn) return;
    if (isOver) return;
    if (!flow.length) return;

    const ms = (rhythm?.seconds ?? 8) * 1000;
    const t = setTimeout(() => {
      setIdx((prev) => {
        const ni = prev + 1;
        if (ni >= flow.length) {
          setIsOver(true);
          setAutoOn(false);
          return prev;
        }
        return ni;
      });
    }, ms);

    return () => clearTimeout(t);
  }, [mode, autoOn, isOver, flow.length, rhythm]);

  // Favorite toggle
  const isFavorite = favorites?.[setId] === baseId;
  const toggleFavorite = () => {
    setFavorites((prev) => {
      const next = { ...(prev || {}) };
      if (next[setId] === baseId) {
        delete next[setId];
        pushToast("Removed favorite for this set.");
      } else {
        next[setId] = baseId;
        pushToast("Saved as favorite for this set.");
      }
      return next;
    });
  };

  // Duplicate (with feedback)
  const duplicateAnchor = () => {
    if (!selectedBase || !selectedSet) return;
    const copy = deepClone(selectedBase);
    copy.id = makeId("my_base");
    copy.name = `My ${selectedBase.name || "Base Pose"}`;
    copy.curated = true;
    copy.flow = (copy.flow || []).map((step) => ({ ...step, uid: makeId("my_step") }));

    setUserBasesBySet((prev) => {
      const next = { ...(prev || {}) };
      const arr = Array.isArray(next[selectedSet.id]) ? [...next[selectedSet.id]] : [];
      arr.push(copy);
      next[selectedSet.id] = arr;
      return next;
    });

    setTimeout(() => setBaseId(copy.id), 0);
    pushToast("Duplicated. You’re now on your copy (My Base…).");
  };

  // Reset session when selection changes
  useEffect(() => {
    setIdx(0);
    setIsOver(false);
    setAutoOn(false);
  }, [genreId, setId, baseId]);

  const hasAnyImagesInFlow = useMemo(() => (flow || []).some((s) => !!s?.img), [flow]);

  // Rehearsal plan (dynamic, so it can’t mismatch the selected genre)
  const rehearsalPlan = useMemo(() => {
    const sets = genre?.sets ?? [];
    const usable = sets.slice(0, Math.min(5, sets.length));
    const dayItems = usable.map((s, i) => ({
      day: `Day ${i + 1}`,
      text: `${s.name} — run 3 times`,
    }));

    if (usable.length >= 2) {
      dayItems.push({ day: `Day ${usable.length + 1}`, text: `Full session (${usable.map((x) => x.name.replace(/^SET\\s+\\d+\\s+—\\s+/i, "Set ")).slice(0, usable.length).join(", ")}) once, slow` });
      dayItems.push({ day: `Day ${usable.length + 2}`, text: `Full session once, normal pace` });
    } else if (usable.length === 1) {
      dayItems.push({ day: "Day 2", text: "Repeat the same set — run 3 times" });
      dayItems.push({ day: "Day 3", text: "Repeat the same set — run 3 times" });
      dayItems.push({ day: "Day 4", text: "Repeat the same set — run 3 times" });
      dayItems.push({ day: "Day 5", text: "Repeat the same set — run 3 times" });
      dayItems.push({ day: "Day 6", text: "Run the set once, slow" });
      dayItems.push({ day: "Day 7", text: "Run the set once, normal pace" });
    }

    // Keep at most 7 days visible
    return dayItems.slice(0, 7);
  }, [genre]);

  // Persist (also persist onboarding seen flag)
  useEffect(() => {
    const payload = {
      showFullLibrary,
      favorites,
      userBasesBySet,
      lastSelection: { genreId, setId, baseId },
      showRefImage,
      showNextPreview,
      seenOnboarding: !showOnboarding ? true : (persisted?.seenOnboarding ?? false),
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showFullLibrary, favorites, userBasesBySet, genreId, setId, baseId, showRefImage, showNextPreview, showOnboarding]);

  const beginSession = () => {
    setLastSelection({ genreId, setId, baseId });
    setMode("session");
    restartFlow();
    pushToast("Session started. Use Next / Back.");
  };

  const exitSession = () => {
    setMode("prep");
    setIsOver(false);
    setAutoOn(false);
    pushToast("Exited session.");
  };

  const noData = !Array.isArray(GENRES) || GENRES.length === 0;

  const cueTier = useMemo(() => cueTierFromText(current?.cue ?? ""), [current?.cue]);

  return (
    <>
      <Styles />

      {/* Onboarding overlay */}
      {mode === "prep" && showOnboarding && (
        <div className="overlay" role="dialog" aria-modal="true" aria-label="How this works">
          <div className="modal">
            <div className="modalInner">
              <div className="modalTitle">How this works (30 seconds)</div>
              <div className="modalBody">
                This tool runs a pose flow step-by-step so you don’t need to memorize poses.
              </div>
              <ul className="modalList">
                <li><strong>Genre</strong> = a category (e.g. Beauty, 50+, Men).</li>
                <li><strong>Set</strong> = the environment / setup (stool, wall, table, etc.).</li>
                <li><strong>Base</strong> = the starting pose for that set.</li>
                <li>Press <strong>Begin session</strong> and use <strong>Next</strong> / <strong>Back</strong>.</li>
              </ul>
              <div className="modalActions">
                <button
                  className="btn"
                  onClick={() => {
                    setShowOnboarding(false);
                    pushToast("Tip: you can reopen this with the “?” badge.");
                  }}
                >
                  Got it
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Toast */}
      {toast ? (
        <div className="toastWrap" aria-live="polite" aria-atomic="true">
          <div className="toast">{toast}</div>
        </div>
      ) : null}

      {/* PREP */}
      {mode === "prep" && (
        <div className="wrap">
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12 }}>
            <div className="pill">
              <span className="dot" />
              Prep
            </div>

            <button
              className="btn"
              style={{ height: 34, borderRadius: 999, padding: "0 12px" }}
              onClick={() => setShowOnboarding(true)}
              title="Help / How this works"
              aria-label="Open help"
            >
              ?
            </button>
          </div>

          <h1 className="h1">Pose Flow Operator</h1>
          <p className="sub">Step-by-step cues to run a session without memorising poses.</p>

          {noData ? (
            <div className="warn">
              DATA ERROR: GENRES is empty. That means BASE_GENRES didn’t load. Check App.jsx has the full BASE_GENRES array.
            </div>
          ) : null}

          <div className="card">
            <div className="cardInner">
              <div className="grid">
                <div>
                  <div className="label">
                    Genre <span className="helpIcon" title="Pick the category (Beauty, 50+, Men, etc.).">i</span>
                  </div>
                  <select className="control" value={genreId} onChange={(e) => setGenreId(e.target.value)}>
                    {GENRES.map((g) => (
                      <option key={g.id} value={g.id}>
                        {g.name}
                      </option>
                    ))}
                  </select>
                  <div className="helper">Choose the type of shoot this pose library belongs to.</div>
                </div>

                <div>
                  <div className="label">
                    Set <span className="helpIcon" title="Pick the setup/environment (stool, wall, table…).">i</span>
                  </div>
                  <select className="control" value={setId} onChange={(e) => setSetId(e.target.value)}>
                    {(genre?.sets ?? []).map((s) => (
                      <option key={s.id} value={s.id}>
                        {s.name}
                      </option>
                    ))}
                  </select>
                  <div className="helper">This usually matches your lighting/background/prop setup.</div>
                </div>

                <div>
                  <div className="label">
                    Base <span className="helpIcon" title="Pick the starting pose for this set.">i</span>
                  </div>
                  <select className="control" value={baseId} onChange={(e) => setBaseId(e.target.value)}>
                    {availableBases.map((b) => (
                      <option key={b.id} value={b.id}>
                        {b.name}
                      </option>
                    ))}
                  </select>

                  <div className="row">
                    <label
                      className="check"
                      title="Curated hides non-core poses. Turn on to see everything in this set."
                      aria-label="Show full library (show all bases, not just curated)"
                    >
                      <input type="checkbox" checked={showFullLibrary} onChange={(e) => setShowFullLibrary(e.target.checked)} />
                      Show full library
                    </label>

                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <span className="muted" style={{ fontSize: 13, fontWeight: 800 }}>
                        Favorite
                      </span>
                      <button
                        className="btn btnIcon"
                        onClick={toggleFavorite}
                        title="Save this base as the default for this set"
                        aria-label="Toggle favorite base for this set"
                      >
                        {isFavorite ? "★" : "☆"}
                      </button>
                    </div>
                  </div>

                  <div className="footerActions">
                    <button
                      className="btn"
                      onClick={duplicateAnchor}
                      disabled={!selectedBase}
                      title="Create a copy of this base (so you can customize later)"
                      aria-label="Duplicate this base"
                    >
                      Duplicate
                    </button>

                    <button
                      className="btn btnPrimary"
                      onClick={beginSession}
                      disabled={!flow.length}
                      title={flow.length ? "Start the step-by-step flow" : "No steps available for this base"}
                      aria-label="Begin session"
                    >
                      Begin session
                    </button>
                  </div>

                  {!flow.length ? (
                    <div className="warn" style={{ marginTop: 12 }}>
                      This base has no steps (flow is empty). Choose another base.
                    </div>
                  ) : null}
                </div>
              </div>
            </div>
          </div>

          {/* Rehearsal plan (dynamic, so it can’t mismatch selection) */}
          <div className="card">
            <div className="cardInner">
              <div className="label" style={{ fontSize: 14, fontWeight: 950, color: "var(--ink)" }}>
                Rehearsal plan (7 days)
              </div>
              <p className="sub" style={{ marginTop: 6 }}>
                A simple practice plan built from the sets in <strong>{genre?.name ?? "this genre"}</strong>.
              </p>

              <div className="planGrid">
                {rehearsalPlan.map((x) => (
                  <div key={x.day} className="planItem">
                    <div className="planDay">{x.day}</div>
                    <div className="planText">{x.text}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SESSION */}
      {mode === "session" && (
        <div className="session">
          <div className="topBar">
            <div className="topInner">
              <div className="topRow">
                <div style={{ flex: 1, minWidth: 260 }}>
                  <div className="progLabel">Progress</div>
                  <div className="progNums">
                    <strong style={{ color: "var(--ink)" }}>{stepNow}</strong> / {flow.length || 0} ({progressPct}%)
                  </div>
                  <div className="bar">
                    <div className="barFill" style={{ width: `${progressPct}%` }} />
                  </div>
                </div>

                <div className="topControls">
                  <label
                    className="toggle"
                    title="Auto-advance: automatically go to the next cue after the chosen time"
                    aria-label="Toggle auto-advance"
                  >
                    <input type="checkbox" checked={autoOn} onChange={(e) => setAutoOn(e.target.checked)} disabled={isOver} />
                    Auto-advance
                  </label>

                  <select
                    className="control"
                    style={{ height: 42, width: 170 }}
                    value={rhythmId}
                    onChange={(e) => setRhythmId(e.target.value)}
                    disabled={!autoOn || isOver}
                    title="Auto-advance speed (seconds per step)"
                    aria-label="Select auto-advance speed"
                  >
                    {RHYTHMS.map((r) => (
                      <option key={r.id} value={r.id}>
                        {r.label} ({r.seconds}s)
                      </option>
                    ))}
                  </select>

                  <label
                    className="toggle"
                    title={hasAnyImagesInFlow ? "Show the reference sketch for the current step" : "No images available for this flow"}
                    aria-label="Toggle reference image"
                  >
                    <input
                      type="checkbox"
                      checked={showRefImage}
                      onChange={(e) => setShowRefImage(e.target.checked)}
                      disabled={!hasAnyImagesInFlow}
                    />
                    Image
                  </label>

                  <label className="toggle" title="Show a preview of the next cue" aria-label="Toggle next cue preview">
                    <input type="checkbox" checked={showNextPreview} onChange={(e) => setShowNextPreview(e.target.checked)} />
                    Next preview
                  </label>

                  <button className="btn" onClick={exitSession} title="Return to prep screen" aria-label="Exit session">
                    Exit
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="main">
            <div className="mainPad">
              <div className="stage">
                {/* Keep tap-to-advance as a convenience, but don't over-emphasize it (audit issue). */}
                <div
                  className="tapZone"
                  onClick={() => {
                    if (!isOver) advance();
                  }}
                  role="button"
                  tabIndex={0}
                  aria-label="Advance to next cue"
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      if (!isOver) advance();
                    }
                    if (e.key === "ArrowRight") {
                      e.preventDefault();
                      if (!isOver) advance();
                    }
                    if (e.key === "ArrowLeft") {
                      e.preventDefault();
                      back();
                    }
                  }}
                />

                {showRefImage && hasAnyImagesInFlow && current?.img ? (
                  <div className="ref" aria-hidden="true">
                    <img src={current.img} alt="" draggable={false} />
                  </div>
                ) : null}

                {!isOver ? (
                  <div className="cueWrap">
                    <div className={`cue ${cueTier}`}>{current?.cue ?? ""}</div>

                    {showNextPreview && nextStep?.cue ? (
                      <div className="nextBox">
                        <div className="nextLabel">Next</div>
                        <div className="nextCue">{nextStep.cue}</div>
                      </div>
                    ) : null}

                    <div className="hint">Tip: use Next / Back (or tap the screen). Auto-advance is optional.</div>
                  </div>
                ) : (
                  <div style={{ textAlign: "center", position: "relative", zIndex: 1 }}>
                    <div className="progLabel" style={{ fontSize: 14 }}>
                      Flow complete
                    </div>
                    <div style={{ fontSize: 42, fontWeight: 950, marginTop: 8 }}>—</div>
                    <div style={{ display: "flex", gap: 12, justifyContent: "center", marginTop: 16, flexWrap: "wrap" }}>
                      <button className="btn" onClick={restartFlow} aria-label="Restart flow">
                        Restart
                      </button>
                      <button className="btn btnPrimary" onClick={exitSession} aria-label="Exit session">
                        Exit
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="bottomBar">
            <div className="bottomInner">
              <div className="navRow">
                <button className="btn navBtn" onClick={back} disabled={!flow.length || (!isOver && idx <= 0)} aria-label="Back">
                  Back
                </button>
                <button className="btn btnPrimary navBtn" onClick={advance} disabled={!flow.length || isOver} aria-label="Next">
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

/* =========================================
   EXPORT
   ========================================= */
export default function App() {
  return (
    <ErrorBoundary>
      <AppInner />
    </ErrorBoundary>
  );
}
