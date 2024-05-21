"use client";
import * as z from "zod"; // Importing the Zod library for schema validation
import { useState } from "react"; // Importing the useState hook from React
import { zodResolver } from "@hookform/resolvers/zod"; // Importing the zodResolver from react-hook-form
import { useForm } from "react-hook-form"; // Importing the useForm hook from react-hook-form
import { useRouter } from "next/navigation"; // Importing the useRouter hook from Next.js
import { Trash } from "lucide-react"; // Importing the Trash icon from lucide-react
import { toast } from "react-hot-toast"; // Importing the toast function from react-hot-toast

/**
 * UI components
 */
import Heading from "@/components/ui/heading"; // Importing the Heading component
import { Button } from "@/components/ui/button"; // Importing the Button component
import { Separator } from "@/components/ui/separator"; // Importing the Separator component
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"; // Importing the form components
import { Input } from "@/components/ui/input"; // Importing the Input component
import { Textarea } from "@/components/ui/textarea"; // Importing the Textarea component
import { AlertModal } from "@/components/modals/alert-modal"; // Importing the AlertModal component

/**
 * Types
 */
import { CourseData } from "@/types/interface"; // Importing the CourseData interface

/**
 * Custom hooks
 */
import usePostRequest from "@/actions/usePostRequest"; // Importing the usePostRequest custom hook
import useDeleteRequest from "@/actions/useDeleteRequest"; // Importing the useDeleteRequest custom hook
import usePutRequest from "@/actions/usePutRequest"; // Importing the usePutRequest custom hook

/**
 * The form schema for course data.
 * The form data must contain a title and description.
 */
const formSchema = z.object({
  name: z.string().min(1, { message: "Title is required" }),
  description: z.string(),
  // Add more fields as needed
});

/**
 * The type representing the form data for a course.
 */
type CourseFormValue = z.infer<typeof formSchema>;

/**
 * The props for the CourseForm component.
 */
interface CourseFormProps {
  /**
   * The initial data for the form.
   */
  initialData?: CourseData;
}

/**
 * The form component for creating or editing a course.
 */
export const CourseForm: React.FC<CourseFormProps> = ({ initialData }) => {
  // State for the modal
  const [open, setOpen] = useState(false);

  const router = useRouter();
  const { postData, loading } = usePostRequest();
  const { putData } = usePutRequest();
  const { deleteData } = useDeleteRequest();

  // Titles and messages for the form
  const title = initialData ? "Edit the course" : "Create a course";
  const description = initialData ? "Edit the course" : "Add a new course";
  const toastMessage = initialData
    ? "Course has been updated"
    : "Course has been created";
  const action = initialData ? "Save changes" : "Create";

  // Form hook
  const form = useForm<CourseFormValue>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      name: "",
      description: "",
      // Initialize more fields here
    },
  });

  /**
   * Handles the form submission.
   * Sends a POST request to create a new course or a PATCH request to update an existing course.
   * @param data - The form data containing the course title and description.
   */
  const onSubmit = async (data: CourseFormValue) => {
    try {
      if (initialData) {
        await putData({
          url: `courses/${initialData?.id}`,
          data: data,
          onSuccess: () => {
            toast.success(toastMessage);
            router.push("/courses");
          },
        });
      } else {
        await postData({
          url: `courses`,
          data: data,
          onSuccess: () => {
            toast.success(toastMessage);
            router.push("/courses");
          },
        });
      }
    } catch (error) {
      toast.error("Oops! Something went wrong. Please try again later.");
    }
  };

  /**
   * Handles the delete action.
   * Sends a DELETE request to delete the course.
   */
  const onDelete = async () => {
    deleteData({
      url: `courses/${initialData?.id}`,
      onSuccess: () => {
        toast.success("Course has been deleted successfully");
        router.push(`/courses`);
      },
      onError: (error: any) => {
        toast.error(
          "something went wrong Error deleting course please try again"
        );
        console.log("error", error);
      },
    });
  };

  return (
    <div className="w-4/6 h-fit mt-10 mx-auto">
      {/* Modal for confirming delete action */}
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onDelete}
        loading={loading}
      />
      {/* Heading with delete button */}
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
      {/* Form */}
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 w-full"
        >
          {/* Title input */}
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
          {/* Description input */}
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
          {/* Submit button */}
          <Button disabled={loading} className="ml-auto" type="submit">
            {action}
          </Button>
        </form>
      </Form>
    </div>
  );
};
