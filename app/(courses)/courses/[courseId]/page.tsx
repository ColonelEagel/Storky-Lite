"use client";

import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

import useGetCourses from "@/actions/useGetCourses";

import { Separator } from "@/components/ui/separator";
import { Plus, SquareUser } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import Heading from "@/components/ui/heading";
import NoResults from "@/components/ui/no-results";
import CourseGallery from "@/components/gallery";
import Redirect from "@/components/ui/redirect";

import Loading from "../loading";

/**
 * SingleCourse is a functional component that renders a single course based on the courseId parameter.
 *
 * @param {Object} props - The props object containing the courseId parameter.
 * @param {string} props.params.courseId - The ID of the course to be rendered.
 * @returns {JSX.Element} The rendered course component.
 */
function SingleCourse({ params }: { params: { courseId: string } }) {
  // Get the router instance
  const router = useRouter();

  // Get the session data and status
  const { data: session, status } = useSession(); 
   // Get the courses data and loading status
  const { courses, isLoading } = useGetCourses();

    // If not authenticated, redirect to login page
  if (status === "unauthenticated") {
    router.push("/login");
    return null;
  }
  // If loading or fetching session data, show loading spinner
  if (status === "loading" || isLoading) {
    return <Loading />;
  }
  if(!session)return
  const isAdmin = session?.user?.user?.role === "instructor";


  // Convert the courseId parameter to a number
  const courseIdNumber = Number(params.courseId);

  // Find the course with the matching ID
  const foundCourse = courses.find((course) => +course.id === courseIdNumber);



  // Render the course component
  return (
    <>
      {/* If course is found, render the course details */}
      {foundCourse ? (
        <div className="min-h-screen">
          <div className="flex items-center justify-between mt-10 p-4">
            {/* Render the course heading */}
            <Heading
              title={foundCourse.name}
              description={foundCourse.description}
            />
            {/* If user is an instructor, render the add session button */}
            {isAdmin && (
              <div className="flex gap-2">
                <TooltipProvider delayDuration={300}>
                  <Tooltip>
                    <TooltipTrigger>
                      <Redirect
                        url={`/courses/${params.courseId}/editSession/new`}
                        className="black"
                      >
                        <Plus size={15} />
                      </Redirect>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p> Add New Session</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                <TooltipProvider delayDuration={300}>
                  <Tooltip>
                    <TooltipTrigger>
                      <Redirect
                        url={`/courses/${params.courseId}/students`}
                        className="black"
                      >
                        <SquareUser size={15} />
                      </Redirect>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p> invite student</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            )}
          </div>
          <Separator className="my-4" />
          {/* Render the course gallery */}
          <CourseGallery />
        </div>
      ) : (
        // {/* If course is not found, render the no results component */}
        <NoResults />
      )}
    </>
  );
}

export default SingleCourse;
