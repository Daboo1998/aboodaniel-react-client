import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useThemeMode } from "../../../contexts/ThemeModeContext";

const SunIcon = () => (
  <svg
    className="sun"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
  >
    <circle cx="12" cy="12" r="4.2" />
    <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
  </svg>
);

const MoonIcon = () => (
  <svg className="moon" viewBox="0 0 24 24" fill="currentColor">
    <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" />
  </svg>
);

const links: Array<{ to: string; label: string }> = [
  { to: "/", label: "Home" },
  { to: "/cv", label: "CV" },
  { to: "/assistant", label: "Assistant" },
  { to: "/contact", label: "Contact" },
];

const Navbar: React.FC = () => {
  const location = useLocation();
  const { toggle } = useThemeMode();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // close mobile menu on route change
  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  const isActive = (to: string) =>
    to === "/" ? location.pathname === "/" : location.pathname.startsWith(to);

  return (
    <header className={`nav${scrolled ? " scrolled" : ""}`}>
      <div className="nav-inner">
        <Link className="brand" to="/" aria-label="Daniel Aboo — home">
          <span className="mark">DA</span>
          <span>
            Daniel Aboo<small>PROMPT ENGINEER</small>
          </span>
        </Link>
        <nav
          className={`nav-links${menuOpen ? " open" : ""}`}
          aria-label="Primary"
        >
          {links.map((link) => (
            <Link
              key={link.to}
              className={`nav-link${isActive(link.to) ? " active" : ""}`}
              to={link.to}
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="nav-right">
          <button
            className="theme-toggle"
            onClick={toggle}
            aria-label="Toggle dark mode"
            type="button"
          >
            <SunIcon />
            <MoonIcon />
          </button>
          <Link
            className="btn btn-primary"
            to="/contact"
            style={{ padding: "0.6rem 1.1rem" }}
          >
            Work with me
          </Link>
          <button
            className="menu-btn"
            onClick={() => setMenuOpen((o) => !o)}
            aria-label="Menu"
            aria-expanded={menuOpen}
            type="button"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
            >
              <path d="M3 6h18M3 12h18M3 18h18" />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
