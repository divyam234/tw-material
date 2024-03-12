/* eslint-disable jsx-a11y/no-autofocus */
import React from "react";
import {Meta} from "@storybook/react";
import {popover} from "./theme";

import {Popover, PopoverTrigger, PopoverContent, PopoverProps} from "./index";
import { Button } from "../button";

export default {
  title: "Components/Popover",
  component: Popover,
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
} as Meta<typeof Popover>;

const defaultProps = {
  ...popover.defaultVariants,
  placement: "top",
  offset: 7,
  defaultOpen: false,
  disableAnimation: false,
};

const content = (
  <PopoverContent>
    <div className="px-1 py-2">
      <div className="text-sm font-bold">Popover Content</div>
      <div className="text-xs">This is a content of the popover</div>
    </div>
  </PopoverContent>
);

const Template = (args: PopoverProps) => {
  return (
    <Popover {...args}>
      <PopoverTrigger>
        <Button disableAnimation={!!args.disableAnimation}>Open Popover</Button>
      </PopoverTrigger>
      {content}
    </Popover>
  );
};

const WithTitlePropsTemplate = (args: PopoverProps) => {
  return (
    <Popover {...args}>
      <PopoverTrigger>
        <Button disableAnimation={!!args.disableAnimation}>Open Popover</Button>
      </PopoverTrigger>
      <PopoverContent>
        {(titleProps) => (
          <div className="px-1 py-2">
            <h3 className="text-sm font-bold" {...titleProps}>
              Popover Content
            </h3>
            <div className="text-xs">This is a content of the popover</div>
          </div>
        )}
      </PopoverContent>
    </Popover>
  );
};

const OpenChangeTemplate = (args: PopoverProps) => {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <div className="flex flex-col gap-2">
      <Popover
        {...args}
        style={{
          zIndex: 10,
        }}
        onOpenChange={(open) => setIsOpen(open)}
      >
        <PopoverTrigger>
          <Button>Open Popover</Button>
        </PopoverTrigger>
        <PopoverContent>
          <div className="px-1 py-2">
            <div className="text-sm font-bold">Popover Content</div>
            <div className="text-xs">This is a content of the popover</div>
          </div>
        </PopoverContent>
      </Popover>
      <p className="text-sm">isOpen: {isOpen ? "true" : "false"}</p>
    </div>
  );
};

const PlacementsTemplate = (args: PopoverProps) => {

  return (
    <div className="inline-grid grid-cols-3 gap-4">
      <Popover {...args} placement="top-start">
        <PopoverTrigger>
          <Button  variant="elevated">
            Top Start
          </Button>
        </PopoverTrigger>
        {content}
      </Popover>

      <Popover {...args}>
        <PopoverTrigger>
          <Button  variant="elevated">
            Top
          </Button>
        </PopoverTrigger>
        {content}
      </Popover>

      <Popover {...args} placement="top-end">
        <PopoverTrigger>
          <Button  variant="elevated">
            Top End
          </Button>
        </PopoverTrigger>
        {content}
      </Popover>

      <Popover {...args} placement="bottom-start">
        <PopoverTrigger>
          <Button  variant="elevated">
            Bottom Start
          </Button>
        </PopoverTrigger>
        {content}
      </Popover>

      <Popover {...args} placement="bottom">
        <PopoverTrigger>
          <Button  variant="elevated">
            Bottom
          </Button>
        </PopoverTrigger>
        {content}
      </Popover>

      <Popover {...args} placement="bottom-end">
        <PopoverTrigger>
          <Button  variant="elevated">
            Bottom End
          </Button>
        </PopoverTrigger>
        {content}
      </Popover>

      <Popover {...args} placement="right-start">
        <PopoverTrigger>
          <Button  variant="elevated">
            Right Start
          </Button>
        </PopoverTrigger>
        {content}
      </Popover>

      <Popover {...args} placement="right">
        <PopoverTrigger>
          <Button  variant="elevated">
            Right
          </Button>
        </PopoverTrigger>
        {content}
      </Popover>

      <Popover {...args} placement="right-end">
        <PopoverTrigger>
          <Button  variant="elevated">
            Right End
          </Button>
        </PopoverTrigger>
        {content}
      </Popover>

      <Popover {...args} placement="left-start">
        <PopoverTrigger>
          <Button  variant="elevated">
            Left Start
          </Button>
        </PopoverTrigger>
        {content}
      </Popover>

      <Popover {...args} placement="left">
        <PopoverTrigger>
          <Button  variant="elevated">
            Left
          </Button>
        </PopoverTrigger>
        {content}
      </Popover>

      <Popover {...args} placement="left-end">
        <PopoverTrigger>
          <Button  variant="elevated">
            Left End
          </Button>
        </PopoverTrigger>
        {content}
      </Popover>
    </div>
  );
};

