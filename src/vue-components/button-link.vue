<template>
  <div :class="computedContainerClass">
    <a :class="buttonLinkStyle()" :href="href" v-bind="anchorProps">
      <i v-if="icon" :class="computedIconClass"></i>
      <slot></slot>
    </a>
  </div>
</template>

<script setup>
import { computed, ref, toRefs } from "vue"
import cn from "classnames"
import { typographyStyle } from "../theme"
import {
  buttonLinkContainerStyle,
  ButtonLinkContainerStyle,
  buttonLinkIconStyle,
  buttonLinkStyle,
} from "../theme/button-link.css"

const props = defineProps({
  children: {
    type: Object,
    required: false,
  },
  href: {
    type: String,
    required: false,
  },
  icon: {
    type: String,
    required: false,
  },
  className: {
    type: String,
    required: false,
  },
  ...toRefs(ButtonLinkContainerStyle),
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
