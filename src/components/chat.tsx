"use client";
import chatReducer from "@/app/utils/reducers/chatReducer";
import { supabase } from "@/app/utils/supabase";
import { PostgrestError } from "@supabase/supabase-js";
import { useChat } from "ai/react";
import { useEffect, useReducer } from "react";
import { IoSend } from "react-icons/io5";

export type Message = {
  id: string;
  role: string;
  content: string;
  // createdAt: Date;
};
export type ChatInitialState = {
  conversationId: string | null;
  messages: Message[];
  userId: string;
};

export default function MyComponent() {
  const chatInitialState = {
    conversationId: null,
    messages: [],
    userId: "",
  };
  const [state, dispatch] = useReducer(chatReducer, chatInitialState);
  const { messages, input, handleInputChange, handleSubmit } = useChat({
    api: "/api/chat",
  });
  useEffect(() => {
    dispatch({ type: "SET_MESSAGES", payload: messages });
  }, [messages]);
  console.log("messages", state.messages, "\n", "state", state);
  const insertConversation = async () => {
    try {
      const messagesJSON = JSON.stringify(state.messages);
      const { data, error } = await supabase
        .from("conversations")
        .insert([{ messages: messagesJSON }])
        .select();
      console.log("data", data);
        if(Array.isArray(data) && data.length > 0){
      const [{ conversation_id }] = data;
      console.log("conversationId", conversation_id);
      dispatch({ type: "SET_CONVERSATION_ID", payload: conversation_id });
      return;
    }
      if (error) {
        throw new Error(error.message);
      }
    } catch (error) {
      console.error("Error inserting conversation", error);
    }
  };
  const updateConversation = async () => {
    try {
      const messagesJSON = JSON.stringify(state.messages);
      const { data, error } = await supabase
        .from("conversations")
        .update({ messages: messagesJSON })
        .eq("conversation_id", state.conversationId)
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
    if (state.conversationId) {
      await updateConversation();
      return;
    }
    await insertConversation();
  };

  return (
    <div className="mx-auto w-full px-1 py-2 md:col-start-3 md:col-span-3 mb-20 h-full">
      <ul className="space-y-3 w-full md:space-y-6 md:py-8 mb-4">
        {state.messages.map((m) => (
          <li
            key={m.id}
            className={`p-2 md:p-6 rounded ${
              m.role !== "user" ? "bg-orange-200" : "bg-teal-400"
            } ${
              m.role === "user" ? "mr-auto" : "ml-auto"
            } shadow text-gray-700 ${m.role === "user" ? "w-3/4" : "w-5/6"} `}
          >
            <span className="font-semibold">
              {m.role === "user" ? "User: " : "BOT: "}
            </span>
            {m.content}
          </li>
        ))}
      </ul>

      <form
        onSubmit={handleChatSubmit}
        className="fixed bottom-2 flex justify-between gap-1  w-full px-2 z-0 md:px-3  md:bottom-5 md:w-1/2 md:justify-center md:gap-4"
      >
        <input
          className={
            " w-4/5 rounded border shadow-sm text-gray-700 pl-3 md:py-4 md:px-3"
          }
          value={input}
          onChange={handleInputChange}
          placeholder="Write here ..."
        />

        <button
          type="submit"
          className=" bg-orange-500 hover:bg-orange-700 text-white font-bold py-3 px-5 md:px-8 rounded focus:outline-none focus:shadow-outline"
        >
          <IoSend className=" md:w-6 md:h-6 " />
        </button>
      </form>
    </div>
  );
}
