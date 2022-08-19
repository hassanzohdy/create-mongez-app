import React from "react";

export type ModalProps = {
  /**
   * Determine whether to open the modal in full screen size
   */
  fullScreen?: boolean;
  /**
   * Determine If the modal should be opened
   */
  open?: boolean;
  /**
   * Modal Heading
   */
  heading?: React.ReactNode;
  /**
   * Modal Content
   */
  children: React.ReactNode;
  /**
   * Modal Size
   */
  size?: "xs" | "sm" | "md" | "lg";
  /**
   * If set to true, then Modal can be closed once clicked on the backdrop
   */
  backdrop?: boolean;
  /**
   * Triggered when modal is closed
   */
  onClose: () => void;
  /**
   * If set to true, then Modal can be closed once clicked on ESC key
   */
  esc?: boolean;
};
