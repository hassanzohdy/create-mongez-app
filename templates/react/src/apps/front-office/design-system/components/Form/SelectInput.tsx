import { FormInputProps, useFormInput } from "@mongez/react-form";
import {
  lengthRule,
  maxLengthRule,
  minLengthRule,
  requiredRule
} from "@mongez/validator";

export default function SelectInput(props: FormInputProps) {
  const { id, label, error, placeholder, onChange, name, value } =
    useFormInput(props);

  return (
    <>
       // Select Component    
    </>
  );
}

SelectInput.defaultProps = {
  type: "select",
  multiple: false,
  rules: [requiredRule, minLengthRule, maxLengthRule, lengthRule],
};
