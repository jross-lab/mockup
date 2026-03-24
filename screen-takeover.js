/**
 * screen-takeover.js
 * Challenge Detail — Takeover screen.
 */
const { T } = window.MT;

function ScreenTakeover({ data }) {
  const { badgeImg, heroImg, brandName, title, goal, startDate, endDate } = data;
  return (
    <div style={{ display: "flex", flexDirection: "column", background: T.bgSunken, flex: 1, position: "relative" }}>

      {/* ── Background: Groups Tab / Challenges content ── */}
      <div style={{ display: "flex", flexDirection: "column" }}>
        {/* Tabs: Active | Challenges | Clubs */}
        <div style={{ background: T.bgSurface, display: "flex", padding: "0 24px" }}>
          <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 1, background: "#E0E0DE" }}/>
          {[
            { label: "Active", active: false },
            { label: "Challenges", active: true },
            { label: "Clubs", active: false },
          ].map(({ label, active }) => (
            <div key={label} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: 56, padding: "16px 0", borderBottom: active ? `2px solid ${T.orange}` : "none" }}>
              <span style={{ fontFamily: "'Maison Neue', 'Helvetica Neue', Helvetica, Arial, sans-serif", fontSize: 16, fontWeight: 500, lineHeight: "21px", color: active ? T.textPri : T.textTer, textAlign: "center" }}>{label}</span>
            </div>
          ))}
        </div>

        {/* Chip bar */}
        <div style={{ background: T.bgSurface, display: "flex", gap: 8, padding: "16px 24px", overflowX: "auto", boxShadow: "0px 2px 6px rgba(0,0,0,0.11)" }}>
          {[
            { label: "Label", selected: true },
            { label: "Label", selected: false },
            { label: "Label", selected: false },
            { label: "Label", selected: false },
          ].map((chip, i) => (
            <div key={i} style={{ height: 32, borderRadius: 8, border: `1px solid ${chip.selected ? T.orange : "#C2C1BB"}`, padding: "0 12px", display: "flex", alignItems: "center", gap: 8, background: "#fff", flexShrink: 0 }}>
              <svg width="16" height="15" viewBox="0 0 16 15" fill="none"><path d="M8 0C3.58 0 0 3.36 0 7.5S3.58 15 8 15s8-3.36 8-7.5S12.42 0 8 0zm0 13.5c-3.31 0-6-2.69-6-6s2.69-6 6-6 6 2.69 6 6-2.69 6-6 6z" fill={chip.selected ? T.orange : "black"}/></svg>
              <span style={{ fontFamily: T.font, fontSize: 12, lineHeight: "16px", color: chip.selected ? T.orange : T.textPri, whiteSpace: "nowrap" }}>{chip.label}</span>
            </div>
          ))}
        </div>

        {/* Row: Past Group Challenges */}
        <div style={{ background: T.bgSurface, minHeight: 64, padding: "12px 24px", display: "flex", alignItems: "center", gap: 12 }}>
          <svg width="24" height="19" viewBox="0 0 24 19" fill="none"><path d="M12 0C7.03 0 3 3.8 3 8.5v3.09l-2.41 2.41A2 2 0 000 15.41V16a2 2 0 002 2h4c0 .55.45 1 1 1h10c.55 0 1-.45 1-1h4a2 2 0 002-2v-.59a2 2 0 00-.59-1.41L21 11.59V8.5C21 3.8 16.97 0 12 0z" fill="#43423F"/></svg>
          <div style={{ flex: 1 }}>
            <div style={{ fontFamily: T.font, fontSize: 15, lineHeight: "20px", color: T.textPri }}>Past Group Challenges</div>
            <div style={{ fontFamily: T.font, fontSize: 13, lineHeight: "18px", color: T.textSec }}>3</div>
          </div>
          <svg width="7" height="13" viewBox="0 0 7 13" fill="none"><path d="M1 1l5 5.5L1 12" stroke="#43423F" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </div>

        {/* Promoted Challenge card */}
        <div style={{ background: T.bgSurface }}>
          <div style={{ width: "100%", height: 186, background: heroImg ? "transparent" : "linear-gradient(135deg, #c8c8c8, #a0a0a0)", overflow: "hidden" }}>
            {heroImg && <img src={heroImg} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }}/>}
          </div>
          <div style={{ padding: "24px", display: "flex", flexDirection: "column", gap: 20 }}>
            <div style={{ display: "flex", gap: 20, alignItems: "center" }}>
              <div style={{ width: 64, height: 63, borderRadius: 2, background: "#E8E8E8", flexShrink: 0, overflow: "hidden" }}>
                {badgeImg && <img src={badgeImg} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }}/>}
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                <div>
                  <div style={{ fontFamily: T.font, fontSize: 17, fontWeight: 700, lineHeight: "22px", color: T.textPri, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", maxWidth: 243 }}>{title || "Get Sponsored by Maap"}</div>
                </div>
                <div style={{ fontFamily: T.font, fontSize: 13, color: T.textSec, lineHeight: "18px" }}>{goal || "17 km / 80 km"}</div>
                <div style={{ fontFamily: T.font, fontSize: 13, color: T.textSec, lineHeight: "18px" }}>{startDate && endDate ? `${startDate} to ${endDate}` : "March 1 to March 31, 2024"}</div>
              </div>
            </div>
            <button style={{ width: "100%", height: 48, borderRadius: 24, background: T.orange, border: "none", fontFamily: T.font, fontSize: 17, fontWeight: 700, color: "#fff", cursor: "default" }}>Join</button>
          </div>
        </div>

        {/* Active Challenges section */}
        <div style={{ background: T.bgSurface, paddingBottom: 16 }}>
          <div style={{ height: 60, display: "flex", alignItems: "center", padding: "0 24px" }}>
            <span style={{ fontFamily: T.font, fontSize: 17, fontWeight: 700, lineHeight: "22px", color: T.textPri }}>Active Challenges</span>
          </div>
          <div style={{ display: "flex", gap: 8, justifyContent: "center", padding: "10px 24px" }}>
            {["Equinox Sun Up Challenge", "Lululemon 10k Tour", "Strava April 10k Challenge", "ASOS S11 Challenge"].map((name, i) => (
              <div key={i} style={{ display: "flex", flexDirection: "column", gap: 12, alignItems: "center", width: 81 }}>
                {/* Progress circle */}
                <div style={{ width: 60, height: 60, position: "relative" }}>
                  <svg width="60" height="60" viewBox="0 0 60 60">
                    <circle cx="30" cy="30" r="25" fill="none" stroke="#E0E0DE" strokeWidth="4"/>
                    <circle cx="30" cy="30" r="25" fill="none" stroke={T.orange} strokeWidth="4" strokeDasharray={`${(0.3 + i * 0.2) * 157} 157`} strokeLinecap="round" transform="rotate(-90 30 30)"/>
                  </svg>
                  <div style={{ position: "absolute", inset: "14%", borderRadius: 2, background: "#E8E8E8", overflow: "hidden" }}>
                    {badgeImg && <img src={badgeImg} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }}/>}
                  </div>
                </div>
                <div style={{ fontFamily: T.font, fontSize: 10, color: T.textSec, lineHeight: "12px", textAlign: "center", width: 81 }}>{name}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Scrim overlay — covers entire viewport including top nav ── */}
      <div style={{ position: "absolute", left: 0, right: 0, top: -102, bottom: -70, background: "rgba(0,0,0,0.6)", zIndex: 20 }}/>

      {/* ── Modal: Challenge Completion Redemption (Figma 2119:23001) ── */}
      {/* Figma: top 221px from viewport, minus 102px TopNavHome = 119px from content top */}
      <div style={{ position: "absolute", left: 16, right: 16, top: 119, zIndex: 30, background: T.bgSurface, borderRadius: 16, overflow: "hidden", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "flex-end", paddingTop: 32, gap: 20 }}>

        {/* Close button (X) — absolute top-right */}
        <div style={{ position: "absolute", top: 8, right: 8, width: 32, height: 32, borderRadius: 48, display: "flex", alignItems: "center", justifyContent: "center", cursor: "default", zIndex: 3 }}>
          <svg width="11.768" height="11.768" viewBox="0 0 11.7684 11.7683" fill="none">
            <path d="M0 0.883883L0.883883 0L5.88422 5.00033L10.8846 0L11.7684 0.883883L6.7681 5.88421L11.7683 10.8844L10.8844 11.7683L5.88422 6.7681L0.88406 11.7683L0.000176586 10.8844L5.00034 5.88421L0 0.883883Z" fill="black"/>
          </svg>
        </div>

        {/* Challenge badge — 150×150 */}
        <div style={{ width: 150, height: 150, flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden", zIndex: 4 }}>
          {badgeImg
            ? <img src={badgeImg} alt="" style={{ width: 150, height: 150, objectFit: "contain" }}/>
            : <div style={{ width: 150, height: 150, background: "#E8E8E8", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <span style={{ fontFamily: T.font, fontSize: 11, color: "#999", textAlign: "center" }}>Badge</span>
              </div>}
        </div>

        {/* Modal Content — gap-12, pt-8, pb-8, px-24 */}
        <div style={{ display: "flex", flexDirection: "column", gap: 12, alignItems: "center", overflow: "hidden", paddingBottom: 8, paddingTop: 8, paddingLeft: 24, paddingRight: 24, width: "100%", flexShrink: 0, zIndex: 2 }}>
          <div style={{ width: "100%" }}>
            <p style={{ fontFamily: T.font, fontSize: 17, fontWeight: 400, color: T.textSec, lineHeight: "22px" }}>
              Congratulations! You completed {title || "Jess's Biggest Challenge Yet so big it's on two lines"}
            </p>
          </div>
        </div>

        {/* Button footer — pb-24, px-24 */}
        <div style={{ background: T.bgSurface, overflow: "hidden", paddingBottom: 24, paddingLeft: 24, paddingRight: 24, width: "100%", flexShrink: 0, zIndex: 1 }}>
          <div style={{ display: "flex", gap: 8, width: "100%" }}>
            <button style={{ flex: 1, height: 50, borderRadius: 25, background: "transparent", border: `1.5px solid ${T.divider}`, fontFamily: T.font, fontSize: 17, fontWeight: 700, color: T.orange, cursor: "default" }}>Dismiss</button>
            <button style={{ flex: 1, height: 50, borderRadius: 25, background: T.orange, border: "none", fontFamily: T.font, fontSize: 17, fontWeight: 700, color: "#fff", cursor: "default" }}>Redeem</button>
          </div>
        </div>
      </div>
    </div>
  );
}

// --- Screen: Milestone (Feed Card) -------------------------------------------

Object.assign(window.MT, { ScreenTakeover });
