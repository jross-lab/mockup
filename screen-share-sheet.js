/**
 * screen-share-sheet.js
 * Sharing screens: Share Sheet (post-completion share flow).
 * ─────────────────────────────────────────────────────────────
 * EDIT THIS FILE when: modifying the share sheet layout.
 */

const { T } = window.MT;

// Strava wordmark — white, official SVG provided by design team
function StravaLogoWhite() {
  return (
    <svg width="54" height="11" viewBox="0 0 54 11" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M40.4424 3.86719L42.168 0.391602H45.5811L40.4434 10.332L35.3037 0.391602H38.7168L40.4424 3.86719ZM4.55762 0.223633C6.39395 0.223684 7.75457 0.659965 8.85645 1.53223L7.30469 3.68555C6.40705 3.0315 5.33236 2.74512 4.44824 2.74512C3.97233 2.74514 3.75488 2.90897 3.75488 3.14062V3.16797C3.75515 3.42676 4.0135 3.59035 5.01953 3.78125C7.45456 4.23087 9.08691 4.93965 9.08691 6.86133V6.8877C9.08691 8.89122 7.44127 10.1181 4.88379 10.1182C2.95218 10.1182 1.21077 9.57298 0 8.50977L1.7002 6.47949C2.73399 7.27002 3.91779 7.59666 5.0332 7.59668C5.60443 7.59668 5.84944 7.44713 5.84961 7.18848V7.16113C5.84961 6.88849 5.55032 6.73868 4.53027 6.53418C2.39472 6.09832 0.516777 5.48452 0.516602 3.46777V3.44043C0.516602 1.62788 1.93193 0.223633 4.55762 0.223633ZM18.2451 3.09961H15.4424V9.94141H12.2598V3.09961H9.45703V0.401367H18.2451V3.09961ZM38.0312 9.94141H34.6172L32.8916 6.46484L31.166 9.94141H24.7256L22.9297 7.21582H22.25V9.94141H19.0664V0.401367H23.7188C25.4055 0.401367 26.4808 0.823439 27.1475 1.49121C27.7189 2.0637 28.0176 2.77279 28.0176 3.75391V3.78125C28.0175 5.17115 27.297 6.13953 26.1406 6.69824L28.0127 9.4375L32.8916 0L38.0312 9.94141ZM53.127 9.94141H49.7139L47.9883 6.46484L46.2627 9.94141H42.8496L47.9883 0L53.127 9.94141ZM22.25 4.93945H23.624C24.3855 4.93942 24.8485 4.59848 24.8486 4.0127V3.98535C24.8485 3.37229 24.3719 3.07231 23.6377 3.07227H22.25V4.93945Z" fill="white"/>
    </svg>
  );
}

// Shareable card — shown in the carousel
function ShareableCard({ badgeImg, tagline, heroImg, cardBg }) {
  const stats = [
    { value: "8",       label: "Activities" },
    { value: "21 mi",   label: "Distance" },
    { value: "2:54:08", label: "Time" },
  ];
  return (
    <div style={{
      width: 214, height: 380,
      borderRadius: 0,
      overflow: "hidden",
      position: "relative",
      background: cardBg || "#1A1A1A",
      flexShrink: 0,
      boxShadow: "0px 4px 16px rgba(0,0,0,0.35)",
    }}>
      {/* Background image */}
      {heroImg && (
        <img src={heroImg} alt="" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }}/>
      )}
      {/* Dark overlay gradient */}
      <div style={{
        position: "absolute", inset: 0,
        background: "linear-gradient(to bottom, rgba(0,0,0,0.05) 0%, rgba(0,0,0,0.45) 50%, rgba(0,0,0,0.78) 100%)",
      }}/>

      {/* Badge — centred, upper area */}
      <div style={{
        position: "absolute",
        top: 60,
        left: "50%",
        transform: "translateX(-50%)",
        width: 56, height: 56,
        borderRadius: "50%",
        overflow: "hidden",
        background: "rgba(255,255,255,0.15)",
      }}>
        {badgeImg
          ? <img src={badgeImg} alt="" style={{ width: "100%", height: "100%", objectFit: "contain" }}/>
          : <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5"/></svg>
            </div>
        }
      </div>

      {/* Content: tagline + stats + logo — pinned to bottom */}
      <div style={{
        position: "absolute", bottom: 16, left: 16, right: 16,
        display: "flex", flexDirection: "column", alignItems: "center", gap: 14,
      }}>
        {/* Tagline */}
        <div style={{
          fontFamily: T.font, fontSize: 11, fontWeight: 700,
          color: "#fff", textAlign: "center", lineHeight: "15px",
        }}>
          {tagline || "Custom tagline here."}
        </div>

        {/* Stats — stacked, centred */}
        <div style={{ display: "flex", flexDirection: "column", gap: 14, width: "100%", alignItems: "center" }}>
          {stats.map(({ value, label }, i) => (
            <div key={i} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 1 }}>
              <div style={{
                fontFamily: T.font, fontSize: 16.43, fontWeight: 700,
                color: "#fff", textAlign: "center", lineHeight: "21px",
              }}>{value}</div>
              <div style={{
                fontFamily: T.font, fontSize: 9, fontWeight: 700,
                color: "rgba(255,255,255,0.85)", lineHeight: "12px", textAlign: "center",
              }}>{label}</div>
            </div>
          ))}
        </div>

        {/* Strava wordmark */}
        <StravaLogoWhite/>
      </div>
    </div>
  );
}

