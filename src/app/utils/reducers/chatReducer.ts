import { ChatInitialState, Message } from "@/components/chat";

type ChatAction =
  | { type: "SET_CONVERSATION_ID"; payload: string }
  | { type: "SET_MESSAGES"; payload: Message[] }
  | { type: "SET_USER_ID"; payload: string };

const chatReducer = (state: ChatInitialState, action: ChatAction) => {
  switch (action.type) {
    case "SET_CONVERSATION_ID":
      return {
        ...state,
        conversationId: action.payload,
      };
    case "SET_MESSAGES":
      return {
        ...state,
        messages:action.payload,
      };
    case "SET_USER_ID":
      return {
        ...state,
        userId: action.payload,
      };
    default:
      return state;
  }
};

export default chatReducer;
