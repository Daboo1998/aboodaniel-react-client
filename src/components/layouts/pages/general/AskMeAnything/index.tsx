import React, { useEffect, useRef } from "react";
import ReactMarkdown from "react-markdown";
import TextareaAutosize from "react-textarea-autosize";

import { useAuth } from "../../../../../contexts/AuthContext";
import { useAskMeAnythingContext } from "./context";

const suggestions = [
  { label: "What does he do now?", q: "What does Daniel do at LivePerson?" },
  { label: "Built with AI?", q: "What has Daniel built with LLMs and AI agents?" },
  { label: "His background", q: "Tell me about Daniel's experience and career" },
  { label: "Hire him", q: "How can I contact Daniel for consulting?" },
];

const AskMeAnythingPage: React.FC = () => {
  const maxMessageLength = parseInt(
    process.env.REACT_APP_MAX_MESSAGE_LENGTH ?? "0"
  );

  const { isLoggedIn, isDeveloper, isOwner } = useAuth();

  const {
    messages,
    message,
    isLoading,
    messageInputRef,
    maxMessages,
    messageCount,
    conversation_id,
    setMessage,
    handleSendMessage,
    handleStartConversation,
    handleEndConversation,
  } = useAskMeAnythingContext({ isDeveloper });

  const conversationIdRef = useRef(conversation_id);
  const messagesCountRef = useRef(messageCount);
  const chatRef = useRef<HTMLDivElement>(null);

  // 0 means "no limit" — consistent with context.tsx guard
  const canSend = (!maxMessages || messageCount < maxMessages) && !!conversation_id;

  const handleInputChange: React.ChangeEventHandler<HTMLTextAreaElement> = (
    event
  ) => {
    if (isOwner || event.target.value.length <= maxMessageLength) {
      setMessage(event.target.value);
    }
  };

  const handleKeyDown: React.KeyboardEventHandler<HTMLTextAreaElement> = (
    event
  ) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      if (canSend) handleSendMessage();
    }
  };

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    if (canSend) {
      handleSendMessage();
    } else {
      handleStartConversation(isLoggedIn && isOwner);
    }
  };

  const handleSuggestion = (q: string) => {
    setMessage(q);
    messageInputRef.current?.focus();
  };

  useEffect(() => {
    conversationIdRef.current = conversation_id;
    messagesCountRef.current = messageCount;
  }, [conversation_id, messageCount]);

  useEffect(() => {
    document.title = "Daniel Aboo — AI Assistant";
    handleStartConversation(isLoggedIn && isOwner);

    return () => {
      if (conversationIdRef.current && messagesCountRef.current === 0) {
        handleEndConversation(conversationIdRef.current);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // keep the chat scrolled to the latest message
  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  const showTyping =
    isLoading && messages[messages.length - 1]?.role === "user";

  return (
    <div className="asst-wrap asst-page">
      <div className="asst-head">
        <span className="asst-badge">
          <span className="dot" /> Online · Beta
        </span>
        <h1 className="asst-title">Ask me anything</h1>
        <p className="asst-sub">
          {isOwner
            ? "Hi Daniel, I'm your personal assistant. How can I help you today?"
            : "A small demo of what I build. This assistant knows Daniel's background — or it can pass a message straight to him."}
        </p>
      </div>

      <div className="chat" id="chat" aria-live="polite" ref={chatRef}>
        {messages.map((m, index) => {
          const isUser = m.role === "user";
          return (
            <div className={`msg ${isUser ? "user" : "bot"}`} key={index}>
              <span className="avatar">{isUser ? "You" : "DA"}</span>
              <div className="bubble">
                {isUser ? (
                  <p>{m.message}</p>
                ) : (
                  <ReactMarkdown>{m.message}</ReactMarkdown>
                )}
              </div>
            </div>
          );
        })}
        {showTyping && (
          <div className="typing" aria-label="Assistant is typing">
            <span />
            <span />
            <span />
          </div>
        )}
      </div>

      <div className="composer" id="composer-region">
        {messages.length === 0 && (
          <div className="suggest" id="suggest">
            {suggestions.map((s) => (
              <button
                key={s.q}
                type="button"
                className="suggest-chip"
                disabled={!conversation_id || isLoading}
                onClick={() => handleSuggestion(s.q)}
              >
                {s.label}
              </button>
            ))}
          </div>
        )}
        <form className="composer-inner" id="composer" onSubmit={handleSubmit}>
          <TextareaAutosize
            id="msg-input"
            minRows={1}
            maxRows={6}
            placeholder="Ask about Daniel's work, projects, skills…"
            aria-label="Message"
            value={message}
            ref={messageInputRef}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            disabled={isLoading || !canSend}
          />
          <button
            className="send-btn"
            id="send-btn"
            type="submit"
            aria-label={canSend ? "Send" : "Start new conversation"}
            disabled={isLoading || (canSend && !message.trim())}
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 19V5M5 12l7-7 7 7" />
            </svg>
          </button>
        </form>
        <div className="composer-meta">
          <span className="disclaimer">
            {canSend
              ? "Demo · responses are illustrative"
              : "Conversation ended — send to start a new one"}
          </span>
          <span id="counter">
            {messageCount} / {maxMessages || "∞"}
          </span>
        </div>
      </div>
    </div>
  );
};

export default AskMeAnythingPage;
