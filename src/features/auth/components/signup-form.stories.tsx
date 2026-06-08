import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { SignupForm } from "./signup-form"

const meta = {
  title: "Features/Auth/SignupForm",
  component: SignupForm,
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
} satisfies Meta<typeof SignupForm>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}
