"use client";
import { useEffect, useState } from "react";

import { TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";

import GalleryTab from "./gallery-tab";
import { useParams, useRouter } from "next/navigation";
import RenderLessonContent from "./renderLessonContent ";

import { Session } from "@/types/interface";

import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import CellAction from "../ui/cell-action";
import { Plus } from "lucide-react";
import useGetSessions from "@/actions/useGetSessions";

import ContentProvider from "@/provider/contentProvider";
import { useSession } from "next-auth/react";
import useDeleteRequest from "@/actions/useDeleteRequest";
import toast from "react-hot-toast";
import { Loader } from "../ui/loader";
import NoResults from "../ui/no-results";

const CourseGallery = () => {
  const { courseId } = useParams();
  const courseIdString = courseId.toString();
  const router = useRouter();
  const { sessions, isLoading } = useGetSessions(courseIdString);
  const { data: session } = useSession();
  const { deleteData, isLoading: isDeleting } = useDeleteRequest();

  const isAdmin = session?.user.user.role === "instructor";

  console.log("sessions", sessions);
  const courseIdNumber = Number(courseId);
  const sessionsData: Session[] = sessions?.filter(
    (session) => +session?.courseId === courseIdNumber
  );

  // console.log("sessionsData", typeof sessions[0].id);
  console.log("courseIdNumber", typeof courseIdNumber);
  console.log("sessionsData", sessionsData);

  // const contentData = sessionsData.map((session) => {
  //   const { content, isLoading } = GetContent({ courseId, sessionId: session.id });
  //   return {
  //     session,
  //     content,
  //     isLoading,
  //   };
  // });
  if (isLoading) return <Loader />;
  const handleDelete = (sessionId: string) => {
    deleteData({
      url: `courses/${courseId}/sessions/${sessionId}`,
      onSuccess: () => {
        toast.success("Course deleted successfully");
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

  const handelSessionUpdate = (sessionId: string) => {
    router.push(`/courses/${courseId}/editSession/${sessionId}`);
  };
  const handelContentUpdate = (sessionId: string) => {
    router.push(
      `/courses/${courseId}/editSession/${sessionId}/editContent/new`
    );
  };

  return (
    <>
      {sessions ? (
        <TabGroup
          as="div"
          className="flex gap-4 items-center justify-center flex-col-reverse md:flex-row p-14"
        >
          <div className="mx-auto mt-6  min-w-[250px] max-w-2xl sm:block  md:p-14 flex-1">
            <TabList className="flex flex-col gap-6 ">
              <Accordion type="single" collapsible>
                {sessionsData &&
                  sessionsData?.map((session, index) => {
                    return (
                      <>
                        <AccordionItem
                          value={`item-${index + 1}`}
                          key={session.id}
                          className="relative"
                        >
                          {isAdmin && (
                            <CellAction
                              onUpdate={() => handelSessionUpdate(session.id)}
                              onDelete={() => handleDelete(session.id)}
                              loading={isDeleting}
                              type="session"
                              id={session.id}
                              className="hover:cursor-pointer absolute right-[10px] top-3"
                            >
                              <DropdownMenuItem
                                onClick={() => handelContentUpdate(session.id)}
                              >
                                <Plus className="mr-2 h-4 w-4" />
                                Add content
                              </DropdownMenuItem>
                            </CellAction>
                          )}
                          <AccordionTrigger>
                            <div className="flex justify-between items-center w-full">
                              <p className="">{session.name}</p>
                            </div>
                          </AccordionTrigger>
                          <RenderLessonContent
                            sessionId={session.id}
                            courseId={courseIdString}
                          />
                        </AccordionItem>
                      </>
                    );
                  })}
              </Accordion>
            </TabList>
          </div>
          <TabPanels className="aspect-square h-96  relative  border-s-4  flex-1 max-w-2xl">
            {sessionsData?.map((content) => (
              <ContentProvider
                key={content.id}
                courseId={courseIdString}
                sessionId={content.id}
              />
            ))}
          </TabPanels>
        </TabGroup>
      ) : (
        <NoResults />
      )}
    </>
  );
};

export default CourseGallery;
