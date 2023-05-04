<template>
  <div :class="gridStyle({ gap: 32 })">
    <div :class="gridStyle({ gap: 16 })">
      <FilterFlowNodes :filter="linkNodesFilter" />
    </div>
    <FilterFlowNodes :filter="submitNodesFilter" />
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue"
import { UiNode } from "@ory/client"
import { gridStyle } from "../../../theme"
import { FilterFlowNodes } from "../helpers/filter-flow-nodes"

type LinkSectionProps = {
  nodes: UiNode[]
}

const linkNodesFilter = ref({
  nodes: props.nodes,
  groups: ["link", "code"],
  excludeAttributes: "submit",
})

const submitNodesFilter = ref({
  nodes: props.nodes,
  groups: ["link", "code"],
  attributes: "submit",
})
</script>
