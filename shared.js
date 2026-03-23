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
const { T, AVATAR_IMG, FACEPILE_IMG, NAV_ICONS, NAV_TABS, FALLBACK_COLORS,
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
// TopNavHome — renders exact SVGs for status bar and title row
function TopNavHome() {
  return (
    <div style={{ background: T.bgSurface, display: "flex", flexDirection: "column", boxShadow: "0px 2px 4px rgba(0,0,0,0.1)", flexShrink: 0 }}>
      {/* iOS Status Bar — exact SVG */}
      <svg width="375" height="54" viewBox="0 0 375 54" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ display: "block", flexShrink: 0 }}>
        <path d="M55.9091 24.7231C58.4658 24.7231 60.6904 26.541 60.6904 30.8574V30.874C60.6904 34.9082 58.8725 37.2988 55.8593 37.2988C53.6596 37.2988 52.0161 35.9956 51.6342 34.1611L51.6176 34.0698H53.726L53.7509 34.1528C54.0663 34.9912 54.8051 35.5391 55.8593 35.5391C57.7602 35.5391 58.5654 33.6797 58.6567 31.3887C58.6567 31.2974 58.665 31.2061 58.665 31.1147H58.499C58.059 32.061 57.0131 32.8994 55.3696 32.8994C53.0703 32.8994 51.4599 31.2227 51.4599 28.9482V28.9316C51.4599 26.4995 53.311 24.7231 55.9091 24.7231ZM55.9008 31.2559C57.2538 31.2559 58.2914 30.2764 58.2914 28.9233V28.9067C58.2914 27.5371 57.2538 26.4663 55.9257 26.4663C54.6059 26.4663 53.5517 27.5205 53.5517 28.8569V28.8735C53.5517 30.2598 54.5395 31.2559 55.9008 31.2559ZM64.0509 29.2388C63.2956 29.2388 62.7311 28.6577 62.7311 27.9272C62.7311 27.1885 63.2956 26.6157 64.0509 26.6157C64.8146 26.6157 65.3707 27.1885 65.3707 27.9272C65.3707 28.6577 64.8146 29.2388 64.0509 29.2388ZM64.0509 35.3979C63.2956 35.3979 62.7311 34.8252 62.7311 34.0864C62.7311 33.3477 63.2956 32.7749 64.0509 32.7749C64.8146 32.7749 65.3707 33.3477 65.3707 34.0864C65.3707 34.8252 64.8146 35.3979 64.0509 35.3979ZM73.222 37V34.7007H67.3617V32.9492C68.9139 30.2515 70.6156 27.4956 72.2425 25.022H75.2723V32.9326H76.8827V34.7007H75.2723V37H73.222ZM69.3539 32.9824H73.2552V26.7319H73.1307C71.9022 28.6079 70.516 30.8242 69.3539 32.8579V32.9824ZM81.4385 37V27.1304H81.2974L78.3174 29.2388V27.2217L81.4468 25.022H83.5801V37H81.4385Z" fill="black"/>
        <path opacity="0.35" d="M322.435 23.5H339.435C341.368 23.5 342.935 25.067 342.935 27V32C342.935 33.933 341.368 35.5 339.435 35.5H322.435C320.502 35.5 318.935 33.933 318.935 32V27C318.935 25.067 320.502 23.5 322.435 23.5Z" stroke="black"/>
        <path opacity="0.4" d="M344.435 28V32.2203C345.284 31.8629 345.836 31.0314 345.836 30.1102C345.836 29.1889 345.284 28.3574 344.435 28Z" fill="black"/>
        <path d="M320.435 27C320.435 25.8954 321.33 25 322.435 25H339.435C340.54 25 341.435 25.8954 341.435 27V32C341.435 33.1046 340.54 34 339.435 34H322.435C321.33 34 320.435 33.1046 320.435 32V27Z" fill="black"/>
        <path fillRule="evenodd" clipRule="evenodd" d="M303.206 26.104C305.693 26.1041 308.085 27.0262 309.887 28.6796C310.023 28.8073 310.24 28.8057 310.374 28.676L311.671 27.4126C311.739 27.3468 311.777 27.2577 311.776 27.165C311.775 27.0724 311.737 26.9837 311.668 26.9187C306.937 22.544 299.473 22.544 294.742 26.9187C294.674 26.9837 294.635 27.0723 294.634 27.165C294.634 27.2577 294.671 27.3468 294.739 27.4126L296.037 28.676C296.17 28.8059 296.388 28.8075 296.523 28.6796C298.326 27.0261 300.718 26.104 303.206 26.104ZM303.202 30.3243C304.56 30.3242 305.868 30.8359 306.875 31.76C307.011 31.8912 307.225 31.8883 307.358 31.7536L308.645 30.4343C308.713 30.3651 308.75 30.2712 308.749 30.1737C308.748 30.0761 308.709 29.9831 308.64 29.9153C305.576 27.0244 300.831 27.0244 297.767 29.9153C297.698 29.9831 297.659 30.0762 297.658 30.1738C297.657 30.2714 297.695 30.3652 297.762 30.4343L299.049 31.7536C299.182 31.8883 299.396 31.8912 299.533 31.76C300.538 30.8365 301.846 30.3248 303.202 30.3243ZM305.727 33.1178C305.729 33.2232 305.692 33.3247 305.624 33.3985L303.448 35.8533C303.384 35.9254 303.297 35.966 303.206 35.966C303.115 35.966 303.028 35.9254 302.964 35.8533L300.787 33.3985C300.72 33.3247 300.683 33.2231 300.685 33.1177C300.687 33.0124 300.728 32.9126 300.798 32.842C302.188 31.5281 304.224 31.5281 305.614 32.842C305.684 32.9127 305.725 33.0125 305.727 33.1178Z" fill="black"/>
        <path fillRule="evenodd" clipRule="evenodd" d="M287.135 24.682C287.135 24.0489 286.657 23.5358 286.068 23.5358H285.002C284.413 23.5358 283.935 24.0489 283.935 24.682V34.616C283.935 35.249 284.413 35.7622 285.002 35.7622H286.068C286.657 35.7622 287.135 35.249 287.135 34.616V24.682ZM279.701 25.981H280.768C281.357 25.981 281.834 26.5065 281.834 27.1548V34.5884C281.834 35.2367 281.357 35.7622 280.768 35.7622H279.701C279.112 35.7622 278.634 35.2367 278.634 34.5884V27.1548C278.634 26.5065 279.112 25.981 279.701 25.981ZM275.369 28.6301H274.303C273.713 28.6301 273.236 29.1623 273.236 29.8188V34.5735C273.236 35.23 273.713 35.7622 274.303 35.7622H275.369C275.958 35.7622 276.436 35.23 276.436 34.5735V29.8188C276.436 29.1623 275.958 28.6301 275.369 28.6301ZM270.068 31.0754H269.002C268.413 31.0754 267.935 31.6 267.935 32.2471V34.5905C267.935 35.2376 268.413 35.7622 269.002 35.7622H270.068C270.657 35.7622 271.135 35.2376 271.135 34.5905V32.2471C271.135 31.6 270.657 31.0754 270.068 31.0754Z" fill="black"/>
      </svg>
      {/* Title and Controls row — pixel-perfect SVG */}
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
// TopNavGroups — "Groups" title with search (left) + messaging + settings (right)
function TopNavGroups() {
  return (
    <div style={{ background: T.bgSurface, display: "flex", flexDirection: "column", boxShadow: "0px 2px 4px rgba(0,0,0,0.1)", flexShrink: 0 }}>
      {/* iOS Status Bar — same as TopNavHome */}
      <svg width="375" height="54" viewBox="0 0 375 54" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ display: "block", flexShrink: 0 }}>
        <path d="M55.9091 24.7231C58.4658 24.7231 60.6904 26.541 60.6904 30.8574V30.874C60.6904 34.9082 58.8725 37.2988 55.8593 37.2988C53.6596 37.2988 52.0161 35.9956 51.6342 34.1611L51.6176 34.0698H53.726L53.7509 34.1528C54.0663 34.9912 54.8051 35.5391 55.8593 35.5391C57.7602 35.5391 58.5654 33.6797 58.6567 31.3887C58.6567 31.2974 58.665 31.2061 58.665 31.1147H58.499C58.059 32.061 57.0131 32.8994 55.3696 32.8994C53.0703 32.8994 51.4599 31.2227 51.4599 28.9482V28.9316C51.4599 26.4995 53.311 24.7231 55.9091 24.7231ZM55.9008 31.2559C57.2538 31.2559 58.2914 30.2764 58.2914 28.9233V28.9067C58.2914 27.5371 57.2538 26.4663 55.9257 26.4663C54.6059 26.4663 53.5517 27.5205 53.5517 28.8569V28.8735C53.5517 30.2598 54.5395 31.2559 55.9008 31.2559ZM64.0509 29.2388C63.2956 29.2388 62.7311 28.6577 62.7311 27.9272C62.7311 27.1885 63.2956 26.6157 64.0509 26.6157C64.8146 26.6157 65.3707 27.1885 65.3707 27.9272C65.3707 28.6577 64.8146 29.2388 64.0509 29.2388ZM64.0509 35.3979C63.2956 35.3979 62.7311 34.8252 62.7311 34.0864C62.7311 33.3477 63.2956 32.7749 64.0509 32.7749C64.8146 32.7749 65.3707 33.3477 65.3707 34.0864C65.3707 34.8252 64.8146 35.3979 64.0509 35.3979ZM73.222 37V34.7007H67.3617V32.9492C68.9139 30.2515 70.6156 27.4956 72.2425 25.022H75.2723V32.9326H76.8827V34.7007H75.2723V37H73.222ZM69.3539 32.9824H73.2552V26.7319H73.1307C71.9022 28.6079 70.516 30.8242 69.3539 32.8579V32.9824ZM81.4385 37V27.1304H81.2974L78.3174 29.2388V27.2217L81.4468 25.022H83.5801V37H81.4385Z" fill="black"/>
        <path opacity="0.35" d="M322.435 23.5H339.435C341.368 23.5 342.935 25.067 342.935 27V32C342.935 33.933 341.368 35.5 339.435 35.5H322.435C320.502 35.5 318.935 33.933 318.935 32V27C318.935 25.067 320.502 23.5 322.435 23.5Z" stroke="black"/>
        <path opacity="0.4" d="M344.435 28V32.2203C345.284 31.8629 345.836 31.0314 345.836 30.1102C345.836 29.1889 345.284 28.3574 344.435 28Z" fill="black"/>
        <path d="M320.435 27C320.435 25.8954 321.33 25 322.435 25H339.435C340.54 25 341.435 25.8954 341.435 27V32C341.435 33.1046 340.54 34 339.435 34H322.435C321.33 34 320.435 33.1046 320.435 32V27Z" fill="black"/>
        <path fillRule="evenodd" clipRule="evenodd" d="M303.206 26.104C305.693 26.1041 308.085 27.0262 309.887 28.6796C310.023 28.8073 310.24 28.8057 310.374 28.676L311.671 27.4126C311.739 27.3468 311.777 27.2577 311.776 27.165C311.775 27.0724 311.737 26.9837 311.668 26.9187C306.937 22.544 299.473 22.544 294.742 26.9187C294.674 26.9837 294.635 27.0723 294.634 27.165C294.634 27.2577 294.671 27.3468 294.739 27.4126L296.037 28.676C296.17 28.8059 296.388 28.8075 296.523 28.6796C298.326 27.0261 300.718 26.104 303.206 26.104ZM303.202 30.3243C304.56 30.3242 305.868 30.8359 306.875 31.76C307.011 31.8912 307.225 31.8883 307.358 31.7536L308.645 30.4343C308.713 30.3651 308.75 30.2712 308.749 30.1737C308.748 30.0761 308.709 29.9831 308.64 29.9153C305.576 27.0244 300.831 27.0244 297.767 29.9153C297.698 29.9831 297.659 30.0762 297.658 30.1738C297.657 30.2714 297.695 30.3652 297.762 30.4343L299.049 31.7536C299.182 31.8883 299.396 31.8912 299.533 31.76C300.538 30.8365 301.846 30.3248 303.202 30.3243ZM305.727 33.1178C305.729 33.2232 305.692 33.3247 305.624 33.3985L303.448 35.8533C303.384 35.9254 303.297 35.966 303.206 35.966C303.115 35.966 303.028 35.9254 302.964 35.8533L300.787 33.3985C300.72 33.3247 300.683 33.2231 300.685 33.1177C300.687 33.0124 300.728 32.9126 300.798 32.842C302.188 31.5281 304.224 31.5281 305.614 32.842C305.684 32.9127 305.725 33.0125 305.727 33.1178Z" fill="black"/>
        <path fillRule="evenodd" clipRule="evenodd" d="M287.135 24.682C287.135 24.0489 286.657 23.5358 286.068 23.5358H285.002C284.413 23.5358 283.935 24.0489 283.935 24.682V34.616C283.935 35.249 284.413 35.7622 285.002 35.7622H286.068C286.657 35.7622 287.135 35.249 287.135 34.616V24.682ZM279.701 25.981H280.768C281.357 25.981 281.834 26.5065 281.834 27.1548V34.5884C281.834 35.2367 281.357 35.7622 280.768 35.7622H279.701C279.112 35.7622 278.634 35.2367 278.634 34.5884V27.1548C278.634 26.5065 279.112 25.981 279.701 25.981ZM275.369 28.6301H274.303C273.713 28.6301 273.236 29.1623 273.236 29.8188V34.5735C273.236 35.23 273.713 35.7622 274.303 35.7622H275.369C275.958 35.7622 276.436 35.23 276.436 34.5735V29.8188C276.436 29.1623 275.958 28.6301 275.369 28.6301ZM270.068 31.0754H269.002C268.413 31.0754 267.935 31.6 267.935 32.2471V34.5905C267.935 35.2376 268.413 35.7622 269.002 35.7622H270.068C270.657 35.7622 271.135 35.2376 271.135 34.5905V32.2471C271.135 31.6 270.657 31.0754 270.068 31.0754Z" fill="black"/>
      </svg>
      {/* Title row: search (left) + "Groups" + messaging + settings (right) */}
      <div style={{ height: 46, display: "flex", alignItems: "center", position: "relative" }}>
        {/* Leading: search icon */}
        <div style={{ position: "absolute", left: 0, paddingLeft: 24, height: "100%", display: "flex", alignItems: "center" }}>
          <div style={{ width: 24, height: 24, display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden", padding: 2 }}>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M2 3C2 2.44772 2.44772 2 3 2H8V0H3C1.34315 0 0 1.34315 0 3V8H2V3Z" fill="black"/>
              <path d="M12 0V2H17C17.5523 2 18 2.44772 18 3V8H20V3C20 1.34315 18.6569 0 17 0H12Z" fill="black"/>
              <path d="M20 12V17C20 18.6569 18.6569 20 17 20H12V18H17C17.5523 18 18 17.5523 18 17V12H20Z" fill="black"/>
              <path d="M2 12H0V17C0 18.6569 1.34315 20 3 20H8V18H3C2.44772 18 2 17.5523 2 17V12Z" fill="black"/>
            </svg>
          </div>
        </div>
        {/* Center: "Groups" title */}
        <div style={{ flex: 1, textAlign: "center", paddingLeft: 82, paddingRight: 82 }}>
          <span style={{ fontFamily: T.font, fontSize: 17, fontWeight: 700, lineHeight: "22px", color: T.textPri }}>Groups</span>
        </div>
        {/* Trailing: messaging + settings */}
        <div style={{ position: "absolute", right: 0, paddingRight: 24, height: "100%", display: "flex", alignItems: "center", gap: 16 }}>
          <div style={{ width: 24, height: 24, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <svg width="24" height="23" viewBox="0 0 24 23" fill="none">
              <path d="M17 6V3C17 1.34315 15.6569 0 14 0H3C1.34315 0 0 1.34315 0 3V10C0 11.3062 0.834808 12.4175 2 12.8293V15.1893C2 16.7484 3.885 17.5292 4.98744 16.4268L7 14.4142V16C7 17.6569 8.34315 19 10 19H15.5858L19.0126 22.4268C20.115 23.5292 22 22.7484 22 21.1893V18.8293C23.1652 18.4175 24 17.3062 24 16V9C24 7.34315 22.6569 6 21 6H17ZM3 2H14C14.5523 2 15 2.44772 15 3V6H10C8.34315 6 7 7.34315 7 9V11.5858L4 14.5858V11H3C2.44772 11 2 10.5523 2 10V3C2 2.44772 2.44772 2 3 2ZM22 9V16C22 16.5523 21.5523 17 21 17H20V20.5858L16.4142 17H10C9.44772 17 9 16.5523 9 16V9C9 8.44772 9.44772 8 10 8H21C21.5523 8 22 8.44772 22 9Z" fill="black"/>
            </svg>
          </div>
          <div style={{ width: 24, height: 24, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <svg width="22.54" height="24" viewBox="0 0 22.54 24" fill="none">
              <path d="M7.27009 12C7.27009 9.79086 9.06095 8 11.2701 8C13.4792 8 15.2701 9.79086 15.2701 12C15.2701 14.2091 13.4792 16 11.2701 16C9.06095 16 7.27009 14.2091 7.27009 12ZM11.2701 10C10.1655 10 9.27009 10.8954 9.27009 12C9.27009 13.1046 10.1655 14 11.2701 14C12.3747 14 13.2701 13.1046 13.2701 12C13.2701 10.8954 12.3747 10 11.2701 10Z" fill="black"/>
              <path d="M8.1105 1.51493C8.33308 0.624594 9.13305 0 10.0508 0H12.4892C13.407 0 14.2069 0.624594 14.4295 1.51493L15.0812 4.12161C15.4661 4.30814 15.8352 4.52197 16.186 4.76053L18.7705 4.0212C19.6529 3.76879 20.5937 4.14929 21.0526 4.94407L22.2718 7.05582C22.7307 7.85061 22.5898 8.85569 21.93 9.49363L19.9972 11.3625C20.0124 11.5732 20.0201 11.7858 20.0201 12C20.0201 12.2141 20.0124 12.4266 19.9972 12.6372L21.9302 14.5063C22.59 15.1442 22.7309 16.1493 22.272 16.9441L21.0528 19.0558C20.5939 19.8506 19.653 20.2311 18.7707 19.9787L16.1861 19.2393C15.8354 19.478 15.4662 19.6918 15.0812 19.8784L14.4295 22.4851C14.2069 23.3754 13.407 24 12.4892 24H10.0508C9.13305 24 8.33308 23.3754 8.1105 22.4851L7.45881 19.8783C7.07383 19.6918 6.70473 19.4779 6.354 19.2393L3.76934 19.9787C2.88699 20.2311 1.9461 19.8506 1.48723 19.0558L0.268004 16.9441C-0.190863 16.1493 -0.049932 15.1442 0.609829 14.5063L2.54297 12.6371C2.52779 12.4266 2.52009 12.2141 2.52009 12C2.52009 11.7858 2.5278 11.5733 2.54299 11.3626L0.610004 9.49361C-0.0497559 8.85568 -0.190687 7.85059 0.268181 7.05581L1.4874 4.94405C1.94627 4.14927 2.88717 3.76878 3.76951 4.02118L6.35417 4.76055C6.70485 4.52201 7.0739 4.30821 7.45881 4.1217L8.1105 1.51493ZM12.4892 2L10.0508 2L9.15918 5.5664L8.69334 5.75898C8.14057 5.98749 7.62435 6.28757 7.1563 6.64795L6.75641 6.95584L3.21946 5.94405L2.00023 8.05581L4.64359 10.6117L4.57801 11.1109C4.53984 11.4014 4.52009 11.6981 4.52009 12C4.52009 12.3018 4.53983 12.5984 4.57798 12.8889L4.64354 13.388L2.00006 15.9441L3.21928 18.0558L6.75627 17.044L7.15616 17.3519C7.62425 17.7124 8.14052 18.0125 8.69334 18.241L9.15918 18.4336L10.0508 22L12.4892 22L13.3808 18.4337L13.8467 18.2411C14.3996 18.0125 14.9159 17.7124 15.384 17.352L15.7839 17.0441L19.3207 18.0558L20.54 15.9441L17.8966 13.3882L17.9622 12.889C18.0003 12.5985 18.0201 12.3018 18.0201 12C18.0201 11.6981 18.0003 11.4013 17.9622 11.1108L17.8966 10.6116L20.5398 8.05583L19.3206 5.94407L15.7837 6.95582L15.3839 6.64793C14.9158 6.28753 14.3995 5.98744 13.8467 5.75892L13.3808 5.56635L12.4892 2Z" fill="black"/>
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}
function PhoneShell({ children, screenRef, bgColor }) {
  const frameColor = bgColor === "#FC5200" ? "#000000" : T.orange;
  return (
    <div ref={screenRef} style={{ display: "inline-block" }}>
      <div style={{ position: "relative", width: 391, borderRadius: 44, background: frameColor, padding: 8, flexShrink: 0, overflow: "hidden" }}>
        <div style={{ borderRadius: 36, overflow: "hidden", background: T.bgSunken, position: "relative", width: 375, height: 812 }}>
          <div style={{ height: 812, overflowY: "auto", display: "flex", flexDirection: "column", scrollbarWidth: "none", msOverflowStyle: "none" }}>
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
    <div style={{ background: "#fff", boxShadow: "0px -0.5px 0px 0px rgba(0,0,0,0.25)", display: "flex", flexDirection: "column", alignItems: "center", gap: 22, paddingTop: 7, paddingBottom: 1, paddingLeft: 11, paddingRight: 11, flexShrink: 0, position: "sticky", bottom: 0, zIndex: 10, marginTop: "auto" }}>
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
                <span style={{ fontFamily: T.font, fontWeight: 700, fontSize: 11, lineHeight: "13px", color, textAlign: "center", whiteSpace: "nowrap", display: "block", width: 53 }}>{label}</span>
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
    <img src={FACEPILE_IMG} alt="" style={{ height: 24, width: "auto", display: "block", flexShrink: 0 }}/>
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
  TopNav, TopNavHome, TopNavGroups, PhoneShell, BottomNav,
  Facepile, HeroBadge, InfoRow, OrangeBtn, SponsorCard, InfoRows,
  StatsGrid, FeaturedAthletes, ProgressCard, Leaderboard, DescriptionSection,
});
