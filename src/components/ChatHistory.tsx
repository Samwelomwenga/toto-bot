import useHistory from "@/app/hooks/useHistory";

function ChatHistory() {
  const { history } = useHistory();
  return (
    <div className=" fixed top-20 left-4 bottom-20 w-64 md:w-60 p-3">
      <h2 className="text-center text-lg font-bold">Chat History</h2>
      <div className="overflow-y-auto">
        {history.length > 0 ? (
          history.map((chat, index) => (
            <div key={index} className="p-2 border-b-2">
              <p className="text-xs text-gray-600 whitespace-nowrap overflow-x-hidden overflow-ellipsis">{chat.conversation_id}</p>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-600">No chat history</p>
        )}
      </div>
    </div>
  );
}

export default ChatHistory;
