<template>
  <div :class="computedMessageClass" v-bind="$attrs">
    <slot></slot>
  </div>
</template>

<script setup>
import { computed, defineProps } from "vue"
import cn from "classnames"
import { MessageStyle, messageStyle, typographyStyle } from "../theme"

const props = defineProps({
  severity: String,
  textPosition: String,
  className: String,
})

const computedMessageClass = computed(() => {
  return cn(
    messageStyle({
      severity: props.severity,
      textPosition: props.textPosition,
    }),
    typographyStyle({ size: "caption", type: "regular" }),
    props.className,
  )
})
</script>
