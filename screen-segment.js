/**
 * screen-segment.js
 * Home Feed — Segment Challenge screen.
 *
 * The discovery section is the hero. Module 1 (brand feed entry) is
 * rendered but shifted off-screen via negative margin-top so only
 * its tail (social summary + action strip ~110px) is visible.
 * Module 3 (The Strava Club) just peeks in at the bottom.
 */
const { T, Facepile, MILESTONE_MAP_IMG } = window.MT;

// --- Reusable sub-components ------------------------------------------------

function SegSocialSummary() {
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "16px 24px", minHeight: 56 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <Facepile/>
        <span style={{ fontFamily: T.font, fontSize: 11, color: T.textSec, lineHeight: "13px" }}>12 gave kudos</span>
      </div>
      <span style={{ fontFamily: T.font, fontSize: 11, color: T.textSec, lineHeight: "13px", textAlign: "right" }}>1 comment</span>
    </div>
  );
}

function SegSocialActions() {
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
      {[
        { label: "Kudo", icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M8.568 0.5819C8.7312 0.2272 9.0859 0 9.4764 0H9.9817C12.3657 0 14.2205 2.0723 13.9572 4.4417L13.4508 9H18.8713C20.7834 9 22.3335 10.5501 22.3335 12.4622C22.3335 13.3463 21.9953 14.1968 21.3883 14.8395L21.3335 14.8976V16.6716C21.3335 17.4672 21.0174 18.2303 20.4548 18.7929L20.3335 18.9142V20C20.3335 21.6569 18.9904 23 17.3335 23H8.6363C8.2414 23 7.8554 22.8831 7.5269 22.6641L5.0307 21H2.3335C1.2289 21 0.3335 20.1046 0.3335 19V13.5C0.3335 12.8705 0.6299 12.2777 1.1335 11.9L4.531 9.3519L8.568 0.5819ZM10.1149 2.0043L6.2419 10.4181C6.1724 10.5691 6.0664 10.7003 5.9335 10.8L2.3335 13.5V19H5.0307C5.4256 19 5.8116 19.1169 6.1401 19.3359L8.6363 21H17.3335C17.8858 21 18.3335 20.5523 18.3335 20V18.0858L19.0406 17.3787C19.2281 17.1911 19.3335 16.9368 19.3335 16.6716V14.1024L19.9343 13.4663C20.1907 13.1948 20.3335 12.8356 20.3335 12.4622C20.3335 11.6547 19.6788 11 18.8713 11H11.2162L11.9695 4.2209C12.0962 3.0806 11.2419 2.0781 10.1149 2.0043Z" fill="black"/></svg> },
        { label: "Comment", icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M5 5H19V7H5V5Z" fill="black"/><path d="M5 9V11H16V9H5Z" fill="black"/><path d="M0 3C0 1.3431 1.343 0 3 0H21C22.657 0 24 1.3431 24 3V13C24 14.6569 22.657 16 21 16H11.414L6.914 20.5C6.594 20.8201 6.16 21 5.707 21C4.764 21 4 20.2357 4 19.2929V16H3C1.343 16 0 14.6569 0 13V3ZM3 2C2.448 2 2 2.4477 2 3V13C2 13.5523 2.448 14 3 14H6V18.5858L10 14.5858C10.375 14.2107 10.884 14 11.414 14H21C21.552 14 22 13.5523 22 13V3C22 2.4477 21.552 2 21 2H3Z" fill="black"/></svg> },
        { label: "Share", icon: <svg width="22" height="24" viewBox="0 0 22 24" fill="none"><path d="M10.293 0.2929L5.793 4.7929L7.207 6.2071L10 3.4142V16.0002H12V3.4142L14.793 6.2071L16.207 4.7929L11.707 0.2929C11.317 -0.0976 10.683 -0.0976 10.293 0.2929Z" fill="black"/><path d="M4 8.0002C2.343 8.0002 1 9.3433 1 11.0002V20.0002C1 21.657 2.343 23.0002 4 23.0002H18C19.657 23.0002 21 21.657 21 20.0002V11.0002C21 9.3433 19.657 8.0002 18 8.0002H15V10.0002H18C18.552 10.0002 19 10.4479 19 11.0002V20.0002C19 20.5525 18.552 21.0002 18 21.0002H4C3.448 21.0002 3 20.5525 3 20.0002V11.0002C3 10.4479 3.448 10.0002 4 10.0002H7V8.0002H4Z" fill="black"/></svg> },
      ].map(({ label, icon }) => (
        <div key={label} style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", padding: "12px 0" }}>{icon}</div>
      ))}
    </div>
  );
}

function ThreeDots() {
  return (
    <div style={{ position: "absolute", right: 24, top: 24, width: 16, height: 16, display: "flex", alignItems: "center", justifyContent: "center" }}>
      <svg width="16" height="5" viewBox="0 0 16 5" fill="none"><circle cx="2" cy="2.5" r="1.5" fill="#000"/><circle cx="8" cy="2.5" r="1.5" fill="#000"/><circle cx="14" cy="2.5" r="1.5" fill="#000"/></svg>
    </div>
  );
}

function VerifiedBadge() {
  return (
    <div style={{ position: "absolute", top: -3, right: -3, width: 14, height: 14 }}>
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><circle cx="7" cy="7" r="7" fill="#FC5200"/><path d="M4 7L6 9L10 5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
    </div>
  );
}

function SegmentMapPlaceholder() {
  return (
    <svg width="329" height="170" viewBox="0 0 329 170" style={{ display: "block", width: "100%", height: "100%", borderRadius: "12px 12px 0 0" }}>
      <rect width="329" height="170" fill="#E8E6D8"/>
      <path d="M80 20 Q120 10 160 25 Q200 40 220 20 Q240 0 260 15 L260 140 Q220 130 180 145 Q140 160 100 140 Q60 120 80 20Z" fill="#C5D9A4" opacity="0.7"/>
      <path d="M20 80 Q60 60 100 85 Q130 100 120 140 L20 140Z" fill="#C5D9A4" opacity="0.5"/>
      <path d="M200 60 Q240 50 280 70 Q310 90 300 130 L220 140 Q210 100 200 60Z" fill="#B8CEA0" opacity="0.6"/>
      <line x1="0" y1="100" x2="329" y2="100" stroke="#FFFFFF" strokeWidth="3" opacity="0.6"/>
      <line x1="165" y1="0" x2="165" y2="170" stroke="#FFFFFF" strokeWidth="2" opacity="0.5"/>
      <line x1="40" y1="0" x2="120" y2="170" stroke="#FFFFFF" strokeWidth="2" opacity="0.4"/>
      <line x1="250" y1="0" x2="290" y2="170" stroke="#FFFFFF" strokeWidth="2" opacity="0.4"/>
      <ellipse cx="240" cy="45" rx="40" ry="20" fill="#A8C8E0" opacity="0.5"/>
      <path d="M110 55 Q125 40 150 45 Q175 50 185 70 Q195 90 210 95 Q225 100 235 115 Q245 130 225 135 Q205 140 185 130 Q165 120 150 110 Q135 100 120 90 Q105 80 110 55Z"
        fill="none" stroke="#FC5200" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round"/>
      <circle cx="110" cy="55" r="5" fill="#FC5200" stroke="white" strokeWidth="2"/>
      <circle cx="110" cy="55" r="2" fill="white"/>
      <polygon points="195,93 205,88 200,98" fill="#FC5200"/>
    </svg>
  );
}

function IcoRun16() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M8.68843 0C8.02519 0 7.37985 0.215115 6.84926 0.613058L3.52982 3.10263L0.683772 4.05132C0.27543 4.18743 0 4.56957 0 5C0 6.57896 0.196721 7.77215 0.566654 8.73398C0.942709 9.71172 1.4741 10.3883 2.04289 10.9571C2.34815 11.2624 2.64313 11.524 2.92865 11.7772C3.71439 12.4741 4.42845 13.1075 5.08755 14.4114C6.12048 16.9818 7.45819 19.1594 9.53364 20.6814C11.6286 22.2177 14.3564 23 18 23C20.1284 23 21.5871 22.4466 22.5488 21.589C23.5046 20.7365 23.8434 19.6954 23.9567 18.9614C24.1091 17.974 23.5681 17.1739 22.9903 16.7116L19.0976 13.5974C18.9434 13.4741 18.8292 13.3079 18.7693 13.1198L15.6746 3.39359C15.4106 2.56364 14.6397 2 13.7688 2H12.3333C11.9006 2 11.4795 2.14036 11.1333 2.4L10.5624 2.82823L10.0471 1.02486C9.8738 0.418234 9.31933 0 8.68843 0Z" fill="#43423F"/></svg>
  );
}


