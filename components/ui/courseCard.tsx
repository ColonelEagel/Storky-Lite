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
import { EllipsisVertical } from "lucide-react";
import CellAction from "./cell-action";
import Link from "next/link";
import { redirect, useParams, useRouter } from "next/navigation";

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
          className="hover:cursor-pointer  absolute right-[5px] top-2"
          type="course"
          onUpdate={handleUpdate}
        />
      </CardHeader>
    </Card>
  );
}

export default CourseCard;
