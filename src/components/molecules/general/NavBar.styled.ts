import styled from 'styled-components';

export const NavWrapper = styled.header<{ $scrolled: boolean }>`
  position: sticky;
  top: 0;
  z-index: 100;
  backdrop-filter: saturate(180%) blur(18px);
  -webkit-backdrop-filter: saturate(180%) blur(18px);
  background: var(--bg);
  background: color-mix(in oklch, var(--bg) 82%, transparent);
  border-bottom: 1px solid ${({ $scrolled }) => $scrolled ? 'var(--border)' : 'transparent'};
  transition: border-color 0.4s var(--ease), background 0.4s var(--ease);
`;

export const NavInner = styled.div`
  max-width: var(--maxw);
  margin-inline: auto;
  padding: 0.9rem var(--gutter);
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
`;

export const Brand = styled.button`
  display: flex;
  align-items: center;
  gap: 0.7rem;
  font-weight: 600;
  letter-spacing: -0.02em;
  background: none;
  border: none;
  cursor: pointer;
  color: var(--text);
  padding: 0;
  font-family: var(--font-sans);
  text-align: left;
`;

export const BrandMark = styled.span`
  width: 34px;
  height: 34px;
  border-radius: 9px;
  display: grid;
  place-items: center;
  background: var(--text);
  color: var(--bg);
  font-family: var(--font-mono);
  font-weight: 600;
  font-size: 0.95rem;
  transition: background 0.4s var(--ease), color 0.4s var(--ease);
  flex-shrink: 0;
`;

export const BrandText = styled.span`
  display: flex;
  flex-direction: column;
  font-size: 0.95rem;
`;

export const BrandSub = styled.small`
  font-family: var(--font-mono);
  font-size: 0.65rem;
  color: var(--text-3);
  line-height: 1;
  margin-top: 2px;
  letter-spacing: 0.02em;
`;

export const NavLinks = styled.nav<{ $open: boolean }>`
  display: flex;
  align-items: center;
  gap: 0.35rem;

  @media (max-width: 760px) {
    display: none;
  }
`;

export const NavLink = styled.button<{ $active?: boolean; $mobile?: boolean }>`
  font-size: ${({ $mobile }) => $mobile ? '1.4rem' : '0.92rem'};
  font-weight: 450;
  color: ${({ $active }) => $active ? 'var(--text)' : 'var(--text-2)'};
  padding: ${({ $mobile }) => $mobile ? '0.6rem 0' : '0.5rem 0.9rem'};
  border-radius: 999px;
  position: relative;
  transition: color 0.25s var(--ease), background 0.25s var(--ease);
  background: none;
  border: none;
  cursor: pointer;
  font-family: var(--font-sans);
  letter-spacing: -0.01em;
  text-align: left;

  &:hover {
    color: var(--text);
  }

  ${({ $active }) => $active && `
    &::after {
      content: "";
      position: absolute;
      left: 50%;
      bottom: 0.1rem;
      transform: translateX(-50%);
      width: 4px;
      height: 4px;
      border-radius: 50%;
      background: var(--accent);
    }
  `}

  ${({ $mobile, $active }) => $mobile && $active && `
    &::after {
      display: none;
    }
    color: var(--accent);
  `}
`;

export const NavRight = styled.div`
  display: flex;
  align-items: center;
  gap: 0.6rem;
`;

export const ThemeToggle = styled.button`
  width: 38px;
  height: 38px;
  border-radius: 999px;
  border: 1px solid var(--border-2);
  background: var(--surface);
  display: grid;
  place-items: center;
  cursor: pointer;
  color: var(--text-2);
  transition: color 0.25s var(--ease), border-color 0.25s var(--ease), transform 0.4s var(--ease);
  flex-shrink: 0;

  &:hover {
    color: var(--text);
    border-color: var(--text);
    transform: rotate(18deg);
  }
`;

export const WorkWithMeBtn = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 0.55rem;
  font-family: var(--font-sans);
  font-size: 0.88rem;
  font-weight: 500;
  padding: 0.6rem 1.1rem;
  border-radius: 999px;
  border: 1px solid transparent;
  cursor: pointer;
  background: var(--accent);
  color: oklch(0.99 0 0);
  box-shadow: 0 6px 22px var(--accent-glow);
  transition: background 0.3s var(--ease), transform 0.3s var(--ease), box-shadow 0.3s var(--ease);
  white-space: nowrap;

  [data-theme="dark"] & {
    color: oklch(0.15 0.01 264);
  }

  &:hover {
    background: var(--accent-2);
    transform: translateY(-2px);
    box-shadow: 0 10px 30px var(--accent-glow);
  }

  @media (max-width: 560px) {
    display: none;
  }
`;

export const MenuBtn = styled.button`
  display: none;
  width: 38px;
  height: 38px;
  border-radius: 999px;
  border: 1px solid var(--border-2);
  background: var(--surface);
  cursor: pointer;
  color: var(--text);
  place-items: center;

  @media (max-width: 760px) {
    display: grid;
  }
`;

export const MobileMenuOverlay = styled.div<{ $open: boolean }>`
  position: fixed;
  inset: 0;
  background: oklch(0 0 0 / 0.45);
  z-index: 190;
  opacity: ${({ $open }) => ($open ? '1' : '0')};
  pointer-events: ${({ $open }) => ($open ? 'auto' : 'none')};
  transition: opacity 0.35s var(--ease);

  @media (min-width: 761px) {
    display: none;
  }
`;

export const MobileMenu = styled.div<{ $open: boolean }>`
  position: fixed;
  inset: 0 0 0 auto;
  width: min(80vw, 320px);
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  gap: 0.5rem;
  padding: 2rem;
  background: var(--bg);
  border-left: 1px solid var(--border);
  box-shadow: -8px 0 40px oklch(0 0 0 / 0.18);
  transform: translateX(${({ $open }) => ($open ? '0' : '100%')});
  transition: transform 0.45s var(--ease);
  z-index: 200;
  display: flex;

  @media (min-width: 761px) {
    display: none;
  }
`;
