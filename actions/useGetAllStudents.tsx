"use client";
import { CourseData } from "@/types/interface";
import { useEffect, useState } from "react";
import useGetRequest from "./useGetRequest";
import { Session } from "inspector";
import { StudentColumn } from "@/app/(courses)/courses/[courseId]/(students)/students/components/columns";
import toast from "react-hot-toast";
import { useSession } from "next-auth/react";

export default function useGetAllStudents() {
  const { fetchData } = useGetRequest<StudentColumn[]>(); // Hook to make GET requests.
  const [students, setStudents] = useState<StudentColumn[]>([]); // State to store students.
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === "authenticated" && session && session.user.token) {
      setIsLoading(true);
      fetchData({
        url: `user`,
        onSuccess: (data) => setStudents(data as StudentColumn[]),
      }).catch((error) => {
        console.error("Failed to fetch Content:", error);
        toast.error("Failed to fetch Content. Please try again later.");
      });
      setIsLoading(false);
    }
    
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ session, status]);
  console.log("students", students);
  console.log("isLoading", isLoading);
  return { students, isLoading }; // Return the fetched sessions.
}
