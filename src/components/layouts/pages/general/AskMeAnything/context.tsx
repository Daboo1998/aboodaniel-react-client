import {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
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

  const apiKey = useMemo(() => "rTOh74DudC6YNCKEtYAjb34c8fjN0v7s5N3e3kko", []);

  const handleStartConversation = useCallback(async () => {
    // POST https://api.aboodaniel.pl/start_conversation_with_me
    // empty body returns {"thread_id": "1234", "assistant_id": "5678"}

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

        // you have to map the messages to {"role": "assistant", "message": "Hello!"}
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
    // POST https://api.aboodaniel.pl/ask_me_anything
    // body: {"thread_id": "1234", "message": "Hello!"}
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
      }
    } catch (error) {
      console.error(error);
    }
    setIsLoading(false);
  }, [
    apiKey,
    assistant_id,
    handleIsConversationLoading,
    handleLoadConversation,
    message,
    messages,
    thread_id,
  ]);

  const handleEndConversation = useCallback(async () => {
    setIsLoading(true);
    try {
      // POST https://api.aboodaniel.pl/end_conversation_with_me
      // body: {"thread_id": "1234"}

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
    if (!thread_id) {
      handleStartConversation();
      console.log("start conversation");
    }

    return () => {
      // end conversation when thread_id is unset
      if (thread_id) {
        handleEndConversation();
        console.log("end conversation");
      }
    };
  }, [handleEndConversation, handleStartConversation, thread_id]);

  return {
    messages,
    thread_id,
    assistant_id,
    message,
    isLoading,
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
