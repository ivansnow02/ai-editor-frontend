<template>
  <node-view-wrapper as="div" class="iframe">
    <iframe :src="node.attrs.src" class="iframe__embed" style="border: none"></iframe>
  </node-view-wrapper>
</template>

<script setup>
import { nodeViewProps, NodeViewWrapper } from '@tiptap/vue-3'

const props = defineProps(nodeViewProps)
</script>

<style lang="scss" scoped>
.iframe {
  height: 0;
  padding-bottom: 56.25%;
  position: relative;
  width: 100%;

  &__embed {
    border: 0;
    height: 100%;
    left: 0;
    position: absolute;
    top: 0;
    width: 100%;
  }
}
</style>
