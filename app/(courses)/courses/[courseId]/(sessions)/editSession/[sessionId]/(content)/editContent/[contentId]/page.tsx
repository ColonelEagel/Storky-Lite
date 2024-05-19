import NoResults from "@/components/ui/no-results";
import { ContentForm } from "../components/contentForm";
import { contentData } from "@/data/data";

function EditContent({ params }: { params: { contentId: string } }) {
  if (params.contentId === "new") {
    return (
      <div className="min-h-screen">
        <ContentForm />
      </div>
    );
  } else {
    const content = contentData.find(
      (content) => content.id === params.contentId
    );
    return (
      <div className="min-h-screen">
        {content ? <ContentForm initialData={content} /> : <NoResults />}
      </div>
    );
  }
}

export default EditContent;
