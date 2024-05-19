"use client";

import * as z from "zod";
import axios from "axios";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useParams, useRouter } from "next/navigation";

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
import usePostRequest from "@/actions/usePostRequest ";

/**
 * Defines the schema for the form data.
 * The form data must contain a valid email address for the student.
 */
const formSchema = z.object({
  studentEmail: z.string().email({ message: "Invalid email address." }),
});

/**
 * Represents the shape of the form data.
 */
type StudentFormValue = z.infer<typeof formSchema>;

/**
 * Renders a form for inviting a student to a course.
 */
const StudentForm = () => {
  // Get the course ID from the URL parameters
  const params = useParams();
  // Get the router object
  const router = useRouter();

  // Define the form variables
  const title = "invite student";
  const description = "invite new student to this course";
  const toastMessage = "student has been invited successfully";
  const action = "invite";

  // Get the loading state and the postData function from the usePostRequest hook
  const { loading, postData } = usePostRequest();

  // Initialize the form using react-hook-form
  const form = useForm<StudentFormValue>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      //   name: "",
      studentEmail: "",
    },
  });

  /**
   * Handles the form submission.
   * Sends a POST request to the server to add the student to the course.
   * Redirects to the students page after successful invitation.
   * @param formdata - The form data containing the student's email address.
   */
  const onSubmit = async (formdata: StudentFormValue) => {
    const data = {
      addedCourseId: params.courseId,
      ...formdata,
    };
    try {
      // Send the POST request to the server
      await postData({
        url: `user`,
        data,
        onSuccess() {
          // Refresh the page and redirect to the students page
          //   router.refresh();
          //   router.push(`/courses/${params.courseId}/students`);
          // Show a success toast message
          toast.success(toastMessage);
        },
      });
    } catch (error) {
      // Show an error toast message
      toast.error("something went wrong");
    }
  };

  // Render the form
  return (
    <>
      <div className=" flex items-center justify-between">
        {/* Render the heading component */}
        <Heading title={title} description={description} />
      </div>
      <Separator className="my-4" />
      {/* Render the form component */}
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 w-full"
        >
          {/* Render the form field for the student's email */}
          <FormField
            control={form.control}
            name="studentEmail"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Student Email</FormLabel>
                <FormControl>
                  <Input
                    disabled={loading}
                    placeholder="student-email@example.com"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Render the submit button */}
          <Button disabled={loading} className="ml-auto" type="submit">
            {action}
          </Button>
        </form>
      </Form>
    </>
  );
};

export default StudentForm;
