import type { Meta, StoryObj } from "@storybook/react"
import { Presentation } from "./mypage"
import Mypage from "./page"
import { Props } from "./mypage"

const meta: Meta<typeof Presentation> = {
  component: Mypage,
  render: (args) => <Presentation {...args} />,
  args: {
    email: "email",
    fullName: "fullName",
    userName: "userName",
  },
}

export default meta
type Story = StoryObj<Props>

export const Normal: Story = {}
