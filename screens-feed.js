/**
 * screens-feed.js
 * Discovery & Feed screens: Groups Tab, Custom In-Feed.
 * Also contains ScreenRouter.
 * ─────────────────────────────────────────────────────────────
 * EDIT THIS FILE when: modifying the Groups Tab, Custom In-Feed,
 * or adding new discovery/feed screens.
 */

const { T, FALLBACK_COLORS, MILESTONE_MAP_IMG,
        Facepile, HeroBadge, OrangeBtn, InfoRows,
        ScreenNotJoined, ScreenReward, ScreenJoined, ScreenCompleted, ScreenTakeover, ScreenMilestone, ScreenFollowerInFeed, ScreenSegment,
} = window.MT;

// --- Screen: Groups Tab / Challenges -----------------------------------------
function VerticalCard({ badgeImg, title, goal, brandName }) {
  return (
    <div style={{ background: T.bgSurface, borderRadius: 12, padding: 16, display: "flex", flexDirection: "column", gap: 8, boxShadow: "0 1px 4px rgba(0,0,0,0.08)" }}>
      <div style={{ width: 53, height: 53, borderRadius: "50%", background: "#E8E8E8", overflow: "hidden" }}>{badgeImg && <img src={badgeImg} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }}/>}</div>
      <div style={{ fontFamily: T.font, fontSize: 14, fontWeight: 700, lineHeight: "18px" }}>{title || "Challenge Name"}</div>
      <div style={{ fontFamily: T.font, fontSize: 12, color: T.textSec, lineHeight: "16px" }}>{goal || "Complete the goal"}</div>
      <div style={{ fontFamily: T.font, fontSize: 11, color: T.textTer }}>{brandName || "Brand"}</div>
      <button style={{ height: 32, borderRadius: 16, background: T.orange, border: "none", fontFamily: T.font, fontSize: 13, fontWeight: 700, color: "#fff", cursor: "default", marginTop: 4 }}>Join</button>
    </div>
  );
}

