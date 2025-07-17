import React, { useEffect, useRef, useState } from "react";
import PageLayout from "../../PageLayout";

import { useAuth } from "../../../../../contexts/AuthContext";
import * as styles from "./AskmeAnything.styles";
import { useAskMeAnythingContext } from "./context";

const AskMeAnythingPage: React.FC = () => {
  const minTextareaRows = 2;
  const maxTextareaRows = 5;
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
    thread_id,
    assistant_id,
    setMessage,
    handleSendMessage,
    handleStartConversation,
    handleEndConversation,
  } = useAskMeAnythingContext({ isDeveloper });

  const threadIdRef = useRef(thread_id);
  const messagesCountRef = useRef(messageCount);

  const [copiedMessageIndex, setCopiedMessageIndex] = useState<number | null>(
    null
  );

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

  const copyToClipboard = (message: string) => {
    navigator.clipboard.writeText(message);
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

  return (
    <PageLayout title="Home">
      <styles.PageContainer>
        <styles.MainContainer>
          <styles.PageTitle>Ask me anything!</styles.PageTitle>
          {isLoggedIn &&
            isDeveloper &&
            new URLSearchParams(window.location.search).get("debug_mode") ===
              "true" && (
              <styles.developerInformation>
                <p>
                  <b>Assistant:</b> {assistant_id}
                </p>
                <p>
                  <b>Thread:</b> {thread_id}
                </p>
                {thread_id ? (
                  <button onClick={() => handleEndConversation()}>
                    End Conversation
                  </button>
                ) : (
                  <>
                    <button
                      onClick={() =>
                        handleStartConversation(isLoggedIn && isOwner)
                      }
                    >
                      Start Conversation
                    </button>
                    {isLoggedIn && isOwner && (
                      <button onClick={() => handleStartConversation(false)}>
                        Start Conversation with General Assistant
                      </button>
                    )}
                  </>
                )}
              </styles.developerInformation>
            )}
          {isOwner ? (
            <p>
              Hi Daniel, I'm your personal assistant. How can I help you today?
            </p>
          ) : (
            <styles.CenteredText>
              You can ask me anything about Daniel Aboo. I will try to answer
              your questions as best as I can 😁 <br />
              <br />I can also inform Daniel about anything, if you have any
              questions to him directly.
            </styles.CenteredText>
          )}
          {/* List messages */}
          <styles.messagesList>
            {messages.map((message, index) => {
              const MessageComponent =
                message.role === "user"
                  ? styles.UserMessage
                  : styles.AssistantMessage;
              return (
                <MessageComponent key={index}>
                  <styles.TextMarkdown>{message.message}</styles.TextMarkdown>
                  {message.role !== "user" &&
                    (copiedMessageIndex !== index ? (
                      <styles.copyButton
                        onClick={() => {
                          copyToClipboard(message.message);
                          setCopiedMessageIndex(index);
                          setTimeout(() => setCopiedMessageIndex(null), 2000);
                        }}
                        style={{ cursor: "pointer" }}
                        title="Copy to clipboard"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="currentColor"
                          viewBox="0 0 16 16"
                        >
                          <path
                            fill-rule="evenodd"
                            d="M4 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2zm2-1a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1zM2 5a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1v-1h1v1a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h1v1z"
                          />
                        </svg>
                      </styles.copyButton>
                    ) : (
                      <styles.copiedText>
                        Copied to clipboard!
                      </styles.copiedText>
                    ))}
                </MessageComponent>
              );
            })}
            {/* If loading and last message is with .role == "user", add a message with three dots loader animated */}
            {isLoading && messages[messages.length - 1]?.role === "user" && (
              <styles.dotsContainer>
                <styles.dots />
              </styles.dotsContainer>
            )}
          </styles.messagesList>
          {/* Add messages/maxMessages */}
          {!isDeveloper && (
            <styles.MessageCount>
              {messageCount}/{maxMessages}
            </styles.MessageCount>
          )}
          {/* Here show input for the user and on the right a send button which triggers the handleSendMessage */}
          <styles.Form
            onSubmit={handleSubmit}
            className={isDeveloper ? "isDeveloper" : ""}
          >
            <styles.messageInput
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              disabled={isLoading || messageCount >= maxMessages || !thread_id}
              value={message}
              ref={messageInputRef}
              minRows={minTextareaRows}
              maxRows={maxTextareaRows}
            />
            {!isOwner && (
              <p>
                {message.length}/{maxMessageLength}
              </p>
            )}

            {isLoading ? (
              <styles.dotsContainer className="buttonLoader">
                <styles.dots />
              </styles.dotsContainer>
            ) : (
              <styles.submitButton type="submit" disabled={isLoading}>
                {messageCount >= maxMessages || !thread_id
                  ? "Start new conversation"
                  : "Send"}
              </styles.submitButton>
            )}
          </styles.Form>
        </styles.MainContainer>
      </styles.PageContainer>
    </PageLayout>
  );
};

export default AskMeAnythingPage;
