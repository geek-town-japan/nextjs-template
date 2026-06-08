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
      <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
        <div className="w-full max-w-sm">
          <Story />
        </div>
      </div>
    )
  ]
} satisfies Meta<typeof SignupForm>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}
