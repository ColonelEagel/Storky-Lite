"use client";
import { FC } from "react";
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
import { Loader2 } from "lucide-react";


// Custom hooks
import usePutRequest from "@/actions/usePutRequest";

/**
 * The form data schema used for validation.
 */
export type FormData = {
  password: string;
  passwordConfirm: string;
};

/**
 * Defines the form schema for validation using Zod.
 */
const formSchema = z
  .object({
    // Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character
    password: z
      .string()
      .min(8)
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[_!@#$%^&*])[a-zA-Z\d_!@#$%^&*]{8,}$/,
        {
          message:
            "Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character.",
        }
      ),
    // Passwords must match
    passwordConfirm: z.string(),
  })
  .refine((values) => values.password === values.passwordConfirm, {
    message: "Passwords must match!",
    path: ["passwordConfirm"],
  });

/**
 * The inferred type from the form schema.
 */
type ProductFormValues = z.infer<typeof formSchema>;

/**
 * The change user password form component.
 */
const ChangeUserPassword: FC = () => {
  // Custom hook for making POST requests to the server
  const { loading, putData } = usePutRequest();

  // Initialize the form using the form schema
  const form = useForm<ProductFormValues>({
    resolver: zodResolver(formSchema),
    // Set default values for form fields
    defaultValues: {password: "", passwordConfirm: "" },
  });

  /**
   * Handles form submission.
   * @param data - The form data.
   */
  const onSubmit = async (data: FormData) => {
    try {
      // Make a Put request to the server to sign up the user
      await putData({
        url: `user/changeUserPassword`,
        data: data,
        // Handle success response
        onSuccess: () => {
          toast.success("your password updated successfully!");
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
  return (
    // Main container for changing password form
    <div className="max-w-md h-fit mx-auto border rounded-3xl border-gray-500 shadow-xl hover:shadow-2xl">
      <div
        className="h-full flex w-full flex-col items-center justify-center  backdrop-blur-[10px]
                    rounded-3xl ring-white/80   ring-2 shadow-inner py-10  px-20 gap-4 "
      >
        {/* Header component for changing password form */
        }
        <HeaderComponent
          title="Update User Data"
          text="Update your data"
          className="mb-5 text-center"
        />
        <Form {...form}>
          {/* Form for changing password form */
          }
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col space-y-6"
          >
            {/* Form fields for changing the password in the form */
            }
            {/* Password field */
            }
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>New Password</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      disabled={loading}
                      placeholder="New Password"
                      {...field}
                      className="input"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* Confirm Password field */
            }
            <FormField
              control={form.control}
              name="passwordConfirm"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm New Password</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      disabled={loading}
                      placeholder="Confirm New Password"
                      {...field}
                      className="input"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* Submit button for changing password form */
            }
            <Button
              type="submit"
              variant="outline"
              className="hover:shadow-form rounded-md  py-3 px-8 text-base font-semibold bg-[#133059] hover:bg-[#1f4d8c] text-white"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  {" wait..."}
                </>
              ) : (
                "Update Password"
              )}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default ChangeUserPassword;
