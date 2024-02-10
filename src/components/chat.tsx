"use client";
import { useChat } from "ai/react";
import { IoSend } from "react-icons/io5";

export default function MyComponent() {
  const { messages, input, handleInputChange, handleSubmit } = useChat({
    api: "/api/chat",
  });

  return (
    <div className="mx-auto w-full px-1 py-2 md:col-span-2">
      <ul className="space-y-3 w-full md:space-y-6 md:py-8">
        {messages.map((m, index) => (
          <li key={index} className={`p-2 md:p-6 rounded ${m.role!=="user"?"bg-orange-200":"bg-teal-400"} ${m.role==="user"?"mr-auto":"ml-auto"} shadow text-gray-700 ${m.role==="user"?"w-3/4":"w-5/6"} `}>
            <span className="font-semibold">
              {m.role === "user" ? "User: " : "BOT: "}
            </span>
            {m.content}
          </li>
        ))}
      </ul>

      <form
        onSubmit={handleSubmit}
        className="fixed bottom-2 flex justify-between gap-1 w-full px-2 z-0 md:px-3  md:bottom-5 md:w-1/2 md:justify-center md:gap-4"
      >
        <input
          className={" w-4/5 rounded border shadow-sm text-gray-700 pl-3 md:py-4 md:px-3"}
          value={input}
          onChange={handleInputChange}
          placeholder="Write here ..."
        />

        <button
          type="submit"
          className=" bg-orange-500 hover:bg-orange-700 text-white font-bold py-3 px-5 md:px-8 rounded focus:outline-none focus:shadow-outline"
        >
          <IoSend className=" md:w-6 md:h-6 "/>
        </button>
      </form>
    </div>
  );
}
