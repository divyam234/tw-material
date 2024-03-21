import React from "react";
import {Meta} from "@storybook/react";
import {ArrowRightIcon} from "@nextui-org/shared-icons";
import {button} from "@tw-material/theme";

import {Button, ButtonProps} from "../src";

export default {
  title: "Components/Button",
  component: Button,
  argTypes: {
    variant: {
      control: {
        type: "select",
      },
      options: ["elevated", "filled", "filledTonal", "outlined", "text"],
    },
    color: {
      control: {
        type: "select",
      },
      options: ["default", "primary", "secondary", "success", "warning", "danger"],
    },
    size: {
      control: {
        type: "select",
      },
      options: ["sm", "md", "lg"],
    },
    spinnerPlacement: {
      control: {
        type: "select",
      },
      options: ["start", "end"],
    },
    fullWidth: {
      control: {
        type: "boolean",
      },
    },
    radius: {
      control: {
        type: "select",
      },
      options: ["none", "sm", "md", "lg", "full"],
    },
    isDisabled: {
      control: {
        type: "boolean",
      },
    },
    isLoading: {
      control: {
        type: "boolean",
      },
    },
    disableAnimation: {
      control: {
        type: "boolean",
      },
    },
  },
} as Meta<typeof Button>;

const defaultProps = {
  children: "Button",
  ...button.defaultVariants,
};

const StateTemplate = (args: ButtonProps) => {
  const [isOpen, setIsOpen] = React.useState(false);

  const handlePress = () => {
    // eslint-disable-next-line no-console
    console.log("Pressed");
    setIsOpen((prev) => !prev);
  };

  return (
    <Button
      {...args}
      aria-label="Open"
      aria-pressed={isOpen}
      className="text-label-large"
      onPress={handlePress}
    >
      <ArrowRightIcon />
    </Button>
  );
};

export const Default = {
  args: {
    ...defaultProps,
  },
};

export const WithState = {
  render: StateTemplate,

  args: {
    ...defaultProps,
  },
};

export const IsDisabled = {
  args: {
    ...defaultProps,
    isDisabled: true,
  },
};

export const DisableRipple = {
  args: {
    ...defaultProps,
    disableRipple: true,
  },
};

export const CustomWithClassNames = {
  args: {
    ...defaultProps,
    radius: "full",
    className: "bg-gradient-to-tr from-pink-500 to-yellow-500 text-white shadow-lg",
  },
};
