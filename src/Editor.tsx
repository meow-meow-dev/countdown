import type { InferOutput } from "valibot"
import { Button, Group, TextInput } from "@mantine/core"
import { DatePickerInput } from "@mantine/dates"
import { useForm } from "@mantine/form"
import { DateTime } from "luxon"
import { valibotResolver } from "mantine-form-valibot-resolver"
import { date, minLength, pipe, strictObject, string } from "valibot"

const schema = strictObject({
  label: pipe(string(), minLength(1, "Le label doit être rempli")),
  to: date("bleow"),
})

type FormData = InferOutput<typeof schema>

type EditorProps = {
  defaultValues?: {
    label: string
    to: DateTime<true>
  }
}

export function Editor({ defaultValues }: EditorProps) {
  const minDate = DateTime.now().plus({ days: 1 })

  const form = useForm({
    mode: "controlled",
    initialValues: defaultValues
      ? { label: defaultValues.label, to: defaultValues.to.toJSDate() }
      : {
          label: "",
          to: minDate.toJSDate(),
        },

    validate: valibotResolver(schema),
  })

  function onSubmit({ label, to }: FormData): void {
    window.location.search = new URLSearchParams(Object.entries({ label, to: DateTime.fromJSDate(to).toISODate() as string })).toString()
  }

  return (
    <form className="flex flex-col gap-10 w-120 border round p-5 m-5" onSubmit={form.onSubmit(onSubmit)}>
      <TextInput
        autoFocus
        withAsterisk
        label="Label :"
        placeholder="Anniversaire Boubouze"
        key={form.key("label")}
        {...form.getInputProps("label")}
      />

      <DatePickerInput
        key={form.key("date")}
        label="Date :"
        minDate={minDate.toJSDate()}
        placeholder="Choisir une date"
        {...form.getInputProps("to")}
      />

      <Group justify="flex-end" mt="md">
        <Button type="submit">Créer</Button>
      </Group>
    </form>
  )
}
