import { useState } from "react";
import axios, { AxiosError } from "axios";
import toast from "react-hot-toast";
import { useSession } from "next-auth/react";

/**
 * Type representing the options for a post request.
 * @template T The type of the data being posted.
 */
interface RequestOptions<T> {
  /** The URL to post the data to. */
  url: string;
  /** The data to be posted. */
  data: T;
  /** Optional callback function to be called on success. */
  onSuccess?: () => void;
  /** Optional callback function to be called on error. */
  onError?: (error: AxiosError) => void;
  /** Optional headers to be sent with the request. */
  headers?: { [key: string]: string };
}

/**
 * Custom hook to handle post requests.
 * @template T The type of the data being posted.
 * @returns An object containing the postData function and the loading state.
 */
const usePostRequest = <T>() => {
  const [loading, setLoading] = useState(false);
  const { data: session } = useSession();
  const backEnd = "https://learning-platform-9wrh.onrender.com";

  /**
   * Function to send a post request to the specified URL.
   * @param {RequestOptions<T>} options - The options for the post request.
   * @returns The data returned by the post request.
   * @throws If the post request fails, an error is thrown.
   */
  const postData = async (options: RequestOptions<T>) => {
    const { url, data, onSuccess, onError, headers = {} } = options;

    setLoading(true);
    try {
      const token = session?.user?.token;
      if (!token) {
        throw new Error("Session is not authenticated");
      }

      const response = await axios.post(`${backEnd}/${url}`, data, {
        ...(!url.includes("signup") && {
          headers: {
            Authorization: `Bearer ${token}`,
            ...headers,
          },
        }),
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

  return { postData, loading };
};

export default usePostRequest;

