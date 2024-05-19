"use client";
import { CourseData } from "@/types/interface";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import useGetRequest from "./useGetRequest";
import toast from "react-hot-toast";

export default function GetCourses() {
  const { data: session, status } = useSession();
  const [courses, setCourses] = useState<CourseData[]>([]);
  const { fetchData, isLoading } = useGetRequest<CourseData[]>();
  useEffect(() => {
    if (status === "authenticated" && session && session.user.token) {
      fetchData({
        url: "courses",
        onSuccess: (data: CourseData[]) => setCourses(data),
      }).catch((error) => {
        console.error("Failed to fetch courses:", error);
        toast.error("Failed to fetch courses. Please try again later.");
      });
    }
  }, [status, session, session?.user.token]);

  return {
    courses,
    isLoading,
  };
}
