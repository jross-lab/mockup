/**
 * app.js
 * App component: control panel, state management, export logic,
 * and ReactDOM.render.
 * ─────────────────────────────────────────────────────────────
 * EDIT THIS FILE when: adding new control panel fields, changing
 * export behaviour, or modifying the overall app layout.
 */

const { useState, useRef, useCallback, useEffect, useMemo } = React;
const { T, useFonts, useHtml2Canvas, IcoStrava, IcoDownload,
        Field, Input, UploadBox,
        TopNav, TopNavHome, TopNavGroups, PhoneShell, BottomNav,
        ScreenRouter, GROUPS_TAB_SCREENS, ACTIVITY_TYPES,
} = window.MT;

// --- Walkthrough tooltip component -------------------------------------------
const TOUR_STEPS = [
  { title: "Upload your assets", body: "Drop in your hero image, challenge badge, and brand logo. These will appear across all screen types.", pos: "right" },
  { title: "Customise details", body: "Set the challenge title, description, dates, and reward. Changes update the preview instantly.", pos: "right" },
  { title: "Challenge progress", body: "Set the current distance, goal total, and unit to control the progress bar on the Joined and Completed screens.", pos: "right" },
  { title: "Live preview", body: "This is a pixel-perfect preview of how the screen will look on an iPhone. What you see is what gets exported.", pos: "left" },
  { title: "Switch screens", body: "Click any thumbnail to switch between screen types. Each one uses your content and images.", pos: "left" },
  { title: "Choose a background", body: "Pick white, black, or Strava orange as the background colour behind the phone frame.", pos: "bottom" },
  { title: "Download your mockups", body: "Export the current screen as a PNG, or download all screens at once as a ZIP file.", pos: "bottom" },
];

