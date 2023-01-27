import { useEffect, useState } from "react";
import {
  get,
  getDatabase,
  orderByKey,
  query,
  ref,
} from "firebase/database";

const useQuestions = (videoId) => {
    const [questions, setQuestons] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
      const fetchQuestions = async () => {
        // database related works
        const db = getDatabase();
        const questionsRef = ref(db, "quiz/" + videoId + "/questions");
        const questionsQuery = query(questionsRef, orderByKey());
        try {
          setIsLoading(true);
          setError("");
          //Request firebase database
          const snapshot = await get(questionsQuery);
          setIsLoading(false);
          if (snapshot.exists()) {
            setQuestons((prevQuestions) => {
              return [...prevQuestions, ...Object.values(snapshot.val())];
            });
          }
        } catch (err) {
          setIsLoading(false);
          setError(err.message);
        }
      };

      fetchQuestions();
    }, [videoId]);
    return {
      isLoading,
      error,
      questions,
    };
}

export default useQuestions