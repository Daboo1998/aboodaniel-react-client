import ReactMarkdown from "react-markdown";
import styled from "styled-components";
import TextareaAutosize from "react-textarea-autosize";
import { theme } from "../../../../../styles/theme";

// Styled-components for AskMeAnything page
export const PageContainer = styled.div`
  padding: ${theme.spacing[10]} 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
  max-width: 820px;
  align-self: center;
  margin: 0 auto;
`;

export const MainContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(15px);
  -webkit-backdrop-filter: blur(15px);
  border-radius: 28px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  padding: ${theme.spacing[8]};
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1), inset 0 0 20px rgba(0, 0, 0, 0.03),
    inset 0 0 40px rgba(0, 0, 0, 0.01);
  position: relative;
  overflow: hidden;

  /* Enhanced refraction with subtle edge rainbow */
  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: 
      /* Primary refraction layer */ linear-gradient(
        135deg,
        transparent 0%,
        rgba(255, 255, 255, 0.1) 25%,
        transparent 50%,
        rgba(255, 255, 255, 0.05) 75%,
        transparent 100%
      ),
      /* Very subtle rainbow dispersion only at extreme edges */
        linear-gradient(
          90deg,
          transparent 0%,
          rgba(255, 0, 0, 0.008) 2%,
          rgba(255, 165, 0, 0.008) 3%,
          rgba(255, 255, 0, 0.008) 4%,
          rgba(0, 255, 0, 0.008) 5%,
          rgba(0, 255, 255, 0.008) 6%,
          rgba(0, 0, 255, 0.008) 7%,
          rgba(238, 130, 238, 0.008) 8%,
          transparent 10%,
          transparent 90%,
          rgba(238, 130, 238, 0.008) 92%,
          rgba(0, 0, 255, 0.008) 93%,
          rgba(0, 255, 255, 0.008) 94%,
          rgba(0, 255, 0, 0.008) 95%,
          rgba(255, 255, 0, 0.008) 96%,
          rgba(255, 165, 0, 0.008) 97%,
          rgba(255, 0, 0, 0.008) 98%,
          transparent 100%
        );
    pointer-events: none;
  }

  @media (prefers-color-scheme: dark) {
    background: rgba(0, 0, 0, 0.1);
    color: ${theme.colors.gray[200]};
    border-color: rgba(255, 255, 255, 0.05);
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3), inset 0 0 20px rgba(0, 0, 0, 0.1),
      inset 0 0 40px rgba(0, 0, 0, 0.05);
  }
`;

export const PageTitle = styled.h1`
  text-align: center;
  padding-bottom: ${theme.spacing[20]};
  font-size: 50px;
  line-height: 60px;
  margin: 0;
  color: ${theme.colors.gray[900]};
  position: relative;
  z-index: 1;

  @media (prefers-color-scheme: dark) {
    color: ${theme.colors.white};
  }

  @media (max-width: ${theme.breakpoints.md}) {
    font-size: 36px;
    line-height: 44px;
    padding-bottom: ${theme.spacing[12]};
  }

  @media (max-width: ${theme.breakpoints.sm}) {
    font-size: 28px;
    line-height: 36px;
    padding-bottom: ${theme.spacing[8]};
  }
`;

export const CenteredText = styled.p`
  text-align: center;
  margin: 0 0 ${theme.spacing[4]} 0;
  color: ${theme.colors.gray[800]};
  line-height: 1.6;
  position: relative;
  z-index: 1;

  @media (prefers-color-scheme: dark) {
    color: ${theme.colors.gray[200]};
  }
`;

export const MessageCount = styled.p`
  text-align: right;
  color: ${theme.colors.gray[600]};
  padding-top: ${theme.spacing[10]};
  margin: 0;
  font-size: ${theme.fontSizes.sm};
  position: relative;
  z-index: 1;

  @media (prefers-color-scheme: dark) {
    color: ${theme.colors.gray[400]};
  }
