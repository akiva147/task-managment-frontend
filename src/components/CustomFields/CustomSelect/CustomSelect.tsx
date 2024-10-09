import { useController } from "react-hook-form";
import classes from "./custom-select.module.scss";
import { Select, SelectProps } from "antd";
import { DefaultOptionType } from "antd/es/select";

export interface CustomSelectProps extends SelectProps {
  fieldName: string;
  options: DefaultOptionType[];
  // placeholder: string;
  // onChange: (value: string) => void;
}

export const CustomSelect = ({ fieldName, ...props }: CustomSelectProps) => {
  const {
    field: fieldValues,
    fieldState: { error },
  } = useController({
    name: fieldName,
  });

  return (
    <div className={classes.container}>
      <main>
        <Select {...props} {...fieldValues} />
        {/* <Input variant="borderless" {...props} {...fieldValues} /> */}
      </main>
      {error && <footer>{error.message}</footer>}
    </div>
  );
};
