import { Dispatch } from "react";
import { ChatInitialState } from "@/app/hooks/useChatHandlers";
import useHistory from "@/app/hooks/useHistory";
import useHistoryClick from "@/app/hooks/useHistoryClick";
import { ChatAction } from "@/app/utils/reducers/chatReducer";

export type ChatHistoryProps = {
  chatState: ChatInitialState;
  dispatch: Dispatch<ChatAction>;
};

function ChatHistory({ chatState, dispatch }: ChatHistoryProps) {
  const { history } = useHistory();
  const { handleHistoryClick } = useHistoryClick({ chatState, dispatch });
  return (
    <div className=" fixed top-20 left-4 bottom-20 w-64 md:w-60 p-3">
      <h2 className="text-center text-lg font-bold">Chat History</h2>
      <div className="overflow-y-auto">
        {history.length > 0 ? (
          history.map((chat) => (
            <div
              key={chat.conversation_id}
              className="p-2 border-b-2 hover:cursor-pointer"
              onClick={() => handleHistoryClick(chat.conversation_id)}
            >
              <p className="text-xs text-gray-600 whitespace-nowrap overflow-x-hidden overflow-ellipsis">
                {chat.conversation_id}
              </p>
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
