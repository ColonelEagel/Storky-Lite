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
import { Content } from "@/types/interface";
import usePostRequest from "@/actions/usePostRequest";
import usePutRequest from "@/actions/usePutRequest";
import useDeleteRequest from "@/actions/useDeleteRequest";

const formSchema = z.object({
  //   title: z.string().min(1, { message: "Title is required" }),
  //   url: z.object({
  //     name: z.string(),
  //     size: z.number(),
  //     type: z.string(),
  //     lastModified: z.number(),
  //     lastModifiedDate: z.date(),
  //   }),
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
  // Add more fields as needed
});

type ContentFormValue = z.infer<typeof formSchema>;

interface ContentFormProps {
  initialData?: Content;
}

export const ContentForm: React.FC<ContentFormProps> = ({ initialData }) => {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const { postData, loading } = usePostRequest();
  const { deleteData, isLoading: isDeleting } = useDeleteRequest();
  const { loading: patchLoading, putData } = usePutRequest();
  const { courseId, sessionId } = useParams();

  const title = initialData ? "Edit the content" : "Create a content";
  const description = initialData ? "Edit the content" : "Add a new content";
  const toastMessage = initialData
    ? "The Lesson has been updated"
    : "The Lesson has been created";
  const action = initialData ? "Save changes" : "Create";

  const form = useForm<ContentFormValue>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData
      ? {
          filename:
            initialData.filename instanceof File
              ? initialData.filename
              : undefined, // Initialize filename with undefined if it's not a File
          name: initialData.name,
        }
      : {
          filename: undefined, // Initialize filename with undefined for new content
          name: "",
        },
  });

  const onSubmit = async (data: ContentFormValue) => {
    console.log(data)
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
  const onDelete = async () => {
    try {
      await deleteData({
        url: `courses/${courseId}/sessions/${sessionId}/content/${initialData?.id}`,
        onSuccess: () => {
          toast.success("session has been deleted successfully");
          router.push(`courses`);
        },
        onError: (error: any) => {
          toast.error(
            "something went wrong Error deleting course please try again"
          );
          console.log("error", error);
        },
      });
    } catch (error) {
      console.error("Error:", error);
      toast.error("Make sure you remove all session dependencies first");
    } finally {
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
                    placeholder="Course title"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

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
            {loading ? "uploading..." : action}
          </Button>
        </form>
      </Form>
    </div>
  );
};
