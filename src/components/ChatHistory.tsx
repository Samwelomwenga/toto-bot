import { Dispatch } from "react";
import { ChatInitialState } from "@/app/hooks/useChatHandlers";
import useHistory from "@/app/hooks/useHistory";
import useHistoryClick from "@/app/hooks/useHistoryClick";
import { ChatAction } from "@/app/utils/reducers/chatReducer";
import History from "./History";

export type ChatHistoryProps = {
  chatState: ChatInitialState;
  dispatch: Dispatch<ChatAction>;
};

function ChatHistory({ chatState, dispatch }: ChatHistoryProps) {
  const { history,loading } = useHistory();
  return (
    <div className=" fixed top-20 left-4 bottom-20 w-64 md:w-60 p-3">
      <h2 className="text-center text-yellow-green dark:text-bright-orange text-lg font-bold">Chat History</h2>
      <div className="overflow-y-auto">
        {history.length ? (
          history.map((chat) => (
            <History
              key={chat.conversation_id}
              conversation_id={chat.conversation_id}
              messages={chat.messages}
              chatState={chatState}
              dispatch={dispatch}
            />
          ))
        ) : 
          loading?<p className="text-center">Loading...</p>:<p className="text-center ">No chat history</p>
        }
      </div>
    </div>
  );
}

export default ChatHistory;
