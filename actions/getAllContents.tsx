"use client";
import { Content, CourseData, Session } from "@/types/interface";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import useGetRequest from "./useGetRequest";
import useGetCourses from "./useGetCourses";
import useGetAllSessions from "./useGetAllSessions";
import toast from "react-hot-toast";

export default function useGetAllContent() {
  const { courses, isLoading: isLoadingCourses } = useGetCourses();
  const sessions = useGetAllSessions({ courses });
  const { data: session, status } = useSession();
  const [content, setContent] = useState<Content[]>([]);
  const { fetchData, isLoading: isLoadingContent } = useGetRequest<Content[]>();

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

    if (
      status === "authenticated" &&
      session &&
      session.user.token &&
      sessions.length > 0
    ) {
      fetchAllContent();
    }
  }, [status, session, sessions]);
console.log("content",content)
  return {
    content,
    isLoading: isLoadingCourses || isLoadingContent,
  };
}
