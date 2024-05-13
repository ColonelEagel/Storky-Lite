"use client"

import { useParams, useRouter } from "next/navigation";

import { CourseData, Session } from "@/interface/interface";
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
    id:string,
    className?: string
    type: string
    children?: React.ReactNode
    onUpdate: () => void
}

const CellAction: React.FC<CellActionProps> = ({ id, className, type, children, onUpdate }) => {

    const router = useRouter()
    const params = useParams()

    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    // const onUpdate = () => {
    //     if (type === "course") {
    //         router.push(`/courses/edit/${data.id}`)
    //     } else if (type === "session") {
    //         router.push(`/courses/${params.courseId}/editSession/${data.id}`)
    //     }
    // }
    const onCopy = (id: string) => {
        navigator.clipboard.writeText(id);
        toast.success(`${type} ID copied to the clipboard.`);
    }
    const onDelete = async () => {
        if (id) {
            try {
                setLoading(true)
                // await axios.delete(`/api/courses${params.courseId}/${type}s/${data.id}`)

                // console.log(data)
                router.refresh()
                console.log(params)
                toast.success(`The ${type} has been deleted successfully.`);
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
    // console.log(typeof data)
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
                        <EllipsisVertical size={25} />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuLabel>
                        action
                    </DropdownMenuLabel>
                    <DropdownMenuItem onClick={() => onCopy(id)}>
                        <Copy className="mr-2 h-4 w-4" />
                        Copy ID
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => onUpdate()}>
                        <Edit className="mr-2 h-4 w-4" />
                        update
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setOpen(true)}>
                        <Trash className="mr-2 h-4 w-4" />
                        Delete
                    </DropdownMenuItem>
                    {children}
                </DropdownMenuContent>
            </DropdownMenu>

        </div>
    );
}

export default CellAction;
