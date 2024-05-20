"use client";
import { useRouter } from "next/navigation";
import StudentForm from "./components/student-form";
import { useSession } from "next-auth/react";
import { Loader } from "@/components/ui/loader";

const CategoryPage = () => {
  const router = useRouter();
  const { data: session, status } = useSession();

  if (status === "loading") return <Loader />;

  return (
    <div className=" min-h-screen p-5">
      <StudentForm />
    </div>
  );
};

export default CategoryPage;
