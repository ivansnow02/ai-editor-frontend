<template>
  <div>
    <a-popover placement="bottom" trigger="click">
      <template #content>
        <ul class="dropdown">
          <li class="dropdown__opeartion" @click="insertRef.showModal()">插入网络视频</li>
          <li class="dropdown__opeartion" @click="uploadRef.showModal()">上传本地视频</li>
        </ul>
      </template>
      <a-tooltip placement="top">
        <template #title>
          <span>视频</span>
        </template>
        <div class="tools__button">
          <VideoCameraOutlined style="font-size: 16px; font-weight: 600" />
        </div>
      </a-tooltip>
    </a-popover>
    <InsertVideo
      ref="insertRef"
      :options="{ title: '网络视频URL', headers }"
      @emitInsert="handleEmit"
    />
    <UploadVideo
      ref="uploadRef"
      :options="{ title: '上传本地视频', headers, fileType: 'video' }"
      @emitUpload="handleEmit"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { VideoCameraOutlined } from '@ant-design/icons-vue'
import { validateUrl } from '@/utils/pattern.ts'

import InsertVideo from './insert-model/index.vue'
import UploadVideo from './upload-model/index.vue'

const emit = defineEmits(['emitVideo'])
const props = defineProps(['editor'])

const headers = [
  {
    formItem: {
      name: 'url',
      rules: [{ required: true, validator: validateUrl, trigger: 'blur' }]
    },
    component: {
      name: 'input',
      placeholder: 'URL of Video'
    }
  }
]

const insertRef = ref()
const uploadRef = ref()
const handleEmit = ({ url }) => {
  props.editor.chain().focus().setVideo({ src: url }).run()
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
