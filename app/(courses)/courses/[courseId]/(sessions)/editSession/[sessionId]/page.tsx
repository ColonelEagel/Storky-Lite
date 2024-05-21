"use client";

import useGetSessions from "@/actions/useGetSessions"; // Import custom hook to fetch sessions data from the server
import { Loader } from "@/components/ui/loader"; // Import component for displaying a loading spinner
import { useSession } from "next-auth/react"; // Import hook for accessing the user session
import { useParams } from "next/navigation"; // Import hook for accessing URL parameters
import { SessionForm } from "../components/sessionForm"; // Import component for editing a session
import NoResults from "@/components/ui/no-results"; // Import component for displaying a message when no results are found

/**
 * EditSession component for editing a specific session item.
 * If the sessionId is "new", it renders the SessionForm component for creating a new session.
 * Otherwise, it fetches the session data from the server and renders the SessionForm component with the initialData prop for editing the session.
 * If the session is not found, it renders the NoResults component.
 */
export default function EditSession() {
  // Get the courseId and sessionId from the URL parameters
  const { courseId, sessionId } = useParams();

  // Fetch the session data from the server
  const { sessions, isLoading } = useGetSessions(courseId.toString());

  // Get the user session status from next-auth
  const { status } = useSession();

  // If the user session is still loading or if the session data is still loading, show a loader
  if (status === "loading" || isLoading) {
    return <Loader />; // Render the Loader component
  }

  // If the sessionId is "new", render the SessionForm component for creating a new session
  if (sessionId === "new") {
    return (
      <div className="min-h-screen">
        <SessionForm />
      </div>
    );
  } else {
    // Find the session with the matching sessionId in the sessions array
    const session = sessions.find((session) => +session.id === +sessionId);

    // Render the SessionForm component with the initialData prop for editing the session
    return (
      <div className="min-h-screen">
        {session ? (
          <SessionForm initialData={session} />
        ) : (
          <NoResults />
        )}
      </div>
    );
  }
}