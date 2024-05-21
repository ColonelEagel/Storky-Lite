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
import Link from "next/link";

// Custom hooks
import usePostRequest from "@/actions/usePostRequest";

/**
 * The form data schema used for validation.
 */
export type FormData = {
  name: string;
  email: string;
  password: string;
  passwordConfirm: string;
};

/**
 * Defines the form schema for validation using Zod.
 */
const formSchema = z
  .object({
    // Full Name must be at least 2 characters long
    name: z
      .string()
      .min(2, { message: "Full Name must be at least 2 characters." }),
    // Email must be a valid email address
    email: z.string().email({ message: "Invalid email address." }),
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
 * The sign up form component.
 */
const SignUpForm: FC = () => {
  // Custom hook for making POST requests to the server
  const { loading, postData } = usePostRequest();

  // Initialize the form using the form schema
  const form = useForm<ProductFormValues>({
    resolver: zodResolver(formSchema),
    // Set default values for form fields
    defaultValues: { name: "", email: "", password: "", passwordConfirm: "" },
  });

  /**
   * Handles form submission.
   * @param data - The form data.
   */
  const onSubmit = async (data: FormData) => {
    try {
      // Make a POST request to the server to sign up the user
      await postData({
        url: `auth/signup`,
        data: data,
        // Handle success response
        onSuccess: () => {
          toast.success("Logged In successfully! Welcome back to Storky");
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
    // Main container for the sign up form
    <div className="max-w-md h-fit mx-auto border rounded-3xl border-gray-500 shadow-xl hover:shadow-2xl">
      <div
        className="h-full flex w-full flex-col items-center justify-center  backdrop-blur-[10px]
                    rounded-3xl ring-white/80   ring-2 shadow-inner py-10  px-20 gap-4 "
      >
        {/* Header component for the sign up form */
        }
        <HeaderComponent
          title="Sign Up"
          text="Welcome to Storky🌹"
          className="mb-5 text-center"
        />
        <Form {...form}>
          {/* Form for the sign up form */
          }
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col space-y-6"
          >
            {/* Form fields for the sign up form */
            }
            {/* Full Name field */
            }
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
            {/* Email field */
            }
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
            {/* Password field */
            }
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      disabled={loading}
                      placeholder="Password"
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
                  <FormLabel>Confirm Password</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      disabled={loading}
                      placeholder="Confirm Password"
                      {...field}
                      className="input"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* Submit button for the sign up form */
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
                  {" wait... you are signing up"}
                </>
              ) : (
                "Sign Up"
              )}
            </Button>
          </form>
        </Form>
        {/* Link to the login page */
        }
        <p className="text-sm text-center">
          Already have an account?{" "}
          <Link
            href="/login"
            className="text-[#133059] hover:underline hover:text-[#1f4d8c]"
          >
            Log In
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUpForm;
