<template>
  <div :class="computedCardClass" v-bind="divProps">
    <div :class="gridStyle({ gap: 32 })">
      <template v-if="image">
        <img
          v-if="isStringImage"
          :class="cardTitleImage"
          :src="image"
          :alt="image"
          width="100%"
          height="100%"
        />
        <template v-else>
          <slot name="image"></slot>
        </template>
      </template>

      <div :class="cardTitleStyle">
        <h3 v-if="isStringHeading" :class="computedHeadingClass">
          {{ heading }}
        </h3>
        <template v-else>
          <slot name="heading"></slot>
        </template>
      </div>
      <div>
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from "vue"
import cn from "classnames"
import {
  cardStyle,
  cardTitleImage,
  cardTitleStyle,
  gridStyle,
  typographyStyle,
} from "../theme"

const props = defineProps({
  heading: {
    type: [String, Object],
    required: true,
  },
  image: {
    type: [String, Object],
    required: false,
  },
  className: {
    type: String,
    required: false,
  },
})

const divProps = ref({ ...props })
const heading = props.heading
const image = props.image
const className = props.className
const isStringHeading = typeof heading.value === "string"
const isStringImage = typeof image.value === "string"

const computedCardClass = computed(() => {
  return cn(
    cardStyle(),
    typographyStyle({ type: "regular", size: "small" }),
    className,
  )
})

const computedHeadingClass = computed(() => {
  return typographyStyle({ type: "regular", size: "small" })
})
</script>

<style scoped>
/* Importez vos styles ici, si nécessaire */
</style>
