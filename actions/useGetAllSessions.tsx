import { CourseData, Session } from "@/types/interface";
import { useEffect, useState } from "react";
import useGetRequest from "./useGetRequest";

/**
 * The GetAllSessions component fetches all sessions for a list of courses and returns them.
 * @param {GetAllSessionsProps} props - The component props.
 * @param {CourseData[]} props.courses - The list of courses.
 * @returns {Session[]} - The list of sessions.
 */
interface GetAllSessionsProps {
  courses: CourseData[];
}

/**
 * Custom hook that fetches all sessions for a list of courses.
 * @param {GetAllSessionsProps} props - The component props.
 * @returns {Session[]} - The list of sessions.
 */
export default function useGetAllSessions({ courses }: GetAllSessionsProps) {
  const { fetchData } = useGetRequest<Session[]>(); // Hook to make GET requests.
  const [sessions, setSessions] = useState<Session[]>([]); // State to store sessions.

  /**
   * Fetches all sessions for the given courses.
   */
  useEffect(() => {
    const fetchAllSessions = async () => {
      const allSessions: Session[] = []; // Array to store all sessions.
      for (const course of courses) {
        await fetchData({
          url: `courses/${course.id}/sessions`, // URL to fetch sessions for a course.
          onSuccess: (data: Session[]) => {
            allSessions.push(...data); // Add fetched sessions to the array.
          },
        });
      }
      setSessions(allSessions); // Set the state with the fetched sessions.
    };

    // Fetch sessions only if there are courses.
    if (courses.length > 0) {
      fetchAllSessions();
    }

    // Re-fetch sessions if courses change.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [courses]);

  // Return the fetched sessions.
  return sessions;
}

