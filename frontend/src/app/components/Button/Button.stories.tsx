import type { Meta, StoryObj } from "@storybook/react"
import { Props } from "./index"
import { Button } from "."
import styles from "../../page.module.css"

const meta: Meta<typeof Button> = {
  component: Button,
  render: (args) => <Button {...args} />,
  args: {
    label: "button",
  },
}

export default meta
type Story = StoryObj<Props>

export const Normal: Story = {}

export const WithLogo: Story = {
  args: {
    logo: <span className={styles.signupFacebookLogo} />,
  },
}

export const Disabled: Story = {
  args: {
    disabled: true,
  },
}
