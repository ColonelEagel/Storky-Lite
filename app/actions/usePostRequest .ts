import { useState } from "react";
import axios, { AxiosError } from "axios";
import toast from "react-hot-toast";
import { useSession } from "next-auth/react";

// Assuming you are using Chakra UI for toasts

interface RequestOptions<T> {
  url: string;
  data: T;
  onSuccess?: () => void;
  onError?: (error: AxiosError) => void;
}

const usePostRequest = <T>() => {
  const [loading, setLoading] = useState(false);
  const { data: session } = useSession();
  const backEnd = "https://learning-platform-9wrh.onrender.com";
  // console.log(session?.user)
  const postData = async ({
    url,
    data,
    onSuccess,
    onError,
  }: RequestOptions<T>) => {
    console.log(data);

    setLoading(true);
    try {
      console.log(session?.user.token);
      await axios
        .post(`${backEnd}/${url}`, data, {
          ...(!url.includes("signup") && {
            headers: {
              Authorization: `Bearer ${session?.user.token}`,
            },
          }),
        })
        .then((response) => {
          console.log("response", response);
        });
      setLoading(false);
      if (onSuccess) {
        onSuccess();
      }
    } catch (error) {
      setLoading(false);
      if (onError) {
        onError(error as AxiosError<unknown, any>);
      } else {
        toast("Oops! Something went wrong. Please try again later.");
      }
      throw error;
    }
  };

  return { postData, loading };
};

export default usePostRequest;
