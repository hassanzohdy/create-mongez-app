import React from "react";
import { ToastOptions, toastPlacement } from "./types";

const toaster = [];

export function toast(message: React.ReactNode, toastOptions: ToastOptions) {
  toaster.push(message, toastOptions);
}

export function toastSuccess(
  message: React.ReactNode,
  placement: toastPlacement = "topLeft",
) {
  toast(message, {
    placement,
    type: "success",
  });
}
