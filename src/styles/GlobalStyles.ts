import { createGlobalStyle } from 'styled-components';

/* ============================================================
   Daniel Aboo — Portfolio Design System
   "Precision / AI" : clean monochrome base + electric accent.
   Ported from the Claude Design handoff (HTML/CSS prototype)
   into the React app as a global stylesheet. Light + dark via
   the [data-theme] attribute on <html> (see ThemeModeContext).
   ============================================================ */
export const GlobalStyles = createGlobalStyle`
  /* ---------- Tokens ---------- */
  :root {
    --font-sans: 'Geist', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
    --font-mono: 'Geist Mono', ui-monospace, 'SF Mono', Menlo, monospace;

    /* Light theme (default) */
    --bg:        oklch(0.985 0.002 250);
    --bg-2:      oklch(0.965 0.003 250);
    --surface:   oklch(1 0 0);
    --surface-2: oklch(0.978 0.003 250);
    --text:      oklch(0.20 0.012 264);
    --text-2:    oklch(0.44 0.012 264);
    --text-3:    oklch(0.60 0.010 264);
    --border:    oklch(0.91 0.005 264);
    --border-2:  oklch(0.86 0.006 264);
    --accent:    oklch(0.58 0.20 256);
    --accent-2:  oklch(0.52 0.21 256);
    --accent-soft: oklch(0.58 0.20 256 / 0.10);
    --accent-glow: oklch(0.58 0.20 256 / 0.22);
    --shadow-sm: 0 1px 2px oklch(0.2 0.02 264 / 0.06), 0 1px 3px oklch(0.2 0.02 264 / 0.05);
    --shadow-md: 0 4px 16px oklch(0.2 0.02 264 / 0.07), 0 1px 4px oklch(0.2 0.02 264 / 0.05);
    --shadow-lg: 0 20px 50px oklch(0.2 0.02 264 / 0.12), 0 6px 18px oklch(0.2 0.02 264 / 0.07);

    --maxw: 1180px;
    --gutter: clamp(1.25rem, 4vw, 3rem);
    --radius: 14px;
    --radius-lg: 22px;
    --ease: cubic-bezier(0.22, 1, 0.36, 1);
  }

  [data-theme="dark"] {
    --bg:        oklch(0.165 0.008 264);
    --bg-2:      oklch(0.195 0.009 264);
    --surface:   oklch(0.205 0.010 264);
    --surface-2: oklch(0.235 0.011 264);
    --text:      oklch(0.965 0.003 264);
    --text-2:    oklch(0.74 0.010 264);
    --text-3:    oklch(0.58 0.012 264);
    --border:    oklch(0.30 0.012 264);
    --border-2:  oklch(0.36 0.013 264);
    --accent:    oklch(0.72 0.17 256);
    --accent-2:  oklch(0.78 0.15 256);
    --accent-soft: oklch(0.72 0.17 256 / 0.14);
    --accent-glow: oklch(0.72 0.17 256 / 0.30);
    --shadow-sm: 0 1px 2px oklch(0 0 0 / 0.4);
    --shadow-md: 0 6px 22px oklch(0 0 0 / 0.45);
    --shadow-lg: 0 28px 60px oklch(0 0 0 / 0.55);
  }

  * { box-sizing: border-box; }

  html { scroll-behavior: smooth; }
  @media (prefers-reduced-motion: reduce) {
    html { scroll-behavior: auto; }
    *, *::before, *::after { animation-duration: 0.001ms !important; transition-duration: 0.001ms !important; }
  }

  body {
    margin: 0;
    font-family: var(--font-sans);
    background: var(--bg);
    color: var(--text);
    line-height: 1.6;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    font-feature-settings: "cv01", "ss01";
    transition: background 0.5s var(--ease), color 0.5s var(--ease);
    overflow-x: hidden;
  }

  ::selection { background: var(--accent-glow); color: var(--text); }

  a { color: inherit; text-decoration: none; }
  img { display: block; max-width: 100%; }
  button { font-family: inherit; }

  /* ---------- Typography ---------- */
  .kicker {
    font-family: var(--font-mono);
    font-size: 0.78rem;
    font-weight: 500;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: var(--text-3);
    display: inline-flex;
    align-items: center;
    gap: 0.6rem;
  }
  .kicker .idx { color: var(--accent); }
  .kicker::before {
    content: "";
    width: 1.6rem; height: 1px;
    background: var(--border-2);
    display: inline-block;
  }

  .display {
    font-size: clamp(2.8rem, 8vw, 6.5rem);
    font-weight: 600;
    letter-spacing: -0.04em;
    line-height: 0.96;
    margin: 0;
  }
  h2.section-title, .section-title {
    font-size: clamp(1.9rem, 4.2vw, 3.2rem);
    letter-spacing: -0.03em;
    font-weight: 600;
    line-height: 1.05;
    max-width: 16ch;
    margin: 0;
  }
  .lead {
    font-size: clamp(1.05rem, 1.6vw, 1.3rem);
    color: var(--text-2);
    line-height: 1.55;
    font-weight: 400;
    max-width: 60ch;
    margin: 0;
  }
  .muted { color: var(--text-2); }
  .accent-text { color: var(--accent); }

  /* ---------- Layout ---------- */
  .wrap { max-width: var(--maxw); margin-inline: auto; padding-inline: var(--gutter); }
  section { position: relative; }
  .section-pad { padding-block: clamp(4.5rem, 10vw, 9rem); }
  .divider { height: 1px; background: var(--border); width: 100%; }

  /* ---------- Buttons ---------- */
  .btn {
    display: inline-flex;
    align-items: center;
    gap: 0.55rem;
    font-family: var(--font-sans);
    font-size: 0.95rem;
    font-weight: 500;
    letter-spacing: -0.01em;
    padding: 0.85rem 1.4rem;
    border-radius: 999px;
    border: 1px solid transparent;
    cursor: pointer;
    transition: transform 0.3s var(--ease), background 0.3s var(--ease),
                border-color 0.3s var(--ease), box-shadow 0.3s var(--ease), color 0.3s var(--ease);
    white-space: nowrap;
  }
  .btn:active { transform: scale(0.97); }
  .btn-primary {
    background: var(--accent);
    color: oklch(0.99 0 0);
    box-shadow: 0 6px 22px var(--accent-glow);
  }
  [data-theme="dark"] .btn-primary { color: oklch(0.15 0.01 264); }
  .btn-primary:hover { background: var(--accent-2); transform: translateY(-2px); box-shadow: 0 10px 30px var(--accent-glow); }
  .btn-ghost {
    background: transparent;
    color: var(--text);
    border-color: var(--border-2);
  }
  .btn-ghost:hover { border-color: var(--text); transform: translateY(-2px); background: var(--surface-2); }
  .btn .arrow { transition: transform 0.3s var(--ease); }
  .btn:hover .arrow { transform: translateX(3px); }

  /* ---------- Nav ---------- */
  .nav {
    position: sticky; top: 0; z-index: 100;
    backdrop-filter: saturate(180%) blur(18px);
    -webkit-backdrop-filter: saturate(180%) blur(18px);
    background: color-mix(in oklch, var(--bg) 72%, transparent);
    border-bottom: 1px solid transparent;
    transition: border-color 0.4s var(--ease), background 0.4s var(--ease);
  }
  .nav.scrolled { border-bottom-color: var(--border); }
  .nav-inner {
    max-width: var(--maxw); margin-inline: auto;
    padding: 0.9rem var(--gutter);
    display: flex; align-items: center; justify-content: space-between;
    gap: 1rem;
  }
  .brand { display: flex; align-items: center; gap: 0.7rem; font-weight: 600; letter-spacing: -0.02em; }
  .brand .mark {
    width: 34px; height: 34px; border-radius: 9px;
    display: grid; place-items: center;
    background: var(--text); color: var(--bg);
    font-family: var(--font-mono); font-weight: 600; font-size: 0.95rem;
    transition: background 0.4s var(--ease), color 0.4s var(--ease);
  }
  .brand small { font-family: var(--font-mono); font-size: 0.7rem; color: var(--text-3); display: block; line-height: 1; margin-top: 2px; letter-spacing: 0.02em; }

  .nav-links { display: flex; align-items: center; gap: 0.35rem; }
  .nav-link {
    font-size: 0.92rem; font-weight: 450; color: var(--text-2);
    padding: 0.5rem 0.9rem; border-radius: 999px;
    position: relative; transition: color 0.25s var(--ease), background 0.25s var(--ease);
    background: transparent; border: none; cursor: pointer;
  }
  .nav-link:hover { color: var(--text); }
  .nav-link.active { color: var(--text); }
  .nav-link.active::after {
    content: ""; position: absolute; left: 50%; bottom: 0.1rem; transform: translateX(-50%);
    width: 4px; height: 4px; border-radius: 50%; background: var(--accent);
  }
  .nav-right { display: flex; align-items: center; gap: 0.6rem; }

  /* theme toggle */
  .theme-toggle {
    width: 38px; height: 38px; border-radius: 999px;
    border: 1px solid var(--border-2); background: var(--surface);
    display: grid; place-items: center; cursor: pointer; color: var(--text-2);
    transition: color 0.25s var(--ease), border-color 0.25s var(--ease), transform 0.4s var(--ease), background 0.25s;
  }
  .theme-toggle:hover { color: var(--text); border-color: var(--text); transform: rotate(18deg); }
  .theme-toggle svg { width: 17px; height: 17px; }
  .theme-toggle .moon { display: none; }
  [data-theme="dark"] .theme-toggle .sun { display: none; }
  [data-theme="dark"] .theme-toggle .moon { display: block; }

  .menu-btn { display: none; background: none; border: none; }

  /* ---------- Mobile slide-out drawer ---------- */
  .nav-drawer { display: none; }
  .nav-drawer-backdrop {
    position: fixed; inset: 0; z-index: 200;
    background: oklch(0 0 0 / 0.45);
    opacity: 0; pointer-events: none; transition: opacity 0.45s var(--ease);
  }
  .nav-drawer.open .nav-drawer-backdrop { opacity: 1; pointer-events: auto; }
  .nav-drawer-panel {
    position: fixed; top: 0; right: 0; bottom: 0; z-index: 210;
    width: min(80vw, 320px);
    display: flex; flex-direction: column; align-items: flex-start;
    justify-content: center; gap: 0.5rem; padding: 2rem;
    background: var(--surface); border-left: 1px solid var(--border);
    box-shadow: var(--shadow-lg);
    transform: translateX(100%);
    transition: transform 0.45s var(--ease);
  }
  .nav-drawer.open .nav-drawer-panel { transform: none; }
  .nav-drawer-panel .nav-link { font-size: 1.4rem; padding: 0.6rem 0; color: var(--text); }
  .nav-drawer-close {
    position: absolute; top: 1.1rem; right: 1.1rem;
    width: 38px; height: 38px; border-radius: 999px;
    border: 1px solid var(--border-2); background: var(--surface);
    display: grid; place-items: center; cursor: pointer; color: var(--text);
  }
  .nav-drawer-close svg { width: 18px; height: 18px; }

  /* ---------- Cards / surfaces ---------- */
  .card {
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: var(--radius-lg);
    transition: border-color 0.35s var(--ease), transform 0.35s var(--ease), box-shadow 0.35s var(--ease), background 0.35s;
  }
  .card:hover { border-color: var(--border-2); }

  /* ---------- Footer ---------- */
  .footer { border-top: 1px solid var(--border); padding-block: clamp(3rem, 6vw, 5rem); margin-top: 2rem; }
  .footer-grid { display: flex; flex-wrap: wrap; gap: 2.5rem; justify-content: space-between; align-items: flex-start; }
  .footer .cta-line { font-size: clamp(1.6rem, 4vw, 2.6rem); font-weight: 600; letter-spacing: -0.03em; line-height: 1.05; max-width: 14ch; margin: 0; }
  .footer-links { display: flex; flex-direction: column; gap: 0.55rem; }
  .footer-links a, .footer-links button {
    color: var(--text-2); font-size: 0.95rem; width: fit-content; transition: color 0.25s;
    background: none; border: none; padding: 0; cursor: pointer; text-align: left; font-family: inherit;
  }
  .footer-links a:hover, .footer-links button:hover { color: var(--accent); }
  .footer-meta { font-family: var(--font-mono); font-size: 0.75rem; color: var(--text-3); }
  .footer-head { font-family: var(--font-mono); font-size: 0.72rem; text-transform: uppercase; letter-spacing: 0.08em; color: var(--text-3); margin-bottom: 0.9rem; }
  .footer-bottom { display: flex; justify-content: space-between; gap: 1rem; flex-wrap: wrap; margin-top: clamp(2.5rem, 5vw, 4rem); padding-top: 1.5rem; border-top: 1px solid var(--border); }

  /* ---------- Reveal animation ---------- */
  .reveal { transition: opacity 0.9s var(--ease), transform 0.9s var(--ease); }
  .reveal:not(.in) { opacity: 0; transform: translateY(26px); }
  .reveal.in { opacity: 1; transform: none; }
  .reveal[data-delay="1"] { transition-delay: 0.08s; }
  .reveal[data-delay="2"] { transition-delay: 0.16s; }
  .reveal[data-delay="3"] { transition-delay: 0.24s; }
  .reveal[data-delay="4"] { transition-delay: 0.32s; }
  .reveal[data-delay="5"] { transition-delay: 0.40s; }

  /* ---------- Pills / tags ---------- */
  .tag {
    font-family: var(--font-mono); font-size: 0.76rem; font-weight: 450;
    color: var(--text-2); padding: 0.34rem 0.7rem;
    border: 1px solid var(--border); border-radius: 999px; background: var(--surface);
    transition: border-color 0.25s, color 0.25s, background 0.25s;
  }
  .tag:hover { border-color: var(--accent); color: var(--accent); }
  .tag-row { display: flex; flex-wrap: wrap; gap: 0.5rem; }

  /* ---------- Status dot ---------- */
  .status {
    display: inline-flex; align-items: center; gap: 0.5rem;
    font-family: var(--font-mono); font-size: 0.78rem; color: var(--text-2);
  }
  .status .dot { width: 8px; height: 8px; border-radius: 50%; background: oklch(0.72 0.17 150); position: relative; }
  .status .dot::after {
    content: ""; position: absolute; inset: -4px; border-radius: 50%;
    background: oklch(0.72 0.17 150 / 0.4); animation: ping 2s ease-out infinite;
  }
  @keyframes ping { 0% { transform: scale(0.6); opacity: 0.8; } 100% { transform: scale(2.4); opacity: 0; } }

  /* ---------- Mobile menu ---------- */
  @media (max-width: 760px) {
    /* hide the inline desktop links; use the slide-out drawer instead */
    .nav-links { display: none; }
    .nav-drawer { display: block; }
    .menu-btn {
      display: grid; place-items: center; width: 38px; height: 38px;
      border-radius: 999px; border: 1px solid var(--border-2); background: var(--surface);
      cursor: pointer; color: var(--text);
    }
    .menu-btn svg { width: 18px; height: 18px; }
  }

  /* ============ HERO ============ */
  .hero {
    position: relative;
    min-height: clamp(620px, 92vh, 940px);
    display: flex;
    align-items: center;
    overflow: hidden;
  }
  .hero-canvas-host { position: absolute; inset: 0; z-index: 0; }
  #hero-canvas { width: 100%; height: 100%; display: block; }
  .hero-fade {
    position: absolute; inset: 0; z-index: 1; pointer-events: none;
    background:
      radial-gradient(80% 60% at 50% 38%, transparent 0%, var(--bg) 78%),
      linear-gradient(to bottom, transparent 60%, var(--bg) 100%);
  }
  .hero-inner { position: relative; z-index: 2; text-align: center; display: flex; flex-direction: column; align-items: center; }
  .status.hero-status {
    padding: 0.5rem 0.95rem; border: 1px solid var(--border-2); border-radius: 999px;
    background: color-mix(in oklch, var(--surface) 60%, transparent);
    backdrop-filter: blur(6px); margin-bottom: 2rem;
  }
  .hero-name { margin: 0; }
  .hero-role { font-size: clamp(1.1rem, 2.4vw, 1.65rem); font-weight: 450; color: var(--text); margin: 1.4rem 0 0; letter-spacing: -0.02em; }
  .hero-lead { margin: 1.5rem auto 0; }
  .hero-actions { display: flex; gap: 0.8rem; margin-top: 2.4rem; flex-wrap: wrap; justify-content: center; }
  .hero-scroll {
    position: absolute; bottom: 2rem; left: 50%; transform: translateX(-50%);
    z-index: 2; display: flex; flex-direction: column; align-items: center; gap: 0.6rem;
    font-family: var(--font-mono); font-size: 0.68rem; letter-spacing: 0.15em; color: var(--text-3);
  }
  .hero-scroll .line { width: 1px; height: 38px; background: linear-gradient(var(--text-3), transparent); animation: scrolldrop 2.2s var(--ease) infinite; }
  @keyframes scrolldrop { 0% { transform: scaleY(0); transform-origin: top; } 45% { transform: scaleY(1); transform-origin: top; } 55% { transform: scaleY(1); transform-origin: bottom; } 100% { transform: scaleY(0); transform-origin: bottom; } }

  /* ============ MARQUEE ============ */
  .marquee {
    border-block: 1px solid var(--border);
    padding-block: 1.1rem; overflow: hidden;
    -webkit-mask-image: linear-gradient(90deg, transparent, #000 12%, #000 88%, transparent);
            mask-image: linear-gradient(90deg, transparent, #000 12%, #000 88%, transparent);
  }
  .marquee-track {
    display: flex; align-items: center; gap: 2rem; width: max-content;
    animation: marquee 38s linear infinite;
    font-family: var(--font-mono); font-size: 1rem; color: var(--text-2); white-space: nowrap;
  }
  .marquee-track .sep { color: var(--accent); }
  @keyframes marquee { to { transform: translateX(-50%); } }

  /* ============ ABOUT ============ */
  .about-grid { display: grid; grid-template-columns: 1fr 1fr; gap: clamp(2rem, 6vw, 5rem); align-items: start; }
  .about-left { position: sticky; top: 90px; }
  .about-left .section-title { margin: 1.2rem 0 2rem; }
  .about-portrait { overflow: hidden; border-radius: var(--radius-lg); aspect-ratio: 4/5; }
  .about-portrait img { width: 100%; height: 100%; object-fit: cover; filter: grayscale(1) contrast(1.02); transition: filter 0.6s var(--ease), transform 0.8s var(--ease); }
  .about-portrait:hover img { filter: grayscale(0); transform: scale(1.03); }
  .about-right { padding-top: 2.6rem; display: flex; flex-direction: column; gap: 1.4rem; }
  .about-body { color: var(--text-2); font-size: 1.05rem; line-height: 1.7; max-width: 52ch; margin: 0; }
  .about-stats { display: flex; gap: 2.5rem; margin-top: 1.4rem; flex-wrap: wrap; }
  .stat { display: flex; flex-direction: column; gap: 0.2rem; }
  .stat .num { font-size: 2.4rem; font-weight: 600; letter-spacing: -0.03em; }
  .stat .lbl { font-family: var(--font-mono); font-size: 0.74rem; color: var(--text-3); text-transform: uppercase; letter-spacing: 0.05em; }

  /* ============ section helpers ============ */
  section.alt { background: var(--bg-2); border-block: 1px solid var(--border); }
  .sec-head { margin-bottom: clamp(2.5rem, 5vw, 4rem); }
  .sec-head .section-title { margin-top: 1rem; }

  /* ============ CAPABILITIES ============ */
  .cap-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 1.2rem; }
  .cap-card { padding: clamp(1.6rem, 3vw, 2.4rem); display: flex; flex-direction: column; gap: 1rem; position: relative; overflow: hidden; }
  .cap-card::before {
    content: ""; position: absolute; inset: 0; opacity: 0;
    background: radial-gradient(120% 90% at 0% 0%, var(--accent-soft), transparent 60%);
    transition: opacity 0.5s var(--ease);
  }
  .cap-card:hover { transform: translateY(-4px); box-shadow: var(--shadow-md); border-color: var(--accent); }
  .cap-card:hover::before { opacity: 1; }
  .cap-card > * { position: relative; }
  .cap-num { font-family: var(--font-mono); font-size: 0.8rem; color: var(--accent); letter-spacing: 0.05em; }
  .cap-card h3 { font-size: 1.4rem; letter-spacing: -0.02em; font-weight: 600; margin: 0; }
  .cap-card p { color: var(--text-2); font-size: 1rem; line-height: 1.6; flex: 1; margin: 0; }

  /* ============ WORK LIST ============ */
  .work-list { border-top: 1px solid var(--border); }
  .work-row {
    display: grid; grid-template-columns: auto 1fr auto auto; align-items: center; gap: 1.5rem;
    padding: clamp(1.4rem, 3vw, 2.1rem) 0.5rem; border-bottom: 1px solid var(--border);
    transition: padding 0.4s var(--ease), background 0.4s var(--ease); position: relative;
  }
  .work-row::after { content: ""; position: absolute; left: 0; bottom: -1px; height: 1px; width: 0; background: var(--accent); transition: width 0.5s var(--ease); }
  .work-row:hover { padding-left: 1.4rem; }
  .work-row:hover::after { width: 100%; }
  .work-idx { font-family: var(--font-mono); font-size: 0.82rem; color: var(--text-3); }
  .work-main h3 { font-size: clamp(1.3rem, 2.6vw, 1.9rem); letter-spacing: -0.02em; transition: color 0.3s; font-weight: 600; margin: 0; }
  .work-row:hover .work-main h3 { color: var(--accent); }
  .work-main p { color: var(--text-2); font-size: 0.98rem; margin: 0.3rem 0 0; }
  .work-tags { display: flex; gap: 0.5rem; flex-wrap: wrap; justify-content: flex-end; max-width: 280px; }
  .work-arrow { font-size: 1.3rem; color: var(--text-3); transition: transform 0.4s var(--ease), color 0.3s; }
  .work-row:hover .work-arrow { transform: translateX(6px); color: var(--accent); }

  /* ============ ASSISTANT TEASER ============ */
  .assistant-card { display: grid; grid-template-columns: 1.1fr 1fr; gap: clamp(2rem, 5vw, 4rem); padding: clamp(2rem, 5vw, 4rem); align-items: center; }
  .assistant-copy .section-title { margin: 1rem 0 1.2rem; }
  .assistant-copy .lead { margin-bottom: 2rem; }
  .assistant-preview { display: flex; flex-direction: column; gap: 0.9rem; padding: 1.6rem; border-radius: var(--radius); background: var(--bg); border: 1px solid var(--border); }
  .chat-bubble { padding: 0.85rem 1.1rem; border-radius: 14px; font-size: 0.95rem; line-height: 1.5; max-width: 92%; }
  .chat-bubble.user { align-self: flex-end; background: var(--accent); color: oklch(0.99 0 0); border-bottom-right-radius: 5px; }
  [data-theme="dark"] .chat-bubble.user { color: oklch(0.16 0.01 264); }
  .chat-bubble.bot { align-self: flex-start; background: var(--surface); border: 1px solid var(--border); color: var(--text); border-bottom-left-radius: 5px; display: flex; gap: 0.7rem; align-items: flex-start; }
  .bot-avatar { flex-shrink: 0; width: 26px; height: 26px; border-radius: 7px; background: var(--text); color: var(--bg); font-family: var(--font-mono); font-size: 0.7rem; display: grid; place-items: center; }
  .chat-typing { align-self: flex-start; display: flex; gap: 5px; padding: 0.7rem 1rem; background: var(--surface); border: 1px solid var(--border); border-radius: 14px; border-bottom-left-radius: 5px; }
  .chat-typing span { width: 7px; height: 7px; border-radius: 50%; background: var(--text-3); animation: typing 1.4s ease-in-out infinite; }
  .chat-typing span:nth-child(2) { animation-delay: 0.2s; }
  .chat-typing span:nth-child(3) { animation-delay: 0.4s; }
  @keyframes typing { 0%, 60%, 100% { transform: translateY(0); opacity: 0.4; } 30% { transform: translateY(-5px); opacity: 1; } }

  /* ============ HOME RESPONSIVE ============ */
  @media (max-width: 880px) {
    .about-grid { grid-template-columns: 1fr; }
    .about-left { position: static; }
    .about-right { padding-top: 0; }
    .cap-grid { grid-template-columns: 1fr; }
    .assistant-card { grid-template-columns: 1fr; }
    .work-row { grid-template-columns: auto 1fr auto; }
    .work-tags { display: none; }
  }
  @media (max-width: 520px) {
    .about-stats { gap: 1.6rem; }
    .stat .num { font-size: 1.9rem; }
  }

  /* ============ CV PAGE ============ */
  .cv-header { padding-top: clamp(3rem, 7vw, 6rem); padding-bottom: clamp(2rem, 4vw, 3rem); }
  .cv-header .kicker { margin-bottom: 1.4rem; }
  .cv-name { font-size: clamp(2.6rem, 7vw, 5rem); font-weight: 600; letter-spacing: -0.04em; line-height: 0.98; margin: 0; }
  .cv-role { font-size: clamp(1.1rem, 2.2vw, 1.5rem); color: var(--text-2); margin: 0.8rem 0 0; font-weight: 400; }
  .cv-actions { display: flex; gap: 0.8rem; margin-top: 1.8rem; flex-wrap: wrap; }

  .cv-layout { display: grid; grid-template-columns: 1fr 320px; gap: clamp(2rem, 5vw, 4.5rem); align-items: start; padding-bottom: clamp(4rem, 8vw, 7rem); }
  .cv-main { display: flex; flex-direction: column; gap: clamp(3rem, 6vw, 5rem); min-width: 0; }
  .cv-block .cv-block-title { display: flex; align-items: baseline; gap: 1rem; margin-bottom: 2rem; }
  .cv-block-title h2 { font-size: clamp(1.4rem, 3vw, 1.9rem); letter-spacing: -0.02em; font-weight: 600; margin: 0; }
  .cv-block-title .count { font-family: var(--font-mono); font-size: 0.8rem; color: var(--text-3); }
  .cv-summary { font-size: 1.1rem; line-height: 1.7; color: var(--text-2); max-width: 60ch; margin: 0; }

  .timeline { position: relative; padding-left: 1.8rem; }
  .timeline::before { content: ""; position: absolute; left: 5px; top: 6px; bottom: 6px; width: 1px; background: var(--border); }
  .tl-item { position: relative; padding-bottom: 2.6rem; }
  .tl-item:last-child { padding-bottom: 0; }
  .tl-item::before {
    content: ""; position: absolute; left: -1.8rem; top: 6px; width: 11px; height: 11px; border-radius: 50%;
    background: var(--bg); border: 2px solid var(--border-2); transition: border-color 0.3s, background 0.3s;
  }
  .tl-item:hover::before, .tl-item.current::before { border-color: var(--accent); background: var(--accent); }
  .tl-meta { font-family: var(--font-mono); font-size: 0.76rem; color: var(--text-3); letter-spacing: 0.03em; display: flex; gap: 0.7rem; align-items: center; flex-wrap: wrap; }
  .tl-meta .now { color: var(--accent); }
  .tl-role { font-size: 1.2rem; font-weight: 600; letter-spacing: -0.01em; margin-top: 0.5rem; }
  .tl-role .at { color: var(--text-2); font-weight: 400; }
  .tl-desc { color: var(--text-2); margin-top: 0.5rem; line-height: 1.65; max-width: 56ch; font-size: 0.98rem; }
  .tl-tags { margin-top: 0.9rem; }

  .edu-item { padding: 1.4rem 0; border-top: 1px solid var(--border); }
  .edu-item:first-child { border-top: none; padding-top: 0; }
  .edu-q { font-size: 1.15rem; font-weight: 600; letter-spacing: -0.01em; }
  .edu-place { color: var(--text-2); margin-top: 0.2rem; }
  .edu-years { font-family: var(--font-mono); font-size: 0.78rem; color: var(--text-3); margin-top: 0.4rem; }

  .cv-side { position: sticky; top: 88px; display: flex; flex-direction: column; gap: 1.2rem; }
  .side-card { padding: 1.5rem; }
  .side-photo { padding: 0; overflow: hidden; }
  .side-photo img { width: 100%; aspect-ratio: 1/1; object-fit: cover; object-position: center 22%; }
  .side-head { font-family: var(--font-mono); font-size: 0.72rem; text-transform: uppercase; letter-spacing: 0.08em; color: var(--text-3); margin-bottom: 1rem; }
  .side-contact { display: flex; flex-direction: column; gap: 0.7rem; }
  .side-contact a, .side-contact span { display: flex; gap: 0.6rem; align-items: center; color: var(--text); font-size: 0.92rem; transition: color 0.25s; }
  .side-contact a:hover { color: var(--accent); }
  .side-contact .ico { color: var(--text-3); flex-shrink: 0; }
  .side-contact svg { width: 15px; height: 15px; }

  .skill-group { margin-bottom: 1.3rem; }
  .skill-group:last-child { margin-bottom: 0; }
  .skill-group h4 { font-size: 0.85rem; font-weight: 600; color: var(--text); margin: 0 0 0.7rem; }
  .lang-row { display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.8rem; }
  .lang-row:last-child { margin-bottom: 0; }
  .lang-row .lvl { font-family: var(--font-mono); font-size: 0.72rem; color: var(--text-3); }
  .lang-bar { height: 4px; border-radius: 999px; background: var(--border); margin-top: 0.4rem; overflow: hidden; }
  .lang-bar span { display: block; height: 100%; background: var(--accent); border-radius: 999px; }
  .hobby-row { display: flex; flex-wrap: wrap; gap: 0.5rem; }

  @media (max-width: 900px) {
    .cv-layout { grid-template-columns: 1fr; }
    .cv-side { position: static; flex-direction: column; }
    .side-photo { max-width: 280px; }
  }

  /* ============ CV — PRINT / PDF EXPORT ============ */
  /* Turns the on-screen CV into a clean, single-document A4 résumé when the
     user hits "Download / Print PDF" (window.print). */
  @media print {
    @page {
      size: A4;
      margin: 14mm 13mm;
    }

    /* Render the CV on white with ink-friendly, high-contrast colours and
       keep accent fills/borders in the exported PDF. */
    :root,
    [data-theme="dark"] {
      --bg: #ffffff;
      --bg-2: #ffffff;
      --surface: #ffffff;
      --surface-2: #ffffff;
      --text: #14181f;
      --text-2: #3b4452;
      --text-3: #6b7280;
      --border: #d8dce3;
      --border-2: #c5cad3;
      --accent: #2a5bd7;
      --accent-2: #2a5bd7;
      --accent-soft: rgba(42, 91, 215, 0.1);
      --accent-glow: transparent;
    }

    *,
    *::before,
    *::after {
      -webkit-print-color-adjust: exact !important;
      print-color-adjust: exact !important;
      box-shadow: none !important;
      text-shadow: none !important;
      animation: none !important;
      transition: none !important;
    }

    html,
    body {
      background: #fff !important;
      color: var(--text) !important;
      font-size: 11pt;
    }

    /* Everything that isn't part of the résumé itself. */
    .nav,
    .footer,
    .cv-actions,
    .hero-scroll,
    .tag-row,
    .tl-tags,
    .wrap .divider {
      display: none !important;
    }

    /* Scroll-reveal sections must always be visible on paper, even if they
       were never scrolled into view. */
    .reveal,
    .reveal:not(.in) {
      opacity: 1 !important;
      transform: none !important;
    }

    /* Drop the on-screen max-width / gutter so the @page margin governs the
       outer spacing, and override the inline top padding on the layout wrap. */
    .wrap {
      max-width: none !important;
      margin: 0 !important;
      padding: 0 !important;
    }

    /* Header masthead. */
    .cv-header {
      padding: 0 0 12pt !important;
      margin-bottom: 14pt;
      border-bottom: 1.5pt solid var(--accent);
    }
    .cv-header .kicker {
      margin-bottom: 6pt !important;
      font-size: 8pt;
    }
    .cv-name {
      font-size: 26pt !important;
      line-height: 1.05 !important;
    }
    .cv-role {
      font-size: 11pt !important;
      margin-top: 5pt !important;
    }

    /* Two-column résumé body — keep main + sidebar side by side. */
    .cv-layout {
      display: grid !important;
      grid-template-columns: 1fr 185pt !important;
      gap: 22pt !important;
      padding: 0 !important;
      align-items: start !important;
    }
    .cv-main {
      gap: 16pt !important;
    }

    .cv-block {
      break-inside: avoid;
      page-break-inside: avoid;
    }
    .cv-block .cv-block-title {
      margin-bottom: 8pt !important;
    }
    .cv-block-title h2 {
      font-size: 13pt !important;
    }
    .cv-summary {
      font-size: 10.5pt !important;
      line-height: 1.5 !important;
      max-width: none !important;
    }

    /* Experience timeline. */
    .timeline {
      padding-left: 14pt !important;
    }
    .tl-item {
      padding-bottom: 12pt !important;
      break-inside: avoid;
      page-break-inside: avoid;
    }
    .tl-item::before {
      background: var(--accent) !important;
      border-color: var(--accent) !important;
    }
    .tl-meta {
      font-size: 8pt !important;
    }
    .tl-role {
      font-size: 11.5pt !important;
      margin-top: 2pt !important;
    }
    .tl-desc {
      font-size: 9.5pt !important;
      line-height: 1.45 !important;
      max-width: none !important;
      margin-top: 3pt !important;
    }

    /* Education. */
    .edu-item {
      padding: 8pt 0 !important;
      break-inside: avoid;
      page-break-inside: avoid;
    }
    .edu-q {
      font-size: 11pt !important;
    }
    .edu-place {
      font-size: 9.5pt !important;
    }
    .edu-years {
      font-size: 8pt !important;
    }

    /* Sidebar. */
    .cv-side {
      position: static !important;
      top: auto !important;
      gap: 12pt !important;
    }
    .side-card {
      padding: 10pt !important;
      border: 1px solid var(--border) !important;
      border-radius: 6pt !important;
      break-inside: avoid;
      page-break-inside: avoid;
    }
    .side-photo {
      padding: 0 !important;
    }
    .side-photo img {
      max-height: 150pt;
    }
    .side-head {
      font-size: 7.5pt !important;
      margin-bottom: 7pt !important;
    }
    .side-contact a,
    .side-contact span {
      font-size: 9pt !important;
    }
    .skill-group h4 {
      font-size: 9pt !important;
    }
    .tag {
      font-size: 7.5pt !important;
      padding: 2pt 6pt !important;
      color: var(--text-2) !important;
      background: #fff !important;
    }
    .lang-row .lvl {
      font-size: 7.5pt !important;
    }
    .lang-bar span {
      background: var(--accent) !important;
    }
  }

  /* Mobile print fallback — some mobile browsers (notably iOS Safari) lay the
     printed page out against the device viewport rather than the A4 sheet,
     which would squeeze the two-column grid. Stack to a single column so the
     exported PDF stays readable from a phone. */
  @media print and (max-width: 600px) {
    .cv-layout {
      grid-template-columns: 1fr !important;
      gap: 16pt !important;
    }
    .cv-side {
      gap: 10pt !important;
    }
    .side-photo {
      max-width: 220pt;
      margin: 0 auto;
    }
  }

  /* ============ CONTACT PAGE ============ */
  .contact-page { padding-top: clamp(3rem, 7vw, 6rem); padding-bottom: clamp(4rem, 8vw, 7rem); }
  .contact-grid { display: grid; grid-template-columns: 0.85fr 1.15fr; gap: clamp(2.5rem, 6vw, 5rem); align-items: start; }

  .contact-left .kicker { margin-bottom: 1.4rem; }
  .contact-left h1 { font-size: clamp(2.4rem, 6vw, 4rem); font-weight: 600; letter-spacing: -0.04em; line-height: 1; margin: 0; }
  .contact-left .lead { margin-top: 1.4rem; }
  .contact-status {
    display: inline-flex; align-items: center; gap: 0.6rem; margin-top: 2rem;
    font-family: var(--font-mono); font-size: 0.8rem; color: var(--text-2);
    border: 1px solid var(--border-2); border-radius: 999px; padding: 0.5rem 1rem; background: var(--surface);
  }
  .contact-status .dot { width: 8px; height: 8px; border-radius: 50%; background: oklch(0.72 0.17 150); }

  .contact-methods { margin-top: 2.5rem; display: flex; flex-direction: column; gap: 0.4rem; }
  .method {
    display: flex; align-items: center; gap: 1rem; padding: 1rem 0; border-top: 1px solid var(--border);
    color: var(--text); transition: padding 0.3s var(--ease);
  }
  .method:hover { padding-left: 0.6rem; }
  .method .m-ico { width: 38px; height: 38px; border-radius: 11px; border: 1px solid var(--border); display: grid; place-items: center; color: var(--text-2); flex-shrink: 0; transition: border-color 0.3s, color 0.3s; }
  .method:hover .m-ico { border-color: var(--accent); color: var(--accent); }
  .method svg { width: 17px; height: 17px; }
  .method .m-label { font-family: var(--font-mono); font-size: 0.7rem; text-transform: uppercase; letter-spacing: 0.06em; color: var(--text-3); display: block; }
  .method .m-value { font-size: 1rem; font-weight: 500; margin-top: 0.1rem; display: block; }

  .contact-form-card { padding: clamp(1.8rem, 4vw, 2.8rem); }
  .field { margin-bottom: 1.3rem; }
  .field label { display: block; font-family: var(--font-mono); font-size: 0.74rem; text-transform: uppercase; letter-spacing: 0.05em; color: var(--text-2); margin-bottom: 0.55rem; }
  .field label .req { color: var(--accent); }
  .field input, .field textarea {
    width: 100%; font-family: var(--font-sans); font-size: 1rem; color: var(--text);
    background: var(--bg); border: 1px solid var(--border-2); border-radius: 12px;
    padding: 0.85rem 1rem; outline: none; transition: border-color 0.25s, box-shadow 0.25s;
  }
  .field input::placeholder, .field textarea::placeholder { color: var(--text-3); }
  .field input:focus, .field textarea:focus { border-color: var(--accent); box-shadow: 0 0 0 3px var(--accent-soft); }
  .field textarea { resize: vertical; min-height: 130px; line-height: 1.6; }
  .field.invalid input, .field.invalid textarea { border-color: oklch(0.6 0.2 25); }
  .field-error { color: oklch(0.62 0.2 25); font-size: 0.8rem; margin-top: 0.4rem; display: none; }
  .field.invalid .field-error { display: block; }
  .field-row { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; }

  .form-foot { display: flex; align-items: center; justify-content: space-between; gap: 1rem; margin-top: 0.5rem; flex-wrap: wrap; }
  .req-note { font-family: var(--font-mono); font-size: 0.74rem; color: var(--text-3); }
  .req-note .req { color: var(--accent); }
  .submit-btn { font-size: 1rem; padding: 0.95rem 1.8rem; }

  .form-success {
    display: none; flex-direction: column; align-items: center; text-align: center;
    padding: clamp(2.5rem, 6vw, 4rem) 1.5rem; gap: 1rem;
  }
  .form-success.show { display: flex; animation: msgIn 0.5s var(--ease) both; }
  @keyframes msgIn { from { opacity: 0; transform: translateY(12px);} to { opacity: 1; transform: none; } }
  .success-ring { width: 64px; height: 64px; border-radius: 50%; background: var(--accent-soft); display: grid; place-items: center; color: var(--accent); margin-bottom: 0.5rem; }
  .success-ring svg { width: 30px; height: 30px; }
  .form-success h3 { font-size: 1.5rem; letter-spacing: -0.02em; font-weight: 600; margin: 0; }
  .form-success p { color: var(--text-2); max-width: 38ch; margin: 0; }

  @media (max-width: 860px) {
    .contact-grid { grid-template-columns: 1fr; }
    .field-row { grid-template-columns: 1fr; }
  }

  /* ============ ASSISTANT PAGE ============ */
  .asst-wrap { max-width: 820px; margin-inline: auto; padding-inline: var(--gutter); }
  .asst-page { min-height: calc(100vh - 64px); display: flex; flex-direction: column; padding-top: clamp(2rem, 5vw, 3.5rem); padding-bottom: 2rem; }

  .asst-head { text-align: center; margin-bottom: 1.8rem; }
  .asst-badge {
    display: inline-flex; align-items: center; gap: 0.5rem; margin-bottom: 1.2rem;
    font-family: var(--font-mono); font-size: 0.72rem; letter-spacing: 0.05em; text-transform: uppercase;
    color: var(--text-2); border: 1px solid var(--border-2); border-radius: 999px; padding: 0.4rem 0.85rem;
    background: var(--surface);
  }
  .asst-badge .dot { width: 7px; height: 7px; border-radius: 50%; background: oklch(0.72 0.17 150); }
  .asst-title { font-size: clamp(2rem, 5vw, 3.2rem); font-weight: 600; letter-spacing: -0.035em; margin: 0; }
  .asst-sub { color: var(--text-2); margin: 0.7rem auto 0; font-size: 1.05rem; max-width: 48ch; }

  .chat { flex: 1; display: flex; flex-direction: column; gap: 1.1rem; padding: 0.5rem 0.2rem 1.5rem; overflow-y: auto; min-height: 260px; }
  .msg { display: flex; gap: 0.8rem; max-width: 88%; animation: msgIn 0.5s var(--ease) both; }
  .msg.user { align-self: flex-end; flex-direction: row-reverse; }
  .msg .avatar { flex-shrink: 0; width: 32px; height: 32px; border-radius: 9px; display: grid; place-items: center; font-family: var(--font-mono); font-size: 0.72rem; font-weight: 600; }
  .msg.bot .avatar { background: var(--text); color: var(--bg); }
  .msg.user .avatar { background: var(--accent); color: oklch(0.99 0 0); }
  [data-theme="dark"] .msg.user .avatar { color: oklch(0.16 0.01 264); }
  .bubble { padding: 0.85rem 1.15rem; border-radius: 16px; font-size: 0.98rem; line-height: 1.6; }
  .msg.bot .bubble { background: var(--surface); border: 1px solid var(--border); border-top-left-radius: 5px; color: var(--text); }
  .msg.user .bubble { background: var(--accent); color: oklch(0.99 0 0); border-top-right-radius: 5px; }
  [data-theme="dark"] .msg.user .bubble { color: oklch(0.16 0.01 264); }
  .bubble p { margin: 0; }
  .bubble p + p { margin-top: 0.6rem; }
  .bubble a { color: inherit; text-decoration: underline; text-underline-offset: 2px; }

  .typing { display: flex; gap: 5px; padding: 0.95rem 1.15rem; background: var(--surface); border: 1px solid var(--border); border-radius: 16px; border-top-left-radius: 5px; width: fit-content; }
  .typing span { width: 7px; height: 7px; border-radius: 50%; background: var(--text-3); animation: typing 1.4s ease-in-out infinite; }
  .typing span:nth-child(2) { animation-delay: 0.2s; }
  .typing span:nth-child(3) { animation-delay: 0.4s; }

  .suggest { display: flex; flex-wrap: wrap; gap: 0.5rem; margin-bottom: 1rem; }
  .suggest-chip {
    font-size: 0.88rem; color: var(--text); background: var(--surface); border: 1px solid var(--border);
    border-radius: 999px; padding: 0.55rem 1rem; cursor: pointer;
    transition: border-color 0.25s, color 0.25s, transform 0.25s, background 0.25s;
  }
  .suggest-chip:hover:not(:disabled) { border-color: var(--accent); color: var(--accent); transform: translateY(-2px); }
  .suggest-chip:disabled { opacity: 0.5; cursor: not-allowed; }

  .composer { position: sticky; bottom: 1rem; }
  .composer-inner {
    display: flex; align-items: flex-end; gap: 0.6rem; padding: 0.55rem 0.55rem 0.55rem 1.1rem;
    background: var(--surface); border: 1px solid var(--border-2); border-radius: 20px;
    box-shadow: var(--shadow-md); transition: border-color 0.25s;
  }
  .composer-inner:focus-within { border-color: var(--accent); }
  .composer textarea {
    flex: 1; border: none; background: transparent; resize: none; outline: none;
    font-family: var(--font-sans); font-size: 1rem; color: var(--text); line-height: 1.5;
    max-height: 140px; padding: 0.55rem 0;
  }
  .composer textarea::placeholder { color: var(--text-3); }
  .send-btn {
    flex-shrink: 0; width: 42px; height: 42px; border-radius: 13px; border: none; cursor: pointer;
    background: var(--accent); color: oklch(0.99 0 0); display: grid; place-items: center;
    transition: background 0.25s, transform 0.25s, opacity 0.25s;
  }
  [data-theme="dark"] .send-btn { color: oklch(0.16 0.01 264); }
  .send-btn:hover:not(:disabled) { background: var(--accent-2); transform: scale(1.05); }
  .send-btn:disabled { opacity: 0.4; cursor: not-allowed; }
  .send-btn svg { width: 18px; height: 18px; }
  .composer-meta { display: flex; justify-content: space-between; align-items: center; margin-top: 0.6rem; padding-inline: 0.4rem; }
  .composer-meta span { font-family: var(--font-mono); font-size: 0.72rem; color: var(--text-3); }
  .composer-meta .disclaimer { color: var(--text-3); }
`;
