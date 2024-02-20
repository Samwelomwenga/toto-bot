import { ChatInitialState, Message } from "@/app/hooks/useChatHandlers";

type ChatAction =
  | { type: "SET_CHAT_STATE"; payload: ChatInitialState }
  | { type: "UPDATE_CHAT_STATE"; payload: Message[] };

const chatReducer = (state: ChatInitialState, action: ChatAction) => {
  switch (action.type) {
    case "SET_CHAT_STATE": {
      return action.payload;
    }
    case "UPDATE_CHAT_STATE": {
      return { ...state, messages: action.payload };
    }

    default:
      return state;
  }
};

export default chatReducer;
