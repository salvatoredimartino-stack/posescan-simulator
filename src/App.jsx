import React, { useEffect, useMemo, useRef, useState } from "react";

/**
 * Pose Flow Operator
 * - Live session mode (Operator)
 * - In-app editor for Genres/Sets/Bases/Flows (Editor)
 * - In-app one-pager SOP (Info)
 * - Persists to localStorage
 *
 * NOTE: Data model enforces isolation by design:
 * - Each Genre has its own Sets/Bases/Steps stored under that Genre only.
 * - New items get new IDs scoped by Genre.
 */

const STORAGE_KEY = "posescan.genres.v2";

const DEFAULT_GENRES = [
  {
    id: "beauty",
    name: "Beauty",
    sets: [
      {
        id: "beauty_set1_seated_stool",
        name: "SET 1 — SEATED (STOOL)",
        bases: [
          {
            id: "beauty_base1",
            name: "Base Pose 1",
            flow: [
              { id: "Base Pose 1", cue: "Edge of stool, 45°, feet down, hands flat" },
              { id: "Pose 2", cue: "Hands between legs, elbows relaxed inward" },
              { id: "Pose 3", cue: "Rotate side-on, maintain torso length" },
              { id: "Pose 4", cue: "Change composition, tighten crop" },
              { id: "Pose 5", cue: "Horizontal camera, same body position" },
              { id: "Pose 6", cue: "Alternate composition, hold expression" },
            ],
          },
          {
            id: "beauty_base2",
            name: "Base Pose 2",
            flow: [
              { id: "Base Pose 2", cue: "Left foot raised, elbow on knee, torso forward" },
              { id: "Pose 10", cue: "Cup fingers softly, relax wrists" },
              { id: "Pose 11", cue: "Right hand back pocket, chest open" },
              { id: "Pose 12", cue: "Hands between legs, weight grounded" },
              { id: "Pose 13", cue: "Lean back slightly, tilt, compose wide" },
              { id: "Pose 14", cue: "Elbow out, knee support maintained" },
              { id: "Pose 15", cue: "Hands forward, connect elbows visually" },
            ],
          },
          {
            id: "beauty_base3",
            name: "Base Pose 3",
            flow: [
              { id: "Base Pose 3", cue: "Open to camera, elbow on knee, hand on thigh" },
              { id: "Pose 17", cue: "Hand to chin, thoughtful pause" },
              { id: "Pose 18", cue: "Big smile, hold structure" },
              { id: "Pose 19", cue: "Tilt head, smile, hands crossed low" },
            ],
          },
          {
            id: "beauty_base4",
            name: "Base Pose 4",
            flow: [
              { id: "Base Pose 4", cue: "Body forward, legs crossed, arms staggered" },
              { id: "Pose 21", cue: "Hand to chin, other grounded" },
              { id: "Pose 22", cue: "Smoking-style fingers, relaxed wrist" },
              { id: "Pose 23", cue: "Hands down, big smile, head tilt" },
            ],
          },
        ],
      },
      {
        id: "beauty_set2_standing",
        name: "SET 2 — STANDING",
        bases: [
          {
            id: "beauty_base79",
            name: "Base Pose 79",
            flow: [
              { id: "Base Pose 79", cue: "Feet apart, hip rocked, hands on hips" },
              { id: "Pose 80", cue: "Change composition, shoot low" },
            ],
          },
          {
            id: "beauty_base81",
            name: "Base Pose 81",
            flow: [
              { id: "Base Pose 81", cue: "Rotate body, foot elevated, chin 45°" },
              { id: "Pose 82", cue: "Elbow tucked, slight left tilt" },
              { id: "Pose 83", cue: "Chin back to camera" },
              { id: "Pose 84", cue: "Rotate, look back, keep breast line" },
            ],
          },
        ],
      },
      {
        id: "beauty_set3_wall",
        name: "SET 3 — WALL",
        bases: [
          {
            id: "beauty_base72",
            name: "Base Pose 72",
            flow: [
              { id: "Base Pose 72", cue: "45° to camera, weight back, knee forward" },
              { id: "Pose 73", cue: "Same pose, tighter composition" },
              { id: "Pose 74", cue: "Hands crossed, left under" },
            ],
          },
          {
            id: "beauty_base75",
            name: "Base Pose 75",
            flow: [
              { id: "Base Pose 75", cue: "Rotate body, shift weight forward" },
              { id: "Pose 76", cue: "Face wall, flatten shoulders" },
              { id: "Pose 77", cue: "Change composition, widen frame" },
              { id: "Pose 78", cue: "Hands down, soften posture" },
            ],
          },
        ],
      },
      {
        id: "beauty_set4_table",
        name: "SET 4 — TABLE",
        bases: [
          {
            id: "beauty_base94",
            name: "Base Pose 94",
            flow: [
              { id: "Base Pose 94", cue: "Symmetric elbows, tapered arms" },
              { id: "Pose 95", cue: "Asymmetric, right elbow out" },
              { id: "Pose 96", cue: "Hands up, right higher, tilt" },
              { id: "Pose 97", cue: "Elbows together, frame face" },
              { id: "Pose 98", cue: "Chest away, neck long" },
              { id: "Pose 99", cue: "Hands out, crossing lightly" },
              { id: "Pose 100", cue: "Smoking hands, elbows in" },
              { id: "Pose 101", cue: "Hands behind hair, elbows crossed" },
              { id: "Pose 102", cue: "Elbow one way, hands across" },
              { id: "Pose 103", cue: "Body out, head left" },
              { id: "Pose 104", cue: "Hand in hair, body sideways" },
              { id: "Pose 105", cue: "Both hands up" },
              { id: "Pose 106", cue: "Hands tucked, tight composition" },
              { id: "Pose 107", cue: "Hugging motion, one hand off" },
              { id: "Pose 108", cue: "Double hug, compress shape" },
              { id: "Pose 109", cue: "Elbow off, one up one down, tilt" },
            ],
          },
        ],
      },
      {
        id: "beauty_set5_staggered_box",
        name: "SET 5 — STAGGERED SEATING (BOX)",
        bases: [
          {
            id: "beauty_base111",
            name: "Base Pose 111",
            flow: [
              { id: "Base Pose 111", cue: "Recline on box, elbow down, body relaxed" },
              { id: "Pose 112", cue: "Hands inside, elbows supported" },
              { id: "Pose 113", cue: "Hand behind hair" },
              { id: "Pose 114", cue: "Triangle shape, elbow anchored" },
              { id: "Pose 115", cue: "Elbows together, hands on chin" },
              { id: "Pose 116", cue: "Rotate body around elbows" },
              { id: "Pose 117", cue: "Feet on box, hug knees" },
              { id: "Pose 118", cue: "Remove box, horizontal tilt" },
              { id: "Pose 119", cue: "Big smile, tilt, hold" },
              { id: "Pose 120", cue: "One knee hugged, elbow down" },
            ],
          },
        ],
      },
    ],
  },
  // You can add your other genres via the Editor inside the app.
];

