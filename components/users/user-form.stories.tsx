import type { Meta, StoryObj } from "@storybook/nextjs";
import { UserForm } from "@/components/users/user-form";

const meta = {
  title: "Users/UserForm",
  component: UserForm,
  args: {
    mode: "create",
    onSubmit: async () => {},
  },
} satisfies Meta<typeof UserForm>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Create: Story = {};

export const Update: Story = {
  args: {
    mode: "update",
    defaultValues: {
      name: "Taro Yamada",
      email: "taro@example.com",
    },
    onCancel: () => {},
  },
};

export const Pending: Story = {
  args: {
    pending: true,
  },
};
