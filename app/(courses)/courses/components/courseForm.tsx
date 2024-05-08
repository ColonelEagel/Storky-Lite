"use client";
import * as z from "zod";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
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
import { CourseData } from "@/interface/interface";

const formSchema = z.object({
    title: z.string().min(1, { message: "Title is required" }),
    description: z.string(),
    // Add more fields as needed
});

type CourseFormValue = z.infer<typeof formSchema>;

interface CourseFormProps {
    initialData: CourseData | null;
}

export const CourseForm: React.FC<CourseFormProps> = ({ initialData }) => {
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const title = initialData ? "Edit the course" : "Create a course";
    const description = initialData ? "Edit the course" : "Add a new course";
    const toastMessage = initialData ? "Course has been updated" : "Course has been created";
    const action = initialData ? "Save changes" : "Create";

    const form = useForm<CourseFormValue>({
        resolver: zodResolver(formSchema),
        defaultValues: initialData || {
            title: "",
            description: "",
            // Initialize more fields here
        },
    });

    const onSubmit = async (data: CourseFormValue) => {
        try {
            setLoading(true);
            // Implement your API call here to create or update the course
            // Example: await axios.post('/api/courses', data);
            // Example: await axios.patch(`/api/courses/${initialData.id}`, data);
            console.log(data)
            // Simulate a delay before proceeding
            setTimeout(() => {
                console.log(data); // Log the data after 2 seconds
                toast.success(toastMessage);
                router.push("/courses"); // Redirect to the courses page after submission
                
                // Delay the setLoading(false) call to simulate server delay
                setTimeout(() => {
                    setLoading(false); // Reset loading state after another 2 seconds
                }, 2000);
            }, 2000);
        } catch (error) {
            console.error("Error:", error);
            toast.error("Something went wrong");
            setLoading(false); // Reset loading state if an error occurs
        }
    };
    
    const onDelete = async () => {
        try {
            setLoading(true);
            // Implement your API call here to delete the course
            // Example: await axios.delete(`/api/courses/${initialData.id}`);

            console.log(`${initialData?.title} Course has been deleted successfully.`);
            toast.success(`${initialData?.title} Course has been deleted successfully.`);
            // router.push("/courses"); // Redirect to the courses page after deletion
        } catch (error) {
            console.error("Error:", error);
            toast.error("Make sure you remove all course dependencies first");
        } finally {
            setOpen(false);
            setLoading(false);
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
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-full">
                    <FormField
                        control={form.control}
                        name="title"
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
                    {/* Add more form fields as needed */}
                    <Button disabled={loading} className="ml-auto" type="submit">
                        {action}
                    </Button>
                </form>
            </Form>
        </div>
    );
};
