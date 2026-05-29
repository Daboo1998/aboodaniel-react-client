import React, { useState, useEffect } from "react";
import validator from "validator";
import { useAuth } from "../../../../contexts/AuthContext";
import database, { Timestamp } from "../../../../data/database";
import useNavigation from "../../../../hooks/useNavigation";
import {
  ContactPageWrapper,
  ContactGrid,
  ContactLeft,
  ContactKicker,
  ContactKickerIdx,
  ContactHeading,
  ContactLead,
  ContactStatus,
  StatusDot,
  ContactMethods,
  Method,
  MethodIco,
  MethodText,
  MethodLabel,
  MethodValue,
  FormCard,
  FormField,
  FieldError,
  FieldRow,
  FormFoot,
  ReqNote,
  SubmitBtn,
  FormSuccess,
  SuccessRing,
  SuccessTitle,
  SuccessDesc,
  BackHomeBtn,
} from "./ContactPageLayout.styled";

const EmailIcon = () => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
    <rect x="3" y="5" width="18" height="14" rx="2"/>
    <path d="m3 7 9 6 9-6"/>
  </svg>
);
const PhoneIcon = () => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
    <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3 19.5 19.5 0 0 1-6-6 19.8 19.8 0 0 1-3-8.6A2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2z"/>
  </svg>
);
const LinkedInIcon = () => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
    <path d="M4.98 3.5A2.5 2.5 0 1 1 5 8.5a2.5 2.5 0 0 1 0-5zM3 9h4v12H3zM10 9h3.8v1.7h.05c.53-1 1.83-2.05 3.77-2.05 4.03 0 4.78 2.65 4.78 6.1V21h-4v-5.3c0-1.27-.02-2.9-1.77-2.9s-2.04 1.38-2.04 2.8V21h-4z"/>
  </svg>
);
const CheckIcon = () => (
  <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 6 9 17l-5-5"/>
  </svg>
);

interface FormErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

const ContactPageLayout: React.FC = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const auth = useAuth();
  const navigation = useNavigation();

  useEffect(() => {
    if (auth.isLoggedIn) {
      setEmail(auth.user?.email ?? "");
      setName(auth.user?.displayName ?? "");
    }
  }, [auth.isLoggedIn, auth.user]);

  const validate = (): FormErrors => {
    const e: FormErrors = {};
    if (!name.trim()) e.name = "Please enter your name.";
    if (!email.trim()) e.email = "Please enter a valid email.";
    else if (!validator.isEmail(email)) e.email = "Please enter a valid email.";
    if (!subject.trim()) e.subject = "Please add a subject.";
    if (!message.trim()) e.message = "Please write a message.";
    return e;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setErrors({});
    setSubmitting(true);
    try {
      await database.messages.post({
        timestamp: Timestamp.now(),
        email, name, subject, message,
      });
      setSubmitted(true);
    } catch (err: any) {
      setErrors({ message: err.message || "Something went wrong. Please try again." });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <ContactPageWrapper>
      <ContactGrid>
        {/* Left column */}
        <ContactLeft>
          <ContactKicker><ContactKickerIdx>✳</ContactKickerIdx> — Contact</ContactKicker>
          <ContactHeading>Let's build something.</ContactHeading>
          <ContactLead>
            Have an AI project, need prompt-engineering help, or just want to talk shop about conversational AI?
            Drop a line — I read every message.
          </ContactLead>
          <ContactStatus>
            <StatusDot />
            Available for select consulting
          </ContactStatus>

          <ContactMethods>
            <Method href="mailto:me@aboodaniel.pl">
              <MethodIco className="m-ico"><EmailIcon /></MethodIco>
              <MethodText>
                <MethodLabel>Email</MethodLabel>
                <MethodValue>me@aboodaniel.pl</MethodValue>
              </MethodText>
            </Method>
            <Method href="tel:+48601951169">
              <MethodIco className="m-ico"><PhoneIcon /></MethodIco>
              <MethodText>
                <MethodLabel>Phone</MethodLabel>
                <MethodValue>+48 601 951 169</MethodValue>
              </MethodText>
            </Method>
            <Method href="https://www.linkedin.com/in/danielaboo" target="_blank" rel="noopener noreferrer">
              <MethodIco className="m-ico"><LinkedInIcon /></MethodIco>
              <MethodText>
                <MethodLabel>Social</MethodLabel>
                <MethodValue>LinkedIn</MethodValue>
              </MethodText>
            </Method>
          </ContactMethods>
        </ContactLeft>

        {/* Form card */}
        <FormCard>
          {submitted ? (
            <FormSuccess>
              <SuccessRing><CheckIcon /></SuccessRing>
              <SuccessTitle>Message sent</SuccessTitle>
              <SuccessDesc>Thanks for reaching out — I'll get back to you soon. In the meantime, feel free to explore the rest of the site.</SuccessDesc>
              <BackHomeBtn onClick={() => navigation.navigateTo('/')}>Back to home</BackHomeBtn>
            </FormSuccess>
          ) : (
            <form onSubmit={handleSubmit} noValidate>
              <FieldRow>
                <FormField $invalid={!!errors.name}>
                  <label htmlFor="c-name">Name <span className="req">*</span></label>
                  <input
                    type="text"
                    id="c-name"
                    value={name}
                    onChange={e => { setName(e.target.value); setErrors(er => ({ ...er, name: undefined })); }}
                    placeholder="Your name"
                    autoComplete="name"
                  />
                  {errors.name && <FieldError>{errors.name}</FieldError>}
                </FormField>
                <FormField $invalid={!!errors.email}>
                  <label htmlFor="c-email">Email <span className="req">*</span></label>
                  <input
                    type="email"
                    id="c-email"
                    value={email}
                    onChange={e => { setEmail(e.target.value); setErrors(er => ({ ...er, email: undefined })); }}
                    placeholder="you@example.com"
                    autoComplete="email"
                  />
                  {errors.email && <FieldError>{errors.email}</FieldError>}
                </FormField>
              </FieldRow>
              <FormField $invalid={!!errors.subject}>
                <label htmlFor="c-subject">Subject <span className="req">*</span></label>
                <input
                  type="text"
                  id="c-subject"
                  value={subject}
                  onChange={e => { setSubject(e.target.value); setErrors(er => ({ ...er, subject: undefined })); }}
                  placeholder="What's this about?"
                />
                {errors.subject && <FieldError>{errors.subject}</FieldError>}
              </FormField>
              <FormField $invalid={!!errors.message}>
                <label htmlFor="c-message">Message <span className="req">*</span></label>
                <textarea
                  id="c-message"
                  value={message}
                  onChange={e => { setMessage(e.target.value); setErrors(er => ({ ...er, message: undefined })); }}
                  placeholder="Tell me a little about your project or question…"
                />
                {errors.message && <FieldError>{errors.message}</FieldError>}
              </FormField>
              <FormFoot>
                <ReqNote><span>*</span> Required fields</ReqNote>
                <SubmitBtn type="submit" disabled={submitting}>
                  {submitting ? 'Sending…' : 'Send message →'}
                </SubmitBtn>
              </FormFoot>
            </form>
          )}
        </FormCard>
      </ContactGrid>
    </ContactPageWrapper>
  );
};

export default ContactPageLayout;
