"use client";

// Import the useGetContent custom hook for fetching content data from the server.
import useGetContent from "@/actions/useGetContent";

// Import the useParams hook from Next.js for accessing URL parameters.
import { useParams } from "next/navigation";

// Import the ContentForm component for creating and editing content.
import { ContentForm } from "../components/contentForm";

// Import the NoResults component for rendering a message when no content is found.
import NoResults from "@/components/ui/no-results";

// Import the useSession hook from next-auth/react for accessing session data.
import { useSession } from "next-auth/react";

// Import the Loader component for rendering a loading state.
import { Loader } from "@/components/ui/loader";


/**
 * Import statements for the EditContent component.
 * These statements import the necessary components and hooks for editing a specific content item.
 */

/**
 * EditContent component for editing a specific content item.
 * If the contentId is "new", it renders the ContentForm component for creating a new content.
 * Otherwise, it fetches the content data from the server and renders the ContentForm component with the initialData prop for editing the content.
 * If the content is not found, it renders the NoResults component.
 *
 * @returns {JSX.Element} The EditContent component.
 */
function EditContent() {
  // Get the courseId and sessionId from the URL parameters
  const { courseId, sessionId, contentId } = useParams();
  const courseIdString = courseId.toString();
  const sessionIdString = sessionId.toString();
  
  // Fetch the content data from the server
  const { content ,isLoading} = useGetContent({
    courseId: courseIdString,
    sessionId: sessionIdString,
  });

  // Get the session status from the useSession hook
  const { status}= useSession();

  // If the session is loading or the content is loading, render the Loader component
  if (status === "loading" || isLoading) {
    return <Loader />;
  }

  // If the contentId is "new", render the ContentForm component for creating a new content
  if (contentId === "new") {
    return (
      <div className="min-h-screen">
        <ContentForm />
      </div>
    );
  } else {
    // Find the content with the matching contentId in the contentData array
    const contentItem = content.find((content) => +content.id === +contentId);

    // Render the ContentForm component with the initialData prop for editing the content
    return (
      <div className="min-h-screen">
        {contentItem ? (
          <ContentForm initialData={contentItem} />
        ) : (
          <NoResults />
        )}
      </div>
    );
  }
}

export default EditContent;