function safeParse(json) {
  try {
    return JSON.parse(json);
  } catch {
    return null;
  }
}

function clamp(n, a, b) {
  return Math.max(a, Math.min(b, n));
}

function requestFullscreen(el) {
  if (!el) return;
  const fn = el.requestFullscreen || el.webkitRequestFullscreen || el.mozRequestFullScreen || el.msRequestFullscreen;
  if (fn) fn.call(el);
}

function exitFullscreen() {
  const fn =
    document.exitFullscreen || document.webkitExitFullscreen || document.mozCancelFullScreen || document.msExitFullscreen;
  if (fn) fn.call(document);
}

function isFullscreen() {
  return !!(
    document.fullscreenElement ||
    document.webkitFullscreenElement ||
    document.mozFullScreenElement ||
    document.msFullscreenElement
  );
}

function useAutoplay({ enabled, seconds, onTick }) {
  const ref = useRef(null);

  useEffect(() => {
    if (ref.current) {
      clearInterval(ref.current);
      ref.current = null;
    }
    if (!enabled) return;

    ref.current = setInterval(() => onTick(), seconds * 1000);

    return () => {
      if (ref.current) {
        clearInterval(ref.current);
        ref.current = null;
      }
    };
  }, [enabled, seconds, onTick]);
}

function uid(prefix = "id") {
  return `${prefix}_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 8)}`;
}

function deepClone(x) {
  return JSON.parse(JSON.stringify(x));
}

