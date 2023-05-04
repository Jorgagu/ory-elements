<template>
  <div>
    <UserAuthCard
      :title="title"
      :flowType="flowType"
      :additionalProps="additionalProps"
      :flow="flow"
    />
  </div>
</template>

<script setup>
import { UserAuthCard } from "./user-auth-card"
import {
  loginFixture,
  loginRefreshFixture,
  loginTwoFactorFixture,
  recoveryFixture,
  registrationFixture,
  verificationFixture,
} from "../../test/fixtures"
import { AuthPage } from "../../test/models/AuthPage"
import { mount } from "@vue/test-utils"

const title = "Sign in"
const flowType = "login"
const additionalProps = {
  forgotPasswordURL: "/forgot",
  signupURL: "/signup",
}
const flow = loginFixture

mount(UserAuthCard, {
  props: {
    title,
    flowType,
    additionalProps,
    flow,
  },
})

const verifyAuthCard = async (component) => {
  const loginComponent = new AuthPage(loginFixture.ui.nodes, component)
  await loginComponent.expectTraitFields()
  await loginComponent.expectTraitLabels()

  expect(component.text()).toContain("Sign in")
  expect(component.text()).toContain("Forgot password?")
  expect(
    component.find('[data-testid="forgot-password-link"]').attributes("href"),
  ).toBe("/forgot")
  expect(component.find('[data-testid="signup-link"]').attributes("href")).toBe(
    "/signup",
  )
  expect(component.text()).toContain("Don't have an account")
}

verifyAuthCard()
</script>
