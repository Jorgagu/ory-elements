<template>
  <div v-if="isUiNodeImageAttributes(node.attributes)">
    <Image
      :src="node.attributes.src"
      :alt="node.meta.label?.text"
      :data-testid="`node/image/${node.attributes.id}`"
      :header="node.meta.label?.text"
      :width="node.attributes.width"
      :height="node.attributes.height"
    />
  </div>
  <div v-else-if="isUiNodeTextAttributes(node.attributes)">
    <template v-if="node.attributes.text.id === 1050015">
      <div
        class="grid"
        :class="gridStyle({ gap: 4, direction: 'row' })"
        :style="{
          display: 'inline-flex',
          flexWrap: 'wrap',
          gap: pxToRem(48),
          maxWidth: 'fit-content',
          alignItems: 'center',
        }"
        :data-testid="`node/text/${node.attributes.id}`"
      >
        <Typography
          variant="body1"
          :data-testid="`node/text/${node.attributes.id}/label`"
          :style="{ flexBasis: '100%' }"
        >
          {{ node.meta.label?.text }}
        </Typography>
        <pre
          v-for="(secret, index) in (node.attributes.text.context as { secrets: UiText[] }).secrets"
          :key="index"
          :data-testid="`node/text/lookup_secret_codes/text`"
        >
          <template v-if="secret.id === 1050014">
            <del>
              <code>Used</code>
            </del>
          </template>
          <template v-else>
            <code>{{ secret.text }}</code>
          </template>
        </pre>
      </div>
    </template>
    <template v-else>
      <div
        class="grid"
        :class="gridStyle({ gap: 4 })"
        :data-testid="`node/text/${node.attributes.id}`"
      >
        <Typography
          variant="body1"
          :data-testid="`node/text/${node.attributes.id}/label`"
        >
          {{ node.meta.label?.text }}
        </Typography>
        <pre :data-testid="`node/text/${node.attributes.id}/text`">
          <code>{{ node.attributes.text.text }}</code>
        </pre>
      </div>
    </template>
  </div>
  <div v-else-if="isUiNodeInputAttributes(node.attributes)">
    <template
      v-if="
        node.attributes.type === 'button' || node.attributes.type === 'submit'
      "
    >
      <template v-if="isSocial">
        <ButtonSocial
          :class="className"
          :header="getNodeLabel(node)"
          :brand="attrs.value.toLowerCase()"
          variant="semibold"
          size="medium"
          fullWidth
          :disabled="attrs.disabled"
          v-bind="buttonSocialOverrideProps"
          v-bind="submit"
        />
      </template>
      <template v-else>
        <Button
          :class="className"
          :header="getNodeLabel(node)"
          variant="semibold"
          size="medium"
          fullWidth
          :disabled="attrs.disabled"
          v-bind="buttonOverrideProps"
          v-bind="submit"
        />
      </template>
    </template>
    <template
      v-else-if="
        node.attributes.type === 'datetime-local' ||
        node.attributes.type === 'checkbox'
      "
    >
      <Checkbox
        :class="className"
        :label="getNodeLabel(node)"
        :
        name="attrs.name"
        :required="attrs.required"
        :default-value="attrs.value"
        :disabled="attrs.disabled"
        :default-checked="Boolean(attrs.value)"
        :data-testid="`node/input/${attrs.name}`"
        helper-message="<NodeMessages :nodes='[node]' :gap='4' text-position='start' />"
      />
    </template>
    <template v-else>
      <InputField
        :class="className"
        :name="attrs.name"
        :header="getNodeLabel(node)"
        :type="attrs.type"
        :auto-complete="
          attrs.autocomplete || (attrs.name === 'identifier' ? 'username' : '')
        "
        :default-value="attrs.value"
        :required="attrs.required"
        :disabled="attrs.disabled"
        fullWidth
        :data-testid="`node/input/${attrs.name}`"
        helper-message="<NodeMessages :nodes='[node]' :gap='4' text-position='start' />"
      />
    </template>
  </div>
  <div v-else-if="isUiNodeAnchorAttributes(node.attributes)">
    <ButtonLink
      :href="node.attributes.href"
      :title="node.attributes.title.text"
      :data-testid="`node/anchor/${node.attributes.id}`"
      :class="className"
      position="center"
    >
      {{ node.attributes.title.text }}
    </ButtonLink>
  </div>
