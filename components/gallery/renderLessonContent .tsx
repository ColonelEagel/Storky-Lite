"use client";

/**
 * React functional component for rendering the content of a lesson.
 *
 * @param {RenderLessonContentProps} props - The component props.
 * @param {string} props.sessionId - The ID of the session.
 * @param {string} props.courseId - The ID of the course.
 * @param {string} [props.className] - Optional class name for styling.
 * @returns {JSX.Element} The rendered component.
 */

import { Content, RenderLessonContentProps } from "@/types/interface";

// Import necessary Next.js and UI components
import { useRouter } from "next/navigation"; // Next.js hook for routing
import { useSession } from "next-auth/react"; // Next.js hook for session management
import useDeleteRequest from "@/actions/useDeleteRequest"; // Custom hook for making HTTP delete requests
import toast from "react-hot-toast"; // Toast notification library
import { Tab } from "@headlessui/react"; // Component for rendering tabbed content
import { AccordionContent } from "@radix-ui/react-accordion"; // Component for collapsible content
import { Separator } from "@/components/ui/separator"; // Component for rendering a separator
import { cn } from "@/lib/utils"; // Utility function for constructing class names
import CellAction from "../ui/cell-action"; // Component for rendering cell action
import GetContent from "@/actions/useGetContent"; // Custom hook for fetching content
import NoResults from "../ui/no-results"; // Component for rendering "No results" message

/**
 * RenderLessonContent component is a React functional component for rendering the content of a lesson.
 *
 * @param {RenderLessonContentProps} props - The component props.
 * @param {string} props.sessionId - The ID of the session.
 * @param {string} props.courseId - The ID of the course.
 * @param {string} [props.className] - Optional class name for styling.
 * @returns {JSX.Element} The rendered component.
 */
const RenderLessonContent: React.FC<RenderLessonContentProps> = ({
  sessionId,
  courseId,
  className,
}) => {
  // Fetch the content data for the specified course ID and session ID
  const { content } = GetContent({ courseId, sessionId });

  // Get the router instance for navigation
  const router = useRouter();

  // Get the session data for the authenticated user
  const { data: session } = useSession();

  // Custom hook for making HTTP delete requests
  const { deleteData, isLoading } = useDeleteRequest();

  // Log the session ID for debugging purposes
  console.log("sessionId", sessionId);

  /**
   * Handle the delete action for a lesson.
   * @param {string} id - The ID of the lesson to delete.
   */
  const handleDelete = (id: string) => {
    deleteData({
      url: `courses/${courseId}/sessions/${sessionId}/content/${id}`,
      onSuccess: () => {
        toast.success("lesson deleted successfully");
        router.push(`/courses/${courseId}`);
      },
      onError: (error: any) => {
        toast.error(
          "something went wrong Error deleting course please try again"
        );
        console.log("error", error);
      },
    });
  };

  // Check if the authenticated user is an admin
  const isAdmin = session?.user?.user?.role === "instructor";

  /**
   * Handle the update action for a lesson.
   * @param {string} id - The ID of the lesson to update.
   */
  const handleUpdate = (id: string) => {
    console.log("Update content", id);
    router.push(
      `/courses/${courseId}/editSession/${sessionId}/editContent/${id}`
    );
  };

  // Log the content data for debugging purposes
  console.log("content", content);
  /**
   * Render the content of the lesson.
   * @returns {JSX.Element} The rendered content.
   */
  return (
    <>
      {/* Check if there is any content */}
      {content?.length > 0 ? (
        // Render each content item
        content?.map((item: Content) => (
          <>
            {/* Render a tab for each content item */}
            <Tab as="div" className="hover:cursor-pointer" key={item.id}>
              {/* Render the content item */}
              {({ selected }) => (
                <>
                  {/* Render the content item accordion */}
                  <AccordionContent
                    key={item.id}
                    className="my-5 pl-5 relative"
                  >
                    <>
                      {/* Render the content item name */}
                      <p
                        className={cn(
                          `text-lg ${
                            selected
                              ? "text-cyan-500"
                              : "text-black dark:text-white"
                          } hover:text-cyan-700 text-pretty break-words`,
                          className
                        )}
                      >
                        {item.name}
                      </p>
                      {/* Render the cell action for the content item if the user is an admin */}
                      {isAdmin && (
                        <CellAction
                          onUpdate={() => handleUpdate(item.id)}
                          onDelete={() => handleDelete(item.id)}
                          loading={isLoading}
                          type="session"
                          id={item.id}
                          className="hover:cursor-pointer absolute right-[10px] top-1/2 -translate-y-1/2"
                        />
                      )}
                    </>

                    {/* Render the separator */}
                    <Separator />
                  </AccordionContent>
                </>
              )}
            </Tab>
          </>
        ))
      ) : (
        // Render a message if there is no content
        <AccordionContent>
          <NoResults />
        </AccordionContent>
      )}
    </>
  );
};
export default RenderLessonContent;
