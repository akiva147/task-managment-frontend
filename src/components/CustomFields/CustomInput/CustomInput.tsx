import { useController } from "react-hook-form";
import classes from "./custom-input.module.scss";
import { Input, InputProps } from "antd";

export interface CustomInputProps extends InputProps {
  fieldName: string;
}

export const CustomInput = ({ fieldName, ...props }: CustomInputProps) => {
  const {
    field: fieldValues,
    fieldState: { error },
  } = useController({
    name: fieldName,
  });

  return (
    <div className={classes.container}>
      <main>
        <Input {...props} {...fieldValues} />
      </main>
      {error && <footer>{error.message}</footer>}
    </div>
  );
};
