import { useLingui } from "@lingui/react/macro";
import { Button, Group, Select } from "@mantine/core";
import { useForm } from "@mantine/form";
import { twMerge } from "tailwind-merge";

export type Settings = {
  locale: string;
};

type SettingsFormProps = {
  className?: string;
  onCancel: () => void;
  onSubmit: (settings: Settings) => void;
  settings: Settings;
};

export function SettingsForm({
  className,
  onCancel,
  onSubmit,
  settings,
}: SettingsFormProps): React.JSX.Element {
  const { t } = useLingui();
  const form = useForm({
    initialValues: settings,
    mode: "uncontrolled",
  });

  const selectData = [
    {
      label: t`Anglais`,
      value: "en",
    },
    { label: t`Français`, value: "fr" },
  ];

  return (
    <form
      className={twMerge(
        "round m-y flex w-120 flex-col gap-10 border border-blue-600 p-5",
        className
      )}
      onSubmit={form.onSubmit(onSubmit)}
    >
      <Select
        {...form.getInputProps("locale")}
        allowDeselect={false}
        data={selectData}
        label={t`Langue :`}
      />

      <Group justify="flex-end" mt="md">
        <Button onClick={onCancel} type="button" variant="light">
          {t`Annuler`}
        </Button>

        <Button type="submit">{t`Appliquer`}</Button>
      </Group>
    </form>
  );
}
