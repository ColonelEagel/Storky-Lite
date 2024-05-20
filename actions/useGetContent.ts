"use client";
import { Content, CourseData } from "@/types/interface";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import useGetRequest from "./useGetRequest";
import toast from "react-hot-toast";

interface GetContentProps {
  courseId: string;
  sessionId: string;
}
export default function useGetContent({
  courseId,
  sessionId,
}: GetContentProps) {
  const { data: session, status } = useSession();
  const [content, setCourses] = useState<Content[]>([]);
  const { fetchData, isLoading } = useGetRequest<Content[]>();
  useEffect(() => {
    if (status === "authenticated" && session && session.user.token) {
      fetchData({
        url: `courses/${courseId}/sessions/${sessionId}/content`,
        onSuccess: (data: Content[]) => setCourses(data),
      }).catch((error) => {
        console.error("Failed to fetch Content:", error);
        toast.error("Failed to fetch Content. Please try again later.");
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status, session, session?.user.token, courseId, sessionId]);

  return {
    content,
    isLoading,
  };
}