function Button({ children, onClick, disabled, className = "", title }) {
  return (
    <button
      title={title}
      onClick={onClick}
      disabled={disabled}
      className={`border rounded-lg px-3 py-2 text-sm disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
    >
      {children}
    </button>
  );
}

function Field({ label, children }) {
  return (
    <div>
      <div className="text-xs text-neutral-500">{label}</div>
      <div className="mt-1">{children}</div>
    </div>
  );
}

function TextInput({ value, onChange, placeholder }) {
  return (
    <input
      className="w-full border rounded-lg p-2 text-sm"
      value={value}
      placeholder={placeholder}
      onChange={(e) => onChange(e.target.value)}
    />
  );
}

function TextArea({ value, onChange, placeholder, rows = 3 }) {
  return (
    <textarea
      className="w-full border rounded-lg p-2 text-sm whitespace-pre-wrap"
      value={value}
      placeholder={placeholder}
      rows={rows}
      onChange={(e) => onChange(e.target.value)}
    />
  );
}

function Select({ value, onChange, options }) {
  return (
    <select className="w-full border rounded-lg p-2 text-sm" value={value} onChange={(e) => onChange(e.target.value)}>
      {options.map((o) => (
        <option key={o.value} value={o.value}>
          {o.label}
        </option>
      ))}
    </select>
  );
}

function Tabs({ value, onChange }) {
  const items = [
    { value: "operator", label: "Operator" },
    { value: "editor", label: "Editor" },
    { value: "info", label: "Info" },
  ];
  return (
    <div className="flex gap-2">
      {items.map((it) => (
        <button
          key={it.value}
          onClick={() => onChange(it.value)}
          className={`rounded-full border px-3 py-2 text-xs ${
            value === it.value ? "bg-neutral-900 text-white border-neutral-900" : "bg-white border-neutral-300"
          }`}
        >
          {it.label}
        </button>
      ))}
    </div>
  );
}

function OnePagerInfo() {
  return (
    <div className="border rounded-2xl p-5">
      <div className="text-sm text-neutral-500">One-pager</div>
      <h2 className="text-2xl font-semibold mt-1">How to run this during a shoot</h2>

      <div className="mt-4 space-y-3 text-sm leading-6">
        <div>
          <div className="font-semibold">1) Select</div>
          <div>Genre → Set → Base Pose.</div>
        </div>
        <div>
          <div className="font-semibold">2) Run</div>
          <div>
            Use <span className="font-semibold">Swipe</span> for live session pacing. Use{" "}
            <span className="font-semibold">Autoplay 6–10s</span> for mirror drills.
          </div>
        </div>
        <div>
          <div className="font-semibold">3) Execute</div>
          <div>Read the cue. Make the change. Shoot. Tap next.</div>
        </div>
        <div>
          <div className="font-semibold">4) End</div>
          <div>When flow ends, restart base or switch base (same genre).</div>
        </div>
      </div>

      <h2 className="text-2xl font-semibold mt-8">How to add a new genre safely</h2>

      <div className="mt-4 space-y-3 text-sm leading-6">
        <div>
          <div className="font-semibold">Rule</div>
          <div>Genres are closed systems. Do not copy sets/bases/poses across genres.</div>
        </div>
        <div>
          <div className="font-semibold">Steps</div>
          <div>
            Editor → Add Genre → Add Set(s) → Add Base(s) → Add Flow steps.
            <br />
            Keep cues short and operable.
          </div>
        </div>
        <div>
          <div className="font-semibold">Validation</div>
          <div>
            Each base must have ≥1 step. Each set must have ≥1 base. Each genre must have ≥1 set.
          </div>
        </div>
        <div>
          <div className="font-semibold">Deploy</div>
          <div>
            After edits: Save (auto) → Test Operator tab → then redeploy with your existing GitHub Pages steps.
          </div>
        </div>
      </div>
    </div>
  );
}

export default function App() {
  const shellRef = useRef(null);

  // Load genres from localStorage (editable). If missing, seed defaults.
  const [genres, setGenres] = useState(() => {
    const raw = localStorage.getItem(STORAGE_KEY);
    const parsed = raw ? safeParse(raw) : null;
    return Array.isArray(parsed) && parsed.length ? parsed : deepClone(DEFAULT_GENRES);
  });

  // Persist changes
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(genres));
  }, [genres]);

  const [tab, setTab] = useState("operator");

  // Fullscreen
  const [fs, setFs] = useState(false);
  useEffect(() => {
    const handler = () => setFs(isFullscreen());
    document.addEventListener("fullscreenchange", handler);
    document.addEventListener("webkitfullscreenchange", handler);
    return () => {
      document.removeEventListener("fullscreenchange", handler);
      document.removeEventListener("webkitfullscreenchange", handler);
    };
  }, []);
  const toggleFullscreen = () => {
    if (fs) exitFullscreen();
    else requestFullscreen(shellRef.current);
  };

  // Operator selections
  const [genreId, setGenreId] = useState(genres[0]?.id ?? "");
  useEffect(() => {
    if (!genres.find((g) => g.id === genreId)) setGenreId(genres[0]?.id ?? "");
  }, [genres, genreId]);

  const genre = useMemo(() => genres.find((g) => g.id === genreId) ?? genres[0] ?? null, [genres, genreId]);

  const [setId, setSetId] = useState(genre?.sets?.[0]?.id ?? "");
  useEffect(() => {
    const first = genre?.sets?.[0]?.id ?? "";
    if (!genre?.sets?.find((s) => s.id === setId)) setSetId(first);
  }, [genreId, genres]); // eslint-disable-line react-hooks/exhaustive-deps

  const selectedSet = useMemo(() => genre?.sets?.find((s) => s.id === setId) ?? genre?.sets?.[0] ?? null, [genre, setId]);

  const [baseId, setBaseId] = useState(selectedSet?.bases?.[0]?.id ?? "");
  useEffect(() => {
    const first = selectedSet?.bases?.[0]?.id ?? "";
    if (!selectedSet?.bases?.find((b) => b.id === baseId)) setBaseId(first);
  }, [setId, genreId, genres]); // eslint-disable-line react-hooks/exhaustive-deps

  const selectedBase = useMemo(
    () => selectedSet?.bases?.find((b) => b.id === baseId) ?? selectedSet?.bases?.[0] ?? null,
    [selectedSet, baseId]
  );

  const flow = selectedBase?.flow ?? [];

  // Operator runner
  const [idx, setIdx] = useState(0);
  const [ended, setEnded] = useState(false);

  const [autoplayOn, setAutoplayOn] = useState(false);
  const [autoplaySec, setAutoplaySec] = useState(8);

  useEffect(() => {
    setIdx(0);
    setEnded(false);
    setAutoplayOn(false);
  }, [genreId, setId, baseId]);

  const getValidIndex = (start) => {
    if (!flow || flow.length === 0) return -1;
    let i = start;
    while (i < flow.length && !flow[i]) i += 1;
    if (i >= flow.length) return -1;
    return i;
  };

  const advance = () => {
    if (!flow || flow.length === 0) {
      setEnded(true);
      setAutoplayOn(false);
      return;
    }
    const nextValid = getValidIndex(idx + 1);
    if (nextValid === -1) {
      setEnded(true);
      setAutoplayOn(false);
      return;
    }
    setIdx(nextValid);
  };

  const back = () => {
    if (!flow || flow.length === 0) return;
    let i = idx - 1;
    while (i >= 0 && !flow[i]) i -= 1;
    if (i >= 0) setIdx(i);
  };

  useAutoplay({
    enabled: autoplayOn && !ended,
    seconds: autoplaySec,
    onTick: () => advance(),
  });

  const currentIndex = useMemo(() => {
    if (!flow || flow.length === 0) return -1;
    const valid = getValidIndex(idx);
    if (valid === -1) return -1;
    return valid;
  }, [flow, idx]);

  const current = currentIndex >= 0 ? flow[currentIndex] : null;

  const strip = useMemo(() => {
    if (!flow || flow.length === 0) return [];
    const out = [];
    const addAt = (i) => {
      const vi = getValidIndex(i);
      if (vi === -1) return;
      const item = flow[vi];
      if (!item) return;
      out.push({ index: vi, id: item.id, cue: item.cue });
    };
    addAt(currentIndex);
    addAt(currentIndex + 1);
    addAt(currentIndex + 2);
    addAt(currentIndex + 3);
    return out;
  }, [flow, currentIndex]);

  // Swipe navigation (only when autoplay off)
  const touchRef = useRef({ x: 0, y: 0, t: 0 });
  const onTouchStart = (e) => {
    if (autoplayOn) return;
    const t = e.touches?.[0];
    if (!t) return;
    touchRef.current = { x: t.clientX, y: t.clientY, t: Date.now() };
  };
  const onTouchEnd = (e) => {
    if (autoplayOn) return;
    const t = e.changedTouches?.[0];
    if (!t) return;
    const dx = t.clientX - touchRef.current.x;
    const dy = t.clientY - touchRef.current.y;
    const dt = Date.now() - touchRef.current.t;
    if (dt > 900) return;
    if (Math.abs(dx) < 50) return;
    if (Math.abs(dy) > 80) return;
    if (dx < 0) advance();
    else back();
  };

  // ===== Editor state (select what to edit) =====
  const [editGenreId, setEditGenreId] = useState(genres[0]?.id ?? "");
  useEffect(() => {
    if (!genres.find((g) => g.id === editGenreId)) setEditGenreId(genres[0]?.id ?? "");
  }, [genres, editGenreId]);

  const editGenre = useMemo(() => genres.find((g) => g.id === editGenreId) ?? genres[0] ?? null, [genres, editGenreId]);

  const [editSetId, setEditSetId] = useState(editGenre?.sets?.[0]?.id ?? "");
  useEffect(() => {
    const first = editGenre?.sets?.[0]?.id ?? "";
    if (!editGenre?.sets?.find((s) => s.id === editSetId)) setEditSetId(first);
  }, [editGenreId, genres]); // eslint-disable-line react-hooks/exhaustive-deps

  const editSet = useMemo(
    () => editGenre?.sets?.find((s) => s.id === editSetId) ?? editGenre?.sets?.[0] ?? null,
    [editGenre, editSetId]
  );

  const [editBaseId, setEditBaseId] = useState(editSet?.bases?.[0]?.id ?? "");
  useEffect(() => {
    const first = editSet?.bases?.[0]?.id ?? "";
    if (!editSet?.bases?.find((b) => b.id === editBaseId)) setEditBaseId(first);
  }, [editSetId, editGenreId, genres]); // eslint-disable-line react-hooks/exhaustive-deps

  const editBase = useMemo(
    () => editSet?.bases?.find((b) => b.id === editBaseId) ?? editSet?.bases?.[0] ?? null,
    [editSet, editBaseId]
  );

  // ===== Editor mutations =====
  const updateGenreName = (gid, name) => {
    setGenres((prev) => prev.map((g) => (g.id === gid ? { ...g, name } : g)));
  };

  const addGenre = () => {
    const g = { id: uid("genre"), name: "New Genre", sets: [] };
    setGenres((prev) => [...prev, g]);
    setEditGenreId(g.id);
    setEditSetId("");
    setEditBaseId("");
  };

  const removeGenre = (gid) => {
    setGenres((prev) => prev.filter((g) => g.id !== gid));
  };

  const addSet = (gid) => {
    const s = { id: uid("set"), name: "New Set", bases: [] };
    setGenres((prev) =>
      prev.map((g) => (g.id === gid ? { ...g, sets: [...(g.sets ?? []), s] } : g))
    );
    setEditSetId(s.id);
    setEditBaseId("");
  };

  const updateSetName = (gid, sid, name) => {
    setGenres((prev) =>
      prev.map((g) =>
        g.id !== gid
          ? g
          : {
              ...g,
              sets: (g.sets ?? []).map((s) => (s.id === sid ? { ...s, name } : s)),
            }
      )
    );
  };

  const removeSet = (gid, sid) => {
    setGenres((prev) =>
      prev.map((g) => (g.id === gid ? { ...g, sets: (g.sets ?? []).filter((s) => s.id !== sid) } : g))
    );
  };

  const addBase = (gid, sid) => {
    const b = { id: uid("base"), name: "New Base", flow: [{ id: "Base Pose", cue: "New base cue" }] };
    setGenres((prev) =>
      prev.map((g) =>
        g.id !== gid
          ? g
          : {
              ...g,
              sets: (g.sets ?? []).map((s) =>
                s.id !== sid ? s : { ...s, bases: [...(s.bases ?? []), b] }
              ),
            }
      )
    );
    setEditBaseId(b.id);
  };

  const updateBaseName = (gid, sid, bid, name) => {
    setGenres((prev) =>
      prev.map((g) =>
        g.id !== gid
          ? g
          : {
              ...g,
              sets: (g.sets ?? []).map((s) =>
                s.id !== sid
                  ? s
                  : {
                      ...s,
                      bases: (s.bases ?? []).map((b) => (b.id === bid ? { ...b, name } : b)),
                    }
              ),
            }
      )
    );
  };

  const removeBase = (gid, sid, bid) => {
    setGenres((prev) =>
      prev.map((g) =>
        g.id !== gid
          ? g
          : {
              ...g,
              sets: (g.sets ?? []).map((s) =>
                s.id !== sid ? s : { ...s, bases: (s.bases ?? []).filter((b) => b.id !== bid) }
              ),
            }
      )
    );
  };

  const updateStep = (gid, sid, bid, stepIndex, patch) => {
    setGenres((prev) =>
      prev.map((g) =>
        g.id !== gid
          ? g
          : {
              ...g,
              sets: (g.sets ?? []).map((s) =>
                s.id !== sid
                  ? s
                  : {
                      ...s,
                      bases: (s.bases ?? []).map((b) =>
                        b.id !== bid
                          ? b
                          : {
                              ...b,
                              flow: (b.flow ?? []).map((st, i) => (i === stepIndex ? { ...st, ...patch } : st)),
                            }
                      ),
                    }
              ),
            }
      )
    );
  };

  const addStep = (gid, sid, bid) => {
    const nextN = (editBase?.flow?.length ?? 0) + 1;
    const st = { id: `Pose ${nextN}`, cue: "New cue" };
    setGenres((prev) =>
      prev.map((g) =>
        g.id !== gid
          ? g
          : {
              ...g,
              sets: (g.sets ?? []).map((s) =>
                s.id !== sid
                  ? s
                  : {
                      ...s,
                      bases: (s.bases ?? []).map((b) =>
                        b.id !== bid ? b : { ...b, flow: [...(b.flow ?? []), st] }
                      ),
                    }
              ),
            }
      )
    );
  };

  const removeStep = (gid, sid, bid, stepIndex) => {
    setGenres((prev) =>
      prev.map((g) =>
        g.id !== gid
          ? g
          : {
              ...g,
              sets: (g.sets ?? []).map((s) =>
                s.id !== sid
                  ? s
                  : {
                      ...s,
                      bases: (s.bases ?? []).map((b) =>
                        b.id !== bid ? b : { ...b, flow: (b.flow ?? []).filter((_, i) => i !== stepIndex) }
                      ),
                    }
              ),
            }
      )
    );
  };

  const moveStep = (gid, sid, bid, from, to) => {
    setGenres((prev) =>
      prev.map((g) => {
        if (g.id !== gid) return g;
        return {
          ...g,
          sets: (g.sets ?? []).map((s) => {
            if (s.id !== sid) return s;
            return {
              ...s,
              bases: (s.bases ?? []).map((b) => {
                if (b.id !== bid) return b;
                const arr = [...(b.flow ?? [])];
                if (from < 0 || from >= arr.length || to < 0 || to >= arr.length) return b;
                const [item] = arr.splice(from, 1);
                arr.splice(to, 0, item);
                return { ...b, flow: arr };
              }),
            };
          }),
        };
      })
    );
  };

  const resetAll = () => {
    localStorage.removeItem(STORAGE_KEY);
    setGenres(deepClone(DEFAULT_GENRES));
    setGenreId(DEFAULT_GENRES[0]?.id ?? "");
    setEditGenreId(DEFAULT_GENRES[0]?.id ?? "");
    setTab("operator");
  };

  const genreOptions = genres.map((g) => ({ value: g.id, label: g.name }));
  const setOptions = (genre?.sets ?? []).map((s) => ({ value: s.id, label: s.name }));
  const baseOptions = (selectedSet?.bases ?? []).map((b) => ({ value: b.id, label: b.name }));

  const editGenreOptions = genres.map((g) => ({ value: g.id, label: g.name }));
  const editSetOptions = (editGenre?.sets ?? []).map((s) => ({ value: s.id, label: s.name }));
  const editBaseOptions = (editSet?.bases ?? []).map((b) => ({ value: b.id, label: b.name }));

  return (
    <div ref={shellRef} className="min-h-screen bg-white p-6 text-neutral-900">
      <div className="max-w-6xl mx-auto grid grid-cols-1 gap-6">
        <div className="flex items-center justify-between gap-3">
          <div>
            <div className="text-sm text-neutral-500">Session Flow</div>
            <h1 className="text-2xl font-semibold">Pose Flow Operator</h1>
          </div>
          <div className="flex items-center gap-2">
            <Tabs value={tab} onChange={setTab} />
            <Button onClick={toggleFullscreen} title="Full screen">
              {fs ? "Exit full screen" : "Full screen"}
            </Button>
          </div>
        </div>

        {tab === "operator" && (
          <div className="border rounded-2xl p-5">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <Field label="Genre">
                <Select value={genreId} onChange={setGenreId} options={genreOptions} />
              </Field>
              <Field label="Set">
                <Select value={setId} onChange={setSetId} options={setOptions.length ? setOptions : [{ value: "", label: "—" }]} />
              </Field>
              <Field label="Base">
                <Select
                  value={baseId}
                  onChange={setBaseId}
                  options={baseOptions.length ? baseOptions : [{ value: "", label: "—" }]}
                />
              </Field>
            </div>

            <div className="mt-4 border rounded-xl p-4">
              <div className="flex items-center justify-between gap-3">
                <div className="text-xs text-neutral-500">Autoplay</div>
                <label className="flex items-center gap-2 text-sm">
                  <input type="checkbox" checked={autoplayOn} onChange={(e) => setAutoplayOn(e.target.checked)} disabled={ended} />
                  On
                </label>
                <select
                  className="border rounded-lg p-2 text-sm"
                  value={autoplaySec}
                  onChange={(e) => setAutoplaySec(Number(e.target.value))}
                  disabled={!autoplayOn || ended}
                >
                  {[6, 7, 8, 9, 10].map((s) => (
                    <option key={s} value={s}>
                      {s}s
                    </option>
                  ))}
                </select>

                <div className="flex items-center gap-2">
                  <Button onClick={back} disabled={autoplayOn || ended || currentIndex <= 0}>
                    Back
                  </Button>
                  <Button onClick={advance} disabled={autoplayOn || ended || currentIndex === -1}>
                    Next
                  </Button>
                </div>
              </div>
            </div>

            <div className="mt-4 border rounded-xl p-4">
              <div className="flex flex-wrap gap-2">
                {strip.map((x) => (
                  <div
                    key={`${x.index}-${x.id}`}
                    className={`rounded-full border px-3 py-1 text-xs ${
                      x.index === currentIndex ? "bg-neutral-900 text-white" : "bg-neutral-50"
                    }`}
                  >
                    <span className="font-semibold">{x.id}</span>{" "}
                    <span className="whitespace-pre-line">{x.cue}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-4 border rounded-xl p-5" onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
              {!ended && current && (
                <>
                  <div className="text-xs text-neutral-500">{current.id}</div>
                  <div className="mt-2 text-xl font-semibold whitespace-pre-line">{current.cue}</div>
                </>
              )}
              {ended && (
                <>
                  <div className="text-xs text-neutral-500">End</div>
                  <div className="mt-2 text-xl font-semibold">—</div>
                </>
              )}
            </div>
          </div>
        )}

        {tab === "editor" && (
          <div className="border rounded-2xl p-5">
            <div className="flex items-center justify-between gap-3">
              <div>
                <div className="text-sm text-neutral-500">In-app editor</div>
                <div className="text-lg font-semibold">Modify Genres, Sets, Bases, Flows</div>
              </div>
              <div className="flex gap-2">
                <Button onClick={addGenre}>Add Genre</Button>
                <Button onClick={resetAll} className="border-red-300" title="Resets to default (Beauty only)">
                  Reset to default
                </Button>
              </div>
            </div>

            <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-3">
              <Field label="Edit Genre">
                <Select value={editGenreId} onChange={setEditGenreId} options={editGenreOptions} />
              </Field>
              <Field label="Edit Set">
                <Select
                  value={editSetId}
                  onChange={setEditSetId}
                  options={editSetOptions.length ? editSetOptions : [{ value: "", label: "—" }]}
                />
              </Field>
              <Field label="Edit Base">
                <Select
                  value={editBaseId}
                  onChange={setEditBaseId}
                  options={editBaseOptions.length ? editBaseOptions : [{ value: "", label: "—" }]}
                />
              </Field>
            </div>

            <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-3">
              <div className="border rounded-xl p-4">
                <div className="flex items-center justify-between">
                  <div className="text-sm font-semibold">Genre</div>
                  <Button
                    onClick={() => removeGenre(editGenre?.id)}
                    disabled={!editGenre || genres.length <= 1}
                    className="border-red-300"
                    title={genres.length <= 1 ? "Cannot delete last genre" : "Delete genre"}
                  >
                    Delete
                  </Button>
                </div>
                <div className="mt-3">
                  <Field label="Name">
                    <TextInput
                      value={editGenre?.name ?? ""}
                      onChange={(v) => editGenre && updateGenreName(editGenre.id, v)}
                      placeholder="Genre name"
                    />
                  </Field>
                </div>
                <div className="mt-3">
                  <Button onClick={() => editGenre && addSet(editGenre.id)} disabled={!editGenre}>
                    Add Set
                  </Button>
                </div>
              </div>

              <div className="border rounded-xl p-4">
                <div className="flex items-center justify-between">
                  <div className="text-sm font-semibold">Set</div>
                  <Button
                    onClick={() => removeSet(editGenre?.id, editSet?.id)}
                    disabled={!editGenre || !editSet}
                    className="border-red-300"
                    title="Delete set"
                  >
                    Delete
                  </Button>
                </div>
                <div className="mt-3">
                  <Field label="Name">
                    <TextInput
                      value={editSet?.name ?? ""}
                      onChange={(v) => editGenre && editSet && updateSetName(editGenre.id, editSet.id, v)}
                      placeholder="Set name"
                    />
                  </Field>
                </div>
                <div className="mt-3">
                  <Button onClick={() => editGenre && editSet && addBase(editGenre.id, editSet.id)} disabled={!editGenre || !editSet}>
                    Add Base
                  </Button>
                </div>
              </div>

              <div className="border rounded-xl p-4">
                <div className="flex items-center justify-between">
                  <div className="text-sm font-semibold">Base</div>
                  <Button
                    onClick={() => removeBase(editGenre?.id, editSet?.id, editBase?.id)}
                    disabled={!editGenre || !editSet || !editBase}
                    className="border-red-300"
                    title="Delete base"
                  >
                    Delete
                  </Button>
                </div>
                <div className="mt-3">
                  <Field label="Name">
                    <TextInput
                      value={editBase?.name ?? ""}
                      onChange={(v) => editGenre && editSet && editBase && updateBaseName(editGenre.id, editSet.id, editBase.id, v)}
                      placeholder="Base name"
                    />
                  </Field>
                </div>
                <div className="mt-3">
                  <Button onClick={() => editGenre && editSet && editBase && addStep(editGenre.id, editSet.id, editBase.id)} disabled={!editGenre || !editSet || !editBase}>
                    Add Flow Step
                  </Button>
                </div>
              </div>
            </div>

            <div className="mt-4 border rounded-2xl p-5">
              <div className="text-sm text-neutral-500">Flow steps</div>
              <div className="text-lg font-semibold mt-1">{editBase?.name ?? "—"}</div>

              {!editBase?.flow?.length ? (
                <div className="mt-4 text-sm text-neutral-600">No steps. Add Flow Step.</div>
              ) : (
                <div className="mt-4 space-y-3">
                  {editBase.flow.map((st, i) => (
                    <div key={`${i}-${st.id}`} className="border rounded-xl p-4">
                      <div className="flex items-center justify-between gap-2">
                        <div className="text-sm font-semibold">Step {i + 1}</div>
                        <div className="flex gap-2">
                          <Button
                            onClick={() =>
                              editGenre && editSet && editBase && moveStep(editGenre.id, editSet.id, editBase.id, i, clamp(i - 1, 0, editBase.flow.length - 1))
                            }
                            disabled={i === 0}
                            title="Move up"
                          >
                            ↑
                          </Button>
                          <Button
                            onClick={() =>
                              editGenre && editSet && editBase && moveStep(editGenre.id, editSet.id, editBase.id, i, clamp(i + 1, 0, editBase.flow.length - 1))
                            }
                            disabled={i === editBase.flow.length - 1}
                            title="Move down"
                          >
                            ↓
                          </Button>
                          <Button
                            onClick={() => editGenre && editSet && editBase && removeStep(editGenre.id, editSet.id, editBase.id, i)}
                            className="border-red-300"
                            title="Delete step"
                          >
                            Delete
                          </Button>
                        </div>
                      </div>

                      <div className="mt-3 grid grid-cols-1 md:grid-cols-3 gap-3">
                        <Field label="Pose label">
                          <TextInput
                            value={st.id}
                            onChange={(v) => editGenre && editSet && editBase && updateStep(editGenre.id, editSet.id, editBase.id, i, { id: v })}
                            placeholder="e.g., Pose 3"
                          />
                        </Field>
                        <div className="md:col-span-2">
                          <Field label="Cue">
                            <TextArea
                              value={st.cue}
                              onChange={(v) => editGenre && editSet && editBase && updateStep(editGenre.id, editSet.id, editBase.id, i, { cue: v })}
                              placeholder="Operator cue"
                              rows={3}
                            />
                          </Field>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              <div className="mt-4 flex items-center justify-between">
                <div className="text-xs text-neutral-500">
                  Saved automatically. Changes persist on this device/browser.
                </div>
                <div className="flex gap-2">
                  <Button onClick={() => setTab("operator")}>Go to Operator</Button>
                </div>
              </div>
            </div>
          </div>
        )}

        {tab === "info" && <OnePagerInfo />}
      </div>
    </div>
  );
}
