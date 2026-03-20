/**
 * tokens-icons.js
 * Design tokens, hooks, avatar data, and all SVG icon components.
 * ─────────────────────────────────────────────────────────────
 * EDIT THIS FILE when: changing colours/fonts, adding new icons,
 * or modifying the status bar / font loader.
 */

// Shared namespace — every module registers onto window.MT
window.MT = window.MT || {};

const { useState, useRef, useCallback, useEffect } = React;

// --- Design tokens -----------------------------------------------------------
const T = {
  orange:    "#FC5200",
  textPri:   "#000000",
  textSec:   "#43423F",
  textTer:   "#64635E",
  bgSurface: "#FFFFFF",
  bgSunken:  "#F2F2F0",
  divider:   "rgba(0,0,0,0.10)",
  font:      "'Boathouse', 'Helvetica Neue', Helvetica, Arial, sans-serif",
  fontMaison:"'Maison Neue', 'Helvetica Neue', Helvetica, Arial, sans-serif",
};

// --- Font loader -------------------------------------------------------------
function useFonts() {
  useEffect(() => {
    const s = document.createElement("style");
    s.textContent = "*{box-sizing:border-box;margin:0;padding:0;} *::-webkit-scrollbar{display:none;}";
    document.head.appendChild(s);
  }, []);
}

// --- html2canvas loader ------------------------------------------------------
function useHtml2Canvas() {
  const [ready, setReady] = useState(false);
  useEffect(() => {
    if (window.html2canvas) { setReady(true); return; }
    const s = document.createElement("script");
    s.src = "https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js";
    s.onload = () => setReady(true);
    document.head.appendChild(s);
  }, []);
  return ready;
}

// --- Avatar constants --------------------------------------------------------
const FALLBACK_COLORS = ["#7B9E87","#4A7FA5","#C97B63"];

const MILESTONE_AVATAR = "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAA0JCgsKCA0LCgsODg0PEyAVExISEyccHhcgLikxMC4pLSwzOko+MzZGNywtQFdBRkxOUlNSMj5aYVpQYEpRUk//2wBDAQ4ODhMREyYVFSZPNS01T09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0//wAARCAAxADEDASIAAhEBAxEB/8QAGwABAAIDAQEAAAAAAAAAAAAAAAUGAgMEBwH/xAA3EAABAwMCAwQHBgcAAAAAAAABAgMEAAURITEGEhMUQVFhFiIyQnGBsRU0cpGS0SMzVWN0oaL/xAAZAQADAQEBAAAAAAAAAAAAAAAAAwQCBQH/xAAnEQADAAAFAwIHAAAAAAAAAAAAAQIDERIhcTFBwRMiUWGR0eHg8f/aAAwDAQACEQMRAD8Av1wec7Q2w24WwUlRI3rm6byj98eH4qyuSsXVkf2j9TWCnQgFSjgDUnGamfup5lTbiZy+AMaQdrhIH4q1rhy/6lJ/UajXrrcHPu6IjKc4/iSkpcHkRyqT9a2pukxhKDKQhzmOFNlxCXUjxGDyr/5PlWdMfrPfVxF/F9jOZ2yBFU+Jz7iiQhIWs8qc951rXbp0+LcWGpUkuqfXhTR9blB97IOn7VLLablMFDiQptae8ePf5Go+zxojPEb8ZtjJZaC0rWrmIJI28KVWFSxE5e3JTh48VhUrWb4RZqUpXQOWQN3KvtphKRk9EnHzNRt7UsRWEqWENOPpS6rPu4JwfIkAfOu69E+kEYDOegfqa4btJag2x+RJShxtKf5azos50Gvnip4nVq58Ioxq06OPLImDLLchao1qSw6tBWhSEoK3kdwKvdycaa48iKiZjV7lSHm7haWAltJX1ENZ5dfaCsnJ78a6DUYr7Zbq6z2MvPNPMtNqSoAjqNJ03GdUjAOcaDOatz0mPLCG23+V10eonvPmPEAa5FIdNPLIomZ6nbF6cSExHaTyobQEgfKueyr5+L5v+Mn6iu49nTkc+fjUbYiPTSeBt2VOPzFUZbrknh7Vx5RbKUpTycrPFAlxZrFyjxy+222UKA7t9/Aa71SONL12tiKwxzdLk6jmnqqWdAkjuIAJ3O/fjNeu1CXbha13RKipkMuq99sYz8RsaToqW3PcoVxaSvZrv+DxRpC1AErIx7I8P2q68DNx3XFh95SpEQEsIVgJSlftKTrk7AEbDPio1pu/A9zgkrjN9qazuyMn9O/5Zrbw9wpflyjIQpduSUFtTjgwopJBICd+4b42o1fIHh7dVkWmfcoVsb55TraSRondR+ArTwkiRNvc28GM4xFdaS011Rgr2OQPDT/dSVq4Utluc680Klyty9IPMc+Q2H186la2pbebMOplNT9RSlK2KFKUoAUpSgBSlKAFKUoA/9k=";

