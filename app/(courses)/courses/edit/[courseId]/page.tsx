import { CourseForm } from "../../components/courseForm";
import { courses } from "@/data/data";

function EditCourse({ params }: { params: { courseId: string } }) {
  console.log(params);
  const course = courses.find((course) => course.id === params.courseId);
  return (
    <div className="min-h-screen">
      {course?<CourseForm initialData={course} /> : <p>Course not found</p>}
    </div>
  );
}

export default EditCourse;
