<template>
  <Card :image="cardImage">
    <form :action="action" method="post">
      <input type="hidden" name="_csrf" :value="csrfToken" />
      <input
        type="hidden"
        name="consent_challenge"
        :value="consent?.challenge"
      />
      <div class="grid gap-16">
        <div class="grid gap-4" style="margin-bottom: 16px">
          <Typography
            >The application requests access to the following
            permissions:</Typography
          >
        </div>
        <div class="grid gap-4">
          <Checkbox
            v-for="scope in requested_scope"
            :key="scope"
            :label="scope"
            :value="scope"
            name="grant_scope"
          />
        </div>
        <div class="grid gap-4">
          <Typography size="xsmall">
            Only grant permissions if you trust this site or app. You do not
            need to accept all permissions.
          </Typography>
        </div>
        <div class="grid direction-row">
          <a
            v-if="client?.policy_uri"
            :href="client.policy_uri"
            target="_blank"
            rel="noreferrer"
          >
            <Typography size="xsmall">Privacy Policy</Typography>
          </a>
          <a
            v-if="client?.tos_uri"
            :href="client.tos_uri"
            target="_blank"
            rel="noreferrer"
          >
            <Typography size="xsmall">Terms of Service</Typography>
          </a>
        </div>
        <Divider />
        <div class="grid gap-8">
          <Checkbox
            label="remember my decision"
            id="remember"
            name="remember"
          />
          <Typography size="xsmall">
            Remember this decision for next time. The application will not be
            able to ask for additional permissions without your consent.
          </Typography>
        </div>
        <div
          class="grid direction-row"
          style="justify-content: space-between; align-items: center"
        >
          <Button
            type="submit"
            id="reject"
            name="consent_action"
            value="reject"
            variant="error"
            header="Deny"
          />
          <Button
            type="submit"
            id="accept"
            name="consent_action"
            value="accept"
            variant="semibold"
            header="Allow"
          />
        </div>
      </div>
    </form>
  </Card>
</template>

<script setup lang="ts">
import { gridStyle } from "../../theme"
import { $ref } from "vue/macros"
// import { Button } from "../components.d.ts"
// import * as Card from "../card"
// import * as Typography from "../typography"
// import * as Checkbox from "../checkbox"
// import * as Divider from "../divider"
import { OAuth2Client, OAuth2ConsentRequest } from "@ory/client"

export const props = defineProps({
  csrfToken: {
    type: String,
    required: true,
  },
  consent: {
    type: Object as () => OAuth2ConsentRequest,
    required: true,
  },
  cardImage: {
    type: [String, Object],
  },
  client_name: {
    type: String,
    default: "Unnamed Client",
  },
  requested_scope: {
    type: Array as () => string[],
    default: () => [],
  },
  client: {
    type: Object as () => OAuth2Client,
  },
  action: {
    type: String,
    required: true,
  },
  className: {
    type: String,
  },
})

const consent = $ref(props.consent)
</script>
