"use client";

import axios, { AxiosError, AxiosResponse } from "axios";
import { useSession } from "next-auth/react";
import { useState } from "react";
import toast from "react-hot-toast";
interface RequestOptions<T> {
  url: string;
  onSuccess?: (data: T) => void;
  onError?: (error: AxiosError) => void;
}
const useDeleteRequest = <T>() => {
  const [isLoading, setIsLoading] = useState(false);
  const { data: session, status } = useSession();

  const deleteData = async ({ url, onSuccess, onError }: RequestOptions<T>) => {
    setIsLoading(true);

    try {
      if (status !== "authenticated" || !session?.user.token) {
        throw new Error("Session is not authenticated");
      }

      const response: AxiosResponse<{ data: T }> = await axios.delete(
        `https://learning-platform-9wrh.onrender.com/${url}`,
        {
          headers: {
            Authorization: `Bearer ${session.user.token}`,
          },
        }
      );

      if (onSuccess) {
        onSuccess(response.data.data);
      }

      return response.data;
    } catch (error: any) {
      if (onError) {
        onError(error as AxiosError<unknown, any>);
      } else {
        toast.error("Failed to fetch data. Please try again later.");
      }

      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return { deleteData, isLoading };
};

export default useDeleteRequest;
