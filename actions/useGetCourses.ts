"use client";

import { CourseData } from "@/types/interface";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import useGetRequest from "./useGetRequest";
import toast from "react-hot-toast";

/**
 * Custom hook to fetch all courses.
 * @returns {Object} An object containing the fetched courses and a loading state.
 * @property {CourseData[]} courses - The fetched courses.
 * @property {boolean} isLoading - A boolean indicating if the courses are still loading.
 */
export default function useGetCourses() {
  // Get session and authentication status
  const { data: session, status } = useSession();

  // State to store fetched courses
  const [courses, setCourses] = useState<CourseData[]>([]);

  // Hook to make GET requests
  const { fetchData, isLoading } = useGetRequest<CourseData[]>();

  // Fetch courses only if session is authenticated
  useEffect(() => {
    if (status === "authenticated" && session && session.user.token) {
      fetchData({
        url: "courses", // URL to fetch courses
        onSuccess: (data: CourseData[]) => setCourses(data), // Set the state with the fetched courses
      }).catch((error) => {
        console.error("Failed to fetch courses:", error);
        toast.error("Failed to fetch courses. Please try again later.");
      });
    }

    // Re-fetch courses if session or status changes
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status, session, session?.user.token]);

  // Return the fetched courses and loading state
  return {
    courses,
    isLoading,
  };
}

