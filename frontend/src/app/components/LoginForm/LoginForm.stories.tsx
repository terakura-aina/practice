import type { Meta, StoryObj } from "@storybook/react"
import { LoginForm } from "."

const meta: Meta<typeof LoginForm> = {
  component: LoginForm,
  render: () => <LoginForm />,
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