const SUBSCRIBER_AVATAR = "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDABALDA4MChAODQ4SERATGCgaGBYWGDEjJR0oOjM9PDkzODdASFxOQERXRTc4UG1RV19iZ2hnPk1xeXBkeFxlZ2P/2wBDARESEhgVGC8aGi9jQjhCY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2P/wAARCAAwADADASIAAhEBAxEB/8QAGwAAAgIDAQAAAAAAAAAAAAAAAwQFBgABAgf/xAA0EAACAQMCAwYEAwkAAAAAAAABAgMABAUREiExQQYTUWFxgRQikaEVscEmMkNEU1RiY/D/xAAYAQEAAwEAAAAAAAAAAAAAAAADAQIEAP/EACERAAICAQMFAQAAAAAAAAAAAAECABESAyFxEzFBUcHx/9oADAMBAAIRAxEAPwC5Xsr9+kKOUBUsSOdA7uU/zUo963ftpkoh/rNctKEUseQ41nO5NzRZUCvUw20x5Xs/1rhrS4/v5/rUfJkb2U6Q/Cxjwacbx9iKKMlNBs+IaFweDKZUV18x0b7VGKyeo4/BN3fxVlCHW7ld3YIC7aBdetZjLu7hv4reeZpWlJ3xnjs68/H9KkJIY7iIpIoaNh/xFKYaK3jy13DHCAYAu12bU8fyoyjBxido66qtpMGG/AhcmT+LQhefdE/ekMuxW3i3ttiMg7w+QBOh9dKbypP43bgf0T+ZpLK3KWWOmmlCsNNAr8mJ5CnVby5mXUNYcfTELSeVHkWGwSGRlLps26yDoC3vUdPbZa4nkW9sotqaEOsY4ceYPM+laxOSaI27STpLGiFWXXR05fUDT2qytcwXTRxrJo8nzBepHUigJINVHAXvHUKW8EcUa7URQqjwApfBtuz2TPklNkwjUAk+tI4A/tDlR5R09biAp2bj6IXtBHdw3UV9bQ96EjKEDjp5+lU7tTlGu1gRAwjVdz+Bc9CPL9a9PqNyWCsciCZYtkh/iJwPv4+9WxIJKzg6sAG8eZ5LGjEAsx8qt3Y9Ldu9DsxuIRoobkEbntHqONDyfY29tmLWgFyn+PBh6g/pRsN2TyZkMs07WKsu1tp1dh4aDlXWfUkoK7ipL32Ws8eNssitIeAjT5mPtROzNvcteX2RuLdrdLnaI43/AHtB1NSGNwWPxnzQQhpessnzOffp7VI1YA3ZlCygUs//2Q==";

const AVATAR_IMG = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Ccircle cx='12' cy='8' r='4' fill='%23aaa'/%3E%3Cpath d='M4 20c0-4 3.6-7 8-7s8 3 8 7' fill='%23aaa'/%3E%3C/svg%3E";

