<template>
  <div v-if="hasPassword" :class="gridStyle({ gap: 32 })">
    <div :class="gridStyle({ gap: 16 })">
      <FilterFlowNodes
        :filter="{
          nodes: nodes,
          groups: ['password'],
          excludeAttributes: 'submit',
        }"
      />
    </div>
    <FilterFlowNodes
      :filter="{
        nodes: nodes,
        groups: ['password'],
        attributes: 'submit',
      }"
    />
  </div>
</template>

<script setup>
import { UiNode } from "@ory/client"
import { ref, computed } from "vue"
import { gridStyle } from "../../../theme"
import { FilterFlowNodes } from "../helpers/filter-flow-nodes"
import { hasPassword } from "../helpers/utils"

const props = defineProps({
  nodes: {
    type: Array,
    required: true,
  },
})

const hasPasswordNodes = computed(() => {
  return hasPassword(props.nodes)
})
</script>
