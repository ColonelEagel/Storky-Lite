"use client";

/**
 * React hook for managing state in functional components.
 */
import { useEffect, useState } from "react";

/**
 * Component for displaying a modal.
 */
import { Modal } from "@/components/ui/modal";

/**
 * Button component for triggering actions.
 */
import { Button } from "@/components/ui/button";

/**
 * Type definition for the AlertModal component props.
 * @typedef {Object} AlertModalProps
 * @property {boolean} isOpen - Whether the modal is open or not.
 * @property {function} onClose - Function to close the modal.
 * @property {function} onConfirm - Function to confirm the action.
 * @property {boolean} loading - Whether the action is loading.
 */
import { AlertModalProps } from "@/types/interface";

/**
 * Component for displaying an alert modal
 * @param {Object} props - The props for the AlertModal component
 * @param {boolean} props.isOpen - Whether the modal is open or not
 * @param {function} props.onClose - Function to close the modal
 * @param {function} props.onConfirm - Function to confirm the action
 * @param {boolean} props.loading - Whether the action is loading
 * @returns {JSX.Element} - The JSX element for the AlertModal component
 */
export const AlertModal: React.FC<AlertModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  loading,
}) => {
  // State to track whether the component has been mounted
  const [isMounted, setIsMounted] = useState(false);

  // Function to set the isMounted state to true when the component mounts
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Return null if the component has not been mounted yet
  if (!isMounted) {
    return null;
  }

  // Render the modal component
  return (
    <Modal
      title="Are you sure?" // Title of the modal
      description="This action can't be undo" // Description of the modal
      isOpen={isOpen} // Whether the modal is open or not
      onClose={onClose} // Function to close the modal
    >
      <div className="pt-6 space-x-6 flex items-center justify-end w-full">
        <Button
          disabled={loading} // Whether the button is disabled
          variant="outline" // Variant of the button
          onClick={onClose} // Function to close the modal
        >
          Cancel
        </Button>

        <Button disabled={loading} variant="destructive" onClick={onConfirm}>
          continue
        </Button>
      </div>
    </Modal>
  );
};
