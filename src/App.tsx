import type { FormData } from "./InviteForm";
import { Button, Center, Flex, Modal, Stack } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { notifications } from "@mantine/notifications";
import { DateTime } from "luxon";
import { useMemo } from "react";
import {
  FiAlertTriangle,
  FiEdit,
  FiLink,
  FiMail,
  FiPlusSquare,
} from "react-icons/fi";
import { Countdown } from "./Countdown";
import { Editor } from "./Editor";
import { InviteForm } from "./InviteForm";
import { sendInvitation } from "./sendInvitation";

type URLParams = {
  edit?: boolean;
  label: string;
  to: DateTime<true>;
};

function useURL(): URLParams | undefined {
  return useMemo(() => {
    const { searchParams } = new URL(window.location.href);
    const label = searchParams.get("label");
    const to = searchParams.get("to");
    const edit = searchParams.get("edit");

    const toDate = to ? DateTime.fromISO(to) : undefined;

    return label && toDate && toDate.isValid
      ? { edit: edit !== null, label, to: toDate }
      : undefined;
  }, []);
}

function App() {
  const params = useURL();
  const [opened, { open, close }] = useDisclosure(false);
  const url = window.location.href;

  function copyURL(): void {
    navigator.clipboard.writeText(url);

    notifications.show({
      autoClose: 2000,
      message: "L'adresse a été copiée dans le presse-papier",
      position: "top-center",
    });
  }

  async function onSendInvitation(formData: FormData): Promise<void> {
    if (!params) return;

    try {
      await sendInvitation({
        ...formData,
        countdown: { label: params.label, url },
      });

      notifications.show({
        autoClose: 2000,
        message: "Le compte à rebours a été envoyé",
        position: "top-center",
      });
    } catch (_) {
      notifications.show({
        autoClose: 2000,
        color: "red",
        icon: <FiAlertTriangle />,
        message: "Une erreur est survenue",
        position: "top-center",
      });
    }

    close();
  }

  return params && params.edit === false ? (
    <Stack className="h-full">
      <Center className="grow">
        <Countdown className="m-auto" label={params.label} to={params.to} />
      </Center>

      <Flex
        justify="flex-end"
        className="gap-3"
        direction={{ base: "column", lg: "row" }}
      >
        <Button leftSection={<FiLink />} variant="light" onClick={copyURL}>
          Copier l'URL
        </Button>
        <Button
          component="a"
          variant="light"
          href={`/?edit&label=${params.label}&to=${params.to.toISODate()}`}
          leftSection={<FiEdit />}
        >
          Éditer
        </Button>
        <Button
          component="a"
          variant="light"
          href="/?edit"
          leftSection={<FiPlusSquare />}
        >
          Créer
        </Button>
        <Button leftSection={<FiMail />} variant="light" onClick={open}>
          Partager par email
        </Button>
      </Flex>

      <Modal
        opened={opened}
        onClose={close}
        title="Partager le compte à rebours"
        size="auto"
      >
        <InviteForm onCancel={close} onSubmit={onSendInvitation} />
      </Modal>
    </Stack>
  ) : (
    <Editor defaultValues={params} />
  );
}

export default App;
