"use client"

import { useParams, useRouter } from "next/navigation";

import { CourseData } from "@/interface/interface";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Copy, Edit, EllipsisVertical, MoreHorizontal, Trash } from "lucide-react";
import { toast } from "react-hot-toast";
import { AlertModal } from "@/components/modals/alert-modal";
import { useState } from "react";
import axios from "axios";

interface CellActionProps {
    data: CourseData,
    className?: string
}

const CellAction: React.FC<CellActionProps> = ({ data, className }) => {

    const router = useRouter()
    const params = useParams()

    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    const onCopy = (id: string) => {
        navigator.clipboard.writeText(id);
        toast.success("Course ID copied to the clipboard.");
    }
    const onDelete = async () => {
        if (data.id) {
            try {
                setLoading(true)
                // await axios.delete(`/api/${params.storeId}/billboards/${data.id}`)
                console.log(data)
                router.refresh()
                // router.push(`/${params.storeId}/billboards`);
                toast.success('The Course has been deleted successfully.');
            } catch (error) {
                toast.error("Something went wrong while deleting the Course, try again later.")
            } finally {
                setOpen(false)
                setLoading(false)
            }
        } else {
            console.error("data.id is null or undefined")
        }
    };

    return (
        <div className={className}>
            <AlertModal
                isOpen={open}
                onClose={() => setOpen(false)}
                onConfirm={onDelete}
                loading={loading}
            />
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">
                            open
                        </span>
                        <EllipsisVertical  size={25} />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuLabel>
                        action
                    </DropdownMenuLabel>
                    <DropdownMenuItem onClick={() => onCopy(data.id)}>
                        <Copy className="mr-2 h-4 w-4" />
                        Copy ID
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => router.push(`/courses/edit/${data.id}`)}>
                        <Edit className="mr-2 h-4 w-4" />
                        update
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setOpen(true)}>
                        <Trash className="mr-2 h-4 w-4" />
                        Delete
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>

        </div>
    );
}

export default CellAction;
