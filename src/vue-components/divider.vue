<template>
  <div v-if="text" :class="computedTextClass" v-bind="$attrs">
    {{ text }}
  </div>
  <hr v-else :class="computedDividerClass" v-bind="$attrs" />
</template>

<script setup>
import { computed } from "vue"
import cn from "classnames"
import { dividerStyle, dividerTextStyle } from "../theme"

const props = defineProps({
  className: {
    type: String,
    required: false,
  },
  fullWidth: {
    type: Boolean,
    required: false,
  },
  text: {
    type: String,
    required: false,
  },
})

const computedTextClass = computed(() => {
  return cn(dividerTextStyle, props.className)
})

const computedDividerClass = computed(() => {
  return cn(
    dividerStyle(props.fullWidth ? { sizes: "fullWidth" } : {}),
    props.className,
  )
})
</script>
