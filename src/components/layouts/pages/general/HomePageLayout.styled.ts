import styled, { keyframes } from 'styled-components';

/* ---- Keyframes ---- */
const ping = keyframes`
  0% { transform: scale(0.6); opacity: 0.8; }
  100% { transform: scale(2.4); opacity: 0; }
`;

const marqueeAnim = keyframes`
  to { transform: translateX(-50%); }
`;

const scrolldrop = keyframes`
  0% { transform: scaleY(0); transform-origin: top; }
  45% { transform: scaleY(1); transform-origin: top; }
  55% { transform: scaleY(1); transform-origin: bottom; }
  100% { transform: scaleY(0); transform-origin: bottom; }
`;

const typingAnim = keyframes`
  0%, 60%, 100% { transform: translateY(0); opacity: 0.4; }
  30% { transform: translateY(-5px); opacity: 1; }
`;

/* ---- Reveal utility ---- */
const revealBase = `
  transition: opacity 0.9s cubic-bezier(0.22, 1, 0.36, 1), transform 0.9s cubic-bezier(0.22, 1, 0.36, 1);

  &:not(.in) {
    opacity: 0;
    transform: translateY(26px);
  }
  &.in {
    opacity: 1;
    transform: none;
  }
`;

/* ---- Layout ---- */
export const Wrap = styled.div`
  max-width: var(--maxw);
  margin-inline: auto;
  padding-inline: var(--gutter);
`;

export const SectionPad = styled.section`
  position: relative;
  padding-block: clamp(4.5rem, 10vw, 9rem);
  background: var(--bg);
`;

export const AltSection = styled.section`
  position: relative;
  padding-block: clamp(4.5rem, 10vw, 9rem);
  background: var(--bg-2);
  border-block: 1px solid var(--border);
`;

/* ---- Typography ---- */
export const SectionKicker = styled.span`
  font-family: var(--font-mono);
  font-size: 0.78rem;
  font-weight: 500;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--text-3);
  display: inline-flex;
  align-items: center;
  gap: 0.6rem;

  &::before {
    content: "";
    width: 1.6rem;
    height: 1px;
    background: var(--border-2);
    display: inline-block;
  }

  ${revealBase}
`;

export const KickerIdx = styled.span`
  color: var(--accent);
`;

export const SectionTitle = styled.h2`
  font-size: clamp(1.9rem, 4.2vw, 3.2rem);
  letter-spacing: -0.03em;
  font-weight: 600;
  max-width: 16ch;
  color: var(--text);
  line-height: 1.05;

  ${revealBase}
`;

export const SecHead = styled.div`
  margin-bottom: clamp(2.5rem, 5vw, 4rem);
`;

export const LeadText = styled.p`
  font-size: clamp(1.05rem, 1.6vw, 1.3rem);
  color: var(--text-2);
  line-height: 1.55;
  font-weight: 400;
  max-width: 60ch;

  ${revealBase}
`;

export const AboutBody = styled.p`
  color: var(--text-2);
  font-size: 1.05rem;
  line-height: 1.7;
  max-width: 52ch;

  ${revealBase}
`;

/* ---- Hero ---- */
export const HeroSection = styled.section`
  position: relative;
  min-height: clamp(620px, 92vh, 940px);
  display: flex;
  align-items: center;
  overflow: hidden;
  background: var(--bg);
`;

export const HeroCanvasHost = styled.div`
  position: absolute;
  inset: 0;
  z-index: 0;
`;

export const HeroFade = styled.div`
  position: absolute;
  inset: 0;
  z-index: 1;
  pointer-events: none;
  background:
    radial-gradient(80% 60% at 50% 38%, transparent 0%, var(--bg) 78%),
    linear-gradient(to bottom, transparent 60%, var(--bg) 100%);
`;

export const HeroInner = styled.div`
  position: relative;
  z-index: 2;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-block: clamp(4rem, 10vw, 8rem);
  padding-inline: var(--gutter);
  width: 100%;
`;

export const StatusBadge = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  font-family: var(--font-mono);
  font-size: 0.78rem;
  color: var(--text-2);
  padding: 0.5rem 0.95rem;
  border: 1px solid var(--border-2);
  border-radius: 999px;
  background: var(--surface);
  background: color-mix(in oklch, var(--surface) 60%, transparent);
  backdrop-filter: blur(6px);
  margin-bottom: 2rem;
`;

export const StatusDot = styled.span`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: oklch(0.72 0.17 150);
  position: relative;
  flex-shrink: 0;

  &::after {
    content: "";
    position: absolute;
    inset: -4px;
    border-radius: 50%;
    background: oklch(0.72 0.17 150 / 0.4);
    animation: ${ping} 2s ease-out infinite;
  }
`;

export const HeroName = styled.h1`
  font-size: clamp(2.8rem, 8vw, 6.5rem);
  font-weight: 600;
  letter-spacing: -0.04em;
  line-height: 0.96;
  color: var(--text);
  margin: 0;
