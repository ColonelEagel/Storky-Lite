"use client";

import { FC, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { toast } from "react-hot-toast";
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
import { Textarea } from "@/components/ui/textarea";
import HeaderComponent from "./ui/HeaderComponent";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import axios from "axios";
import Link from "next/link";

export type FormData = {
  email: string;
  password: string;
};

const formSchema = z.object({
  email: z.string().email({
    message: "Invalid email address.",
  }),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters.",
  }),
});
type ProductFormValues = z.infer<typeof formSchema>;

const LoginForm = () => {
  // const { register, handleSubmit } = useForm<FormData>();
  const [loading, setLoading] = useState(false);

  const form = useForm<ProductFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    try {
      console.log("data form contact: ", data);
      console.log("#".repeat(20));

      // make a post request to nodemailer with axios
      //   const response = await axios.post("https://nodemailr.onrender.com/send", data, {
      //     headers: {
      //       'Content-Type': 'application/json',
      //     },
      //   });
      //   console.log("response: ", response);
      //   console.log("#".repeat(20));
      //   console.log("data from sendEmail:", response.data);
      //empty the form
      //   form.reset();
      //show toast
      toast.success("Logged In successfully! Welcome back to Storky");
    } catch (error) {
      //   console.error("Error sending email:", error);
      toast.error("Oops! Something went wrong. Please try again later.");
    }
    setLoading(false);
  };
  // const { theme } = useTheme();
  const fixed_class: string =
    "w-full rounded-md border border-gray-300 mb-5  outline-none focus:border-blue-500 focus:shadow-md";

  return (
    <div className="max-w-md h-fit mx-auto border rounded-3xl border-gray-500 shadow-xl hover:shadow-2xl">
      <div
        className="h-full flex w-full flex-col items-center justify-center  backdrop-blur-[10px]
                    rounded-3xl ring-white/80   ring-2 shadow-inner py-10  px-20 gap-4 "
      >
          <HeaderComponent
            title="Log In"
            text="Welcome to Storky🌹"
            className="mb-5"
          />
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className=" flex  flex-col items-center 
                      justify-center  p-10 gap-4 "
          >
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel> Email:</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="email"
                      className={fixed_class}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel> password:</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      disabled={loading}
                      placeholder="password"
                      className={cn(fixed_class, "")}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
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
                "Log In"
              )}
            </Button>
          </form>
        </Form>
        <p className="ml-5 mb-5 text-[#133059] backdrop-blur-[5px]">
          new to storky?{" "}
          <Link
            href="/signup"
            className="text-blue-500 underline hover:text-blue-600"
          >
            sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;
