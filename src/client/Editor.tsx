import type { JSX } from "react";
import type { InferOutput } from "valibot";

import { useLingui } from "@lingui/react/macro";
import { Button, Group, TextInput, Title } from "@mantine/core";
import { DatePickerInput } from "@mantine/dates";
import { useForm } from "@mantine/form";
import { DateTime } from "luxon";
import { standardResolver } from "mantine-form-standard-resolver";
import { twMerge } from "tailwind-merge";
import { isoDate, minLength, pipe, strictObject, string } from "valibot";

export type EditorFormData = InferOutput<ReturnType<typeof useSchema>>;

type EditorProps = {
  className?: string;
  defaultValues?: EditorFormData;
  onCancel?: () => void;
  onSubmit: (formData: EditorFormData) => void;
};

export function Editor({
  className,
  defaultValues,
  onCancel: handleCancel,
  onSubmit: handleSubmit,
}: EditorProps): JSX.Element {
  const minDate = DateTime.now().plus({ days: 1 });

  const { t } = useLingui();
  const schema = useSchema();

  const form = useForm({
    initialValues: defaultValues ?? {
      label: "",
      to: minDate.toISODate(),
    },
    mode: "uncontrolled",

    validate: standardResolver(schema),
  });

  return (
    <form
      className={twMerge("round m-auto flex w-120 flex-col gap-10", className)}
      onSubmit={form.onSubmit(handleSubmit)}
    >
      <Title className="text-center text-blue-800" order={2}>
        {defaultValues ? t`Édition` : t`Nouveau compte à rebours`}
      </Title>

      <TextInput
        {...form.getInputProps("label")}
        autoFocus
        data-autofocus
        label={t`Label :`}
        placeholder={t`Par ex. 'Vacances d'été'`}
        withAsterisk
      />

      <DatePickerInput
        {...form.getInputProps("to")}
        defaultValue={form.values.to}
        label={t`Date :`}
        minDate={minDate.toJSDate()}
      />

      <Group justify="flex-end" mt="md">
        {handleCancel ? (
          <Button onClick={handleCancel} variant="light">{t`Annuler`}</Button>
        ) : undefined}

        <Button type="submit">
          {defaultValues ? t`Mettre à jour` : t`Créer`}
        </Button>
      </Group>
    </form>
  );
}

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
function useSchema() {
  const { t } = useLingui();

  return strictObject({
    label: pipe(string(), minLength(1, t`Le label doit être rempli`)),
    to: pipe(string(), isoDate()),
  });
}
