"use client"

import { useParams, useRouter } from "next/navigation";

// Import the dropdown menu components from the UI library
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";

// Import the button component from the UI library
import { Button } from "@/components/ui/button";

// Import the icons from the lucide-react library
import { Copy, Edit, MoreHorizontal, Trash } from "lucide-react";

// Import the toast notifications library
import { toast } from "react-hot-toast";

// Import the alert modal component
import { AlertModal } from "@/components/modals/alert-modal";

// Import the React useState hook
import { useState } from "react";

// Import the axios library for making HTTP requests
import axios from "axios";

// Import the StudentColumn type from the students table columns file
import { StudentColumn } from "./columns";

/**
 * Component for rendering action menu of a student row in the table.
 * 
 * @param {Object} props - The properties of the component.
 * @param {Object} props.data - The data of the student row.
 */
interface CellActionProps {
    // The data of the student row
    data: StudentColumn;
}
const CellAction: React.FC<CellActionProps> = ({ data }) => {
    // Get the router and params objects
    const router = useRouter()
    const params = useParams()

    // State variables for the dropdown menu
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    /**
     * Function to copy the ID of the student to the clipboard.
     * 
     * @param {string} id - The ID of the student.
     */
    const onCopy = (id: string) => {
        navigator.clipboard.writeText(id);
        toast.success("Student ID copied to the clipboard.");
    }

    /**
     * Function to delete the student from the server and refresh the page.
     */
    const onDelete = async () => {
        try {
            setLoading(true)
            await axios.delete(`/api/${params.storeId}/students/${data.id}`)
            router.refresh()
            toast.success('Student has been deleted successfully.');
        } catch (error) {
            toast.error("Make sure you removed all students first")
        } finally {
            setOpen(false)
            setLoading(false)
        }
    };

    return (
        // Render the dropdown menu
        <>
            {/* Render the alert modal for confirming deletion */}
            <AlertModal
                isOpen={open}
                onClose={() => setOpen(false)}
                onConfirm={onDelete}
                loading={loading}
            />
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    {/* Render the trigger button */}
                    <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">
                            open
                        </span>
                        <MoreHorizontal className="h-4 w-4" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuLabel>
                        action
                    </DropdownMenuLabel>
                    {/* Render the copy ID option */}
                    <DropdownMenuItem onClick={() => onCopy(data.id)}>
                        <Copy className="mr-2 h-4 w-4" />
                        Copy ID
                    </DropdownMenuItem>
                    {/* Render the update option */}
                    <DropdownMenuItem onClick={() => router.push(`/${params.storeId}/students/${data.id}`)}>
                        <Edit className="mr-2 h-4 w-4" />
                        update
                    </DropdownMenuItem>
                    {/* Render the delete option */}
                    <DropdownMenuItem onClick={() => setOpen(true)}>
                        <Trash className="mr-2 h-4 w-4" />
                        Delete
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>

        </>
    );
}

export default CellAction;
