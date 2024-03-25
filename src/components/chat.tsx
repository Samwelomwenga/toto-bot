"use client";

import { ChangeEvent, FormEvent } from "react";
import Image from "next/image";
import { IoSend } from "react-icons/io5";
import loadingGif from "../../public/loading.gif";
import { ChatInitialState } from "@/app/hooks/useChatHandlers";
import Logo from "./Logo";

type MyComponentProps = {
  chatState: ChatInitialState;
  handleChatSubmit: (event: FormEvent<HTMLFormElement>) => Promise<void>;
  handleInputChange: (
    e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>
  ) => void;
  input: string;
};

export default function MyComponent({
  chatState,
  handleChatSubmit,
  handleInputChange,
  input,
}: MyComponentProps) {
  const { messages } = chatState;
  return (
    <div className="mx-auto w-full px-1 py-2 md:col-start-3 md:col-span-3 mb-20 h-full">
      <ul className="space-y-3 w-full md:space-y-6 md:py-8 mb-4">
        {messages.length ? (
          chatState.messages.map((message) => (
            chatState.loadingMessages?
            <Image key={message.id} src={loadingGif} alt="loading" />
            :<li
              key={message.id}
              className={`p-2 md:p-6 text-white rounded ${
                message.role === "user" ? "bg-greenish-cyan" : "bg-salmon"
              } ${
                message.role === "user" ? "mr-auto" : "ml-auto"
              } shadow text-gray-700 ${message.role === "user" ? "w-3/4" : "w-5/6"} `}
            >
              <span className="font-semibold">
                {message.role === "user" ? "User: " : "BOT: "}
              </span>
              {chatState.loadingMessages ? (
                <Image src={loadingGif} alt="loading" />
              ) : (
                message.content
              )}
            </li>
          ))
        ) : (
          <div className="absolute top-1/2 md:left-[40%] w-full md:w-[40ch] grid mx-auto px-1">
            <Logo/>
            <p className=" text-black text-center">
              Hello, for any assistance in nurturing babies, 
              feel free to ask below. 
            </p>
          </div>
        )}
      </ul>

      <form
        onSubmit={(event) => {
          handleChatSubmit(event);
        }}
        className="fixed bottom-2 flex justify-between gap-1  w-full px-2 z-0 md:px-3  md:bottom-5 md:w-1/2 md:justify-center md:gap-4"
      >
        <input
          className={
            " w-4/5 rounded border shadow-sm text-gray-700 pl-3 md:py-4 md:px-3 border-leaf focus:outline-none focus:ring-2 focus:ring-bright-orange focus:border-none"
          }
          value={input}
          onChange={handleInputChange}
          placeholder="Write here ..."
        />

        <button
          type="submit"
          className=" bg-bright-orange hover:bg-transparent hover:ring-2 hover:ring-bright-orange hover:text-bright-orange text-white font-bold py-3 px-5 md:px-8 rounded focus:outline-none focus:shadow-outline"
        >
          <IoSend className=" md:w-6 md:h-6" />
        </button>
      </form>
    </div>
  );
}
