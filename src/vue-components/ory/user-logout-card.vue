<template>
  <Card :class="className" :image="cardImage">
    <div class="grid" :class="gridStyle({ gap: 16 })">
      <div
        class="grid"
        :class="gridStyle({ gap: 4 })"
        style="margin-bottom: 16px"
      >
        <Typography>Do you wish to log out?</Typography>
      </div>
      <form :action="action" method="post">
        <input type="hidden" name="_csrf" :value="csrfToken" />
        <input type="hidden" name="challenge" :value="challenge" />
        <div
          class="grid"
          :class="gridStyle({ direction: 'row' })"
          style="justify-content: space-between; align-items: center"
        >
          <Button
            type="submit"
            id="reject"
            name="submit"
            value="No"
            variant="error"
            :header="'No'"
          />
          <Button
            type="submit"
            id="accept"
            name="submit"
            value="Yes"
            variant="semibold"
            :header="'Yes'"
          />
        </div>
      </form>
    </div>
  </Card>
</template>

<script setup lang="ts">
import { gridStyle } from "../../theme"
// import { Button } from "../button.vue"
// import { Card } from "../card"
// import { Typography } from "../typography"

const props = defineProps({
  csrfToken: {
    type: String,
    required: true,
  },
  challenge: {
    type: String,
    required: true,
  },
  action: {
    type: String,
    required: true,
  },
  className: {
    type: String,
    required: false,
  },
  cardImage: {
    type: String,
    required: false,
  },
})

const { csrfToken, challenge, action, className, cardImage } = props
</script>