`;

export const UserMessage = styled.div`
  padding: ${theme.spacing[4]};
  border-radius: 24px;
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing[2]};
  background: rgba(59, 130, 246, 0.1);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border: 1px solid rgba(59, 130, 246, 0.2);
  color: ${theme.colors.blue[800]};
  align-self: flex-start;
  max-width: 70%;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1), inset 0 0 8px rgba(0, 0, 0, 0.03),
    inset 0 0 16px rgba(0, 0, 0, 0.01);
  position: relative;
  overflow: hidden;

  /* Subtle rainbow refraction at edges */
  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(
      90deg,
      transparent 0%,
      rgba(255, 0, 0, 0.005) 2%,
      rgba(255, 165, 0, 0.005) 3%,
      rgba(255, 255, 0, 0.005) 4%,
      rgba(0, 255, 0, 0.005) 5%,
      rgba(0, 255, 255, 0.005) 6%,
      rgba(0, 0, 255, 0.005) 7%,
      rgba(238, 130, 238, 0.005) 8%,
      transparent 10%,
      transparent 90%,
      rgba(238, 130, 238, 0.005) 92%,
      rgba(0, 0, 255, 0.005) 93%,
      rgba(0, 255, 255, 0.005) 94%,
      rgba(0, 255, 0, 0.005) 95%,
      rgba(255, 255, 0, 0.005) 96%,
      rgba(255, 165, 0, 0.005) 97%,
      rgba(255, 0, 0, 0.005) 98%,
      transparent 100%
    );
    pointer-events: none;
  }

  @media (prefers-color-scheme: dark) {
    background: rgba(59, 130, 246, 0.2);
    border-color: rgba(59, 130, 246, 0.3);
    color: ${theme.colors.white};
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.3), inset 0 0 8px rgba(0, 0, 0, 0.1),
      inset 0 0 16px rgba(0, 0, 0, 0.05);
  }
`;

export const AssistantMessage = styled.div`
  padding: ${theme.spacing[4]};
  border-radius: 24px;
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing[2]};
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: ${theme.colors.gray[900]};
  align-self: flex-end;
  max-width: 70%;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1), inset 0 0 8px rgba(0, 0, 0, 0.03),
    inset 0 0 16px rgba(0, 0, 0, 0.01);
  position: relative;
  overflow: hidden;

  /* Subtle rainbow refraction at edges */
  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(
      90deg,
      transparent 0%,
      rgba(255, 0, 0, 0.005) 2%,
      rgba(255, 165, 0, 0.005) 3%,
      rgba(255, 255, 0, 0.005) 4%,
      rgba(0, 255, 0, 0.005) 5%,
      rgba(0, 255, 255, 0.005) 6%,
      rgba(0, 0, 255, 0.005) 7%,
      rgba(238, 130, 238, 0.005) 8%,
      transparent 10%,
      transparent 90%,
      rgba(238, 130, 238, 0.005) 92%,
      rgba(0, 0, 255, 0.005) 93%,
      rgba(0, 255, 255, 0.005) 94%,
      rgba(0, 255, 0, 0.005) 95%,
      rgba(255, 255, 0, 0.005) 96%,
      rgba(255, 165, 0, 0.005) 97%,
      rgba(255, 0, 0, 0.005) 98%,
      transparent 100%
    );
    pointer-events: none;
  }

  @media (prefers-color-scheme: dark) {
    background: rgba(34, 197, 94, 0.1);
    border-color: rgba(34, 197, 94, 0.2);
    color: ${theme.colors.white};
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.3), inset 0 0 8px rgba(0, 0, 0, 0.1),
      inset 0 0 16px rgba(0, 0, 0, 0.05);
  }
