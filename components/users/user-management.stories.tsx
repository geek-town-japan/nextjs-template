import type { Meta, StoryObj } from "@storybook/nextjs";
import { UserManagementView } from "@/components/users/user-management";

const sampleUsers = [
  {
    id: 1,
    name: "Taro Yamada",
    email: "taro@example.com",
    createdAt: "2026-05-24T07:28:38.988Z",
    updatedAt: "2026-05-24T07:28:38.988Z",
  },
  {
    id: 2,
    name: "Hanako Suzuki",
    email: "hanako@example.com",
    createdAt: "2026-05-24T07:28:39.068Z",
    updatedAt: "2026-05-24T07:28:39.068Z",
  },
];

const meta = {
  title: "Users/UserManagement",
  component: UserManagementView,
  args: {
    users: sampleUsers,
    editingUserId: null,
    notice: null,
    onRefresh: () => {},
    onCreate: async () => {},
    onUpdate: async () => {},
    onDelete: async () => {},
    onEdit: () => {},
    onCancelEdit: () => {},
    onDismissNotice: () => {},
  },
} satisfies Meta<typeof UserManagementView>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Editing: Story = {
  args: {
    editingUserId: 1,
  },
};

export const Empty: Story = {
  args: {
    users: [],
  },
};

export const Error: Story = {
  args: {
    errorMessage: "PostgreSQLの起動とmigrationを確認してください。",
  },
};
