"use client";

// Import necessary components and hooks

// Import the NoResults component for rendering a message when no results are found.
import NoResults from "@/components/ui/no-results";

// Import the CourseForm component for creating and editing courses.
import { CourseForm } from "../components/courseForm";

// Import dummy data for courses.
import { dummyCourses } from "@/data/data";

// Import the useSession hook from next-auth/react for accessing session data.
import { useSession } from "next-auth/react";

// Import the useRouter hook from Next.js for accessing the router object.
import { useRouter } from "next/navigation";

// Import the useGetCourses custom hook for fetching courses data from the server.
import GetCourses from "@/actions/useGetCourses";

/**
 * EditCourse component handles the editing of a course.
 * It fetches the list of courses and renders the CourseForm component with the appropriate initial data.
 * If the courseId is "new", it renders the CourseForm component for creating a new course.
 * Otherwise, it finds the course with the matching ID and renders the CourseForm component with the initialData prop.
 * If the course is not found, it renders the NoResults component.
 * @param {Object} params - The params object containing the courseId parameter.
 * @param {string} params.courseId - The ID of the course to be edited.
 * @returns {JSX.Element} The rendered EditCourse component.
 */
function EditCourse({ params }: { params: { courseId: string } }) {
  // Get the courses data and loading status
  const { courses, isLoading } = GetCourses();
  const router = useRouter();

  // If the courseId is "new", render the CourseForm component for creating a new course
  if (params.courseId === "new") {
    return (
      <div className="min-h-screen">
        <CourseForm />
      </div>
    );
  } else {
    // Find the course with the matching ID
    const course = courses.find((course) => +course.id === +params.courseId);

    // Render the CourseForm component with the initialData prop for editing the course
    return (
      <div className="min-h-screen">
        {course ? <CourseForm initialData={course} /> : <NoResults />}
      </div>
    );
  }
}

export default EditCourse;

