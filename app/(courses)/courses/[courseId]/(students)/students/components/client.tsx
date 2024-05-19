"use client";

import { useParams, useRouter } from "next/navigation";

import Heading from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

import { StudentColumn, columns } from "./columns";
import { DataTable } from "@/components/ui/data-table";

interface StudentClientProps {
  data: StudentColumn[];
}

const StudentClient: React.FC<StudentClientProps> = ({ data }) => {
  const params = useParams();
  const router = useRouter();

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title={`Categories (${data.length})`}
          description="Manage Categories for your store"
        />
        <Button onClick={() => router.push(`/${params.storeId}/students/new`)}>
          <Plus className="mr-2 h-4 w-4" />
          Add New
        </Button>
      </div>
      <Separator />
      <DataTable searchKey="name" columns={columns} data={data} />
      <Separator />
    </>
  );
};

export default StudentClient;