`;

// px-4 py-2 rounded-md bg-gray-200 dark:bg-green-300 self-end
export const dotsContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 100%;
  padding: 15px 35px;
  border-radius: 20px;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1), inset 0 0 8px rgba(0, 0, 0, 0.03),
    inset 0 0 16px rgba(0, 0, 0, 0.01);

  &.buttonLoader {
    justify-content: center;
    color: white;
    margin-top: 0 !important;
    background: rgba(59, 130, 246, 0.1);
    border-color: rgba(59, 130, 246, 0.2);

    @media screen and (min-width: 768px) {
      width: 25%;
    }
  }

  //px-4 py-2 rounded-md
  &:not(&.buttonLoader) {
    align-self: flex-end;
    justify-self: flex-end;
    width: fit-content;

    @media (prefers-color-scheme: dark) {
      background: rgba(34, 197, 94, 0.1);
      border-color: rgba(34, 197, 94, 0.2);
    }
  }
`;

export const dots = styled.div`
  position: relative;
  width: 10px;
  height: 10px;
  border-radius: 5px;
  background-color: #fff;
  color: #fff;
  animation: dot-flashing 1s infinite linear alternate;
  animation-delay: 0.5s;

  &&::after {
    left: 15px;
    width: 10px;
    height: 10px;
    border-radius: 5px;
    background-color: #fff;
    color: #fff;
    animation: dot-flashing 1s infinite alternate;
    animation-delay: 1s;
  }

  &&::before {
    left: -15px;
    width: 10px;
    height: 10px;
    border-radius: 5px;
    background-color: #fff;
    color: #fff;
    animation: dot-flashing 1s infinite alternate;
    animation-delay: 0s;
  }

  &&::before,
  &&::after {
    content: "";
    display: inline-block;
    position: absolute;
    top: 0;
  }

  @keyframes dot-flashing {
    0% {
      background-color: #fff;
    }
    50%,
    100% {
      background-color: rgba(255, 255, 255, 0.2);
    }
  }
`;

export const submitButton = styled.button`
  padding: 0.5rem 1rem;
  background: rgba(59, 130, 246, 0.1);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border: 1px solid rgba(59, 130, 246, 0.2);
  color: ${theme.colors.blue[800]};
  border-radius: 20px;
  transition: all 0.3s ease;
  margin-top: 0 !important;
  width: 100%;
  overflow-wrap: break-word;
  text-overflow: ellipsis;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1), inset 0 0 8px rgba(0, 0, 0, 0.03),
    inset 0 0 16px rgba(0, 0, 0, 0.01);
  position: relative;
  overflow: hidden;

  /* Subtle rainbow refraction at edges */
  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(
      90deg,
      transparent 0%,
      rgba(255, 0, 0, 0.005) 2%,
      rgba(255, 165, 0, 0.005) 3%,
      rgba(255, 255, 0, 0.005) 4%,
      rgba(0, 255, 0, 0.005) 5%,
      rgba(0, 255, 255, 0.005) 6%,
      rgba(0, 0, 255, 0.005) 7%,
      rgba(238, 130, 238, 0.005) 8%,
      transparent 10%,
      transparent 90%,
      rgba(238, 130, 238, 0.005) 92%,
      rgba(0, 0, 255, 0.005) 93%,
      rgba(0, 255, 255, 0.005) 94%,
      rgba(0, 255, 0, 0.005) 95%,
      rgba(255, 255, 0, 0.005) 96%,
      rgba(255, 165, 0, 0.005) 97%,
      rgba(255, 0, 0, 0.005) 98%,
      transparent 100%
    );
    pointer-events: none;
  }

  &:hover {
    background: rgba(59, 130, 246, 0.2);
    border-color: rgba(59, 130, 246, 0.3);
    transform: translateY(-1px);
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15),
      inset 0 0 8px rgba(0, 0, 0, 0.03), inset 0 0 16px rgba(0, 0, 0, 0.01);
  }

  &:disabled {
    background: rgba(210, 214, 220, 0.1);
    border-color: rgba(210, 214, 220, 0.2);
    color: rgba(210, 214, 220, 0.6);
    cursor: not-allowed;
    transform: none;
  }

  @media (prefers-color-scheme: dark) {
    background: rgba(59, 130, 246, 0.2);
    border-color: rgba(59, 130, 246, 0.3);
    color: ${theme.colors.blue[200]};
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.3), inset 0 0 8px rgba(0, 0, 0, 0.1),
      inset 0 0 16px rgba(0, 0, 0, 0.05);

    &:hover {
      background: rgba(59, 130, 246, 0.3);
      border-color: rgba(59, 130, 246, 0.4);
      box-shadow: 0 6px 20px rgba(0, 0, 0, 0.4),
        inset 0 0 8px rgba(0, 0, 0, 0.1), inset 0 0 16px rgba(0, 0, 0, 0.05);
    }

    &:disabled {
      background: rgba(156, 163, 175, 0.1);
      border-color: rgba(156, 163, 175, 0.2);
      color: rgba(156, 163, 175, 0.6);
    }
  }

  @media screen and (min-width: 768px) {
    width: 25%;
  }
`;

