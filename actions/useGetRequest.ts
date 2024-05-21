import { useState } from "react";
import axios, { AxiosError, AxiosResponse } from "axios";
import { toast } from "react-hot-toast";
import { useSession } from "next-auth/react";

/**
 * Interface for the options of the get request.
 * @template T The type of the data returned by the request.
 */
interface RequestOptions<T> {
  /**
   * The URL to send the request to.
   */
  url: string;
  /**
   * Callback function to be called when the request is successful.
   * It receives the data returned by the request.
   */
  onSuccess?: (data: T) => void;
  /**
   * Callback function to be called when the request fails.
   * It receives the error that occurred.
   */
  onError?: (error: AxiosError) => void;
}

/**
 * Custom hook to handle get requests.
 * @template T The type of the data returned by the get request.
 * @returns An object containing the fetchData function and the isLoading state.
 */
const useGetRequest = <T>() => {
  const [isLoading, setIsLoading] = useState(false);
  const { data: session, status } = useSession();

  /**
   * Function to send a get request to the specified URL.
   * @param {RequestOptions<T>} options - The options for the get request.
   * @returns The data returned by the get request.
   * @throws If the get request fails, an error is thrown.
   */
  const fetchData = async ({ url, onSuccess, onError }: RequestOptions<T>) => {
    setIsLoading(true);

    try {
      // Check if the session is authenticated and the user has a token
      if (status !== "authenticated" || !session?.user.token) {
        throw new Error("Session is not authenticated");
      }

      // Send a get request to the specified URL with the user's token as the Authorization header
      const response: AxiosResponse<{ data: T }> = await axios.get(
        `https://learning-platform-9wrh.onrender.com/${url}`,
        {
          headers: {
            Authorization: `Bearer ${session.user.token}`,
          },
        }
      );

      // If an onSuccess callback is provided, call it with the response data
      if (onSuccess) {
        onSuccess(response.data.data);
      }

      return response.data;
    } catch (error: any) {
      // If an onError callback is provided, call it with the error
      if (onError) {
        onError(error as AxiosError<unknown, any>);
      } else {
        // If no onError callback is provided, show an error toast
        toast.error("Failed to fetch data. Please try again later.");
      }

      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return { fetchData, isLoading };
};

export default useGetRequest;

