import { LastRequest, lastRequest } from "@mongez/http";
import { trans } from "@mongez/localization";
import { FormInputProps, useFormInput } from "@mongez/react-form";
import Is from "@mongez/supportive-is";
import {
  lengthRule,
  maxLengthRule,
  minLengthRule,
  requiredRule,
} from "@mongez/validator";
import { useEffect, useState } from "react";
import HiddenInput from "./HiddenInput";
import InputError from "./InputError";
import InputLabel from "./InputLabel";

export type SelectInputProps = FormInputProps & {
  options?: any;
  request?: any;
  multiple?: any;
  except?: any[];
  mapOption?: (option: any, index: number) => any;
};

// Use your desired ui component
const SelectComponent: any = () => null;

function defaultMapOption(option: any): any {
  if (Is.scalar(option)) {
    option = {
      label: trans(option),
      value: option,
    };
  }

  return {
    label: option.name || option.text || option.title || option.label,
    value: String(option.id || option.value),
  };
}

function mapOptions(options: any[], except?: any[], mapOption?: any): any[] {
  if (!options) return [];

  if (except) {
    except = except.map(String);
  }

  return options.map(mapOption || defaultMapOption).filter((option: any) => {
    if (!except) return true;

    return except.includes(String(option.value)) === false;
  });
}

export default function SelectInput(props: SelectInputProps) {
  const { id, label, error, placeholder, onChange, name, value } =
    useFormInput(props);

  const [isLoading, loading] = useState(props.request !== undefined);

  const [optionsList, setOptionsList] = useState(
    mapOptions(props.options, props.except, props.mapOption),
  );
  const [isOpen, setOpen] = useState(false);

  useEffect(() => {
    if (!props.request) return;

    loading(true);

    const request = props.request();

    request.then((response: any) => {
      setOptionsList(
        mapOptions(response.data.records, props.except, props.mapOption),
      );
      loading(false);
    });

    let selectRequest: LastRequest;

    setTimeout(() => {
      selectRequest = lastRequest();
    }, 0);

    return () => selectRequest && selectRequest.abort();
  }, [props.request, props]);

  const changeValue = (options: any) => {
    onChange({
      target: {
        value: options,
      },
    });
  };

  return (
    <>
      <HiddenInput name={name} value={value} />

      <InputLabel
        onClick={() => setOpen(!isOpen)}
        htmlFor={id}
        required={props.required}>
        {label}
      </InputLabel>
      <SelectComponent
        data={optionsList}
        block
        disabled={isLoading}
        value={String(value)}
        onChange={changeValue}
        onOpen={() => setOpen(true)}
        onClose={() => setOpen(false)}
        placeholder={isLoading ? <>Loading...</> : placeholder}
      />

      <InputError error={error} />
    </>
  );
}

SelectInput.defaultProps = {
  type: "select",
  multiple: false,
  rules: [requiredRule, minLengthRule, maxLengthRule, lengthRule],
};
