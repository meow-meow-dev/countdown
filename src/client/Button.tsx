import type { ButtonProps } from "@mantine/core";
import type { IconType } from "react-icons/lib";

import {
  Button as ButtonBase,
  createPolymorphicComponent,
} from "@mantine/core";
import { forwardRef } from "react";

type CustomButtonProps = ButtonProps & { Icon: IconType };

export const Button = createPolymorphicComponent<"button", CustomButtonProps>(
  forwardRef<HTMLButtonElement, CustomButtonProps>(
    ({ Icon, ...props }, ref) => (
      <ButtonBase leftSection={<Icon />} variant="light" {...props} ref={ref} />
    )
  )
);
