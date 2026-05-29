import styled from 'styled-components';

export const FooterWrapper = styled.footer`
  border-top: 1px solid var(--border);
  padding-block: clamp(3rem, 6vw, 5rem);
  margin-top: 2rem;
  background: var(--bg);
`;

export const FooterGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 2.5rem;
  justify-content: space-between;
  align-items: flex-start;
`;

export const FooterCTASection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
`;

export const FooterKicker = styled.span`
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
`;

export const FooterKickerIdx = styled.span`
  color: var(--accent);
`;

export const FooterCTALine = styled.p`
  font-size: clamp(1.6rem, 4vw, 2.6rem);
  font-weight: 600;
  letter-spacing: -0.03em;
  line-height: 1.05;
  max-width: 14ch;
  color: var(--text);
  margin-top: 0.4rem;
`;

export const FooterCTABtn = styled.button`
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
  width: fit-content;
  margin-top: 0.8rem;

  &:hover {
    background: var(--accent-2);
    transform: translateY(-2px);
    box-shadow: 0 10px 30px var(--accent-glow);
  }
`;

export const FooterNavSection = styled.div`
  display: flex;
  flex-direction: column;
`;

export const FooterSectionHead = styled.p`
  font-family: var(--font-mono);
  font-size: 0.72rem;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--text-3);
  margin-bottom: 0.9rem;
`;

export const FooterLinks = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.55rem;

  a {
    color: var(--text-2);
    font-size: 0.95rem;
    width: fit-content;
    transition: color 0.25s;

    &:hover {
      color: var(--accent);
    }
  }
`;

export const FooterLinkBtn = styled.button`
  color: var(--text-2);
  font-size: 0.95rem;
  width: fit-content;
  transition: color 0.25s;
  background: none;
  border: none;
  cursor: pointer;
  font-family: var(--font-sans);
  padding: 0;
  text-align: left;

  &:hover {
    color: var(--accent);
  }
`;

export const FooterBottom = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  flex-wrap: wrap;
  margin-top: clamp(2.5rem, 5vw, 4rem);
  padding-top: 1.5rem;
  border-top: 1px solid var(--border);
`;

export const FooterMeta = styled.span`
  font-family: var(--font-mono);
  font-size: 0.75rem;
  color: var(--text-3);
`;