export const Form = styled.form`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 10px;
  padding-top: 5px !important;
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border-radius: 20px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  padding: ${theme.spacing[4]};
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1), inset 0 0 8px rgba(0, 0, 0, 0.03),
    inset 0 0 16px rgba(0, 0, 0, 0.01);

  &.isDeveloper {
    margin-top: 40px;
  }

  @media screen and (min-width: 768px) {
    flex-direction: row;
  }

  @media (prefers-color-scheme: dark) {
    background: rgba(0, 0, 0, 0.1);
    border-color: rgba(255, 255, 255, 0.05);
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.3), inset 0 0 8px rgba(0, 0, 0, 0.1),
      inset 0 0 16px rgba(0, 0, 0, 0.05);
  }

  p {
    position: absolute;
    top: -40px;
    left: 5px;

    @media screen and (min-width: 768px) {
      right: calc(26% + 5px);
      left: unset;
    }
  }
`;

export const copyButton = styled.button`
  align-self: flex-end;
  height: 24px;
  width: 24px;
  background: none;
  border: none;
  padding: 0;
  margin: 0;
  cursor: pointer;
  outline: none;

  svg {
    color: black;

    &:hover {
      color: ${theme.colors.blue[800]};
    }
  }

  @media screen and (min-width: 768px) {
    height: 15px;
    width: 15px;
    border-radius: 7.5px;
  }

  @media (prefers-color-scheme: dark) {
    svg {
      color: ${theme.colors.white};
    }
  }
`;

export const developerInformation = styled.div`
  font-size: 0.75rem;
  align-self: flex-end;
  width: 100%;
  display: flex;
  flex-direction: column;
  background: rgba(239, 68, 68, 0.1);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border: 1px solid rgba(239, 68, 68, 0.2);
  border-radius: 16px;
  padding: ${theme.spacing[3]};
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1), inset 0 0 8px rgba(0, 0, 0, 0.03),
    inset 0 0 16px rgba(0, 0, 0, 0.01);

  * {
    color: ${theme.colors.red[600]};
  }

  button {
    align-self: flex-start;
    color: #3182ce;
    background: rgba(59, 130, 246, 0.1);
    border: 1px solid rgba(59, 130, 246, 0.2);
    border-radius: 12px;
    padding: ${theme.spacing[1]} ${theme.spacing[2]};
    backdrop-filter: blur(5px);
    -webkit-backdrop-filter: blur(5px);

    &:hover {
      color: #319795;
      background: rgba(59, 130, 246, 0.2);
      border-color: rgba(59, 130, 246, 0.3);
    }
  }

  @media (prefers-color-scheme: dark) {
    background: rgba(239, 68, 68, 0.2);
    border-color: rgba(239, 68, 68, 0.3);
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.3), inset 0 0 8px rgba(0, 0, 0, 0.1),
      inset 0 0 16px rgba(0, 0, 0, 0.05);

    * {
      color: ${theme.colors.red[400]};
    }

    button {
      background: rgba(59, 130, 246, 0.2);
      border-color: rgba(59, 130, 246, 0.3);
      color: ${theme.colors.blue[300]};

      &:hover {
        background: rgba(59, 130, 246, 0.3);
        border-color: rgba(59, 130, 246, 0.4);
        color: ${theme.colors.blue[200]};
      }
    }
  }
`;

