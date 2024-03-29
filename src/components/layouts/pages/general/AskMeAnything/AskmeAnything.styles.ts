import ReactMarkdown from "react-markdown";
import styled from "styled-components";
import TextareaAutosize from "react-textarea-autosize";

// px-4 py-2 rounded-md bg-gray-200 dark:bg-green-300 self-end
export const dotsContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 100%;
  padding: 15px 35px;
  border-radius: 5px;

  &.buttonLoader {
    justify-content: center;
    color: white;
    margin-top: 0 !important;
    background-color: rgb(59 130 246);

    @media screen and (min-width: 768px) {
      width: 25%;
    }
  }

  //px-4 py-2 rounded-md
  &:not(&.buttonLoader) {
    background-color: rgb(229 231 235);
    align-self: flex-end;
    justify-self: flex-end;
    width: fit-content;

    @media (prefers-color-scheme: dark) {
      background-color: rgb(134 239 172);
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
  background-color: #3182ce;
  color: white;
  border-radius: 5px;
  transition: background-color 0.3s;
  margin-top: 0 !important;
  width: 100%;
  overflow-wrap: break-word;
  text-overflow: ellipsis;

  &:hover {
    background-color: #319795;
  }

  &:disabled {
    background-color: #d2d6dc;
    color: #d2d6dc;
    cursor: not-allowed;
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

  &.isDeveloper {
    margin-top: 40px;
  }

  @media screen and (min-width: 768px) {
    flex-direction: row;
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

  svg {
    color: black;

    &:hover {
      color: #3182ce;
    }
  }

  @media screen and (min-width: 768px) {
    height: 15px;
    width: 15px;
  }
`;

export const developerInformation = styled.div`
  font-size: 0.75rem;
  align-self: flex-end;
  width: 100%;
  display: flex;
  flex-direction: column;

  * {
    color: red;
  }

  button {
    align-self: flex-start;
    color: #3182ce;

    &:hover {
      color: #319795;
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
`;

export const TextMarkdown = styled(ReactMarkdown)`
  * {
    color: black;

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
`;

export const Message = styled.div`
  max-width: 70%;
`;

export const messageInput = styled(TextareaAutosize)`
  width: 100%;
  padding: 0.5rem 1rem;
  border: 1px solid #d2d6dc;
  border-radius: 5px;
  opacity: 1;
  color: black;
  cursor: text;

  &:disabled {
    opacity: 0.2;
    color: #d2d6dc;
    cursor: not-allowed;
  }

  @media screen and (min-width: 768px) {
    width: 75%;
  }

  @media (prefers-color-scheme: dark) {
    border: 1px solid #9ca3af;
    color: white;
  }
`;