// --- SVG Icons ---------------------------------------------------------------
const IcoDate = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <path d="M9 2V1H7V2H4C2.34315 2 1 3.34315 1 5V16.0633C1 16.9536 1.39547 17.7979 2.07945 18.3679L6.80355 22.3047C7.34269 22.754 8.02229 23 8.7241 23H20C21.6569 23 23 21.6569 23 20V5C23 3.34315 21.6569 2 20 2H17V1H15V2L9 2ZM15 4V6H17V4H20C20.5523 4 21 4.44772 21 5V7H3V5C3 4.44772 3.44772 4 4 4H7V6H9V4H15ZM3 15V9H21V20C21 20.5523 20.5523 21 20 21H10V15H3ZM3.56205 17H8V20.6983L3.56205 17Z" fill="#43423F"/>
  </svg>
);
const IcoActivityType = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M8.68843 0C8.02519 0 7.37985 0.215115 6.84926 0.613058L3.52982 3.10263L0.683772 4.05132C0.27543 4.18743 0 4.56957 0 5C0 6.57896 0.196721 7.77215 0.566654 8.73398C0.942709 9.71172 1.4741 10.3883 2.04289 10.9571C2.34815 11.2624 2.64313 11.524 2.92865 11.7772C3.71439 12.4741 4.42845 13.1075 5.08755 14.4114C6.12048 16.9818 7.45819 19.1594 9.53364 20.6814C11.6286 22.2177 14.3564 23 18 23C20.1284 23 21.5871 22.4466 22.5488 21.589C23.5046 20.7365 23.8434 19.6954 23.9567 18.9614C24.1091 17.974 23.5681 17.1739 22.9903 16.7116L19.0976 13.5974C18.9434 13.4741 18.8292 13.3079 18.7693 13.1198L15.6746 3.39359C15.4106 2.56364 14.6397 2 13.7688 2H12.3333C11.9006 2 11.4795 2.14036 11.1333 2.4L10.5624 2.82823L10.0471 1.02486C9.8738 0.418234 9.31933 0 8.68843 0ZM8.04926 2.21306C8.11793 2.16155 8.19214 2.11886 8.27014 2.08556L9.43763 6.17177L12.3333 4H13.7688L14.7233 7H12V9H15.3597L15.6779 10H13V12H16.3142L16.8635 13.7262C17.043 14.2906 17.3857 14.7892 17.8482 15.1592L20.9541 17.6439C20.1845 17.8341 19.1757 18 18 18C16.0293 18 14.8222 17.5686 13.9543 16.913C13.0586 16.2364 12.4085 15.2379 11.7029 13.8574C11.4792 13.4196 11.2536 12.95 11.0153 12.4539C9.87512 10.0805 8.4437 7.10083 5.53063 4.10203L8.04926 2.21306ZM3.74301 5.13976C6.64458 7.99752 7.99727 10.8037 9.18432 13.2663C9.43326 13.7827 9.67493 14.2841 9.92207 14.7676C10.654 16.1996 11.4727 17.5449 12.7488 18.5089C14.0528 19.4939 15.7207 20 18 20C19.4917 20 20.7544 19.7699 21.6844 19.5211C21.5709 19.7199 21.4194 19.9164 21.2175 20.0964C20.7177 20.5421 19.7824 21 18 21C14.6436 21 12.3714 20.2823 10.7164 19.0686C9.05256 17.8485 7.89336 16.0408 6.92848 13.6286C6.91818 13.6029 6.90682 13.5776 6.89443 13.5528C6.04076 11.8454 4.94668 10.8797 4.10422 10.1361C3.86433 9.92436 3.64484 9.73062 3.45711 9.54289C3.0259 9.11169 2.68229 8.66328 2.43335 8.01602C2.2238 7.47119 2.06607 6.74505 2.01646 5.71527L3.74301 5.13976Z" fill="#43423F"/>
  </svg>
);
const IcoReward = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M4 1C4 0.447715 4.44772 0 5 0H19C19.5523 0 20 0.447715 20 1V2H22C23.1046 2 24 2.89543 24 4V8C24 10.7614 21.7614 13 19 13H17.8137C16.6544 14.5527 15.0821 15.8043 13.2141 16.579L13 16.6679V18.5194L17.6247 22.2191C17.9563 22.4844 18.0842 22.9303 17.9436 23.331C17.8031 23.7318 17.4247 24 17 24H7C6.57531 24 6.19695 23.7318 6.05637 23.331C5.9158 22.9303 6.04368 22.4844 6.37531 22.2191L11 18.5194V16.6679L10.7859 16.579C8.91785 15.8043 7.34555 14.5527 6.18629 13H5C2.23858 13 0 10.7614 0 8V4C0 2.89543 0.895431 2 2 2H4V1ZM19.0006 11C20.6572 10.9997 22 9.65664 22 8V4H20V6.41828C20 8.03301 19.647 9.59006 19.0006 11ZM18 2H6V6.41828C6 10.0569 8.19101 13.3376 11.5521 14.7316L12 14.9174L12.4479 14.7316C15.809 13.3376 18 10.0569 18 6.41828V2ZM4 6.41828V4H2V8C2 9.65664 3.3428 10.9997 4.99936 11C4.35303 9.59006 4 8.03301 4 6.41828ZM14.1492 22L12 20.2806L9.85078 22H14.1492Z" fill="#43423F"/>
  </svg>
);
const IcoBackArrow = () => (
  <svg width="13" height="22" viewBox="0 0 13 22" fill="none">
    <path d="M11 1.5L1.5 11L11 20.5" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);
