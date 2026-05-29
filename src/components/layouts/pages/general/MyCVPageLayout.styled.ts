import styled from 'styled-components';

export const CVPageWrapper = styled.div`
  background: var(--bg);
  min-height: 100vh;
`;

export const CVHeader = styled.div`
  max-width: var(--maxw);
  margin-left: auto;
  margin-right: auto;
  padding-left: var(--gutter);
  padding-right: var(--gutter);
  padding-top: clamp(3rem, 7vw, 6rem);
  padding-bottom: clamp(2rem, 4vw, 3rem);
`;

export const CVKicker = styled.span`
  font-family: var(--font-mono);
  font-size: 0.78rem;
  font-weight: 500;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--text-3);
  display: inline-flex;
  align-items: center;
  gap: 0.6rem;
  margin-bottom: 1.4rem;

  &::before {
    content: "";
    width: 1.6rem;
    height: 1px;
    background: var(--border-2);
    display: inline-block;
  }
`;

export const CVKickerIdx = styled.span`
  color: var(--accent);
`;

export const CVName = styled.h1`
  font-size: clamp(2.6rem, 7vw, 5rem);
  font-weight: 600;
  letter-spacing: -0.04em;
  line-height: 0.98;
  color: var(--text);
  margin: 0;
`;

export const CVRole = styled.p`
  font-size: clamp(1.1rem, 2.2vw, 1.5rem);
  color: var(--text-2);
  margin-top: 0.8rem;
  font-weight: 400;
`;

export const CVActions = styled.div`
  display: flex;
  gap: 0.8rem;
  margin-top: 1.8rem;
  flex-wrap: wrap;
`;

export const PrimaryBtn = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 0.55rem;
  font-family: var(--font-sans);
  font-size: 0.95rem;
  font-weight: 500;
  padding: 0.85rem 1.4rem;
  border-radius: 999px;
  border: 1px solid transparent;
  cursor: pointer;
  background: var(--accent);
  color: oklch(0.99 0 0);
  box-shadow: 0 6px 22px var(--accent-glow);
  transition: background 0.3s var(--ease), transform 0.3s var(--ease), box-shadow 0.3s var(--ease);
  white-space: nowrap;

  &:hover {
    background: var(--accent-2);
    transform: translateY(-2px);
    box-shadow: 0 10px 30px var(--accent-glow);
  }
`;

export const GhostBtn = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 0.55rem;
  font-family: var(--font-sans);
  font-size: 0.95rem;
  font-weight: 500;
  padding: 0.85rem 1.4rem;
  border-radius: 999px;
  border: 1px solid var(--border-2);
  cursor: pointer;
  background: transparent;
  color: var(--text);
  transition: border-color 0.3s var(--ease), transform 0.3s var(--ease), background 0.3s var(--ease);
  white-space: nowrap;

  &:hover {
    border-color: var(--text);
    transform: translateY(-2px);
    background: var(--surface-2);
  }
`;

export const Divider = styled.div`
  max-width: var(--maxw);
  margin-left: auto;
  margin-right: auto;
  padding-left: var(--gutter);
  padding-right: var(--gutter);

  &::after {
    content: "";
    display: block;
    height: 1px;
    background: var(--border);
  }
`;

export const CVBody = styled.div`
  max-width: var(--maxw);
  margin-left: auto;
  margin-right: auto;
  padding-left: var(--gutter);
  padding-right: var(--gutter);
  padding-top: clamp(2.5rem, 5vw, 4rem);
  padding-bottom: clamp(4rem, 8vw, 7rem);
`;

export const CVLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 320px;
  gap: clamp(2rem, 5vw, 4.5rem);
  align-items: start;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`;

/* Main column */
export const CVMain = styled.main`
  display: flex;
  flex-direction: column;
  gap: clamp(3rem, 6vw, 5rem);
  min-width: 0;
`;

export const CVBlock = styled.section``;

export const CVBlockTitle = styled.div`
  display: flex;
  align-items: baseline;
  gap: 1rem;
  margin-bottom: 2rem;

  h2 {
    font-size: clamp(1.4rem, 3vw, 1.9rem);
    letter-spacing: -0.02em;
    font-weight: 600;
    color: var(--text);
  }
`;

export const CVBlockCount = styled.span`
  font-family: var(--font-mono);
  font-size: 0.8rem;
  color: var(--text-3);
`;

export const CVSummary = styled.p`
  font-size: 1.1rem;
  line-height: 1.7;
  color: var(--text-2);
  max-width: 60ch;
