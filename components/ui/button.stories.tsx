import type { Meta, StoryObj } from "@storybook/nextjs";
import { Edit, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";

const meta = {
  title: "UI/Button",
  component: Button,
  args: {
    children: "Button",
  },
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Outline: Story = {
  args: {
    variant: "outline",
    children: (
      <>
        <Edit aria-hidden="true" className="h-4 w-4" />
        編集
      </>
    ),
  },
};

export const Destructive: Story = {
  args: {
    variant: "destructive",
    children: (
      <>
        <Trash2 aria-hidden="true" className="h-4 w-4" />
        削除
      </>
    ),
  },
};
