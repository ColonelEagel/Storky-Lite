"use client";

// Importing necessary components and libraries
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"; // Importing the DropdownMenu component and its child components
import { Button } from "@/components/ui/button"; // Importing the Button component
import { Copy, Edit, EllipsisVertical, Trash } from "lucide-react"; // Importing icons from lucide-react library
import { toast } from "react-hot-toast"; // Importing the toast library for displaying notifications
import { AlertModal } from "@/components/modals/alert-modal"; // Importing the AlertModal component for displaying confirmation modal
import { useState } from "react"; // Importing the useState hook from React
import { CellActionProps } from "@/types/interface"; // Importing the CellActionProps interface that defines the props for the CellAction component

/**
 * CellAction component is a reusable component that renders a dropdown menu with actions for a cell.
 * @param {CellActionProps} props - The props for the CellAction component
 * @returns {JSX.Element} - The JSX element for the CellAction component
 */
const CellAction: React.FC<CellActionProps> = ({
  id,
  className,
  type,
  children,
  onUpdate,
  onDelete,
  loading,
}) => {
  const [open, setOpen] = useState(false); // State variable for controlling the open state of the confirmation modal

  /**
   * Function to copy the ID of the cell to the clipboard and display a success toast message.
   * @param {string} id - The ID of the cell
   */
  const onCopy = (id: string) => {
    navigator.clipboard.writeText(id);
    toast.success(`${type} ID copied to the clipboard.`);
  };

  const handleDelete = () => {
    setOpen(false);
    onDelete();
  };
  return (
    <div className={className}>
      {/* Rendering the confirmation modal if onDelete prop is provided */}

      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={handleDelete}
        loading={loading}
      />

      <DropdownMenu>
        {/* Rendering the DropdownMenuTrigger component with a Button component */}
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">open</span>
            <EllipsisVertical size={25} />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          {/* Rendering the DropdownMenuLabel component */}
          <DropdownMenuLabel>action</DropdownMenuLabel>
          {/* Rendering the DropdownMenuItem component for copying the ID of the cell */}
          <DropdownMenuItem onClick={() => onCopy(id)}>
            <Copy className="mr-2 h-4 w-4" />
            Copy ID
          </DropdownMenuItem>
          {/* Rendering the DropdownMenuItem component for updating the cell if onUpdate prop is provided */}
          {onUpdate && (
            <DropdownMenuItem onClick={() => onUpdate()}>
              <Edit className="mr-2 h-4 w-4" />
              update
            </DropdownMenuItem>
          )}
          {/* Rendering the DropdownMenuItem component for deleting the cell */}
          <DropdownMenuItem onClick={() => setOpen(true)}>
            <Trash className="mr-2 h-4 w-4" />
            Delete
          </DropdownMenuItem>
          {/* Rendering any additional child components if provided */}
          {children}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default CellAction;