// Share destination icon button
function ShareDestBtn({ icon, label }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6, minWidth: 64, flexShrink: 0 }}>
      <div style={{
        width: 56, height: 56, borderRadius: "50%",
        background: "#F2F2F0", border: "0.5px solid rgba(0,0,0,0.10)",
        display: "flex", alignItems: "center", justifyContent: "center",
      }}>
        {icon}
      </div>
      <span style={{
        fontFamily: T.font, fontSize: 11, color: T.textPri,
        textAlign: "center", lineHeight: "14px", whiteSpace: "pre-line",
      }}>{label}</span>
    </div>
  );
}

function ScreenShareSheet({ data }) {
  const { badgeImg, title, heroImg } = data;
  const [activeCard, setActiveCard] = React.useState(1);
  const tagline = title || "Custom tagline here.";
  const cards = [0, 1, 2];
  const cardBgs = ["#1C2B3A", "#2A1A1A", "#1A2A1A"];

  return (
    <div style={{ display: "flex", flexDirection: "column", background: "#000", minHeight: "100%", position: "relative" }}>
      {/* ── Previous screen peek — grey bg with rounded white sheet on top ── */}
      <div style={{ height: 20, background: "#C8C8C8", flexShrink: 0, position: "relative" }}>
        {/* Rounded top corners of the sheet */}
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 20, background: "#fff", borderRadius: "12px 12px 0 0" }}/>
      </div>
      {/* ── Sheet body ── */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", background: "#fff" }}>

      {/* ── Status bar — white icons on black ── */}
      <div style={{ position: "relative", flexShrink: 0, background: "#000" }}>
        <svg width="375" height="54" viewBox="0 0 375 54" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M55.9091 24.7231C58.4658 24.7231 60.6904 26.541 60.6904 30.8574V30.874C60.6904 34.9082 58.8725 37.2988 55.8593 37.2988C53.6596 37.2988 52.0161 35.9956 51.6342 34.1611L51.6176 34.0698H53.726L53.7509 34.1528C54.0663 34.9912 54.8051 35.5391 55.8593 35.5391C57.7602 35.5391 58.5654 33.6797 58.6567 31.3887C58.6567 31.2974 58.665 31.2061 58.665 31.1147H58.499C58.059 32.061 57.0131 32.8994 55.3696 32.8994C53.0703 32.8994 51.4599 31.2227 51.4599 28.9482V28.9316C51.4599 26.4995 53.311 24.7231 55.9091 24.7231ZM55.9008 31.2559C57.2538 31.2559 58.2914 30.2764 58.2914 28.9233V28.9067C58.2914 27.5371 57.2538 26.4663 55.9257 26.4663C54.6059 26.4663 53.5517 27.5205 53.5517 28.8569V28.8735C53.5517 30.2598 54.5395 31.2559 55.9008 31.2559ZM64.0509 29.2388C63.2956 29.2388 62.7311 28.6577 62.7311 27.9272C62.7311 27.1885 63.2956 26.6157 64.0509 26.6157C64.8146 26.6157 65.3707 27.1885 65.3707 27.9272C65.3707 28.6577 64.8146 29.2388 64.0509 29.2388ZM64.0509 35.3979C63.2956 35.3979 62.7311 34.8252 62.7311 34.0864C62.7311 33.3477 63.2956 32.7749 64.0509 32.7749C64.8146 32.7749 65.3707 33.3477 65.3707 34.0864C65.3707 34.8252 64.8146 35.3979 64.0509 35.3979ZM73.222 37V34.7007H67.3617V32.9492C68.9139 30.2515 70.6156 27.4956 72.2425 25.022H75.2723V32.9326H76.8827V34.7007H75.2723V37H73.222ZM69.3539 32.9824H73.2552V26.7319H73.1307C71.9022 28.6079 70.516 30.8242 69.3539 32.8579V32.9824ZM81.4385 37V27.1304H81.2974L78.3174 29.2388V27.2217L81.4468 25.022H83.5801V37H81.4385Z" fill="white"/>
          <path opacity="0.35" d="M322.435 23.5H339.435C341.368 23.5 342.935 25.067 342.935 27V32C342.935 33.933 341.368 35.5 339.435 35.5H322.435C320.502 35.5 318.935 33.933 318.935 32V27C318.935 25.067 320.502 23.5 322.435 23.5Z" stroke="white"/>
          <path opacity="0.4" d="M344.435 28V32.2203C345.284 31.8629 345.836 31.0314 345.836 30.1102C345.836 29.1889 345.284 28.3574 344.435 28Z" fill="white"/>
          <path d="M320.435 27C320.435 25.8954 321.33 25 322.435 25H339.435C340.54 25 341.435 25.8954 341.435 27V32C341.435 33.1046 340.54 34 339.435 34H322.435C321.33 34 320.435 33.1046 320.435 32V27Z" fill="white"/>
          <path fillRule="evenodd" clipRule="evenodd" d="M303.206 26.104C305.693 26.1041 308.085 27.0262 309.887 28.6796C310.023 28.8073 310.24 28.8057 310.374 28.676L311.671 27.4126C311.739 27.3468 311.777 27.2577 311.776 27.165C311.775 27.0724 311.737 26.9837 311.668 26.9187C306.937 22.544 299.473 22.544 294.742 26.9187C294.674 26.9837 294.635 27.0723 294.634 27.165C294.634 27.2577 294.671 27.3468 294.739 27.4126L296.037 28.676C296.17 28.8059 296.388 28.8075 296.523 28.6796C298.326 27.0261 300.718 26.104 303.206 26.104ZM303.202 30.3243C304.56 30.3242 305.868 30.8359 306.875 31.76C307.011 31.8912 307.225 31.8883 307.358 31.7536L308.645 30.4343C308.713 30.3651 308.75 30.2712 308.749 30.1737C308.748 30.0761 308.709 29.9831 308.64 29.9153C305.576 27.0244 300.831 27.0244 297.767 29.9153C297.698 29.9831 297.659 30.0762 297.658 30.1738C297.657 30.2714 297.695 30.3652 297.762 30.4343L299.049 31.7536C299.182 31.8883 299.396 31.8912 299.533 31.76C300.538 30.8365 301.846 30.3248 303.202 30.3243ZM305.727 33.1178C305.729 33.2232 305.692 33.3247 305.624 33.3985L303.448 35.8533C303.384 35.9254 303.297 35.966 303.206 35.966C303.115 35.966 303.028 35.9254 302.964 35.8533L300.787 33.3985C300.72 33.3247 300.683 33.2231 300.685 33.1177C300.687 33.0124 300.728 32.9126 300.798 32.842C302.188 31.5281 304.224 31.5281 305.614 32.842C305.684 32.9127 305.725 33.0125 305.727 33.1178Z" fill="white"/>
          <path fillRule="evenodd" clipRule="evenodd" d="M287.135 24.682C287.135 24.0489 286.657 23.5358 286.068 23.5358H285.002C284.413 23.5358 283.935 24.0489 283.935 24.682V34.616C283.935 35.249 284.413 35.7622 285.002 35.7622H286.068C286.657 35.7622 287.135 35.249 287.135 34.616V24.682ZM279.701 25.981H280.768C281.357 25.981 281.834 26.5065 281.834 27.1548V34.5884C281.834 35.2367 281.357 35.7622 280.768 35.7622H279.701C279.112 35.7622 278.634 35.2367 278.634 34.5884V27.1548C278.634 26.5065 279.112 25.981 279.701 25.981ZM275.369 28.6301H274.303C273.713 28.6301 273.236 29.1623 273.236 29.8188V34.5735C273.236 35.23 273.713 35.7622 274.303 35.7622H275.369C275.958 35.7622 276.436 35.23 276.436 34.5735V29.8188C276.436 29.1623 275.958 28.6301 275.369 28.6301ZM270.068 31.0754H269.002C268.413 31.0754 267.935 31.6 267.935 32.2471V34.5905C267.935 35.2376 268.413 35.7622 269.002 35.7622H270.068C270.657 35.7622 271.135 35.2376 271.135 34.5905V32.2471C271.135 31.6 270.657 31.0754 270.068 31.0754Z" fill="white"/>
        </svg>
      </div>

      {/* ── Header bar: narrow pill with shadow ── */}
      <div style={{
        position: "relative", flexShrink: 0,
        height: 44, display: "flex", alignItems: "center", justifyContent: "center",
        background: "#fff",
        borderBottom: "0.5px solid rgba(0,0,0,0.15)",
      }}>
        <span style={{ position: "absolute", left: 24, fontFamily: "-apple-system, BlinkMacSystemFont, SF Pro Text, Helvetica Neue, sans-serif", fontSize: 17, fontWeight: 400, color: "#000", letterSpacing: "-0.4px" }}>Close</span>
        <span style={{ fontFamily: "-apple-system, BlinkMacSystemFont, SF Pro Text, Helvetica Neue, sans-serif", fontSize: 17, fontWeight: 600, color: "#000", letterSpacing: "-0.4px" }}>Share achievement</span>
      </div>

      {/* ── Carousel area — white background ── */}
      <div style={{ position: "relative", flexShrink: 0, background: "#fff" }}>

        {/* Carousel */}
        <div style={{ position: "relative", paddingTop: 16, paddingBottom: 0 }}>
          <div style={{ display: "flex", gap: 12, paddingLeft: 80, paddingRight: 80 }}>
            {cards.map((_, i) => (
              <div
                key={i}
                onClick={() => setActiveCard(i)}
                style={{
                  flexShrink: 0,
                  transform: i === activeCard ? "scale(1)" : "scale(0.92)",
                  opacity: i === activeCard ? 1 : 0.65,
                  transition: "transform 0.2s ease, opacity 0.2s ease",
                  cursor: "pointer",
                }}
              >
                <ShareableCard
                  badgeImg={badgeImg}
                  tagline={tagline}
                  heroImg={heroImg}
                  cardBg={cardBgs[i]}
                />
              </div>
            ))}
          </div>

          {/* Pagination dots */}
          <div style={{ display: "flex", justifyContent: "center", gap: 5, marginTop: 14, marginBottom: 4 }}>
            {Array.from({ length: 9 }).map((_, i) => {
              const isActive = i === activeCard + 1;
              return (
                <div key={i} style={{
                  width: isActive ? 8 : 6, height: isActive ? 8 : 6,
                  borderRadius: "50%",
                  background: isActive ? "rgba(0,0,0,0.8)" : "rgba(0,0,0,0.22)",
                  transition: "all 0.2s ease",
                }}/>
              );
            })}
          </div>
        </div>
      </div>

      {/* ── White share panel ── */}
      <div style={{ background: "#fff", paddingTop: 20, paddingBottom: 32, flex: 1 }}>
        <div style={{ fontFamily: T.font, fontSize: 17, fontWeight: 700, color: T.textPri, paddingLeft: 24, marginBottom: 16 }}>
          Share to
        </div>
        <div style={{ display: "flex", gap: 20, paddingLeft: 24, paddingRight: 24, overflowX: "auto", scrollbarWidth: "none" }}>

          {/* Instagram Story */}
          <ShareDestBtn
            label={"Instagram Story"}
            icon={
              <img src="data:image/png;base64,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" alt="Instagram" style={{ width: 56, height: 56, borderRadius: 12 }}/>
            }
          />

          {/* Copy to Clipboard */}
          <ShareDestBtn
            label={"Copy to Clipboard"}
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
    </div>
  );
}

// Register
Object.assign(window.MT, { ScreenShareSheet });






