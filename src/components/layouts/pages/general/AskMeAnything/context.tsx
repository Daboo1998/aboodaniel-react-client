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
  thread_id: string | undefined;
  assistant_id: string | undefined;
  message: string;
  isLoading: boolean;
  messageInputRef: React.RefObject<HTMLTextAreaElement>;
  messageCount: number;
  maxMessages: number;
  setMessage: (message: string) => void;
  handleSendMessage: () => void;
}

export const AskMeAnythingContext = createContext<AskMeAnythingContextProps>(
  {} as AskMeAnythingContextProps
);

export const useAskMeAnythingContext = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [thread_id, setThreadId] = useState<string | undefined>();
  const [assistant_id, setAssistantId] = useState<string | undefined>();
  const [message, setMessage] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [messageCount, setMessageCount] = useState<number>(0);

  const messageInputRef = useMemo(() => createRef<HTMLTextAreaElement>(), []);
  const maxMessages = parseInt(
    process.env.REACT_APP_MAX_MESSAGES_PER_CONVERSATION ?? "0"
  );

  const apiKey = useMemo(() => process.env.REACT_APP_AWS_LAMBDA_API_KEY, []);

  const handleStartConversation = useCallback(async () => {
    if (!apiKey) {
      alert("API key is not set");
      return;
    }

    try {
      setIsLoading(true);
      const response = await fetch(
        "https://api.aboodaniel.pl/start_conversation_with_me",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-api-key": apiKey,
          },
        }
      );

      if (response.ok) {
        const { thread_id, assistant_id } = await response.json();

        setThreadId(thread_id);
        setAssistantId(assistant_id);
      } else {
        alert("Failed to start conversation");
      }
    } catch (error) {
      console.error(error);
    }
    setIsLoading(false);
  }, [apiKey]);

  const handleIsConversationLoading = useCallback(
    async (run_id) => {
      if (!apiKey) {
        alert("API key is not set");
        return false;
      }

      try {
        const response = await fetch(
          `https://api.aboodaniel.pl/is_conversation_running?run_id=${run_id}&thread_id=${thread_id}`,
          {
            method: "GET",
            headers: {
              "x-api-key": apiKey,
            },
          }
        );

        if (response.ok) {
          const { isRunning } = await response.json();

          return isRunning;
        } else {
          alert("Failed to check if conversation is loading");
          return false;
        }
      } catch (error) {
        console.error(error);
        return false;
      }
    },
    [apiKey, thread_id]
  );

  const handleLoadConversation = useCallback(async () => {
    try {
      if (!apiKey) {
        alert("API key is not set");
        return messages;
      }

      const response = await fetch(
        `https://api.aboodaniel.pl/load_conversation_with_me?thread_id=${thread_id}`,
        {
          method: "GET",
          headers: {
            "x-api-key": apiKey,
          },
        }
      );

      if (response.ok) {
        const parsedMessages = await response.json();

        const messages = parsedMessages.map((message: any) => ({
          role: message.role,
          message: message.content[0].text.value,
        }));

        return messages;
      } else {
        alert("Failed to load conversation");
        return messages;
      }
    } catch (error) {
      console.error(error);
      return messages;
    }
  }, [apiKey, messages, thread_id]);

  const handleSendMessage = useCallback(async () => {
    if (messageCount >= maxMessages) {
      alert("Max messages reached");
      return;
    }

    if (!apiKey) {
      alert("API key is not set");
      return;
    }

    const oldMessageCount = messageCount;
    setMessageCount(oldMessageCount + 1);

    setMessages([
      ...messages,
      {
        role: "user",
        message,
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
            thread_id,
            assistant_id,
            message,
          }),
        }
      );

      if (response.ok) {
        const { run_id } = await response.json();

        while (await handleIsConversationLoading(run_id)) {
          await new Promise((resolve) => setTimeout(resolve, 6000));
        }

        const messages = await handleLoadConversation();

        // set messages to reversed messages
        setMessages(messages.reverse());
      } else {
        alert("Failed to send message");
        setMessageCount(oldMessageCount);
      }
    } catch (error) {
      console.error(error);
      setMessageCount(oldMessageCount);
    }

    setIsLoading(false);
    messageInputRef.current?.focus();
  }, [
    apiKey,
    assistant_id,
    handleIsConversationLoading,
    handleLoadConversation,
    maxMessages,
    message,
    messageCount,
    messageInputRef,
    messages,
    thread_id,
  ]);

  const handleEndConversation = useCallback(async () => {
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
            thread_id,
          }),
        }
      );

      if (response.ok) {
        setThreadId(undefined);
        setAssistantId(undefined);
        setMessages([]);
      } else {
        alert("Failed to end conversation");
      }
    } catch (error) {
      console.error(error);
    }
    setIsLoading(false);
  }, [apiKey, thread_id]);

  useEffect(() => {
    // start conversation when thread_id is set
    (async () => {
      if (!thread_id) {
        await handleStartConversation();
        messageInputRef.current?.focus();
        console.log("start conversation");
      }
    })();

    return () => {
      // end conversation when thread_id is unset
      if (thread_id) {
        handleEndConversation();
        console.log("end conversation");
      }
    };
  }, [
    handleEndConversation,
    handleStartConversation,
    messageInputRef,
    thread_id,
  ]);

  return {
    messages,
    thread_id,
    assistant_id,
    message,
    isLoading,
    messageInputRef,
    messageCount,
    maxMessages,
    setMessage,
    handleSendMessage,
  };
};

export const AskMeAnythingProvider: React.FC = ({ children }) => {
  const askMeAnything = useAskMeAnythingContext();

  return (
    <AskMeAnythingContext.Provider value={askMeAnything}>
      {children}
    </AskMeAnythingContext.Provider>
  );
};