// --- Main Screen Component --------------------------------------------------

function ScreenSegment({ data }) {
  const { badgeImg, title, brandName, goal, description, startDate, endDate } = data;
  const dateRange = startDate && endDate ? `${startDate} to ${endDate}` : "January 2 to January 31st, 2025";
  const challengeName = title || "Segment challenge name";
  const challengeGoal = goal || "Complete a 5 km (3.1 mi) run.";
  const challengeDesc = description || "Run the XXX segment for XX% off in the Adidas range.";
  const brand = brandName || "Maev";

  /*
   * Layout strategy: use negative margin-top on the outer wrapper to
   * simulate a "scrolled" feed. The PhoneShell clips overflow, so the
   * top portion of Module 1 disappears above the viewport.
   *
   * Module 1 total height ≈ 500px. We shift up by ~400px so only
   * the social summary + action strip (~100px) remain visible.
   */
  const SCROLL_OFFSET = -400;

  return (
    <div style={{ display: "flex", flexDirection: "column", background: T.bgSunken, marginTop: SCROLL_OFFSET }}>

      {/* ═══════════ MODULE 1: Brand feed entry with embedded segment card ═══════════ */}
      <div style={{ background: T.bgSurface, display: "flex", flexDirection: "column" }}>
        {/* Feed Owner Header */}
        <div style={{ padding: 24, display: "flex", gap: 12, alignItems: "center", position: "relative" }}>
          <div style={{ position: "relative", flexShrink: 0, width: 40, height: 42, overflow: "visible" }}>
            {badgeImg
              ? <img src={badgeImg} alt="" style={{ width: 40, height: 42, objectFit: "contain", display: "block" }}/>
              : <div style={{ width: 40, height: 42, borderRadius: 4, background: "#E8E8E8" }}/>}
            <VerifiedBadge/>
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontFamily: "'Maison Neue', " + T.font, fontSize: 13, fontWeight: 600, lineHeight: "18px", color: T.textPri }}>{brand}</div>
            <div style={{ height: 4 }}/>
            <div style={{ fontFamily: "'Maison Neue', " + T.font, fontSize: 11, color: T.textSec, lineHeight: "13px" }}>Today at 9:31 AM</div>
          </div>
          <ThreeDots/>
        </div>

        {/* Text block */}
        <div style={{ padding: "0 24px", display: "flex", flexDirection: "column", gap: 8 }}>
          <div style={{ fontFamily: "'Maison Neue', " + T.font, fontSize: 20, fontWeight: 600, lineHeight: "24px", color: T.textPri }}>
            Get running with {brand}'s new Presidio Drive Segment Challenge!
          </div>
          <div style={{ fontFamily: T.font, fontSize: 15, lineHeight: "20px", color: T.textSec }}>{challengeDesc}</div>
          <div style={{ fontFamily: "'Maison Neue', " + T.font, fontSize: 12, lineHeight: "16px", color: T.textTer }}>Read more...</div>
        </div>
        <div style={{ height: 24 }}/>

        {/* Embedded event card */}
        <div style={{ padding: "0 24px", position: "relative" }}>
          <div style={{ background: "#fff", borderRadius: 16, padding: 16, boxShadow: "0 0.5px 4px rgba(0,0,0,0.1), 0 6px 12px rgba(0,0,0,0.1)", display: "flex", gap: 16, alignItems: "center" }}>
            <div style={{ width: 56, height: 64, flexShrink: 0, overflow: "hidden" }}>
              {badgeImg
                ? <img src={badgeImg} alt="" style={{ width: 56, height: 64, objectFit: "contain" }}/>
                : <div style={{ width: 56, height: 64, background: "#E8E8E8", borderRadius: 4 }}/>}
            </div>
            <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 8 }}>
              <div style={{ fontFamily: "'Maison Neue', " + T.font, fontSize: 17, fontWeight: 600, lineHeight: "22px", color: T.textPri, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                {brand} Presidio Drive Ch...
              </div>
              <div style={{ display: "flex", gap: 4, alignItems: "center" }}>
                <div style={{ width: 16, height: 16, flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center" }}><IcoRun16/></div>
                <span style={{ fontFamily: "'Maison Neue', " + T.font, fontSize: 12, color: T.textSec, lineHeight: "16px" }}>{challengeGoal}</span>
              </div>
              <div style={{ fontFamily: "'Maison Neue', " + T.font, fontSize: 12, color: T.textSec, lineHeight: "16px" }}>{dateRange}</div>
            </div>
          </div>
        </div>

        {/* Social summary */}
        <SegSocialSummary/>
        {/* Social actions */}
        <SegSocialActions/>
        <div style={{ height: 12 }}/>
      </div>

      {/* ═══════════ MODULE 2: Segment Challenge Discovery Section ═══════════ */}
      <div style={{ background: T.bgSunken, padding: 24, display: "flex", flexDirection: "column", alignItems: "center" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 24, alignItems: "center", width: "100%" }}>
          {/* Section header */}
          <div style={{ width: "100%", display: "flex", flexDirection: "column", gap: 8 }}>
            <div style={{ fontFamily: T.font, fontSize: 20, fontWeight: 700, lineHeight: "24px", color: T.textPri }}>A Segment Challenge near you.</div>
            <div style={{ fontFamily: T.font, fontSize: 15, lineHeight: "20px", color: T.textSec }}>{challengeDesc}</div>
          </div>

          {/* Segment challenge card */}
          <div style={{ background: "#fff", borderRadius: 16, boxShadow: "0 2px 6px rgba(0,0,0,0.11)", overflow: "hidden", width: 329, display: "flex", flexDirection: "column", alignItems: "center" }}>
            <div style={{ width: 329, height: 170, overflow: "hidden", borderRadius: "12px 12px 0 0" }}>
              <SegmentMapPlaceholder/>
            </div>
            <div style={{ display: "flex", gap: 12, alignItems: "center", padding: "18px 16px 0", width: "100%", boxSizing: "border-box" }}>
              <div style={{ width: 50, height: 50, flexShrink: 0, overflow: "hidden" }}>
                {badgeImg
                  ? <img src={badgeImg} alt="" style={{ width: 50, height: 50, objectFit: "contain" }}/>
                  : <div style={{ width: 50, height: 50, borderRadius: "50%", background: "#E8E8E8" }}/>}
              </div>
              <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 2 }}>
                <div style={{ fontFamily: T.font, fontSize: 16, fontWeight: 700, lineHeight: "18px", color: T.textPri }}>{challengeName}</div>
                <div style={{ fontFamily: T.font, fontSize: 15, lineHeight: "20px", color: T.textSec }}>{dateRange}</div>
              </div>
            </div>
            <div style={{ padding: "18px 16px 20px", width: "100%", boxSizing: "border-box" }}>
              <button style={{ width: "100%", height: 40, borderRadius: 20, background: T.orange, border: "none", fontFamily: T.font, fontSize: 15, fontWeight: 700, color: "#fff", cursor: "default" }}>Join Challenge</button>
            </div>
          </div>
        </div>
      </div>

      {/* ═══════════ MODULE 3: The Strava Club feed entry ═══════════ */}
      <div style={{ background: T.bgSurface, display: "flex", flexDirection: "column" }}>
        <div style={{ padding: 24, display: "flex", gap: 12, alignItems: "center", position: "relative" }}>
          <div style={{ position: "relative", flexShrink: 0, width: 40, height: 40, borderRadius: 2.5, overflow: "hidden", boxShadow: "0 1.25px 2.5px rgba(0,0,0,0.1)" }}>
            <img src="data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' fill='none' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Cpath d='M0 2.5C0 1.11929 1.11929 0 2.5 0H37.5C38.8807 0 40 1.11929 40 2.5V37.5C40 38.8807 38.8807 40 37.5 40H2.5C1.11929 40 0 38.8807 0 37.5V2.5Z' fill='url(%23pattern0_2296_260)'/%3E%3Cdefs%3E%3Cpattern id='pattern0_2296_260' patternContentUnits='objectBoundingBox' width='1' height='1'%3E%3Cuse xlink:href='%23image0_2296_260' transform='scale(0.00806452)'/%3E%3C/pattern%3E%3Cimage id='image0_2296_260' width='124' height='124' preserveAspectRatio='none' xlink:href='data:image/png;base64,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'/%3E%3C/defs%3E%3C/svg%3E" alt="" style={{ width: 40, height: 40, display: "block", borderRadius: 2.5 }}/>
            <div style={{ position: "absolute", top: -3, right: -3, width: 14, height: 14 }}>
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><circle cx="7" cy="7" r="7" fill="#FC5200"/><path d="M4 7L6 9L10 5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </div>
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontFamily: T.font, fontSize: 13, fontWeight: 700, lineHeight: "18px", color: T.textPri }}>The Strava Club</div>
            <div style={{ height: 4 }}/>
            <div style={{ fontFamily: T.font, fontSize: 11, color: T.textSec, lineHeight: "13px" }}>Today at 9:31 AM</div>
          </div>
          <ThreeDots/>
        </div>

        {/* Rest of Module 3 — text, photo, social — extends below viewport */}
        <div style={{ padding: "0 24px", display: "flex", flexDirection: "column", gap: 8 }}>
          <div style={{ fontFamily: T.font, fontSize: 20, fontWeight: 700, lineHeight: "24px", color: T.textPri }}>Probably the most beautiful ride I've ever been on</div>
          <div style={{ fontFamily: T.font, fontSize: 15, lineHeight: "20px", color: T.textPri }}>Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Praesent commodo cursus</div>
          <div style={{ fontFamily: "'Maison Neue', " + T.font, fontSize: 12, lineHeight: "16px", color: T.textTer }}>Read more...</div>
        </div>
        <div style={{ height: 24 }}/>
        <div style={{ width: "100%", height: 250, overflow: "hidden", position: "relative" }}>
          <img src={MILESTONE_MAP_IMG} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }}/>
          <div style={{ position: "absolute", top: 12, left: 12, background: "white", borderRadius: 2, padding: "2px 4px", boxShadow: "0px 2px 4px rgba(0,0,0,0.1)" }}>
            <span style={{ fontFamily: T.font, fontSize: 11, fontWeight: 700, lineHeight: "13px" }}>Workout</span>
          </div>
        </div>
        <SegSocialSummary/>
        <SegSocialActions/>
        <div style={{ height: 12 }}/>
      </div>

    </div>
  );
}

// --- Register ----------------------------------------------------------------
Object.assign(window.MT, { ScreenSegment });
