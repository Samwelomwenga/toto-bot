"use client";
import { useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "@/components/Header";
import Chat from "../components/chat";
import Menu from "@/components/Menu";
import useChatHandlers from "./hooks/useChatHandlers";
import ChatHistory from "@/components/ChatHistory";
import Logo from "@/components/Logo";
import ThemeSwitcher from "@/components/ThemeSwitcher";

export const runtime = "edge";

export default function Page() {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  const { chatState, handleChatSubmit, handleInputChange, input, dispatch } =
    useChatHandlers();
    const {messages}=chatState;
  return (
    <>
      <ToastContainer />
      <main className=" min-h-svh w-full bg-gray-300 dark:bg-ebony bg-cover bottom-0 md:grid grid-cols-6 md:grid-rows-1 h-full">
        <ThemeSwitcher />
        <Header isOpen={isOpen} toggle={toggle} />
        <Menu isOpen={isOpen}>
          <ChatHistory chatState={chatState} dispatch={dispatch} />
        </Menu>
        {messages.length?<div className="hidden md:block lg:pl-14">
        <Logo />
        </div>:null}
      <Chat
          chatState={chatState}
          handleChatSubmit={handleChatSubmit}
          handleInputChange={handleInputChange}
          input={input}
        />
      </main>
    </>
  );
}
