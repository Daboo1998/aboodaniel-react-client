import ReactMarkdown from "react-markdown";
import styled, { keyframes } from "styled-components";
import TextareaAutosize from "react-textarea-autosize";

const msgIn = keyframes`
  from { opacity: 0; transform: translateY(12px); }
  to { opacity: 1; transform: none; }
`;

const typingAnim = keyframes`
  0%, 60%, 100% { transform: translateY(0); opacity: 0.4; }
  30% { transform: translateY(-5px); opacity: 1; }
`;

export const PageContainer = styled.div`
  max-width: 820px;
  margin-inline: auto;
  padding-inline: var(--gutter);
  min-height: calc(100vh - 64px);
  display: flex;
  flex-direction: column;
  padding-top: clamp(2rem, 5vw, 3.5rem);
  padding-bottom: 2rem;
`;

export const MainContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  flex: 1;
`;

export const AsstHead = styled.div`
  text-align: center;
  margin-bottom: 1.8rem;
`;

export const AsstBadge = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1.2rem;
  font-family: var(--font-mono);
  font-size: 0.72rem;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  color: var(--text-2);
  border: 1px solid var(--border-2);
  border-radius: 999px;
  padding: 0.4rem 0.85rem;
  background: var(--surface);
`;

export const AsstBadgeDot = styled.span`
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: oklch(0.72 0.17 150);
`;

export const PageTitle = styled.h1`
  font-size: clamp(2rem, 5vw, 3.2rem);
  font-weight: 600;
  letter-spacing: -0.035em;
  color: var(--text);
  margin: 0;
`;

export const AsstSub = styled.p`
  color: var(--text-2);
  margin-top: 0.7rem;
  font-size: 1.05rem;
  max-width: 48ch;
  margin-inline: auto;
`;

export const messagesList = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 1.1rem;
  padding: 0.5rem 0.2rem 1.5rem;
  overflow-y: auto;
  min-height: 260px;
`;

export const UserMessage = styled.div`
  display: flex;
  gap: 0.8rem;
  max-width: 88%;
  align-self: flex-end;
  flex-direction: row-reverse;
  animation: ${msgIn} 0.5s cubic-bezier(0.22, 1, 0.36, 1) both;
`;

export const AssistantMessage = styled.div`
  display: flex;
  gap: 0.8rem;
  max-width: 88%;
  align-self: flex-start;
  animation: ${msgIn} 0.5s cubic-bezier(0.22, 1, 0.36, 1) both;
`;

export const MsgAvatar = styled.div<{ $isUser?: boolean }>`
  flex-shrink: 0;
  width: 32px;
  height: 32px;
  border-radius: 9px;
  display: grid;
  place-items: center;
  font-family: var(--font-mono);
  font-size: 0.72rem;
  font-weight: 600;
  background: ${({ $isUser }) => $isUser ? 'var(--accent)' : 'var(--text)'};
  color: ${({ $isUser }) => $isUser ? 'oklch(0.99 0 0)' : 'var(--bg)'};
`;

export const MsgBubble = styled.div<{ $isUser?: boolean }>`
  padding: 0.85rem 1.15rem;
  border-radius: 16px;
  font-size: 0.98rem;
  line-height: 1.6;
  color: ${({ $isUser }) => $isUser ? 'oklch(0.99 0 0)' : 'var(--text)'};
  background: ${({ $isUser }) => $isUser ? 'var(--accent)' : 'var(--surface)'};
  border: ${({ $isUser }) => $isUser ? '1px solid transparent' : '1px solid var(--border)'};
  border-top-right-radius: ${({ $isUser }) => $isUser ? '5px' : '16px'};
  border-top-left-radius: ${({ $isUser }) => $isUser ? '16px' : '5px'};
`;

export const dotsContainer = styled.div`
  display: flex;
  align-self: flex-start;
  gap: 5px;
  padding: 0.95rem 1.15rem;
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 16px;
  border-top-left-radius: 5px;
  width: fit-content;
  animation: ${msgIn} 0.5s cubic-bezier(0.22, 1, 0.36, 1) both;

  &.buttonLoader {
    align-self: center;
    background: var(--accent);
    border-color: transparent;
  }
`;

export const dots = styled.span`
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: var(--text-3);
  animation: ${typingAnim} 1.4s ease-in-out infinite;
  display: inline-block;

  &:nth-child(2) { animation-delay: 0.2s; }
  &:nth-child(3) { animation-delay: 0.4s; }
`;

/* Suggestions */
export const SuggestRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1rem;
`;

