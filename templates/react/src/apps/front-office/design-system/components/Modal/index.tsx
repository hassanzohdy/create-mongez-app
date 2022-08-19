import { BasicComponentProps } from "@mongez/react-router";
import { useEffect, useState } from "react";
import { ModalProps } from "./types";

// Use your desired modal package
function BaseModal(props: BasicComponentProps) {
  return <div {...props} />;
}

BaseModal.Header = function ModalHeader(props: BasicComponentProps) {
  return <div {...props} />;
};

BaseModal.Body = function ModalBody(props: BasicComponentProps) {
  return <div {...props} />;
};

BaseModal.Footer = function ModalFooter(props: BasicComponentProps) {
  return <div {...props} />;
};

export default function Modal({
  fullScreen,
  open,
  heading,
  children,
  size,
  backdrop,
  onClose,
  esc,
}: ModalProps) {
  const [isOpen, setOpen] = useState(open);

  useEffect(() => {
    setOpen(open);
  }, [open]);

  const close = () => {
    setOpen(false);
    onClose && onClose();
  };

  return (
    <>
      <BaseModal
        keyboard={esc}
        backdrop={backdrop}
        full={fullScreen}
        size={size}
        open={isOpen}
        onClose={close}>
        <BaseModal.Header>
          <h1 className="text-xl font-bold">{heading}</h1>
        </BaseModal.Header>
        <BaseModal.Body>{children}</BaseModal.Body>
      </BaseModal>
    </>
  );
}

Modal.Header = BaseModal.Header;
Modal.Body = BaseModal.Body;
Modal.Footer = BaseModal.Footer;
