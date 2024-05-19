"use client";

import { ColumnDef } from "@tanstack/react-table";
import CellAction from "./cell-action";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type StudentColumn = {
  id: string;
  name: string;
  email: string;
};

export const columns: ColumnDef<StudentColumn>[] = [
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
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
