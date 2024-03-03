import { Message } from "@/app/hooks/useChatHandlers";
import { ChatHistoryProps } from "./ChatHistory";
import useHistoryClick from "@/app/hooks/useHistoryClick";

type HistoryProps = {
  conversation_id: string;
  messages: string;
} & ChatHistoryProps;
function History({
  conversation_id,
  messages,
  chatState,
  dispatch,
}: HistoryProps) {
  const { handleHistoryClick } = useHistoryClick({ chatState, dispatch });
  const parsedMessages: Message[] = JSON.parse(messages);
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