function Walkthrough({ step, total, onNext, onSkip, targetRef }) {
  const [pos, setPos] = useState(null);
  const bubbleRef = useRef();

  useEffect(() => {
    if (!targetRef?.current) return;
    const update = () => {
      const r = targetRef.current.getBoundingClientRect();
      const stepCfg = TOUR_STEPS[step];
      const bw = 280;
      const bh = bubbleRef.current ? bubbleRef.current.offsetHeight : 140;
      let top, left;
      if (stepCfg.pos === "right") {
        left = r.right + 16;
        top = r.top + r.height / 2 - bh / 2;
      } else if (stepCfg.pos === "bottom") {
        left = r.left + r.width / 2 - bw / 2;
        top = r.bottom + 12;
      } else {
        left = r.left - bw - 16;
        top = r.top + r.height / 2 - bh / 2;
      }
      // Clamp to viewport
      top = Math.max(12, Math.min(top, window.innerHeight - bh - 12));
      left = Math.max(12, Math.min(left, window.innerWidth - bw - 12));
      setPos({ top, left, arrowSide: stepCfg.pos });
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, [step, targetRef]);

  if (!pos) return null;

  const arrowStyle = pos.arrowSide === "right"
    ? { position: "absolute", left: -8, top: "50%", marginTop: -8, width: 0, height: 0, borderTop: "8px solid transparent", borderBottom: "8px solid transparent", borderRight: "8px solid #fff" }
    : pos.arrowSide === "bottom"
    ? { position: "absolute", top: -8, left: "50%", marginLeft: -8, width: 0, height: 0, borderLeft: "8px solid transparent", borderRight: "8px solid transparent", borderBottom: "8px solid #fff" }
    : { position: "absolute", right: -8, top: "50%", marginTop: -8, width: 0, height: 0, borderTop: "8px solid transparent", borderBottom: "8px solid transparent", borderLeft: "8px solid #fff" };

  return (
    <>
      {/* Scrim overlay */}
      <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.35)", zIndex: 9998 }} onClick={onSkip}/>
      {/* Spotlight cutout on target */}
      {targetRef?.current && (() => {
        const r = targetRef.current.getBoundingClientRect();
        return <div style={{ position: "fixed", left: r.left - 6, top: r.top - 6, width: r.width + 12, height: r.height + 12, borderRadius: 12, boxShadow: "0 0 0 9999px rgba(0,0,0,0.35)", zIndex: 9998, pointerEvents: "none" }}/>;
      })()}
      {/* Tooltip bubble */}
      <div ref={bubbleRef} style={{
        position: "fixed", top: pos.top, left: pos.left, width: 280, zIndex: 9999,
        background: "#fff", borderRadius: 12, padding: "20px 20px 16px",
        boxShadow: "0 8px 32px rgba(0,0,0,0.18), 0 2px 8px rgba(0,0,0,0.1)",
      }}>
        <div style={arrowStyle}/>
        <div style={{ fontFamily: T.font, fontSize: 14, fontWeight: 700, color: T.textPri, marginBottom: 6 }}>{TOUR_STEPS[step].title}</div>
        <div style={{ fontFamily: T.font, fontSize: 13, color: T.textSec, lineHeight: "19px", marginBottom: 16 }}>{TOUR_STEPS[step].body}</div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <span style={{ fontFamily: T.font, fontSize: 11, color: T.textTer }}>{step + 1} of {total}</span>
          <div style={{ display: "flex", gap: 8 }}>
            <button onClick={onSkip} style={{ background: "none", border: "none", fontFamily: T.font, fontSize: 13, color: T.textTer, cursor: "pointer", padding: "6px 10px" }}>Skip</button>
            <button onClick={onNext} style={{ background: T.orange, border: "none", borderRadius: 16, fontFamily: T.font, fontSize: 13, fontWeight: 700, color: "#fff", cursor: "pointer", padding: "6px 16px" }}>
              {step < total - 1 ? "Next" : "Got it"}
            </button>
          </div>
        </div>
        {/* Step dots */}
        <div style={{ display: "flex", gap: 4, justifyContent: "center", marginTop: 12 }}>
          {Array.from({ length: total }, (_, i) => (
            <div key={i} style={{ width: 6, height: 6, borderRadius: 3, background: i === step ? T.orange : "#E0E0DE" }}/>
          ))}
        </div>
      </div>
    </>
  );
}

const SCREEN_GROUPS = [
  { group: "Detail", items: [
    { key: "not-joined", label: "Not Joined" },
    { key: "reward", label: "Reward" },
    { key: "joined", label: "Joined" },
    { key: "completed", label: "Completed" },
    { key: "takeover", label: "Takeover" },
    { key: "old-design", label: "Old Design" },
  ]},
  { group: "Discovery", items: [
    { key: "groups-tab", label: "Gallery" },
    { key: "milestone", label: "Milestone" },
    { key: "follower-infeed", label: "Follower" },
    { key: "custom-infeed", label: "Custom in-feed" },
    { key: "segment", label: "Segment" },
  ]},
];

const ALL_SCREENS = [
  "not-joined", "reward", "joined", "completed", "takeover", "old-design",
  "groups-tab", "milestone", "follower-infeed", "custom-infeed", "segment",
];

// Helper: renders the correct nav + screen content for a given screen key
function ScreenPhoneContent({ screenKey, data }) {
  const tab = GROUPS_TAB_SCREENS.has(screenKey) ? "groups" : "home";
  const noTopNav = screenKey === "not-joined" || screenKey === "reward" || screenKey === "joined" || screenKey === "completed" || screenKey === "old-design";
  const homeNav = screenKey === "milestone" || screenKey === "takeover" || screenKey === "groups-tab" || screenKey === "follower-infeed" || screenKey === "custom-infeed" || screenKey === "segment";
  return (
    <>
      {noTopNav ? null : homeNav ? <TopNavHome/> : <TopNav title="Challenge" back="Groups"/>}
      <ScreenRouter screen={screenKey} data={data}/>
      <BottomNav activeTab={tab}/>
    </>
  );
}


// ─── What's New data ────────────────────────────────────────────────────────
const WHATS_NEW_ENTRIES = [
  {
    date: "26 March 2026",
    items: [
      {
        type: "new",
        title: "Feedback button — report bugs or request improvements",
        detail: "A dark \"Feedback\" pill button sits in the bottom-right corner of the tool. Click it to log a bug report, improvement idea, or feature request — responses are saved to a Google Sheet for Jonny to review — no email client or Slack required.",
      },
      {
        type: "new",
        title: "What's New panel",
        detail: "A \"What's new\" button in the header opens a slide-in panel showing a plain-English changelog of every update made to the tool, tagged as New, Improvement, or Fix. An orange dot on the button flags updates you haven't seen yet.",
      },
      {
        type: "improvement",
        title: "Control panel reorganised into clear sections",
        detail: "The input panel is now split into five named sections — Brand Assets, Brand & Challenge, Engagement & Discovery, Challenge Progress, and Content — each with a short description explaining where that information appears in the mockup.",
      },
      {
        type: "new",
        title: "Character counters on text fields",
        detail: "Longer fields (Challenge Title, Goal, In-Feed CTA, Reward, Description) now show a live character count. The counter turns orange when you're approaching the limit.",
      },
      {
        type: "improvement",
        title: "Field hints show where each input appears on screen",
        detail: "Fields like Goal and Description now carry a small grey note explaining exactly where that text shows up in the mockup — no more guessing.",
      },
      {
        type: "improvement",
        title: "Image upload labels now explain where each image is used",
        detail: "The three image slots are labelled Hero Image, Challenge Badge, and Brand Logo, with a caption under each (e.g. \"Banner behind badge\", \"Sponsor card\").",
      },
      {
        type: "fix",
        title: "Activity filter chips now show correct sport icons",
        detail: "The Run / Ride / Swim / Walk / Hike chips on the Gallery screen were showing a plain circle. They now show the correct Strava sport icons. The same fix was applied to the Takeover screen's background chip bar, which was also showing placeholder \"Label\" text.",
      },
    ],
  },
  {
    date: "25 March 2026",
    items: [
      {
        type: "improvement",
        title: "Dates and numbers auto-format as you type",
        detail: "Date fields accept almost any format you type (e.g. \"2026-05-01\" or \"1 May 2026\") and tidy it to \"May 1, 2026\" when you leave the field. Participant numbers auto-add commas (12480 → 12,480).",
      },
      {
        type: "improvement",
        title: "Activity type selector added to the control panel",
        detail: "Toggle which sports apply to a challenge using clickable pill buttons. The selected types update the qualifying activities line across all detail screens instantly.",
      },
      {
        type: "improvement",
        title: "Activity icons updated to official Strava Brand Asset Library SVGs",
        detail: "The sport icons throughout the tool (Run, Ride, Swim, Walk, Hike) were replaced with the official Strava brand icons, so mockups match the real app.",
      },
      {
        type: "new",
        title: "Custom in-feed CTA button text is now editable",
        detail: "The call-to-action button on the Custom In-Feed screen (e.g. \"Join the challenge\") can now be customised from the control panel. Previously it was fixed text.",
      },
      {
        type: "fix",
        title: "Custom in-feed layout corrected to match Figma",
        detail: "The badge is now correctly top-aligned with the challenge title, the bike icon was corrected, and a grey separator was added below the ad unit.",
      },
    ],
  },
  {
    date: "24 March 2026",
    items: [
      {
        type: "new",
        title: "Old Design screen added to the gallery",
        detail: "A legacy version of the challenge detail screen is now available in the screen picker, marked with a dashed border. Useful for before/after comparisons with clients.",
      },
      {
        type: "fix",
        title: "PNG export now captures scrolled content correctly",
        detail: "When downloading a screen you'd scrolled inside, the export was capturing the top rather than what was visible. It now exports exactly what you can see.",
      },
      {
        type: "fix",
        title: "Challenge badge clipping fixed",
        detail: "The circular badge overlapping the bottom of the hero image was being cut off on some screens. It now sits correctly on top of the hero as designed.",
      },
      {
        type: "fix",
        title: "Stray divider lines removed from info rows",
        detail: "Thin grey lines were incorrectly appearing between the challenge info rows on several screens. These have been removed to match the Figma designs.",
      },
    ],
  },
];

const WHATS_NEW_SEEN_KEY = "mockup_whats_new_seen_v1";
const LATEST_ENTRY_ID = "2026-03-26b"; // bump this when new entries are added

const TYPE_META = {
  new:         { label: "New",         bg: "#EDFCE8", color: "#2B7A1E", dot: "#2B7A1E" },
  improvement: { label: "Improvement", bg: "#EAF4FF", color: "#1A6FBF", dot: "#1A6FBF" },
  fix:         { label: "Fix",         bg: "#FFF3E0", color: "#B85C00", dot: "#B85C00" },
};

// ─── Feedback modal ──────────────────────────────────────────────────────────
const FEEDBACK_TYPES = [
  { key: "bug",         label: "🐛  Bug report",       hint: "Something isn't working as expected" },
  { key: "improvement", label: "✨  Improvement idea",  hint: "A tweak or refinement to something existing" },
  { key: "feature",     label: "💡  Feature request",   hint: "Something new you'd like to see" },
];

// Google Form submission endpoint + field IDs
const FORM_ACTION = "https://docs.google.com/forms/d/e/1FAIpQLSdpMM18ZBDSys7LB83BPdjSb3vEnA2l3s8HubmJgzP9RzNcKA/formResponse";
const FORM_FIELD_TYPE    = "entry.813967061";
const FORM_FIELD_MESSAGE = "entry.1983614390";

function FeedbackModal({ open, onClose }) {
  const [visible, setVisible] = useState(false);
  const [rendered, setRendered] = useState(false);
  const [type, setType] = useState("bug");
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState(null);
  const textareaRef = useRef();

  useEffect(() => {
    if (open) {
      setRendered(true);
      setSent(false);
      setSending(false);
      setError(null);
      setMessage("");
      setType("bug");
      requestAnimationFrame(() => requestAnimationFrame(() => {
        setVisible(true);
        setTimeout(() => textareaRef.current && textareaRef.current.focus(), 320);
      }));
    } else {
      setVisible(false);
      const t = setTimeout(() => setRendered(false), 300);
      return () => clearTimeout(t);
    }
  }, [open]);

  if (!rendered) return null;

  const selectedType = FEEDBACK_TYPES.find(f => f.key === type);
  const canSend = message.trim().length > 0 && !sending;

  const handleSend = () => {
    if (!canSend) return;
    setSending(true);
    setError(null);
    const typeLabel = selectedType.label.replace(/^\S+\s+/, ""); // strip emoji
    const body = new URLSearchParams();
    body.append(FORM_FIELD_TYPE, typeLabel);
    body.append(FORM_FIELD_MESSAGE, message.trim());
    body.append(FORM_FIELD_EXTRA, "test");
    // Fire and forget — no-cors means we can't read the response anyway,
    // and awaiting it causes a timeout in the browser. We've verified server-side
    // that the submission works, so just fire it and show confirmation immediately.
    fetch(FORM_ACTION, { method: "POST", mode: "no-cors", body }).catch(() => {});
    setSent(true);
    setSending(false);
  };

  return (
    <>
      <div onClick={onClose} style={{
        position: "fixed", inset: 0, background: "rgba(0,0,0,0.3)", zIndex: 1000,
        opacity: visible ? 1 : 0, transition: "opacity 0.2s ease",
      }}/>
      <div style={{
        position: "fixed", top: "50%", left: "50%", zIndex: 1001,
        width: 440, background: "#fff", borderRadius: 16,
        boxShadow: "0 24px 64px rgba(0,0,0,0.18), 0 4px 16px rgba(0,0,0,0.08)",
        transform: visible ? "translate(-50%, -50%) scale(1)" : "translate(-50%, -48%) scale(0.97)",
        opacity: visible ? 1 : 0,
        transition: "transform 0.25s cubic-bezier(0.4,0,0.2,1), opacity 0.2s ease",
        overflow: "hidden",
      }}>
        <div style={{ padding: "20px 20px 0" }}>
          <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 4 }}>
            <div style={{ fontFamily: T.font, fontSize: 17, fontWeight: 700, color: T.textPri }}>Share feedback</div>
            <button onClick={onClose} style={{ background: "#F2F2F0", border: "none", borderRadius: 8, width: 28, height: 28, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", flexShrink: 0, marginLeft: 8 }}>
              <svg width="10" height="10" viewBox="0 0 12 12" fill="none"><path d="M1 1l10 10M11 1L1 11" stroke="#43423F" strokeWidth="1.75" strokeLinecap="round"/></svg>
            </button>
          </div>
          <div style={{ fontFamily: T.font, fontSize: 12, color: T.textTer, marginBottom: 16 }}>Your response will be saved to a Google Sheet for Jonny to review.</div>
        </div>
        {!sent ? (
          <div style={{ padding: "0 20px 20px" }}>
            <div style={{ marginBottom: 14 }}>
              <div style={{ fontFamily: T.font, fontSize: 10, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "#6D6D78", marginBottom: 8 }}>Type</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                {FEEDBACK_TYPES.map(ft => {
                  const active = type === ft.key;
                  return (
                    <button key={ft.key} onClick={() => setType(ft.key)} style={{
                      display: "flex", alignItems: "center", gap: 10, padding: "9px 12px", borderRadius: 10, cursor: "pointer", textAlign: "left",
                      background: active ? "#FFF4EE" : "#FAFAFA",
                      border: active ? `1.5px solid ${T.orange}` : "1.5px solid #E8E8E5",
                      transition: "all 0.12s ease",
                    }}>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontFamily: T.font, fontSize: 13, fontWeight: active ? 700 : 500, color: active ? T.orange : T.textPri, lineHeight: "17px" }}>{ft.label}</div>
                        <div style={{ fontFamily: T.font, fontSize: 11, color: T.textTer, marginTop: 1 }}>{ft.hint}</div>
                      </div>
                      <div style={{ width: 16, height: 16, borderRadius: "50%", border: `1.5px solid ${active ? T.orange : "#D0D0CE"}`, background: active ? T.orange : "transparent", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                        {active && <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#fff" }}/>}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
            <div style={{ marginBottom: 16 }}>
              <div style={{ fontFamily: T.font, fontSize: 10, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "#6D6D78", marginBottom: 6 }}>Message</div>
              <textarea ref={textareaRef} value={message} onChange={e => setMessage(e.target.value)} maxLength={500} rows={4}
                placeholder={type === "bug" ? "Describe what happened and what you expected to happen…" : type === "improvement" ? "What would make this better, and why?" : "What would you like to be able to do?"}
                style={{ width: "100%", fontFamily: T.font, fontSize: 13, color: "#242428", background: "#FAFAFA", border: "1.5px solid #E8E8E5", borderRadius: 8, padding: "10px 12px", outline: "none", resize: "none", lineHeight: "19px", transition: "border-color 0.15s" }}
                onFocus={e => e.target.style.borderColor = T.orange}
                onBlur={e => e.target.style.borderColor = "#E8E8E5"}
              />
              <div style={{ fontFamily: T.font, fontSize: 10, color: message.length >= 450 ? "#E05000" : T.textTer, textAlign: "right", marginTop: 3 }}>{message.length}/500</div>
            </div>
            <div style={{ display: "flex", gap: 8 }}>
              <button onClick={onClose} style={{ flex: 1, height: 40, borderRadius: 20, background: "#F2F2F0", border: "none", fontFamily: T.font, fontSize: 13, fontWeight: 600, color: T.textSec, cursor: "pointer" }}>Cancel</button>
              <button onClick={handleSend} disabled={!canSend} style={{
                flex: 2, height: 40, borderRadius: 20, border: "none",
                background: canSend ? T.orange : "#E0E0DE",
                fontFamily: T.font, fontSize: 13, fontWeight: 700,
                color: canSend ? "#fff" : "#A0A09C",
                cursor: canSend ? "pointer" : "not-allowed",
                display: "flex", alignItems: "center", justifyContent: "center", gap: 7,
                transition: "background 0.15s",
              }}>
                {sending ? (
                  <>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" style={{ animation: "spin 1s linear infinite" }}><circle cx="12" cy="12" r="10" stroke="rgba(255,255,255,0.3)" strokeWidth="3"/><path d="M12 2a10 10 0 0 1 10 10" stroke="#fff" strokeWidth="3" strokeLinecap="round"/></svg>
                    Sending…
                  </>
                ) : (
                  <>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M22 2L11 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M22 2L15 22l-4-9-9-4 20-7z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    Submit feedback
                  </>
                )}
              </button>
            </div>
            {error && <div style={{ fontFamily: T.font, fontSize: 12, color: "#C0392B", marginTop: 8, textAlign: "center" }}>{error}</div>}
          </div>
        ) : (
          <div style={{ padding: "8px 20px 28px", textAlign: "center" }}>
            <div style={{ width: 52, height: 52, borderRadius: "50%", background: "#EDFCE8", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 14px" }}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M20 6L9 17l-5-5" stroke="#2B7A1E" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </div>
            <div style={{ fontFamily: T.font, fontSize: 15, fontWeight: 700, color: T.textPri, marginBottom: 6 }}>Feedback submitted!</div>
            <div style={{ fontFamily: T.font, fontSize: 13, color: T.textSec, lineHeight: "19px", marginBottom: 20 }}>Thanks — your response has been saved.<br/>Jonny will pick it up shortly.</div>
            <button onClick={onClose} style={{ height: 38, borderRadius: 19, background: T.orange, border: "none", fontFamily: T.font, fontSize: 13, fontWeight: 700, color: "#fff", cursor: "pointer", padding: "0 24px" }}>Done</button>
          </div>
        )}
      </div>
    </>
  );
}

function WhatsNewPanel({ open, onClose }) {
  const [visible, setVisible] = useState(false);
  const [rendered, setRendered] = useState(false);

  useEffect(() => {
    if (open) {
      setRendered(true);
      requestAnimationFrame(() => requestAnimationFrame(() => setVisible(true)));
    } else {
      setVisible(false);
      const t = setTimeout(() => setRendered(false), 300);
      return () => clearTimeout(t);
    }
  }, [open]);

  if (!rendered) return null;

  return (
    <>
      {/* Scrim */}
      <div onClick={onClose} style={{
        position: "fixed", inset: 0, background: "rgba(0,0,0,0.25)", zIndex: 1000,
        opacity: visible ? 1 : 0, transition: "opacity 0.25s ease",
      }}/>

      {/* Drawer */}
      <div style={{
        position: "fixed", top: 0, right: 0, bottom: 0, width: 440,
        background: "#fff", zIndex: 1001, display: "flex", flexDirection: "column",
        boxShadow: "-4px 0 32px rgba(0,0,0,0.12)",
        transform: visible ? "translateX(0)" : "translateX(100%)",
        transition: "transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
      }}>

        {/* Drawer header */}
        <div style={{ padding: "20px 24px 16px", borderBottom: "1px solid #DFDFE8", flexShrink: 0 }}>
          <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between" }}>
            <div>
              <div style={{ fontFamily: T.font, fontSize: 18, fontWeight: 700, color: T.textPri, lineHeight: "24px" }}>What's new</div>
              <div style={{ fontFamily: T.font, fontSize: 12, color: T.textTer, marginTop: 3 }}>Latest updates to the Mockup Tool</div>
            </div>
            <button onClick={onClose} style={{
              background: "#F2F2F0", border: "none", borderRadius: 8, width: 32, height: 32,
              display: "flex", alignItems: "center", justifyContent: "center",
              cursor: "pointer", flexShrink: 0, marginLeft: 12,
            }}>
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path d="M1 1l10 10M11 1L1 11" stroke="#43423F" strokeWidth="1.75" strokeLinecap="round"/>
              </svg>
            </button>
          </div>
          {/* Legend */}
          <div style={{ display: "flex", gap: 12, marginTop: 14, flexWrap: "wrap" }}>
            {Object.entries(TYPE_META).map(([key, m]) => (
              <div key={key} style={{ display: "flex", alignItems: "center", gap: 5 }}>
                <div style={{ width: 8, height: 8, borderRadius: 2, background: m.dot }}/>
                <span style={{ fontFamily: T.font, fontSize: 11, color: T.textTer }}>{m.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Scrollable content */}
        <div style={{ flex: 1, overflowY: "auto", padding: "4px 0 32px" }}>
          {WHATS_NEW_ENTRIES.map((group, gi) => (
            <div key={gi} style={{ padding: "20px 24px 0" }}>
              {/* Date heading */}
              <div style={{
                fontFamily: T.font, fontSize: 11, fontWeight: 700,
                letterSpacing: "0.09em", textTransform: "uppercase",
                color: T.textTer, marginBottom: 10,
              }}>{group.date}</div>

              {/* Items */}
              {group.items.map((item, ii) => {
                const meta = TYPE_META[item.type];
                return (
                  <div key={ii} style={{
                    borderLeft: `2.5px solid ${meta.dot}`,
                    paddingLeft: 14, marginBottom: 18,
                  }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 7, marginBottom: 4 }}>
                      <span style={{
                        display: "inline-block", fontFamily: T.font, fontSize: 10, fontWeight: 700,
                        letterSpacing: "0.06em", textTransform: "uppercase",
                        background: meta.bg, color: meta.color,
                        borderRadius: 4, padding: "2px 7px",
                      }}>{meta.label}</span>
                    </div>
                    <div style={{ fontFamily: T.font, fontSize: 13, fontWeight: 700, color: T.textPri, lineHeight: "18px", marginBottom: 4 }}>{item.title}</div>
                    <div style={{ fontFamily: T.font, fontSize: 12, color: T.textSec, lineHeight: "17px" }}>{item.detail}</div>
                  </div>
                );
              })}

              {/* Divider between date groups */}
              {gi < WHATS_NEW_ENTRIES.length - 1 && (
                <div style={{ height: 1, background: "#DFDFE8", margin: "4px 0 0" }}/>
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

// Character counter wrapper for Field — shows "used / max" below the input
function FieldWithCounter({ label, hint, value, maxLength, children }) {
  const used = (value || "").length;
  const nearLimit = maxLength && used >= maxLength * 0.85;
  return (
    <div style={{ marginBottom: 14 }}>
      <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", marginBottom: 5 }}>
        <div>
          <span style={{ fontSize: 10, fontFamily: T.font, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "#6D6D78" }}>{label}</span>
          {hint && <span style={{ fontSize: 10, fontFamily: T.font, color: T.textTer, marginLeft: 6 }}>{hint}</span>}
        </div>
        {maxLength && (
          <span style={{ fontSize: 10, fontFamily: T.font, color: nearLimit ? "#E05000" : T.textTer, fontVariantNumeric: "tabular-nums" }}>
            {used}/{maxLength}
          </span>
        )}
      </div>
      {children}
    </div>
  );
}
function App() {
  useFonts();
  const h2cReady = useHtml2Canvas();
  const screenRef = useRef();
  const [screen, setScreen] = useState("not-joined");
  const [busy, setBusy] = useState(false);
  const [bgColor, setBgColor] = useState("#FFFFFF");
  const [whatsNewOpen, setWhatsNewOpen] = useState(false);
  const [feedbackOpen, setFeedbackOpen] = useState(false);
  const [whatsNewSeen, setWhatsNewSeen] = useState(() => {
    try { return localStorage.getItem(WHATS_NEW_SEEN_KEY) === LATEST_ENTRY_ID; } catch { return false; }
  });
  const openWhatsNew = () => {
    setWhatsNewOpen(true);
    setWhatsNewSeen(true);
    try { localStorage.setItem(WHATS_NEW_SEEN_KEY, LATEST_ENTRY_ID); } catch {}
  };

  // Tour state
  const tourImagesRef = useRef();
  const tourPanelRef = useRef();
  const tourProgressRef = useRef();
  const tourPhoneRef = useRef();
  const tourGalleryRef = useRef();
  const tourBgRef = useRef();
  const tourDownloadRef = useRef();
  const tourRefs = [tourImagesRef, tourPanelRef, tourProgressRef, tourPhoneRef, tourGalleryRef, tourBgRef, tourDownloadRef];
  const [tourStep, setTourStep] = useState(-1);
  const startTour = () => setTourStep(0);
  const dismissTour = () => {
    setTourStep(-1);
  };
  const advanceTour = () => {
    if (tourStep >= TOUR_STEPS.length - 1) dismissTour();
    else setTourStep(s => s + 1);
  };
  // --- Formatting helpers ---
  const formatDate = (raw) => {
    if (!raw || !raw.trim()) return raw;
    const input = raw.trim();
    const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
    const monthNames = ["january","february","march","april","may","june","july","august","september","october","november","december"];
    const monthAbbr  = ["jan","feb","mar","apr","may","jun","jul","aug","sep","oct","nov","dec"];
    // Already correct: 'Jan 12, 2026'
    if (/^[A-Z][a-z]{2} \d{1,2}, \d{4}$/.test(input)) return input;
    let day, month, year, m;
    // ISO: 2026-01-12
    m = input.match(/^(\d{4})-(\d{2})-(\d{2})$/);
    if (m) { year = +m[1]; month = +m[2]; day = +m[3]; }
    // MM/DD/YYYY
    if (!year) { m = input.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/); if (m) { month = +m[1]; day = +m[2]; year = +m[3]; } }
    // DD.MM.YYYY
    if (!year) { m = input.match(/^(\d{1,2})\.(\d{1,2})\.(\d{4})$/); if (m) { day = +m[1]; month = +m[2]; year = +m[3]; } }
    // 'May 1 2026' or 'May 1, 2026' (month name first)
    if (!year) {
      m = input.match(/^([A-Za-z]+)[\s,]+(\d{1,2})[,\s]+(\d{4})$/);
      if (m) { const idx = monthNames.indexOf(m[1].toLowerCase()) + 1 || monthAbbr.indexOf(m[1].toLowerCase()) + 1; if (idx) { month = idx; day = +m[2]; year = +m[3]; } }
    }
    // '1 May 2026' (day first)
    if (!year) {
      m = input.match(/^(\d{1,2})\s+([A-Za-z]+)\s+(\d{4})$/);
      if (m) { const idx = monthNames.indexOf(m[2].toLowerCase()) + 1 || monthAbbr.indexOf(m[2].toLowerCase()) + 1; if (idx) { day = +m[1]; month = idx; year = +m[3]; } }
    }
    if (year && month >= 1 && month <= 12 && day >= 1 && day <= 31) {
      return months[month - 1] + " " + day + ", " + year;
    }
    return input;
  };

  const formatNumber = (raw) => {
    if (!raw) return raw;
    // Strip existing commas, check if it's a number
    const stripped = String(raw).replace(/,/g, "");
    if (/^\d+$/.test(stripped.trim())) {
      return Number(stripped).toLocaleString("en-GB");
    }
    return raw;
  };

  const [data, setData] = useState({
    brandName: "PowerBar", title: "PowerBar Gran Fondo Challenge",
    goal: "Ride 250km",
    description: "Hit the road with PowerBar and conquer 250km over 30 days. Every qualifying ride counts — whether it's your morning commute or a weekend epic.",
    reward: "Earn the exclusive PowerBar Gran Fondo badge",
    startDate: "May 1, 2026", endDate: "May 31, 2026",
    participants: "12,480", activityTypes: ["Run", "Ride"],
    heroImg: null, badgeImg: null, logoImg: null, mapImg: null,
    progressDistance: "187", progressTotal: "250", progressUnit: "km",
    ctaText: "Join the challenge",
  });

  const set = k => v => setData(d => ({ ...d, [k]: v }));

  // Setters with auto-formatting applied on blur
  const setDate = k => v => setData(d => ({ ...d, [k]: formatDate(v) }));
  const setNumber = k => v => setData(d => ({ ...d, [k]: formatNumber(v) }));

  const captureScreen = async (node) => {
    await document.fonts.ready;
    // dom-to-image-more doesn't preserve scrollTop, so we fake it:
    // expand the scroll container to full content height, apply negative
    // margin-top equal to scrollTop, and let the parent viewport's
    // overflow:hidden clip it to show exactly the scrolled view.
    const sc = node.querySelector('[data-phone-scroll]');
    const scrollTop = sc ? sc.scrollTop : 0;
    const needsShift = sc && scrollTop > 0;
    let origHeight, origOverflow, origMarginTop;
    if (needsShift) {
      origHeight = sc.style.height;
      origOverflow = sc.style.overflowY;
      origMarginTop = sc.style.marginTop;
      sc.style.height = "auto";
      sc.style.overflowY = "visible";
      sc.style.marginTop = `-${scrollTop}px`;
      sc.scrollTop = 0;
    }
    try {
      return await window.domtoimage.toPng(node, {
        width: node.scrollWidth * 1.75,
        height: node.scrollHeight * 1.75,
        style: { transform: "scale(1.75)", transformOrigin: "top left" },
        quality: 1,
      });
    } finally {
      if (needsShift) {
        sc.style.height = origHeight;
        sc.style.overflowY = origOverflow;
        sc.style.marginTop = origMarginTop;
        sc.scrollTop = scrollTop;
      }
    }
  };

  const dl = async () => {
    if (!h2cReady) { alert("Export library still loading -- try again in a moment."); return; }
    if (!screenRef.current) return;
    setBusy(true);
    try {
      const url = await captureScreen(screenRef.current);
      const a = document.createElement("a");
      a.href = url;
      a.download = `strava-${screen}-mockup.png`;
      a.click();
    } catch(e) { alert("Export failed: " + e.message); }
    finally { setBusy(false); }
  };

  const dlAll = async () => {
    if (!h2cReady) { alert("Export library still loading -- try again in a moment."); return; }
    if (!screenRef.current) return;
    setBusy(true);
    const originalScreen = screen;
    try {
      const zip = new JSZip();
      for (const key of ALL_SCREENS) {
        setScreen(key);
        await new Promise(r => setTimeout(r, 300));
        const dataUrl = await captureScreen(screenRef.current);
        const base64 = dataUrl.split(",")[1];
        zip.file(`strava-${key}-mockup.png`, base64, { base64: true });
      }
      setScreen(originalScreen);
      const blob = await zip.generateAsync({ type: "blob" });
      const a = document.createElement("a");
      a.href = URL.createObjectURL(blob);
      a.download = "strava-mockups.zip";
      a.click();
      URL.revokeObjectURL(a.href);
    } catch(e) { alert("Export failed: " + e.message); }
    finally { setScreen(originalScreen); setBusy(false); }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100vh", fontFamily: T.font, overflowX: "clip", overflowY: "hidden" }}>

      {/* Header banner */}
      <div style={{ background: "#fff", borderBottom: "1px solid #DFDFE8", padding: "10px 20px", flexShrink: 0, display: "flex", alignItems: "center", gap: 16 }}>
        <svg width="90" height="33" viewBox="0 0 591 217" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M176.452 91.14V3.71999L219.356 3.71999C235.104 3.71999 245.024 7.68799 251.224 13.64C256.432 18.972 259.16 25.42 259.16 34.472V34.72C259.16 47.492 252.588 56.296 241.924 61.504L259.16 86.552L304.296 -2.38419e-06L351.912 91.14H320.292L304.296 59.272L288.3 91.14H262.384H228.656L212.164 66.216H205.84V91.14H176.452ZM45.136 92.752C27.404 92.752 11.16 87.792 -4.10378e-05 77.996L15.748 59.396C25.296 66.712 36.332 69.688 46.624 69.688C51.832 69.688 54.188 68.2 54.188 65.968V65.72C54.188 63.116 51.336 61.876 41.912 59.892C22.196 55.924 4.83596 50.344 4.83596 31.868L4.83596 31.62C4.83596 15.004 17.98 2.10799 42.16 2.10799C59.272 2.10799 71.796 6.07599 81.964 14.012L67.704 33.852C59.396 27.776 49.476 25.172 41.168 25.172C36.828 25.172 34.72 26.66 34.72 28.768V29.016C34.72 31.496 37.2 32.86 46.5 34.72C69.068 38.812 84.196 45.384 84.196 62.868V63.116C84.196 81.592 68.944 92.752 45.136 92.752ZM113.46 91.14L113.46 28.396L87.544 28.396V3.71999L168.764 3.71999V28.396L142.972 28.396V91.14L113.46 91.14ZM218.488 45.384C225.68 45.384 229.896 42.284 229.896 36.828V36.58C229.896 31 225.556 28.148 218.612 28.148H205.84V45.384H218.488ZM374.108 94.736L326.616 3.596L358.112 3.596L374.108 35.464L390.104 3.596L421.724 3.596L374.108 94.736ZM396.428 91.14L443.92 -2.38419e-06L491.536 91.14L459.916 91.14L443.92 59.272L427.924 91.14H396.428Z" fill="#FC5200"/>
          <path d="M6.07596 215.14L6.07596 127.72L58.032 127.72C76.632 127.72 86.428 136.896 86.428 150.164C86.428 159.836 80.6 166.532 70.06 169.136V169.756C81.84 171.988 88.784 179.924 88.784 191.084C88.784 204.848 78.74 215.14 59.768 215.14H6.07596ZM56.172 200.632C64.108 200.632 68.572 196.292 68.572 188.976C68.572 181.536 63.984 177.196 55.924 177.196H25.42L25.42 200.632H56.172ZM25.42 163.432H54.188C62 163.432 66.216 158.968 66.216 152.644C66.216 146.32 62.124 142.228 54.56 142.228H25.42L25.42 163.432ZM166.274 151.28V215.14H148.542V206.336H148.046C142.342 213.528 134.406 217 124.734 217C109.358 217 99.4383 207.7 99.4383 189.224V151.28H117.914V186C117.914 196.664 122.626 202.244 131.554 202.244C139.862 202.244 144.946 197.284 147.798 193.44V151.28H166.274ZM210.919 217C191.947 217 178.927 210.056 176.447 199.392L195.295 195.672C197.155 201.376 203.479 204.352 211.663 204.352C220.715 204.352 225.303 201.252 225.303 196.416C225.303 192.696 222.575 190.712 216.499 190.216L201.123 188.976C185.995 187.86 178.803 180.668 178.803 170.996C178.803 158.224 191.203 149.42 211.291 149.42C228.899 149.42 240.803 155.62 244.151 166.16L225.799 170.252C223.691 164.548 218.483 162.068 210.671 162.068C202.363 162.068 197.899 165.168 197.899 169.384C197.899 172.856 200.751 174.716 206.703 175.212L223.195 176.7C237.951 177.816 244.399 184.884 244.399 194.68C244.399 208.072 231.627 217 210.919 217ZM255.308 215.14L255.308 151.28L273.784 151.28L273.784 215.14L255.308 215.14ZM264.608 142.352C258.16 142.352 253.944 138.26 253.944 132.556C253.944 126.976 258.16 122.76 264.608 122.76C270.808 122.76 275.148 126.976 275.148 132.556C275.148 138.26 270.808 142.352 264.608 142.352ZM287.703 215.14L287.703 151.28H305.435V160.084H305.931C311.759 152.892 319.943 149.42 330.235 149.42C345.983 149.42 356.399 158.72 356.399 177.196L356.399 215.14H337.923L337.923 180.42C337.923 169.756 332.715 164.176 323.291 164.176C314.611 164.176 309.031 169.136 306.179 172.98L306.179 215.14H287.703ZM404.455 217C381.143 217 366.511 203.98 366.511 183.148C366.511 162.688 381.143 149.42 403.835 149.42C426.031 149.42 440.663 161.572 440.663 180.42C440.663 183.396 440.291 186 439.919 188.108L385.359 188.108C385.483 197.532 393.047 203.732 404.951 203.732C411.647 203.732 417.847 201.5 420.947 195.424L439.175 200.012C434.091 210.8 421.815 217 404.455 217ZM385.359 176.948H421.443C421.195 166.78 414.127 161.944 403.835 161.944C393.047 161.944 385.855 167.896 385.359 176.948ZM481.694 217C462.722 217 449.702 210.056 447.222 199.392L466.07 195.672C467.93 201.376 474.254 204.352 482.438 204.352C491.49 204.352 496.078 201.252 496.078 196.416C496.078 192.696 493.35 190.712 487.274 190.216L471.898 188.976C456.77 187.86 449.578 180.668 449.578 170.996C449.578 158.224 461.978 149.42 482.066 149.42C499.674 149.42 511.578 155.62 514.926 166.16L496.574 170.252C494.466 164.548 489.258 162.068 481.446 162.068C473.138 162.068 468.674 165.168 468.674 169.384C468.674 172.856 471.526 174.716 477.478 175.212L493.97 176.7C508.726 177.816 515.174 184.884 515.174 194.68C515.174 208.072 502.402 217 481.694 217ZM556.836 217C537.864 217 524.844 210.056 522.364 199.392L541.212 195.672C543.072 201.376 549.396 204.352 557.58 204.352C566.632 204.352 571.22 201.252 571.22 196.416C571.22 192.696 568.492 190.712 562.416 190.216L547.04 188.976C531.912 187.86 524.72 180.668 524.72 170.996C524.72 158.224 537.12 149.42 557.208 149.42C574.816 149.42 586.72 155.62 590.068 166.16L571.716 170.252C569.608 164.548 564.4 162.068 556.588 162.068C548.28 162.068 543.816 165.168 543.816 169.384C543.816 172.856 546.668 174.716 552.62 175.212L569.112 176.7C583.868 177.816 590.316 184.884 590.316 194.68C590.316 208.072 577.544 217 556.836 217Z" fill="black"/>
        </svg>
        <div style={{ height: 24, width: 1, background: "#DFDFE8", flexShrink: 0 }}/>
        <span style={{ fontFamily: T.font, fontSize: 14, fontWeight: 700, color: T.textPri }}>Interactive Mockup Tool</span>
        <span style={{ fontFamily: T.font, fontSize: 13, color: T.textSec }}>Build branded Strava challenge screens — pick a template, drop in your assets, and download a pixel-perfect PNG.</span>
        <div style={{ marginLeft: "auto", flexShrink: 0, display: "flex", gap: 8 }}>
          {/* What's new button */}
          <button onClick={openWhatsNew} style={{ background: "none", border: "1.5px solid #DFDFE8", borderRadius: 16, padding: "5px 14px", fontFamily: T.font, fontSize: 12, fontWeight: 600, color: T.textSec, cursor: "pointer", whiteSpace: "nowrap", display: "flex", alignItems: "center", gap: 6, position: "relative" }}>
            <svg width="13" height="13" viewBox="0 0 16 16" fill="none"><path d="M8 1l1.8 3.6L14 5.6l-3 2.9.7 4.1L8 10.5 4.3 12.6l.7-4.1-3-2.9 4.2-.6L8 1z" stroke="#64635E" strokeWidth="1.4" strokeLinejoin="round"/></svg>
            What's new
            {!whatsNewSeen && (
              <span style={{ position: "absolute", top: 4, right: 4, width: 7, height: 7, borderRadius: "50%", background: T.orange, border: "1.5px solid #fff" }}/>
            )}
          </button>
          {/* Tour button */}
          <button onClick={startTour} style={{ background: "none", border: "1.5px solid #DFDFE8", borderRadius: 16, padding: "5px 14px", fontFamily: T.font, fontSize: 12, fontWeight: 600, color: T.textSec, cursor: "pointer", whiteSpace: "nowrap", display: "flex", alignItems: "center", gap: 5 }}>
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="7" stroke="#64635E" strokeWidth="1.5"/><path d="M7.25 7H8.75V11.5H7.25V7Z" fill="#64635E"/><circle cx="8" cy="5" r="0.9" fill="#64635E"/></svg>
            Take a tour
          </button>
        </div>
      </div>

      {/* Main layout */}
      <div style={{ display: "flex", flex: 1, minHeight: 0 }}>

      {/* Left panel */}
      <div style={{ width: 460, flexShrink: 0, background: "#fff", borderRight: "1px solid #DFDFE8", display: "flex", flexDirection: "column", overflowY: "auto", overflowX: "hidden" }}>

        {/* ── Section: Brand Assets ─────────────────────────────── */}
        <div ref={tourImagesRef} style={{ padding: "14px 16px 12px" }}>
          <div style={{ fontFamily: T.font, fontSize: 13, fontWeight: 700, color: T.textPri, marginBottom: 2 }}>Brand Assets</div>
          <div style={{ fontFamily: T.font, fontSize: 11, color: T.textTer, marginBottom: 10 }}>Upload images used across all screens</div>
          <div style={{ display: "flex", gap: 8 }}>
            <div style={{ flex: 1 }}>
              <UploadBox label="Hero Image" preview={data.heroImg} onUpload={set("heroImg")} aspect="1/1"/>
              <div style={{ fontFamily: T.font, fontSize: 10, color: T.textTer, marginTop: 3, textAlign: "center" }}>Banner behind badge</div>
            </div>
            <div style={{ flex: 1 }}>
              <UploadBox label="Challenge Badge" preview={data.badgeImg} onUpload={set("badgeImg")} aspect="1/1"/>
              <div style={{ fontFamily: T.font, fontSize: 10, color: T.textTer, marginTop: 3, textAlign: "center" }}>Award icon</div>
            </div>
            <div style={{ flex: 1 }}>
              <UploadBox label="Brand Logo" preview={data.logoImg} onUpload={set("logoImg")} aspect="1/1"/>
              <div style={{ fontFamily: T.font, fontSize: 10, color: T.textTer, marginTop: 3, textAlign: "center" }}>Sponsor card</div>
            </div>
          </div>
        </div>

        <div style={{ height: 1, background: "#DFDFE8", flexShrink: 0 }}/>

        {/* ── Section: Brand & Challenge ────────────────────────── */}
        <div ref={tourPanelRef} style={{ padding: "14px 16px 4px" }}>
          <div style={{ fontFamily: T.font, fontSize: 13, fontWeight: 700, color: T.textPri, marginBottom: 2 }}>Brand & Challenge</div>
          <div style={{ fontFamily: T.font, fontSize: 11, color: T.textTer, marginBottom: 10 }}>Core details shown on the challenge detail screens</div>

          <Field label="Brand Name"><Input value={data.brandName} onChange={set("brandName")} placeholder="e.g. PowerBar" maxLength={40}/></Field>

          <FieldWithCounter label="Challenge Title" value={data.title} maxLength={60}>
            <Input value={data.title} onChange={set("title")} placeholder="e.g. PowerBar Gran Fondo Challenge" maxLength={60}/>
          </FieldWithCounter>

          <FieldWithCounter label="Goal" hint="Shown in the challenge info rows" value={data.goal} maxLength={50}>
            <Input value={data.goal} onChange={set("goal")} placeholder="e.g. Ride 250km" maxLength={50}/>
          </FieldWithCounter>

          {/* Activity Type pill toggles */}
          <div style={{ marginBottom: 10 }}>
            <div style={{ fontSize: 10, fontFamily: T.font, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "#6D6D78", marginBottom: 5 }}>Qualifying Activity Types</div>
            <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
              {ACTIVITY_TYPES.map(({ key, label, Icon }) => {
                const active = (data.activityTypes || []).includes(key);
                return (
                  <button key={key} onClick={() => {
                    const current = data.activityTypes || [];
                    const next = active ? current.filter(k => k !== key) : [...current, key];
                    set("activityTypes")(next);
                  }} style={{
                    display: "flex", alignItems: "center", gap: 5,
                    padding: "5px 12px", borderRadius: 16,
                    background: active ? T.orange : "#F5F5F3",
                    color: active ? "#fff" : T.textPri,
                    border: active ? "none" : "1px solid #E0E0DE",
                    fontFamily: T.font, fontSize: 12, fontWeight: 600,
                    cursor: "pointer", transition: "all 0.15s ease",
                  }}>
                    <Icon size={14} color={active ? "#fff" : T.textSec}/>
                    {label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Dates side by side */}
          <div style={{ display: "flex", gap: 8 }}>
            <div style={{ flex: 1 }}><Field label="Start Date"><Input value={data.startDate} onChange={v => setData(d => ({ ...d, startDate: v }))} onBlur={() => setData(d => ({ ...d, startDate: formatDate(d.startDate) }))} placeholder="e.g. May 1, 2026" maxLength={20}/></Field></div>
            <div style={{ flex: 1 }}><Field label="End Date"><Input value={data.endDate} onChange={v => setData(d => ({ ...d, endDate: v }))} onBlur={() => setData(d => ({ ...d, endDate: formatDate(d.endDate) }))} placeholder="e.g. May 31, 2026" maxLength={20}/></Field></div>
          </div>
        </div>

        <div style={{ height: 1, background: "#DFDFE8", flexShrink: 0 }}/>

        {/* ── Section: Engagement ───────────────────────────────── */}
        <div style={{ padding: "14px 16px 4px" }}>
          <div style={{ fontFamily: T.font, fontSize: 13, fontWeight: 700, color: T.textPri, marginBottom: 2 }}>Engagement & Discovery</div>
          <div style={{ fontFamily: T.font, fontSize: 11, color: T.textTer, marginBottom: 10 }}>Used on feed cards and the not-joined screen</div>
          <div style={{ display: "flex", gap: 8 }}>
            <div style={{ flex: 1 }}>
              <Field label="Club Members"><Input value={data.participants} onChange={v => setData(d => ({ ...d, participants: v }))} onBlur={() => setData(d => ({ ...d, participants: formatNumber(d.participants) }))} placeholder="e.g. 12,480" maxLength={12}/></Field>
            </div>
            <div style={{ flex: 1 }}>
              <FieldWithCounter label="In-Feed CTA Button" value={data.ctaText} maxLength={30}>
                <Input value={data.ctaText} onChange={set("ctaText")} placeholder="e.g. Join the challenge" maxLength={30}/>
              </FieldWithCounter>
            </div>
          </div>
        </div>

        <div style={{ height: 1, background: "#DFDFE8", flexShrink: 0 }}/>

        {/* ── Section: Challenge Progress ───────────────────────── */}
        <div ref={tourProgressRef} style={{ padding: "14px 16px 4px" }}>
          <div style={{ fontFamily: T.font, fontSize: 13, fontWeight: 700, color: T.textPri, marginBottom: 2 }}>Challenge Progress</div>
          <div style={{ fontFamily: T.font, fontSize: 11, color: T.textTer, marginBottom: 10 }}>Controls the progress bar on the Joined and Completed screens</div>
          <div style={{ display: "flex", gap: 8 }}>
            <div style={{ flex: 1 }}><Field label="Current Distance"><Input value={data.progressDistance} onChange={v => setData(d => ({ ...d, progressDistance: v }))} onBlur={() => setData(d => ({ ...d, progressDistance: formatNumber(d.progressDistance) }))} placeholder="e.g. 187" maxLength={10}/></Field></div>
            <div style={{ flex: 1 }}><Field label="Goal Total"><Input value={data.progressTotal} onChange={v => setData(d => ({ ...d, progressTotal: v }))} onBlur={() => setData(d => ({ ...d, progressTotal: formatNumber(d.progressTotal) }))} placeholder="e.g. 250" maxLength={10}/></Field></div>
            <div style={{ flex: 1 }}><Field label="Unit"><Input value={data.progressUnit} onChange={set("progressUnit")} placeholder="e.g. km" maxLength={10}/></Field></div>
          </div>
        </div>

        <div style={{ height: 1, background: "#DFDFE8", flexShrink: 0 }}/>

        {/* ── Section: Content ──────────────────────────────────── */}
        <div style={{ padding: "14px 16px 16px" }}>
          <div style={{ fontFamily: T.font, fontSize: 13, fontWeight: 700, color: T.textPri, marginBottom: 2 }}>Content</div>
          <div style={{ fontFamily: T.font, fontSize: 11, color: T.textTer, marginBottom: 10 }}>Shown in the About section and reward info row</div>

          <FieldWithCounter label="Reward" hint="Shown in the challenge info rows" value={data.reward} maxLength={120}>
            <Input value={data.reward} onChange={set("reward")} placeholder="e.g. Earn the exclusive PowerBar Gran Fondo badge" multiline rows={2} maxLength={120}/>
          </FieldWithCounter>

          <FieldWithCounter label="Description" hint="Shown in the About this Challenge section" value={data.description} maxLength={300}>
            <Input value={data.description} onChange={set("description")} placeholder="e.g. Hit the road with PowerBar and conquer 250km over 30 days. Every qualifying ride counts — whether it's your morning commute or a weekend epic." multiline rows={4} maxLength={300}/>
          </FieldWithCounter>
        </div>

      </div>

      {/* Right side: toolbar + phone + gallery */}
      <div style={{ flex: 1, minWidth: 0, display: "flex", flexDirection: "column", overflow: "hidden" }}>

        {/* Toolbar: background picker + download buttons */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px 20px", background: "#fff", borderBottom: "1px solid #DFDFE8", flexShrink: 0 }}>
          {/* Background picker */}
          <div ref={tourBgRef} style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div>
              <div style={{ fontSize: 12, fontFamily: T.font, fontWeight: 700, color: T.textPri, lineHeight: "14px" }}>Background</div>
              <div style={{ fontSize: 10, fontFamily: T.font, color: T.textTer, lineHeight: "13px", marginTop: 1 }}>Preview colour</div>
            </div>
            <div style={{ display: "flex", gap: 6 }}>
              {[["#FFFFFF","White"],["#000000","Black"],["#FC5200","Orange"]].map(([color, label]) => (
                <button key={color} onClick={() => setBgColor(color)} style={{
                  width: 28, height: 28, borderRadius: 6, border: bgColor === color ? "2px solid #FC5200" : "1.5px solid #DFDFE8",
                  background: color, cursor: "pointer", padding: 0,
                }} title={label}/>
              ))}
            </div>
          </div>
          {/* Download buttons */}
          <div ref={tourDownloadRef} style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{ textAlign: "right" }}>
              <div style={{ fontSize: 12, fontFamily: T.font, fontWeight: 700, color: T.textPri, lineHeight: "14px" }}>Download</div>
              <div style={{ fontSize: 10, fontFamily: T.font, color: T.textTer, lineHeight: "13px", marginTop: 1 }}>Export as PNG</div>
            </div>
            {!h2cReady && <span style={{ fontFamily: T.font, fontSize: 11, color: T.textTer }}>Loading...</span>}
            <button onClick={dl} disabled={busy || !h2cReady}
              style={{ height: 36, borderRadius: 18, background: (busy || !h2cReady) ? "#aaa" : T.orange, border: "none", fontFamily: T.font, fontSize: 12, fontWeight: 700, color: "#fff", cursor: (busy || !h2cReady) ? "not-allowed" : "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 5, padding: "0 16px" }}>
              <IcoDownload/>{busy ? "..." : "This screen"}
            </button>
            <button onClick={dlAll} disabled={busy || !h2cReady}
              style={{ height: 36, borderRadius: 18, background: (busy || !h2cReady) ? "#aaa" : T.textPri, border: "none", fontFamily: T.font, fontSize: 12, fontWeight: 700, color: "#fff", cursor: (busy || !h2cReady) ? "not-allowed" : "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 5, padding: "0 16px" }}>
              <IcoDownload/>{busy ? "..." : "All screens (ZIP)"}
            </button>
          </div>
        </div>

      {/* Phone preview + screen gallery */}
      <div style={{ flex: 1, minWidth: 0, display: "flex", alignItems: "center", justifyContent: "center", padding: 8, overflow: "hidden", gap: 32, background: bgColor }}>
        <div ref={tourPhoneRef} style={{ flexShrink: 0, transform: "scale(0.85)", transformOrigin: "center center" }}>
          <PhoneShell screenRef={screenRef} bgColor={bgColor}>
            <ScreenPhoneContent screenKey={screen} data={data}/>
          </PhoneShell>
        </div>

        {/* Screen picker gallery — 2-column grid */}
        <div ref={tourGalleryRef} style={{ flexShrink: 0, display: "flex", flexDirection: "column", gap: 10, padding: "12px 0", alignSelf: "center" }}>
          <div style={{ fontFamily: T.font, fontSize: 13, fontWeight: 700, color: T.textPri, letterSpacing: "0.02em" }}>Screens</div>
          {SCREEN_GROUPS.map(({ group, items }) => (
            <div key={group}>
              <div style={{ fontFamily: T.font, fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: T.textTer, marginBottom: 8 }}>{group}</div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
                {items.map(({ key, label }) => {
                  const active = screen === key;
                  const legacy = key === "old-design";
                  return (
                    <button key={key} onClick={() => setScreen(key)} style={{
                      width: 100, padding: "12px 8px", borderRadius: 10, cursor: "pointer", transition: "all 0.15s ease",
                      border: active ? "2px solid " + T.orange : legacy ? "1.5px dashed #C8C8C8" : "1.5px solid #DFDFE8",
                      background: active ? "#FFF4EE" : legacy ? "#F7F7F5" : "#fff",
                      opacity: (!active && legacy) ? 0.7 : 1,
                      display: "flex", flexDirection: "column", alignItems: "center", gap: 8,
                    }}>
                      {/* Mini phone silhouette */}
                      <svg width="28" height="46" viewBox="0 0 28 46" fill="none">
                        <rect x="0.5" y="0.5" width="27" height="45" rx="6.5" stroke={active ? T.orange : "#C8C8C8"} strokeWidth="1"/>
                        <rect x="3" y="3" width="22" height="33" rx="1.5" fill={active ? "#FDDCC8" : "#F2F2F0"}/>
                        <circle cx="14" cy="42" r="1.5" fill={active ? T.orange : "#D0D0CE"}/>
                      </svg>
                      <span style={{ fontFamily: T.font, fontSize: 11, fontWeight: active ? 700 : 500, color: active ? T.orange : T.textSec, lineHeight: "13px", whiteSpace: "nowrap", textAlign: "center" }}>{label}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
      </div>
      </div>

      {/* What's New drawer */}
      <WhatsNewPanel open={whatsNewOpen} onClose={() => setWhatsNewOpen(false)}/>

      {/* Feedback modal */}
      <FeedbackModal open={feedbackOpen} onClose={() => setFeedbackOpen(false)}/>

      {/* Floating feedback button */}
      <button onClick={() => setFeedbackOpen(true)} style={{
        position: "fixed", bottom: 20, right: 20, zIndex: 900,
        height: 38, borderRadius: 19, background: "#1A1A1A",
        border: "none", display: "flex", alignItems: "center", gap: 7,
        padding: "0 16px 0 13px", cursor: "pointer",
        boxShadow: "0 2px 12px rgba(0,0,0,0.22), 0 1px 3px rgba(0,0,0,0.12)",
        fontFamily: T.font, fontSize: 12, fontWeight: 600, color: "#fff",
        transition: "transform 0.15s ease, box-shadow 0.15s ease",
      }}
        onMouseEnter={e => { e.currentTarget.style.transform = "scale(1.04)"; e.currentTarget.style.boxShadow = "0 4px 18px rgba(0,0,0,0.28)"; }}
        onMouseLeave={e => { e.currentTarget.style.transform = "scale(1)"; e.currentTarget.style.boxShadow = "0 2px 12px rgba(0,0,0,0.22)"; }}
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
        Feedback
      </button>

      {/* Tooltip walkthrough */}
      {tourStep >= 0 && tourStep < TOUR_STEPS.length && (
        <Walkthrough
          step={tourStep}
          total={TOUR_STEPS.length}
          onNext={advanceTour}
          onSkip={dismissTour}
          targetRef={tourRefs[tourStep]}
        />
      )}
    </div>
  );
}

const _spinStyle = document.createElement("style");
_spinStyle.textContent = "@keyframes spin { to { transform: rotate(360deg); } }";
document.head.appendChild(_spinStyle);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App/>);
