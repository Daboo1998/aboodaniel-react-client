import React from "react";
import PageLayout from "../../PageLayout";
import { cx } from "../../../../../utils";

import * as styles from "./AskmeAnything.styles";
import { useAskMeAnythingContext } from "./context";

const AskMeAnythingPage: React.FC = () => {
  const minTextareaRows = 2;
  const maxTextareaRows = 5;
  const maxMessageLength = parseInt(
    process.env.REACT_APP_MAX_MESSAGE_LENGTH ?? "0"
  );

  const {
    messages,
    message,
    isLoading,
    messageInputRef,
    maxMessages,
    messageCount,
    setMessage,
    handleSendMessage,
    handleStartConversation,
  } = useAskMeAnythingContext();

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
    messageCount >= maxMessages
      ? handleStartConversation()
      : handleSendMessage();
  };

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
                "px-4 py-2 rounded-md",
                message.role === "user"
                  ? "bg-blue-500 text-white self-start"
                  : "bg-gray-200 dark:bg-green-300 self-end"
              )}
            >
              <styles.TextMarkdown>{message.message}</styles.TextMarkdown>
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
        <p className="text-right text-gray-600 pt-10">
          {messageCount}/{maxMessages}
        </p>
        {/* Here show input for the user and on the right a send button which triggers the handleSendMessage */}
        <styles.Form onSubmit={handleSubmit}>
          <styles.messageInput
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            disabled={isLoading || messageCount >= maxMessages}
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
              {messageCount >= maxMessages ? "Start new conversation" : "Send"}
            </styles.submitButton>
          )}
        </styles.Form>
      </div>
    </PageLayout>
  );
};

export default AskMeAnythingPage;
