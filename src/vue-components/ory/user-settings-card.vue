<template>
  <div class="grid gap-32">
    <h3
      class="text-headline26 font-regular text-foregroundDefault"
      v-if="cardTitle"
    >
      {{ cardTitle }}
    </h3>
    <UserAuthForm
      :flow="flow"
      :on-submit="onSubmit"
      :class="className"
      data-testid="settings-card"
    >
      <component :is="flowType" :flow="flow" v-if="$flow" />
    </UserAuthForm>
  </div>
</template>

<script setup lang="ts">
import { SettingsFlow } from "@ory/client"
import { defineComponent, computed } from "vue"
import { UserAuthForm } from "./helpers/user-auth-form"
import { useScriptNodes } from "./helpers/node-script"
import {
  hasLookupSecret,
  hasOidc,
  hasPassword,
  hasTotp,
  hasWebauthn,
} from "./helpers/utils"
import LookupSecretSettingsSection from "./sections/lookup-secret-settings-section.vue"
import OIDCSettingsSection from "./sections/oidc-settings-section.vue"
import PasswordSettingsSection from "./sections/password-settings-section.vue"
import ProfileSettingsSection from "./sections/profile-settings-section.vue"
import TOTPSettingsSection from "./sections/totp-settings-section.vue"
import WebAuthnSettingsSection from "./sections/webauthn-settings-section.vue"

export type UserSettingsFlowType =
  | "profile"
  | "password"
  | "totp"
  | "webauthn"
  | "oidc"
  | "lookupSecret"

export interface UserSettingsCardProps {
  flow: SettingsFlow
  flowType: UserSettingsFlowType
  title?: string
  includeScripts?: boolean
  className?: string
  onSubmit?: Function
}

const cardTitle = computed(() => props.title)

const $flow = computed(() => {
  switch (props.flowType) {
    case "profile":
      return <ProfileSettingsSection flow={props.flow} />
    case "password":
      if (hasPassword(props.flow.ui.nodes)) {
        return <PasswordSettingsSection flow={props.flow} />
      }
      break
    case "webauthn":
      if (hasWebauthn(props.flow.ui.nodes)) {
        return <WebAuthnSettingsSection flow={props.flow} />
      }
      break
    case "lookupSecret":
      if (hasLookupSecret(props.flow.ui.nodes)) {
        return <LookupSecretSettingsSection flow={props.flow} />
      }
      break
    case "oidc":
      if (hasOidc(props.flow.ui.nodes)) {
        return <OIDCSettingsSection flow={props.flow} />
      }
      break
    case "totp":
      if (hasTotp(props.flow.ui.nodes)) {
        return <TOTPSettingsSection flow={props.flow} />
      }
      break
  }
  return null
})

if (props.includeScripts) {
  useScriptNodes({ nodes: props.flow.ui.nodes })
}
</script>