const IcoStrava = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill={T.orange}>
    <path d="M10.5 0L6 8.7H0l10.5 15.3 3.5-5.1-6.4-10.2h4.3L14.4 0z"/>
    <path d="M14.4 0l2 8.7h4.3L14.4 24 10.5 8.7h4.2z" opacity="0.55"/>
  </svg>
);
const IcoDownload = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>
  </svg>
);
const IcoBattery = () => (
  <svg width="27" height="13" viewBox="0 0 27 13" fill="none">
    <rect x="0.5" y="0.5" width="23" height="12" rx="3.5" stroke="black" strokeOpacity="0.35"/>
    <rect x="2" y="2" width="19" height="9" rx="2" fill="black"/>
    <path d="M25 4.5v4a2 2 0 000-4z" fill="black" fillOpacity="0.4"/>
  </svg>
);
const IcoWifi = () => (
  <svg width="16" height="12" viewBox="0 0 16 12" fill="none">
    <path d="M8 9.5a1.5 1.5 0 110 2.5 1.5 1.5 0 010-2.5z" fill="black"/>
    <path d="M4.9 7a4.5 4.5 0 016.2 0" stroke="black" strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M2.1 4.2a8 8 0 0111.8 0" stroke="black" strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M0 1.5A11 11 0 0116 1.5" stroke="black" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);
const IcoCellular = () => (
  <svg width="17" height="12" viewBox="0 0 17 12" fill="none">
    <rect x="0" y="6" width="3" height="6" rx="1" fill="black"/>
    <rect x="4.5" y="4" width="3" height="8" rx="1" fill="black"/>
    <rect x="9" y="2" width="3" height="10" rx="1" fill="black"/>
    <rect x="13.5" y="0" width="3" height="12" rx="1" fill="black"/>
  </svg>
);

