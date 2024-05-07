// dummy courses data
import CourseCard from "@/components/ui/courseCard";
import { courses } from "@/data/data";

function CoursesPage() {
  return (
    <div className="min-h-screen  p-4">
      {/* add course button */}

      {/* courses container */}
      <div className="flex flex-wrap justify-start gap-5 items-center ">
        {/* SINGLE  course  */}
        {courses.map((course) => (
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
