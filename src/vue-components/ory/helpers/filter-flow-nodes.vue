<script setup lang="ts">
import { UiNode } from "@ory/client"
import {
  FilterNodesByGroups,
  filterNodesByGroups,
  getNodeInputType,
  isUiNodeInputAttributes,
} from "@ory/integrations/ui"
import { gridStyle } from "../../../theme"
import { Node, NodeOverrideProps } from "./node"

const props = defineProps({
  filter: Object,
  includeCSRF: Boolean,
  ...NodeOverrideProps,
})

const getInputName = (node: UiNode) => {
  return isUiNodeInputAttributes(node.attributes) ? node.attributes.name : ""
}

const nodes = ref(
  filterNodesByGroups(props.filter)
    .filter((node) =>
      getInputName(node) === "csrf_token" && !props.includeCSRF ? false : true,
    )
    .map((node, k) =>
      ["hidden"].includes(getNodeInputType(node.attributes))
        ? {
            props: { node, key: k, ...props },
            hidden: true,
          }
        : {
            props: { node, key: k, ...props },
            hidden: false,
          },
    ),
)

const visibleNodes = nodes.value.filter((node) => !node.hidden)

const computedGridStyle = computed(() => {
  return gridStyle({ gap: 16 })
})
</script>
<template>
  <div v-if="nodes.length > 0">
    <template v-for="(node, index) in nodes" :key="index">
      <Node v-if="node.hidden" v-bind="node.props"></Node>
    </template>
    <div :class="computedGridStyle">
      <template v-for="(node, index) in visibleNodes" :key="index">
        <Node v-bind="node.props"></Node>
      </template>
    </div>
  </div>
</template>