`;

export const HeroRole = styled.p`
  font-size: clamp(1.1rem, 2.4vw, 1.65rem);
  font-weight: 450;
  color: var(--text);
  margin: 1.4rem 0 0;
  letter-spacing: -0.02em;
`;

export const HeroLead = styled.p`
  font-size: clamp(1.05rem, 1.6vw, 1.3rem);
  color: var(--text-2);
  line-height: 1.55;
  max-width: 60ch;
  margin: 1.5rem auto 0;
`;

export const HeroActions = styled.div`
  display: flex;
  gap: 0.8rem;
  margin-top: 2.4rem;
  flex-wrap: wrap;
  justify-content: center;
`;

export const PrimaryBtn = styled.button`
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
  background: var(--accent);
  color: oklch(0.99 0 0);
  box-shadow: 0 6px 22px var(--accent-glow);
  transition: transform 0.3s var(--ease), background 0.3s var(--ease), box-shadow 0.3s var(--ease);
  white-space: nowrap;

  &:hover {
    background: var(--accent-2);
    transform: translateY(-2px);
    box-shadow: 0 10px 30px var(--accent-glow);
  }
  &:active { transform: scale(0.97); }

  & span { transition: transform 0.3s var(--ease); }
  &:hover span { transform: translateX(3px); }
`;

export const GhostBtn = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 0.55rem;
  font-family: var(--font-sans);
  font-size: 0.95rem;
  font-weight: 500;
  letter-spacing: -0.01em;
  padding: 0.85rem 1.4rem;
  border-radius: 999px;
  border: 1px solid var(--border-2);
  cursor: pointer;
  background: transparent;
  color: var(--text);
  transition: transform 0.3s var(--ease), border-color 0.3s var(--ease), background 0.3s var(--ease);
  white-space: nowrap;

  &:hover {
    border-color: var(--text);
    transform: translateY(-2px);
    background: var(--surface-2);
  }
  &:active { transform: scale(0.97); }
`;

export const BtnArrow = styled.span`
  transition: transform 0.3s var(--ease);
  display: inline-block;
`;

export const HeroScroll = styled.div`
  position: absolute;
  bottom: 2rem;
  left: 50%;
  transform: translateX(-50%);
  z-index: 2;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.6rem;
  font-family: var(--font-mono);
  font-size: 0.68rem;
  letter-spacing: 0.15em;
  color: var(--text-3);
`;

export const ScrollLine = styled.span`
  width: 1px;
  height: 38px;
  background: linear-gradient(var(--text-3), transparent);
  animation: ${scrolldrop} 2.2s var(--ease) infinite;
`;

/* ---- Marquee ---- */
export const MarqueeStrip = styled.div`
  border-block: 1px solid var(--border);
  padding-block: 1.1rem;
  overflow: hidden;
  -webkit-mask-image: linear-gradient(90deg, transparent, #000 12%, #000 88%, transparent);
  mask-image: linear-gradient(90deg, transparent, #000 12%, #000 88%, transparent);
  background: var(--bg);
`;

export const MarqueeTrack = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;
  width: max-content;
  animation: ${marqueeAnim} 38s linear infinite;
  font-family: var(--font-mono);
  font-size: 1rem;
  color: var(--text-2);
  white-space: nowrap;
`;

export const MarqueeSep = styled.span`
  color: var(--accent);
`;

/* ---- About ---- */
export const AboutGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: clamp(2rem, 6vw, 5rem);
  align-items: start;

  @media (max-width: 880px) {
    grid-template-columns: 1fr;
  }
`;

export const AboutLeft = styled.div`
  position: sticky;
  top: 90px;

  @media (max-width: 880px) {
    position: static;
  }
`;

export const AboutPortrait = styled.div`
  overflow: hidden;
  border-radius: var(--radius-lg);
  aspect-ratio: 4/5;
  background: var(--surface);
  border: 1px solid var(--border);

  ${revealBase}

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    filter: grayscale(1) contrast(1.02);
    transition: filter 0.6s var(--ease), transform 0.8s var(--ease);
  }

  &:hover img {
    filter: grayscale(0);
    transform: scale(1.03);
  }
`;

export const AboutRight = styled.div`
  padding-top: 2.6rem;
  display: flex;
  flex-direction: column;
  gap: 1.4rem;

  @media (max-width: 880px) {
    padding-top: 0;
  }
`;

export const AboutStats = styled.div`
  display: flex;
  gap: 2.5rem;
  margin-top: 1.4rem;
  flex-wrap: wrap;

  ${revealBase}

  @media (max-width: 520px) {
    gap: 1.6rem;
  }
`;

export const Stat = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
`;

export const StatNum = styled.span`
  font-size: 2.4rem;
  font-weight: 600;
  letter-spacing: -0.03em;
  color: var(--text);

  @media (max-width: 520px) {
    font-size: 1.9rem;
  }
`;

export const StatLbl = styled.span`
  font-family: var(--font-mono);
  font-size: 0.74rem;
  color: var(--text-3);
  text-transform: uppercase;
  letter-spacing: 0.05em;
`;

/* ---- Capabilities ---- */
export const CapGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.2rem;

  @media (max-width: 880px) {
    grid-template-columns: 1fr;
  }
`;

