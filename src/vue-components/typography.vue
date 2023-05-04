<template>
  <div :class="computedTypographyClass" v-bind="$attrs">
    <slot></slot>
  </div>
</template>

<script setup>
import { computed, defineProps } from "vue"
import cn from "classnames"
import {
  ColorSprinkle,
  colorSprinkle,
  TypographyStyle,
  typographyStyle,
} from "../theme"

const props = defineProps({
  size: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  color: String,
  className: String,
})

const computedTypographyClass = computed(() => {
  return cn(
    typographyStyle({ size: props.size, type: props.type }),
    colorSprinkle({ color: props.color }),
    props.className,
  )
})
</script>
