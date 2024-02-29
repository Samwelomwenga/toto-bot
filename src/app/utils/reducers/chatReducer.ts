import { ChatInitialState, Message } from "@/app/hooks/useChatHandlers";
type setChatPayload = Omit<ChatInitialState, "loadingMessages" | "error">;

export type ChatAction =
  | { type: "SET_CHAT_STATE"; payload: setChatPayload }
  | { type: "UPDATE_CHAT_STATE"; payload: Message[] }
  | { type: "SET_LOADING_MESSAGES"; payload: boolean }
  | { type: "SET_ERROR"; payload: { message: string; isError: boolean } };

const chatReducer = (state: ChatInitialState, action: ChatAction) => {
  switch (action.type) {
    case "SET_CHAT_STATE": {
      return {
        ...state,
        conversationId: action.payload.conversationId,
        messages: action.payload.messages,
        userId: action.payload.userId,
      };
    }
    case "UPDATE_CHAT_STATE": {
      return { ...state, messages: action.payload };
    }
    case "SET_LOADING_MESSAGES": {
      return { ...state, loadingMessages: action.payload };
    }
    case "SET_ERROR": {
      return { ...state, error: action.payload };
    }

    default: {
      return state;
    }
  }
};

export default chatReducer;
