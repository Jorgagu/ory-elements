import { UiNode, UiNodeScriptAttributes } from "@ory/client"
import { filterNodesByGroups } from "@ory/integrations/ui"
import { onMounted, onBeforeUnmount, defineProps } from "vue"

const props = defineProps({
  nodes: Array,
})

const useScriptNodes = () => {
  let scriptNodes: any[] = []

  onMounted(() => {
    scriptNodes = filterNodesByGroups({
      nodes: props.nodes as UiNode[],
      groups: "webauthn",
      attributes: "text/javascript",
      withoutDefaultGroup: true,
      withoutDefaultAttributes: true,
    }).map((node) => {
      const attr = node.attributes as UiNodeScriptAttributes
      const script = document.createElement("script")
      script.setAttribute("data-testid", `node/script/${script.id}`)
      script.src = attr.src
      script.type = attr.type
      script.async = attr.async
      script.referrerPolicy = attr.referrerpolicy as string
      script.crossOrigin = attr.crossorigin
      script.integrity = attr.integrity
      document.body.appendChild(script)
      return script
    })
  })

  onBeforeUnmount(() => {
    scriptNodes.forEach((script) => {
      document.body.removeChild(script)
    })
  })
}

useScriptNodes()
