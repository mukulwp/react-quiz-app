import { useEffect, useState } from "react";
import { get, getDatabase, orderByKey, query, ref } from "firebase/database";
const useAnswers = (videoId) => {
  const [answers, setAnswers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchAnswers = async () => {
      // database related works
      const db = getDatabase();
      const answersRef = ref(db, "answers/" + videoId + "/questions");
      const answersQuery = query(answersRef, orderByKey());
      try {
        setIsLoading(true);
        setError("");
        //Request firebase database
        const snapshot = await get(answersQuery);
        setIsLoading(false);
        if (snapshot.exists()) {
          setAnswers((prevAnswers) => {
            return [...prevAnswers, ...Object.values(snapshot.val())];
          });
        }
      } catch (err) {
        setIsLoading(false);
        setError(err.message);
      }
    };

    fetchAnswers();
  }, [videoId]);
  return {
    isLoading,
    error,
    answers,
  };
};

export default useAnswers