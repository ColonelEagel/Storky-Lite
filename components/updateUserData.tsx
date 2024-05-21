"use client";
import { FC, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "react-hot-toast";

// UI components
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import HeaderComponent from "./ui/HeaderComponent";
import { Loader2, Trash } from "lucide-react";

// Custom hooks
import usePostRequest from "@/actions/usePostRequest";
import usePutRequest from "@/actions/usePutRequest";
import useDeleteRequest from "@/actions/useDeleteRequest";
import { useRouter } from "next/navigation";
import { AlertModal } from "./modals/alert-modal";
import Heading from "./ui/heading";
import { Separator } from "./ui/separator";
import { signOut } from "next-auth/react";

/**
 * The form data schema used for validation.
 */
export type FormData = {
  name: string;
  email: string;
};

/**
 * Defines the form schema for validation using Zod.
 */
const formSchema = z.object({
  // Full Name must be at least 2 characters long
  name: z
    .string()
    .min(2, { message: "Full Name must be at least 2 characters." }),
  // Email must be a valid email address
  email: z.string().email({ message: "Invalid email address." }),
});

/**
 * The inferred type from the form schema.
 */
type ProductFormValues = z.infer<typeof formSchema>;

/**
 * The sign up form component.
 */
interface UpdateUserDataFormProps {
  initialData: FormData;
}
const UpdateUserDataForm: React.FC<UpdateUserDataFormProps> = ({
  initialData,
}) => {
  // State for the confirmation modal
  const [open, setOpen] = useState(false);
  // Custom hook for making POST requests to the server
  const { loading, putData } = usePutRequest();
  // Hook for making DELETE requests
  const { deleteData, isLoading: isDeleting } = useDeleteRequest();
  // Router for navigation
  const router = useRouter();
  // Title and description for the form
  const name = " Update User Data";
  const description = " Update your Data";
  // Toast message to be shown after form submission
  const toastMessage = "Data updated successfully!";
  // Action button label
  const action = "";
  // Initialize the form using react-hook-form

  // Initialize the form using the form schema
  const form = useForm<ProductFormValues>({
    resolver: zodResolver(formSchema),
    // Set default values for form fields
    defaultValues: initialData,
  });

  /**
   * Handles form submission.
   * @param data - The form data.
   */
  const onSubmit = async (data: FormData) => {
    try {
      // Make a POST request to the server to sign up the user
      await putData({
        url: `user/updateUserData`,
        data: data,
        // Handle success response
        onSuccess: () => {
          toast.success("Data updated successfully!");
          // Reset the form fields
          form.reset();
        },
        // Handle error response
        onError: () => {
          toast.error("Oops! Something went wrong. Please try again later.");
        },
      });
    } catch (error) {
      // Handle any other errors
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
        url: `user/deactiveUser`,
        onSuccess: () => {
          toast.success("user has been deleted successfully");
          signOut()
            .then(() => {
              router.push("/login");
            })
            .catch((error) => {
              console.error("Error:", error);
            });
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
    // Main container for the sign up form
    <div className="max-w-md h-fit mx-auto border rounded-3xl border-gray-500 shadow-xl hover:shadow-2xl">
      <div
        className="h-full flex w-full flex-col items-center justify-center  backdrop-blur-[10px]
                    rounded-3xl ring-white/80   ring-2 shadow-inner py-10  px-20 gap-4 "
      >
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
          {/* Form for the sign up form */}
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col space-y-6"
          >
            {/* Form fields for the change data form */}
            {/* Full Name field */}
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      disabled={loading}
                      placeholder="Full Name"
                      {...field}
                      className="input"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* Email field */}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      disabled={loading}
                      placeholder="Email"
                      {...field}
                      className="input"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* Submit button for the sign up form */}
            <Button
              type="submit"
              variant="outline"
              className="hover:shadow-form rounded-md  py-3 px-8 text-base font-semibold bg-[#133059] hover:bg-[#1f4d8c] text-white"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  {" wait... you are signing up"}
                </>
              ) : (
                "save changes"
              )}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default UpdateUserDataForm;
