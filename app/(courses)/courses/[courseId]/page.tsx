"use client";
import { Plus, Trash } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

import Heading from "@/components/ui/heading";

import { courses } from "@/data/data";
import { useRouter } from "next/navigation";

function SingleCourse({ params }: { params: { courseId: string } }) {
  const router = useRouter();
  const course = courses.find((course) => course.id === params.courseId);

  return (
    <>
      {/* header (title) + add session + edit session + add lesson  + edit course + invite student  */}
      {course ? (
        <div className="min-h-screen">
          <div className="flex items-center justify-between mt-10 p-4">
            <Heading title={course.title} description={course.description} />

            <Button
              onClick={() => router.push(`/${params.courseId}/sessions/new`)}
            >
              <Plus className="mr-2 h-4 w-4" />
              Add New Session
            </Button>
          </div>
          <Separator className="my-4" />
          {/* course content */}
          {/* Media content */}

          {/* sessions */}
          {/* lessons  */}
        </div>
      ) : (
        <p>Course not found</p>
      )}
    </>
  );
}

export default SingleCourse;
