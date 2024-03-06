import { Slide, toast } from "react-toastify";
import { supabase } from "../utils/supabase";

function useDeleteHistory() {
  const handleDeleteHistory = async (conversationId: string) => {
    try {
      const { error } = await supabase
        .from("conversations")
        .delete()
        .eq("conversation_id", conversationId);
      if (error) {
        console.log(error);
        throw new Error(error.message);
      }
      toast.success("History Deleted Successfully", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Slide,
      });
    } catch (e) {
      const error = e as Error;
      console.log(error);
      toast.error("An Error Occurred While Deleting History", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Slide,
      });
    }
  };
  return { handleDeleteHistory };
}

export default useDeleteHistory;
