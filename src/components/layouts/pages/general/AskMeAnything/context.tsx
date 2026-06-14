import {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
  createRef,
} from "react";

type Message = {
  role: string;
  message: string;
};

export interface AskMeAnythingContextProps {
  messages: Message[];
  conversation_id: string | undefined;
  prompt_id: string | undefined;
  message: string;
  isLoading: boolean;
  messageInputRef: React.RefObject<HTMLTextAreaElement>;
  messageCount: number;
  maxMessages: number;
  setMessage: (message: string) => void;
  handleSendMessage: () => void;
  handleStartConversation: (isPersonal?: boolean) => void;
  handleEndConversation: (conversationId: string | undefined) => void;
}

export const AskMeAnythingContext = createContext<AskMeAnythingContextProps>(
  {} as AskMeAnythingContextProps
);

export const useAskMeAnythingContext = ({
  isDeveloper,
}: {
  isDeveloper: boolean;
}) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [conversation_id, setConversationId] = useState<string | undefined>();
  const [prompt_id, setPromptId] = useState<string | undefined>();
  const [message, setMessage] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [messageCount, setMessageCount] = useState<number>(0);

  const messageInputRef = useMemo(() => createRef<HTMLTextAreaElement>(), []);
  const maxMessages = parseInt(
    process.env.REACT_APP_MAX_MESSAGES_PER_CONVERSATION ?? "0"
  );

  const apiKey = useMemo(() => process.env.REACT_APP_AWS_LAMBDA_API_KEY, []);

  const handleStartConversation = useCallback(
    async (isPersonal: boolean = false) => {
      setMessages([]);
      setMessageCount(0);
      if (!apiKey) {
        alert("API key is not set");
        return;
      }

      try {
        setIsLoading(true);
        const response = await fetch(
          `https://api.aboodaniel.pl/start_conversation_with_me?isPrivate=${isPersonal}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              "x-api-key": apiKey,
            },
          }
        );

        if (response.ok) {
          const { conversation_id, prompt_id } = await response.json();

          setConversationId(conversation_id);
          setPromptId(prompt_id);
        } else {
          alert("Failed to start conversation");
        }
      } catch (error) {
        console.error(error);
      }
      setIsLoading(false);
    },
    [apiKey]
  );

  const handleEndConversation = useCallback(
    async (conversationId: string | undefined = conversation_id) => {
      if (!conversationId) {
        return;
      }

      setIsLoading(true);
      try {
        if (!apiKey) {
          alert("API key is not set");
          return;
        }

        const response = await fetch(
          "https://api.aboodaniel.pl/end_conversation_with_me",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "x-api-key": apiKey,
            },
            body: JSON.stringify({
              conversation_id: conversationId,
            }),
          }
        );

        setConversationId(undefined);

        if (!response.ok) {
          alert("Failed to end conversation");
        }
      } catch (error) {
        console.error(error);
      }
      setIsLoading(false);
    },
    [apiKey, conversation_id]
  );

  const handleSendMessage = useCallback(async () => {
    // A limit only applies to non-developers when a positive max is configured.
    // A missing/zero env value means "no limit" rather than blocking everything.
    if (!isDeveloper && maxMessages > 0 && messageCount >= maxMessages) {
      alert("Max messages reached");
      return;
    }

    if (!apiKey) {
      alert("API key is not set");
      return;
    }

    const oldMessageCount = messageCount;
    const newMessageCount = oldMessageCount + 1;
    setMessageCount(newMessageCount);

    const sentMessage = message;
    setMessages((prev) => [
      ...prev,
      {
        role: "user",
        message: sentMessage,
      },
    ]);
    setMessage("");

    try {
      setIsLoading(true);
      const response = await fetch(
        "https://api.aboodaniel.pl/ask_me_anything",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-api-key": apiKey,
          },
          body: JSON.stringify({
            conversation_id,
            prompt_id,
            message: sentMessage,
            isLastMessage: maxMessages > 0 && newMessageCount === maxMessages,
          }),
        }
      );

      if (response.ok) {
        // Responses API is synchronous: the reply comes back in one call.
        const { reply, stop } = await response.json();

        const cleanReply = (reply ?? "")
          .replace(/\[ASSISTANT_MESSAGE\].*?\[\/ASSISTANT_MESSAGE\]/gs, "")
          .trim();

        if (cleanReply) {
          setMessages((prev) => [
            ...prev,
            {
              role: "assistant",
              message: cleanReply,
            },
          ]);
        }

        if (stop) {
          console.log("Stop Conversation by assistant");
          setConversationId(undefined);
        }
      } else {
        alert("Failed to send message");
        setMessageCount(oldMessageCount);
        setMessages((prev) => {
          for (let i = prev.length - 1; i >= 0; i--) {
            if (prev[i].role === "user" && prev[i].message === sentMessage) {
              return [...prev.slice(0, i), ...prev.slice(i + 1)];
            }
          }
          return prev;
        });
      }
    } catch (error) {
      console.error(error);
      setMessageCount(oldMessageCount);
      setMessages((prev) => {
        for (let i = prev.length - 1; i >= 0; i--) {
          if (prev[i].role === "user" && prev[i].message === sentMessage) {
            return [...prev.slice(0, i), ...prev.slice(i + 1)];
          }
        }
        return prev;
      });
    }

    setIsLoading(false);
    messageInputRef.current?.focus();
  }, [
    apiKey,
    prompt_id,
    isDeveloper,
    maxMessages,
    message,
    messageCount,
    messageInputRef,
    conversation_id,
  ]);

  useEffect(() => {
    const handler = (e: BeforeUnloadEvent) => {
      if (messageCount === 0 && conversation_id) {
        // sendBeacon survives page unload; async fetch would be aborted immediately.
        navigator.sendBeacon(
          "https://api.aboodaniel.pl/end_conversation_with_me",
          JSON.stringify({ conversation_id })
        );
      }
      if (messageCount > 0) {
        e.preventDefault();
      }
    };

    window.addEventListener('beforeunload', handler);
    return () => window.removeEventListener('beforeunload', handler);
  }, [messageCount, conversation_id]);

  return {
    messages,
    conversation_id,
    prompt_id,
    message,
    isLoading,
    messageInputRef,
    messageCount,
    maxMessages,
    setMessage,
    handleSendMessage,
    handleStartConversation,
    handleEndConversation,
  };
};

export const AskMeAnythingProvider: React.FC = ({ children }) => {
  const askMeAnything = useAskMeAnythingContext({ isDeveloper: false });

  return (
    <AskMeAnythingContext.Provider value={askMeAnything}>
      {children}
    </AskMeAnythingContext.Provider>
  );
};
