"use client";

// Import necessary modules and components for the SingleCourse component

import { useRouter } from "next/navigation"; // Import the useRouter hook for accessing the router object
import { useSession } from "next-auth/react"; // Import the useSession hook for accessing the user session

import useGetCourses from "@/actions/useGetCourses"; // Import the custom hook for fetching courses data from the server

import { Separator } from "@/components/ui/separator"; // Import the Separator component for visually separating content
import { Plus, SquareUser } from "lucide-react"; // Import necessary icons from the lucide-react library
import {
  Tooltip, // Import the Tooltip component for displaying tooltips
  TooltipContent, // Import the TooltipContent component for displaying the content of the tooltip
  TooltipTrigger, // Import the TooltipTrigger component for triggering the tooltip
  TooltipProvider, // Import the TooltipProvider component for providing the tooltip context
} from "@/components/ui/tooltip";

import Heading from "@/components/ui/heading"; // Import the Heading component for displaying titles and descriptions
import NoResults from "@/components/ui/no-results"; // Import the NoResults component for displaying a message when no results are found
import CourseGallery from "@/components/gallery"; // Import the CourseGallery component for displaying course galleries
import Redirect from "@/components/ui/redirect"; // Import the Redirect component for redirecting to a different page

import Loading from "./loading"; // Import the Loading component for displaying a loading state

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
  if (!session) return;
  const isAdmin = session?.user?.user?.role === "instructor";

  // Convert the courseId parameter to a number
  const courseIdNumber = Number(params.courseId);

  // Find the course with the matching ID
  const foundCourse = courses.find((course) => +course.id === courseIdNumber);

  // Render the course component
  return (
    // Conditionally render the course details or the no results component
    <>
      {foundCourse ? (
        <div className="min-h-screen">
          {/* Course heading and instructor buttons */}
          <div className="flex items-center justify-between mt-10 p-4">
            <Heading
              title={foundCourse.name}
              description={foundCourse.description}
            />
            {/* If user is an instructor, render the add session button */}
            {isAdmin && (
              <div className="flex gap-2">
                {/* Add New Session tooltip */}
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
                      <p>Add New Session</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                {/* Invite student tooltip */}
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
                      <p>Invite Student</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            )}
          </div>
          {/* Separator */}
          <Separator className="my-4" />
          {/* Course gallery */}
          <CourseGallery />
        </div>
      ) : (
        <NoResults />
      )}
    </>
  );
}

export default SingleCourse;

