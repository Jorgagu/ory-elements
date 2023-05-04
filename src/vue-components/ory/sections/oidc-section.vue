<template>
  <div v-if="hasOidc">
    <div class="grid" :class="gapStyle(32)">
      <div v-if="hasMessages" class="grid" :class="gapStyle(16)">
        <FilterFlowNodes
          :filter="{
            nodes: flow.ui.nodes,
            groups: ['oidc'],
            excludeAttributes: 'submit',
          }"
        />
      </div>
      <FilterFlowNodes
        :filter="{
          nodes: flow.ui.nodes,
          groups: 'oidc',
          attributes: 'submit',
        }"
      />
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue"
import { filterNodesByGroups } from "@ory/integrations/ui"
import { gridStyle } from "../../../theme"
import { FilterFlowNodes } from "../helpers/filter-flow-nodes"
import { SelfServiceFlow } from "../helpers/types"
import { hasOidc } from "../helpers/utils"

const flow = ref < SelfServiceFlow > null

const hasMessages = computed(() =>
  filterNodesByGroups({
    nodes: flow.value.ui.nodes,
    groups: "oidc",
    withoutDefaultGroup: true,
  }).some((node) => node.messages.length > 0),
)

const hasOidc = computed(() => hasOidc(flow.value.ui.nodes))

const gapStyle = (gap: number) => gridStyle({ gap })
</script>
