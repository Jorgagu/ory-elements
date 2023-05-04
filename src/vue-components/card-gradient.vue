<template>
  <a
    :class="computedAnchorClass"
    :target="target"
    :aria-disabled="disabled"
    :href="!disabled ? action : undefined"
    v-bind="anchorProps"
  >
    <div :class="computedContentClass">
      <div :class="gridStyle({ gap: 16 })">
        <div v-if="isStringHeading" :class="computedHeadingClass">
          {{ heading }}
        </div>
        <template v-else>
          <slot name="heading"></slot>
        </template>
        <div v-if="isStringContent" :class="computedContentClassText">
          {{ content }}
        </div>
        <template v-else>
          <slot name="content"></slot>
        </template>
      </div>
    </div>
    <i :class="computedArrowClass"></i>
  </a>
</template>

<script setup>
import { computed, ref } from "vue"
import cn from "classnames"
import { colorSprinkle, gridStyle, typographyStyle } from "../theme"
import {
  cardContainer,
  cardGradientActionStyle,
  cardGradientOverlayStyle,
} from "../theme/card-gradient.css"

const props = defineProps({
  heading: {
    type: [String, Object],
    required: true,
  },
  content: {
    type: [String, Object],
    required: true,
  },
  action: {
    type: String,
    required: true,
  },
  target: {
    type: String,
    required: false,
  },
  disabled: {
    type: Boolean,
    required: false,
  },
  className: {
    type: String,
    required: false,
  },
})

const anchorProps = ref({ ...props })
const heading = props.heading
const content = props.content
const action = props.action
const target = props.target
const disabled = props.disabled
const className = props.className
const isStringHeading = typeof heading.value === "string"
const isStringContent = typeof content.value === "string"

const computedAnchorClass = computed(() => {
  return cn(
    cardContainer,
    cardGradientOverlayStyle({ disabled: disabled.value }),
  )
})

const computedContentClass = computed(() => {
  return cn(
    colorSprinkle({
      color: disabled.value ? "foregroundOnDisabled" : "foregroundOnDark",
    }),
    className,
  )
})

const computedHeadingClass = computed(() => {
  return typographyStyle({ size: "headline21", type: "bold" })
})

const computedContentClassText = computed(() => {
  return typographyStyle({ size: "small", type: "regular" })
})

const computedArrowClass = computed(() => {
  return cn(
    `fa fa-arrow-right`,
    cardGradientActionStyle({ disabled: disabled.value }),
  )
})
</script>
