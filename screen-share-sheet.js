/**
 * screen-share-sheet.js
 * Sharing screens: Share Sheet (post-completion share flow).
 * ─────────────────────────────────────────────────────────────
 * EDIT THIS FILE when: modifying the share sheet layout.
 */

const { T } = window.MT;

// --- Strava wordmark SVG (orange) -------------------------------------------
function StravaWordmark() {
  return (
    <svg width="53" height="11" viewBox="0 0 53 11" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M4.936 8.632C3.304 8.632 2.296 7.784 2.2 6.424H0.184C0.296 8.84 2.072 10.344 4.92 10.344C7.704 10.344 9.544 8.888 9.544 6.728C9.544 4.888 8.408 3.944 6.024 3.4L4.664 3.08C3.32 2.76 2.792 2.296 2.792 1.576C2.792 0.712 3.56 0.12 4.712 0.12C6.12 0.12 7.016 0.888 7.08 2.12H9.048C8.952 -0.12 7.256 -1.176 4.744 -1.176C2.12 -1.176 0.776 0.28 0.776 1.72C0.776 3.576 1.848 4.504 4.2 5.08L5.576 5.4C6.968 5.736 7.528 6.2 7.528 6.968C7.528 7.944 6.68 8.632 4.936 8.632Z" fill="#FC5200"/>
    </svg>
  );
}

// Strava wordmark as inline SVG path that renders reliably at small sizes
function StravaLogo({ width = 48 }) {
  return (
    <svg width={width} height={Math.round(width * 0.195)} viewBox="0 0 246 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M22.8 42.4C15.28 42.4 10.64 38.48 10.16 31.52H0.8C1.36 43.28 9.84 50.64 22.72 50.64C35.52 50.64 44.24 43.6 44.24 33.04C44.24 23.84 38.96 19.28 27.92 16.72L21.68 15.28C15.44 13.84 13.04 11.68 13.04 8.08C13.04 3.92 16.72 0.88 22.16 0.88C28.88 0.88 33.04 4.56 33.36 10.48H42.48C42.0 -0.48 34.08 -5.68 21.92 -5.68C9.6 -5.68 3.36 1.44 3.36 8.4C3.36 17.52 8.56 21.92 19.52 24.8L25.76 26.24C32.16 27.84 34.8 30.08 34.8 33.76C34.8 38.56 30.88 42.4 22.8 42.4Z" fill="#FC5200"/>
      <path d="M67.2 6.32H79.84V0.32H47.84V6.32H60.48V50H67.2V6.32Z" fill="#FC5200"/>
      <path d="M109.36 50H116.88L102.48 0.32H94.96L80.56 50H87.84L91.12 38.96H106.08L109.36 50ZM92.96 33.12L98.56 14.16L104.24 33.12H92.96Z" fill="#FC5200"/>
      <path d="M147.6 50H155.52L142.32 0.32H134.8L121.6 50H129.44L133.52 37.68H143.52L147.6 50ZM135.2 32L139.52 16.96L143.84 32H135.2Z" fill="#FC5200"/>
      <path d="M189.12 50H197.04L181.6 0.32H174.08L158.64 50H166.56L170.64 37.68H185.04L189.12 50ZM172.32 32L176.8 16.96L181.28 32H172.32Z" fill="#FC5200"/>
    </svg>
  );
}

