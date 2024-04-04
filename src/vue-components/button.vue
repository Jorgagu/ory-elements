<template>
  <div :class="className">
    <button
      :class="computedButtonStyle"
      :style="buttonWidth"
      v-bind="buttonProps"
    >
      {{ title }}
    </button>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref } from "vue"
import { ButtonStyle, buttonStyle } from "../theme"

interface Props extends Partial<HTMLButtonElement & ButtonStyle> {
  header: string
  fullWidth?: boolean
  className?: string
}

const props = withDefaults(defineProps<Props>(), {})

const buttonProps = ref({ ...props })
const title = props.header
const buttonWidth = computed(() => ({
  width: props.fullWidth ? "100%" : "auto",
}))
const computedButtonStyle = computed(() => buttonStyle(props))
</script>

<style scoped>
/* Importez vos styles ici, si nécessaire */
</style>
