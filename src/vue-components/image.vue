<template>
  <div :class="computedWrapperClass">
    <div v-if="title" :class="computedTitleClass">
      {{ title }}
    </div>
    <img v-bind="$attrs" />
  </div>
</template>

<script setup>
import { computed } from "vue"
import cn from "classnames"
import { gridStyle, typographyStyle } from "../theme"

const props = defineProps({
  header: {
    type: String,
    required: false,
  },
  className: {
    type: String,
    required: false,
  },
})

const title = props.header
const computedWrapperClass = computed(() => {
  return cn(props.className, gridStyle({ gap: 4 }))
})

const computedTitleClass = computed(() => {
  return typographyStyle({ size: "small", type: "regular" })
})
</script>
