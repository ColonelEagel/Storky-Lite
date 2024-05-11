"use client";
import { useEffect, useState } from "react";

import { TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";

import GalleryTab from "./gallery-tab";
import { useParams } from "next/navigation";
import RenderLessonContent from "./renderLessonContent ";
import { contentData, sessions } from "@/data/data";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const CourseGallery = () => {
  const courseId = useParams().courseId;
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
  return (
    <TabGroup as="div" className="flex justify-between flex-col-reverse md:flex-row">
      <div className="mx-auto mt-6 hidden w-full max-w-2xl sm:block lg:max-w-none p-14">
          <TabList className="flex flex-col gap-6">
        <Accordion type="single" collapsible >
            {sessionsData?.map((session,index) => {
              return (
                <>
             
                  <AccordionItem value={`item-${index+1}`} >
                    <AccordionTrigger>{session.title}</AccordionTrigger>
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
          <GalleryTab key={content.id} url={content.url} />
        ))}
      </TabPanels>
    </TabGroup>
  );
};

export default CourseGallery;
