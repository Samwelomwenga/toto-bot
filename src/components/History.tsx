import { MdOutlineDeleteForever } from "react-icons/md";
import { Message } from "@/app/hooks/useChatHandlers";
import { ChatHistoryProps } from "./ChatHistory";
import useHistoryClick from "@/app/hooks/useHistoryClick";
import useDeleteHistory from "@/app/hooks/useDeleteHistory";

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
  const { handleDeleteHistory } = useDeleteHistory();
  return (
    <div className="p-2 border-b-2 border-gray-600 hover:cursor-pointer flex justify-between">
      <div className=" w-11/12" onClick={() => handleHistoryClick(conversation_id)}>
        <p className="text-xs whitespace-nowrap overflow-x-hidden overflow-ellipsis">
          {parsedMessages[0].content}
        </p>
      </div>
      <MdOutlineDeleteForever
        onClick={() => handleDeleteHistory(conversation_id)}
      />
    </div>
  );
}

export default History;
