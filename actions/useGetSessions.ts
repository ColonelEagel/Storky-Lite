"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import useGetRequest from "./useGetRequest";
import toast from "react-hot-toast";
import { Session } from "@/types/interface";

/**
 * Custom hook to fetch sessions for a specific course.
 * @param {string} courseId - The ID of the course.
 * @returns {Object} An object containing the fetched sessions and a loading state.
 * @property {Session[]} sessions - The fetched sessions.
 * @property {boolean} isLoading - A boolean indicating if the sessions are still loading.
 */
export default function useGetSessions(courseId: string) {
  // Get session and authentication status
  const { data: session, status } = useSession();

  // State to store fetched sessions
  const [sessions, setSessions] = useState<Session[]>([]);

  // Hook to make GET requests
  const { fetchData, isLoading } = useGetRequest<Session[]>();

  // Fetch sessions only if session is authenticated and there is a course ID
  useEffect(() => {
    if (status === "authenticated" && session && session.user.token) {
      fetchData({
        url: `courses/${courseId}/sessions`,
        onSuccess: (data: Session[]) => setSessions(data),
      }).catch((error) => {
        console.error("Failed to fetch sessions:", error);
        toast.error("Failed to fetch sessions. Please try again later.");
      });
    }
    // Re-fetch sessions if session or course ID changes
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status, session, courseId]);

  // Log sessions and loading state for debugging purposes
  console.log("sessions", sessions);

  return { sessions, isLoading };
}

