<template>
  <div v-if="hasPassword" :class="gridStyle({ gap: 32 })">
    <FilterFlowNodes
      :filter="{ ...filter, excludeAttributes: 'submit,button' }"
    />
    <FilterFlowNodes
      :filter="{ ...filter, attributes: 'submit,button' }"
      :buttonOverrideProps="{ fullWidth: false }"
    />
  </div>
</template>

<script setup>
import { SettingsFlow } from "@ory/client"
import { gridStyle } from "../../../theme"
import { FilterFlowNodes } from "../helpers/filter-flow-nodes"
import { hasPassword } from "../helpers/utils"

const flow = props.flow
const filter = {
  nodes: flow.ui.nodes,
  groups: "password",
  withoutDefaultGroup: true,
}
const hasPassword = hasPassword(flow.ui.nodes)
</script>

<script>
import { defineComponent } from "vue"

export default defineComponent({
  props: {
    flow: {
      type: SettingsFlow,
      required: true,
    },
  },
})
</script>
