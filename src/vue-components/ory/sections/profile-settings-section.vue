<template>
  <div :class="gridStyle({ gap: 32 })">
    <FilterFlowNodes
      :filter="{ ...filter, excludeAttributes: 'submit,button' }"
    />
    <FilterFlowNodes
      :filter="{ ...filter, attributes: 'submit,button' }"
      :buttonOverrideProps="{ fullWidth: false }"
    />
  </div>
</template>

<script setup lang="ts">
import { SettingsFlow, UiNode } from "@ory/client"
import { gridStyle } from "../../../theme"
import { FilterFlowNodes } from "../helpers/filter-flow-nodes"

interface ProfileSettingsProps {
  flow: SettingsFlow
}

const filter = {
  nodes: props.flow.ui.nodes as UiNode[],
  groups: "profile",
}
</script>
