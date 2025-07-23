import type { JSX } from "react";
import { Flex, Group, Stack, Text, Title } from "@mantine/core";
import { DateTime } from "luxon";
import { useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";

type DurationUnitProps = {
  unitLabels: [string, string];
  value: number;
};

function DurationUnit({ unitLabels, value }: DurationUnitProps): JSX.Element {
  const labelIndex = value <= 1 ? 0 : 1;

  return (
    <Group className="gap-3">
      <span className="font-bold">{value}</span>
      <span>{unitLabels[labelIndex]}</span>
    </Group>
  );
}

type CountdownProps = {
  className?: string;
  label: string;
  to: DateTime;
};

export function Countdown({
  className,
  label,
  to,
}: CountdownProps): JSX.Element {
  const [now, setNow] = useState(DateTime.now());
  useEffect(() => {
    const id = setInterval(() => setNow(DateTime.now()), 1000);

    return () => clearInterval(id);
  }, [setNow]);

  const delta = to.diff(now);
  const days = Math.floor(delta.as("days"));
  const hours = Math.floor(delta.as("hours")) % 24;
  const minutes = Math.floor(delta.as("minutes")) % 60;
  const seconds = Math.floor(delta.as("seconds")) % 60;

  return (
    <Stack className={twMerge(className, "text-blue-900")} align="center">
      <Title order={1} className="text-[5rem] text-center leading-none">
        {label}
      </Title>
      <Text className="text-3xl">Il reste</Text>
      <Flex
        direction={{ base: "column", sm: "row" }}
        align="center"
        className="text-5xl gap-3"
      >
        <DurationUnit unitLabels={["jour", "jours"]} value={days} />
        <DurationUnit unitLabels={["heure", "heures"]} value={hours} />
        <DurationUnit unitLabels={["minute", "minutes"]} value={minutes} />
        <DurationUnit unitLabels={["seconde", "secondes"]} value={seconds} />
      </Flex>

      <Text className="text-xl lg:text-3xl">
        Jusqu'au {to.toLocaleString(DateTime.DATE_FULL, { locale: "fr-FR" })}
      </Text>
    </Stack>
  );
}