// Shareable card — the stacked card shown in the carousel
function ShareableCard({ badgeImg, tagline, stats, cardBg }) {
  return (
    <div style={{
      width: 214, height: 380,
      borderRadius: 12,
      overflow: "hidden",
      position: "relative",
      background: cardBg || "#1A1A1A",
      flexShrink: 0,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "flex-end",
      padding: "0 16px 16px",
      boxShadow: "0px 4px 16px rgba(0,0,0,0.35)",
    }}>
      {/* Card background — dark overlay gradient */}
      <div style={{
        position: "absolute", inset: 0,
        background: "linear-gradient(to bottom, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.55) 60%, rgba(0,0,0,0.8) 100%)",
        zIndex: 1,
      }}/>

      {/* Badge — centred at top area */}
      <div style={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -155px)",
        zIndex: 2,
        width: 56,
        height: 56,
        borderRadius: "50%",
        overflow: "hidden",
        background: "#333",
      }}>
        {badgeImg
          ? <img src={badgeImg} alt="" style={{ width: "100%", height: "100%", objectFit: "contain" }}/>
          : <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5"/></svg>
            </div>
        }
      </div>

      {/* Content: tagline + stats + logo */}
      <div style={{ position: "relative", zIndex: 2, display: "flex", flexDirection: "column", alignItems: "center", gap: 14, width: "100%" }}>
        {/* Tagline */}
        <div style={{
          fontFamily: T.font,
          fontSize: 11,
          fontWeight: 700,
          color: "#fff",
          textAlign: "center",
          lineHeight: "15px",
          overflow: "hidden",
          textOverflow: "ellipsis",
          display: "-webkit-box",
          WebkitLineClamp: 2,
          WebkitBoxOrient: "vertical",
        }}>
          {tagline || "Custom tagline here."}
        </div>

        {/* Stats — stacked vertically, centred */}
        <div style={{ display: "flex", flexDirection: "column", gap: 14, width: "100%", alignItems: "center" }}>
          {(stats || [
            { value: "8",       label: "Activities" },
            { value: "21 mi",   label: "Distance" },
            { value: "2:54:08", label: "Time" },
          ]).map(({ value, label }, i) => (
            <div key={i} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 1 }}>
              <div style={{ fontFamily: T.font, fontSize: 16, fontWeight: 700, color: "#fff", lineHeight: "21px" }}>{value}</div>
              <div style={{ fontFamily: T.font, fontSize: 9, fontWeight: 700, color: "rgba(255,255,255,0.85)", lineHeight: "12px" }}>{label}</div>
            </div>
          ))}
        </div>

        {/* Strava wordmark */}
        <div style={{ marginTop: 2 }}>
          <svg width="48" height="10" viewBox="0 0 246 48" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M18.5 37.5C11.5 37.5 7.3 34 6.9 27.9H0C0.5 38.6 8 45 19.8 45C31.5 45 39.3 38.5 39.3 29.2C39.3 21.0 34.5 17.1 24.6 14.8L19.1 13.5C13.5 12.2 11.4 10.3 11.4 7.1C11.4 3.4 14.7 0.8 19.6 0.8C25.7 0.8 29.4 4.0 29.7 9.3H38.1C37.6 -0.4 30.4 -5.0 19.5 -5.0C8.5 -5.0 2.9 1.3 2.9 7.5C2.9 15.6 7.6 19.5 17.3 22.0L22.8 23.4C28.6 24.9 31.0 26.9 31.0 30.2C31.0 34.2 27.5 37.5 18.5 37.5Z" fill="#FC5200"/>
            <path d="M59.5 5.6H70.7V0.5H42.4V5.6H53.6V45H59.5V5.6Z" fill="#FC5200"/>
            <path d="M99.0 45H105.5L92.5 0.5H85.9L72.9 45H79.2L82.1 34.5H96.1L99.0 45ZM83.6 29.3L88.5 12.6L93.4 29.3H83.6Z" fill="#FC5200"/>
            <path d="M133.5 45H140.0L127.0 0.5H120.4L107.4 45H113.7L116.6 33.5H129.6V33.5H133.5 45ZM118.1 28.3L122.7 15.2L127.3 28.3H118.1Z" fill="#FC5200"/>
            <path d="M175.0 0.5H168.0L158.5 28.0L149.0 0.5H141.5L155.0 45H161.5L175.0 0.5Z" fill="#FC5200"/>
            <path d="M210.5 45H217.0L204.0 0.5H197.4L184.4 45H190.7L193.6 33.5H206.6L210.5 45ZM195.1 28.3L199.7 15.2L204.3 28.3H195.1Z" fill="#FC5200"/>
          </svg>
        </div>
      </div>
    </div>
  );
}

// Share destination button
function ShareDestBtn({ icon, label }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6, minWidth: 64 }}>
      <div style={{ width: 56, height: 56, borderRadius: "50%", background: "#F2F2F0", display: "flex", alignItems: "center", justifyContent: "center", border: "0.5px solid rgba(0,0,0,0.10)" }}>
        {icon}
      </div>
      <span style={{ fontFamily: T.font, fontSize: 11, color: T.textPri, textAlign: "center", lineHeight: "14px" }}>{label}</span>
    </div>
  );
}

