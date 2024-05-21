"use client";

import axios, { AxiosError, AxiosResponse } from "axios";
import { useSession } from "next-auth/react";
import { useState } from "react";
import toast from "react-hot-toast";

/**
 * Type representing the options for a delete request.
 * @template T The type of the data returned by the delete request.
 */
interface RequestOptions<T> {
  /** The URL of the endpoint to send the delete request to. */
  url: string;
  /** Optional callback function to be called when the delete request is successful. */
  onSuccess?: (data: T) => void;
  /** Optional callback function to be called when the delete request fails. */
  onError?: (error: AxiosError) => void;
}

/**
 * Custom hook to handle delete requests.
 * @template T The type of the data returned by the delete request.
 * @returns An object containing the deleteData function and the isLoading state.
 */
const useDeleteRequest = <T>() => {
  // State to track whether a delete request is in progress
  const [isLoading, setIsLoading] = useState(false);
  // Get the user session and status using the next-auth/react hook
  const { data: session, status } = useSession();

  /**
   * Function to send a delete request to the specified URL.
   * @param {RequestOptions<T>} options - The options for the delete request.
   * @returns The data returned by the delete request.
   * @throws If the delete request fails, an error is thrown.
   */
  const deleteData = async ({ url, onSuccess, onError }: RequestOptions<T>) => {
    setIsLoading(true);

    try {
      // Check if the session is authenticated and the user has a token
      if (status !== "authenticated" || !session?.user.token) {
        throw new Error("Session is not authenticated");
      }

      // Send a delete request to the specified URL with the user's token as the Authorization header
      const response: AxiosResponse<{ data: T }> = await axios.delete(
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

  // Return the deleteData function and the isLoading state
  return { deleteData, isLoading };
};

export default useDeleteRequest;

