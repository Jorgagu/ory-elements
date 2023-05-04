<template>
  <div v-if="hasOidc" :class="gridStyle({ gap: 32 })">
    <FilterFlowNodes
      :filter="filter"
      :buttonOverrideProps="{ fullWidth: false }"
    />
  </div>
</template>

<script setup lang="ts">
import { SettingsFlow, UiNode } from "@ory/client"
import { ref } from "vue"
import { gridStyle } from "../../../theme"
import { FilterFlowNodes } from "../helpers/filter-flow-nodes"
import { hasOidc } from "../helpers/utils"

type OIDCSettingsProps = {
  flow: SettingsFlow
  title?: string
}

const nodes = ref<UiNode[]>([])
nodes.value = props.flow.ui.nodes

const filter = {
  nodes: nodes.value,
  groups: "oidc",
  withoutDefaultGroup: true,
}

const hasOidc = hasOidc(nodes.value)
</script>