const OffsetTemplate = (args: PopoverProps) => (
  <div className="flex gap-2">
    <Popover {...args}>
      <PopoverTrigger>
        <Button>
          Default offset (7)
        </Button>
      </PopoverTrigger>
      {content}
    </Popover>
    <Popover {...args} offset={15}>
      <PopoverTrigger>
        <Button>
          15 offset
        </Button>
      </PopoverTrigger>
      {content}
    </Popover>
    <Popover {...args} offset={-7}>
      <PopoverTrigger>
        <Button>
          -7 offset
        </Button>
      </PopoverTrigger>
      {content}
    </Popover>
  </div>
);

const WithFormTemplate = (args: PopoverProps) => (
  <Popover {...args}>
    <PopoverTrigger>
      <Button>Open Popover</Button>
    </PopoverTrigger>
    <PopoverContent>
      {(titleProps) => (
        <div className="px-1 py-2 w-full">
          <p className="text-sm font-bold text-foreground" {...titleProps}>
            Dimensions
          </p>
        </div>
      )}
    </PopoverContent>
  </Popover>
);

const BackdropsTemplate = (args: PopoverProps) => {
  const backdrops: PopoverProps["backdrop"][] = ["opaque", "blur", "transparent"];

  const content = (
    <PopoverContent className="w-[240px]">
      {(titleProps) => (
        <div className="px-1 py-2 w-full">
          <p className="text-small font-bold text-foreground" {...titleProps}>
            Dimensions
          </p>
        </div>
      )}
    </PopoverContent>
  );

  return (
    <div className="flex flex-wrap gap-4">
      {backdrops.map((backdrop) => (
        <Popover
          key={backdrop}
          showArrow
          offset={10}
          placement="bottom"
          {...args}
          backdrop={backdrop}
        >
          <PopoverTrigger>
            <Button className="capitalize"  variant="elevated">
              {backdrop}
            </Button>
          </PopoverTrigger>
          {content}
        </Popover>
      ))}
    </div>
  );
};

const WithBackdropTemplate = (args: PopoverProps) => (
      <Popover {...args}>
        <PopoverTrigger>
          <Button  radius="full">
            Open Popover
          </Button>
        </PopoverTrigger>
        <PopoverContent>
          {(titleProps) => (
            <div className="px-1 py-2 w-full">
              <p className="text-sm font-bold text-foreground" {...titleProps}>
                Dimensions
              </p>
              <div className="mt-2 flex flex-col gap-2 w-full">
              </div>
            </div>
          )}
        </PopoverContent>
      </Popover>
);

export const Default = {
  render: Template,

  args: {
    ...defaultProps,
  },
};

export const DisableAnimation = {
  render: Template,

  args: {
    ...defaultProps,
    disableAnimation: true,
  },
};

export const NonDismissable = {
  render: Template,

  args: {
    ...defaultProps,
    showArrow: true,
    isDismissable: false,
  },
};

export const WithoutScaleTrigger = {
  render: Template,

  args: {
    ...defaultProps,
    triggerScaleOnOpen: false,
  },
};

export const WithArrow = {
  render: Template,

  args: {
    ...defaultProps,
    showArrow: true,
  },
};

export const OpenChange = {
  render: OpenChangeTemplate,

  args: {
    ...defaultProps,
  },
};

export const Placements = {
  render: PlacementsTemplate,

  args: {
    ...defaultProps,
  },
};

export const WithOffset = {
  render: OffsetTemplate,

  args: {
    ...defaultProps,
    color: "warning",
  },
};

export const WithTitleProps = {
  render: WithTitlePropsTemplate,

  args: {
    ...defaultProps,
  },
};

export const WithForm = {
  render: WithFormTemplate,

  args: {
    ...defaultProps,
    showArrow: true,
    offset: 10,
    placement: "top",
    className: "w-[280px] bg-content1",
  },
};

export const Backdrops = {
  render: BackdropsTemplate,

  args: {
    ...defaultProps,
    showArrow: true,
    offset: 10,
    placement: "bottom",
  },
};

export const WithBackdrop = {
  render: WithBackdropTemplate,

  args: {
    ...defaultProps,
    showArrow: true,
    offset: 10,
    placement: "left",
    backdrop: "blur",
  },
};

export const CustomMotion = {
  render: Template,

  args: {
    ...defaultProps,
    placement: "bottom",
    motionProps: {
      variants: {
        enter: {
          opacity: 1,
          duration: 0.2,
        },
        exit: {
          opacity: 0,
          duration: 0.1,
        },
      },
    },
  },
};
