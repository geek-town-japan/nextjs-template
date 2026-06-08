import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { LoginForm } from "./login-form"

const meta = {
  title: "Features/Auth/LoginForm",
  component: LoginForm,
  parameters: {
    layout: "fullscreen"
  },
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <main className="flex min-h-screen items-center justify-center p-4">
        <Story />
      </main>
    )
  ]
} satisfies Meta<typeof LoginForm>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}
