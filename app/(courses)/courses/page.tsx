"use client";
import useGetRequest from "@/app/actions/useGetRequest";
import CourseCard from "@/components/ui/courseCard";
import Heading from "@/components/ui/heading";
import Redirect from "@/components/ui/redirect";
import { CourseData } from "@/types/interface";
import axios from "axios";
import { Plus } from "lucide-react";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Loading from "./loading";

function CoursesPage({ params }: { params: { courseId: string } }) {
  const { data: session, status } = useSession();
  const [courses, setCourses] = useState<CourseData[]>([]);
  const isAdmin = session?.user.user.role === "instructor";
  const { fetchData, isLoading } = useGetRequest<CourseData[]>();

  // useEffect(() => {
  //   const fetchCourses = async () => {
  //     try {
  //       if (status === "loading") {
  //         toast.error("Session is loading");
  //         return;
  //       }
  //       if (status === "unauthenticated") {
  //         throw new Error("Session is not authenticated");
  //       }

  //       console.log("Fetching courses...");
  //       console.log("Session details:", session);

  //       const response = await axios.get(
  //         "https://learning-platform-9wrh.onrender.com/courses",
  //         {
  //           headers: {
  //             Authorization: `Bearer ${session?.user.token}`,
  //           },
  //         }
  //       );

  //       console.log("Response data:", response.data);
  //       setCourses(response.data.data);
  //     } catch (error: any) {
  //       console.error("Failed to fetch courses:", error);

  //       // Log error response if available
  //       if (error.response) {
  //         console.error("Error response data:", error.response.data);
  //         console.error("Error response status:", error.response.status);
  //         console.error("Error response headers:", error.response.headers);
  //       }
  //       toast.error("Failed to fetch courses. Please try again later.");
  //     }
  //   };

  //   fetchCourses();
  // }, [session, session?.user.token, status]);
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

  // useEffect(() => {
  //   fetchCourses();
  // }, [fetchCourses]);
  console.log("Courses:", courses);

  if (status === "loading" || isLoading) {
    return <Loading />;
  }

  if (status === "unauthenticated") {
    return <p>Please log in to view the courses.</p>;
  }

  return (
    <div className="min-h-screen p-4">
      <div className="flex items-center justify-between mt-10 p-4">
        <Heading title="Courses" description="All of your courses" />
        {isAdmin && (
          <Redirect url="/courses/editcourse/new" className="black">
            <Plus className="mr-2 h-4 w-4" />
            Add New Course
          </Redirect>
        )}
      </div>
      <div className="flex flex-wrap justify-start gap-5 items-center">
        {courses.length > 0 ? (
          courses.map((course) => (
            <CourseCard
              key={course.id}
              course={course}
              className="w-full md:w-[45%] lg:w-[400px]"
            />
          ))
        ) : (
          <p>No courses found</p>
        )}
      </div>
    </div>
  );
}

export default CoursesPage;
