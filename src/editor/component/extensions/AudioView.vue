<template>
  <node-view-wrapper :class="['audio-view']" as="div">
    <a-popover>
      <template #content>
        <div class="popover__tools">
          <div class="popover__item" @click="deleteNode()">
            <DeleteOutlined />
          </div>
        </div>
      </template>
      <audio ref="audioRef" :src="src" controls></audio>
    </a-popover>
  </node-view-wrapper>
</template>

<script lang="ts" setup>
import { computed, reactive, ref } from 'vue'
import { nodeViewProps, NodeViewWrapper } from '@tiptap/vue-3'
import { DeleteOutlined } from '@ant-design/icons-vue'

const props = defineProps(nodeViewProps)

const src = computed(() => props.node.attrs.src)

const audioRef = ref()

const updateAttributes = (attrs) => {
  props.updateAttributes(attrs)
}

const deleteNode = () => {
  props.deleteNode()
}
</script>
<style lang="scss" scoped>
.border_trans {
  border: 1px solid transparent;
}

.border_blue {
  border: 1px solid #409eff;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.video-view {
  display: flex;
}

.display-left {
  justify-content: start;
}

.display-center {
  justify-content: center;
}

.display-right {
  justify-content: end;
}

.popover__tools {
  display: flex;
  position: relative;

  .popover__item {
    box-sizing: border-box;
    cursor: pointer;
    padding: 5px 8px;
    transition: 0.2s all;
    border-radius: 2px;
    display: flex;
    align-items: center;

    &:hover {
      background-color: rgba(0, 0, 0, 0.05);
    }
  }
}

.video-resizer {
  position: relative;

  &__handler {
    position: absolute;
    width: 12px;
    height: 12px;
    background-color: #409eff;

    &--tl {
      left: -6px;
      top: -6px;
      cursor: nw-resize;
    }

    &--tr {
      right: -6px;
      top: -6px;
      cursor: ne-resize;
    }

    &--br {
      right: -6px;
      bottom: -6px;
      cursor: se-resize;
    }

    &--bl {
      left: -6px;
      bottom: -6px;
      cursor: sw-resize;
    }
  }
}
</style>
