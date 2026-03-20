/**
 * shared.js
 * Reusable UI primitives: panel helpers, phone chrome, bottom nav,
 * and shared screen building blocks.
 * ─────────────────────────────────────────────────────────────
 * EDIT THIS FILE when: changing the phone shell, bottom nav,
 * control panel inputs, or shared components like HeroBadge,
 * InfoRow, OrangeBtn, SponsorCard, Leaderboard, etc.
 */

const { useState, useRef, useCallback, useEffect } = React;
const { T, AVATAR_IMG, NAV_ICONS, NAV_TABS, FALLBACK_COLORS,
        IcoDate, IcoActivityType, IcoReward, IcoBackArrow } = window.MT;

// --- Panel helpers -----------------------------------------------------------
function Field({ label, children }) {
  return (
    <div style={{ marginBottom: 13 }}>
      <div style={{ fontSize: 10, fontFamily: T.font, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "#6D6D78", marginBottom: 4 }}>{label}</div>
      {children}
    </div>
  );
}
function Input({ value, onChange, placeholder, multiline }) {
  const s = { width: "100%", fontFamily: T.font, fontSize: 13, color: "#242428", background: "#fff", border: "1px solid #DFDFE8", borderRadius: 6, padding: "7px 10px", outline: "none", resize: multiline ? "vertical" : "none" };
  return multiline
    ? <textarea value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder} rows={3} style={s}/>
    : <input value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder} style={s}/>;
}
function useFileUpload(onLoad) {
  const ref = useRef();
  const handle = useCallback(e => {
    const f = e.target?.files?.[0] || e.dataTransfer?.files?.[0];
    if (!f) return;
    const r = new FileReader();
    r.onload = ev => onLoad(ev.target.result);
    r.readAsDataURL(f);
  }, [onLoad]);
  return { ref, handle, open: () => ref.current?.click() };
}
function UploadBox({ label, preview, onUpload, aspect }) {
  const { ref, handle, open } = useFileUpload(onUpload);
  return (
    <Field label={label}>
      <div onClick={open} onDrop={e => { e.preventDefault(); handle(e); }} onDragOver={e => e.preventDefault()}
        style={{ border: preview ? "none" : "1.5px dashed #DFDFE8", borderRadius: 8, background: preview ? "transparent" : "#F7F7FA", cursor: "pointer", overflow: "hidden", display: "flex", alignItems: "center", justifyContent: "center", aspectRatio: aspect, width: "100%", minHeight: 60 }}>
        {preview ? <img src={preview} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: 8 }}/> : <span style={{ fontSize: 11, color: "#6D6D78", fontFamily: T.font }}>Click or drag to upload</span>}
      </div>
      <input ref={ref} type="file" accept="image/*" style={{ display: "none" }} onChange={handle}/>
    </Field>
  );
}

