import BaseButton from "./../Button";
import Modal from "./../Modal";

export default function Confirm({
  onConfirm,
  message,
  open,
  onClose,
  size,
  confirmText,
  cancelText,
  header,
  ...otherProps
}: any) {
  const confirm = () => {
    onConfirm();
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose} size={size} {...otherProps}>
      {header && <Modal.Header>{header}</Modal.Header>}
      <Modal.Body>{message}</Modal.Body>
      <Modal.Footer>
        <BaseButton onClick={onClose}>{cancelText}</BaseButton>
        <BaseButton onClick={confirm} autoFocus>
          {confirmText}
        </BaseButton>
      </Modal.Footer>
    </Modal>
  );
}

Confirm.defaultProps = {
  confirmText: "Confirm",
  cancelText: "Cancel",
  color: "red",
  size: "xs",
};
