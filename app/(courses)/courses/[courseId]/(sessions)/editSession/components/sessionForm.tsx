"use client";
import * as z from "zod"; // Importing the Zod library for defining form schemas
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

// Importing types
import { Session } from "@/types/interface"; // Importing the Session type

// Importing custom hooks
import usePostRequest from "@/actions/usePostRequest"; // Importing the usePostRequest custom hook
import useDeleteRequest from "@/actions/useDeleteRequest"; // Importing the useDeleteRequest custom hook
import usePutRequest from "@/actions/usePutRequest"; // Importing the usePutRequest custom hook

/**
 * This file contains the import statements for the SessionForm component.
 * The SessionForm component is responsible for creating and editing sessions.
 * It uses various React hooks and UI components from the project to build the form.
 * The form data is validated using the Zod library and the form is handled using the react-hook-form library.
 * The form submits the data to the server using the usePostRequest and usePutRequest custom hooks.
 * The form also deletes the session using the useDeleteRequest custom hook.
 * The form also shows a confirmation modal before deleting the session.
 * The form also shows success and error messages using the react-hot-toast library.
 */

/**
 * Schema definition for the form data.
 * Each field is validated using Zod and the error message is customized.
 * The duration field is preprocessed to convert the string value to a number.
 */
const formSchema = z.object({
  name: z.string().min(1, { message: "Title is required" }),
  description: z.string(),
  duration: z.coerce
    .number()
    .min(1, { message: "Duration is required" })
    .max(10, { message: "Duration should not exceed 10 hours" }),
  // Add more fields as needed
});

/**
 * Type inference for the form data based on the form schema.
 */
type SessionFormValue = z.infer<typeof formSchema>;

/**
 * Interface for the SessionForm component props.
 * The initialData prop is optional and allows the form to be used for both creating and editing sessions.
 */
interface SessionFormProps {
  initialData?: Session;
}
export const SessionForm: React.FC<SessionFormProps> = ({ initialData }) => {
  // State for the confirmation modal
  const [open, setOpen] = useState(false);
  // Router for navigation
  const router = useRouter();
  // Hook for making POST requests
  const { postData, loading } = usePostRequest();
  // Hook for making DELETE requests
  const { deleteData, isLoading: isDeleting } = useDeleteRequest();
  // Hook for making PUT requests
  const { loading: patchLoading, putData } = usePutRequest();

  // Get the courseId from the URL parameters
  const { courseId } = useParams();

  // Title and description for the form
  const name = initialData ? "Edit the session" : "Create a session";
  const description = initialData ? "Edit the session" : "Add a new session";
  // Toast message to be shown after form submission
  const toastMessage = initialData
    ? "Session has been updated"
    : "Session has been created";
  // Action button label
  const action = initialData ? "Save changes" : "Create";
  // Initialize the form using react-hook-form
  const form = useForm<SessionFormValue>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      name: "",
      description: "",
      duration: 0,
      // Initialize more fields here
    },
  });

  /**
   * Handles form submission.
   * If initialData exists, sends a PATCH request to update the session.
   * Otherwise, sends a POST request to create a new session.
   * @param {SessionFormValue} data - The form data to be sent in the request.
   */
  const onSubmit = async (data: SessionFormValue) => {
    try {
      if (initialData) {
        // Send a PUT request to update the session
        await putData({
          url: `courses/${courseId}/sessions/${initialData.id}`,
          data: data,
          onSuccess: () => {
            toast.success(toastMessage);
            router.push(`/courses/${courseId}`);
          },
        });
      } else {
        // Send a POST request to create a new session
        await postData({
          url: `courses/${courseId}/sessions`,
          data: data,
          onSuccess: () => {
            toast.success(toastMessage);
            router.push(`/courses/${courseId}`);
          },
        });
      }
    } catch (error) {
      // Show an error toast if the request fails
      toast.error("Oops! Something went wrong. Please try again later.");
    }
  };

  /**
   * Handles the deletion of a session.
   * Sends a DELETE request to the server and shows a success or error toast accordingly.
   */
  const onDelete = async () => {
    try {
      await deleteData({
        url: `courses/${courseId}/sessions/${initialData?.id}`,
        onSuccess: () => {
          toast.success("Session has been deleted successfully");
          router.push(`courses`);
        },
        onError: (error: any) => {
          toast.error(
            "Something went wrong. Error deleting session. Please try again."
          );
          console.log("error", error);
        },
      });
    } catch (error) {
      console.error("Error:", error);
      toast.error("Make sure you remove all session dependencies first");
    } finally {
      // Close the confirmation modal
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
        <Heading title={name} description={description} />
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
                    placeholder="Session name"
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
                    placeholder="Session description"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="duration"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Duration</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    disabled={loading}
                    placeholder="Duration in hours"
                    {...field}
                    value={field.value.toString()} // Ensure the value is a string
                    onChange={(e) => field.onChange(e.target.value)} // Ensure onChange handles string input
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
