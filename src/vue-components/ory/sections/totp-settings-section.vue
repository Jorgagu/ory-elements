<template>
  <div v-if="hasTotp" class="grid" :class="gapStyle">
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
import { FilterFlowNodes } from "../helpers/filter-flow-nodes"
import { hasTotp } from "../helpers/utils"
import { computed } from "vue"

const props = defineProps({
  flow: {
    type: SettingsFlow,
    required: true,
  },
})

const filter = computed(() => ({
  nodes: props.flow.ui.nodes,
  groups: "totp",
  withoutDefaultGroup: true,
}))

const hasTotp = computed(() => hasTotp(props.flow.ui.nodes))

const gapStyle = gridStyle({ gap: 32 })
</script>
