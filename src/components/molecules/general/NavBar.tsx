import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useTheme } from '../../../contexts/ThemeContext';
import useNavigation from '../../../hooks/useNavigation';
import {
  NavWrapper,
  NavInner,
  Brand,
  BrandMark,
  BrandText,
  BrandSub,
  NavLinks,
  NavLink,
  NavRight,
  ThemeToggle,
  WorkWithMeBtn,
  MenuBtn,
  MobileMenu,
  MobileMenuOverlay,
} from './NavBar.styled';

const SunIcon = () => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
    <circle cx="12" cy="12" r="4.2"/>
    <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>
  </svg>
);

const MoonIcon = () => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
    <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"/>
  </svg>
);

const HamburgerIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
    <path d="M3 6h18M3 12h18M3 18h18"/>
  </svg>
);

const CloseIconSvg = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
    <path d="M18 6L6 18M6 6l12 12"/>
  </svg>
);

const navItems = [
  { label: 'Home', to: '/' },
  { label: 'CV', to: '/cv' },
  { label: 'Assistant', to: '/assistant' },
  { label: 'Contact', to: '/contact' },
];

const NavBar: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();
  const navigation = useNavigation();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  const isActive = (to: string) => {
    if (to === '/') return location.pathname === '/' || location.pathname === '/home';
    return location.pathname.startsWith(to);
  };

  return (
    <>
      <NavWrapper $scrolled={scrolled}>
        <NavInner>
          <Brand onClick={() => navigation.navigateTo('/')}>
            <BrandMark>DA</BrandMark>
            <BrandText>
              Daniel Aboo
              <BrandSub>PROMPT ENGINEER</BrandSub>
            </BrandText>
          </Brand>

          <NavLinks $open={false}>
            {navItems.map(item => (
              <NavLink
                key={item.to}
                $active={isActive(item.to)}
                onClick={() => navigation.navigateTo(item.to)}
              >
                {item.label}
              </NavLink>
            ))}
          </NavLinks>

          <NavRight>
            <ThemeToggle onClick={toggleTheme} aria-label="Toggle dark mode">
              {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
            </ThemeToggle>
            <WorkWithMeBtn onClick={() => navigation.navigateTo('/contact')}>
              Work with me
            </WorkWithMeBtn>
            <MenuBtn onClick={() => setMenuOpen(o => !o)} aria-label="Menu">
              {menuOpen ? <CloseIconSvg /> : <HamburgerIcon />}
            </MenuBtn>
          </NavRight>
        </NavInner>
      </NavWrapper>

      <MobileMenuOverlay $open={menuOpen} onClick={() => setMenuOpen(false)} />
      <MobileMenu $open={menuOpen}>
        {navItems.map(item => (
          <NavLink
            key={item.to}
            $active={isActive(item.to)}
            $mobile
            onClick={() => navigation.navigateTo(item.to)}
          >
            {item.label}
          </NavLink>
        ))}
      </MobileMenu>
    </>
  );
};

export default NavBar;
