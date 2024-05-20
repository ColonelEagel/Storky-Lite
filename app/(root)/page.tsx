"use client";

import { BookText, CircleUser, Presentation, School } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Heading from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";

import useGetCourses from "../../actions/useGetCourses";
import Loading from "./loading";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import useGetSessions from "@/actions/useGetSessions";
import { SetStateAction, useEffect, useState } from "react";
import { CourseData, Session } from "@/types/interface";
import useGetRequest from "@/actions/useGetRequest";
import GetAllSessions from "@/actions/useGetAllSessions";
import useGetAllStudents from "@/actions/useGetAllStudents";
import useGetAllContent from "@/actions/getAllContents";

/**
 * HomePage component displays an overview of the user's courses
 * It fetches the total number of courses and sessions
 * It also displays the total number of lessons and students (if the user is an admin)
 */
const HomePage = () => {
  const { students: studentsData, isLoading: studentsLoading } =
    useGetAllStudents();
  const { courses, isLoading: isCourseLoading } = useGetCourses();
  const sessions = GetAllSessions({ courses });
  const { content, isLoading: contentLoading } = useGetAllContent();

  const { data: session, status } = useSession();
  const isAdmin = session?.user.user.role === "instructor";
  useEffect(() => {
    console.log("Status:", status);
    console.log("Session:", session);
    console.log("Students:", studentsData);
    console.log("Is Loading:", studentsLoading);
  }, [status, session, studentsLoading, studentsData]);
  if (
    isCourseLoading ||
    studentsLoading ||
    contentLoading ||
    status === "loading"
  ) {
    return <Loading />;
  }
  const TotalCourses = courses.length;
  const totalSessions = sessions.length;
  const totalStudents = studentsData.length;
  const totalLessons = content.length;

  return (
    <div className="flex-col min-h-screen">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <Heading
          title={`Welcome back, ${session?.user.user.name}!`}
          description="Here's an Overview of your courses"
        />
        <Separator />
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
          {/* Display the total number of courses */}
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
          {/* Display the total number of sessions */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                total Sessions
              </CardTitle>
              <Presentation className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalSessions}</div>
            </CardContent>
          </Card>
          {/* Display the number of lessons */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">lessons</CardTitle>
              <BookText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalLessons}</div>
            </CardContent>
          </Card>
          {/* Display the number of students (only for admin) */}
          {isAdmin && (
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">students</CardTitle>
                <CircleUser className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{totalStudents}</div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
