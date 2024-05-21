"use client";

import { useSession } from "next-auth/react";
import useGetAllSessions from "./useGetAllSessions";
import useGetCourses from "./useGetCourses";
import { useEffect, useState } from "react";
import { Content } from "@/types/interface";
import useGetRequest from "./useGetRequest";

/**
 * Custom hook that fetches all content for all sessions in all courses.
 * Returns the fetched content and a loading state.
 *
 * @returns {Object} - An object containing the fetched content and a loading state.
 * @property {Content[]} content - The fetched content.
 * @property {boolean} isLoading - A boolean indicating if the content is still loading.
 */
export default function useGetAllContent() {
  // Fetch courses
  const { courses, isLoading: isLoadingCourses } = useGetCourses();

  // Fetch all sessions for the fetched courses
  const sessions = useGetAllSessions({ courses });

  // Get session and authentication status
  const { data: session, status } = useSession();

  // State to store fetched content
  const [content, setContent] = useState<Content[]>([]);

  // Hook to make GET requests
  const { fetchData, isLoading: isLoadingContent } = useGetRequest<Content[]>();

  // Fetch all content for all sessions
  useEffect(() => {
    const fetchAllContent = async () => {
      const allContent: Content[] = [];
      for (const session of sessions) {
        await fetchData({
          url: `courses/${session.courseId}/sessions/${session.id}/content`,
          onSuccess: (data: Content[]) => {
            allContent.push(...data);
          },
        }).catch((error) => {
          console.error(
            `Failed to fetch content for session ${session.id}:`,
            error
          );
        });
      }
      setContent(allContent);
    };

    // Only fetch content if session is authenticated and there are sessions
    if (
      status === "authenticated" &&
      session &&
      session.user.token &&
      sessions.length > 0
    ) {
      fetchAllContent();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status, session, sessions]);

  // Log fetched content
  console.log("content", content);

  // Return the fetched content and loading state
  return {
    content,
    isLoading: isLoadingCourses || isLoadingContent,
  };
}

