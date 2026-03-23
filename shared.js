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
        IcoDate, IcoActivityType, IcoReward, IcoBackArrow,
        IcoViewfinder, IcoSearch, IcoMessaging, IcoNotifications,
        IcoBattery, IcoWifi, IcoCellular } = window.MT;

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
// TopNavHome — renders the exact top nav SVG provided, with status bar above
function TopNavHome() {
  return (
    <div style={{ background: T.bgSurface, display: "flex", flexDirection: "column", boxShadow: "0px 2px 4px rgba(0,0,0,0.1)", flexShrink: 0 }}>
      {/* iOS Status Bar */}
      <div style={{ height: 54, position: "relative", width: "100%" }}>
        <div style={{ position: "absolute", left: 33, top: 18, fontFamily: "'SF Pro Text', 'Helvetica Neue', Helvetica, Arial, sans-serif", fontSize: 17, fontWeight: 600, letterSpacing: -0.408, lineHeight: "22px", color: T.textPri }}>9:41</div>
        <div style={{ position: "absolute", right: 16, top: 20, display: "flex", alignItems: "center", gap: 7 }}>
          <IcoCellular/><IcoWifi/><IcoBattery/>
        </div>
      </div>
      {/* Title and Controls row — pixel-perfect SVG from Figma */}
      <svg width="375" height="48" viewBox="0 0 375 48" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ display: "block", flexShrink: 0 }}>
        <g clipPath="url(#tnClip0)">
          <path d="M37 17V23H43V25H37V31H35V25H29V23H35V17H37Z" fill="black"/>
          <path d="M24 24C24 17.3726 29.3726 12 36 12C42.6274 12 48 17.3726 48 24C48 30.6274 42.6274 36 36 36C29.3726 36 24 30.6274 24 24ZM36 14C30.4772 14 26 18.4772 26 24C26 29.5228 30.4772 34 36 34C41.5228 34 46 29.5228 46 24C46 18.4772 41.5228 14 36 14Z" fill="black"/>
        </g>
        <path d="M73.4571 12C78.1515 12 81.9571 15.8056 81.9571 20.5C81.9571 21.9692 81.5844 23.3513 80.9283 24.557L87.5607 31.1893C88.1464 31.7751 88.1464 32.7249 87.5607 33.3107L86.2678 34.6036C85.682 35.1893 84.7322 35.1893 84.1464 34.6036L77.5141 27.9712C76.3084 28.6273 74.9263 29 73.4571 29C68.7627 29 64.9571 25.1944 64.9571 20.5C64.9571 15.8056 68.7627 12 73.4571 12ZM79.9571 20.5C79.9571 16.9101 77.047 14 73.4571 14C69.8673 14 66.9571 16.9101 66.9571 20.5C66.9571 24.0899 69.8673 27 73.4571 27C77.047 27 79.9571 24.0899 79.9571 20.5ZM79.1675 26.7962L85.2071 32.8358L85.7929 32.25L79.7533 26.2104C79.5676 26.415 79.3721 26.6105 79.1675 26.7962Z" fill="black"/>
        <path d="M167.013 29V17.015H169.478V21.69H174.68V17.015H177.145V29H174.68V23.866H169.478V29H167.013ZM183.101 29.255C180.466 29.255 178.834 27.351 178.834 24.614C178.834 21.877 180.466 19.99 183.101 19.99C185.719 19.99 187.368 21.877 187.368 24.614C187.368 27.351 185.719 29.255 183.101 29.255ZM183.101 27.3C184.223 27.3 184.954 26.331 184.954 24.614C184.954 22.897 184.223 21.945 183.101 21.945C181.962 21.945 181.231 22.897 181.231 24.614C181.231 26.331 181.962 27.3 183.101 27.3ZM188.922 29V20.245H191.166V21.248H191.234C191.676 20.449 192.509 19.99 193.495 19.99C194.566 19.99 195.382 20.466 195.824 21.35H195.892C196.385 20.483 197.286 19.99 198.306 19.99C200.091 19.99 201.077 21.129 201.06 23.186V29H198.714V23.305C198.714 22.387 198.323 21.945 197.575 21.945C196.98 21.945 196.453 22.336 196.164 22.982V29H193.818V23.305C193.818 22.387 193.427 21.945 192.679 21.945C192.084 21.945 191.557 22.319 191.268 22.965V29H188.922ZM206.79 29.255C204.172 29.255 202.608 27.487 202.608 24.597C202.608 21.809 204.274 19.99 206.671 19.99C209.102 19.99 210.734 21.707 210.734 24.24C210.734 24.631 210.7 24.988 210.649 25.277H205.022C205.039 26.739 205.719 27.453 206.79 27.453C207.538 27.453 207.997 27.079 208.235 26.382L210.513 26.96C210.071 28.371 208.711 29.255 206.79 29.255ZM205.022 23.815H208.371C208.337 22.523 207.793 21.707 206.722 21.707C205.685 21.707 205.039 22.37 205.022 23.815Z" fill="black"/>
        <g clipPath="url(#tnClip1)">
          <path d="M304 19.0571V16.0571C304 14.4003 302.657 13.0571 301 13.0571H290C288.343 13.0571 287 14.4003 287 16.0571V23.0571C287 24.3633 287.835 25.4746 289 25.8864V28.2465C289 29.8056 290.885 30.5863 291.987 29.4839L294 27.4713V29.0571C294 30.714 295.343 32.0571 297 32.0571H302.586L306.013 35.4839C307.115 36.5863 309 35.8056 309 34.2465V31.8864C310.165 31.4746 311 30.3633 311 29.0571V22.0571C311 20.4003 309.657 19.0571 308 19.0571H304ZM290 15.0571H301C301.552 15.0571 302 15.5048 302 16.0571V19.0571H297C295.343 19.0571 294 20.4003 294 22.0571V24.6429L291 27.6429V24.0571H290C289.448 24.0571 289 23.6094 289 23.0571V16.0571C289 15.5048 289.448 15.0571 290 15.0571ZM309 22.0571V29.0571C309 29.6094 308.552 30.0571 308 30.0571H307V33.6429L303.414 30.0571H297C296.448 30.0571 296 29.6094 296 29.0571V22.0571C296 21.5048 296.448 21.0571 297 21.0571H308C308.552 21.0571 309 21.5048 309 22.0571Z" fill="black"/>
        </g>
        <path d="M339 12C334.582 12 331 15.5817 331 20V23.5858L328.586 26C328.211 26.3751 328 26.8838 328 27.4142V28C328 29.1046 328.895 30 330 30H334C334 32.7614 336.239 35 339 35C341.761 35 344 32.7614 344 30H348C349.105 30 350 29.1046 350 28V27.4142C350 26.8838 349.789 26.3751 349.414 26L347 23.5858V20C347 15.5817 343.418 12 339 12ZM333 20C333 16.6863 335.686 14 339 14C342.314 14 345 16.6863 345 20V24.4142L348 27.4142V28H330V27.4142L333 24.4142V20ZM342 30C342 31.6569 340.657 33 339 33C337.343 33 336 31.6569 336 30H342Z" fill="black"/>
        <defs>
          <clipPath id="tnClip0"><rect width="24" height="24" fill="white" transform="translate(24 12)"/></clipPath>
          <clipPath id="tnClip1"><rect width="24" height="24" fill="white" transform="translate(287 12)"/></clipPath>
        </defs>
      </svg>
    </div>
  );
}
function PhoneShell({ children, screenRef, bgColor }) {
  const frameColor = bgColor === "#FC5200" ? "#000000" : T.orange;
  return (
    <div ref={screenRef} style={{ display: "inline-block" }}>
      <div style={{ position: "relative", width: 391, borderRadius: 44, background: frameColor, padding: 8, flexShrink: 0, overflow: "hidden" }}>
        <div style={{ borderRadius: 36, overflow: "hidden", background: T.bgSunken, position: "relative", width: 375, height: 812 }}>
          <div style={{ maxHeight: 812, overflowY: "auto", display: "flex", flexDirection: "column", scrollbarWidth: "none", msOverflowStyle: "none" }}>
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
  TopNav, TopNavHome, PhoneShell, BottomNav,
  Facepile, HeroBadge, InfoRow, OrangeBtn, SponsorCard, InfoRows,
  StatsGrid, FeaturedAthletes, ProgressCard, Leaderboard, DescriptionSection,
});
