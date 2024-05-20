"use client";
import useGetRequest from "@/actions/useGetRequest";
import StudentClient from "./components/client";
import { StudentColumn } from "./components/columns";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import toast from "react-hot-toast";
import Loading from "./loading";
import { useRouter } from "next/navigation";

const StudentsPage = ({ params }: { params: { storeId: string } }) => {
  const { fetchData, isLoading } = useGetRequest();
  const [students, setStudents] = useState<StudentColumn[]>([]);
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === "authenticated" && session && session.user.token) {
      fetchData({
        url: `user`,
        onSuccess: (data) => setStudents(data as StudentColumn[]),
      }).catch((error) => {
        console.error("Failed to fetch Content:", error);
        toast.error("Failed to fetch Content. Please try again later.");
      });
    }
  }, [status, session, session?.user.token]);

  if (isLoading) return <Loading />;
  return (
    <>
      <div className="flex-col min-h-screen">
        <div className="flex-1 space-y-4 p-8 pt-6">
          <StudentClient data={students} />
        </div>
      </div>
    </>
  );
};

export default StudentsPage;
