"use client";

// Import the zod library for defining schemas
import * as z from "zod";

// Import the axios library for making HTTP requests
import axios from "axios";

// Import the useState hook from React for managing component state
import { useState } from "react";

// Import the zodResolver from react-hook-form for resolving zod schemas
import { zodResolver } from "@hookform/resolvers/zod";

// Import the useForm hook from react-hook-form for managing form state
import { useForm } from "react-hook-form";

// Import the useParams hook from next/navigation for accessing URL parameters
import { useParams } from "next/navigation";

// Import the Trash component from the lucide-react library for rendering an icon
import { Trash } from "lucide-react";

// Import the toast library for displaying notifications
import { toast } from "react-hot-toast";

// Import the UI components
import Heading from "@/components/ui/heading"; // Heading component for displaying titles and descriptions
import { Button } from "@/components/ui/button"; // Button component for rendering interactive elements
import { Separator } from "@/components/ui/separator"; // Separator component for visually separating content
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"; // Form components for rendering form fields and labels
import { Input } from "@/components/ui/input"; // Input component for rendering form input fields

// Import the custom hook for making HTTP POST requests
import usePostRequest from "@/actions/usePostRequest";

/**
 * Component for rendering a form for inviting a student to a course.
 * 
 * This component defines the form schema for validating the form data.
 * It also imports the required UI components and hooks for managing form state and displaying notifications.
 * 
 * @returns The rendered form component.
 */

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
