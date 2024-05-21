"use client";

// Import necessary components and hooks for the HomePage component

import { BookText, CircleUser, Presentation, School } from "lucide-react";
// Import the Heading component for displaying the page title
import Heading from "@/components/ui/heading";
// Import the Separator component for adding a horizontal line
import { Separator } from "@/components/ui/separator";

// Import the useGetCourses custom hook for fetching all courses
import useGetCourses from "@/actions/useGetCourses";
// Import the Loading component for displaying a loading state
import Loading from "./loading";
// Import the useSession hook from next-auth/react for accessing session data
import { useSession } from "next-auth/react";

// Import the useEffect hook for managing side effects in function components
import { useEffect } from "react";
// Import the GetAllSessions custom hook for fetching all sessions
import GetAllSessions from "@/actions/useGetAllSessions";
// Import the useGetAllStudents custom hook for fetching all students
import useGetAllStudents from "@/actions/useGetAllStudents";
// Import the useGetAllContent custom hook for fetching all content
import useGetAllContent from "@/actions/getAllContents";
// Import the HomeCard component for displaying the overview of the user's courses
import HomeCard from "@/components/ui/homeCard";

/**
 * HomePage component displays an overview of the user's courses
 * It fetches the total number of courses and sessions
 * It also displays the total number of lessons and students (if the user is an admin)
 */
const HomePage = () => {
  // Fetch all students
  const { students: studentsData, isLoading: studentsLoading } =
    useGetAllStudents();
  // Fetch all courses
  const { courses, isLoading: isCourseLoading } = useGetCourses();
  // Fetch all sessions
  const sessions = GetAllSessions({ courses });
  // Fetch all content
  const { content, isLoading: contentLoading } = useGetAllContent();

  // Get session and authentication status
  const { data: session, status } = useSession();
  // Check if the user is an admin
  const isAdmin = session?.user?.user?.role === "instructor";

  // Log relevant data for debugging purposes
  useEffect(() => {
    console.log("Status:", status);
    console.log("Session:", session);
    console.log("Students:", studentsData);
    console.log("Is Loading:", studentsLoading);
  }, [status, session, studentsLoading, studentsData]);

  // Show loading state while data is being fetched
  if (
    isCourseLoading ||
    studentsLoading ||
    contentLoading ||
    status === "loading"
  ) {
    return <Loading />;
  }

  // Calculate total numbers
  const TotalCourses = courses.length;
  const totalSessions = sessions.length;
  const totalStudents = studentsData.length;
  const totalLessons = content.length;

  return (
    <div className="flex-col min-h-screen">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <Heading
          title={`Welcome back, ${session?.user?.user?.name}!`}
          description="Here's an Overview of your courses"
        />
        <Separator />
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
          {/* Display total number of courses */}
          <HomeCard
            title="Total courses"
            description={TotalCourses}
            icon={<School className="h-4 w-4 text-muted-foreground" />}
          />
          {/* Display total number of sessions */}
          <HomeCard
            title="total Sessions"
            description={totalSessions}
            icon={<Presentation className="h-4 w-4 text-muted-foreground" />}
          />
          {/* Display total number of lessons */}
          <HomeCard
            title="lessons"
            description={totalLessons}
            icon={<BookText className="h-4 w-4 text-muted-foreground" />}
          />
          {/* Display total number of students (if the user is an admin) */}
          {isAdmin && (
            <HomeCard
              title="students"
              description={totalStudents}
              icon={<CircleUser className="h-4 w-4 text-muted-foreground" />}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
