import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../../contexts/AuthContext";

interface PortfolioFooterProps {
  /** "full" = CTA + navigation columns (home / cv). "minimal" = bottom meta only (contact). */
  variant?: "full" | "minimal";
  /** Copy shown in the CTA column of the full footer. */
  ctaLine?: string;
}

const PortfolioFooter: React.FC<PortfolioFooterProps> = ({
  variant = "full",
  ctaLine = "Have an idea worth building?",
}) => {
  const auth = useAuth();

  if (variant === "minimal") {
    return (
      <footer className="footer">
        <div className="wrap">
          <div
            className="footer-bottom"
            style={{ borderTop: "none", marginTop: 0, paddingTop: 0 }}
          >
            <span className="footer-meta">© 2026 Daniel Aboo · aboodaniel.pl</span>
            <span className="footer-meta">Designed &amp; built with intent.</span>
          </div>
        </div>
      </footer>
    );
  }

  return (
    <footer className="footer">
      <div className="wrap">
        <div className="footer-grid">
          <div className="reveal">
            <span className="kicker">
              <span className="idx">05</span> — Let's talk
            </span>
            <p className="cta-line">{ctaLine}</p>
            <Link
              className="btn btn-primary"
              data-magnetic
              to="/contact"
              style={{ marginTop: "1.4rem" }}
            >
              Get in touch <span className="arrow">→</span>
            </Link>
          </div>
          <div className="reveal" data-delay="1">
            <p className="footer-head">Navigate</p>
            <div className="footer-links">
              <Link to="/">Home</Link>
              <Link to="/cv">Curriculum Vitae</Link>
              <Link to="/assistant">AI Assistant</Link>
              <Link to="/contact">Contact</Link>
              {auth.isDeveloper && (
                <Link to="/developerTools">Developer Tools</Link>
              )}
              {auth.isOwner && <Link to="/messages">Messages</Link>}
            </div>
          </div>
          <div className="reveal" data-delay="2">
            <p className="footer-head">Elsewhere</p>
            <div className="footer-links">
              <a href="mailto:me@aboodaniel.pl">me@aboodaniel.pl</a>
              <a href="tel:+48601951169">+48 601 951 169</a>
              <a
                href="https://www.linkedin.com/in/danielaboo"
                target="_blank"
                rel="noopener noreferrer"
              >
                LinkedIn ↗
              </a>
              {!auth.isLoggedIn ? (
                <Link to="/login">Login</Link>
              ) : (
                <button type="button" onClick={auth.logout}>
                  Logout
                </button>
              )}
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <span className="footer-meta">© 2026 Daniel Aboo · aboodaniel.pl</span>
          <span className="footer-meta">Designed &amp; built with intent.</span>
        </div>
      </div>
    </footer>
  );
};

export default PortfolioFooter;
