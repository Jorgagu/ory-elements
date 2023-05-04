<template>
  <div :class="computedWrapperClass">
    <input :id="id" type="checkbox" />
    <div :class="computedHeaderClass">
      <div>Toggle content</div>
      <label :for="id">
        <i :class="caretDownClass"></i>
        <i :class="caretUpClass"></i>
      </label>
    </div>
    <pre :class="computedContentClass">
      <slot></slot>
    </pre>
  </div>
</template>

<script setup>
import { computed, ref } from "vue"
import cn from "classnames"
import {
  codeboxContentStyle,
  codeboxHeaderStyle,
  codeboxStyle,
  colorSprinkle,
  gridStyle,
  typographyStyle,
} from "../theme"

const props = defineProps({
  className: {
    type: String,
    required: false,
  },
})

const id = ref(Math.random().toString(36).substring(2))
const computedWrapperClass = computed(() => {
  return cn(props.className, gridStyle({ gap: 16 }), codeboxStyle)
})

const computedHeaderClass = computed(() => {
  return cn(typographyStyle({ size: "small" }), codeboxHeaderStyle)
})

const computedContentClass = computed(() => {
  return cn(colorSprinkle({ color: "accentEmphasis" }), codeboxContentStyle)
})

const caretDownClass = computed(() => {
  return cn("fa fa-caret-down", colorSprinkle({ color: "accentDefault" }))
})

const caretUpClass = computed(() => {
  return cn("fa fa-caret-up", colorSprinkle({ color: "accentDefault" }))
})
</script>