function ScreenShareSheet({ data }) {
  const { badgeImg, title, heroImg, description } = data;
  const [activeCard, setActiveCard] = React.useState(1);

  // Build 3 card variants — all use same content, different card layout emphasis
  const cards = [0, 1, 2];

  const tagline = title || "Custom tagline here.";
  const stats = [
    { value: "8",       label: "Activities" },
    { value: "21 mi",   label: "Distance" },
    { value: "2:54:08", label: "Time" },
  ];

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%", background: "#000", position: "relative", overflowY: "auto" }}>
      {/* Background photo — fills top portion */}
      <div style={{ position: "absolute", inset: 0, zIndex: 0 }}>
        {heroImg
          ? <img src={heroImg} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }}/>
          : <div style={{ width: "100%", height: "100%", background: "#1A1A1A" }}/>
        }
        {/* Gradient: transparent at top, white at bottom */}
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(0,0,0,0) 30%, rgba(255,255,255,1) 72%)" }}/>
      </div>

      {/* Header bar */}
      <div style={{
        position: "relative", zIndex: 2,
        height: 44, display: "flex", alignItems: "center", justifyContent: "center",
        paddingTop: 8,
      }}>
        {/* White pill behind header text */}
        <div style={{
          position: "absolute", left: "50%", top: "50%",
          transform: "translate(-50%, -50%)",
          width: 253, height: 44,
          background: "rgba(255,255,255,0.95)",
          borderRadius: 0,
        }}/>
        <span style={{ position: "relative", zIndex: 1, fontFamily: T.font, fontSize: 17, fontWeight: 700, color: "#000" }}>Share achievement</span>
        <span style={{ position: "absolute", left: 24, top: "50%", transform: "translateY(-50%)", fontFamily: T.font, fontSize: 17, fontWeight: 400, color: "#000", zIndex: 1 }}>Close</span>
      </div>

      {/* Carousel area */}
      <div style={{ position: "relative", zIndex: 2, marginTop: 8, paddingBottom: 0 }}>
        <div style={{
          display: "flex",
          gap: 12,
          overflowX: "hidden",
          paddingLeft: 81,
          paddingRight: 81,
          scrollSnapType: "x mandatory",
        }}>
          {cards.map((_, i) => (
            <div
              key={i}
              onClick={() => setActiveCard(i)}
              style={{
                scrollSnapAlign: "center",
                flexShrink: 0,
                transform: i === activeCard ? "scale(1)" : "scale(0.92)",
                transition: "transform 0.2s ease",
                opacity: i === activeCard ? 1 : 0.7,
              }}
            >
              <ShareableCard
                badgeImg={badgeImg}
                tagline={tagline}
                stats={stats}
                cardBg={heroImg ? undefined : (i === 0 ? "#1C2B3A" : i === 1 ? "#2A1A1A" : "#1A2A1A")}
              />
            </div>
          ))}
        </div>

        {/* Pagination dots */}
        <div style={{ display: "flex", justifyContent: "center", gap: 6, marginTop: 12 }}>
          {Array.from({ length: 9 }).map((_, i) => (
            <div key={i} style={{
              width: i === activeCard + 1 ? 8 : 6,
              height: i === activeCard + 1 ? 8 : 6,
              borderRadius: "50%",
              background: i === activeCard + 1 ? "#000" : "rgba(0,0,0,0.25)",
            }}/>
          ))}
        </div>
      </div>

      {/* White share panel */}
      <div style={{ position: "relative", zIndex: 2, background: "#fff", paddingTop: 20, paddingBottom: 32, marginTop: 12 }}>
        {/* Share to label */}
        <div style={{ fontFamily: T.font, fontSize: 17, fontWeight: 700, color: T.textPri, paddingLeft: 24, marginBottom: 16 }}>Share to</div>

        {/* Share destinations — horizontal scroll */}
        <div style={{ display: "flex", gap: 16, paddingLeft: 24, paddingRight: 24, overflowX: "auto", scrollbarWidth: "none" }}>

          {/* Instagram Story */}
          <ShareDestBtn
            label={"Instagram\nStory"}
            icon={
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                <defs>
                  <radialGradient id="ig1" cx="30%" cy="107%" r="120%">
                    <stop offset="0%" stopColor="#fdf497"/>
                    <stop offset="5%" stopColor="#fdf497"/>
                    <stop offset="45%" stopColor="#fd5949"/>
                    <stop offset="60%" stopColor="#d6249f"/>
                    <stop offset="90%" stopColor="#285AEB"/>
                  </radialGradient>
                </defs>
                <rect width="32" height="32" rx="9" fill="url(#ig1)"/>
                <circle cx="16" cy="16" r="6" stroke="#fff" strokeWidth="2" fill="none"/>
                <circle cx="22.5" cy="9.5" r="1.5" fill="#fff"/>
                <rect x="5" y="5" width="22" height="22" rx="6" stroke="#fff" strokeWidth="2" fill="none"/>
              </svg>
            }
          />

          {/* Copy to Clipboard */}
          <ShareDestBtn
            label={"Copy to\nClipboard"}
            icon={
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
                <rect x="8" y="8" width="13" height="13" rx="2" stroke="#000" strokeWidth="1.5" fill="none"/>
                <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" stroke="#000" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
              </svg>
            }
          />

          {/* Save */}
          <ShareDestBtn
            label="Save"
            icon={
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
                <path d="M12 3v13M7 11l5 5 5-5" stroke="#000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M4 19h16" stroke="#000" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
            }
          />

          {/* Copy Link */}
          <ShareDestBtn
            label="Copy Link"
            icon={
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
                <path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71" stroke="#000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
                <path d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71" stroke="#000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
              </svg>
            }
          />

          {/* More */}
          <ShareDestBtn
            label="More"
            icon={
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
                <path d="M12 3v11M7 9l5 5 5-5" stroke="#000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <rect x="3" y="17" width="18" height="4" rx="1.5" stroke="#000" strokeWidth="1.5" fill="none"/>
              </svg>
            }
          />
        </div>
      </div>
    </div>
  );
}

// Register
Object.assign(window.MT, { ScreenShareSheet });
