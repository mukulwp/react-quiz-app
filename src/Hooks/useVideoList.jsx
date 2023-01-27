import { useEffect, useState } from "react";
import { get, getDatabase, limitToFirst, orderByKey, query, ref, startAt } from "firebase/database";

const useVideoList = (page) => {

    const [videos, setVideos] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const [hasMore, setHasMore] = useState(true);

    useEffect(() => {
        const fetchVideos = async () => {
          // database related works
            const db = getDatabase();
            const videosRef = ref(db, "videos");
            const videoQuery = query(
                videosRef,
                orderByKey(),
                startAt("" + page),
                limitToFirst(6),
            );
            try {
                setIsLoading(true);
                setError("");
                //Request firebase database
                const snapshot = await get(videoQuery);
                setIsLoading(false);
                if (snapshot.exists()) {
                    setVideos((prevVideos) => {
                        return [...prevVideos, ...Object.values(snapshot.val())];
                    })
                } else {
                    setHasMore(false)
                }
            } catch (err) {
                setIsLoading(false);
                setError(err.message);
            }
        }

        fetchVideos();
       
    }, [page]);
    return {
        isLoading,
        error,
        videos,
        hasMore,
    }
}

export default useVideoList