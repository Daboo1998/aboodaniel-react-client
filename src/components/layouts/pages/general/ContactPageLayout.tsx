import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import validator from "validator";
import { useAuth } from "../../../../contexts/AuthContext";
import database, { Timestamp } from "../../../../data/database";
import PortfolioFooter from "../../../molecules/general/PortfolioFooter";
import useScrollReveal from "../../../../hooks/useScrollReveal";

type FieldName = "name" | "email" | "subject" | "message";

const MailIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
    <rect x="3" y="5" width="18" height="14" rx="2" />
    <path d="m3 7 9 6 9-6" />
  </svg>
);

const PhoneIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
    <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3 19.5 19.5 0 0 1-6-6 19.8 19.8 0 0 1-3-8.6A2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2z" />
  </svg>
);

const LinkedInIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor">
    <path d="M4.98 3.5A2.5 2.5 0 1 1 5 8.5a2.5 2.5 0 0 1 0-5zM3 9h4v12H3zM10 9h3.8v1.7h.05c.53-1 1.83-2.05 3.77-2.05 4.03 0 4.78 2.65 4.78 6.1V21h-4v-5.3c0-1.27-.02-2.9-1.77-2.9s-2.04 1.38-2.04 2.8V21h-4z" />
  </svg>
);

const ContactPageLayout: React.FC = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [invalid, setInvalid] = useState<Record<FieldName, boolean>>({
    name: false,
    email: false,
    subject: false,
    message: false,
  });
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [sent, setSent] = useState(false);
  const auth = useAuth();

  useScrollReveal();

  useEffect(() => {
    document.title = "Daniel Aboo — Contact";
  }, []);

  useEffect(() => {
    if (auth.isLoggedIn) {
      setEmail(auth.user?.email ?? "");
      setName(auth.user?.displayName ?? "");
    }
  }, [auth.isLoggedIn, auth.user]);

  const clearInvalid = (field: FieldName) =>
    setInvalid((prev) => ({ ...prev, [field]: false }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);

    const bad: Record<FieldName, boolean> = {
      name: name.trim().length === 0,
      email: !validator.isEmail(email.trim()),
      subject: subject.trim().length === 0,
      message: message.trim().length === 0,
    };
    setInvalid(bad);

    if (bad.name || bad.email || bad.subject || bad.message) {
      return;
    }

    database.messages
      .post({
        timestamp: Timestamp.now(),
        email,
        name,
        subject,
        message,
      })
      .then(() => {
        setSent(true);
      })
      .catch((error) => {
        setSubmitError(error.message);
      });
  };

  return (
    <>
      <div className="wrap contact-page">
        <div className="contact-grid">
          {/* LEFT */}
          <div className="contact-left">
            <span className="kicker reveal in">
              <span className="idx">✳</span> — Contact
            </span>
            <h1 className="reveal in" data-delay="1">
              Let's build something.
            </h1>
            <p className="lead reveal in" data-delay="2">
              Have an AI project, need prompt-engineering help, or just want to
              talk shop about conversational AI? Drop a line — I read every
              message.
            </p>
            <div className="contact-status reveal in" data-delay="2">
              <span className="dot" /> Available for select consulting
            </div>

            <div className="contact-methods reveal in" data-delay="3">
              <a className="method" href="mailto:me@aboodaniel.pl">
                <span className="m-ico">
                  <MailIcon />
                </span>
                <span>
                  <span className="m-label">Email</span>
                  <span className="m-value">me@aboodaniel.pl</span>
                </span>
              </a>
              <a className="method" href="tel:+48601951169">
                <span className="m-ico">
                  <PhoneIcon />
                </span>
                <span>
                  <span className="m-label">Phone</span>
                  <span className="m-value">+48 601 951 169</span>
                </span>
              </a>
              <a
                className="method"
                href="https://www.linkedin.com/in/danielaboo"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="m-ico">
                  <LinkedInIcon />
                </span>
                <span>
                  <span className="m-label">Social</span>
                  <span className="m-value">LinkedIn</span>
                </span>
              </a>
            </div>
          </div>

          {/* RIGHT: FORM */}
          <div className="contact-form-card card reveal" data-delay="1">
            {!sent ? (
              <form onSubmit={handleSubmit} noValidate>
                <div className="field-row">
                  <div className={`field${invalid.name ? " invalid" : ""}`}>
                    <label htmlFor="c-name">
                      Name <span className="req">*</span>
                    </label>
                    <input
                      type="text"
                      id="c-name"
                      name="name"
                      placeholder="Your name"
                      autoComplete="name"
                      value={name}
                      onChange={(e) => {
                        setName(e.target.value);
                        clearInvalid("name");
                      }}
                    />
                    <div className="field-error">Please enter your name.</div>
                  </div>
                  <div className={`field${invalid.email ? " invalid" : ""}`}>
                    <label htmlFor="c-email">
                      Email <span className="req">*</span>
                    </label>
                    <input
                      type="email"
                      id="c-email"
                      name="email"
                      placeholder="you@example.com"
                      autoComplete="email"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        clearInvalid("email");
                      }}
                    />
                    <div className="field-error">
                      Please enter a valid email.
                    </div>
                  </div>
                </div>
                <div className={`field${invalid.subject ? " invalid" : ""}`}>
                  <label htmlFor="c-subject">
                    Subject <span className="req">*</span>
                  </label>
                  <input
                    type="text"
                    id="c-subject"
                    name="subject"
                    placeholder="What's this about?"
                    value={subject}
                    onChange={(e) => {
                      setSubject(e.target.value);
                      clearInvalid("subject");
                    }}
                  />
                  <div className="field-error">Please add a subject.</div>
                </div>
                <div className={`field${invalid.message ? " invalid" : ""}`}>
                  <label htmlFor="c-message">
                    Message <span className="req">*</span>
                  </label>
                  <textarea
                    id="c-message"
                    name="message"
                    placeholder="Tell me a little about your project or question…"
                    value={message}
                    onChange={(e) => {
                      setMessage(e.target.value);
                      clearInvalid("message");
                    }}
                  />
                  <div className="field-error">Please write a message.</div>
                </div>
                {submitError && (
                  <div
                    className="field-error"
                    style={{ display: "block", marginBottom: "1rem" }}
                  >
                    {submitError}
                  </div>
                )}
                <div className="form-foot">
                  <span className="req-note">
                    <span className="req">*</span> Required fields
                  </span>
                  <button
                    type="submit"
                    className="btn btn-primary submit-btn"
                    data-magnetic
                  >
                    Send message <span className="arrow">→</span>
                  </button>
                </div>
              </form>
            ) : (
              <div className="form-success show">
                <div className="success-ring">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M20 6 9 17l-5-5" />
                  </svg>
                </div>
                <h3>Message sent</h3>
                <p>
                  Thanks for reaching out — I'll get back to you soon. In the
                  meantime, feel free to explore the rest of the site.
                </p>
                <Link
                  className="btn btn-ghost"
                  to="/"
                  style={{ marginTop: "0.6rem" }}
                >
                  Back to home
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>

      <PortfolioFooter variant="minimal" />
    </>
  );
};

export default ContactPageLayout;
