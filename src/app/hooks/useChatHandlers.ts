import { FormEvent, useCallback, useEffect, useReducer } from "react";
import { useChat } from "ai/react";
import chatReducer from "@/app/utils/reducers/chatReducer";
import insertConversation from "../utils/functions/insertConversation";
import updateConversation from "../utils/functions/updateConversation";
import { supabase } from "../utils/supabase";
import { debounce } from "lodash";

export type Message = {
  id: string;
  role: string;
  content: string;
};

export type ChatInitialState = {
  conversationId: string | null;
  messages: Message[];
  userId?: string;
  loadingMessages: boolean;
  error: { message: string; isError: boolean } | null;
};
function useChatHandlers() {
  const chatInitialState: ChatInitialState = {
    conversationId: null,
    messages: [],
    userId: "",
    loadingMessages: false,
    error: null,
  };
  const [chatState, dispatch] = useReducer(chatReducer, chatInitialState);
  const { messages, input, handleInputChange, handleSubmit } = useChat({
    api: "/api/chat",
  });
  // Debounced function to update messages
  const debouncedUpdateMessages = useCallback(
    debounce((chatMessages: Message[]) => {
      updateMessages(chatMessages);
    }, 1000), // Adjust debounce time as needed
    [chatState] // Add other dependencies if needed
  );

  useEffect(() => {
    // Call debouncedUpdateMessages only if there's a new message and some time has passed
    if (messages.length > 0) {
      console.log("messages", messages);
      debouncedUpdateMessages(messages);
    }
  }, [messages]);

  const handleChatSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event?.preventDefault();
    handleSubmit(event);
  };

  async function updateMessages(chatMessages: Message[]) {
    dispatch({ type: "SET_LOADING_MESSAGES", payload: true });
    try {
      if (chatState && chatState?.conversationId) {
        const data = await updateConversation(
          chatMessages,
          chatState.conversationId
        );
        if (data && data.length > 0) {
          const [{ messages }] = data;
          const parsedMessages: Message[] = JSON.parse(messages);
          dispatch({ type: "UPDATE_CHAT_STATE", payload: parsedMessages });
        }
        return;
      }

      const data = await insertConversation(chatMessages);
      if (data && data.length > 0) {
        const userId = (await supabase.auth.getSession()).data.session?.user.id;
        const [{ conversation_id, messages }] = data;
        const parsedMessages: Message[] = JSON.parse(messages);
        dispatch({
          type: "SET_CHAT_STATE",
          payload: {
            conversationId: conversation_id,
            messages: parsedMessages,
            userId: userId,
          },
        });
      }
    } catch (error) {
      const e = error as Error;
      dispatch({
        type: "SET_ERROR",
        payload: { message: e.message, isError: true },
      });
    } finally {
      dispatch({ type: "SET_LOADING_MESSAGES", payload: false });
    }
  }

  return {
    chatState,
    dispatch,
    handleChatSubmit,
    handleInputChange,
    input,
  };
}
export default useChatHandlers;
