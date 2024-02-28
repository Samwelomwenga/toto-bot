import { supabase } from "../utils/supabase";
import useChatHandlers, { Message } from "./useChatHandlers";

const useHistoryClick =  () => {
    const {dispatch,chatState}=useChatHandlers();
    const handleHistoryClick = async (conversationId: string) => {
        dispatch({ type: "SET_LOADING_MESSAGES", payload: true });
    try {
        console.log("Clicked conversation") 
        const { data, error } = await supabase.from("conversations").select("*").eq(" conversation_id", conversationId);
        if (error) {
            console.log("error",error.message)
            throw new Error(error.message);
        }
        console.log("data",data)
        const [{conversation_id, messages,"User UID":userId}] = data;
        const parsedMessages:Message[] = JSON.parse(messages);
        dispatch({ type: "SET_CHAT_STATE", payload: { conversationId: conversation_id, messages: parsedMessages, userId:userId??undefined  } });
        console.log("ChatState inside useHistoryClick",chatState)   
    } catch (e) {
        const error = e as Error;

        console.log("Error getting conversation", error);
        dispatch({ type: "SET_ERROR", payload: { message: error.message, isError: true } });
    }finally{
        dispatch({ type: "SET_LOADING_MESSAGES", payload: false });
    }
}
return {handleHistoryClick}

}
export default useHistoryClick;