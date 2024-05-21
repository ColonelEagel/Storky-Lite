import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./card";
import { BookText } from "lucide-react";

interface HomeCardProps {
  title: string;
  description: number;
  icon: React.ReactNode
}
export default function HomeCard({ title, description,icon }: HomeCardProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{description}</div>
      </CardContent>
    </Card>
  );
}
