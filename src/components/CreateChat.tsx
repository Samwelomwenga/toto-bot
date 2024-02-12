import { RiChatNewLine } from "react-icons/ri";
function CreateChat() {
  return (
    <div className=" bg-orange-500 py-2 mt-4 ml-2 px-3 rounded  font-bold fixed top-2 left-2 w-64 md:w-60 hover:cursor-pointer hover:bg-orange-400">
      <div className="flex justify-between align-center">
        <p> Create Chat</p>
        <RiChatNewLine />
      </div>
    </div>
  );
}

export default CreateChat;
