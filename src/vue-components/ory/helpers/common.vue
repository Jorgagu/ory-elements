<template>
  <message :class="computedColorSprinkle">
    <template v-if="text">{{ text }}&nbsp;</template>
    <button-link :data-testid="dataTestId" :href="url">
      {{ buttonText }}
    </button-link>
  </message>
</template>

<script setup>
import { computed, defineProps } from "vue"
import { colorSprinkle } from "../../../theme"
import { Message } from "../../message"
import { ButtonLink } from "../../button-link"

const props = defineProps({
  text: String,
  url: String,
  buttonText: {
    type: String,
    required: true,
  },
  dataTestId: String,
})

const computedColorSprinkle = computed(() => {
  return colorSprinkle({ color: "foregroundMuted" })
})
</script>
