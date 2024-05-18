"use client";
import * as z from "zod";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { Trash } from "lucide-react";
import { toast } from "react-hot-toast";

import Heading from "@/components/ui/heading";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { AlertModal } from "@/components/modals/alert-modal";
import { CourseData } from "@/types/interface";
import usePostRequest from "@/app/actions/usePostRequest ";
import axios from "axios";
import { useSession } from "next-auth/react";

const formSchema = z.object({
  name: z.string().min(1, { message: "Title is required" }),
  description: z.string(),
  // Add more fields as needed
});

type CourseFormValue = z.infer<typeof formSchema>;

interface CourseFormProps {
  initialData?: CourseData;
}

export const CourseForm: React.FC<CourseFormProps> = ({ initialData }) => {
  const [open, setOpen] = useState(false);

  const router = useRouter();
  //   const [loading, setLoading] = useState(false);
  //   const { data: session } = useSession();
  const { postData, loading } = usePostRequest();

  const title = initialData ? "Edit the course" : "Create a course";
  const description = initialData ? "Edit the course" : "Add a new course";
  const toastMessage = initialData
    ? "Course has been updated"
    : "Course has been created";
  const action = initialData ? "Save changes" : "Create";

  const form = useForm<CourseFormValue>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      name: "",
      description: "",
      // Initialize more fields here
    },
  });
  const onSubmit = async (data: CourseFormValue) => {
    // setLoading(true);
    // try {
    //   await axios
    //     .post("", data, {
    //       headers: {
    //         Authorization: `Bearer ${session?.user.token}`,
    //       },
    //     })
    //     .then((response) => {
    //       console.log("response", response);
    //     });

    //   setLoading(false);
    //   toast.success(toastMessage);
    // } catch (error) {
    //   setLoading(false);

    //   toast("Oops! Something went wrong. Please try again later.");

    //   throw error;
    // } finally {
    //   setLoading(false);
    // }
    try {
      await postData({
        url: `courses`,
        data: data,
        onSuccess: () => {
          toast.success(toastMessage);
          router.push("/courses");
        },
      });
    } catch (error) {
      toast.error("Oops! Something went wrong. Please try again later.");
    }
  };

  const onDelete = async () => {
    try {
      // Implement your API call here to delete the course
      // Example: await axios.delete(`/api/courses/${initialData.id}`);

      console.log(`${initialData?.name} Course has been deleted successfully.`);
      toast.success(
        `${initialData?.name} Course has been deleted successfully.`
      );
      // router.push("/courses"); // Redirect to the courses page after deletion
    } catch (error) {
      console.error("Error:", error);
      toast.error("Make sure you remove all course dependencies first");
    } finally {
      setOpen(false);
    }
  };

  return (
    <div className="w-4/6 h-fit mt-10 mx-auto">
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onDelete}
        loading={loading}
      />
      <div className="flex items-center justify-between">
        <Heading title={title} description={description} />
        {initialData && (
          <Button
            variant="destructive"
            size="icon"
            disabled={loading}
            onClick={() => setOpen(true)}
          >
            <Trash className="h-4 w-4" />
          </Button>
        )}
      </div>
      <Separator className="my-4" />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 w-full"
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input
                    autoFocus
                    disabled={loading}
                    placeholder="Course title"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea
                    disabled={loading}
                    rows={4}
                    maxLength={200}
                    placeholder="Course description"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* Add more form fields as needed */}
          <Button disabled={loading} className="ml-auto" type="submit">
            {action}
          </Button>
        </form>
      </Form>
    </div>
  );
};