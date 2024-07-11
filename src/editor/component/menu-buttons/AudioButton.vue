<template>
  <div>
    <a-popover placement="bottom" trigger="click">
      <template #content>
        <ul class="dropdown">
          <li class="dropdown__opeartion" @click="insertRef.showModal()">录制音频</li>
          <li class="dropdown__opeartion" @click="uploadRef.showModal()">上传本地音频</li>
        </ul>
      </template>
      <a-tooltip placement="top">
        <template #title>
          <span>音频</span>
        </template>
        <div class="tools__button">
          <AudioOutlined style="font-size: 16px; font-weight: 600" />
        </div>
      </a-tooltip>
    </a-popover>
    <RecordModal
      ref="insertRef"
      :options="{ title: '网络音频URL', headers }"
      @emitInsert="handleEmit"
    />
    <UploadAudio
      ref="uploadRef"
      :options="{ title: '上传本地音频', headers, fileType: 'audio' }"
      @emitUpload="handleEmit"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { AudioOutlined, DeleteOutlined } from '@ant-design/icons-vue'
import { validateUrl } from '@/utils/pattern.ts'

import RecordModal from '@/editor/component/menu-buttons/RecordModal.vue'
import UploadAudio from './upload-model/index.vue'

const emit = defineEmits(['emitAudio'])
const props = defineProps(['editor'])

const headers = [
  {
    formItem: {
      name: 'url',
      rules: [{ required: true, validator: validateUrl, trigger: 'blur' }]
    },
    component: {
      name: 'input',
      placeholder: 'URL of Audio'
    }
  }
]

const insertRef = ref()
const uploadRef = ref()
const handleEmit = ({ url }) => {
  props.editor.chain().focus().setAudio({ src: url }).run()
  uploadRef.value.closeModal()
  insertRef.value.closeModal()
}
</script>
<style lang="scss" scoped>
.dropdown {
  &__opeartion {
    padding: 5px 0;
    cursor: pointer;
    transition: 0.2s;

    &:hover {
      color: #409eff;
    }
  }
}
</style>
