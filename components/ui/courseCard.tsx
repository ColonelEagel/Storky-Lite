import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { CourseData } from "@/interface/interface";
import { cn } from "@/lib/utils";
import { EllipsisVertical } from "lucide-react";
import CellAction from "./cell-action";

/**
 * CourseCard component
 *
 * @param {CourseData} props component props
 * @param {string=} props.className additional CSS class names
 * @returns {JSX.Element} CourseCard component
 */

interface CourseCardProps  {
    course : CourseData
    className?: string;
}

function CourseCard({course , className}: CourseCardProps): JSX.Element {
    return (
        <Card className={cn("bg-[url('/palestineLand.svg'),url('/palestineflag.svg')] bg-no-repeat bg-contain relative ", className)} style={{ backgroundPosition: "center bottom, right" }}>
            <CardHeader>
                <CardTitle>{course.title}</CardTitle>
                <CardDescription>{course.description}</CardDescription>
                <CellAction data={course} className="hover:cursor-pointer  absolute right-[5px] top-2"/>
                
            </CardHeader>
        </Card>
    );
}

export default CourseCard;

