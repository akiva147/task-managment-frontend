import classes from "./form.module.scss";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import { Button, Modal } from "antd";
import { CustomInput } from "../../components/CustomFields/CustomInput";
import {
  FormTask,
  FormTaskSchema,
  statusOptions,
  Task,
  TaskSchema,
} from "../../models/task.model";
import { CustomSelect } from "../CustomFields/CustomSelect";
import { useMemo } from "react";

export interface FormProps {
  variant: "create" | "edit";
  onSubmit: (data: FormTask | Task) => Promise<void>;
  isModalOpen: boolean;
  handleCancel: () => void;
  defaultValues: FormTask | Task;
}

export const Form = ({
  variant,
  onSubmit,
  handleCancel,
  isModalOpen,
  defaultValues,
}: FormProps) => {
  const zodSchema = useMemo(
    () => (variant === "create" ? FormTaskSchema : TaskSchema),
    [variant]
  );
  const methods = useForm<FormTask | Task>({
    resolver: zodResolver(zodSchema),
    mode: "onChange",
    defaultValues,
  });

  const title = variant === "create" ? "Create Task" : "Edit Task";
  const submitText = variant === "create" ? "Create" : "Edit";

  return (
    <Modal
      wrapClassName={classes.container}
      open={isModalOpen}
      footer={[]}
      onCancel={handleCancel}
    >
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <header>
            <h2>{title}</h2>
            <h4>{title} to continue</h4>
          </header>
          <main>
            <CustomInput placeholder="Title" fieldName="title" />
            <CustomInput placeholder="Description" fieldName="description" />
            <CustomSelect fieldName="status" options={statusOptions} />
          </main>
          <footer>
            <Button color="default" variant="outlined" onClick={handleCancel}>
              Cancle
            </Button>
            <Button color="primary" variant="solid" htmlType="submit">
              {submitText}
            </Button>
          </footer>
        </form>
      </FormProvider>
      {/* {variant === "signup" ? (
        <span>
          Already have an account? <a href="/login">Login</a>
        </span>
      ) : (
        <span>
          Don't have an account? <a href="/signup">Signup</a>
        </span>
      )} */}
    </Modal>
  );
};
