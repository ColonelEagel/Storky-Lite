import { useState } from "react";
import axios, { AxiosError } from "axios";
import toast from "react-hot-toast";
import { useSession } from "next-auth/react";

/**
 * Type representing the options for a put request.
 * @template T The type of the data to be sent in the request body.
 */
interface RequestOptions<T> {
  url: string; // The URL of the API endpoint to send the PUT request to.
  data: T; // The data to be sent in the request body.
  onSuccess?: () => void; // Optional callback function to be called upon successful completion of the request.
  onError?: (error: AxiosError) => void; // Optional callback function to be called upon encountering an error in the request.
  headers?: { [key: string]: string }; // Optional additional headers to be sent with the request.
}

/**
 * Custom hook to handle PUT requests.
 * @template T The type of the data returned by the PUT request.
 * @returns An object containing the putData function and the loading state.
 */
const usePutRequest = <T>() => {
  const [loading, setLoading] = useState(false); // State to track whether a PUT request is in progress.
  const { data: session } = useSession(); // Get the user session using the next-auth/react hook.
  const backEnd = "https://learning-platform-9wrh.onrender.com"; // The base URL of the API.

  /**
   * Function to send a PUT request to the specified URL.
   * @param {RequestOptions<T>} options - The options for the PUT request.
   * @returns The data returned by the PUT request.
   * @throws If the PUT request fails, an error is thrown.
   */
  const putData = async (options: RequestOptions<T>) => {
    const { url, data, onSuccess, onError, headers = {} } = options;

    setLoading(true);
    try {
      const token = session?.user?.token;
      if (!token) {
        throw new Error("Session is not authenticated");
      }

      const response = await axios.put(`${backEnd}/${url}`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
          ...headers,
        },
      });

      if (onSuccess) {
        onSuccess();
      }

      return response.data;
    } catch (error) {
      setLoading(false);
      if (onError) {
        onError(error as AxiosError<unknown, any>);
      } else {
        toast("Oops! Something went wrong. Please try again later.");
      }
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return { putData, loading }; // Return the putData function and the loading state.
};

export default usePutRequest;

