<template>
  <Card
    :class="className"
    :heading="heading"
    :image="cardImage"
    :data-testid="`${flowType}-auth-card`"
  >
    <div :class="gridStyle({ gap: 32 })">
      <Message v-if="subtitle" :severity="'default'">{{ subtitle }}</Message>
      <NodeMessages :uiMessages="flow.ui.messages" />
      <OIDCSection v-if="$oidc" :flow="flow" />
      <div v-if="$flow && !isTwoFactor()">
        <Divider />
        <UserAuthForm
          :flow="flow"
          :submitOnEnter="true"
          :onSubmit="onSubmit"
          :data-testid="`${flowType}-flow`"
        >
          <template v-if="$flow">
            <component
              :is="$flow"
              :nodes="flow.ui.nodes"
              :additionalProps="additionalProps"
            />
            <LoggedInfo v-if="showLoggedAccount" :flow="flow" />
          </template>
        </UserAuthForm>
      </div>
      <div v-if="isTwoFactor()">
        <NodeMessages
          :nodes="
            filterNodesByGroups({
              nodes: flow.ui.nodes,
              groups: ['password', 'webauthn', 'totp', 'lookup_secret'],
            })
          "
        />
        <template v-if="twoFactorFlows()">
          <div v-for="(flow, index) in twoFactorFlows()" :key="index">
            <template v-if="index > 0">
              <Divider />
            </template>
            {{ flow }}
          </div>
        </template>
      </div>
      <div v-if="canShowPasswordless()">
        <Divider />
        <UserAuthForm
          :flow="flow"
          :submitOnEnter="true"
          :onSubmit="onSubmit"
          :data-testid="'passwordless-flow'"
          :formFilterOverride="{
            nodes: flow.ui.nodes,
            attributes: 'hidden',
          }"
        >
          <PasswordlessSection v-if="$passwordless" :flow="flow" />
        </UserAuthForm>
      </div>
      <MessageSection
        v-if="message"
        :text="message.text"
        :buttonText="message.buttonText"
        :url="message.url"
        :dataTestId="message.dataTestId"
      />
    </div>
  </Card>
</template>

<script setup>
import { computed } from "vue"
import { LoginFlow } from "@ory/client"
import { filterNodesByGroups } from "@ory/integrations/ui"

import { gridStyle, typographyStyle } from "../../theme"
import { Card } from "../card"
import { Divider } from "../divider"
import { Message } from "../message"
import { MessageSection } from "./helpers/common"
import { NodeMessages } from "./helpers/error-messages"
import { FilterFlowNodes } from "./helpers/filter-flow-nodes"
import { useScriptNodes } from "./helpers/node-script"
import { SelfServiceFlow } from "./helpers/types"
import {
  UserAuthForm,
  UserAuthFormAdditionalProps,
} from "./helpers/user-auth-form"
import {
  hasHiddenIdentifier,
  hasLookupSecret,
  hasPassword,
  hasTotp,
  hasWebauthn,
} from "./helpers/utils"
import { LinkSection } from "./sections/link-section"
</script>
