<template>
  <div :class="computedWrapperClass" v-bind="$attrs">
    <a
      :class="computedLinkClass"
      :aria-disabled="disabled"
      :href="!disabled && href"
      :target="target"
    >
      <i v-if="iconLeft" :class="computedIconLeftClass"></i>
      {{ children }}
    </a>
    <i v-if="iconRight" :class="computedIconRightClass"></i>
  </div>
</template>

<script setup>
import { computed, defineProps } from "vue"
import cn from "classnames"
import { colorSprinkle, typographyStyle } from "../theme"
import {
  menuLinkIconLeftStyle,
  menuLinkStyle,
  menuLinkTextStyle,
} from "../theme/menu-link.css"

const props = defineProps({
  href: String,
  children: String,
  target: String,
  disabled: Boolean,
  iconLeft: String,
  iconRight: String,
  className: String,
})

const href = props.href
const children = props.children
const target = props.target
const disabled = props.disabled
const iconLeft = props.iconLeft
const iconRight = props.iconRight

const computedWrapperClass = computed(() => {
  return cn(props.className, menuLinkStyle)
})

const computedLinkClass = computed(() => {
  return cn(
    typographyStyle({ size: "small", type: "regular" }),
    colorSprinkle({
      color: disabled ? "foregroundDisabled" : "foregroundMuted",
    }),
    menuLinkTextStyle,
  )
})

const computedIconLeftClass = computed(() => {
  return cn("fa", `fa-${iconLeft}`, menuLinkIconLeftStyle)
})

const computedIconRightClass = computed(() => {
  return cn(
    `fa`,
    `fa-${iconRight}`,
    colorSprinkle({
      color: disabled ? "foregroundDisabled" : "foregroundMuted",
    }),
  )
})
</script>
