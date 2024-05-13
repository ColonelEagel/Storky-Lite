"use client";
import { Plus, Trash } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

import Heading from "@/components/ui/heading";

import { dummyCourses } from "@/data/data";
import { useRouter } from "next/navigation";
import NoResults from "@/components/ui/no-results";
import CourseGallery from "@/components/gallery";

function SingleCourse({ params }: { params: { courseId: string } }) {
  const router = useRouter();
  const course = dummyCourses.find((course) => course.id === params.courseId);
const isAdmin = true;
  return (
    <>
      {course ? (
        <div className="min-h-screen">
          <div className="flex items-center justify-between mt-10 p-4">
            <Heading title={course.title} description={course.description} />
           {isAdmin && <Button
              onClick={() =>
                router.push(`/courses/${params.courseId}/editSession/new`)
              }
            >
              <Plus className="mr-2 h-4 w-4" />
              Add New Session
            </Button>}
          </div>
          <Separator className="my-4" />
          <CourseGallery />
        </div>
      ) : (
        <NoResults />
      )}
    </>
  );
}

export default SingleCourse;
