import NoResults from "@/components/ui/no-results";
import { CourseForm } from "../components/courseForm";
import { dummyCourses } from "@/data/data";

function EditCourse({ params }: { params: { courseId: string } }) {
  if (params.courseId === "new") {
    return (
      <div className="min-h-screen">
        <CourseForm />
      </div>
    );
  } else {
    const course = dummyCourses.find((course) => course.id === params.courseId);
    return (
      <div className="min-h-screen">
        {course ? <CourseForm initialData={course} /> : <NoResults />}
      </div>
    );
  }
}

export default EditCourse;
