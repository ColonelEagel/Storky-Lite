"use client";
import * as z from "zod";
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
import { Textarea } from "@/components/ui/textarea";
import { AlertModal } from "@/components/modals/alert-modal";
import { Session } from "@/types/interface";
import usePostRequest from "@/app/actions/usePostRequest ";

const formSchema = z.object({
  name: z.string().min(1, { message: "Title is required" }),
  description: z.string(),
  duration: z.preprocess(
    (a) => parseInt(z.string().parse(a), 10),
    z
      .number()
      .min(1, { message: "Duration is required" })
      .max(10, { message: "Duration should not exceed 10 hours" })
  ),
  // Add more fields as needed
});

type SessionFormValue = z.infer<typeof formSchema>;

interface SessionFormProps {
  initialData?: Session;
}

export const SessionForm: React.FC<SessionFormProps> = ({ initialData }) => {
  const [open, setOpen] = useState(false);
  //   const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { postData, loading } = usePostRequest();
  const { courseId } = useParams();

  const name = initialData ? "Edit the session" : "Create a session";
  const description = initialData ? "Edit the session" : "Add a new session";
  const toastMessage = initialData
    ? "Session has been updated"
    : "Session has been created";
  const action = initialData ? "Save changes" : "Create";

  const form = useForm<SessionFormValue>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      name: "",
      description: "",
      duration: 0,
      // Initialize more fields here
    },
  });

  const onSubmit = async (data: SessionFormValue) => {
    try {
      await postData({
        url: `courses/${courseId}/sessions`,
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
      //   setLoading(true);
      // Implement your API call here to delete the session
      // Example: await axios.delete(`/api/sessions/${initialData.id}`);

      console.log(
        `${initialData?.name} Session has been deleted successfully.`
      );
      toast.success(
        `${initialData?.name} Session has been deleted successfully.`
      );
      // router.push("/sessions"); // Redirect to the sessions page after deletion
    } catch (error) {
      console.error("Error:", error);
      toast.error("Make sure you remove all session dependencies first");
    } finally {
      setOpen(false);
      //   setLoading(false);
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
                    max={10}
                    placeholder="Duration in hours"
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
