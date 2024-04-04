declare module "ory-elements/vue" {
  export interface GlobalComponents {
    Button: (typeof import("./vue-components/button.vue"))["default"]
    Typography: (typeof import("./vue-components/typography.vue"))["default"]
    InputField: (typeof import("./vue-components/input-field.vue"))["default"]
    Checkbox: (typeof import("./vue-components/checkbox.vue"))["default"]
    Divider: (typeof import("./vue-components/divider.vue"))["default"]
    Card: (typeof import("./vue-components/card.vue"))["default"]
    CardGradient: (typeof import("./vue-components/card-gradient.vue"))["default"]
    MenuLink: (typeof import("./vue-components/menu-link.vue"))["default"]
    Message: (typeof import("./vue-components/message.vue"))["default"]
    Nav: (typeof import("./vue-components/nav.vue"))["default"]
    Provider: (typeof import("./vue-components/provider.vue"))["default"]
    Codebox: (typeof import("./vue-components/codebox.vue"))["default"]
    ButtonSocial: (typeof import("./vue-components/button-social.vue"))["default"]
    ButtonLink: (typeof import("./vue-components/button-link.vue"))["default"]
    CodeBox: (typeof import("./vue-components/codebox.vue"))["default"]
    NodeMessages: (typeof import("./vue-components/ory/helpers/error-messages.vue"))["default"]
  }
}