function ScreenGroupsTab({ data }) {
  const { badgeImg, title, goal, brandName, startDate, endDate } = data;
  const dateRange = startDate && endDate ? `${startDate} to ${endDate}` : "March 1, 2026 to March 31 2026";
  // Card data: card 1 is dynamic, cards 2-4 use hardcoded sample brands
  const cards = [
    { badge: badgeImg, name: title || "Challenge\nName", goal: goal || "Complete a 5 km (3.1 mi) run.", date: dateRange, joined: false },
    { badge: "assets/badge_prime.png", name: "Prime Fast Track Challenge", goal: "Log a top 3 fastest 5K of all time", date: dateRange, joined: true },
    { badge: "assets/badge_nike.png", name: "The Big Run Powered by Nike...", goal: "Complete a 5 km (3.1 mi) run.", date: "March 1 to March 31, 2024", joined: false },
    { badge: "assets/badge_adidas.png", name: "You Got This: 100 Days powered by adidas", goal: "Complete a 5 km (3.1 mi) run.", date: "March 1 to March 31, 2024", joined: false },
  ];
  return (
    <div style={{ display: "flex", flexDirection: "column", background: T.bgSunken }}>
      {/* Tabs: Active | Challenges | Clubs */}
      <div style={{ background: T.bgSurface, display: "flex", padding: "0 24px", position: "relative" }}>
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 1, background: "#E0E0DE" }}/>
        {[
          { label: "Active", active: false },
          { label: "Challenges", active: true },
          { label: "Clubs", active: false },
        ].map(({ label, active }) => (
          <div key={label} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: 56, padding: "16px 0", borderBottom: active ? `2px solid ${T.orange}` : "none" }}>
            <span style={{ fontFamily: T.font, fontSize: 16, fontWeight: 700, lineHeight: "21px", color: active ? T.textPri : T.textTer, textAlign: "center" }}>{label}</span>
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
      <div style={{ background: T.bgSurface, minHeight: 64, paddingLeft: 24, display: "flex", alignItems: "center", gap: 12 }}>
        <div style={{ display: "flex", alignItems: "center", flex: 1, gap: 12, padding: "12px 0" }}>
          <div style={{ width: 24, height: 24, flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M7.70711 2.87868C8.26972 2.31607 9.03278 2 9.82843 2H11C11.4465 2 11.8389 2.29598 11.9615 2.72528L12.7594 5.51782C13.4148 7.8118 15.1935 9.61401 17.4786 10.2996L21.1494 11.4008C22.8413 11.9084 24 13.4657 24 15.2321V15.6307C24 15.9465 23.9648 16.3312 23.8078 16.7211C23.5697 17.3127 23.0137 18.3878 21.8582 19.3177C20.6872 20.2602 18.9657 21 16.5 21H14C13.9182 21 13.8368 20.99 13.7575 20.9701L10.3068 20.1075L9.70711 20.7071C9.51957 20.8946 9.26522 21 9 21H4C1.79086 21 0 19.2091 0 17V16.8284C0 16.0328 0.316071 15.2697 0.87868 14.7071L1.04048 14.5453L1.82486 6.70149C1.97822 5.16789 3.26872 4 4.80998 4H6.58579L7.70711 2.87868ZM9.82843 4C9.56321 4 9.30886 4.10536 9.12132 4.29289L7.41421 6H4.80998C4.29622 6 3.86606 6.38929 3.81494 6.9005L3.10497 14.0002C5.37921 14.0079 6.51857 14.2675 7.44292 14.5411C7.5535 14.5738 7.65795 14.6057 7.75855 14.6364C8.44339 14.8454 8.95008 15 10 15H17.5C17.8955 15 18.1089 14.8915 18.273 14.7573C18.4811 14.587 18.6523 14.3437 18.9179 13.9453L18.9448 13.905C19.1131 13.6522 19.3282 13.3291 19.6091 13.0268L16.9039 12.2152C16.768 12.1744 16.6335 12.1306 16.5004 12.0837L14.2995 14.2932L12.8826 12.8817L14.6043 11.1533C14.3202 10.9697 14.0474 10.7706 13.7868 10.5571L12.1742 12.176L10.7572 10.7645L12.3899 9.12552C12.161 8.83171 11.95 8.5232 11.7583 8.20158L9.97822 9.98855L8.56128 8.57706L10.888 6.24136C10.8702 6.18358 10.853 6.12554 10.8363 6.06726L10.2457 4H9.82843ZM2.29289 16.1213C2.10536 16.3089 2 16.5632 2 16.8284V17C2 18.1046 2.89543 19 4 19H8.58579L9.69325 17.8925L14.1231 19H16.5C18.5357 19 19.8085 18.4001 20.6043 17.7597C21.4157 17.1066 21.799 16.3556 21.9525 15.9743C21.9787 15.9091 22 15.8054 22 15.6307V15.2321C22 14.7936 21.8572 14.3808 21.6098 14.0453C21.4443 14.0893 21.3265 14.1613 21.227 14.2427C21.0189 14.413 20.8477 14.6563 20.5821 15.0547L20.5552 15.095C20.3227 15.4442 20.0008 15.9277 19.5395 16.3052C19.0161 16.7335 18.3545 17 17.5 17H10C8.64489 17 7.89345 16.7698 7.16892 16.5478C7.07104 16.5178 6.97366 16.488 6.87534 16.4589C6.12439 16.2366 5.15563 16 3 16H2.41421L2.29289 16.1213Z" fill="black"/></svg>
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontFamily: T.font, fontSize: 15, lineHeight: "20px", color: T.textPri }}>Past Group Challenges</div>
            <div style={{ fontFamily: T.font, fontSize: 13, lineHeight: "18px", color: T.textSec }}>3</div>
          </div>
        </div>
        <div style={{ width: 24, height: 24, display: "flex", alignItems: "center", justifyContent: "center", padding: 10, marginRight: 24 }}>
          <svg width="6.8" height="12.77" viewBox="0 0 6.80202 12.768" fill="none"><path d="M0.884129 12.768L6.47252 7.17962C6.91186 6.74028 6.91186 6.02797 6.47252 5.58863L0.883883 0L0 0.883884L5.50024 6.38413L0.000245102 11.8841L0.884129 12.768Z" fill="#64635E"/></svg>
        </div>
      </div>

      {/* Recommended for You header */}
      <div style={{ display: "flex", gap: 16, alignItems: "center", padding: "16px 24px" }}>
        <div style={{ width: 32, height: 32, borderRadius: "50%", flexShrink: 0, overflow: "hidden" }}>
          <img src="assets/gallery_avatar.png" alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }}/>
        </div>
        <div>
          <div style={{ fontFamily: T.font, fontSize: 16, fontWeight: 700, lineHeight: "21px", color: T.textPri }}>Recommended for You</div>
          <div style={{ fontFamily: T.font, fontSize: 13, lineHeight: "18px", color: T.textSec }}>Based on your activities</div>
        </div>
      </div>

      {/* 2-column card grid */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: 8, padding: "0 8px" }}>
        {cards.map((card, i) => (
          <div key={i} style={{ background: T.bgSurface, borderRadius: 16, padding: 16, width: "calc(50% - 4px)", height: 279, display: "flex", flexDirection: "column", justifyContent: "space-between", overflow: "hidden", boxSizing: "border-box" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {/* Badge */}
              <div style={{ width: 55, height: 55, flexShrink: 0, overflow: "hidden" }}>
                {card.badge
                  ? <img src={card.badge} alt="" style={{ width: 55, height: 55, objectFit: "contain" }}/>
                  : <div style={{ width: 55, height: 55, background: "#E8E8E8", borderRadius: 2 }}/>}
              </div>
              {/* Title + details */}
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                <div style={{ fontFamily: T.font, fontSize: 16, fontWeight: 700, lineHeight: "18px", color: T.textPri, width: 144, whiteSpace: "pre-wrap" }}>{card.name}</div>
                <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                  {/* Activity type icon */}
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M8.99018 7.38246L7.6373 9.74999L7.04164 9.74998L7.04161 11L8.3627 11L9.00982 9.86754L10.9899 13.2089L12.3493 11L13 11L13 9.74998L11.6507 9.75001L11.0101 10.7911L8.99018 7.38246Z" fill="#43423F"/><path d="M11.1237 2.87619C10.0698 1.15129 8.16935 0 6 0C2.68629 0 0 2.68629 0 6C0 8.16941 1.15136 10.0699 2.87635 11.1238C3.3743 11.9388 4.06123 12.6257 4.87623 13.1237C5.9301 14.8487 7.83059 16 10 16C13.3137 16 16 13.3137 16 10C16 7.83066 14.8487 5.93021 13.1238 4.87632C12.6258 4.06121 11.9388 3.37418 11.1237 2.87619ZM6 1.25C6.96397 1.25 7.86088 1.53715 8.60985 2.03059C8.40933 2.01035 8.20589 1.99998 8.00004 1.99998C4.68633 1.99998 2.00004 4.68627 2.00004 7.99998C2.00004 8.2059 2.01042 8.40939 2.03067 8.60997C1.53718 7.86098 1.25 6.96403 1.25 6C1.25 3.37665 3.37665 1.25 6 1.25ZM4 10C4 10.2059 4.01037 10.4093 4.03061 10.6098C3.53719 9.86083 3.25004 8.96394 3.25004 7.99998C3.25004 5.37663 5.37669 3.24998 8.00004 3.24998C8.96405 3.24998 9.86099 3.53715 10.61 4.03062C10.4094 4.01037 10.2059 4 10 4C6.68629 4 4 6.68629 4 10ZM10 5.25C12.6234 5.25 14.75 7.37665 14.75 10C14.75 12.6234 12.6234 14.75 10 14.75C7.37665 14.75 5.25 12.6234 5.25 10C5.25 7.37665 7.37665 5.25 10 5.25Z" fill="#43423F"/></svg>
                  <div style={{ fontFamily: T.font, fontSize: 12, lineHeight: "16px", color: T.textSec, width: 143 }}>{card.goal}</div>
                  <div style={{ fontFamily: T.font, fontSize: 12, lineHeight: "16px", color: T.textSec, width: 142 }}>{card.date}</div>
                </div>
              </div>
            </div>
            {/* Button */}
            <button style={{ width: "100%", minHeight: 32, borderRadius: 8, background: card.joined ? "transparent" : T.orange, border: card.joined ? `1.5px solid ${T.divider}` : "none", fontFamily: T.font, fontSize: 11, fontWeight: 500, lineHeight: "13px", color: card.joined ? T.orange : "#fff", cursor: "default", textAlign: "center" }}>{card.joined ? "Joined" : "Join"}</button>
          </div>
        ))}
      </div>

      <div style={{ height: 24 }}/>
    </div>
  );
}

