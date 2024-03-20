/* eslint-disable jsx-a11y/no-autofocus */
import React from "react";
import {Meta} from "@storybook/react";
import {popover} from "./theme";

import {FloatingPopover,FloatingPopoverContent, FloatingPopoverTrigger} from "./index";
import { Button } from "../button";
export default {
  title: "Components/FloatingPopover",
  component: FloatingPopover,
  argTypes: {
    size: {
      control: {
        type: "select",
      },
      options: ["sm", "md", "lg"],
    },
    radius: {
      control: {
        type: "select",
      },
      options: ["none", "sm", "md", "lg", "full"],
    },
    placement: {
      control: {
        type: "select",
      },
      options: [
        "top",
        "bottom",
        "right",
        "left",
        "top-start",
        "top-end",
        "bottom-start",
        "bottom-end",
        "left-start",
        "left-end",
        "right-start",
        "right-end",
      ],
    },
    backdrop: {
      control: {
        type: "select",
      },
      options: ["transparent", "blur", "opaque"],
    },
    offset: {
      control: {
        type: "number",
      },
    },
    isOpen: {
      control: {
        type: "boolean",
      },
    },
    defaultOpen: {
      control: {
        type: "boolean",
      },
    },
    showArrow: {
      control: {
        type: "boolean",
      },
    },
    disableAnimation: {
      control: {
        type: "boolean",
      },
    },
    children: {
      control: {
        disable: true,
      },
    },
  },
  decorators: [
    (Story) => (
      <div className="flex items-center justify-center w-screen h-screen">
        <Story />
      </div>
    ),
  ],
} as Meta<typeof FloatingPopover>;

const defaultProps = {
  ...popover.defaultVariants,
  // x:100,
  // y:100,
  // isOpen: true,
  backdrop: "blur",
  disableAnimation: false,

};

const content = (
  <FloatingPopoverContent>
    <div className="px-1 py-2">
      <div className="text-sm font-bold">Popover Content</div>
      <div className="text-xs">This is a content of the popover</div>
    </div>
  </FloatingPopoverContent>
);

const Template = (args:any) => {
  return (
    <FloatingPopover {...args}>
      <FloatingPopoverTrigger>
        <Button disableAnimation={!!args.disableAnimation}>Open Popover</Button>
      </FloatingPopoverTrigger>
      {content}
    </FloatingPopover>
  );
};


export const Default = {
  render: Template,
  args: {
    ...defaultProps,
  },
};
