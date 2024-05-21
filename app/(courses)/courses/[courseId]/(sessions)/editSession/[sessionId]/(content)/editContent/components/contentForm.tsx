"use client";
import * as z from "zod"; // Importing the Zod library
import { useState } from "react"; // Importing the useState hook from React
import { zodResolver } from "@hookform/resolvers/zod"; // Importing the zodResolver from react-hook-form
import { useForm } from "react-hook-form"; // Importing the useForm hook from react-hook-form
import { useParams, useRouter } from "next/navigation"; // Importing the useParams and useRouter hooks from Next.js
import { Trash } from "lucide-react"; // Importing the Trash icon from lucide-react
import { toast } from "react-hot-toast"; // Importing the toast function from react-hot-toast

// Importing UI components
import Heading from "@/components/ui/heading"; // Importing the Heading component
import { Button } from "@/components/ui/button"; // Importing the Button component
import { Separator } from "@/components/ui/separator"; // Importing the Separator component
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"; // Importing the form components
import { Input } from "@/components/ui/input"; // Importing the Input component
import { Textarea } from "@/components/ui/textarea"; // Importing the Textarea component
import { AlertModal } from "@/components/modals/alert-modal"; // Importing the AlertModal component

// Importing types
import { Content } from "@/types/interface"; // Importing the Content type

// Importing custom hooks
import usePostRequest from "@/actions/usePostRequest"; // Importing the usePostRequest custom hook
import usePutRequest from "@/actions/usePutRequest"; // Importing the usePutRequest custom hook
import useDeleteRequest from "@/actions/useDeleteRequest"; // Importing the useDeleteRequest custom hook


/**
 * This file contains the ContentForm component which is responsible for creating and editing content.
 * It uses various React hooks and UI components from the project to build the form.
 * The form data is validated using the Zod library and the form is handled using the react-hook-form library.
 * The form submits the data to the server using the usePostRequest and usePutRequest custom hooks.
 * The form also deletes the content using the useDeleteRequest custom hook.
 * The form also shows a confirmation modal before deleting the content.
 * The form also shows success and error messages using the react-hot-toast library.
 */

/**
 * Schema definition for the form data.
 */
const formSchema = z.object({
  filename: z
    .instanceof(File)
    .refine(
      (file) =>
        file.type.startsWith("image/") ||
        file.type.startsWith("video/") ||
        file.type == "application/pdf",
      { message: "Only images, videos and pdf files are allowed" }
    ),
  name: z.string().min(1, { message: "Name is required" }),
});

/**
 * Type definition for the form data.
 */
type ContentFormValue = z.infer<typeof formSchema>;

/**
 * Props for the ContentForm component.
 */
interface ContentFormProps {
  initialData?: Content;
}

/**
 * ContentForm component for creating or editing a content.
 */
export const ContentForm: React.FC<ContentFormProps> = ({ initialData }) => {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const { postData, loading } = usePostRequest();
  const { deleteData, isLoading: isDeleting } = useDeleteRequest();
  const { loading: patchLoading, putData } = usePutRequest();
  const { courseId, sessionId } = useParams();

  // Title and description for the form
  const title = initialData ? "Edit the content" : "Create a content";
  const description = initialData ? "Edit the content" : "Add a new content";
  const toastMessage = initialData
    ? "The Lesson has been updated"
    : "The Lesson has been created";
  const action = initialData ? "Save changes" : "Create";

  // Initialize the form with the initial data if provided
  const form = useForm<ContentFormValue>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData
      ? {
          filename:
            initialData.filename instanceof File
              ? initialData.filename
              : undefined,
          name: initialData.name,
        }
      : {
          filename: undefined,
          name: "",
        },
  });

  /**
   * Handles the form submission.
   * @param data - The form data.
   */
  const onSubmit = async (data: ContentFormValue) => {
    console.log(data);
    try {
      if (initialData) {
        await putData({
          url: `courses/${courseId}/sessions/${sessionId}/content/${initialData.id}`,
          data: data,
          onSuccess: () => {
            toast.success(toastMessage);
            router.push("/courses");
          },
        });
      } else {
        await postData({
          url: `courses/${courseId}/sessions/${sessionId}/content`,
          data: data,
          headers: {
            "Content-Type": "multipart/form-data",
          },
          onSuccess: () => {
            toast.success(toastMessage);
            router.push(`/courses/${courseId}`);
          },
        });
      }
    } catch (error) {
      toast.error("Oops! Something went wrong. Please try again later.");
    }
  };

  /**
   * Handles the delete action for the content.
   */
  const onDelete = async () => {
    try {
      await deleteData({
        url: `courses/${courseId}/sessions/${sessionId}/content/${initialData?.id}`,
        onSuccess: () => {
          toast.success("Content has been deleted successfully");
          router.push(`/courses`);
        },
        onError: (error: any) => {
          toast.error(
            "Something went wrong. Error deleting content. Please try again."
          );
          console.log("error", error);
        },
      });
    } catch (error) {
      console.error("Error:", error);
      toast.error("Make sure you remove all dependencies first");
    } finally {
      setOpen(false);
    }
  };

  return (
    <div className="w-4/6 h-fit mt-10 mx-auto">
      {/* Alert modal for deleting the content */}
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
      {/* Form for creating/editing the content */}
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 w-full"
        >
          {/* Form field for the content title */}
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
                    placeholder="Content title"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Form field for the content file */}
          <FormField
            control={form.control}
            name="filename"
            render={({ field: { value, onChange, ...fieldProps } }) => (
              <FormItem>
                <FormLabel>Content</FormLabel>
                <FormControl>
                  <Input
                    {...fieldProps}
                    placeholder="filename"
                    type="file"
                    accept="image/*, application/pdf"
                    onChange={(event) =>
                      onChange(event.target.files && event.target.files[0])
                    }
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* Add more form fields as needed */}
          <Button disabled={loading} className="ml-auto" type="submit">
            {loading ? "Uploading..." : action}
          </Button>
        </form>
      </Form>
    </div>
  );
};

