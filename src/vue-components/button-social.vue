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

<script setup>
import { computed, ref, toRefs } from "vue"
import cn from "classnames"
import {
  buttonSocialIconEndStyle,
  buttonSocialIconStartStyle,
  ButtonSocialStyle,
  buttonSocialStyle,
} from "../theme/button-social.css"

const props = defineProps({
  header: {
    type: String,
    required: true,
  },
  brand: {
    type: String,
    required: true,
  },
  size: {
    type: String,
    required: false,
  },
  variant: {
    type: String,
    required: false,
  },
  fullWidth: {
    type: Boolean,
    required: false,
  },
  className: {
    type: String,
    required: false,
  },
  ...toRefs(ButtonSocialStyle),
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
    brand.value !== "generic"
      ? `fa-brands fa-${brand.value}`
      : "fa-solid fa-layer-group"
  return cn(brandClass, buttonSocialIconStartStyle(props.size))
})

const computedBrandClassEnd = computed(() => {
  const brandClass =
    brand.value !== "generic"
      ? `fa-brands fa-${brand.value}`
      : "fa-solid fa-layer-group"
  return cn(brandClass, buttonSocialIconEndStyle(props.size))
})
</script>
