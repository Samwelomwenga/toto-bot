import { useEffect, useReducer } from "react";
import { useChat } from "ai/react";
import { supabase } from "@/app/utils/supabase";
import chatReducer from "@/app/utils/reducers/chatReducer";
import useInsertConversation from "./useInsertConversation";
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
    const chatInitialState:ChatInitialState = {
        conversationId: null,
        messages: [],
        userId: "",
      };
      const [chatState, dispatch] = useReducer(chatReducer, chatInitialState);
      const { messages,input, handleInputChange, handleSubmit } = useChat({
        api: "/api/chat",
      });
      console.log("messages inside useChatHandlers", messages);
      const {insertConversation}=useInsertConversation();
  // useEffect(() => {
  // dispatch({ type: "SET_MESSAGES", payload: messages });
  //   }, [messages]);
  // const insertConversation = async (messages:Message[]) => {
  //   try {
  //     console.log("inserting messages", messages);
  //     const messagesJSON = JSON.stringify(messages);
  //     console.log("messagesJSON", messagesJSON);
  //     const { data, error } = await supabase
  //       .from("conversations")
  //       .insert([{ messages: messagesJSON }])
  //       .select();
  //     console.log("data", data);
  //       if(Array.isArray(data) && data.length > 0){
  //     const [{ conversation_id }] = data;
  //     console.log("conversationId", conversation_id);
  //     dispatch({ type: "SET_CONVERSATION_ID", payload: conversation_id });
  //   //   dispatch({ type: "SET_MESSAGES", payload: messages });
  //     return;
  //   }
  //     if (error) {
  //       throw new Error(error.message);
  //     }
  //   } catch (error) {
  //     console.error("Error inserting conversation", error);
  //   }
  // };
  const updateConversation = async (messages:Message[]) => {
    try {
        console.log("updateConversation", messages);
      const messagesJSON = JSON.stringify(messages);
      const { data, error } = await supabase
        .from("conversations")
        .update({ messages: messagesJSON })
        .eq("conversation_id", chatState.conversationId)
        .select();
      console.log("data", data);
      console.log("Error", error);
      if (error) {
        throw new Error(error.message);
      }
    } catch (error) {
      console.error("Error updating conversation", error);
    }
  };
  const handleChatSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    handleSubmit(event);
    if (chatState.conversationId) {
      await updateConversation(chatState.messages);
      return;
    }
    
   const data= await insertConversation(messages);
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