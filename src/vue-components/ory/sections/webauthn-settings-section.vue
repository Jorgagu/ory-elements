<template>
  <div v-if="hasWebauthn" :class="gridStyle({ gap: 32 })">
    <FilterFlowNodes
      :filter="{
        nodes: flow.ui.nodes,
        groups: ['webauthn'],
        withoutDefaultAttributes: true,
        excludeAttributes: ['hidden', 'button', 'submit'],
      }"
    />
    <FilterFlowNodes
      :filter="{
        nodes: flow.ui.nodes,
        groups: ['webauthn'],
        withoutDefaultAttributes: true,
        attributes: ['button', 'submit'],
      }"
      :buttonOverrideProps="{ fullWidth: false }"
    />
  </div>
</template>

<script setup>
import { ref, computed } from "vue"
import { gridStyle } from "../../../theme"
// import { FilterFlowNodes } from "../helpers/filter-flow-nodes"
import { hasWebauthn } from "../helpers/utils"
import { SettingsFlow } from "@ory/client"

const flow = ref < SettingsFlow > null

const hasWebauthnFlow = computed(() => {
  return hasWebauthn(flow.value.ui.nodes)
})
</script>
