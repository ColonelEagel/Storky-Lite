"use client";

// Import necessary hooks and components

// Import the useGetRequest custom hook for making GET requests to the server.
import useGetRequest from "@/actions/useGetRequest";

// Import the StudentClient component for rendering the client side of the students page.
import StudentClient from "./components/client";

// Import the StudentColumn type and the columns for the students table.
import { StudentColumn } from "./components/columns";

// Import the useEffect hook for managing side effects in function components.
import { useEffect } from "react";

// Import the useSession hook from next-auth/react for accessing session data.
import { useSession } from "next-auth/react";

// Import the toast library for displaying toast notifications.
import toast from "react-hot-toast";

// Import the Loading component for rendering a loading state.
import Loading from "./loading";

// Import the useRouter hook from Next.js for accessing the router object.
import { useRouter } from "next/navigation";

// Import the useGetAllStudents custom hook for fetching all students data from the server.
import useGetAllStudents from "@/actions/useGetAllStudents";

// Import the Loader component for displaying a loading spinner.
import { Loader } from "@/components/ui/loader";


/**
 * Import statements for the StudentsPage component.
 * These statements import the necessary components and hooks for rendering the students page.
 */

/**
 * StudentsPage component.
 * Renders the students page.
 */
const StudentsPage = () => {
  // Fetch all students data from the server
  const { students, isLoading } = useGetAllStudents();

  // If the data is still loading, show a loader
  if (isLoading) return <Loader/>;

  // Render the students page
  return (
    <>
      <div className="flex-col min-h-screen">
        <div className="flex-1 space-y-4 p-8 pt-6">
          <StudentClient data={students} />
        </div>
      </div>
    </>
  );
};

export default StudentsPage;

