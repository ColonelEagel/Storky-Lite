"use client";
// import { contentData } from "@/data/data";
import { Content } from "@/types/interface";
import { Tab } from "@headlessui/react";
import { AccordionContent } from "@radix-ui/react-accordion";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import CellAction from "../ui/cell-action";
import { redirect, useParams, useRouter } from "next/navigation";
import GetContent from "@/actions/getContent";
import { useSession } from "next-auth/react";
import useDeleteRequest from "@/actions/useDeleteREquest";
import toast from "react-hot-toast";
import NoResults from "../ui/no-results";

interface renderLessonContentProps {
  sessionId: string;
  courseId: string;
  className?: string;
}

const RenderLessonContent: React.FC<renderLessonContentProps> = ({
  sessionId,
  courseId,
  className,
}) => {
  const { content } = GetContent({ courseId, sessionId });
  const router = useRouter();
  const params = useParams();
  const { data: session } = useSession();
  const { deleteData, isLoading } = useDeleteRequest();
  console.log("sessionId", sessionId);
  const handleDelete = (id: string) => {
    deleteData({
      url: `courses/${courseId}/sessions/${sessionId}/content/${id}`,
      onSuccess: () => {
        toast.success("lesson deleted successfully");
        router.push(`courses/${courseId}`);
      },
      onError: (error: any) => {
        toast.error(
          "something went wrong Error deleting course please try again"
        );
        console.log("error", error);
      },
    });
  };
  const isAdmin = session?.user.user.role === "instructor";

  const handleUpdate = (id: string) => {
    console.log("Update content", id);
    router.push(
      `/courses/${courseId}/editSession/${sessionId}/editContent/${id}`
    );
  };

  return (
    <>
      {content?.length > 0 ? (
        content?.map((item: Content) => (
          <>
            <Tab as="div" className="hover:cursor-pointer" key={item.id}>
              {({ selected }) => (
                <>
                  <AccordionContent
                    key={item.id}
                    className="my-5 pl-5 relative"
                  >
                    (
                    <>
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
                    )
                    <Separator />
                  </AccordionContent>
                </>
              )}
            </Tab>
          </>
        ))
      ) : (
        <AccordionContent>
          <NoResults />
        </AccordionContent>
      )}
    </>
  );
};
export default RenderLessonContent;