export const CapCard = styled.article`
  padding: clamp(1.6rem, 3vw, 2.4rem);
  display: flex;
  flex-direction: column;
  gap: 1rem;
  position: relative;
  overflow: hidden;
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  transition: border-color 0.35s var(--ease), transform 0.35s var(--ease), box-shadow 0.35s var(--ease);

  ${revealBase}

  &::before {
    content: "";
    position: absolute;
    inset: 0;
    opacity: 0;
    background: radial-gradient(120% 90% at 0% 0%, var(--accent-soft), transparent 60%);
    transition: opacity 0.5s var(--ease);
  }

  &:hover {
    transform: translateY(-4px);
    box-shadow: var(--shadow-md);
    border-color: var(--accent);
  }

  &:hover::before { opacity: 1; }

  & > * { position: relative; }
`;

export const CapNum = styled.span`
  font-family: var(--font-mono);
  font-size: 0.8rem;
  color: var(--accent);
  letter-spacing: 0.05em;
`;

export const CapTagRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
`;

export const Tag = styled.span`
  font-family: var(--font-mono);
  font-size: 0.76rem;
  font-weight: 450;
  color: var(--text-2);
  padding: 0.34rem 0.7rem;
  border: 1px solid var(--border);
  border-radius: 999px;
  background: var(--surface);
  transition: border-color 0.25s, color 0.25s;
`;

/* ---- Work list ---- */
export const WorkList = styled.div`
  border-top: 1px solid var(--border);
`;

export const WorkRow = styled.div`
  display: grid;
  grid-template-columns: auto 1fr auto auto;
  align-items: center;
  gap: 1.5rem;
  padding: clamp(1.4rem, 3vw, 2.1rem) 0.5rem;
  border-bottom: 1px solid var(--border);
  transition: padding 0.4s var(--ease);
  position: relative;
  cursor: pointer;

  ${revealBase}

  &::after {
    content: "";
    position: absolute;
    left: 0;
    bottom: -1px;
    height: 1px;
    width: 0;
    background: var(--accent);
    transition: width 0.5s var(--ease);
  }

  &:hover { padding-left: 1.4rem; }
  &:hover::after { width: 100%; }
  &:hover h3 { color: var(--accent); }

  @media (max-width: 880px) {
    grid-template-columns: auto 1fr auto;
  }
`;

export const WorkIdx = styled.span`
  font-family: var(--font-mono);
  font-size: 0.82rem;
  color: var(--text-3);
`;

export const WorkMain = styled.div`
  min-width: 0;

  h3 {
    color: var(--text);
    transition: color 0.3s;
    font-weight: 600;
  }
`;

export const WorkTags = styled.div`
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
  justify-content: flex-end;
  max-width: 280px;

  @media (max-width: 880px) {
    display: none;
  }
`;

export const WorkArrow = styled.span`
  font-size: 1.3rem;
  color: var(--text-3);
  transition: transform 0.4s var(--ease), color 0.3s;
`;

/* ---- Assistant teaser ---- */
export const AssistantCard = styled.div`
  display: grid;
  grid-template-columns: 1.1fr 1fr;
  gap: clamp(2rem, 5vw, 4rem);
  padding: clamp(2rem, 5vw, 4rem);
  align-items: center;
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);

  ${revealBase}

  @media (max-width: 880px) {
    grid-template-columns: 1fr;
  }
`;

export const AssistantCopy = styled.div``;

export const AssistantPreview = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.9rem;
  padding: 1.6rem;
  border-radius: var(--radius);
  background: var(--bg);
  border: 1px solid var(--border);
`;

export const ChatBubble = styled.div<{ $type: 'user' | 'bot' }>`
  padding: 0.85rem 1.1rem;
  border-radius: 14px;
  font-size: 0.95rem;
  line-height: 1.5;
  max-width: 92%;
  display: flex;
  gap: 0.7rem;
  align-items: flex-start;

  ${({ $type }) => $type === 'user' ? `
    align-self: flex-end;
    background: var(--accent);
    color: oklch(0.99 0 0);
    border-bottom-right-radius: 5px;
  ` : `
    align-self: flex-start;
    background: var(--surface);
    border: 1px solid var(--border);
    color: var(--text);
    border-bottom-left-radius: 5px;
  `}
`;

export const BotAvatar = styled.span`
  flex-shrink: 0;
  width: 26px;
  height: 26px;
  border-radius: 7px;
  background: var(--text);
  color: var(--bg);
  font-family: var(--font-mono);
  font-size: 0.7rem;
  display: grid;
  place-items: center;
`;

export const ChatTyping = styled.div`
  align-self: flex-start;
  display: flex;
  gap: 5px;
  padding: 0.7rem 1rem;
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 14px;
  border-bottom-left-radius: 5px;
`;

export const TypingDot = styled.span<{ $delay?: string }>`
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: var(--text-3);
  animation: ${typingAnim} 1.4s ease-in-out infinite;
  animation-delay: ${({ $delay }) => $delay || '0s'};
`;
