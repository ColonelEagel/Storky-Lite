"use client";

import useGetContent from "@/actions/useGetContent";
import { useParams } from "next/navigation";
import { ContentForm } from "../components/contentForm";
import NoResults from "@/components/ui/no-results";

/**
 * EditContent component for editing a specific content item.
 * If the contentId is "new", it renders the ContentForm component for creating a new content.
 * Otherwise, it fetches the content data from the server and renders the ContentForm component with the initialData prop for editing the content.
 * If the content is not found, it renders the NoResults component.
 */
function EditContent() {
  // Get the courseId and sessionId from the URL parameters
  const { courseId, sessionId, contentId } = useParams();
  const courseIdString = courseId.toString();
  const sessionIdString = sessionId.toString();
  // Fetch the content data from the server
  const { content } = useGetContent({
    courseId: courseIdString,
    sessionId: sessionIdString,
  });

  // If the contentId is "new", render the ContentForm component for creating a new content
  if (sessionId === "new") {
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
