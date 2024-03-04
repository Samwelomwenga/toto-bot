import { use, useEffect, useState } from "react";
import { supabase } from "../utils/supabase";

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
          .eq("User UID", userUId).order("created_at", { ascending: false});
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
      } finally {
        setHistorySate((prevState) => ({ ...prevState, loading: false }));
      }
    };
    getChatHistory();
  }, []);

  return historyState;
}

export default useHistory;
