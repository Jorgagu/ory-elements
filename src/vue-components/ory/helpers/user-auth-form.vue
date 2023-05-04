<template>
  <form
    :class="formClasses"
    :action="flow.ui.action"
    :method="flow.ui.method"
    @keydown="handleKeyDown"
    @submit.prevent="handleSubmit"
  >
    <FilterFlowNodes :filter="filter" :nodes="flow.ui.nodes" include-csrf />
    <slot />
  </form>
</template>

<script setup lang="ts">
import { ref, computed, PropType } from "vue"
import {
  UpdateLoginFlowBody,
  UpdateRecoveryFlowBody,
  UpdateRegistrationFlowBody,
  UpdateSettingsFlowBody,
  UpdateVerificationFlowBody,
} from "@ory/client"
import { FilterNodesByGroups } from "@ory/integrations/ui"
import cn from "classnames"

import { formStyle } from "../../../theme"
import FilterFlowNodes from "./filter-flow-nodes"
import { SelfServiceFlow } from "./types"
import { FormEvent } from "react"

const props = defineProps({
  flow: {
    type: Object as PropType<SelfServiceFlow>,
    required: true,
  },
  onSubmit: Function,
  formFilterOverride: Object,
  submitOnEnter: {
    type: Boolean,
    default: true,
  },
  className: String,
})

const formClasses = computed(() => cn(props.className, formStyle))

const filter = computed(
  () =>
    props.formFilterOverride || {
      nodes: props.flow.ui.nodes,
      groups: "default",
      attributes: "hidden",
    },
)

const handleKeyDown = (e: KeyboardEvent) => {
  if (e.key === "Enter" && !props.submitOnEnter) {
    e.stopPropagation()
    e.preventDefault()
  }
}

const handleSubmit = (event: FormEvent) => {
  if (!props.onSubmit) {
    return
  }

  const form = event.target as HTMLFormElement
  const formData = new FormData(form)

  let body = Object.fromEntries(formData) as unknown as
    | UpdateLoginFlowBody
    | UpdateRegistrationFlowBody
    | UpdateRecoveryFlowBody
    | UpdateVerificationFlowBody
    | UpdateSettingsFlowBody

  if ("submitter" in event.nativeEvent) {
    const method = event.nativeEvent.submitter as HTMLInputElement
    body = {
      ...body,
      ...{ [method.name]: method.value },
    }
  }

  props.onSubmit({ body, event })
}
</script>
