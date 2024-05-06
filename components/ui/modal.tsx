import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import React from "react";
interface ModalProps {
  title: string;
  description: string;
  isOpen: boolean;
  onClose: () => void;
  children?: React.ReactNode;
}

/**
 * Renders a modal component.
 *
 * @param {ModalProps} {
 *   title,
 *   description,
 *   isOpen,
 *   onClose,
 *   children,
 * } - The props for the modal component.
 * @return {React.FC} The modal component.
 */
export const Modal: React.FC<ModalProps> = ({
  title,
  description,
  isOpen,
  onClose,
  children,
}) => {
  /**
   * A function that is triggered when the value of `open` changes.
 * Handles the onChange event when the value of `open` changes.
   * If `open` is false, it triggers the onClose function.
   *
   * @param {boolean} open - The new value of `open`.
   * @return {void} This function does not return anything.
   */
  const onChange = (open: boolean) => {
    if (!open) {
      onClose();
    }
  };
  return (
    <Dialog open={isOpen} onOpenChange={onChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <div>{children}</div>
      </DialogContent>
    </Dialog>
  );
};
