<template>
  <div
    :data-testid="dataTestid"
    :class="gridStyle({ gap: 4, direction: 'column' })"
  >
    <div :class="computedCheckboxClass">
      <input
        :class="checkboxInputStyle"
        :id="id"
        type="checkbox"
        value="1"
        v-bind="inputProps"
      />
      <template v-if="label">
        <label :for="id">
          <span>{{ label }}</span>
        </label>
      </template>
    </div>
    <template v-if="isStringHelperMessage">
      <Message
        :data-testid="messageTestId"
        :severity="props.severity"
        textPosition="start"
      >
        {{ helperMessage }}
      </Message>
    </template>
    <template v-else>
      <slot name="helperMessage"></slot>
    </template>
  </div>
</template>

<script setup>
import { computed, ref } from "vue"
import cn from "classnames"
import {
  checkboxInputStyle,
  checkboxStyle,
  gridStyle,
  typographyStyle,
} from "../theme"
import Message from "./Message.vue"

const props = defineProps({
  className: {
    type: String,
    required: false,
  },
  label: {
    type: String,
    required: false,
  },
  helperMessage: {
    type: [String, Object],
    required: false,
  },
  messageTestId: {
    type: String,
    required: false,
  },
  dataTestid: {
    type: String,
    required: false,
  },
  ...Message.props,
})

const inputProps = ref({ ...props })
const label = props.label
const helperMessage = props.helperMessage
const messageTestId = props.messageTestId
const dataTestid = props.dataTestid
const id = props.id ?? Math.random().toString(36).substring(2)
const isStringHelperMessage = typeof helperMessage.value === "string"

const computedCheckboxClass = computed(() => {
  return cn(
    props.className,
    typographyStyle({ type: "regular", size: "caption" }),
    checkboxStyle,
  )
})
</script>
