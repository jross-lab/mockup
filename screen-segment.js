/**
 * screen-segment.js
 * Home Feed — Segment Challenge screen.
 *
 * The discovery section is the hero. Module 1 (brand feed entry) is
 * rendered but shifted off-screen via negative margin-top so only
 * its tail (social summary + action strip ~110px) is visible.
 * Module 3 (The Strava Club) just peeks in at the bottom.
 */
const { T, Facepile, MILESTONE_MAP_IMG, STRAVA_CLUB_AVATAR } = window.MT;

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
          <div style={{ position: "relative", flexShrink: 0, width: 40, height: 40 }}>
            <div style={{ width: 40, height: 40, borderRadius: 4, overflow: "hidden", boxShadow: "0 2px 4px rgba(0,0,0,0.1)" }}>
              <img src={STRAVA_CLUB_AVATAR} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", borderRadius: 4 }}/>
            </div>
            <div style={{ position: "absolute", top: -5, right: -5, width: 16, height: 16, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <svg width="16" height="16" viewBox="0 0 10 10" fill="none"><path fillRule="evenodd" clipRule="evenodd" d="M9.91213 4.11877L8.63525 3.0469L8.34525 1.40502C8.32463 1.28752 8.22213 1.20127 8.10275 1.20127H6.43588L5.15838 0.130024C5.11275 0.0918994 5.05588 0.0718994 5.00025 0.0718994C4.944 0.0718994 4.88713 0.0918994 4.8415 0.130024L3.56463 1.20127H1.89713C1.77775 1.20127 1.67525 1.28752 1.65463 1.40502L1.36525 3.0469L0.0877525 4.11877C-0.00349753 4.19565 -0.0266225 4.3269 0.0327525 4.43065L0.866502 5.8744L0.577127 7.51628C0.556502 7.63378 0.623378 7.75003 0.735252 7.79065L2.30213 8.36065L3.13588 9.80503C3.18088 9.88315 3.26338 9.92815 3.349 9.92815C3.37713 9.92815 3.40588 9.92315 3.43338 9.91315L5.00025 9.34253L6.5665 9.91315C6.594 9.92315 6.62275 9.92815 6.65088 9.92815C6.7365 9.92815 6.819 9.88315 6.86463 9.80503L7.69775 8.36065L9.26463 7.79065C9.37713 7.75003 9.44338 7.63378 9.42275 7.51628L9.13338 5.8744L9.96713 4.43065C10.0271 4.3269 10.0034 4.19565 9.91213 4.11877Z" fill="white"/><path fillRule="evenodd" clipRule="evenodd" d="M9.23102 4.24325C9.30914 4.30887 9.32914 4.422 9.27789 4.51137L8.56227 5.75075L8.81102 7.16075C8.82852 7.262 8.77164 7.36137 8.67477 7.39637L7.32977 7.88575L6.61352 9.12575C6.57477 9.19325 6.50414 9.23137 6.43039 9.23137C6.40602 9.23137 6.38164 9.22825 6.35789 9.21887L5.01227 8.7295L3.66727 9.21887C3.64352 9.22825 3.61914 9.23137 3.59477 9.23137C3.52102 9.23137 3.45039 9.19325 3.41164 9.12575L2.69539 7.88575L1.35039 7.39637C1.25352 7.36137 1.19664 7.262 1.21414 7.16075L1.46289 5.75075L0.746643 4.51137C0.695393 4.422 0.715393 4.30887 0.794143 4.24325L1.89102 3.32262L2.13977 1.91262C2.15727 1.81137 2.24539 1.73762 2.34789 1.73762H3.77977L4.87664 0.817624C4.91602 0.784499 4.96414 0.767624 5.01227 0.767624C5.06102 0.767624 5.10914 0.784499 5.14852 0.817624L6.24539 1.73762H7.67727C7.77977 1.73762 7.86727 1.81137 7.88539 1.91262L8.13414 3.32262L9.23102 4.24325ZM6.66615 3.66945L4.39581 5.9398L3.40151 4.94549C3.24591 4.78989 2.99363 4.78989 2.83803 4.94549C2.68243 5.10109 2.68243 5.35337 2.83803 5.50897L4.11407 6.78501C4.26967 6.94061 4.52195 6.94061 4.67755 6.78501L7.22963 4.23292C7.38523 4.07732 7.38523 3.82505 7.22963 3.66945C7.07403 3.51385 6.82175 3.51385 6.66615 3.66945Z" fill="#FC5200"/></svg>
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
