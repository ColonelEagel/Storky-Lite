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


  const handelUpdate = (sessionId: string) => {
    router.push(`/courses/${courseId}/editSession/${sessionId}`)
  };

  return (
    <TabGroup
      as="div"
      className="flex justify-between flex-col-reverse md:flex-row"
    >
      <div className="mx-auto mt-6 hidden w-full max-w-2xl sm:block lg:max-w-none p-14">
        <TabList className="flex flex-col gap-6">
          <Accordion type="single" collapsible>
            {sessionsData?.map((session, index) => {
              return (
                <>
                  <AccordionItem value={`item-${index + 1}`} key={session.id} className="relative">
                    <CellAction onUpdate={() => handelUpdate(session.id)} type="session" id={session.id} className="hover:cursor-pointer absolute right-[10px] top-3">
                      <DropdownMenuItem onClick={() => handelUpdate(session.id)}><Plus className="mr-2 h-4 w-4" />Add content</DropdownMenuItem>
                    </CellAction>
                    <AccordionTrigger>
                      <div className="flex justify-between items-center w-full">
                        <p className="">{session.title}</p>
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
      <TabPanels className="aspect-square h-96 w-10/12 relative  border-s-4">
        {contentData?.map((content) => (
          <GalleryTab key={content.id} url={content.url.name} />
        ))}
      </TabPanels>
    </TabGroup>
  );
};

export default CourseGallery;

