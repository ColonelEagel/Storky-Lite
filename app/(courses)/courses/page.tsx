"use client";

import CourseCard from "@/components/ui/courseCard";
import Heading from "@/components/ui/heading";
import Redirect from "@/components/ui/redirect";

import { Plus } from "lucide-react";
import { useSession } from "next-auth/react";

import Loading from "./loading";
import GetCourses from "@/actions/getCourses";

function CoursesPage({ params }: { params: { courseId: string } }) {
  const { data: session, status } = useSession();
  const isAdmin = session?.user.user.role === "instructor";

  const { courses, isLoading } = GetCourses();
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
