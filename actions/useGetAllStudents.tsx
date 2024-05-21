"use client";

import { CourseData } from "@/types/interface";
import { useEffect, useState } from "react";
import useGetRequest from "./useGetRequest";
import { Session } from "inspector";
import { StudentColumn } from "@/app/(courses)/courses/[courseId]/(students)/students/components/columns";
import toast from "react-hot-toast";
import { useSession } from "next-auth/react";

/**
 * Custom hook to fetch all students.
 * @returns {Object} An object containing the fetched students and a loading state.
 * @property {StudentColumn[]} students - The fetched students.
 * @property {boolean} isLoading - A boolean indicating if the students are still loading.
 */
export default function useGetAllStudents() {
  const { fetchData } = useGetRequest<StudentColumn[]>(); // Hook to make GET requests.
  const [students, setStudents] = useState<StudentColumn[]>([]); // State to store students.
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { data: session, status } = useSession();

  useEffect(() => {
    // Fetch students only if session is authenticated
    if (status === "authenticated" && session && session.user.token) {
      setIsLoading(true);
      fetchData({
        url: `user`,
        onSuccess: (data) => setStudents(data as StudentColumn[]),
      }).catch((error) => {
        console.error("Failed to fetch students:", error);
        toast.error("Failed to fetch students. Please try again later.");
      });
      setIsLoading(false);
    }
    
    // Re-fetch students if session or status changes
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ session, status]);

  // Log students and loading state for debugging purposes
  console.log("students", students);
  console.log("isLoading", isLoading);

  return { students, isLoading }; // Return the fetched students and loading state.
}

