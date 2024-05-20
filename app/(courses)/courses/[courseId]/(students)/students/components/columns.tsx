"use client";

import CellAction from "@/components/ui/cell-action";
import { ColumnDef } from "@tanstack/react-table";


// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type StudentColumn = {
  id: string;
  name: string;
  email: string;
};

export const columns: ColumnDef<StudentColumn>[] = [
  {
    accessorKey: "id",
    header: "Id",
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "email",
    header: "e-mail",
    cell: ({ row }) => row.original.email,
  },
  {
    id: "action",
    cell: ({ row }) => <CellAction id={row.original.id} type={row.original.name} key={row.original.id} onDelete={function (): void {
      throw new Error("Function not implemented yet.");
    } } loading={false} />,
  },
];
