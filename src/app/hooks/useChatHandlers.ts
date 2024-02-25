import { FormEvent, useCallback, useEffect, useReducer, useState } from "react";
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
type SubmitData ={
  event: FormEvent<HTMLFormElement>;
  // chatMessages?: Message[]; // we can do any 
  // chatState?: ChatInitialState;
}
export type ChatInitialState = {
  conversationId: string | null;
  messages: Message[];
  userId?: string;
};
function useChatHandlers() {

  const chatInitialState: ChatInitialState = {
    conversationId: null,
    messages: [],
    userId: "",
  };
  const [chatState, dispatch] = useReducer(chatReducer, chatInitialState);
  const { messages, input, handleInputChange, handleSubmit } = useChat({
    api: "/api/chat",
  });
  const [loadingMessages, setLoadingMessages] = useState<boolean>(false)
  // Debounced function to update messages
  const debouncedUpdateMessages = useCallback(
    debounce((chatMessages:Message[]) => {
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
  }, [debouncedUpdateMessages, messages]);

  const handleChatSubmit = async (event:FormEvent<HTMLFormElement>) => {
    event?.preventDefault();
    handleSubmit(event)
  };

  async function updateMessages(chatMessages: Message[]) {
    setLoadingMessages(true)
    if (chatState && chatState?.conversationId) {
      const data = await updateConversation(chatMessages, chatState.conversationId);
      if (data && data.length > 0) {
        const [{  messages }] = data;
        const parsedMessages: Message[] = JSON.parse(messages);
        console.log("updating with parsedMessages", parsedMessages);
        dispatch({ type: "UPDATE_CHAT_STATE", payload: parsedMessages });
      }
      return;
    }

    const data = await insertConversation(chatMessages);
    if (data && data.length > 0) {
      const userId = (await supabase.auth.getSession()).data.session?.user.id;
      const [{ conversation_id, messages }] = data;
      const parsedMessages: Message[] = JSON.parse(messages);
      dispatch({ type: "SET_CHAT_STATE", payload: { conversationId: conversation_id, messages: parsedMessages, userId: userId } })
    }

    setLoadingMessages(false)
  }

  return {
    chatState,
    dispatch,
    handleChatSubmit,
    handleInputChange,
    input,
    loadingMessages
  };
}
export default useChatHandlers;