export const copiedText = styled.p`
  color: #3182ce;
  font-size: 0.75rem; /* Adjusted to prevent UI jumps across various breakpoints */
  align-self: flex-end;
  height: 24px;
  display: flex;
  align-items: center;

  @media screen and (min-width: 768px) {
    font-size: 0.5rem;
    height: 15px;
  }

  @media (prefers-color-scheme: dark) {
    color: ${theme.colors.blue[400]};
  }
`;

export const TextMarkdown = styled(ReactMarkdown)`
  * {
    color: ${theme.colors.gray[200]};

    overflow-wrap: break-word;
    hyphens: manual;
  }

  li {
    line-height: 25px;

    + li {
      margin-top: 15px;
    }
  }

  p {
    margin-top: 15px;
    line-height: 25px;
  }

  > p:first-child {
    margin-top: 0;
  }

  a {
    color: #3182ce;
  }

  code {
    background-color: #f3f4f6;
    padding: 5px;
    border-radius: 5px;
  }

  blockquote {
    border-left: 5px solid #3182ce;
    padding-left: 10px;
    margin-top: 15px;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    margin-top: 15px;
  }

  h1 {
    font-size: 2.5rem;
  }

  h2 {
    font-size: 2rem;
  }

  h3 {
    font-size: 1.75rem;
  }

  h4 {
    font-size: 1.5rem;
  }

  h5 {
    font-size: 1.25rem;
  }

  h6 {
    font-size: 1rem;
  }

  img {
    max-width: 100%;
  }

  table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 15px;
  }

  th,
  td {
    border: 1px solid #d2d6dc;
    padding: 10px;
  }

  th {
    background-color: #f3f4f6;
  }

  thead {
    background-color: #e5e7eb;
  }

  tbody {
    background-color: #f3f4f6;
  }

  tr {
    background-color: #fff;
  }

  pre {
    background-color: #f3f4f6;
    padding: 15px;
    border-radius: 5px;
    white-space: pre-wrap;
    word-break: break-word;
    overflow-x: auto;
    margin-top: 15px;
  }

  hr {
    margin-top: 15px;
    color: #d2d6dc;
  }

  ul,
  ol {
    margin-top: 15px;

    padding: 0 0 0 20px;
  }

  ul ul,
  ul ol,
  ol ul,
  ol ol {
    margin-top: 0;
  }

  ul {
    list-style-type: disc;
  }

  ol {
    list-style-type: decimal;
  }
`;

export const messagesList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 40px;
  margin-top: 40px;
  flex-grow: 1;
  position: relative;
  z-index: 1;
`;

// Remove the old Message component since we now have UserMessage and AssistantMessage
export const Message = styled.div`
  max-width: 70%;
`;

export const messageInput = styled(TextareaAutosize)`
  width: 100%;
  padding: 0.5rem 1rem;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 20px;
  opacity: 1;
  color: ${theme.colors.gray[900]};
  cursor: text;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1), inset 0 0 8px rgba(0, 0, 0, 0.03),
    inset 0 0 16px rgba(0, 0, 0, 0.01);

  &:disabled {
    opacity: 0.2;
    color: #d2d6dc;
    cursor: not-allowed;
  }

  @media screen and (min-width: 768px) {
    width: 75%;
  }

  @media (prefers-color-scheme: dark) {
    background: rgba(0, 0, 0, 0.1);
    border-color: rgba(255, 255, 255, 0.1);
    color: ${theme.colors.white};
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.3), inset 0 0 8px rgba(0, 0, 0, 0.1),
      inset 0 0 16px rgba(0, 0, 0, 0.05);
  }
`;
