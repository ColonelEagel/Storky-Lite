"use client";
import NoResults from "@/components/ui/no-results";
import { CourseForm } from "../components/courseForm";
import { dummyCourses } from "@/data/data";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import GetCourses from "@/actions/getCourses";

function EditCourse({ params }: { params: { courseId: string } }) {
  const { data: session } = useSession();
  const {courses,isLoading}=GetCourses();
  const router = useRouter();

  const isAdmin = session?.user.user.role === "instructor";
  console.log(typeof  params.courseId)

  if (!isAdmin) router.push("/");

  if (params.courseId === "new") {
    return (
      <div className="min-h-screen">
        <CourseForm />
      </div>
    );
  } else {
    const course = courses.find((course) => +course.id === +params.courseId);
    return (
      <div className="min-h-screen">
        {course ? <CourseForm initialData={course} /> : <NoResults />}
      </div>
    );
  }
}

export default EditCourse;
