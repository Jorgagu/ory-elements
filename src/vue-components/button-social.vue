<template>
  <div :class="className">
    <button
      :class="computedButtonSocialStyle"
      :style="buttonWidth"
      v-bind="buttonProps"
    >
      <i :class="computedBrandClass"></i>
      {{ title }}
      <i
        :class="computedBrandClassEnd"
        :style="{ visibility: 'hidden', opacity: 0 }"
      ></i>
    </button>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref } from "vue"
import cn from "classnames"
import {
  buttonSocialIconEndStyle,
  buttonSocialIconStartStyle,
  ButtonSocialStyle,
  buttonSocialStyle,
} from "../theme"

interface Props extends Partial<HTMLButtonElement & ButtonSocialStyle> {
  header: string
  brand: string
  fullWidth?: boolean
  className?: string
}

const props = withDefaults(defineProps<Props>(), {
  size: "medium",
})

const buttonProps = ref({ ...props })
const title = props.header
const brand = props.brand
const className = props.className
const buttonWidth = computed(() => ({
  width: props.fullWidth ? "100%" : "auto",
}))
const computedButtonSocialStyle = computed(() => buttonSocialStyle(props))

const computedBrandClass = computed(() => {
  const brandClass =
    brand !== "generic" ? `fa-brands fa-${brand}` : "fa-solid fa-layer-group"
  return cn(brandClass, buttonSocialIconStartStyle({ props }))
})

const computedBrandClassEnd = computed(() => {
  const brandClass =
    brand !== "generic" ? `fa-brands fa-${brand}` : "fa-solid fa-layer-group"
  return cn(brandClass, buttonSocialIconEndStyle(props.size))
})
</script>
