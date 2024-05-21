"use client";

// Import the CourseCard component for rendering a course card
import CourseCard from "@/components/ui/courseCard"; // Import the CourseCard component for rendering a course card

// Import the Heading component for displaying titles and descriptions
import Heading from "@/components/ui/heading"; // Import the Heading component for displaying titles and descriptions

// Import the Redirect component for rendering a redirect link
import Redirect from "@/components/ui/redirect"; // Import the Redirect component for rendering a redirect link

// Import the Plus icon from the lucide-react library
import { Plus } from "lucide-react"; // Import the Plus icon from the lucide-react library

// Import the useSession hook from next-auth/react for accessing session data
import { useSession } from "next-auth/react"; // Import the useSession hook from next-auth/react for accessing session data

// Import the Loading component for displaying a loading spinner
import Loading from "./loading"; // Import the Loading component for displaying a loading spinner

// Import the GetCourses custom hook for fetching courses data from the server
import GetCourses from "@/actions/useGetCourses"; // Import the GetCourses custom hook for fetching courses data from the server


/**
 * CoursesPage component renders a list of courses for the authenticated user.
 * It fetches the list of courses from the server using the GetCourses action.
 * If the user is not authenticated, it displays a message to log in.
 * If the user is an instructor, it renders an Add New Course button.
 * If there are no courses, it displays a message indicating that no courses were found.
 * Otherwise, it renders a CourseCard for each course.
 */
function CoursesPage({ params }: { params: { courseId: string } }) {
  // Get the session data and status
  const { data: session, status } = useSession();

  // Check if the user is an instructor
  const isAdmin = session?.user?.user?.role === "instructor";

  // Get the courses data and loading status
  const { courses, isLoading } = GetCourses();

  // Log the courses data for debugging purposes
  console.log("Courses:", courses);

  // If loading or fetching session data, show loading spinner
  if (status === "loading" || isLoading) {
    return <Loading />;
  }

  // If not authenticated, display message to log in
  if (status === "unauthenticated") {
    return <p>Please log in to view the courses.</p>;
  }

  return (
    <div className="min-h-screen p-4">
      <div className="flex items-center justify-between mt-10 p-4">
        <Heading title="Courses" description="All of your courses" />
        {/* If user is an instructor, render the add course button */}
        {isAdmin && (
          <Redirect url="/courses/editcourse/new" className="black">
            <Plus className="mr-2 h-4 w-4" />
            Add New Course
          </Redirect>
        )}
      </div>
      <div className="flex flex-wrap justify-start gap-5 items-center">
        {/* If there are courses, render a CourseCard for each course */}
        {courses.length > 0 ? (
          courses.map((course) => (
            <CourseCard
              key={course.id}
              course={course}
              className="w-full md:w-[45%] lg:w-[400px] hover:scale-110"
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

