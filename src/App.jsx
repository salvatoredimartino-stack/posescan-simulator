import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";

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
            <div style={{ fontWeight: 900, fontSize: 18, marginBottom: 10 }}>
              App crashed (runtime error)
            </div>
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
              This screen is intentional so you don’t get a blank page. Fix the error
              above and the UI will load.
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
const ASSET = (p) =>
  `${import.meta.env.BASE_URL}${String(p).replace(/^\/+/, "")}`;

/* =========================================
   DATA
   - 50+ removed
   - Beauty renamed to Women’s Poses
   - Personal Branding (Man) renamed to Corporate Men’s Poses
   ========================================= */
const BASE_GENRES = [
  {
    id: "beauty",
    name: "Women’s Poses",
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
              {
                uid: "beauty_seated_base1_step1",
                label: "Base Pose 1",
                cue:
                  "Sit on the edge of the stool with your body turned slightly to the side.\n" +
                  "Keep both feet on the floor and rest your hands flat and relaxed.\n" +
                  "Perfect — this is your base pose. From here we’ll make small changes step-by-step.",
                img: ASSET("poses/beauty/set1-seated/base1/step1.png"),
              },
              {
                uid: "beauty_seated_base1_step2",
                label: "Flow 1",
                cue:
                  "Stay just like that.\n" +
                  "Bring your hands gently between your legs and let your elbows relax in.\n" +
                  "Keep the shoulders soft.",
                img: ASSET("poses/beauty/set1-seated/base1/step1.png"),
              },
              {
                uid: "beauty_seated_base1_step3",
                label: "Flow 2",
                cue:
                  "From the same position, rotate your body a little more to the side.\n" +
                  "Keep your posture tall and your neck long.\n" +
                  "Hold that.",
                img: ASSET("poses/beauty/set1-seated/base1/step1.png"),
              },
              {
                uid: "beauty_seated_base1_step4",
                label: "Photographer",
                cue: "Don’t move — I’m just tightening the framing slightly.",
                img: ASSET("poses/beauty/set1-seated/base1/step1.png"),
              },
              {
                uid: "beauty_seated_base1_step5",
                label: "Photographer",
                cue: "Stay exactly the same — switching to a horizontal framing.",
                img: ASSET("poses/beauty/set1-seated/base1/step1.png"),
              },
              {
                uid: "beauty_seated_base1_step6",
                label: "Photographer",
                cue: "Hold that — one more clean variation.",
                img: ASSET("poses/beauty/set1-seated/base1/step1.png"),
              },
            ],
          },
          {
            id: "beauty_seated_base2",
            name: "Base Pose 2",
            curated: true,
            flow: [
              {
                uid: "beauty_seated_base2_step1",
                label: "Base Pose 2",
                cue: "Left foot raised, elbow on knee, torso forward",
                img: ASSET("poses/beauty/set1-seated/base2/step1.png"),
              },
              {
                uid: "beauty_seated_base2_step2",
                label: "Pose 2",
                cue: "Cup fingers softly, relax wrists",
                img: ASSET("poses/beauty/set1-seated/base2/step1.png"),
              },
              {
                uid: "beauty_seated_base2_step3",
                label: "Pose 3",
                cue: "Right hand back pocket, chest open",
                img: ASSET("poses/beauty/set1-seated/base2/step1.png"),
              },
              {
                uid: "beauty_seated_base2_step4",
                label: "Pose 4",
                cue: "Hands between legs, weight grounded",
                img: ASSET("poses/beauty/set1-seated/base2/step1.png"),
              },
              {
                uid: "beauty_seated_base2_step5",
                label: "Pose 5",
                cue: "Lean back slightly, tilt, compose wide",
                img: ASSET("poses/beauty/set1-seated/base2/step1.png"),
              },
              {
                uid: "beauty_seated_base2_step6",
                label: "Pose 6",
                cue: "Elbow out, knee support maintained",
                img: ASSET("poses/beauty/set1-seated/base2/step1.png"),
              },
              {
                uid: "beauty_seated_base2_step7",
                label: "Pose 7",
                cue: "Hands forward, connect elbows visually",
                img: ASSET("poses/beauty/set1-seated/base2/step1.png"),
              },
            ],
          },
          {
            id: "beauty_seated_base3",
            name: "Base Pose 3",
            curated: true,
            flow: [
              {
                uid: "beauty_seated_base3_step1",
                label: "Base Pose 3",
                cue: "Open to camera, elbow on knee, hand on thigh",
                img: ASSET("poses/beauty/set1-seated/base3/step1.png"),
              },
              {
                uid: "beauty_seated_base3_step2",
                label: "Pose 2",
                cue: "Hand to chin, thoughtful pause",
                img: ASSET("poses/beauty/set1-seated/base3/step1.png"),
              },
              {
                uid: "beauty_seated_base3_step3",
                label: "Pose 3",
                cue: "Big smile, hold structure",
                img: ASSET("poses/beauty/set1-seated/base3/step1.png"),
              },
              {
                uid: "beauty_seated_base3_step4",
                label: "Pose 4",
                cue: "Tilt head, smile, hands crossed low",
                img: ASSET("poses/beauty/set1-seated/base3/step1.png"),
              },
            ],
          },
          {
            id: "beauty_seated_base4",
            name: "Base Pose 4",
            curated: true,
            flow: [
              {
                uid: "beauty_seated_base4_step1",
                label: "Base Pose 4",
                cue: "Body forward, legs crossed, arms staggered",
                img: ASSET("poses/beauty/set1-seated/base4/step1.png"),
              },
              {
                uid: "beauty_seated_base4_step2",
                label: "Pose 2",
                cue: "Hand to chin, other grounded",
                img: ASSET("poses/beauty/set1-seated/base4/step1.png"),
              },
              {
                uid: "beauty_seated_base4_step3",
                label: "Pose 3",
                cue: "Smoking-style fingers, relaxed wrist",
                img: ASSET("poses/beauty/set1-seated/base4/step1.png"),
              },
              {
                uid: "beauty_seated_base4_step4",
                label: "Pose 4",
                cue: "Hands down, big smile, head tilt",
                img: ASSET("poses/beauty/set1-seated/base4/step1.png"),
              },
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
              {
                uid: "beauty_standing_base1_step1",
                label: "Base Pose 1",
                cue: "Feet apart, hip rocked, hands on hips",
                img: ASSET("poses/beauty/set2-standing/base1/step1.png"),
              },
              {
                uid: "beauty_standing_base1_step2",
                label: "Pose 2",
                cue: "Change composition, shoot low",
                img: ASSET("poses/beauty/set2-standing/base1/step1.png"),
              },
            ],
          },
          {
            id: "beauty_standing_base2",
            name: "Base Pose 2",
            curated: true,
            flow: [
              {
                uid: "beauty_standing_base2_step1",
                label: "Base Pose 2",
                cue: "Rotate body, foot elevated, chin 45°",
                img: ASSET("poses/beauty/set2-standing/base2/step1.png"),
              },
              {
                uid: "beauty_standing_base2_step2",
                label: "Pose 2",
                cue: "Elbow tucked, slight left tilt",
                img: ASSET("poses/beauty/set2-standing/base2/step1.png"),
              },
              {
                uid: "beauty_standing_base2_step3",
                label: "Pose 3",
                cue: "Chin back to camera",
                img: ASSET("poses/beauty/set2-standing/base2/step1.png"),
              },
              {
                uid: "beauty_standing_base2_step4",
                label: "Pose 4",
                cue: "Rotate, look back, keep breast line",
                img: ASSET("poses/beauty/set2-standing/base2/step1.png"),
              },
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
              {
                uid: "beauty_wall_base1_step1",
                label: "Base Pose 1",
                cue: "45° to camera, weight back, knee forward",
                img: ASSET("poses/beauty/set3-wall/base1/step1.png"),
              },
              {
                uid: "beauty_wall_base1_step2",
                label: "Pose 2",
                cue: "Same pose, tighter composition",
                img: ASSET("poses/beauty/set3-wall/base1/step1.png"),
              },
              {
                uid: "beauty_wall_base1_step3",
                label: "Pose 3",
                cue: "Hands crossed, left under",
                img: ASSET("poses/beauty/set3-wall/base1/step1.png"),
              },
            ],
          },
          {
            id: "beauty_wall_base2",
            name: "Base Pose 2",
            curated: true,
            flow: [
              {
                uid: "beauty_wall_base2_step1",
                label: "Base Pose 2",
                cue: "Rotate body, shift weight forward",
                img: ASSET("poses/beauty/set3-wall/base2/step1.png"),
              },
              {
                uid: "beauty_wall_base2_step2",
                label: "Pose 2",
                cue: "Face wall, flatten shoulders",
                img: ASSET("poses/beauty/set3-wall/base2/step1.png"),
              },
              {
                uid: "beauty_wall_base2_step3",
                label: "Pose 3",
                cue: "Change composition, widen frame",
                img: ASSET("poses/beauty/set3-wall/base2/step1.png"),
              },
              {
                uid: "beauty_wall_base2_step4",
                label: "Pose 4",
                cue: "Hands down, soften posture",
                img: ASSET("poses/beauty/set3-wall/base2/step1.png"),
              },
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
              {
                uid: "beauty_table_base1_step1",
                label: "Base Pose 1",
                cue: "Symmetric elbows, tapered arms",
                img: ASSET("poses/beauty/set4-table/base1/step1.png"),
              },
              {
                uid: "beauty_table_base1_step2",
                label: "Pose 2",
                cue: "Asymmetric, right elbow out",
                img: ASSET("poses/beauty/set4-table/base1/step1.png"),
              },
              {
                uid: "beauty_table_base1_step3",
                label: "Pose 3",
                cue: "Hands up, right higher, tilt",
                img: ASSET("poses/beauty/set4-table/base1/step1.png"),
              },
              {
                uid: "beauty_table_base1_step4",
                label: "Pose 4",
                cue: "Elbows together, frame face",
                img: ASSET("poses/beauty/set4-table/base1/step1.png"),
              },
              {
                uid: "beauty_table_base1_step5",
                label: "Pose 5",
                cue: "Chest away, neck long",
                img: ASSET("poses/beauty/set4-table/base1/step1.png"),
              },
              {
                uid: "beauty_table_base1_step6",
                label: "Pose 6",
                cue: "Hands out, crossing lightly",
                img: ASSET("poses/beauty/set4-table/base1/step1.png"),
              },
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
              {
                uid: "beauty_box_base1_step1",
                label: "Base Pose 1",
                cue: "Recline on box, elbow down, body relaxed",
                img: ASSET("poses/beauty/set5-box/base1/step1.png"),
              },
              {
                uid: "beauty_box_base1_step2",
                label: "Pose 2",
                cue: "Hands inside, elbows supported",
                img: ASSET("poses/beauty/set5-box/base1/step1.png"),
              },
              {
                uid: "beauty_box_base1_step3",
                label: "Pose 3",
                cue: "Hand behind hair",
                img: ASSET("poses/beauty/set5-box/base1/step1.png"),
              },
              {
                uid: "beauty_box_base1_step4",
                label: "Pose 4",
                cue: "Triangle shape, elbow anchored",
                img: ASSET("poses/beauty/set5-box/base1/step1.png"),
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "personal_branding_man",
    name: "Corporate Men’s Poses",
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
              {
                uid: "pbm_set1_base1_step1",
                label: "Base Pose 1",
                cue: `Sitting on a stool
45 degrees
One foot raised
Hands together
Sit upright
Chin towards me`,
              },
              { uid: "pbm_set1_base1_step2", label: "Pose 2", cue: "Step back, easy smile" },
              {
                uid: "pbm_set1_base1_step3",
                label: "Pose 3",
                cue: `Lean onto that knee a bit more
Drop right back shoulder
Chin forward
Soft smile`,
              },
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
              {
                uid: "pbm_set3_base3_step4",
                label: "Pose 6",
                cue: `Stand away from the wall
Feet apart
Shoulders to me`,
              },
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
              {
                uid: "pbm_set4_base4_step1",
                label: "Base Pose 4",
                cue: `Sit tall, 45 degrees
Back foot on a half box
Hands on thigh, loose`,
              },
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

const STORAGE_KEY = "pose_operator_state_v7";

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

function stableHash(str) {
  const s = String(str || "");
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return (h >>> 0);
}

/* 7-day plan, always exactly 7 cards */
function build7DayPlan(genre) {
  const sets = genre?.sets ?? [];
  const names = sets.map((s) => s?.name).filter(Boolean);

  const pick = (i) => {
    if (!names.length) return "Choose a set and run it 3 times";
    return `${names[i % names.length]} — run 3 times`;
  };

  const full = () => {
    if (!names.length) return "Full session — once";
    const shown = names.slice(0, 5);
    return `Full session (${shown.join(", ")}) once`;
  };

  return [
    { day: "Day 1", text: pick(0) },
    { day: "Day 2", text: pick(1) },
    { day: "Day 3", text: pick(2) },
    { day: "Day 4", text: pick(3) },
    { day: "Day 5", text: pick(4) },
    { day: "Day 6", text: `${full()} — slow` },
    { day: "Day 7", text: `${full()} — normal pace` },
  ];
}

/* Client-safe wording: less repetitive, more human, deterministic per step */
function toClientSafeCue(rawCue, stepUid) {
  const raw = String(rawCue || "").trim();
  if (!raw) return "";

  const uidKey = stepUid || raw;
  const h = stableHash(uidKey);

  const reassuranceSoft = [
    "Nice — keep that soft.",
    "That’s it — hold there.",
    "Perfect — stay right there.",
    "Lovely — keep it gentle.",
    "Great — breathe and soften the hands.",
    "Good — shoulders down, relaxed.",
    "Beautiful — don’t change a thing.",
    "Exactly — keep it calm.",
  ];

  const photoOnly = [
    "Stay still — I’m just changing the framing.",
    "Hold that — I’m taking a clean variation.",
    "Don’t move — just a tighter crop.",
    "Perfect — same pose, new angle.",
  ];

  const looksTechnical =
    /\b(comp|composition|horizontal|crop|frame|widen|tighten|tilt camera)\b/i.test(raw);

  // If already reassuring/human, don’t add extra fluff.
  const alreadyHuman =
    /\b(perfect|lovely|beautiful|great|nice|hold that|stay right)\b/i.test(raw);

  // Normalize short, blunt cues into full sentences without sounding robotic
  const lines = raw
    .split("\n")
    .map((l) => l.trim())
    .filter(Boolean)
    .map((l) => (/[.!?]$/.test(l) ? l : `${l}.`));

  let out = lines.join("\n");

  if (looksTechnical) {
    const pick = photoOnly[h % photoOnly.length];
    return pick;
  }

  // Add ONE soft reassurance only when needed:
  // - short cue
  // - or very directive cue without any human marker
  const wordCount = out.replace(/\s+/g, " ").trim().split(" ").filter(Boolean).length;
  const needsSoftener = wordCount <= 10 && !alreadyHuman;

  if (needsSoftener) {
    const pick = reassuranceSoft[h % reassuranceSoft.length];
    out = `${out}\n${pick}`;
  }

  return out;
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
        --radius2: 28px;
        --grad: linear-gradient(90deg,#4f46e5,#d946ef,#fb7185);
        --bg: linear-gradient(135deg,#fff7fb,#ffffff,#f2f6ff);

        --topH: 140px;
        --bottomH: 96px;

        --prepStickyTop: 10px;
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

      .wrap{ max-width: 980px; margin: 0 auto; padding: 18px 16px 44px; }

      .h1{ font-size: clamp(26px, 3.8vw, 52px); line-height: 1.02; margin: 10px 0 8px; letter-spacing:-0.03em; }
      .sub{ margin:0; font-size: 16px; color: var(--muted); }

      .grid{ display:grid; grid-template-columns: 1fr; gap: 14px; }
      @media (min-width: 860px){ .grid{ grid-template-columns: 1fr 1fr 1fr; } }

      .label{ font-size:12px; font-weight: 900; color: var(--muted); display:flex; align-items:center; gap:8px; }

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
        white-space: nowrap;
      }
      .btn:hover{ background: rgba(255,255,255,1); }
      .btn:disabled{ opacity:.45; cursor: not-allowed; }

      .btnPrimary{
        border: none !important;
        background: var(--grad) !important;
        color: #ffffff !important;
      }
      .btnPrimary:hover{ filter: brightness(1.06); }

      .footerActions{ margin-top: 16px; display:flex; justify-content:flex-end; gap:10px; flex-wrap:wrap; }

      .card{
        margin-top: 16px;
        border:1px solid var(--line);
        background: var(--card);
        border-radius: var(--radius2);
        box-shadow: var(--shadow);
        backdrop-filter: blur(10px);
        overflow: hidden;
      }
      .cardInner{ padding: 18px; }
      @media (min-width: 860px){ .cardInner{ padding: 22px; } }

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

      .overlay{
        position: fixed; inset: 0; z-index: 10000;
        background: rgba(15,23,42,.45);
        display:flex;
        align-items:center;
        justify-content:center;
        padding: 18px;
      }
      .modal{
        width: min(780px, 100%);
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

      .warn{
        margin-top: 14px;
        padding: 12px 14px;
        border-radius: 18px;
        border: 1px solid rgba(251,113,133,.35);
        background: rgba(251,113,133,.08);
        color: #9f1239;
        font-weight: 900;
      }

      /* Sticky selector panel */
      .prepSticky{
        position: sticky;
        top: var(--prepStickyTop);
        z-index: 50;
        border: 1px solid var(--line);
        background: rgba(255,255,255,.92);
        box-shadow: 0 16px 40px rgba(15,23,42,.10);
        backdrop-filter: blur(10px);
        border-radius: var(--radius2);
        overflow: hidden;
      }
      .prepStickyInner{ padding: 14px; }
      @media (min-width: 860px){ .prepStickyInner{ padding: 18px; } }

      .stickyHeader{
        display:flex;
        align-items:center;
        justify-content:space-between;
        gap: 10px;
        flex-wrap: wrap;
        padding-bottom: 10px;
        margin-bottom: 10px;
        border-bottom: 1px solid rgba(15,23,42,.10);
      }

      .stickyTitle{
        display:flex;
        align-items:center;
        gap: 10px;
        font-weight: 950;
        letter-spacing:-0.02em;
      }

      .stickyActions{
        display:flex;
        align-items:center;
        gap: 10px;
        flex-wrap: wrap;
      }

      /* Floating Help button */
      .floatHelp{
        position: fixed;
        left: 14px;
        bottom: 14px;
        z-index: 20000;
      }

      /* SESSION */
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

      .topControls{ display:flex; align-items:center; gap:10px; flex-wrap:wrap; justify-content:flex-end; }
      .toggle{
        display:flex; align-items:center; gap:8px; font-size: 13px; color: var(--muted);
        padding: 8px 10px; border: 1px solid var(--line); border-radius: 999px;
        background: rgba(255,255,255,.9);
        user-select:none;
        white-space: nowrap;
      }
      .toggle input{ width:18px; height:18px; accent-color:#4f46e5; }

      .main{
        position:absolute; inset:0;
        padding-top: calc(var(--topH, 140px) + 10px);
        padding-bottom: calc(var(--bottomH, 96px) + 10px);
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
        align-items:flex-start;
        justify-content:center;
        padding: 22px;
      }

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
        z-index: 1;
      }
      .ref img{ max-width:100%; max-height:100%; object-fit:contain; border-radius: 14px; }

      .cueWrap{
        width: 100%;
        max-width: min(40ch, 92vw);
        text-align: left;
        position: relative;
        z-index: 2;
        overflow: auto;
        max-height: 100%;
        padding-bottom: 18px;
        padding-right: 180px;
        -webkit-overflow-scrolling: touch;
      }

      .cue{
        font-weight: 950;
        letter-spacing: -0.02em;
        white-space: pre-line;
        word-break: break-word;
      }
      .cue.t1{ font-size: clamp(24px, 4.2vw, 56px); line-height: 1.07; }
      .cue.t2{ font-size: clamp(21px, 3.6vw, 46px); line-height: 1.09; }
      .cue.t3{ font-size: clamp(18px, 3.1vw, 38px); line-height: 1.11; }
      .cue.t4{ font-size: clamp(16px, 2.7vw, 32px); line-height: 1.14; }

      .miniHint{
        margin-top: 10px;
        border-radius: 16px;
        border: 1px solid var(--line);
        background: rgba(255,255,255,.94);
        padding: 10px 12px;
        box-shadow: 0 10px 22px rgba(15,23,42,.08);
        font-size: 13px;
        color: var(--muted);
        line-height: 1.25;
      }

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
        z-index: 0;
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

      @media (max-width: 520px){
        .stage{ padding: 16px; }
        .ref{ width: 120px; height: 120px; right: 10px; top: 10px; }
        .cueWrap{ padding-right: 130px; }
      }
    `}</style>
  );
}

/* =========================================
   APP
   ========================================= */
function AppInner() {
  const persisted = useMemo(
    () => safeJsonParse(localStorage.getItem(STORAGE_KEY), null),
    []
  );

  const GENRES = BASE_GENRES;

  const [mode, setMode] = useState("prep"); // prep | session

  const [showHelp, setShowHelp] = useState(() => !persisted?.seenHelp);
  const [showSystem, setShowSystem] = useState(false);

  const [toast, setToast] = useState(null);
  const toastTimer = useRef(null);
  const pushToast = useCallback((msg) => {
    setToast(String(msg));
    if (toastTimer.current) clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToast(null), 2200);
  }, []);

  const fallbackGenreId = GENRES?.[0]?.id ?? "beauty";
  const [genreId, setGenreId] = useState(
    () => persisted?.lastSelection?.genreId ?? fallbackGenreId
  );
  const genre = useMemo(
    () => GENRES.find((g) => g.id === genreId) ?? GENRES[0] ?? null,
    [GENRES, genreId]
  );

  const [setId, setSetId] = useState(() => {
    const byLast = persisted?.lastSelection?.setId;
    if (byLast && genre?.sets?.some((s) => s.id === byLast)) return byLast;
    return genre?.sets?.[0]?.id ?? "";
  });

  const selectedSet = useMemo(
    () => genre?.sets?.find((s) => s.id === setId) ?? genre?.sets?.[0] ?? null,
    [genre, setId]
  );

  const [showFullLibrary, setShowFullLibrary] = useState(
    !!persisted?.showFullLibrary
  );

  const availableBases = useMemo(() => {
    const bases = selectedSet?.bases ?? [];
    if (showFullLibrary) return bases;
    const curated = bases.filter((b) => b.curated);
    return curated.length ? curated : bases;
  }, [selectedSet, showFullLibrary]);

  const [baseId, setBaseId] = useState(() => {
    const basesAll = selectedSet?.bases ?? [];
    const byLast = persisted?.lastSelection?.baseId;
    if (byLast && basesAll.some((b) => b.id === byLast)) return byLast;
    return availableBases?.[0]?.id ?? "";
  });

  useEffect(() => {
    const basesAll = selectedSet?.bases ?? [];
    const byLast = persisted?.lastSelection?.baseId;
    if (byLast && basesAll.some((b) => b.id === byLast)) {
      setBaseId(byLast);
      return;
    }
    setBaseId(availableBases?.[0]?.id ?? "");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setId, selectedSet?.bases, availableBases]);

  const selectedBase = useMemo(() => {
    const all = selectedSet?.bases ?? [];
    return all.find((b) => b.id === baseId) ?? availableBases?.[0] ?? null;
  }, [selectedSet, baseId, availableBases]);

  const flow = useMemo(() => selectedBase?.flow ?? [], [selectedBase]);

  const [idx, setIdx] = useState(0);
  const [isOver, setIsOver] = useState(false);

  const [autoOn, setAutoOn] = useState(false);
  const [rhythmId, setRhythmId] = useState("normal");
  const rhythm = useMemo(
    () => RHYTHMS.find((r) => r.id === rhythmId) ?? RHYTHMS[1],
    [rhythmId]
  );

  const [showRefImage, setShowRefImage] = useState(
    persisted?.showRefImage ?? true
  );
  const [showNextPreview, setShowNextPreview] = useState(
    persisted?.showNextPreview ?? true
  );

  const [clientWording, setClientWording] = useState(
    persisted?.clientWording ?? true
  );

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

  useEffect(() => {
    if (mode !== "prep") return;
    setIdx(0);
    setIsOver(false);
    setAutoOn(false);
  }, [genreId, setId, baseId, mode]);

  const hasAnyImagesInFlow = useMemo(
    () => (flow || []).some((s) => !!s?.img),
    [flow]
  );

  const rehearsalPlan = useMemo(() => build7DayPlan(genre), [genre]);

  useEffect(() => {
    const payload = {
      showFullLibrary,
      lastSelection: { genreId, setId, baseId },
      showRefImage,
      showNextPreview,
      seenHelp: !showHelp ? true : persisted?.seenHelp ?? false,
      clientWording,
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    showFullLibrary,
    genreId,
    setId,
    baseId,
    showRefImage,
    showNextPreview,
    showHelp,
    clientWording,
  ]);

  const beginSession = () => {
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

  const resetApp = () => {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {}
    setShowFullLibrary(false);
    setGenreId(fallbackGenreId);
    setShowRefImage(true);
    setShowNextPreview(true);
    setClientWording(true);
    setMode("prep");
    setIdx(0);
    setIsOver(false);
    setAutoOn(false);
    setShowHelp(true);
    pushToast("App reset. Starting fresh.");
  };

  const noData = !Array.isArray(GENRES) || GENRES.length === 0;
  const cueTier = useMemo(
    () => cueTierFromText(current?.cue ?? ""),
    [current?.cue]
  );

  const displayCue = useMemo(() => {
    const raw = current?.cue ?? "";
    const uid = current?.uid ?? "";
    return clientWording ? toClientSafeCue(raw, uid) : String(raw || "");
  }, [current?.cue, current?.uid, clientWording]);

  const displayNextCue = useMemo(() => {
    const raw = nextStep?.cue ?? "";
    const uid = nextStep?.uid ?? "";
    return clientWording ? toClientSafeCue(raw, uid) : String(raw || "");
  }, [nextStep?.cue, nextStep?.uid, clientWording]);

  const topBarRef = useRef(null);
  const bottomBarRef = useRef(null);

  const syncBars = useCallback(() => {
    const root = document.documentElement;
    const th = topBarRef.current?.offsetHeight ?? 0;
    const bh = bottomBarRef.current?.offsetHeight ?? 0;
    root.style.setProperty("--topH", `${th}px`);
    root.style.setProperty("--bottomH", `${bh}px`);
  }, []);

  useLayoutEffect(() => {
    if (mode !== "session") return;

    syncBars();

    const ro = new ResizeObserver(() => syncBars());
    if (topBarRef.current) ro.observe(topBarRef.current);
    if (bottomBarRef.current) ro.observe(bottomBarRef.current);

    window.addEventListener("resize", syncBars);

    return () => {
      ro.disconnect();
      window.removeEventListener("resize", syncBars);
    };
  }, [mode, isOver, syncBars]);

  useEffect(() => {
    if (mode !== "session") return;
    syncBars();
  }, [mode, isOver, syncBars]);

  // Floating help appears when scrolled (prep only)
  const [showFloatHelp, setShowFloatHelp] = useState(false);
  useEffect(() => {
    if (mode !== "prep") return;
    const onScroll = () => setShowFloatHelp(window.scrollY > 260);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [mode]);

  return (
    <>
      <Styles />

      {/* HELP MODAL */}
      {mode === "prep" && showHelp && (
        <div className="overlay" role="dialog" aria-modal="true" aria-label="Help">
          <div className="modal">
            <div className="modalInner">
              <div className="modalTitle">Help (quick)</div>
              <div className="modalBody">
                Choose a library (Genre), choose the setup (Set), choose a starting pose (Base),
                then run the flow step-by-step.
              </div>
              <ul className="modalList">
                <li><strong>Base pose</strong> = your starting position.</li>
                <li><strong>Flow</strong> = small movements from the base pose, one step at a time.</li>
                <li>Press <strong>Begin session</strong>, then use <strong>Next</strong> / <strong>Back</strong>.</li>
              </ul>
              <div className="modalActions">
                <button
                  className="btn btnPrimary"
                  onClick={() => {
                    setShowHelp(false);
                    pushToast("Help closed.");
                  }}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SYSTEM MODAL */}
      {mode === "prep" && showSystem && (
        <div className="overlay" role="dialog" aria-modal="true" aria-label="System">
          <div className="modal">
            <div className="modalInner">
              <div className="modalTitle">The System (ONE scale-ready system)</div>

              <div className="modalBody">
                <strong>Purpose:</strong><br />
                Run a consistent, calm posing workflow without memory. Train it in 7 days, then execute the exact same flow for any client.
              </div>

              <div className="modalBody" style={{ marginTop: 12 }}>
                <strong>Steps:</strong>
              </div>
              <ul className="modalList">
                <li><strong>Prep (2 min):</strong> Genre → Set → Base. Keep “Client wording” ON for calm verbal direction.</li>
                <li><strong>Practice (7 days):</strong> follow the 7-day rehearsal plan.</li>
                <li><strong>Run:</strong> Begin session → read cue → Next. Keep changes small and deliberate.</li>
              </ul>

              <div className="modalBody" style={{ marginTop: 12 }}>
                <strong>Handoff:</strong><br />
                Anyone can run it by selecting the correct Genre/Set/Base and reading each cue as written, step-by-step.
              </div>

              <div className="modalActions">
                <button className="btn" onClick={() => setShowSystem(false)}>Close</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Floating Help (prep only) */}
      {mode === "prep" && showFloatHelp ? (
        <div className="floatHelp">
          <button className="btn btnPrimary" onClick={() => setShowHelp(true)} aria-label="Open help">
            Help
          </button>
        </div>
      ) : null}

      {toast ? (
        <div className="toastWrap" aria-live="polite" aria-atomic="true">
          <div className="toast">{toast}</div>
        </div>
      ) : null}

      {mode === "prep" && (
        <div className="wrap">
          <h1 className="h1">Pose Flow Operator</h1>
          <p className="sub">Step-by-step cues to run a session without memorising poses.</p>

          {noData ? (
            <div className="warn">
              DATA ERROR: GENRES is empty. Check App.jsx has the full BASE_GENRES array.
            </div>
          ) : null}

          <div className="prepSticky" aria-label="Pose selection controls">
            <div className="prepStickyInner">
              {/* ✅ ALWAYS VISIBLE ACTIONS */}
              <div className="stickyHeader">
                <div className="stickyTitle">
                  Prep controls
                </div>
                <div className="stickyActions">
                  <button className="btn" onClick={() => setShowHelp(true)}>Help</button>
                  <button className="btn" onClick={() => setShowSystem(true)}>System</button>
                  <button className="btn" onClick={resetApp}>Reset</button>
                </div>
              </div>

              <div className="grid">
                <div>
                  <div className="label">Genre</div>
                  <select className="control" value={genreId} onChange={(e) => setGenreId(e.target.value)}>
                    {GENRES.map((g) => (
                      <option key={g.id} value={g.id}>
                        {g.name}
                      </option>
                    ))}
                  </select>
                  <div className="helper">Pick the library you’re practicing or running today.</div>
                </div>

                <div>
                  <div className="label">Set</div>
                  <select className="control" value={setId} onChange={(e) => setSetId(e.target.value)}>
                    {(genre?.sets ?? []).map((s) => (
                      <option key={s.id} value={s.id}>
                        {s.name}
                      </option>
                    ))}
                  </select>
                  <div className="helper">This matches the setup (stool, wall, table…).</div>
                </div>

                <div>
                  <div className="label">Base</div>
                  <select className="control" value={baseId} onChange={(e) => setBaseId(e.target.value)}>
                    {availableBases.map((b) => (
                      <option key={b.id} value={b.id}>
                        {b.name}
                      </option>
                    ))}
                  </select>

                  <div className="row">
                    <label className="check" title="Off = curated bases only. On = all bases in this set.">
                      <input type="checkbox" checked={showFullLibrary} onChange={(e) => setShowFullLibrary(e.target.checked)} />
                      Show full library
                    </label>
                  </div>

                  <div className="footerActions">
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
                      This base has no steps. Choose another base.
                    </div>
                  ) : null}
                </div>
              </div>
            </div>
          </div>

          <div className="card">
            <div className="cardInner">
              <div className="label" style={{ fontSize: 14, fontWeight: 950, color: "var(--ink)" }}>
                7-day rehearsal plan
              </div>
              <p className="sub" style={{ marginTop: 6 }}>
                Practice before shoots: each day is simple and repeatable. Built from <strong>{genre?.name ?? "this genre"}</strong>.
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

      {mode === "session" && (
        <div className="session">
          <div className="topBar" ref={topBarRef}>
            <div className="topInner">
              <div className="topRow">
                <div style={{ flex: 1, minWidth: 260 }}>
                  <div className="progLabel">Progress</div>
                  <div className="progNums">
                    <strong style={{ color: "var(--ink)" }}>{stepNow}</strong> /{" "}
                    {flow.length || 0} ({progressPct}%)
                  </div>
                  <div className="bar">
                    <div className="barFill" style={{ width: `${progressPct}%` }} />
                  </div>
                </div>

                <div className="topControls">
                  <label className="toggle" title="Automatically go to the next cue after the chosen time.">
                    <input type="checkbox" checked={autoOn} onChange={(e) => setAutoOn(e.target.checked)} disabled={isOver} />
                    Auto-advance
                  </label>

                  <select
                    className="control"
                    style={{ height: 42, width: 170, marginTop: 0 }}
                    value={rhythmId}
                    onChange={(e) => setRhythmId(e.target.value)}
                    disabled={!autoOn || isOver}
                    title="Seconds per step for auto-advance."
                    aria-label="Select auto-advance speed"
                  >
                    {RHYTHMS.map((r) => (
                      <option key={r.id} value={r.id}>
                        {r.label} ({r.seconds}s)
                      </option>
                    ))}
                  </select>

                  <label className="toggle" title="Calmer, more human direction for clients.">
                    <input type="checkbox" checked={clientWording} onChange={(e) => setClientWording(e.target.checked)} />
                    Client wording
                  </label>

                  <label className="toggle" title={hasAnyImagesInFlow ? "Show a reference sketch when available." : "No images available for this flow."}>
                    <input type="checkbox" checked={showRefImage} onChange={(e) => setShowRefImage(e.target.checked)} disabled={!hasAnyImagesInFlow} />
                    Image
                  </label>

                  <label className="toggle" title="Show the next cue preview.">
                    <input type="checkbox" checked={showNextPreview} onChange={(e) => setShowNextPreview(e.target.checked)} />
                    Next preview
                  </label>

                  <button className="btn" onClick={exitSession} title="Return to prep screen">
                    Exit
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="main">
            <div className="mainPad">
              <div className="stage">
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
                    <div className={`cue ${cueTier}`}>{displayCue}</div>

                    {idx === 0 ? (
                      <div className="miniHint">
                        <strong>Base pose</strong> = starting position. <strong>Flow</strong> = small movements from that base, one step at a time.
                      </div>
                    ) : null}

                    {showNextPreview && nextStep?.cue ? (
                      <div className="nextBox">
                        <div className="nextLabel">Next</div>
                        <div className="nextCue">{displayNextCue}</div>
                      </div>
                    ) : null}

                    <div className="hint">
                      Tip: use <strong>Next</strong> / <strong>Back</strong>. (← → keys also work.)
                    </div>
                  </div>
                ) : (
                  <div style={{ textAlign: "center", position: "relative", zIndex: 2 }}>
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

          {!isOver ? (
            <div className="bottomBar" ref={bottomBarRef}>
              <div className="bottomInner">
                <div className="navRow">
                  <button className="btn navBtn" onClick={back} disabled={!flow.length || idx <= 0} aria-label="Back">
                    Back
                  </button>

                  <button className="btn btnPrimary navBtn" onClick={advance} disabled={!flow.length || isOver} aria-label="Next" title="Go to the next cue">
                    Next
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div style={{ position: "fixed", left: -9999, top: -9999 }} ref={bottomBarRef} />
          )}
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
