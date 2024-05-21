"use client";

import { useRouter } from "next/navigation"; // Import the useRouter hook from Next.js for accessing the router object
import StudentForm from "./components/student-form"; // Import the StudentForm component
import { useSession } from "next-auth/react"; // Import the useSession hook from next-auth/react for accessing the user session
import { Loader } from "@/components/ui/loader"; // Import the Loader component from the UI components

/**
 * StudentsPage component.
 * Renders the students page.
 * 
 * @returns The rendered StudentsPage component.
 */
const InviteStudentsPage = () => {
  const router = useRouter(); // Get the router object from the useRouter hook
  const { status } = useSession(); // Get the status of the user session from the useSession hook

  // If the user session is still loading, show a loader
  if (status === "loading") return <Loader />;

  // Render the StudentsPage component
  return (
    <div className=" min-h-screen p-5">
      {/* Render the StudentForm component */}
      <StudentForm />
    </div>
  );
};

export default InviteStudentsPage;

