"use client";

import { Plus } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import Heading from "@/components/ui/heading";
import { useRouter } from "next/navigation";
import NoResults from "@/components/ui/no-results";
import CourseGallery from "@/components/gallery";
import Redirect from "@/components/ui/redirect";
import { useSession } from "next-auth/react";
import GetCourses from "@/actions/getCourses";
import Loading from "../loading";
import { useEffect, useState } from "react";
import { CourseData } from "@/types/interface";

/**
 * SingleCourse is a functional component that renders a single course based on the courseId parameter.
 *
 * @param {Object} props - The props object containing the courseId parameter.
 * @param {string} props.params.courseId - The ID of the course to be rendered.
 * @returns {JSX.Element} The rendered course component.
 */
function SingleCourse({ params }: { params: { courseId: string } }) {
  const router = useRouter();
  const { data: session, status } = useSession();
  const { courses, isLoading } = GetCourses();
  // const [singleCourse, setSingleCourse] = useState<CourseData | undefined>();

  // useEffect(() => {
  //   if (courses) {
      console.log("Fetched courses:", courses);
  //     console.log("Course ID from params:", params.courseId);
  //     const courseIdNumber = Number(params.courseId);
  //     const foundCourse = courses.find(
  //       (course) => +course.id === courseIdNumber
  //     );
  //     console.log("Found course:", foundCourse);
  //     setSingleCourse(foundCourse);
  //   }
  // }, [courses, params.courseId]);
  const courseIdNumber = Number(params.courseId);
  const foundCourse = courses.find(
    (course) => +course.id === courseIdNumber
  );

  if (status === "loading" || isLoading) {
    return <Loading />;
  }

  if (status === "unauthenticated") {
    router.push("/login"); // Redirect to login if unauthenticated
    return null;
  }

  return (
    <>
      {foundCourse ? (
        <div className="min-h-screen">
          <div className="flex items-center justify-between mt-10 p-4">
            <Heading
              title={foundCourse.name}
              description={foundCourse.description}
            />
            {session?.user.user.role === "instructor" && (
              <Redirect
                url={`/courses/${params.courseId}/editSession/new`}
                className="black"
              >
                <Plus className="mr-2 h-4 w-4" />
                Add New Session
              </Redirect>
            )}
          </div>
          <Separator className="my-4" />
          <CourseGallery />
        </div>
      ) : (
        <NoResults />
      )}
    </>
  );
}

export default SingleCourse;