</template>
<script setup lang="ts">
import { UiNode, UiNodeInputAttributes, UiText } from '@ory/client'
import { getNodeLabel, isUiNodeAnchorAttributes, isUiNodeImageAttributes, isUiNodeInputAttributes, isUiNodeTextAttributes } from '@ory/integrations/ui'
import { MouseEvent } from 'vue'
import { pxToRem } from '../../../common'
import { gridStyle } from '../../../theme'
// import { Button, ButtonProps } from '@/components/button'
// import { ButtonLink } from '@/components/button-link'
// import { ButtonSocial, ButtonSocialProps } from '@/components/button-social'
// import { Checkbox } from '@/components/checkbox'
// import { Image } from '@/components/image'
// import { InputField } from '@/components/input-field'
// import { Typography } from '@/components/typography'
// import { NodeMessages } from './error-messages'

interface ButtonSubmit {
  type: 'submit' | 'reset' | 'button' | undefined
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void
  formNoValidate?: boolean
  name: string
  value: string
}

const props = defineProps<{
  node: UiNode
  className?: string
  buttonOverrideProps?: Partial<ButtonProps>
  buttonSocialOverrideProps?: Partial<ButtonSocialProps>
}>()

const { node, className, buttonOverrideProps, buttonSocialOverrideProps } = props

const isSocial = (attrs: UiNodeInputAttributes) =>
  (attrs.name === 'provider' || attrs.name === 'link') && node.group === 'oidc'

const submit: ButtonSubmit = {
  type: node.attributes.type as 'submit' | 'reset' | 'button' | undefined,
  name: node.attributes.name,
  ...(node.attributes.value && { value: node.attributes.value }),
}

if (node.attributes.type === 'button' || node.attributes.type === 'submit') {
  if (isSocial(node.attributes)) {
    submit.formNoValidate = true
    submit.onClick = (e: MouseEvent<HTMLButtonElement>) => {
      e.currentTarget.type = 'submit'
      e.currentTarget.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }))
    } else if (node.attributes.onclick) {
      const oc = node.attributes.onclick
      submit.onClick = () => {
        eval(oc)
      }
    }

    if (node.meta.label?.id === 1070007 || node.meta.label?.id === 1070008) {
      // on html forms the required flag on an input field will prevent the form from submitting.
      // we disable validation for this form since the resend button does not rely on any input fields
      submit.formNoValidate = true
    }

    return isSocial(node.attributes) ? (
        <ButtonSocial
          class={className}
      header={getNodeLabel(node)}
    brand={node.attributes.value?.toLowerCase()}
    variant="semibold"
    size="medium"
    fullWidth
    disabled={node.attributes.disabled}
    {...buttonSocialOverrideProps}
    {...submit}
    />
  ) : (
      <Button
        class={className}
    header={getNodeLabel(node)}
    variant="semibold"
    size="medium"
    fullWidth
    disabled={node.attributes.disabled}
    {...buttonOverrideProps}
    {...submit}
    />
  )
  } else if (node.attributes.type === 'datetime-local' || node.attributes.type === 'checkbox') {
    return (
      <Checkbox
        class={className}
    label={getNodeLabel(node)}
    name={node.attributes.name}
    required={node.attributes.required}
    defaultValue={node.attributes.value}
    disabled={node.attributes.disabled}
    defaultChecked={Boolean(node.attributes.value)}
    data-testid={`node/input/${node.attributes.name}`}
    helperMessage={
      <NodeMessages nodes={[node]} gap={4} textPosition="start" />
  }
    />
  )
  } else {
    return (
      <InputField
        class={className}
    name={node.attributes.name}
    header={getNodeLabel(node)}
    type={node.attributes.type}
    autoComplete={
      node.attributes.autocomplete ||
        (node.attributes.name === 'identifier' ? 'username' : '')
    }
    defaultValue={node.attributes.value}
    required={node.attributes.required}
    disabled={node.attributes.disabled}
    fullWidth
    data-testid={`node/input/${node.attributes.name}`}
    helperMessage={
      <NodeMessages nodes={[node]} gap={4} textPosition="start" />
  }
    />
  )
  }
} else if (isUiNodeAnchorAttributes(node.attributes)) {
  return (
    <ButtonLink
      href={node.attributes.href}
  title={node.attributes.title.text}
  data-testid={`node/anchor/${node.attributes.id}`}
  class={className}
  position="center"
    >
    {node.attributes.title.text}
    </ButtonLink>
)
}
return null
}
</script>
