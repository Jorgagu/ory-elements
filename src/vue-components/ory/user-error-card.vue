<template>
  <Card :class="className" :image="cardImage">
    <h2 :class="typographyStyle({ type: 'regular', size: 'small' })">
      {{ title }}
    </h2>
    <div
      :class="gridStyle({ gap: 32, direction: 'column' })"
      data-testid="ui/error/message"
    >
      <Message severity="error">
        An error occurred with the following message:&nbsp;
        <template v-if="status < 500">{{ errorMessage }}</template>
      </Message>
      <template v-if="status >= 500">
        <CodeBox data-testid="code-box">{{ errorMessage }}</CodeBox>
      </template>
      <template v-if="contactSupportEmail">
        <Message :class="colorSprinkle({ color: 'foregroundMuted' })">
          If the problem persists, please contact&nbsp;
          <ButtonLink :href="`mailto:${contactSupportEmail}`">{{
            contactSupportEmail
          }}</ButtonLink>
        </Message>
      </template>
      <Message>
        <ButtonLink :href="backUrl">Go Back</ButtonLink>
      </Message>
    </div>
  </Card>
</template>

<script setup lang="ts">
import { computed } from "vue"
import { FlowError } from "@ory/client"
import { colorSprinkle, gridStyle, typographyStyle } from "../../theme"
// import { ButtonLink } from '../button-link'
// import { Card } from '../card'
// import { CodeBox } from '../codebox'
// import { Message } from '../message'

// SelfServiceErrorCard props
const props = defineProps({
  title: String,
  error: {
    type: Object,
    required: true,
  },
  backUrl: String,
  cardImage: [String, Object],
  contactSupportEmail: String,
  className: String,
})

type errorMessage = {
  id: string
  message: string
  reason: string
  status: string
  code: number
}

const status = computed(() => (props.error.error as errorMessage).code)
const errorMessage = computed(() => {
  const err = props.error.error as errorMessage
  return status.value >= 500 ? JSON.stringify(props.error, null, 2) : err.reason
})
</script>
