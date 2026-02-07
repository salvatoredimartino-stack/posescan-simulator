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
   ASSET PATHS
   ========================================= */
const ASSET = (p) =>
  `${import.meta.env.BASE_URL}${String(p).replace(/^\/+/, "")}`;

/* =========================================
   DATA (Women + Corporate Men; 50+ removed)
   ========================================= */
const BASE_GENRES = [
  {
    id: "womens_poses",
    name: "Women’s Poses",
    sets: [
      {
        id: "womens_set1_seated_stool",
        name: "SET 1 — SEATED (STOOL)",
        bases: [
          {
            id: "womens_seated_base1",
            name: "Base Pose 1",
            curated: true,
            flow: [
              {
                uid: "womens_seated_base1_step1",
                label: "Base Pose 1",
                cue: "Sit on the edge of the stool, body turned slightly to the side. Keep both feet on the floor and rest your hands flat and relaxed. Perfect — this is your base pose. From here we’ll make small changes step-by-step.",
                img: ASSET("poses/beauty/set1-seated/base1/step1.png"),
              },
              {
                uid: "womens_seated_base1_step2",
                label: "Pose 2",
                cue: "Stay just like that. Bring your hands gently between your legs and let your elbows relax in.",
                img: ASSET("poses/beauty/set1-seated/base1/step1.png"),
              },
              {
                uid: "womens_seated_base1_step3",
                label: "Pose 3",
                cue: "Rotate a touch more side-on. Keep your spine long and your shoulders soft.",
                img: ASSET("poses/beauty/set1-seated/base1/step1.png"),
              },
              {
                uid: "womens_seated_base1_step4",
                label: "Pose 4",
                cue: "Hold the pose — I’ll change the framing. Stay still through the shoulders and hands.",
                img: ASSET("poses/beauty/set1-seated/base1/step1.png"),
              },
              {
                uid: "womens_seated_base1_step5",
                label: "Pose 5",
                cue: "Same body position. We’ll go horizontal — keep your chin gently forward and slightly down.",
                img: ASSET("poses/beauty/set1-seated/base1/step1.png"),
              },
              {
                uid: "womens_seated_base1_step6",
                label: "Pose 6",
                cue: "Tiny refinement: soften your hands and breathe out. Hold that expression.",
                img: ASSET("poses/beauty/set1-seated/base1/step1.png"),
              },
            ],
          },
          {
            id: "womens_seated_base2",
            name: "Base Pose 2",
            curated: true,
            flow: [
              {
                uid: "womens_seated_base2_step1",
                label: "Base Pose 2",
                cue: "Left foot raised, elbow on knee, torso forward.",
                img: ASSET("poses/beauty/set1-seated/base2/step1.png"),
              },
              {
                uid: "womens_seated_base2_step2",
                label: "Pose 2",
                cue: "Cup fingers softly, relax wrists.",
                img: ASSET("poses/beauty/set1-seated/base2/step1.png"),
              },
              {
                uid: "womens_seated_base2_step3",
                label: "Pose 3",
                cue: "Right hand back pocket, chest open.",
                img: ASSET("poses/beauty/set1-seated/base2/step1.png"),
              },
              {
                uid: "womens_seated_base2_step4",
                label: "Pose 4",
                cue: "Hands between legs, weight grounded.",
                img: ASSET("poses/beauty/set1-seated/base2/step1.png"),
              },
              {
                uid: "womens_seated_base2_step5",
                label: "Pose 5",
                cue: "Lean back slightly, tilt, compose wide.",
                img: ASSET("poses/beauty/set1-seated/base2/step1.png"),
              },
              {
                uid: "womens_seated_base2_step6",
                label: "Pose 6",
                cue: "Elbow out, knee support maintained.",
                img: ASSET("poses/beauty/set1-seated/base2/step1.png"),
              },
              {
                uid: "womens_seated_base2_step7",
                label: "Pose 7",
                cue: "Hands forward, connect elbows visually.",
                img: ASSET("poses/beauty/set1-seated/base2/step1.png"),
              },
            ],
          },
          {
            id: "womens_seated_base3",
            name: "Base Pose 3",
            curated: true,
            flow: [
              {
                uid: "womens_seated_base3_step1",
                label: "Base Pose 3",
                cue: "Open to camera, elbow on knee, hand on thigh.",
                img: ASSET("poses/beauty/set1-seated/base3/step1.png"),
              },
              {
                uid: "womens_seated_base3_step2",
                label: "Pose 2",
                cue: "Hand to chin, thoughtful pause.",
                img: ASSET("poses/beauty/set1-seated/base3/step1.png"),
              },
              {
                uid: "womens_seated_base3_step3",
                label: "Pose 3",
                cue: "Big smile, hold structure.",
                img: ASSET("poses/beauty/set1-seated/base3/step1.png"),
              },
              {
                uid: "womens_seated_base3_step4",
                label: "Pose 4",
                cue: "Tilt head, smile, hands crossed low.",
                img: ASSET("poses/beauty/set1-seated/base3/step1.png"),
              },
            ],
          },
          {
            id: "womens_seated_base4",
            name: "Base Pose 4",
            curated: true,
            flow: [
              {
                uid: "womens_seated_base4_step1",
                label: "Base Pose 4",
                cue: "Body forward, legs crossed, arms staggered.",
                img: ASSET("poses/beauty/set1-seated/base4/step1.png"),
              },
              {
                uid: "womens_seated_base4_step2",
                label: "Pose 2",
                cue: "Hand to chin, other grounded.",
                img: ASSET("poses/beauty/set1-seated/base4/step1.png"),
              },
              {
                uid: "womens_seated_base4_step3",
                label: "Pose 3",
                cue: "Relax the wrist and soften the fingers.",
                img: ASSET("poses/beauty/set1-seated/base4/step1.png"),
              },
              {
                uid: "womens_seated_base4_step4",
                label: "Pose 4",
                cue: "Hands down. Gentle smile. Small head tilt.",
                img: ASSET("poses/beauty/set1-seated/base4/step1.png"),
              },
            ],
          },
        ],
      },
      {
        id: "womens_set2_standing",
        name: "SET 2 — STANDING",
        bases: [
          {
            id: "womens_standing_base1",
            name: "Base Pose 1",
            curated: true,
            flow: [
              {
                uid: "womens_standing_base1_step1",
                label: "Base Pose 1",
                cue: "Feet apart. Rock the hip gently. Hands on hips. Shoulders relaxed.",
                img: ASSET("poses/beauty/set2-standing/base1/step1.png"),
              },
              {
                uid: "womens_standing_base1_step2",
                label: "Pose 2",
                cue: "Hold the pose — I’ll shoot from a slightly lower angle.",
                img: ASSET("poses/beauty/set2-standing/base1/step1.png"),
              },
            ],
          },
          {
            id: "womens_standing_base2",
            name: "Base Pose 2",
            curated: true,
            flow: [
              {
                uid: "womens_standing_base2_step1",
                label: "Base Pose 2",
                cue: "Rotate the body slightly. Lift one foot onto the support. Chin at 45°.",
                img: ASSET("poses/beauty/set2-standing/base2/step1.png"),
              },
              {
                uid: "womens_standing_base2_step2",
                label: "Pose 2",
                cue: "Tuck the elbow in. Small tilt to the left. Keep the neck long.",
                img: ASSET("poses/beauty/set2-standing/base2/step1.png"),
              },
              {
                uid: "womens_standing_base2_step3",
                label: "Pose 3",
                cue: "Bring the chin back toward camera. Eyes soft.",
                img: ASSET("poses/beauty/set2-standing/base2/step1.png"),
              },
              {
                uid: "womens_standing_base2_step4",
                label: "Pose 4",
                cue: "Rotate a touch more and look back. Keep the chest line clean.",
                img: ASSET("poses/beauty/set2-standing/base2/step1.png"),
              },
            ],
          },
        ],
      },
      {
        id: "womens_set3_wall",
        name: "SET 3 — WALL",
        bases: [
          {
            id: "womens_wall_base1",
            name: "Base Pose 1",
            curated: true,
            flow: [
              {
                uid: "womens_wall_base1_step1",
                label: "Base Pose 1",
                cue: "Stand 45° to camera. Weight on the back foot. Bring the front knee slightly forward.",
                img: ASSET("poses/beauty/set3-wall/base1/step1.png"),
              },
              {
                uid: "womens_wall_base1_step2",
                label: "Pose 2",
                cue: "Hold it — I’ll tighten the composition. Keep hands still.",
                img: ASSET("poses/beauty/set3-wall/base1/step1.png"),
              },
              {
                uid: "womens_wall_base1_step3",
                label: "Pose 3",
                cue: "Cross the hands softly, left under. Relax the shoulders down.",
                img: ASSET("poses/beauty/set3-wall/base1/step1.png"),
              },
            ],
          },
          {
            id: "womens_wall_base2",
            name: "Base Pose 2",
            curated: true,
            flow: [
              {
                uid: "womens_wall_base2_step1",
                label: "Base Pose 2",
                cue: "Rotate the body. Shift the weight slightly forward. Keep the neck long.",
                img: ASSET("poses/beauty/set3-wall/base2/step1.png"),
              },
              {
                uid: "womens_wall_base2_step2",
                label: "Pose 2",
                cue: "Face toward the wall slightly. Flatten the shoulders and soften the hands.",
                img: ASSET("poses/beauty/set3-wall/base2/step1.png"),
              },
              {
                uid: "womens_wall_base2_step3",
                label: "Pose 3",
                cue: "Hold the pose — I’ll widen the frame.",
                img: ASSET("poses/beauty/set3-wall/base2/step1.png"),
              },
              {
                uid: "womens_wall_base2_step4",
                label: "Pose 4",
                cue: "Hands down. Gentle posture. Easy breath out.",
                img: ASSET("poses/beauty/set3-wall/base2/step1.png"),
              },
            ],
          },
        ],
      },
      {
        id: "womens_set4_table",
        name: "SET 4 — TABLE",
        bases: [
          {
            id: "womens_table_base1",
            name: "Base Pose 1",
            curated: true,
            flow: [
              {
                uid: "womens_table_base1_step1",
                label: "Base Pose 1",
                cue: "Elbows symmetric on the table. Taper the arms. Keep shoulders down.",
                img: ASSET("poses/beauty/set4-table/base1/step1.png"),
              },
              {
                uid: "womens_table_base1_step2",
                label: "Pose 2",
                cue: "Go asymmetric: right elbow slightly out. Keep the neck long.",
                img: ASSET("poses/beauty/set4-table/base1/step1.png"),
              },
              {
                uid: "womens_table_base1_step3",
                label: "Pose 3",
                cue: "Hands up: right slightly higher. Small tilt. Relax the fingers.",
                img: ASSET("poses/beauty/set4-table/base1/step1.png"),
              },
            ],
          },
        ],
      },
      {
        id: "womens_set5_staggered_box",
        name: "SET 5 — STAGGERED SEATING (BOX)",
        bases: [
          {
            id: "womens_box_base1",
            name: "Base Pose 1",
            curated: true,
            flow: [
              {
                uid: "womens_box_base1_step1",
                label: "Base Pose 1",
                cue: "Recline on the box. Support with one elbow. Keep the body relaxed.",
                img: ASSET("poses/beauty/set5-box/base1/step1.png"),
              },
              {
                uid: "womens_box_base1_step2",
                label: "Pose 2",
                cue: "Bring hands in. Keep elbows supported. Breathe out and soften.",
                img: ASSET("poses/beauty/set5-box/base1/step1.png"),
              },
            ],
          },
        ],
      },
    ],
  },

  {
    id: "corporate_mens_poses",
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
                cue: "Sit on the stool at 45°. Raise one foot. Hands together. Sit upright. Chin gently toward me.",
              },
              {
                uid: "pbm_set1_base1_step2",
                label: "Pose 2",
                cue: "Easy smile. Hold the posture while I refine the framing.",
              },
              {
                uid: "pbm_set1_base1_step3",
                label: "Pose 3",
                cue: "Lean a touch more onto the knee. Drop the back shoulder slightly. Chin forward. Soft smile.",
              },
              {
                uid: "pbm_set1_base1_step4",
                label: "Pose 4",
                cue: "Relax the posture slightly. Turn the chin around to me.",
              },
              {
                uid: "pbm_set1_base1_step5",
                label: "Pose 5",
                cue: "A little more smile — just in the eyes.",
              },
              {
                uid: "pbm_set1_base1_step6",
                label: "Pose 6",
                cue: "Hands on the thigh. Easy smile. Hold still.",
              },
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

const STORAGE_KEY = "pose_operator_state_v8";

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
function capitalizeFirst(s) {
  const t = String(s ?? "").trim();
  if (!t) return "";
  return t.charAt(0).toUpperCase() + t.slice(1);
}
function normalizeCue(s) {
  const t = String(s ?? "").replace(/\r/g, "").trim();
  return capitalizeFirst(t);
}
function clientLine(stepIndex) {
  const lines = [
    "Hold that. Great.",
    "Nice — keep it still.",
    "Good. Small breath out.",
    "Perfect. Keep the shoulders soft.",
    "That’s it. Just that one change.",
    "Lovely. Stay right there.",
    "Good. Eyes soft, jaw relaxed.",
    "Great. Keep the shape.",
    "Hold. I’m shooting this.",
    "Perfect. Don’t move.",
  ];
  return lines[stepIndex % lines.length];
}

/* =========================================
   CSS
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

      .pill{ display:inline-flex; align-items:center; gap:8px; padding:6px 10px; border:1px solid var(--line); background:rgba(255,255,255,.85); border-radius:999px; font-size:12px; color:var(--muted); box-shadow: 0 2px 10px rgba(15,23,42,.06); }
      .dot{ width:8px; height:8px; border-radius:999px; background:#f59e0b; }

      .h1{ font-size: clamp(26px, 3.8vw, 52px); line-height: 1.02; margin: 12px 0 8px; letter-spacing:-0.03em; }
      .sub{ margin:0; font-size: 16px; color: var(--muted); }

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
        padding: 16px;
      }

      /* Layout rule:
         - Mobile: text first, image below
         - Desktop: text left, image right */
      .stageInner{
        height:100%;
        display:flex;
        flex-direction: column;
        gap: 14px;
      }
      @media (min-width: 860px){
        .stageInner{
          display:grid;
          grid-template-columns: 1fr 360px;
          gap: 18px;
          align-items: start;
        }
      }

      .refPanel{
        border-radius: 22px;
        border:1px solid var(--line);
        background: rgba(255,255,255,.95);
        box-shadow: var(--shadow2);
        padding: 12px;
        display:flex;
        align-items:center;
        justify-content:center;
        min-height: 240px;
      }
      .refPanel img{
        width: 100%;
        height: auto;
        object-fit: contain;
        border-radius: 14px;
      }

      .cue{
        font-weight: 950;
        letter-spacing: -0.02em;
        white-space: pre-line;
        word-break: break-word;
      }
      .cue.t1{ font-size: clamp(26px, 4.6vw, 60px); line-height: 1.07; }
      .cue.t2{ font-size: clamp(22px, 4.0vw, 50px); line-height: 1.09; }
      .cue.t3{ font-size: clamp(18px, 3.4vw, 40px); line-height: 1.11; }
      .cue.t4{ font-size: clamp(16px, 3.0vw, 34px); line-height: 1.14; }

      .client{
        margin-top: 12px;
        padding: 12px 14px;
        border-radius: 18px;
        border: 1px solid var(--line);
        background: rgba(255,255,255,.94);
        box-shadow: 0 10px 22px rgba(15,23,42,.06);
      }
      .clientLabel{ font-size:12px; font-weight: 900; color: var(--muted); }
      .clientText{ margin-top:6px; font-size: 16px; font-weight: 900; line-height: 1.2; }

      .nextBox{
        margin-top: 14px;
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

      .hint{ margin-top: 12px; font-size: 13px; color: var(--muted); }

      /* Tap zone: only used while flow is active (NOT over) */
      .tapZone{
        position:absolute; inset:0;
        cursor: pointer;
        z-index: 0;
      }
      .stageInner, .cueWrap, .refPanel{
        position: relative;
        z-index: 1;
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

      /* -------------------------------
         MOBILE FIX (your request)
         - Image must NOT dominate
         - Text remains readable
         - No overlap
         - Desktop untouched
         -------------------------------- */
      @media (max-width: 859px){
        /* Ensure text uses full width and doesn't get "column" boxed */
        .cueWrap{
          width: 100%;
          max-width: 100%;
          /* prevent long text from pushing image away */
          max-height: 44vh;
          overflow: auto;
          padding-right: 6px;
        }

        /* Small hint: discoverability */
        .cueWrap::after{
          content: "Image below ↓";
          display: block;
          margin-top: 12px;
          font-size: 13px;
          font-weight: 900;
          color: var(--muted);
        }

        /* Make image secondary (smaller) */
        .refPanel{
          width: 100%;
          max-height: 30vh;
          min-height: 0;
          overflow: hidden;
          padding: 10px;
        }

        .refPanel img{
          width: 100%;
          height: auto;
          max-height: 26vh;
          object-fit: contain;
          display: block;
        }
      }

      /* Small-screen tweaks */
      @media (max-width: 520px){
        .topInner{ padding: 10px 10px; }
        .topControls{ gap: 8px; }
        .toggle{ padding: 6px 8px; font-size: 12px; }
        .control{ height: 44px; }
        .navBtn{ height: 58px; font-size: 17px; }
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

  const GENRES = useMemo(() => BASE_GENRES, []);

  const [mode, setMode] = useState("prep"); // prep | session
  const [toast, setToast] = useState(null);
  const toastTimer = useRef(null);

  const pushToast = useCallback((msg) => {
    setToast(String(msg));
    if (toastTimer.current) clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToast(null), 2200);
  }, []);

  const [showOnboarding, setShowOnboarding] = useState(() => {
    const seen = persisted?.seenOnboarding;
    return !seen;
  });
  const [showHelp, setShowHelp] = useState(false);

  const fallbackGenreId = GENRES?.[0]?.id ?? "womens_poses";
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
  const [showClientWording, setShowClientWording] = useState(
    persisted?.showClientWording ?? true
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
    pushToast("Restarted.");
  }, [pushToast]);

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

  /* Only reset flow when in PREP */
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

  const rehearsalPlan = useMemo(() => {
    const sets = genre?.sets ?? [];
    const usable = sets.slice(0, Math.min(5, sets.length));
    const dayItems = usable.map((s, i) => ({
      day: `Day ${i + 1}`,
      text: `${s.name} — run 3 times`,
    }));

    if (usable.length >= 2) {
      dayItems.push({
        day: `Day ${usable.length + 1}`,
        text: `Full session (${usable.map((x) => x.name).join(", ")}) once — slow`,
      });
      dayItems.push({
        day: `Day ${usable.length + 2}`,
        text: `Full session once — normal pace`,
      });
    }
    while (dayItems.length < 7) {
      dayItems.push({
        day: `Day ${dayItems.length + 1}`,
        text: `Repeat your weakest set — run 3 times`,
      });
    }
    return dayItems.slice(0, 7);
  }, [genre]);

  useEffect(() => {
    const payload = {
      showFullLibrary,
      lastSelection: { genreId, setId, baseId },
      showRefImage,
      showNextPreview,
      showClientWording,
      seenOnboarding: !showOnboarding
        ? true
        : persisted?.seenOnboarding ?? false,
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
    showClientWording,
    showOnboarding,
  ]);

  const beginSession = () => {
    setMode("session");
    setIdx(0);
    setIsOver(false);
    setAutoOn(false);
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
    const firstSet =
      GENRES.find((g) => g.id === fallbackGenreId)?.sets?.[0]?.id ?? "";
    setSetId(firstSet);
    setBaseId("");
    setShowRefImage(true);
    setShowNextPreview(true);
    setShowClientWording(true);
    setMode("prep");
    setIdx(0);
    setIsOver(false);
    setAutoOn(false);
    setShowOnboarding(true);
    pushToast("App reset. Starting fresh.");
  };

  const noData = !Array.isArray(GENRES) || GENRES.length === 0;
  const cueTier = useMemo(
    () => cueTierFromText(current?.cue ?? ""),
    [current?.cue]
  );

  /* Measure top/bottom bars */
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

  return (
    <>
      <Styles />

      {/* Onboarding */}
      {mode === "prep" && showOnboarding && (
        <div
          className="overlay"
          role="dialog"
          aria-modal="true"
          aria-label="How this works"
        >
          <div className="modal">
            <div className="modalInner">
              <div className="modalTitle">How this works (quick)</div>
              <div className="modalBody">
                This tool shows a base pose, then a flow of small adjustments step-by-step.
                You don’t need to memorise a full session.
              </div>
              <ul className="modalList">
                <li>
                  <strong>Genre</strong> = your shoot library.
                </li>
                <li>
                  <strong>Set</strong> = your setup (stool, wall, table…).
                </li>
                <li>
                  <strong>Base</strong> = starting pose for that setup.
                </li>
                <li>
                  Press <strong>Begin session</strong>, then use{" "}
                  <strong>Next</strong> / <strong>Back</strong>.
                </li>
              </ul>
              <div className="modalActions">
                <button
                  className="btn"
                  onClick={() => {
                    setShowOnboarding(false);
                    pushToast("Tip: Help is available anytime.");
                  }}
                >
                  Got it
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Help Modal */}
      {showHelp && (
        <div className="overlay" role="dialog" aria-modal="true" aria-label="Help">
          <div className="modal">
            <div className="modalInner">
              <div className="modalTitle">Help</div>
              <div className="modalBody">
                <strong>Base pose → flow:</strong> start with the base, then make small adjustments step-by-step.
              </div>
              <ul className="modalList">
                <li><strong>Next / Back</strong> changes the cue.</li>
                <li><strong>Auto-advance</strong> moves forward on a timer.</li>
                <li><strong>Client wording</strong> gives short phrases you can say while posing.</li>
                <li><strong>Image</strong> shows the reference image when available.</li>
              </ul>
              <div className="modalActions">
                <button className="btn btnPrimary" onClick={() => setShowHelp(false)}>
                  Close
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
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 12,
            }}
          >
            <div className="pill">
              <span className="dot" />
              Prep
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <button
                className="btn"
                style={{ height: 34, borderRadius: 999, padding: "0 12px" }}
                onClick={() => setShowHelp(true)}
                title="Help"
                aria-label="Open help"
              >
                Help
              </button>
              <button
                className="btn"
                style={{ height: 34, borderRadius: 999, padding: "0 12px" }}
                onClick={resetApp}
                title="Reset app (clears saved state)"
                aria-label="Reset app"
              >
                Reset
              </button>
            </div>
          </div>

          <h1 className="h1">Pose Flow Operator</h1>
          <p className="sub">Base pose → a flow of small movements, step-by-step.</p>

          {noData ? (
            <div className="warn">
              DATA ERROR: GENRES is empty. Check App.jsx has the BASE_GENRES array.
            </div>
          ) : null}

          <div className="prepSticky" aria-label="Pose selection controls">
            <div className="prepStickyInner">
              <div className="grid">
                <div>
                  <div className="label">Genre</div>
                  <select
                    className="control"
                    value={genreId}
                    onChange={(e) => setGenreId(e.target.value)}
                  >
                    {GENRES.map((g) => (
                      <option key={g.id} value={g.id}>
                        {g.name}
                      </option>
                    ))}
                  </select>
                  <div className="helper">Pick the library you want to practice or run during a shoot.</div>
                </div>

                <div>
                  <div className="label">Set</div>
                  <select
                    className="control"
                    value={setId}
                    onChange={(e) => setSetId(e.target.value)}
                  >
                    {(genre?.sets ?? []).map((s) => (
                      <option key={s.id} value={s.id}>
                        {s.name}
                      </option>
                    ))}
                  </select>
                  <div className="helper">This matches your lighting/background/prop setup.</div>
                </div>

                <div>
                  <div className="label">Base</div>
                  <select
                    className="control"
                    value={baseId}
                    onChange={(e) => setBaseId(e.target.value)}
                  >
                    {availableBases.map((b) => (
                      <option key={b.id} value={b.id}>
                        {b.name}
                      </option>
                    ))}
                  </select>

                  <div className="row">
                    <label
                      className="check"
                      title="Off = curated bases only. On = all bases in this set."
                      aria-label="Show full library"
                    >
                      <input
                        type="checkbox"
                        checked={showFullLibrary}
                        onChange={(e) => setShowFullLibrary(e.target.checked)}
                      />
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
              <div
                className="label"
                style={{ fontSize: 14, fontWeight: 950, color: "var(--ink)" }}
              >
                7-day rehearsal plan
              </div>
              <p className="sub" style={{ marginTop: 6 }}>
                Practice before shoots: each day is simple and repeatable. Built from{" "}
                <strong>{genre?.name ?? "this genre"}</strong>.
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
                  <label className="toggle" title="Automatically go to the next cue after the chosen time." aria-label="Toggle auto-advance">
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

                  <label className="toggle" title={hasAnyImagesInFlow ? "Show the reference image when available." : "No images available for this flow."} aria-label="Toggle reference image">
                    <input type="checkbox" checked={showRefImage} onChange={(e) => setShowRefImage(e.target.checked)} disabled={hasAnyImagesInFlow ? false : true} />
                    Image
                  </label>

                  <label className="toggle" title="Show the next cue preview." aria-label="Toggle next cue preview">
                    <input type="checkbox" checked={showNextPreview} onChange={(e) => setShowNextPreview(e.target.checked)} />
                    Next preview
                  </label>

                  <label className="toggle" title="Show short client-facing lines you can say while posing." aria-label="Toggle client wording">
                    <input type="checkbox" checked={showClientWording} onChange={(e) => setShowClientWording(e.target.checked)} />
                    Client wording
                  </label>

                  <button className="btn" onClick={() => setShowHelp(true)} title="Help" aria-label="Help">
                    Help
                  </button>

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
                {/* Tap zone ONLY while not over (so Restart always works) */}
                {!isOver && (
                  <div
                    className="tapZone"
                    onClick={advance}
                    role="button"
                    tabIndex={0}
                    aria-label="Advance to next cue"
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        advance();
                      }
                      if (e.key === "ArrowRight") {
                        e.preventDefault();
                        advance();
                      }
                      if (e.key === "ArrowLeft") {
                        e.preventDefault();
                        back();
                      }
                    }}
                  />
                )}

                <div className="stageInner">
                  <div className="cueWrap">
                    {!isOver ? (
                      <>
                        <div className={`cue ${cueTier}`}>{normalizeCue(current?.cue ?? "")}</div>

                        {showClientWording ? (
                          <div className="client">
                            <div className="clientLabel">What to say</div>
                            <div className="clientText">{normalizeCue(clientLine(idx))}</div>
                          </div>
                        ) : null}

                        {showNextPreview && nextStep?.cue ? (
                          <div className="nextBox">
                            <div className="nextLabel">Next</div>
                            <div className="nextCue">{normalizeCue(nextStep.cue)}</div>
                          </div>
                        ) : null}

                        <div className="hint">
                          Tip: use <strong>Next</strong> / <strong>Back</strong>. (← → keys also work.)
                        </div>
                      </>
                    ) : (
                      <div style={{ textAlign: "left" }}>
                        <div className="progLabel" style={{ fontSize: 14 }}>
                          Flow complete
                        </div>
                        <div style={{ fontSize: 42, fontWeight: 950, marginTop: 8 }}>—</div>
                        <div style={{ display: "flex", gap: 12, marginTop: 16, flexWrap: "wrap" }}>
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

                  {/* ONE image only */}
                  {showRefImage && hasAnyImagesInFlow && current?.img ? (
                    <div className="refPanel" aria-label="Reference image">
                      <img src={current.img} alt="Reference pose" draggable={false} />
                    </div>
                  ) : null}
                </div>
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
