<template>
  <div :class="gridStyle({ gap: 32 })" v-if="hasPassword">
    <div :class="gridStyle({ gap: 16 })">
      <FilterFlowNodes :filter="filter" />
      <ButtonLink
        data-testid="forgot-password-link"
        v-if="forgotPasswordURL"
        :href="forgotPasswordURL"
      >
        Forgot Password?
      </ButtonLink>
    </div>
    <FilterFlowNodes :filter="passwordFilter" />
  </div>
</template>

<script setup>
import { ref, computed } from "vue"
import { UiNode } from "@ory/client"
import { gridStyle } from "../../../theme"
import { ButtonLink } from "../../button-link"
import { FilterFlowNodes } from "../helpers/filter-flow-nodes"
import { hasPassword } from "../helpers/utils"

const props = defineProps({
  nodes: {
    type: Array,
    required: true,
  },
  forgotPasswordURL: {
    type: String,
    default: "",
  },
})

const hasPasswordNodes = ref(false)

const filter = computed(() => ({
  nodes: props.nodes,
  groups: ["default", "password"],
  excludeAttributes: ["submit", "hidden"],
}))

const passwordFilter = computed(() => ({
  nodes: props.nodes,
  groups: ["password"],
  attributes: "submit",
}))

const hasPassword = computed(() => hasPasswordNodes.value)

onMounted(() => {
  hasPasswordNodes.value = hasPassword(props.nodes)
})
</script>
