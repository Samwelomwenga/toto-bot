import { useEffect, useState } from "react";
import { supabase } from "../utils/supabase";
import { Slide, toast } from "react-toastify";

type HistoryState = {
  loading: boolean;
  error: { message: string; isError: boolean } | null;
  history: Conversation[];
};
function useHistory() {
  const [historyState, setHistorySate] = useState<HistoryState>({
    loading: false,
    error: null,
    history: [],
  });
  useEffect(() => {
    const getChatHistory = async () => {
      try {
        setHistorySate((prevState) => ({ ...prevState, loading: true }));
        const userUId = (await supabase.auth.getSession()).data.session?.user
          .id;
        if (!userUId) {
          throw new Error("User UID is not available");
        }

        const { data, error } = await supabase
          .from("conversations")
          .select("*")
          .eq("User UID", userUId)
          .order("created_at", { ascending: false });
        if (error) {
          throw new Error(error.message);
        }
        setHistorySate((prevState) => ({ ...prevState, history: data }));
      } catch (e) {
        const error = e as Error;
        setHistorySate((prevState) => ({
          ...prevState,
          error: { message: error.message, isError: true },
        }));
        toast.error("An Error Occurred", {
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
      } finally {
        setHistorySate((prevState) => ({ ...prevState, loading: false }));
      }
    };
    getChatHistory();

    const channel = supabase
      .channel("conversations changes")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public" },
        (payload) => {
          const { errors } = payload;
          if (errors) {
            toast.error("An Error Occurred", {
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
          setHistorySate((prevState) => ({
            ...prevState,
            history: [payload.new as Conversation, ...prevState.history],
          }));
        }
      )
      .on(
        "postgres_changes",
        { event: "DELETE", schema: "public" },
        (payload) => {
          const { errors, old } = payload;
          if (errors) {
            toast.error("An Error Occurred", {
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
          setHistorySate((prevState) => ({
            ...prevState,
            history: prevState.history.filter(
              (conversation) =>
                conversation.conversation_id !== old.conversation_id
            ),
          }));
        }
      )
      .subscribe();
    return () => {
      channel.unsubscribe();
    };
  }, []);

  return historyState;
}

export default useHistory;
