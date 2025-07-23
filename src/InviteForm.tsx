import type { InferOutput } from "valibot";
import { Button, Group, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { valibotResolver } from "mantine-form-valibot-resolver";
import { email, minLength, pipe, strictObject, string } from "valibot";

const schema = strictObject({
  from: strictObject({
    name: pipe(string(), minLength(1, "Le nom doit être rempli")),
  }),
  to: strictObject({
    email: pipe(string(), email("Cette adresse e-mail ne semble pas valide")),
    name: pipe(string(), minLength(1, "Le nom doit être rempli")),
  }),
});

export type FormData = InferOutput<typeof schema>;

type InviteFormProps = {
  onCancel: () => void;
  onSubmit: (_: FormData) => void;
};

export function InviteForm({
  onCancel,
  onSubmit,
}: InviteFormProps): React.JSX.Element {
  const form = useForm({
    mode: "controlled",
    initialValues: { from: { name: "" }, to: { email: "", name: "" } },
    validate: valibotResolver(schema),
  });

  return (
    <form
      className="flex flex-col gap-10 w-120 border border-blue-600 round p-5 m-y"
      onSubmit={form.onSubmit(onSubmit)}
    >
      <TextInput
        autoFocus
        data-autofocus
        withAsterisk
        label="Votre nom :"
        key={form.key("from.name")}
        {...form.getInputProps("from.name")}
      />

      <TextInput
        withAsterisk
        label="Nom du destinataire :"
        key={form.key("to.name")}
        {...form.getInputProps("to.name")}
      />

      <TextInput
        withAsterisk
        label="Adresse e-mail du destinataire :"
        key={form.key("to.email")}
        {...form.getInputProps("to.email")}
      />

      <Group justify="flex-end" mt="md">
        <Button variant="light" onClick={onCancel} type="button">
          Annuler
        </Button>
        <Button type="submit"> Envoyer l'invitation</Button>
      </Group>
    </form>
  );
}
