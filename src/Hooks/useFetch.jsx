import { useState, useEffect } from "react"

const useFetch = (url, method, headers) => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const [result, setResult] = useState(null);

    useEffect(() => {
        const requestFetch = async () => {
            try {
                setIsLoading(true);
                setError("");
                const response = await fetch(url, {
                    method: method || "GET",
                    headers: headers,
                });
                const data = await response.json();
                setIsLoading(false);
                setResult(data);
            } catch (err) {
                console.log(err);
                setIsLoading(false);
                setError("There was an error to loading your badge!");
            }
        }
        requestFetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return {
        isLoading,
        error,
        result,
    }
}

export default useFetch