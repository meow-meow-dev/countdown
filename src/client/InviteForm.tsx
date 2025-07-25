import type { InferOutput } from "valibot";

import { useLingui } from "@lingui/react/macro";
import { Button, Group, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { standardResolver } from "mantine-form-standard-resolver";
import { useState } from "react";
import { FiAlertTriangle } from "react-icons/fi";
import { email, minLength, pipe, strictObject, string } from "valibot";

export type FormData = InferOutput<ReturnType<typeof useSchema>>;

type InviteFormProps = {
  onCancel: () => void;
  onSubmit: (_: FormData) => Promise<void>;
};

export function InviteForm({
  onCancel,
  onSubmit,
}: InviteFormProps): React.JSX.Element {
  const { t } = useLingui();
  const schema = useSchema();
  const form = useForm({
    initialValues: { from: { name: "" }, to: { email: "", name: "" } },
    mode: "uncontrolled",
    validate: standardResolver(schema),
  });
  const [hasSubmitError, setHasSubmitError] = useState(false);

  const handleSubmit = async (data: FormData): Promise<void> => {
    try {
      await onSubmit(data);
      setHasSubmitError(false);
    } catch {
      setHasSubmitError(true);
    }
  };

  return (
    <form
      className="round m-y flex flex-col gap-5"
      onSubmit={form.onSubmit(handleSubmit)}
    >
      <div className="flex flex-col gap-5">
        <TextInput
          {...form.getInputProps("from.name")}
          autoFocus
          data-autofocus
          label={t`Votre nom :`}
          withAsterisk
        />

        <TextInput
          {...form.getInputProps("to.name")}
          label={t`Nom du destinataire :`}
          withAsterisk
        />

        <TextInput
          {...form.getInputProps("to.email")}
          label={t`Adresse e-mail du destinataire :`}
          withAsterisk
        />
      </div>

      {hasSubmitError ? (
        <div className="flex flex-row items-center gap-2 text-red-600">
          <FiAlertTriangle />
          <p className="font-bold">{t`Une erreur est survenue`}</p>
        </div>
      ) : undefined}

      <Group justify="flex-end" mt="md">
        <Button onClick={onCancel} type="button" variant="light">
          {t`Annuler`}
        </Button>

        <Button
          loading={form.submitting}
          type="submit"
        >{t`Envoyer l'invitation`}</Button>
      </Group>
    </form>
  );
}

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
function useSchema() {
  const { t } = useLingui();

  return strictObject({
    from: strictObject({
      name: pipe(string(), minLength(1, t`Le nom doit être rempli`)),
    }),
    to: strictObject({
      email: pipe(
        string(),
        email(t`Cette adresse e-mail ne semble pas valide`)
      ),
      name: pipe(string(), minLength(1, t`Le nom doit être rempli`)),
    }),
  });
}
