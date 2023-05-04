<template>
  <nav role="navigation" :class="computedNavClass" v-bind="$attrs">
    <input id="collapse-nav" type="checkbox" />
    <div :class="navSectionTitleClass">
      {{ navTitle }}
      <label for="collapse-nav">
        <i class="fa fa-bars"></i>
        <i class="fa fa-xmark"></i>
      </label>
    </div>
    <ul :class="navMainSectionClass">
      <li
        v-for="(section, index) in navSections"
        :key="index"
        :class="{ [navSectionBottom]: section.floatBottom }"
      >
        <div v-if="section.title" :class="navSectionTitleClass">
          {{ section.title }}
          <i v-if="section.titleIcon" :class="`fa fa-${section.titleIcon}`"></i>
        </div>
        <ul class="navMenuSectionStyle">
          <li
            v-for="(link, linkIndex) in section.links"
            :key="linkIndex"
            :class="{ [navMenuLinkSelectedStyle]: link.selected }"
          >
            <MenuLink :data-testid="link.testId" v-bind="link">
              {{ link.name }}
            </MenuLink>
          </li>
        </ul>
      </li>
    </ul>
  </nav>
</template>

<script setup>
import { computed, defineProps } from "vue"
import cn from "classnames"
import {
  colorSprinkle,
  gridStyle,
  navMainSectionStyle,
  navMenuLinkSelectedStyle,
  navMenuSectionStyle,
  navSectionBottom,
  navSectionTitleStyle,
  navStyle,
  typographyStyle,
} from "../theme"
import MenuLink from "./menu-link.vue"

const props = defineProps({
  navTitle: String,
  navSections: Array,
  className: String,
})

const computedNavClass = computed(() => {
  return cn(navStyle, props.className)
})

const navSectionTitleClass = computed(() => {
  return cn(
    navSectionTitleStyle,
    typographyStyle({ size: "caption" }),
    colorSprinkle({ color: "accentDefault" }),
  )
})

const navMainSectionClass = computed(() => {
  return cn(navMainSectionStyle, navMenuSectionStyle, gridStyle({ gap: 24 }))
})
</script>
