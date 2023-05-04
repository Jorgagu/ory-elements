<template>
  <div :class="gridStyle({ gap: 32 })" v-if="hasWebauthn">
    <div :class="gridStyle({ gap: 16 })">
      <FilterFlowNodes
        :filter="{
          nodes: flow.ui.nodes,
          groups: ['webauthn'],
          withoutDefaultAttributes: true,
          excludeAttributes: ['hidden', 'button', 'submit'],
        }"
      />
    </div>
    <FilterFlowNodes
      :filter="{
        nodes: flow.ui.nodes,
        groups: ['webauthn'],
        withoutDefaultAttributes: true,
        attributes: ['button', 'submit'],
      }"
    />
  </div>
</template>

<script setup>
import { ref } from "vue"
import { FilterFlowNodes } from "../helpers/filter-flow-nodes"
import { hasWebauthn } from "../helpers/utils"

const flow = ref(props.flow)

const gridStyle = ({ gap }) => {
  return {
    display: "grid",
    gridTemplateColumns: "1fr",
    gap: `${gap}px`,
  }
}

const hasWebauthn = hasWebauthn(flow.value.ui.nodes)
</script>
