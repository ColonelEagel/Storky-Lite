import { useState } from "react";
import axios, { AxiosError } from "axios";
import toast from "react-hot-toast";
import { useSession } from "next-auth/react";

interface RequestOptions<T> {
  url: string;
  data: T;
  onSuccess?: () => void;
  onError?: (error: AxiosError) => void;
  headers?: { [key: string]: string };
}

const usePostRequest = <T>() => {
  const [loading, setLoading] = useState(false);
  const { data: session } = useSession();
  const backEnd = "https://learning-platform-9wrh.onrender.com";

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
