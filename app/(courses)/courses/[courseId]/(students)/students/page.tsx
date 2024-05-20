"use client";
import useGetRequest from "@/actions/useGetRequest";
import StudentClient from "./components/client";
import { StudentColumn } from "./components/columns";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import toast from "react-hot-toast";
import Loading from "./loading";
import { useRouter } from "next/navigation";
import useGetAllStudents from "@/actions/useGetAllStudents";
import { Loader } from "@/components/ui/loader";

const StudentsPage = () => {
  const { students, isLoading } = useGetAllStudents();

  if (isLoading) return <Loader/>;
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
