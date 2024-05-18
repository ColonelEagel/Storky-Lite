"use client";
import { BookText, CircleUser, Presentation, School } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Heading from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import useGetRequest from "../actions/useGetRequest";
import toast from "react-hot-toast";
import { useState } from "react";
import { useSession } from "next-auth/react";

// import { formatter } from "@/lib/utils";
// import { getTotalRevenue } from "@/actions/get-total-revenue";
// import { getSalesCount } from "@/actions/get-sales-count";
// import { getStockCount } from "@/actions/get-stock-count";
// import Overview from "@/components/overview";
// import { getGraphRevenue } from "@/actions/get-grapgh-revenue";

// interface DashboardPageProps { params: { storeId: string } }

const DashboardPage = () => {
  // const totalRevenue = await getTotalRevenue(params.storeId)
  // const salesCount = await getSalesCount(params.storeId)
  // const stockCount = await getStockCount(params.storeId)
  // const graphRevenue = await getGraphRevenue(params.storeId)
  const { fetchData, loading } = useGetRequest();
  // const { data: sessions, status } = useSession();
  const [courseData, setCourseData] = useState([]);

  const getData = async () => {
    try {
      await fetchData({
        url: `/courses`,

        onSuccess: (data: any) => {
          setCourseData(data);
        },
        onError: () => {
          toast.error("Oops! Something went wrong. Please try again later.");
        },
      });
    } catch (error) {
      toast.error("Oops! Something went wrong. Please try again later.");
    }
  };
  console.log(courseData);
  const TotalCourses = 5;
  const totalSessions = 5;
  const lessons = 5;
  const students = 5;

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
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">students</CardTitle>
              <CircleUser className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{students}</div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
export default DashboardPage;
