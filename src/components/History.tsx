import { Message } from "@/app/hooks/useChatHandlers";

type HistoryProps = {
    conversation_id: string;
    messages: string;
    handleHistoryClick: (conversation_id: string) => void;
    };
function History({conversation_id,messages, handleHistoryClick}:HistoryProps) {
    const parsedMessages:Message[] = JSON.parse(messages);
  return (
    <div
      className="p-2 border-b-2 border-gray-600 hover:cursor-pointer"
      onClick={() => handleHistoryClick(conversation_id)}
    >
      <p className="text-xs t whitespace-nowrap overflow-x-hidden overflow-ellipsis">
        {parsedMessages[0].content}
      </p>
    </div>
  );
}

export default History;
