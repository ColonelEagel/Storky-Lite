// dummy courses data

import CourseCard from "@/components/ui/courseCard";
import Heading from "@/components/ui/heading";
import Redirect from "@/components/ui/redirect";
import { dummyCourses } from "@/data/data";
import { Plus } from "lucide-react";

function CoursesPage({ params }: { params: { courseId: string } }) {
  const isAdmin = true;
  return (
    <div className="min-h-screen  p-4">
      <div className="flex items-center justify-between mt-10 p-4">
        <Heading title="Courses" description="All of your courses" />
        {isAdmin && (
          <Redirect url="/courses/edit/new" className="black">
            <Plus className="mr-2 h-4 w-4 " />
            Add New Course
          </Redirect>
        )}
      </div>
      {/* courses container */}
      <div className="flex flex-wrap justify-start gap-5 items-center ">
        {/* SINGLE  course  */}
        {dummyCourses.map((course) => (
          <CourseCard
            key={course.id}
            course={course}
            className="w-full md:w-[45%] lg:w-[400px] "
          />
        ))}
      </div>
    </div>
  );
}

export default CoursesPage;