export const SuggestChip = styled.button`
  font-size: 0.88rem;
  color: var(--text);
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 999px;
  padding: 0.55rem 1rem;
  cursor: pointer;
  font-family: var(--font-sans);
  transition: border-color 0.25s, color 0.25s, transform 0.25s;

  &:hover {
    border-color: var(--accent);
    color: var(--accent);
    transform: translateY(-2px);
  }
`;

/* Composer */
export const ComposerWrap = styled.div`
  position: sticky;
  bottom: 1rem;
`;

export const Form = styled.form`
  display: flex;
  align-items: flex-end;
  gap: 0.6rem;
  padding: 0.55rem 0.55rem 0.55rem 1.1rem;
  background: var(--surface);
  border: 1px solid var(--border-2);
  border-radius: 20px;
  box-shadow: var(--shadow-md);
  transition: border-color 0.25s;

  &:focus-within { border-color: var(--accent); }

  &.isDeveloper { margin-top: 40px; }
`;

export const messageInput = styled(TextareaAutosize)`
  flex: 1;
  border: none;
  background: transparent;
  resize: none;
  outline: none;
  font-family: var(--font-sans);
  font-size: 1rem;
  color: var(--text);
  line-height: 1.5;
  max-height: 140px;
  padding: 0.55rem 0;

  &::placeholder { color: var(--text-3); }
  &:disabled { opacity: 0.5; cursor: not-allowed; }
`;

export const submitButton = styled.button`
  flex-shrink: 0;
  width: 42px;
  height: 42px;
  border-radius: 13px;
  border: none;
  cursor: pointer;
  background: var(--accent);
  color: oklch(0.99 0 0);
  display: grid;
  place-items: center;
  font-family: var(--font-sans);
  font-size: 0.85rem;
  font-weight: 500;
  transition: background 0.25s, transform 0.25s, opacity 0.25s;
  white-space: nowrap;
  padding: 0 0.75rem;
  min-width: fit-content;
  width: auto;
  border-radius: 12px;

  &:hover:not(:disabled) {
    background: var(--accent-2);
    transform: scale(1.05);
  }
  &:disabled { opacity: 0.4; cursor: not-allowed; }
`;

export const ComposerMeta = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 0.6rem;
  padding-inline: 0.4rem;
`;

export const MessageCount = styled.span`
  font-family: var(--font-mono);
  font-size: 0.72rem;
  color: var(--text-3);
`;

export const Disclaimer = styled.span`
  font-family: var(--font-mono);
  font-size: 0.72rem;
  color: var(--text-3);
`;

export const copyButton = styled.button`
  align-self: flex-end;
  height: 20px;
  width: 20px;
  background: none;
  border: none;
  cursor: pointer;
  color: var(--text-3);
  padding: 0;
  display: flex;
  align-items: center;

  &:hover { color: var(--accent); }

  svg { width: 15px; height: 15px; fill: currentColor; }
`;

export const developerInformation = styled.div`
  font-size: 0.75rem;
  align-self: flex-end;
  width: 100%;
  display: flex;
  flex-direction: column;
  color: oklch(0.6 0.2 25);

  button {
    align-self: flex-start;
    color: var(--accent);
    background: none;
    border: none;
    cursor: pointer;
    font-family: var(--font-sans);
    padding: 0;
  }
`;

export const copiedText = styled.span`
  color: var(--accent);
  font-size: 0.72rem;
  font-family: var(--font-mono);
  align-self: flex-end;
`;

export const CenteredText = styled.p`
  text-align: center;
  color: var(--text-2);
  line-height: 1.6;
  margin-bottom: 1rem;
`;

export const TextMarkdown = styled(ReactMarkdown)`
  color: inherit;
  font-size: 0.98rem;

  p { margin-top: 0.6rem; line-height: 1.6; }
  p:first-child { margin-top: 0; }

  a { color: var(--accent); text-decoration: underline; text-underline-offset: 2px; }

  code {
    font-family: var(--font-mono);
    background: var(--bg-2);
    padding: 2px 6px;
    border-radius: 5px;
    font-size: 0.88em;
  }

  blockquote {
    border-left: 3px solid var(--accent);
    padding-left: 1rem;
    margin-top: 0.6rem;
    color: var(--text-2);
  }

  ul, ol { padding-left: 1.2rem; margin-top: 0.6rem; }
  li + li { margin-top: 0.3rem; }
  li { line-height: 1.6; }

  h1, h2, h3, h4 { margin-top: 0.8rem; color: inherit; }

  strong { font-weight: 600; }
`;
