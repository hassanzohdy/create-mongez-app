import { BasicComponentProps } from "app/utils/types";

export default function Tooltip({ children }: BasicComponentProps) {
  return (
    <>
      <div>{children}</div>
    </>
  );
}

Tooltip.defaultProps = {
  placement: "top",
  trigger: "hover",
};
