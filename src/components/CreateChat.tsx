"use client";
import useChatHandlers from "@/app/hooks/useChatHandlers";
import { RiChatNewLine } from "react-icons/ri";
function CreateChat() {
  const handleCreateChat = () => {
    console.log("Create Chat");
    window.location.reload();
  };
  return (
    <div
      onClick={handleCreateChat}
      className=" bg-bright-orange dark:bg-yellow-green py-2 mt-4 ml-2 px-3 rounded font-bold fixed top-2 left-2 w-64 md:w-60 hover:cursor-pointer hover:bg-transparent dark:hover:bg-transparent hover:ring-2 hover:ring-bright-orange dark:hover:ring-yellow-green transition-2000 hover:text-bright-orange dark:hover:text-yellow-green"
    >
      <div className="flex justify-between align-center">
        <p> Create Chat</p>
        <RiChatNewLine />
      </div>
    </div>
  );
}

export default CreateChat;
