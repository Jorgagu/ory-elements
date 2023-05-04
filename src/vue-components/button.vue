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

<script setup>
import { computed, ref, toRefs } from "vue"
import { ButtonStyle, buttonStyle } from "../theme/button.css"

const props = defineProps({
  header: {
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
  ...toRefs(ButtonStyle),
})

const buttonProps = ref({ ...props })
const title = props.header
const className = props.className
const buttonWidth = computed(() => ({
  width: props.fullWidth ? "100%" : "auto",
}))
const computedButtonStyle = computed(() => buttonStyle(props))
</script>

<style scoped>
/* Importez vos styles ici, si nécessaire */
</style>
