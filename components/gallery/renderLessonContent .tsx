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

interface renderLessonContentProps {
  sessionId: string;
  courseId: string;
  ClassName?: string;
}

const RenderLessonContent: React.FC<renderLessonContentProps> = ({
  sessionId,
  courseId,
  ClassName,
}) => {
  const { content } = GetContent({ courseId, sessionId });
  const router = useRouter();
  const params = useParams();
  const { data: session } = useSession();

  const isAdmin = session?.user.user.role === "instructor";

  const handleUpdate = (id: string) => {
    console.log("Update content", id);
    router.push(
      `/courses/${params.courseId}/editSession/${sessionId}/editContent/${id}`
    );
  };

  return (
    <>
      {content?.map((item: Content) => (
        <>
          <Tab as="div" className="hover:cursor-pointer" key={item.id}>
            {({ selected }) => (
              <>
                <AccordionContent key={item.id} className="my-5 pl-5 relative">
                  <p
                    className={cn(
                      `text-lg ${
                        selected
                          ? "text-cyan-500"
                          : "text-black" + " dark:text-white"
                      } hover:text-cyan-700 text-pretty  break-words`,
                      ClassName
                    )}
                  >
                    {item.name}
                  </p>
                  {isAdmin && (
                    <CellAction
                      onUpdate={() => handleUpdate(item.id)}
                      type="session"
                      id={item.id}
                      className="hover:cursor-pointer absolute right-[10px] top-1/2 -translate-y-1/2"
                    ></CellAction>
                  )}
                  <Separator />
                </AccordionContent>
              </>
            )}
          </Tab>
        </>
      ))}
    </>
  );
};
export default RenderLessonContent;
