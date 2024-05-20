"use client";
import NoResults from "@/components/ui/no-results";
import { SessionForm } from "../components/sessionForm";
import { sessions } from "@/data/data";
import useGetSessions from "@/actions/useGetSessions";
import { useParams } from "next/navigation";

function EditSession() {
  const {courseId,sessionId}=useParams()
  console.log(courseId)
  const { sessions } = useGetSessions(courseId.toString());

  if (sessionId === "new") {
    return (
      <div className="min-h-screen">
        <SessionForm />
      </div>
    );
  } else {
    const session = sessions.find((session) => +session.id === +sessionId);
    return (
      <div className="min-h-screen">
        {session ? <SessionForm initialData={session} /> : <NoResults />}
      </div>
    );
  }
}

export default EditSession;
