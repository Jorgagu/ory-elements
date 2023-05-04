<template>
  <div v-if="allMessages.length > 0" :class="computedGridStyle">
    <template v-for="(message, index) in allMessages" :key="index">
      <message
        :data-testid="`ui/message/${message.id}`"
        :severity="message.type"
        v-bind="messageProps"
      >
        {{ message.text }}
      </message>
    </template>
  </div>
</template>

<script setup>
import { computed, defineProps, ref } from "vue"
import { UiNode, UiText } from "@ory/client"
import { GridStyle, gridStyle, Severity } from "../../../theme"
import { Message } from "../../message"

const props = defineProps({
  nodes: Array,
  uiMessages: Array,
  ...GridStyle,
  ...Message,
})

const { gap, direction, ...messageProps } = props

const groupMessages = props.nodes?.reduce((groups, { messages }) => {
  groups.push(
    ...messages
      .map(({ text, id, type }, key) => ({
        text,
        id,
        type,
        key: `node-group-message-${id}-${key}`,
        ...messageProps,
      }))
      .filter(Boolean),
  )
  return groups
}, [])

const messages = props.uiMessages?.map(({ text, id, type }, key) => ({
  text,
  id,
  type,
  key: `ui-messsage-${id}-${key}`,
}))

const allMessages = ref([...(groupMessages || []), ...(messages || [])])

const computedGridStyle = computed(() => {
  return gridStyle({
    gap: gap || 16,
    direction: direction,
  })
})
</script>
