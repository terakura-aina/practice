import type { Meta, StoryObj } from "@storybook/react"
import { RegisterForm } from "."

const meta: Meta<typeof RegisterForm> = {
  component: RegisterForm,
  render: () => <RegisterForm />,
}

export default meta
type Story = StoryObj

export const Normal: Story = {
  parameters: {
    nextjs: {
      appDirectory: true,
    },
  },
}
