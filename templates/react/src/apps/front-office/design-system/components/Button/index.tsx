import { ButtonHTMLAttributes } from "react";

export default function BaseButton(props: DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>) {
  return <button {...props} />;
}