<template>
  <div :class="computedThemeProviderClass" :style="computedStyle">
    <slot></slot>
  </div>
</template>

<script setup>
import { computed, defineProps } from "vue"
import cn from "classnames"
import { assignInlineVars } from "@vanilla-extract/dynamic"
import { defaultDarkTheme, defaultLightTheme, oryTheme } from "../theme"
import {
  themeProviderFontRenderingStyle,
  themeProviderStyle,
} from "../theme/theme-provider.css"

const props = defineProps({
  theme: {
    type: String,
    default: "light",
  },
  themeOverrides: Object,
  enableFontSmoothing: Boolean,
})

const computedThemeProviderClass = computed(() => {
  return cn(
    themeProviderStyle,
    props.enableFontSmoothing && themeProviderFontRenderingStyle,
  )
})

const computedStyle = computed(() => {
  return assignInlineVars(oryTheme, {
    ...(props.theme === "dark" ? defaultDarkTheme : defaultLightTheme),
    ...props.themeOverrides,
  })
})
</script>
