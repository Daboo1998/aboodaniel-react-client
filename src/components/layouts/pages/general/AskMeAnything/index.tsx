import React, { useEffect, useRef, useState } from "react";
import PageLayout from "../../PageLayout";
import { cx } from "../../../../../utils";

import { useAuth } from "../../../../../contexts/AuthContext";
import * as styles from "./AskmeAnything.styles";
import { useAskMeAnythingContext } from "./context";

const AskMeAnythingPage: React.FC = () => {
  const minTextareaRows = 2;
  const maxTextareaRows = 5;
  const maxMessageLength = parseInt(
    process.env.REACT_APP_MAX_MESSAGE_LENGTH ?? "0"
  );

  const { isLoggedIn, isDeveloper } = useAuth();

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
    if (event.target.value.length <= maxMessageLength) {
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
      handleStartConversation();
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
    handleStartConversation();

    return () => {
      if (threadIdRef.current && messagesCountRef.current === 0) {
        handleEndConversation(threadIdRef.current);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <PageLayout
      title="Home"
      className="py-10 flex flex-col items-center h-full"
      style={{ maxWidth: 820, alignSelf: "center" }}
    >
      <div
        className="w-full h-full"
        style={{ display: "flex", flexDirection: "column" }}
      >
        <h1
          className="text-center pb-20"
          style={{ fontSize: "50px", lineHeight: "60px" }}
        >
          Ask me anything!
        </h1>
        {isLoggedIn && isDeveloper && (
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
              <button onClick={() => handleStartConversation()}>
                Start Conversation
              </button>
            )}
          </styles.developerInformation>
        )}
        <p>
          You can ask me anything about Daniel Aboo. I will try to answer your
          questions as best as I can 😁
        </p>
        {/* List messages */}
        <styles.messagesList>
          {messages.map((message, index) => (
            <div
              key={index}
              style={{ maxWidth: "70%" }}
              className={cx(
                // I want you to style differently the messages from the user and the assistant so that the user messages are on the left and the assistant messages are on the right and also make sure to make background different and text different. remember about the dark and light theme
                "px-4 py-2 rounded-md flex flex-col space-y-2",
                message.role === "user"
                  ? "bg-blue-500 text-white self-start"
                  : "bg-gray-200 dark:bg-green-300 self-end"
              )}
            >
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
                      clipRule="evenodd"
                      fillRule="evenodd"
                      strokeLinejoin="round"
                      strokeMiterlimit="2"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                    >
                      <path
                        d="m6 19v2c0 .621.52 1 1 1h2v-1.5h-1.5v-1.5zm7.5 3h-3.5v-1.5h3.5zm4.5 0h-3.5v-1.5h3.5zm4-3h-1.5v1.5h-1.5v1.5h2c.478 0 1-.379 1-1zm-1.5-1v-3.363h1.5v3.363zm0-4.363v-3.637h1.5v3.637zm-13-3.637v3.637h-1.5v-3.637zm11.5-4v1.5h1.5v1.5h1.5v-2c0-.478-.379-1-1-1zm-10 0h-2c-.62 0-1 .519-1 1v2h1.5v-1.5h1.5zm4.5 1.5h-3.5v-1.5h3.5zm3-1.5v-2.5h-13v13h2.5v-1.863h1.5v3.363h-4.5c-.48 0-1-.379-1-1v-14c0-.481.38-1 1-1h14c.621 0 1 .522 1 1v4.5h-3.5v-1.5z"
                        fillRule="nonzero"
                      />
                    </svg>
                  </styles.copyButton>
                ) : (
                  <styles.copiedText>Copied to clipboard!</styles.copiedText>
                ))}
            </div>
          ))}
          {/* If loading and last message is with .role == "user", add a message with three dots loader animated */}
          {isLoading && messages[messages.length - 1]?.role === "user" && (
            <styles.dotsContainer>
              <styles.dots />
            </styles.dotsContainer>
          )}
        </styles.messagesList>
        {/* Add messages/maxMessages */}
        {!isDeveloper && (
          <p className="text-right text-gray-600 pt-10">
            {messageCount}/{maxMessages}
          </p>
        )}
        {/* Here show input for the user and on the right a send button which triggers the handleSendMessage */}
        <styles.Form
          onSubmit={handleSubmit}
          className={cx(isDeveloper && "isDeveloper")}
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
          <p>
            {message.length}/{maxMessageLength}
          </p>

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
      </div>
    </PageLayout>
  );
};

export default AskMeAnythingPage;
