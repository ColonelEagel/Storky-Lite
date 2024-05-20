"use client";
import { BookText, CircleUser, Presentation, School } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Heading from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";

import GetCourses from "../../actions/getCourses";
import Loading from "./loading";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

const DashboardPage = () => {
  const { courses, isLoading } = GetCourses();
  const { data: session } = useSession();
  const isAdmin =session?.user.user.role === "instructor";


  const TotalCourses = courses.length;
  const totalSessions = 5;
  const lessons = 5;
  const students = 5;

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="flex-col min-h-screen">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <Heading
          title="Welcome back"
          description="Here's an Overview of your courses"
        />
        <Separator />
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total courses
              </CardTitle>
              <School className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{TotalCourses}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                total Sessions
              </CardTitle>
              <Presentation className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold"> {totalSessions}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">lessons</CardTitle>
              <BookText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{lessons}</div>
            </CardContent>
          </Card>
        {isAdmin&&  <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">students</CardTitle>
              <CircleUser className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{students}</div>
            </CardContent>
          </Card>}
        </div>
      </div>
    </div>
  );
};
export default DashboardPage;
