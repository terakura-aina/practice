// YourComponent.stories.ts|tsx

import type { Meta, StoryObj } from "@storybook/react"
import { Presentation } from "./mypage"
import Mypage from "./page"
import { Props } from "./mypage"

//👇 This default export determines where your story goes in the story list

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

export const Normal: Story = {
  args: {
    email: "email",
    fullName: "fullName",
    userName: "userName",
  },
}