// --- Screen: Custom In-Feed (Figma 2119:23147) -------------------------------
// Home feed with a customisable in-feed ad unit sandwiched between activities.

function ScreenCustomInFeed({ data }) {
  const { badgeImg, heroImg, title, description, brandName } = data;
  return (
    <div style={{ display: "flex", flexDirection: "column", background: T.bgSunken }}>
      {/* ── Module 1: Tail of activity entry (partially visible at top) ── */}
      <div style={{ background: T.bgSurface, display: "flex", flexDirection: "column" }}>
        {/* Map carousel area — only bottom portion visible */}
        <div style={{ padding: "0 24px", overflow: "hidden" }}>
          <div style={{ display: "flex", gap: 8, height: 120 }}>
            <div style={{ width: 327, height: 120, borderRadius: 8, flexShrink: 0, overflow: "hidden", position: "relative" }}>
              <img src={MILESTONE_MAP_IMG} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }}/>
              <div style={{ position: "absolute", top: 12, left: 12, background: "white", borderRadius: 2, padding: "2px 4px", boxShadow: "0px 2px 4px rgba(0,0,0,0.1)" }}><span style={{ fontFamily: T.font, fontSize: 11, fontWeight: 700, lineHeight: "13px" }}>Workout</span></div>
            </div>
            <div style={{ width: 327, height: 120, borderRadius: 8, flexShrink: 0, overflow: "hidden", position: "relative", background: "linear-gradient(160deg, #7BA888 0%, #4A7A5A 50%, #2D5C3E 100%)" }}>
              <div style={{ position: "absolute", top: 12, left: 12, background: "white", borderRadius: 2, padding: "2px 4px", boxShadow: "0px 2px 4px rgba(0,0,0,0.1)" }}><span style={{ fontFamily: T.font, fontSize: 11, fontWeight: 700, lineHeight: "13px" }}>Workout</span></div>
            </div>
          </div>
        </div>
        {/* Social summary */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "16px 24px", minHeight: 56 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}><Facepile/><span style={{ fontFamily: T.font, fontSize: 11, color: T.textSec, lineHeight: "13px" }}>12 gave kudos</span></div>
          <span style={{ fontFamily: T.font, fontSize: 11, color: T.textSec, lineHeight: "13px" }}>1 comment</span>
        </div>
        {/* Social action strip */}
        <div style={{ display: "flex", borderTop: `0.5px solid ${T.divider}` }}>
          {[
            { label: "Kudo", icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M8.568 0.5819C8.7312 0.2272 9.0859 0 9.4764 0H9.9817C12.3657 0 14.2205 2.0723 13.9572 4.4417L13.4508 9H18.8713C20.7834 9 22.3335 10.5501 22.3335 12.4622C22.3335 13.3463 21.9953 14.1968 21.3883 14.8395L21.3335 14.8976V16.6716C21.3335 17.4672 21.0174 18.2303 20.4548 18.7929L20.3335 18.9142V20C20.3335 21.6569 18.9904 23 17.3335 23H8.6363C8.2414 23 7.8554 22.8831 7.5269 22.6641L5.0307 21H2.3335C1.2289 21 0.3335 20.1046 0.3335 19V13.5C0.3335 12.8705 0.6299 12.2777 1.1335 11.9L4.531 9.3519L8.568 0.5819ZM10.1149 2.0043L6.2419 10.4181C6.1724 10.5691 6.0664 10.7003 5.9335 10.8L2.3335 13.5V19H5.0307C5.4256 19 5.8116 19.1169 6.1401 19.3359L8.6363 21H17.3335C17.8858 21 18.3335 20.5523 18.3335 20V18.0858L19.0406 17.3787C19.2281 17.1911 19.3335 16.9368 19.3335 16.6716V14.1024L19.9343 13.4663C20.1907 13.1948 20.3335 12.8356 20.3335 12.4622C20.3335 11.6547 19.6788 11 18.8713 11H11.2162L11.9695 4.2209C12.0962 3.0806 11.2419 2.0781 10.1149 2.0043Z" fill="black"/></svg> },
            { label: "Comment", icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M5 5H19V7H5V5Z" fill="black"/><path d="M5 9V11H16V9H5Z" fill="black"/><path d="M0 3C0 1.3431 1.343 0 3 0H21C22.657 0 24 1.3431 24 3V13C24 14.6569 22.657 16 21 16H11.414L6.914 20.5C6.594 20.8201 6.16 21 5.707 21C4.764 21 4 20.2357 4 19.2929V16H3C1.343 16 0 14.6569 0 13V3ZM3 2C2.448 2 2 2.4477 2 3V13C2 13.5523 2.448 14 3 14H6V18.5858L10 14.5858C10.375 14.2107 10.884 14 11.414 14H21C21.552 14 22 13.5523 22 13V3C22 2.4477 21.552 2 21 2H3Z" fill="black"/></svg> },
            { label: "Share", icon: <svg width="22" height="24" viewBox="0 0 22 24" fill="none"><path d="M10.293 0.2929L5.793 4.7929L7.207 6.2071L10 3.4142V16.0002H12V3.4142L14.793 6.2071L16.207 4.7929L11.707 0.2929C11.317 -0.0976 10.683 -0.0976 10.293 0.2929Z" fill="black"/><path d="M4 8.0002C2.343 8.0002 1 9.3433 1 11.0002V20.0002C1 21.657 2.343 23.0002 4 23.0002H18C19.657 23.0002 21 21.657 21 20.0002V11.0002C21 9.3433 19.657 8.0002 18 8.0002H15V10.0002H18C18.552 10.0002 19 10.4479 19 11.0002V20.0002C19 20.5525 18.552 21.0002 18 21.0002H4C3.448 21.0002 3 20.5525 3 20.0002V11.0002C3 10.4479 3.448 10.0002 4 10.0002H7V8.0002H4Z" fill="black"/></svg> },
          ].map(({ label, icon }) => (
            <div key={label} style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", padding: "12px 0" }}>{icon}</div>
          ))}
        </div>
        <div style={{ height: 12 }}/>
      </div>

      {/* ── Module 2: In-Feed Ad Unit (the editable part) ── */}
      <div style={{ background: T.bgSurface, overflow: "hidden" }}>
        {/* Hero artwork area */}
        <div style={{ width: "100%", height: 125, background: "#C2C1BB", overflow: "hidden" }}>
          {heroImg && <img src={heroImg} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }}/>}
        </div>
        {/* Ad content */}
        <div style={{ padding: "0 24px 24px", display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", gap: 12, alignItems: "flex-start", marginTop: -8 }}>
            {/* Challenge badge */}
            <div style={{ width: 48, height: 48, borderRadius: "50%", background: "#E8E8E8", flexShrink: 0, overflow: "hidden", marginTop: -16, border: "2px solid white" }}>
              {badgeImg
                ? <img src={badgeImg} alt="" style={{ width: "100%", height: "100%", objectFit: "contain" }}/>
                : <div style={{ width: "100%", height: "100%", background: "#E0E0DE", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <span style={{ fontFamily: T.font, fontSize: 7, color: "#999", textAlign: "center" }}>Badge</span>
                  </div>}
            </div>
            <div style={{ flex: 1, paddingTop: 16 }}>
              <div style={{ fontFamily: T.font, fontSize: 20, fontWeight: 500, lineHeight: "24px", color: T.textPri, letterSpacing: "0.34px", marginBottom: 8 }}>
                {title || "Lorem ipsum dolor sit amet"}
              </div>
              <div style={{ fontFamily: T.font, fontSize: 15, lineHeight: "22px", color: T.textSec }}>
                {description || "Body copy 90 characters max. Lorem ipsum dolor sit amet."}
              </div>
            </div>
          </div>
          {/* CTA button */}
          <button style={{ width: 183, height: 34, borderRadius: 17, background: T.orange, border: "none", fontFamily: T.font, fontSize: 13, fontWeight: 700, lineHeight: "18px", color: "#fff", cursor: "default", marginTop: 16, marginLeft: 60, textAlign: "center" }}>
            {brandName ? `Check it out` : "[Custom]"}
          </button>
        </div>
      </div>

      {/* ── Module 3: Head of grouped activity entry (partially visible at bottom) ── */}
      <div style={{ background: T.bgSurface, display: "flex", flexDirection: "column" }}>
        {/* Grouped activity header */}
        <div style={{ padding: 24, display: "flex", gap: 12, alignItems: "flex-start" }}>
          <div style={{ width: 48, height: 49, borderRadius: "50%", background: "#E8E8E8", flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <svg width="24" height="16" viewBox="0 0 24 16" fill="none"><path d="M2 3H6V4.25H5.43L5.86 5H9.83L9.41 3.84C9.34 3.65 9.37 3.43 9.49 3.27C9.6 3.1 9.8 3 10 3H13.5C14.33 3 15 3.67 15 4.5C15 5.33 14.33 6 13.5 6H13V4.75H13.5C13.64 4.75 13.75 4.64 13.75 4.5C13.75 4.36 13.64 4.25 13.5 4.25H10.89L11.91 7.05C12.1 7.02 12.3 7 12.5 7C14.43 7 16 8.57 16 10.5C16 12.43 14.43 14 12.5 14C10.57 14 9 12.43 9 10.5C9 9.21 9.7 8.08 10.74 7.48L10.41 6.58L7.99 10.69C7.88 10.88 7.67 11 7.45 11H6.96C6.72 12.7 5.26 14 3.5 14C1.57 14 0 12.43 0 10.5C0 8.57 1.57 7 3.5 7C3.88 7 4.24 7.06 4.58 7.17L5.09 6.17L3.99 4.25H2V3Z" fill="#43423F"/></svg>
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontFamily: T.font, fontSize: 13, fontWeight: 700, lineHeight: "18px", color: T.textPri }}>Tyler Butterfield rode with Derek Y and Naz Hamid</div>
            <div style={{ fontFamily: T.font, fontSize: 11, color: T.textSec, lineHeight: "13px", marginTop: 4, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>Today at 8:39 AM · San Francisco, California</div>
          </div>
        </div>
        {/* Map placeholder */}
        <div style={{ width: "100%", height: 250, overflow: "hidden", position: "relative" }}>
          <img src={MILESTONE_MAP_IMG} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }}/>
        </div>
        <div style={{ height: 200 }}/>
      </div>
    </div>
  );
}


// --- Screen Router -----------------------------------------------------------
const GROUPS_TAB_SCREENS = new Set(["not-joined","reward","joined","completed","takeover","groups-tab","segment"]);

function ScreenRouter({ screen, data }) {
  switch(screen) {
    case "not-joined":     return <ScreenNotJoined data={data}/>;
    case "reward":         return <ScreenReward data={data}/>;
    case "joined":         return <ScreenJoined data={data}/>;
    case "completed":      return <ScreenCompleted data={data}/>;
    case "milestone":      return <ScreenMilestone data={data}/>;
    case "follower-infeed": return <ScreenFollowerInFeed data={data}/>;
    case "segment":        return <ScreenSegment data={data}/>;
    case "takeover":       return <ScreenTakeover data={data}/>;
    case "groups-tab":     return <ScreenGroupsTab data={data}/>;
    case "custom-infeed":  return <ScreenCustomInFeed data={data}/>;
    default:               return <ScreenNotJoined data={data}/>;
  }
}

// --- Register ----------------------------------------------------------------
Object.assign(window.MT, { ScreenRouter, GROUPS_TAB_SCREENS });
