export type toastPlacement =
  | "topLeft"
  | "topCenter"
  | "topRight"
  | "middleLeft"
  | "middleCenter"
  | "middleRight"
  | "bottomLeft"
  | "bottomCenter"
  | "bottomRight";

export type ToastOptions = {
  placement?: toastPlacement;
  type?: "success" | "info" | "warning" | "danger" | "default";
};
