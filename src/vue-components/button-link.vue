<template>
  <div :class="computedContainerClass">
    <a :class="buttonLinkStyle()" :href="href" v-bind="anchorProps">
      <i v-if="icon" :class="computedIconClass"></i>
      <slot></slot>
    </a>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref } from "vue"
import cn from "classnames"
import {
  buttonLinkContainerStyle,
  ButtonLinkContainerStyle,
  buttonLinkIconStyle,
  buttonLinkStyle,
  typographyStyle,
} from "../theme"

export interface CustomHref {
  href?: string
  handler: () => void
}

interface Props
  extends Partial<Omit<HTMLAnchorElement, "href"> & ButtonLinkContainerStyle> {
  children?: any
  href?: CustomHref | string
  icon?: string
  className?: string
}

const props = withDefaults(defineProps<Props>(), {
  position: "inline",
})

const anchorProps = ref({ ...props })
const href = props.href
const icon = props.icon
const className = props.className
const position = props.position

const computedContainerClass = computed(() => {
  return cn(
    className,
    typographyStyle({ size: "caption", type: "regular" }),
    buttonLinkContainerStyle({ position }),
  )
})

const computedIconClass = computed(() => {
  return cn(`fa fa-${icon}`, buttonLinkIconStyle)
})
</script>
