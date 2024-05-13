import NoResults from "@/components/ui/no-results";
import { SessionForm } from "../components/sessionForm";
import { sessions } from "@/data/data";

function EditSession({ params }: { params: { sessionId: string } }) {
  if (params.sessionId === "new") {
    return (
      <div className="min-h-screen">
        <SessionForm />
      </div>
    );
  } else {
    const session = sessions.find((session) => session.id === params.sessionId);
    return (
      <div className="min-h-screen">
        {session ? <SessionForm initialData={session} /> : <NoResults />}
      </div>
    );
  }
}

export default EditSession;