`;

/* Timeline */
export const Timeline = styled.div`
  position: relative;
  padding-left: 1.8rem;

  &::before {
    content: "";
    position: absolute;
    left: 5px;
    top: 6px;
    bottom: 6px;
    width: 1px;
    background: var(--border);
  }
`;

export const TimelineItem = styled.div<{ $current?: boolean }>`
  position: relative;
  padding-bottom: 2.6rem;

  &:last-child { padding-bottom: 0; }

  &::before {
    content: "";
    position: absolute;
    left: -1.8rem;
    top: 6px;
    width: 11px;
    height: 11px;
    border-radius: 50%;
    background: var(--bg);
    border: 2px solid ${({ $current }) => $current ? 'var(--accent)' : 'var(--border-2)'};
    background: ${({ $current }) => $current ? 'var(--accent)' : 'var(--bg)'};
    transition: border-color 0.3s, background 0.3s;
  }

  &:hover::before {
    border-color: var(--accent);
    background: var(--accent);
  }
`;

export const TLMeta = styled.div`
  font-family: var(--font-mono);
  font-size: 0.76rem;
  color: var(--text-3);
  letter-spacing: 0.03em;
  display: flex;
  gap: 0.7rem;
  align-items: center;
  flex-wrap: wrap;
`;

export const TLNow = styled.span`
  color: var(--accent);
`;

export const TLRole = styled.h3`
  font-size: 1.2rem;
  font-weight: 600;
  letter-spacing: -0.01em;
  margin-top: 0.5rem;
  color: var(--text);
`;

export const TLAt = styled.span`
  color: var(--text-2);
  font-weight: 400;
`;

export const TLDesc = styled.p`
  color: var(--text-2);
  margin-top: 0.5rem;
  line-height: 1.65;
  max-width: 56ch;
  font-size: 0.98rem;
`;

export const TLTags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 0.9rem;
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
`;

/* Education */
export const EduItem = styled.div`
  padding: 1.4rem 0;
  border-top: 1px solid var(--border);

  &:first-child {
    border-top: none;
    padding-top: 0;
  }
`;

export const EduQ = styled.div`
  font-size: 1.15rem;
  font-weight: 600;
  letter-spacing: -0.01em;
  color: var(--text);
`;

export const EduPlace = styled.div`
  color: var(--text-2);
  margin-top: 0.2rem;
`;

export const EduYears = styled.div`
  font-family: var(--font-mono);
  font-size: 0.78rem;
  color: var(--text-3);
  margin-top: 0.4rem;
`;

/* Sidebar */
export const CVSide = styled.aside`
  position: sticky;
  top: 88px;
  display: flex;
  flex-direction: column;
  gap: 1.2rem;

  @media (max-width: 900px) {
    position: static;
  }
`;

export const SideCard = styled.div`
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  padding: 1.5rem;
`;

export const SidePhotoCard = styled.div`
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  overflow: hidden;

  img {
    width: 100%;
    aspect-ratio: 1/1;
    object-fit: cover;
    object-position: center 22%;
    display: block;
  }

  @media (max-width: 900px) {
    max-width: 280px;
  }
`;

export const SideHead = styled.p`
  font-family: var(--font-mono);
  font-size: 0.72rem;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--text-3);
  margin-bottom: 1rem;
`;

export const SideContact = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.7rem;

  a, span {
    display: flex;
    gap: 0.6rem;
    align-items: center;
    color: var(--text);
    font-size: 0.92rem;
    transition: color 0.25s;
    text-decoration: none;
  }

  a:hover { color: var(--accent); }
`;

export const ContactIco = styled.span`
  color: var(--text-3);
  flex-shrink: 0;
  display: flex;
  align-items: center;
`;

export const SkillGroup = styled.div`
  margin-bottom: 1.3rem;

  &:last-child { margin-bottom: 0; }

  h4 {
    font-size: 0.85rem;
    font-weight: 600;
    color: var(--text);
    margin-bottom: 0.7rem;
  }
`;

export const HobbyRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
`;

export const LangRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.8rem;
  color: var(--text);
  font-size: 0.95rem;

  &:last-of-type { margin-bottom: 0; }
`;

export const LangLvl = styled.span`
  font-family: var(--font-mono);
  font-size: 0.72rem;
  color: var(--text-3);
`;

export const LangBar = styled.div`
  height: 4px;
  border-radius: 999px;
  background: var(--border);
  margin-top: 0.4rem;
  overflow: hidden;
`;

export const LangFill = styled.span<{ $width: string }>`
  display: block;
  height: 100%;
  width: ${({ $width }) => $width};
  background: var(--accent);
  border-radius: 999px;
`;

/* Admin controls (kept for owner) */
export const AdminControls = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
  flex-wrap: wrap;
`;
