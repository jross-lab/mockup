/**
 * screen-follower-infeed.js
 * Challenge Detail — Follower In-Feed screen.
 */
const { T, Facepile, DANTE_AVATAR, MILESTONE_MAP_IMG } = window.MT;

function ScreenFollowerInFeed({ data }) {
  const { badgeImg, title, goal, description } = data;
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 8, background: T.bgSunken }}>
      {/* ── Module 1: Activity Entry ── */}
      <div style={{ background: T.bgSurface, display: "flex", flexDirection: "column" }}>
        {/* Feed Owner Header */}
        <div style={{ padding: 24, display: "flex", gap: 12, alignItems: "flex-start", position: "relative" }}>
          <div style={{ position: "relative", flexShrink: 0, width: 48, height: 48, overflow: "visible" }}>
            <img src={DANTE_AVATAR} alt="" style={{ width: 48, height: 48, display: "block" }}/>
            <div style={{ position: "absolute", top: -3, right: -3, width: 14, height: 14 }}>
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><circle cx="7" cy="7" r="7" fill="#FC5200"/><path d="M4 7L6 9L10 5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </div>
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontFamily: T.font, fontSize: 13, fontWeight: 700, lineHeight: "18px", color: T.textPri }}>Dante Young</div>
            <div style={{ height: 4 }}/>
            <div style={{ display: "flex", gap: 4, alignItems: "center", height: 16 }}>
              <div style={{ width: 16, height: 16, flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <svg width="16" height="16" viewBox="10 14 28 20" fill="none" xmlns="http://www.w3.org/2000/svg"><g opacity="0.9"><path d="M16 16V18H17.7053L19.1329 20.4982L18.297 22.1699C17.8834 22.0591 17.4486 22 17 22C14.2386 22 12 24.2386 12 27C12 29.7614 14.2386 32 17 32C19.419 32 21.4367 30.2822 21.9 28H23C23.3589 28 23.6902 27.8077 23.8682 27.4961L27.4755 21.1834L28.114 22.9165C26.835 23.8221 26 25.3135 26 27C26 29.7614 28.2386 32 31 32C33.7614 32 36 29.7614 36 27C36 24.2386 33.7614 22 31 22C30.6393 22 30.2876 22.0382 29.9486 22.1107L28.4341 18H31.5C31.7761 18 32 18.2239 32 18.5C32 18.7761 31.7761 19 31.5 19H31V21H31.5C32.8807 21 34 19.8807 34 18.5C34 17.1193 32.8807 16 31.5 16H27C26.673 16 26.3667 16.1598 26.1797 16.428C25.9927 16.6962 25.9486 17.0389 26.0617 17.3457L26.6711 19H20.5803L20.0088 18H21V16H16ZM20.3254 22.5852L22.2768 26H18.618L20.3254 22.5852ZM23.5 24.1095L21.7231 21H25.2768L23.5 24.1095ZM17 24C17.1255 24 17.2492 24.0077 17.3706 24.0227L16.1056 26.5528C15.9506 26.8628 15.9671 27.2309 16.1493 27.5257C16.3316 27.8205 16.6534 28 17 28H19.8293C19.4175 29.1652 18.3062 30 17 30C15.3431 30 14 28.6569 14 27C14 25.3431 15.3431 24 17 24ZM28.8483 24.9095L29.9074 27.784L31.784 27.0926L30.652 24.02C30.7662 24.0068 30.8823 24 31 24C32.6569 24 34 25.3431 34 27C34 28.6569 32.6569 30 31 30C29.3431 30 28 28.6569 28 27C28 26.1871 28.3233 25.4498 28.8483 24.9095Z" fill="black"/></g></svg>
              </div>
              <span style={{ fontFamily: T.font, fontSize: 11, color: T.textSec, lineHeight: "13px" }}>Today at 9:31 AM · Los Angeles, California</span>
            </div>
          </div>
          <div style={{ position: "absolute", right: 24, top: 24, width: 16, height: 16, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <svg width="16" height="5" viewBox="0 0 16 5" fill="none"><circle cx="2" cy="2.5" r="1.5" fill="#000"/><circle cx="8" cy="2.5" r="1.5" fill="#000"/><circle cx="14" cy="2.5" r="1.5" fill="#000"/></svg>
          </div>
        </div>
        {/* Text */}
        <div style={{ padding: "0 24px", display: "flex", flexDirection: "column", gap: 8 }}>
          <div style={{ fontFamily: T.font, fontSize: 20, fontWeight: 700, lineHeight: "24px", color: T.textPri }}>Probably the most beautiful ride I've ever been on</div>
        </div>
        <div style={{ height: 16 }}/>
        {/* Stats row */}
        <div style={{ padding: "0 24px", display: "flex", alignItems: "flex-start", justifyContent: "space-between" }}>
          <div style={{ display: "flex", gap: 24, height: 37, alignItems: "center" }}>
            {[["Distance","18.33 mi"],["Time","2h 20m"],["Elevation","2,033 ft"]].map(([label, val]) => (
              <div key={label}><div style={{ fontFamily: T.font, fontSize: 11, color: T.textSec, lineHeight: "13px", marginBottom: 2 }}>{label}</div><div style={{ fontFamily: T.font, fontSize: 17, fontWeight: 700, lineHeight: "22px" }}>{val}</div></div>
            ))}
          </div>
          <div style={{ textAlign: "right" }}>
            <div style={{ fontFamily: T.font, fontSize: 11, color: T.textSec, lineHeight: "13px", marginBottom: 2 }}>Achievements</div>
            <div style={{ display: "flex", alignItems: "center", gap: 2, justifyContent: "flex-end" }}>
              <svg width="64" height="22" viewBox="0 0 64 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1.6224 9.88131L2.98333 11.2422C2.67283 11.9311 2.50004 12.6954 2.50004 13.5C2.50004 16.5376 4.96247 19 8.00004 19C11.0376 19 13.5 16.5376 13.5 13.5C13.5 12.6954 13.3272 11.9311 13.0167 11.2422L14.3776 9.88131C14.7761 9.4828 15 8.9423 15 8.37871V5.125C15 3.9514 14.0486 3 12.875 3H3.125C1.95139 3 1 3.95139 1 5.125V8.37871C1 8.9423 1.22388 9.4828 1.6224 9.88131ZM2.45094 4.56705C2.61144 4.37337 2.85381 4.25 3.125 4.25H12.875C13.1462 4.25 13.3886 4.37338 13.5491 4.56707L12.1161 6.00003H3.88392L2.45094 4.56705ZM5.13392 7.25003H10.8661L9.81101 8.30514C9.24391 8.10747 8.63452 8.00003 8.00004 8.00003C7.36555 8.00003 6.75615 8.10747 6.18904 8.30515L5.13392 7.25003ZM2.25 6.13388L5.00342 8.8873C4.48394 9.22547 4.02513 9.64901 3.64689 10.138L2.50628 8.99743C2.34219 8.83334 2.25 8.61078 2.25 8.37871V6.13388ZM13.4937 8.99743L12.3532 10.138C11.9749 9.64898 11.5161 9.22544 10.9966 8.88728L13.75 6.13392V8.37871C13.75 8.61078 13.6578 8.83334 13.4937 8.99743Z" fill="#EEAF0B"/>
                <path d="M21 3.625C21 3.27982 21.2798 3 21.625 3H30.375C30.7202 3 31 3.27982 31 3.625V4.00012H32.7083C33.4217 4.00012 34 4.57842 34 5.29179V7.70846C34 9.52639 32.5263 11.0001 30.7083 11.0001H30.369C29.6363 12.566 28.3098 13.8235 26.625 14.4477V15.6688L29.8509 17.8578C30.0781 18.0119 30.178 18.2962 30.0974 18.5586C30.0168 18.8209 29.7745 19 29.5 19H22.5C22.2255 19 21.9832 18.8209 21.9026 18.5586C21.822 18.2962 21.9219 18.0119 22.1491 17.8578L25.375 15.6688V14.4477C23.6902 13.8235 22.3637 12.566 21.631 11.0001H21.2917C19.4737 11.0001 18 9.52639 18 7.70846V5.29179C18 4.57842 18.5783 4.00012 19.2917 4.00012H21V3.625ZM30.8097 9.74765C31.8902 9.6948 32.75 8.80204 32.75 7.70846V5.29179C32.75 5.26878 32.7313 5.25012 32.7083 5.25012H31V8.15957C31 8.70343 30.9344 9.23573 30.8097 9.74765ZM21 5.25012H19.2917C19.2687 5.25012 19.25 5.26878 19.25 5.29179V7.70846C19.25 8.80204 20.1098 9.6948 21.1903 9.74765C21.0656 9.23573 21 8.70342 21 8.15957V5.25012Z" fill="#8B9699"/>
                <path d="M41.9999 12V13H42.3749C42.6511 13 42.8749 12.7761 42.8749 12.5C42.8749 12.2238 42.6511 12 42.3749 12H41.9999Z" fill="#EEAF0B"/>
                <path d="M44.9999 13H45.4999C45.7761 13 45.9999 12.7761 45.9999 12.5C45.9999 12.2238 45.7761 12 45.4999 12H44.9999V13Z" fill="#EEAF0B"/>
                <path d="M38.9833 11.2422L37.6224 9.88131C37.2239 9.4828 37 8.9423 37 8.37871V5.125C37 3.95139 37.9514 3 39.125 3H48.875C50.0486 3 51 3.9514 51 5.125V8.37871C51 8.9423 50.7761 9.4828 50.3776 9.88131L49.0167 11.2422C49.3272 11.9311 49.5 12.6954 49.5 13.5C49.5 16.5376 47.0376 19 44 19C40.9625 19 38.5 16.5376 38.5 13.5C38.5 12.6954 38.6728 11.9311 38.9833 11.2422ZM39.125 4.25C38.8538 4.25 38.6114 4.37337 38.4509 4.56705L39.8839 6.00003H48.1161L49.5491 4.56707C49.3886 4.37338 49.1462 4.25 48.875 4.25H39.125ZM42.189 8.30515C42.7561 8.10747 43.3655 8.00003 44 8.00003C44.6345 8.00003 45.2439 8.10747 45.811 8.30514L46.8661 7.25003H41.1339L42.189 8.30515ZM41.0034 8.8873L38.25 6.13388V8.37871C38.25 8.61078 38.3422 8.83334 38.5063 8.99743L39.6469 10.138C40.0251 9.64901 40.4839 9.22547 41.0034 8.8873ZM48.3532 10.138L49.4937 8.99743C49.6578 8.83334 49.75 8.61078 49.75 8.37871V6.13392L46.9966 8.88728C47.5161 9.22544 47.9749 9.64898 48.3532 10.138ZM41.9999 14H42.3749C43.2033 14 43.8749 13.3284 43.8749 12.5C43.8749 11.6716 43.2033 11 42.3749 11H40.9999V16H41.9999V14ZM45.4999 11H43.9999V16H44.9999V14H45.4999C45.5533 14 45.6061 13.9972 45.6581 13.9917L46.4614 16H47.4999V15.9037L46.5621 13.5591C46.8327 13.2878 46.9999 12.9134 46.9999 12.5C46.9999 11.6716 46.3283 11 45.4999 11Z" fill="#EEAF0B"/>
                <path d="M58.9853 17.255C56.4863 17.255 54.8713 16.065 54.5313 14.11L56.9113 13.583C57.0643 14.603 57.8293 15.283 58.9343 15.283C60.0223 15.283 60.6853 14.535 60.6853 13.328C60.6853 12.019 59.9713 11.407 58.4583 11.407H57.2003V9.707L60.0393 7.089V7.004H54.9053V5.015H62.6403V7.174L59.7503 9.775V9.843C61.7733 9.775 63.2013 10.982 63.2013 13.277C63.2013 15.742 61.6373 17.255 58.9853 17.255Z" fill="black"/>
              </svg>
            </div>
          </div>
        </div>
        <div style={{ height: 12 }}/>
        {/* Social Summary */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "16px 24px", minHeight: 56 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}><Facepile/><span style={{ fontFamily: T.font, fontSize: 11, color: T.textSec, lineHeight: "13px" }}>12 gave kudos</span></div>
          <span style={{ fontFamily: T.font, fontSize: 11, color: T.textSec, lineHeight: "13px", textAlign: "right" }}>1 comment</span>
        </div>
      </div>

      {/* ── Module 2: Challenge Join Card ── */}
      <div style={{ background: T.bgSurface, display: "flex", flexDirection: "column" }}>
        {/* Entry context header */}
        <div style={{ padding: "16px 24px 0", display: "flex", gap: 16, alignItems: "center" }}>
          <p style={{ flex: 1, fontFamily: T.font, fontSize: 13, lineHeight: "18px", color: T.textPri }}>Victor Townsend joined a challenge</p>
        </div>
        {/* Card content: badge + copy + button — badge top-aligned with title */}
        <div style={{ display: "flex", gap: 13, alignItems: "flex-start", padding: "16px 16px 24px" }}>
          <div style={{ width: 64, height: 64, flexShrink: 0, overflow: "hidden" }}>
            {badgeImg
              ? <img src={badgeImg} alt="" style={{ width: 64, height: 64, objectFit: "contain" }}/>
              : <div style={{ width: 64, height: 64, background: "#E8E8E8", borderRadius: 2 }}/>}
          </div>
          <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 12 }}>
            <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
              <div style={{ fontFamily: T.font, fontSize: 17, fontWeight: 700, lineHeight: "24px", color: T.textPri }}>
                {title || "Claim your Camelbak reward"}
              </div>
              <div style={{ fontFamily: T.font, fontSize: 13, lineHeight: "18px", color: "#21211F", overflow: "hidden", textOverflow: "ellipsis" }}>
                {description || goal || "You've unlocked a 20% discount code and the chance to win a Zephyr Pro vest!"}
              </div>
            </div>
            <button style={{ alignSelf: "flex-start", height: 36, paddingLeft: 16, paddingRight: 16, borderRadius: 18, background: T.orange, border: "none", fontFamily: T.font, fontSize: 15, fontWeight: 700, color: "#fff", cursor: "default" }}>Check it out</button>
          </div>
        </div>
      </div>

      {/* ── Module 3: Post Card ── */}
      <div style={{ background: T.bgSurface, display: "flex", flexDirection: "column" }}>
        {/* Media carousel */}
        <div style={{ padding: "0 24px", overflow: "hidden" }}>
          <div style={{ display: "flex", gap: 8, height: 250 }}>
            <div style={{ width: 327, height: 250, borderRadius: 8, flexShrink: 0, overflow: "hidden", position: "relative" }}>
              <img src={MILESTONE_MAP_IMG} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }}/>
              <div style={{ position: "absolute", top: 12, left: 12, background: "white", borderRadius: 2, padding: "2px 4px", boxShadow: "0px 2px 4px rgba(0,0,0,0.1)" }}><span style={{ fontFamily: T.font, fontSize: 11, fontWeight: 700, lineHeight: "13px" }}>Workout</span></div>
            </div>
            <div style={{ width: 327, height: 250, borderRadius: 8, flexShrink: 0, overflow: "hidden", position: "relative", background: "linear-gradient(160deg, #7BA888 0%, #4A7A5A 50%, #2D5C3E 100%)" }}>
              <div style={{ position: "absolute", top: 12, left: 12, background: "white", borderRadius: 2, padding: "2px 4px", boxShadow: "0px 2px 4px rgba(0,0,0,0.1)" }}><span style={{ fontFamily: T.font, fontSize: 11, fontWeight: 700, lineHeight: "13px" }}>Workout</span></div>
            </div>
          </div>
        </div>
        {/* Social Summary */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "16px 24px", minHeight: 56 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}><Facepile/><span style={{ fontFamily: T.font, fontSize: 11, color: T.textSec, lineHeight: "13px" }}>12 gave kudos</span></div>
          <span style={{ fontFamily: T.font, fontSize: 11, color: T.textSec, lineHeight: "13px", textAlign: "right" }}>1 comment</span>
        </div>
        <div style={{ height: 12 }}/>
      </div>
    </div>
  );
}

// --- Register ----------------------------------------------------------------

Object.assign(window.MT, { ScreenFollowerInFeed });
