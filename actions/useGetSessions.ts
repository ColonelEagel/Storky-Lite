"use client";
import { CourseData, Session } from "@/types/interface";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import useGetRequest from "./useGetRequest";
import toast from "react-hot-toast";

export default function useGetSessions(courseId: string) {
  const { data: session, status } = useSession();
  const [sessions, setSessions] = useState<Session[]>([]);
  const { fetchData, isLoading } = useGetRequest<Session[]>();

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
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status, session, courseId]);
console.log("sessions",sessions)
  return { sessions, isLoading };
}
