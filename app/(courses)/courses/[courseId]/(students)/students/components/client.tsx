"use client";

import { useParams, useRouter } from "next/navigation";

// Import the required UI components
import Heading from "@/components/ui/heading"; // Heading component for displaying titles and descriptions
import { Separator } from "@/components/ui/separator"; // Separator component for visually separating content
import { Button } from "@/components/ui/button"; // Button component for rendering interactive elements
import { Plus } from "lucide-react"; // Plus icon from lucide-react library

// Import the required custom components and data
import { StudentColumn, columns } from "./columns"; // Import the StudentColumn type and the columns for the students table
import { DataTable } from "@/components/ui/data-table"; // DataTable component for rendering tabular data

/**
 * Interface for the props of the StudentClient component.
 * Contains the data for the students table.
 */
interface StudentClientProps {
  data: StudentColumn[];
}
/**
 * React functional component for rendering the client side of the students page.
 *
 * @param {Object} props - The properties for the component.
 * @param {Array<StudentColumn>} props.data - The data for the students table.
 * @returns {JSX.Element} The rendered component.
 */
const StudentClient: React.FC<StudentClientProps> = ({ data }) => {
  const params = useParams();
  const router = useRouter();

  // Render the heading, button, and data table for the students page.
  return (
    <>
      {/* Render the heading */}
      <div className="flex items-center justify-between">
        <Heading
          title={`students (${data.length})`}
          description="Manage students for this course."
        />
        {/* Render the button to invite a new student */}
        <Button onClick={() => router.push(`/courses/${params.courseId}/students/invite-student`)}>
          <Plus className="mr-2 h-4 w-4" />
          invite new student
        </Button>
      </div>
      {/* Render the separator */}
      <Separator />
      {/* Render the students table */}
      <DataTable searchKey="name" columns={columns} data={data} />
      {/* Render the separator */}
      <Separator />
    </>
  );
};

export default StudentClient;