// --- Bottom Nav Icons (full SVG paths from Figma) ----------------------------
const NAV_ICONS = {
  home: (
    <svg preserveAspectRatio="none" width="22" height="21.1716" viewBox="0 0 22 21.1716" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M3 21.1716C1.34315 21.1716 0 19.8284 0 18.1716V11C0 10.2044 0.31607 9.44129 0.87868 8.87868L8.87868 0.87868C10.0503 -0.292893 11.9497 -0.292893 13.1213 0.87868L21.1213 8.87868C21.6839 9.44129 22 10.2044 22 11V18.1716C22 19.8284 20.6569 21.1716 19 21.1716H3ZM10.2929 2.29289L2.29289 10.2929C2.10536 10.4804 2 10.7348 2 11V18.1716C2 18.7239 2.44772 19.1716 3 19.1716H6V16C6 15.2044 6.31607 14.4413 6.87868 13.8787L8.87868 11.8787C10.0503 10.7071 11.9497 10.7071 13.1213 11.8787L15.1213 13.8787C15.6839 14.4413 16 15.2044 16 16V19.1716H19C19.5523 19.1716 20 18.7239 20 18.1716V11C20 10.7348 19.8946 10.4804 19.7071 10.2929L11.7071 2.29289C11.3166 1.90237 10.6834 1.90237 10.2929 2.29289ZM14 19.1716V16C14 15.7348 13.8946 15.4804 13.7071 15.2929L11.7071 13.2929C11.3166 12.9024 10.6834 12.9024 10.2929 13.2929L8.29289 15.2929C8.10536 15.4804 8 15.7348 8 16V19.1716H14Z" fill="var(--fill-0, black)"/>
    </svg>
  ),
  maps: (
    <svg width="23" height="22" viewBox="0 0 23 22" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path fillRule="evenodd" clipRule="evenodd" d="M21.4435 7.42302C22.3198 7.94678 22.9066 8.90486 22.9066 10V19C22.9066 20.6569 21.5635 22 19.9066 22H2.50373C0.579583 22 -0.623276 19.9174 0.338263 18.2507L5.96318 8.50083C6.49896 7.57216 7.4896 7 8.56174 7H12.2302C12.0294 6.33862 11.9065 5.66343 11.9065 5C11.9065 3.34362 12.5525 2.06298 13.5445 1.21017C14.5129 0.37775 15.7537 0 16.9065 0C18.0593 0 19.3001 0.37775 20.2685 1.21017C21.2605 2.06298 21.9065 3.34362 21.9065 5C21.9065 5.8056 21.7253 6.62853 21.4435 7.42302ZM15.5096 12.6268C15.1193 12.1529 14.5978 11.4826 14.0744 10.6976C13.7375 10.1921 13.3846 9.61718 13.0637 9H12.9267L10.619 15H20.9066V10C20.9066 9.71706 20.7891 9.46156 20.6002 9.27965C20.321 9.79113 20.0241 10.2693 19.7385 10.6976C19.2152 11.4826 18.6937 12.1529 18.3034 12.6268C17.9056 13.1098 17.4798 13.5658 17.0531 14.0228C17.0042 14.0751 16.9554 14.1275 16.9065 14.1799C16.8576 14.1275 16.8087 14.0751 16.7599 14.0228C16.3332 13.5658 15.9074 13.1098 15.5096 12.6268ZM13.9065 5C13.9065 3.90569 14.3137 3.18633 14.8483 2.72681C15.4066 2.2469 16.1658 2 16.9065 2C17.6472 2 18.4064 2.2469 18.9647 2.72681C19.4992 3.18633 19.9065 3.90569 19.9065 5C19.9065 6.39419 19.0623 8.10638 18.0744 9.58816C17.6601 10.2097 17.2444 10.7559 16.9065 11.175C16.5686 10.7559 16.1529 10.2097 15.7385 9.58816C14.7507 8.10638 13.9065 6.39419 13.9065 5ZM7.69555 9.50028C7.87415 9.19072 8.20436 9 8.56174 9H10.7838L6.55306 20H2.50373C2.1189 20 1.87833 19.5835 2.07063 19.2501L7.69555 9.50028ZM20.9066 17H16.3608L15.7839 20H19.9066C20.4589 20 20.9066 19.5523 20.9066 19V17ZM13.7473 20L14.3242 17H9.84974L8.69589 20H13.7473Z" fill="var(--fill-0, black)"/>
    </svg>
  ),
  record: (
    <svg preserveAspectRatio="none" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 19C15.866 19 19 15.866 19 12C19 8.13401 15.866 5 12 5C8.13401 5 5 8.13401 5 12C5 15.866 8.13401 19 12 19Z" fill="var(--fill-0, black)"/>
      <path d="M12 0C5.37258 0 0 5.37258 0 12C0 18.6274 5.37258 24 12 24C18.6274 24 24 18.6274 24 12C24 5.37258 18.6274 0 12 0ZM2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12Z" fill="var(--fill-0, black)"/>
    </svg>
  ),
  groups: (
    <svg preserveAspectRatio="none" width="23.6092" height="21.7756" viewBox="0 0 23.6092 21.7756" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M10.2365 0.758591C11.0372 -0.252864 12.5719 -0.252864 13.3727 0.758591L18.1303 6.76821C18.145 6.78681 18.159 6.8058 18.1722 6.82514L23.1773 13.1474C23.7532 13.8748 23.7532 14.9028 23.1773 15.6302L18.9127 21.017C18.112 22.0285 16.5773 22.0285 15.7766 21.017L11.8046 15.9998L7.83266 21.017C7.03192 22.0285 5.49721 22.0285 4.69647 21.017L0.431908 15.6302C-0.143969 14.9028 -0.143969 13.8748 0.431908 13.1474L5.43653 6.82575C5.44986 6.80619 5.46397 6.787 5.47885 6.76821L10.2365 0.758591ZM11.8046 12.7777L16.0708 7.38889L11.8046 2L7.53839 7.38884L11.8046 12.7777ZM6.26451 9.00203L2 14.3888L6.26456 19.7756L10.5291 14.3888L6.26451 9.00203ZM17.3447 9.00199L13.0801 14.3888L17.3446 19.7756L21.6092 14.3888L17.3447 9.00199Z" fill="var(--fill-0, black)"/>
    </svg>
  ),
  you: (
    <svg preserveAspectRatio="none" width="20" height="24" viewBox="0 0 20 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M7 14H5V19H7V14Z" fill="var(--fill-0, black)"/>
      <path d="M11 12V19H9V12H11Z" fill="var(--fill-0, black)"/>
      <path d="M15 10H13V19H15V10Z" fill="var(--fill-0, black)"/>
      <path d="M2 2H5.99963C6.91184 0.785553 8.36418 0 10 0C11.6358 0 13.0882 0.785553 14.0004 2H18C19.1046 2 20 2.89543 20 4V22C20 23.1046 19.1046 24 18 24H2C0.89543 24 0 23.1046 0 22V4C0 2.89543 0.895431 2 2 2ZM5 5C5 4.65753 5.03443 4.32311 5.10002 4H2V22H18V4H15.0001V7H5.00008L5 5ZM7.00008 4.97851V5H13C13 3.34315 11.6569 2 10 2C8.35031 2 7.01163 3.33155 7.00008 4.97851Z" fill="var(--fill-0, black)"/>
    </svg>
  ),
};

const NAV_TABS = [
  { key: "home",   label: "Home",   w: 22,       h: 21.1716 },
  { key: "maps",   label: "Maps",   w: 23,       h: 22      },
  { key: "record", label: "Record", w: 24,       h: 24      },
  { key: "groups", label: "Groups", w: 23.6092,  h: 21.7756 },
  { key: "you",    label: "You",    w: 20,       h: 24      },
];

// --- Register onto shared namespace ------------------------------------------
Object.assign(window.MT, {
  T, useFonts, useHtml2Canvas, FALLBACK_COLORS, MILESTONE_AVATAR,
  SUBSCRIBER_AVATAR, AVATAR_IMG, NAV_ICONS, NAV_TABS,
  IcoDate, IcoActivityType, IcoReward, IcoBackArrow, IcoStrava,
  IcoDownload, IcoBattery, IcoWifi, IcoCellular,
});
