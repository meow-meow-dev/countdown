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

const schema = strictObject({
  label: pipe(string(), minLength(1, "Le label doit être rempli")),
  to: pipe(string(), isoDate()),
});

export type EditorFormData = InferOutput<typeof schema>;

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
      className={twMerge(
        "round m-auto flex w-120 flex-col gap-10 border border-blue-600 p-5",
        className
      )}
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
