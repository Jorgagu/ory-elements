<template>
  <div :class="gridStyle({ gap: 32 })" v-if="hasLookupSecret">
    <filter-flow-nodes :filter="filterExcludeAttributes" />
    <filter-flow-nodes
      :filter="filterAttributes"
      :button-override-props="{ fullWidth: false }"
    />
  </div>
</template>

<script setup>
import { computed } from "vue"
import { SettingsFlow } from "@ory/client"
import { gridStyle } from "../../../theme"
import { FilterFlowNodes } from "../helpers/filter-flow-nodes"
import { hasLookupSecret } from "../helpers/utils"

const props = defineProps({
  flow: {
    type: Object,
    required: true,
  },
})

const filter = {
  nodes: props.flow.ui.nodes,
  groups: "lookup_secret",
  withoutDefaultGroup: true,
}

const filterExcludeAttributes = {
  ...filter,
  excludeAttributes: "submit,button",
}

const filterAttributes = {
  ...filter,
  attributes: "submit,button",
}

const hasLookupSecret = computed(() => hasLookupSecret(props.flow.ui.nodes))
</script>
