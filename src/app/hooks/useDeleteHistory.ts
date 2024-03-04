import { toast } from "react-toastify";
import { supabase } from "../utils/supabase";

function useDeleteHistory() {
  const handleDeleteHistory = async (conversationId: string) => {
    try {
      const { error } = await supabase
        .from("messages")
        .delete()
        .eq("conversation_id", conversationId);
      if (error) {
        console.log(error);
        throw new Error(error.message);
      }
    } catch (e) {
      const error = e as Error;
      console.log(error);
      toast.
    }
  };
  return { handleDeleteHistory };
}

export default useDeleteHistory;
