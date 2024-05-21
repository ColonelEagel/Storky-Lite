"use client";
import { Content, CourseData } from "@/types/interface";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import useGetRequest from "./useGetRequest";
import toast from "react-hot-toast";

/**
 * Custom hook to fetch content for a specific course and session.
 * @param {GetContentProps} props - The component props.
 * @returns {Object} - An object containing the fetched content and a loading state.
 * @property {Content[]} content - The fetched content.
 * @property {boolean} isLoading - A boolean indicating if the content is still loading.
 */
interface GetContentProps {
  courseId: string;
  sessionId: string;
}
export default function useGetContent({
  courseId,
  sessionId,
}: GetContentProps) {
  // Get session and authentication status
  const { data: session, status } = useSession();

  // State to store fetched content
  const [content, setContent] = useState<Content[]>([]);

  // Hook to make GET requests
  const { fetchData, isLoading } = useGetRequest<Content[]>();

  // Fetch content only if session is authenticated and there are courses
  useEffect(() => {
    if (status === "authenticated" && session && session.user.token) {
      fetchData({
        url: `courses/${courseId}/sessions/${sessionId}/content`,
        onSuccess: (data: Content[]) => setContent(data),
      }).catch((error) => {
        console.error("Failed to fetch Content:", error);
        toast.error("Failed to fetch Content. Please try again later.");
      });
    }
    // Re-fetch content if session or status changes
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status, session, session?.user.token, courseId, sessionId]);

  return {
    content,
    isLoading,
  };
}

/**
 * Props for the useGetContent hook.
 * @typedef {Object} GetContentProps
 * @property {string} courseId - The ID of the course.
 * @property {string} sessionId - The ID of the session.
 */
