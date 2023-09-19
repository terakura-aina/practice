import type { Meta, StoryObj } from "@storybook/react"
import { RegisterForm } from "."
import { within, userEvent } from "@storybook/testing-library"

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

export const Completed: Story = {
  ...Normal,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const emailInput = canvas.getByLabelText("携帯電話番号またはメールアドレス")
    await userEvent.type(emailInput, "example-email@email.com", {
      delay: 100,
    })
    const fullNameInput = canvas.getByLabelText("フルネーム")
    await userEvent.type(fullNameInput, "てらくらあいな", {
      delay: 100,
    })
    const userNameInput = canvas.getByLabelText("ユーザーネーム")
    await userEvent.type(userNameInput, "aina", {
      delay: 100,
    })
    const passwordInput = canvas.getByLabelText("パスワード")
    await userEvent.type(passwordInput, "password", {
      delay: 100,
    })
  },
}
