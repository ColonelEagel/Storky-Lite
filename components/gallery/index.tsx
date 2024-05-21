"use client";

import { TabGroup, TabList, TabPanels } from "@headlessui/react"; // Tab component for rendering tabbed content
import { DropdownMenuItem } from "@/components/ui/dropdown-menu"; // Dropdown menu item component

import { useParams, useRouter } from "next/navigation"; // Next.js hooks for routing
import RenderLessonContent from "./renderLessonContent "; // Component for rendering lesson content

import { Session } from "@/types/interface"; // Interface for session data

import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"; // Accordion component for collapsible content
import CellAction from "../ui/cell-action"; // Component for rendering cell action
import { Plus } from "lucide-react"; // Icon component
import useGetSessions from "@/actions/useGetSessions"; // Custom hook for fetching sessions data

import ContentProvider from "@/provider/contentProvider"; // Context provider component
import { useSession } from "next-auth/react"; // Next.js hook for session management
import useDeleteRequest from "@/actions/useDeleteRequest"; // Custom hook for making HTTP delete requests
import toast from "react-hot-toast"; // Toast notification library
import { Loader } from "../ui/loader"; // Loader component
import NoResults from "../ui/no-results"; // Component for rendering "No results" message
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "../ui/resizable"; // Resizable panel components
import { ScrollArea } from "../ui/scroll-area"; // Scrollable area component

/**
 * Course gallery component for rendering a list of lessons and their content.
 *
 * @return {JSX.Element} The rendered course gallery component
 */

const CourseGallery = () => {
  // Get the course ID from the URL parameters
  const { courseId } = useParams();
  // Convert the course ID to a string
  const courseIdString = courseId.toString();
  // Get the router instance for navigation
  const router = useRouter();
  // Fetch the sessions data for the specified course ID
  const { sessions, isLoading } = useGetSessions(courseIdString);
  // Get the session data for the authenticated user
  const { data: session } = useSession();
  // Custom hook for making HTTP delete requests
  const { deleteData, isLoading: isDeleting } = useDeleteRequest();

  // Check if the authenticated user is an admin
  const isAdmin = session?.user?.user?.role === "instructor";

  // Convert the course ID to a number
  const courseIdNumber = Number(courseId);
  // Filter the sessions data to get sessions for the specified course ID
  const sessionsData: Session[] = sessions?.filter(
    (session) => +session?.courseId === courseIdNumber
  );

  // If the sessions data is still loading, show a loader
  if (isLoading) return <Loader />;

  /**
   * Handle the delete action for a session
   * @param {string} sessionId - The ID of the session to delete
   */
  const handleDelete = (sessionId: string) => {
    deleteData({
      url: `courses/${courseId}/sessions/${sessionId}`,
      onSuccess: () => {
        toast.success("Session deleted successfully");
        router.refresh();
      },
      onError: (error: any) => {
        toast.error(
          "Something went wrong. Error deleting session. Please try again."
        );
        console.log("error", error);
      },
    });
  };

  /**
   * Handle the update action for a session
   * @param {string} sessionId - The ID of the session to update
   */
  const handelSessionUpdate = (sessionId: string) => {
    router.push(`/courses/${courseId}/editSession/${sessionId}`);
  };

  /**
   * Handle the update action for a session content
   * @param {string} sessionId - The ID of the session to update content for
   */
  const handelContentUpdate = (sessionId: string) => {
    router.push(
      `/courses/${courseId}/editSession/${sessionId}/editContent/new`
    );
  };
  /**
   * Renders the course gallery component.
   * @returns {JSX.Element} The rendered component.
   */
  return (
    // Render the main component if there are sessions
    sessions.length > 0 ? (
      <>
        {/* Render the TabGroup component */}
        <TabGroup as="div" className="min-h-screen">
          {/* Render the ResizablePanelGroup component */}
          <ResizablePanelGroup
            direction="vertical"
            className="min-h-screen rounded-lg border flex gap-5 max-w-screen-2xl mx-auto"
          >
            {/* Render the first ResizablePanel component */}
            <ResizablePanel defaultSize={50}>
              {/* Render the TabPanels component */}
              <TabPanels className="h-full relative  border-s-4  flex-1 max-w-[900px] mx-auto">
                {/* Render the content for each session */}
                {sessionsData?.map((content) => (
                  <ContentProvider
                    key={content.id}
                    courseId={courseIdString}
                    sessionId={content.id}
                  />
                ))}
              </TabPanels>
            </ResizablePanel>
            {/* Render the ResizableHandle component */}
            <ResizableHandle withHandle={true} />
            {/* Render the second ResizablePanel component */}
            <ResizablePanel defaultSize={50}>
              {/* Render the TabList component */}
              <TabList className="flex flex-col gap-6 h-full  max-w-[900px] mx-auto">
                <ScrollArea>
                  {/* Render the Accordion component */}
                  <Accordion type="single" collapsible>
                    {/* Render the content for each session */}
                    {sessionsData &&
                      sessionsData?.map((session, index) => {
                        return (
                          <>
                            {/* Render the AccordionItem component */}
                            <AccordionItem
                              value={`item-${index + 1}`}
                              key={session.id}
                              className="relative"
                            >
                              {/* Render the CellAction component if the user is an admin */}
                              {isAdmin && (
                                <CellAction
                                  onUpdate={() =>
                                    handelSessionUpdate(session.id)
                                  }
                                  onDelete={() => handleDelete(session.id)}
                                  loading={isDeleting}
                                  type="session"
                                  id={session.id}
                                  className="hover:cursor-pointer absolute right-[15px] top-6"
                                >
                                  {/* Render the DropdownMenuItem component */}
                                  <DropdownMenuItem
                                    onClick={() =>
                                      handelContentUpdate(session.id)
                                    }
                                  >
                                    <Plus className="mr-2 h-4 w-4" />
                                    Add content
                                  </DropdownMenuItem>
                                </CellAction>
                              )}
                              {/* Render the AccordionTrigger component */}
                              <AccordionTrigger>
                                <div className="flex gap-2 justify-start items-start flex-col w-full pl-3">
                                  <div className="flex justify-start items-center w-full ">
                                    <p className="">{session.name}</p>
                                    <p className="text-sm text-muted-foreground ml-3">
                                      {session.duration} hrs
                                    </p>
                                  </div>
                                  <p className="text-sm text-muted-foreground ml-3">
                                    {session.description}
                                  </p>
                                </div>
                              </AccordionTrigger>
                              {/* Render the RenderLessonContent component */}
                              <RenderLessonContent
                                sessionId={session.id}
                                courseId={courseIdString}
                              />
                            </AccordionItem>
                          </>
                        );
                      })}
                  </Accordion>
                </ScrollArea>
              </TabList>{" "}
            </ResizablePanel>
          </ResizablePanelGroup>
        </TabGroup>
      </>
    ) : (
      // Render the NoResults component if there are no sessions
      <NoResults />
    )
  );
};

export default CourseGallery;
