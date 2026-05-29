import React, { useEffect, useRef, useState } from "react";

import { useAuth } from "../../../../../contexts/AuthContext";
import * as styles from "./AskmeAnything.styles";
import { useAskMeAnythingContext } from "./context";

const SendIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 19V5M5 12l7-7 7 7"/>
  </svg>
);

const suggestions = [
  { label: "What does he do now?", q: "What does Daniel do at LivePerson?" },
  { label: "Built with AI?", q: "What has Daniel built with LLMs and AI agents?" },
  { label: "His background", q: "Tell me about Daniel's experience and career" },
  { label: "Hire him", q: "How can I contact Daniel for consulting?" },
];

const AskMeAnythingPage: React.FC = () => {
  const minTextareaRows = 1;
  const maxTextareaRows = 5;
  const maxMessageLength = parseInt(process.env.REACT_APP_MAX_MESSAGE_LENGTH ?? "0");

  const { isLoggedIn, isDeveloper, isOwner } = useAuth();

  const {
    messages,
    message,
    isLoading,
    messageInputRef,
    maxMessages,
    messageCount,
    thread_id,
    assistant_id,
    setMessage,
    handleSendMessage,
    handleStartConversation,
    handleEndConversation,
  } = useAskMeAnythingContext({ isDeveloper });

  const threadIdRef = useRef(thread_id);
  const messagesCountRef = useRef(messageCount);
  const chatRef = useRef<HTMLDivElement>(null);
  const [suggestionsHidden, setSuggestionsHidden] = useState(false);

  const [copiedMessageIndex, setCopiedMessageIndex] = useState<number | null>(null);

  const handleInputChange: React.ChangeEventHandler<HTMLTextAreaElement> = (event) => {
    if (isOwner || event.target.value.length <= maxMessageLength) {
      setMessage(event.target.value);
    }
  };

  const handleKeyDown: React.KeyboardEventHandler<HTMLTextAreaElement> = (event) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      handleSendMessage();
    }
  };

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    if (messageCount < maxMessages && thread_id) {
      handleSendMessage();
    } else {
      handleStartConversation(isLoggedIn && isOwner);
    }
  };

  const handleSuggestion = (q: string) => {
    setMessage(q);
    setSuggestionsHidden(true);
    setTimeout(() => {
      handleSendMessage();
    }, 50);
  };

  const copyToClipboard = (msg: string) => {
    navigator.clipboard.writeText(msg);
  };

  useEffect(() => {
    threadIdRef.current = thread_id;
    messagesCountRef.current = messageCount;
  }, [thread_id, messageCount]);

  useEffect(() => {
    handleStartConversation(isLoggedIn && isOwner);
    return () => {
      if (threadIdRef.current && messagesCountRef.current === 0) {
        handleEndConversation(threadIdRef.current);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  return (
    <styles.PageContainer>
      <styles.MainContainer>
        {/* Header */}
        <styles.AsstHead>
          <styles.AsstBadge>
            <styles.AsstBadgeDot />
            Online · Beta
          </styles.AsstBadge>
          <styles.PageTitle>Ask me anything</styles.PageTitle>
          <styles.AsstSub>
            {isOwner
              ? "Hi Daniel, I'm your personal assistant. How can I help you today?"
              : "A small demo of what I build. This assistant knows Daniel's background — or it can pass a message straight to him."}
          </styles.AsstSub>
        </styles.AsstHead>

        {/* Developer info */}
        {isLoggedIn && isDeveloper && new URLSearchParams(window.location.search).get("debug_mode") === "true" && (
          <styles.developerInformation>
            <p><b>Assistant:</b> {assistant_id}</p>
            <p><b>Thread:</b> {thread_id}</p>
            {thread_id ? (
              <button onClick={() => handleEndConversation()}>End Conversation</button>
            ) : (
              <>
                <button onClick={() => handleStartConversation(isLoggedIn && isOwner)}>Start Conversation</button>
                {isLoggedIn && isOwner && (
                  <button onClick={() => handleStartConversation(false)}>Start Conversation with General Assistant</button>
                )}
              </>
            )}
          </styles.developerInformation>
        )}

        {/* Chat */}
        <styles.messagesList ref={chatRef}>
          {messages.map((msg, index) => {
            const isUser = msg.role === "user";
            if (isUser) {
              return (
                <styles.UserMessage key={index}>
                  <styles.MsgAvatar $isUser>You</styles.MsgAvatar>
                  <styles.MsgBubble $isUser>
                    <styles.TextMarkdown>{msg.message}</styles.TextMarkdown>
                  </styles.MsgBubble>
                </styles.UserMessage>
              );
            }
            return (
              <styles.AssistantMessage key={index}>
                <styles.MsgAvatar>DA</styles.MsgAvatar>
                <styles.MsgBubble>
                  <styles.TextMarkdown>{msg.message}</styles.TextMarkdown>
                  {copiedMessageIndex !== index ? (
                    <styles.copyButton
                      onClick={() => { copyToClipboard(msg.message); setCopiedMessageIndex(index); setTimeout(() => setCopiedMessageIndex(null), 2000); }}
                      title="Copy to clipboard"
                    >
                      <svg clipRule="evenodd" fillRule="evenodd" strokeLinejoin="round" strokeMiterlimit="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="currentColor">
                        <path d="m6 19v2c0 .621.52 1 1 1h2v-1.5h-1.5v-1.5zm7.5 3h-3.5v-1.5h3.5zm4.5 0h-3.5v-1.5h3.5zm4-3h-1.5v1.5h-1.5v1.5h2c.478 0 1-.379 1-1zm-1.5-1v-3.363h1.5v3.363zm0-4.363v-3.637h1.5v3.637zm-13-3.637v3.637h-1.5v-3.637zm11.5-4v1.5h1.5v1.5h1.5v-2c0-.478-.379-1-1-1zm-10 0h-2c-.62 0-1 .519-1 1v2h1.5v-1.5h1.5zm4.5 1.5h-3.5v-1.5h3.5zm3-1.5v-2.5h-13v13h2.5v-1.863h1.5v3.363h-4.5c-.48 0-1-.379-1-1v-14c0-.481.38-1 1-1h14c.621 0 1 .522 1 1v4.5h-3.5v-1.5z" fillRule="nonzero"/>
                      </svg>
                    </styles.copyButton>
                  ) : (
                    <styles.copiedText>Copied!</styles.copiedText>
                  )}
                </styles.MsgBubble>
              </styles.AssistantMessage>
            );
          })}

          {isLoading && messages[messages.length - 1]?.role === "user" && (
            <div style={{ display: 'flex', gap: '0.8rem', alignSelf: 'flex-start' }}>
              <styles.MsgAvatar>DA</styles.MsgAvatar>
              <styles.dotsContainer>
                <styles.dots />
                <styles.dots />
                <styles.dots />
              </styles.dotsContainer>
            </div>
          )}
        </styles.messagesList>

        {/* Composer */}
        <styles.ComposerWrap>
          {!suggestionsHidden && messages.length === 0 && (
            <styles.SuggestRow>
              {suggestions.map(s => (
                <styles.SuggestChip key={s.q} onClick={() => handleSuggestion(s.q)}>
                  {s.label}
                </styles.SuggestChip>
              ))}
            </styles.SuggestRow>
          )}

          <styles.Form onSubmit={handleSubmit} className={isDeveloper ? "isDeveloper" : ""}>
            <styles.messageInput
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              disabled={isLoading || messageCount >= maxMessages || !thread_id}
              value={message}
              ref={messageInputRef}
              minRows={minTextareaRows}
              maxRows={maxTextareaRows}
              placeholder="Ask about Daniel's work, projects, skills…"
            />
            {!isOwner && message.length > 0 && (
              <span style={{ position: 'absolute', bottom: '100%', right: '0.5rem', fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--text-3)' }}>
                {message.length}/{maxMessageLength}
              </span>
            )}
            {isLoading ? (
              <styles.dotsContainer className="buttonLoader">
                <styles.dots />
                <styles.dots />
                <styles.dots />
              </styles.dotsContainer>
            ) : (
              <styles.submitButton type="submit" disabled={isLoading}>
                {messageCount >= maxMessages || !thread_id ? "New chat" : <SendIcon />}
              </styles.submitButton>
            )}
          </styles.Form>

          <styles.ComposerMeta>
            <styles.Disclaimer>Demo · responses are illustrative</styles.Disclaimer>
            {!isDeveloper && (
              <styles.MessageCount>{messageCount} / {maxMessages}</styles.MessageCount>
            )}
          </styles.ComposerMeta>
        </styles.ComposerWrap>
      </styles.MainContainer>
    </styles.PageContainer>
  );
};

export default AskMeAnythingPage;