// --- Phone chrome ------------------------------------------------------------
function TopNav({ title = "Challenge", back = "Groups" }) {
  return (
    <div style={{ height: 48, background: T.bgSurface, display: "flex", alignItems: "center", justifyContent: "center", position: "relative", borderBottom: `0.5px solid ${T.divider}`, flexShrink: 0 }}>
      <div style={{ position: "absolute", left: 12, display: "flex", alignItems: "center", gap: 5 }}>
        <IcoBackArrow/><span style={{ fontFamily: T.font, fontSize: 17, fontWeight: 400 }}>{back}</span>
      </div>
      <span style={{ fontFamily: T.font, fontSize: 17, fontWeight: 700 }}>{title}</span>
    </div>
  );
}
function PhoneShell({ children, screenRef, bgColor }) {
  const frameColor = bgColor === "#FC5200" ? "#000000" : T.orange;
  return (
    <div ref={screenRef} style={{ display: "inline-block" }}>
      <div style={{ position: "relative", width: 375, borderRadius: 50, background: frameColor, padding: 8, flexShrink: 0, overflow: "hidden" }}>
        <div style={{ borderRadius: 42, overflow: "hidden", background: T.bgSunken, position: "relative" }}>
          <div style={{ maxHeight: 780, overflowY: "auto", display: "flex", flexDirection: "column", scrollbarWidth: "none", msOverflowStyle: "none" }}>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}

// --- Bottom Nav (pixel-perfect from Figma node 2048:13139) -------------------
function BottomNav({ activeTab = "groups" }) {
  return (
    <div style={{ background: "#fff", boxShadow: "0px -0.5px 0px 0px rgba(0,0,0,0.25)", display: "flex", flexDirection: "column", alignItems: "center", gap: 22, paddingTop: 7, paddingBottom: 1, paddingLeft: 11, paddingRight: 11, flexShrink: 0 }}>
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", width: "100%", minWidth: 323 }}>
        {NAV_TABS.map(({ key, label }) => {
          const active = key === activeTab;
          const color = active ? T.orange : "#000000";
          return (
            <div key={key} style={{ width: 53, height: 41, position: "relative", flexShrink: 0 }}>
              <div style={{ position: "absolute", left: 0, top: 0, width: 53, display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
                <div style={{ width: 24, height: 24, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, "--fill-0": color }}>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>{NAV_ICONS[key]}</div>
                </div>
                <span style={{ fontFamily: "'Maison Neue', 'Helvetica Neue', Helvetica, Arial, sans-serif", fontWeight: 600, fontSize: 11, lineHeight: "13px", color, textAlign: "center", whiteSpace: "nowrap", display: "block", width: 53 }}>{label}</span>
              </div>
            </div>
          );
        })}
      </div>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", paddingBottom: 7, flexShrink: 0 }}>
        <div style={{ width: 134, height: 5, borderRadius: 7, background: "#000" }}/>
      </div>
    </div>
  );
}

// --- Facepile ----------------------------------------------------------------
function Facepile() {
  return (
    <div style={{ display: "flex" }}>
      {[0,1,2].map(i => (
        <div key={i} style={{ width: 24, height: 24, borderRadius: "50%", background: "#888", border: "1.5px solid white", marginLeft: i > 0 ? -6 : 0, zIndex: 3 - i, flexShrink: 0, overflow: "hidden" }}>
          <img src={AVATAR_IMG} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center top" }}/>
        </div>
      ))}
    </div>
  );
}

// --- Shared screen primitives ------------------------------------------------
function HeroBadge({ heroImg, badgeImg }) {
  return (
    <div style={{ position: "relative", flexShrink: 0 }}>
      <div style={{ width: "100%", height: 185, background: "#C8C8C8", overflow: "hidden" }}>
        {heroImg ? <img src={heroImg} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }}/>
          : <div style={{ width: "100%", height: "100%", background: "linear-gradient(135deg,#d0d0d0,#a8a8a8)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <span style={{ fontFamily: T.font, fontSize: 12, color: "#fff", opacity: 0.6 }}>Hero Image (2:1)</span>
            </div>}
      </div>
      <div style={{ position: "absolute", left: "calc(50% - 60px)", bottom: -60, width: 120, height: 120, borderRadius: "50%", background: badgeImg ? "transparent" : "#E8E8E8", border: badgeImg ? "none" : "3px solid white", overflow: "hidden", boxShadow: badgeImg ? "none" : "0 2px 12px rgba(0,0,0,0.18)", display: "flex", alignItems: "center", justifyContent: "center" }}>
        {badgeImg ? <img src={badgeImg} alt="" style={{ width: "100%", height: "100%", objectFit: "contain" }}/>
          : <span style={{ fontFamily: T.font, fontSize: 9, color: "#999", textAlign: "center", padding: 6 }}>Badge</span>}
      </div>
    </div>
  );
}
function InfoRow({ icon, primary, secondary, accent }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "0 24px", minHeight: 64, background: T.bgSurface }}>
      <div style={{ width: 24, height: 24, flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>{icon}</div>
      <div style={{ flex: 1 }}>
        <div style={{ fontFamily: T.font, fontSize: 15, fontWeight: accent ? 700 : 400, color: accent ? T.orange : T.textPri, lineHeight: "20px" }}>{primary}</div>
        {secondary && <div style={{ fontFamily: T.font, fontSize: 13, color: T.textTer, lineHeight: "18px", marginTop: 2 }}>{secondary}</div>}
      </div>
    </div>
  );
}
function OrangeBtn({ label, outline }) {
  return (
    <button style={{ width: 327, height: 34, borderRadius: 17, background: outline ? "transparent" : T.orange, border: `1.5px solid ${T.orange}`, fontFamily: T.font, fontSize: 13, fontWeight: 700, lineHeight: "18px", color: outline ? T.orange : "#fff", cursor: "default", display: "flex", alignItems: "center", justifyContent: "center" }}>{label}</button>
  );
}
function SponsorCard({ brandName, badgeImg, logoImg }) {
  const clubImg = logoImg || badgeImg;
  return (
    <div style={{ background: T.bgSurface, marginTop: 8, padding: 24, display: "flex", gap: 16 }}>
      <div style={{ width: 64, height: 64, borderRadius: 8, background: "#E8E8E8", flexShrink: 0, overflow: "hidden", display: "flex", alignItems: "center", justifyContent: "center" }}>
        {clubImg ? <img src={clubImg} alt="" style={{ width: "100%", height: "100%", objectFit: "contain" }}/> : <span style={{ fontFamily: T.font, fontSize: 9, color: "#999" }}>Logo</span>}
      </div>
      <div style={{ flex: 1 }}>
        <div style={{ fontFamily: T.font, fontSize: 10, color: T.textPri, textTransform: "uppercase", letterSpacing: "0.08em", lineHeight: "14px" }}>Organizing club</div>
        <div style={{ fontFamily: T.font, fontSize: 22, fontWeight: 700, lineHeight: "28px", margin: "2px 0 3px" }}>{brandName || "Brand Name"}</div>
        <div style={{ fontFamily: T.font, fontSize: 13, color: T.textSec, marginBottom: 12 }}>Strava Club</div>
        <button style={{ height: 34, borderRadius: 17, background: T.orange, border: "none", fontFamily: T.font, fontSize: 15, fontWeight: 700, color: "#fff", cursor: "default", padding: "0 20px" }}>Follow</button>
      </div>
    </div>
  );
}
function InfoRows({ data }) {
  const { goal, startDate, endDate, activityType, reward } = data;
  return (
    <>
      <InfoRow icon={<IcoDate/>} primary={startDate && endDate ? `${startDate} - ${endDate}` : "Start date - End date"}/>
      <InfoRow icon={<IcoActivityType/>} primary={goal || "Complete the challenge activity"} secondary={`Qualifying Activities: ${activityType || "Run, Virtual Run, Walk"}`}/>
      <InfoRow icon={<IcoReward/>} primary={reward || "Earn a digital finisher's badge for your Trophy Case."}/>
      <InfoRow icon={null} primary="Details and Eligibility" accent/>
    </>
  );
}

// --- Stats Grid --------------------------------------------------------------
function StatsGrid() {
  const stats = [
    [{ label: "Distance", value: "147.7 mi" }, { label: "Moving Time", value: "18:02:25" }],
    [{ label: "Elevation Gain", value: "5,576 ft" }, { label: "Elapsed Time", value: "24:17:47" }],
  ];
  return (
    <div style={{ background: T.bgSurface, padding: "20px 24px", display: "flex", flexDirection: "column", gap: 16, textAlign: "center" }}>
      {stats.map((row, ri) => (
        <div key={ri} style={{ display: "flex" }}>
          {row.map(({ label, value }) => (
            <div key={label} style={{ flex: 1, display: "flex", flexDirection: "column", gap: 2, alignItems: "center" }}>
              <span style={{ fontFamily: T.font, fontSize: 11, color: T.textSec, lineHeight: "13px" }}>{label}</span>
              <span style={{ fontFamily: T.font, fontSize: 17, fontWeight: 700, color: T.textPri, lineHeight: "22px" }}>{value}</span>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

// --- Featured Athletes carousel ----------------------------------------------
function FeaturedAthletes() {
  const athletes = [
    { name: "Single Name", location: "Belgium" },
    { name: "First Last", location: "United States" },
  ];
  return (
    <div style={{ background: T.bgSunken, padding: 24, overflow: "hidden" }}>
      <div style={{ fontFamily: T.font, fontSize: 17, fontWeight: 700, marginBottom: 16 }}>Featured Athletes</div>
      <div style={{ display: "flex", gap: 8, overflowX: "auto" }}>
        {athletes.map((a, i) => (
          <div key={i} style={{ background: "#fff", borderRadius: 16, padding: 16, width: 160, flexShrink: 0, display: "flex", flexDirection: "column", alignItems: "center", gap: 12, boxShadow: "0 2px 4px rgba(0,0,0,0.1)" }}>
            <div style={{ width: 64, height: 64, borderRadius: "50%", background: FALLBACK_COLORS[i % 3], flexShrink: 0 }}/>
            <div style={{ textAlign: "center" }}>
              <div style={{ fontFamily: T.font, fontSize: 15, fontWeight: 700, lineHeight: "20px" }}>{a.name}</div>
              <div style={{ fontFamily: T.font, fontSize: 13, color: T.textSec, marginTop: 2 }}>{a.location}</div>
            </div>
            <button style={{ height: 28, borderRadius: 14, background: T.orange, border: "none", fontFamily: T.font, fontSize: 12, fontWeight: 700, color: "#fff", cursor: "default", padding: "0 16px", width: "100%" }}>Follow</button>
          </div>
        ))}
      </div>
    </div>
  );
}

// --- Progress card -----------------------------------------------------------
function ProgressCard({ label = "17 km", total = "30 km", pct = 57, right = "14 days left", buttonLabel }) {
  return (
    <div style={{ background: "#fff", borderRadius: 16, padding: 16, boxShadow: "0 0.5px 4px rgba(0,0,0,0.1),0 6px 12px rgba(0,0,0,0.1)" }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 10 }}>
        <span style={{ fontFamily: T.font, fontSize: 13, fontWeight: 700 }}>{label} <span style={{ color: T.textTer, fontWeight: 400 }}>/ {total}</span></span>
        <span style={{ fontFamily: T.font, fontSize: 13, color: T.textTer }}>{right}</span>
      </div>
      <div style={{ background: "#E0E0DE", height: 4, borderRadius: 6, overflow: "hidden", marginBottom: buttonLabel ? 14 : 0 }}>
        <div style={{ width: `${pct}%`, height: "100%", background: "#88CF25", borderRadius: 6 }}/>
      </div>
      {buttonLabel && <button style={{ width: "100%", height: 34, borderRadius: 17, background: T.orange, border: "none", fontFamily: T.font, fontSize: 15, fontWeight: 700, color: "#fff", cursor: "default", marginTop: 4 }}>{buttonLabel}</button>}
    </div>
  );
}

// --- Leaderboard -------------------------------------------------------------
function Leaderboard() {
  const names = ["Sarah Johnson","Marcus Chen","Amara Diallo","Tom Williams","Yuki Tanaka","Elena Rossi"];
  return (
    <div style={{ background: T.bgSurface, marginTop: 8 }}>
      <div style={{ display: "flex", borderBottom: `0.5px solid ${T.divider}` }}>
        {["Overall","Following"].map((t, i) => (
          <div key={t} style={{ flex: 1, textAlign: "center", padding: "14px 0", borderBottom: i === 0 ? `2px solid ${T.orange}` : "none" }}>
            <span style={{ fontFamily: T.font, fontSize: 16, fontWeight: 500, color: i === 0 ? T.textPri : T.textTer }}>{t}</span>
          </div>
        ))}
      </div>
      {names.map((name, i) => (
        <div key={name} style={{ display: "flex", alignItems: "center", padding: "12px 24px", borderBottom: `0.5px solid ${T.divider}`, gap: 8 }}>
          <span style={{ fontFamily: T.font, fontSize: 12, color: T.textSec, width: 20 }}>{i + 1}</span>
          <div style={{ width: 32, height: 32, borderRadius: "50%", background: `hsl(${i*55},40%,62%)`, flexShrink: 0 }}/>
          <span style={{ fontFamily: T.font, fontSize: 13, flex: 1 }}>{name}</span>
          <span style={{ fontFamily: T.font, fontSize: 13, color: T.textSec, width: 52, textAlign: "right" }}>4:4{i} /mi</span>
          <span style={{ fontFamily: T.font, fontSize: 13, color: T.textSec, width: 52, textAlign: "right" }}>{(13+i*1.2).toFixed(1)} km</span>
        </div>
      ))}
    </div>
  );
}

// --- Description section -----------------------------------------------------
function DescriptionSection({ title, description }) {
  if (!description) return null;
  return (
    <div style={{ background: T.bgSurface, marginTop: 8, padding: 24 }}>
      <div style={{ fontFamily: T.font, fontSize: 17, fontWeight: 700, marginBottom: 8 }}>{title || "About this Challenge"}</div>
      <div style={{ fontFamily: T.font, fontSize: 15, color: T.textSec, lineHeight: "22px", whiteSpace: "pre-wrap" }}>{description}</div>
    </div>
  );
}

// --- Register onto shared namespace ------------------------------------------
Object.assign(window.MT, {
  Field, Input, useFileUpload, UploadBox,
  TopNav, PhoneShell, BottomNav,
  Facepile, HeroBadge, InfoRow, OrangeBtn, SponsorCard, InfoRows,
  StatsGrid, FeaturedAthletes, ProgressCard, Leaderboard, DescriptionSection,
});
