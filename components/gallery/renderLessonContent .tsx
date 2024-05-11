// import { contentData } from "@/data/data";
import { Content } from "@/interface/interface";
import { Tab } from "@headlessui/react";
import { AccordionContent } from "@radix-ui/react-accordion";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

interface renderLessonContentProps {
    sessionId: string;
    lessonsData: Content[];
    ClassName?: string;
}

const RenderLessonContent: React.FC<renderLessonContentProps> = ({
    sessionId,
    lessonsData,
    ClassName,
}) => {
    // console.log(lessonsData)
    console.log("sessionId", sessionId);
    const content: Content[] = lessonsData.filter((lesson) => {
        return lesson.sessionId === sessionId;
    });
    // console.log(content)
    return (
        <>
            {content?.map((item: Content) => (
                <>
                    <AccordionContent key={item.id} className="my-5 pl-5">
                        <Tab>
                            {({ selected }) => (
                                <p
                                    className={cn(
                                        `text-lg ${selected ? "text-cyan-500" : "text-black" } hover:text-cyan-700 `,
                                        ClassName
                                    )}
                                >
                                    {item.title}
                                </p>
                            )}
                        </Tab>

                    </AccordionContent>
                    <Separator />
                </>
            ))}
        </>
    );
};
export default RenderLessonContent;
