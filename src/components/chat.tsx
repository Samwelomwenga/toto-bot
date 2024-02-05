"use client";
import { useChat } from "ai/react";
import { IoSend } from "react-icons/io5";

export default function MyComponent() {
  const { messages, input, handleInputChange, handleSubmit } = useChat({
    api: "/api/chat",
  });

  return (
    <div className="   m-auto w-full px-1 py-2">
      <ul className="space-y-2 w-full">
        {messages.map((m, index) => (
          <li key={index} className={`p-2 rounded ${m.role!=="user"?"bg-orange-200":"bg-teal-400"} ${m.role==="user"?"mr-auto":"ml-auto"} shadow text-gray-700 ${m.role==="user"?"w-3/4":"w-5/6"} `}>
            <span className="font-semibold">
              {m.role === "user" ? "User: " : "BOT: "}
            </span>
            {m.content}
          </li>
        ))}
      </ul>

      <form
        onSubmit={handleSubmit}
        className=" fixed bottom-2 flex justify-between gap-1 w-full px-2"
      >
        <input
          className={" w-4/5 rounded border shadow-sm text-gray-700 pl-3"}
          value={input}
          onChange={handleInputChange}
          placeholder="Write here ..."
        />

        <button
          type="submit"
          className=" bg-orange-500 hover:bg-orange-700 text-white font-bold py-3 px-5 rounded focus:outline-none focus:shadow-outline"
        >
          <IoSend />
        </button>
      </form>
    </div>
  );
}
