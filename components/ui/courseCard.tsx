"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CourseData, Session } from "@/types/interface";
import { cn } from "@/lib/utils";
import CellAction from "./cell-action";
import Link from "next/link";
import { useRouter } from "next/navigation";
import useDeleteRequest from "@/actions/useDeleteRequest";
import toast from "react-hot-toast";

/**
 * CourseCard component
 *
 * @param {CourseData} props component props
 * @param {string=} props.className additional CSS class names
 * @returns {JSX.Element} CourseCard component
 */

interface CourseCardProps {
  course: CourseData | Session;
  className?: string;
}

function CourseCard({ course, className }: CourseCardProps): JSX.Element {
  const router = useRouter();
  const handleUpdate = () => {
    router.push(`/courses/editcourse/${course.id}`);
  };
  const { deleteData, isLoading } = useDeleteRequest();
  const handleDelete = () => {
    deleteData({
      url: `courses/${course.id}`,
      onSuccess: () => {
        toast.success("Course deleted successfully");
        router.push("/courses");
      },
      onError: (error: any) => {
        toast.error(
          "something went wrong Error deleting course please try again"
        );
        console.log("error", error);
      },
    });
  };
  return (
    <Card
      className={cn(
        "bg-[url('/palestineLand.svg'),url('/palestineflag.svg')] bg-no-repeat bg-contain relative shadow-md hover:shadow-2xl transition-shadow delay-75",
        className
      )}
      style={{ backgroundPosition: "center bottom, right" }}
    >
      <CardHeader>
        <Link href={`/courses/${course.id}`}>
          <CardTitle>{course.name}</CardTitle>
        </Link>
        <CardDescription>{course.description}</CardDescription>
        <CellAction
          id={course.id}
          className="hover:cursor-pointer  absolute right-[5px] top-2 dark:text-slate-900 "
          type="course"
          onUpdate={handleUpdate}
          onDelete={handleDelete}
          loading={isLoading}
        />
      </CardHeader>
    </Card>
  );
}

export default CourseCard;
