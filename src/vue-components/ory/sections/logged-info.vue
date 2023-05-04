<template>
  <div v-if="identifier" class="identifier">
    You're logged in as:
    <div class="identifier-name">{{ identifier.value }}</div>
  </div>
</template>

<script setup>
import { computed } from "vue"
import { SelfServiceFlow } from "../helpers/types"
import {
  identifierNameStyle,
  identifierStyle,
} from "../../../theme/identifier.css"

const props = defineProps({
  flow: {
    type: Object,
    required: true,
  },
})

const identifier = computed(() => {
  return props.flow.ui.nodes.find(
    (i) => "name" in i.attributes && i.attributes.name === "identifier",
  )?.attributes
})
</script>
