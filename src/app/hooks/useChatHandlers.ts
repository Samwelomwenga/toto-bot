import { useReducer } from "react";
import { useChat } from "ai/react";
import chatReducer from "@/app/utils/reducers/chatReducer";
import insertConversation from "../utils/functions/insertConversation";
import updateConversation from "../utils/functions/updateConversation";

export type Message = {
  id: string;
  role: string;
  content: string;
};
export type ChatInitialState = {
  conversationId: string | null;
  messages: Message[];
  userId: string;
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
  console.log("messages inside useChatHandlers", messages);

  const handleChatSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    handleSubmit(event);
    if (chatState.conversationId) {
      await updateConversation(messages, chatState.conversationId);
      return;
    }

    const data = await insertConversation(messages);
    console.log("data inside useChatHandler", data);

    // dispatch({ type: "SET_CONVERSATION_ID", payload: conversation_id });
  };
  // console.log("chatState before return", chatState);
  return {
    chatState,
    dispatch,
    handleChatSubmit,
    handleInputChange,
    input,
  };
}
export default useChatHandlers;
