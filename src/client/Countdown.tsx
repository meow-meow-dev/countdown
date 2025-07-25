import type { JSX } from "react";

import { i18n } from "@lingui/core";
import { plural } from "@lingui/core/macro";
import { Trans } from "@lingui/react/macro";
import { Flex, Group, Text, Title } from "@mantine/core";
import { DateTime } from "luxon";
import { useEffect, useState } from "react";
import { FiCalendar } from "react-icons/fi";
import { twMerge } from "tailwind-merge";

type CountdownProps = {
  className?: string;
  label: string;
  to: DateTime;
};

type DurationUnitProps = {
  unit: "day" | "hour" | "minute" | "second";
  value: number;
};

export function Countdown({
  className,
  label,
  to,
}: CountdownProps): JSX.Element {
  const [now, setNow] = useState(DateTime.now());
  useEffect(() => {
    const id = setInterval(() => setNow(DateTime.now()), 1000);

    return (): void => clearInterval(id);
  }, [setNow]);

  const delta = to.diff(now);
  const days = Math.floor(delta.as("days"));
  const hours = Math.floor(delta.as("hours")) % 24;
  const minutes = Math.floor(delta.as("minutes")) % 60;
  const seconds = Math.floor(delta.as("seconds")) % 60;

  return (
    <div
      className={twMerge(
        "flex flex-col items-center gap-15 text-blue-900 lg:gap-20",
        className
      )}
    >
      <div className="flex flex-col items-center gap-4">
        <Title
          className="text-center text-[4rem] leading-none lg:text-[7rem]"
          order={1}
        >
          {label}
        </Title>

        <div className="flex flex-row items-center gap-2 text-xl lg:gap-5 lg:text-[2rem]">
          <FiCalendar className="text-xl lg:text-[2rem]" />
          <Text className="text-xl lg:text-[2rem]">
            {to.toLocaleString(DateTime.DATE_FULL, { locale: i18n.locale })}
          </Text>
        </div>
      </div>

      <Flex
        align="center"
        className="gap-3 text-5xl"
        direction={{ base: "column", sm: "row" }}
      >
        {days === 0 ? undefined : <DurationUnit unit="day" value={days} />}
        {days === 0 && hours === 0 ? undefined : (
          <DurationUnit unit="hour" value={hours} />
        )}
        {days === 0 && hours === 0 && minutes === 0 ? undefined : (
          <DurationUnit unit="minute" value={minutes} />
        )}
        <DurationUnit unit="second" value={seconds} />
      </Flex>
    </div>
  );
}

function DurationUnit({ unit, value }: DurationUnitProps): JSX.Element {
  const unitLabels = {
    day: plural(value, {
      one: "jour",
      other: "jours",
    }),
    hour: plural(value, {
      one: "heure",
      other: "heures",
    }),
    minute: plural(value, {
      one: "minute",
      other: "minutes",
    }),
    second: plural(value, {
      one: "seconde",
      other: "secondes",
    }),
  };
  const unitLabel = unitLabels[unit];
  console.log({ unitLabels });

  return (
    <Group className="gap-3">
      <Trans>
        <span className="font-bold">{value}</span>
        <span>{unitLabel}</span>
      </Trans>
    </Group>
  );
}
