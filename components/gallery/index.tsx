"use client";
import { useEffect, useState } from "react";

import { TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";

import GalleryTab from "./gallery-tab";
import { useParams, useRouter } from "next/navigation";
import RenderLessonContent from "./renderLessonContent ";
import { contentData, sessions } from "@/data/data";

import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import CellAction from "../ui/cell-action";
import { Plus } from "lucide-react";

const CourseGallery = () => {
  const courseId = useParams().courseId;
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);
  if (!isMounted) {
    return null;
  }

  const sessionsData = sessions?.filter(
    (session) => session.courseId === courseId
  );


  const handelSessionUpdate = (sessionId: string) => {
    router.push(`/courses/${courseId}/editSession/${sessionId}`)
  };
  const handelContentUpdate = (sessionId: string) => {
    router.push(`/courses/${courseId}/editSession/${sessionId}/editContent/new`)
  };

  return (
    <TabGroup
      as="div"
      className="flex justify-between items-center flex-col-reverse md:flex-row"
    >
      <div className="mx-auto mt-6 hidden max-w-2xl sm:block  p-14 flex-1">
        <TabList className="flex flex-col gap-6 ">
          <Accordion type="single" collapsible>
            {sessionsData?.map((session, index) => {
              return (
                <>
                  <AccordionItem value={`item-${index + 1}`} key={session.id} className="relative">
                    <CellAction onUpdate={() => handelSessionUpdate(session.id)} type="session" id={session.id} className="hover:cursor-pointer absolute right-[10px] top-3">
                      <DropdownMenuItem onClick={() => handelContentUpdate(session.id)}><Plus className="mr-2 h-4 w-4" />Add content</DropdownMenuItem>
                    </CellAction>
                    <AccordionTrigger>
                      <div className="flex justify-between items-center w-full">
                        <p className="">{session.name}</p>
                      </div>
                    </AccordionTrigger>
                    <RenderLessonContent
                      sessionId={session.id}
                      lessonsData={contentData}
                    />
                  </AccordionItem>
                </>
              );
            })}
          </Accordion>
        </TabList>
      </div>
      <TabPanels className="aspect-square h-96  relative  border-s-4  flex-1">
        {contentData?.map((content) => (
          <GalleryTab key={content.id} url={content.filename} />
        ))}
      </TabPanels>
    </TabGroup>
  );
};

export default CourseGallery;

