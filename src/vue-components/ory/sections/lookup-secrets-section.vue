<template>
  <div v-if="hasLookupSecret" :class="gridStyle({ gap: 32 })">
    <FilterFlowNodes :filter="filter" />
  </div>
</template>

<script setup>
import { UiNode } from "@ory/client"
import { gridStyle } from "../../../theme"
import { FilterFlowNodes } from "../helpers/filter-flow-nodes"
import { hasLookupSecret } from "../helpers/utils"

const props = defineProps({
  nodes: {
    type: Array,
    required: true,
  },
})

const hasLookupSecret = hasLookupSecret(props.nodes)

const filter = {
  nodes: props.nodes,
  groups: "lookup_secret",
}
</script>
