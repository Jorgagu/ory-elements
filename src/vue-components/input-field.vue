<template>
  <div :class="computedWrapperClass">
    <div v-if="title" :class="computedTitleClass">
      {{ title }}
      <span v-if="required" :class="inputFieldTitleStyle">*</span>
    </div>
    <input
      v-bind="$attrs"
      :class="computedInputClass"
      :style="inputStyle"
      placeholder=" "
    />
    <Message
      v-if="typeofHelperMessageIsString"
      :data-testid="messageTestId"
      :severity="severity"
    >
      {{ helperMessage }}
    </Message>
    <template v-else>
      <slot></slot>
    </template>
  </div>
</template>

<script setup>
import { computed, defineProps } from "vue"
import cn from "classnames"
import {
  gridStyle,
  inputFieldStyle,
  inputFieldTitleStyle,
  typographyStyle,
} from "../theme"
import Message from "./Message.vue"

const props = defineProps({
  header: String,
  helperMessage: [String, Object],
  messageTestId: String,
  fullWidth: Boolean,
  className: String,
  required: Boolean,
  severity: String,
})

const title = props.header
const required = props.required
const severity = props.severity
const messageTestId = props.messageTestId
const helperMessage = props.helperMessage
const fullWidth = props.fullWidth

const computedWrapperClass = computed(() => {
  return cn(props.className, gridStyle({ gap: 4 }))
})

const computedTitleClass = computed(() => {
  return typographyStyle({ size: "small", type: "regular" })
})

const computedInputClass = computed(() => {
  return cn(
    inputFieldStyle,
    typographyStyle({ size: "small", type: "regular" }),
  )
})

const inputStyle = computed(() => {
  return { width: fullWidth ? "100%" : "auto" }
})

const typeofHelperMessageIsString = computed(() => {
  return typeof helperMessage === "string"
})
</script>
