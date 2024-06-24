<template>
  <a-popover placement="bottom" trigger="click">
    <template #content>
      <ul class="dropdown">
        <li class="dropdown__opeartion" @click="insertRef.showModal()">
          <PaperClipOutlined style="margin-right: 5px" />
          插入URL
        </li>
        <li class="dropdown__opeartion" @click="uploadRef.showModal()">
          <CloudUploadOutlined style="margin-right: 5px" />
          上传图片
        </li>
      </ul>
    </template>
    <a-tooltip placement="top">
      <template #title>
        <span>图片</span>
      </template>
      <div class="tools__button">
        <PictureOutlined style="font-size: 16px; font-weight: 600" />
      </div>
    </a-tooltip>
  </a-popover>
  <InsertImage
    ref="insertRef"
    :options="{ title: '插入图片地址', headers }"
    @emitInsert="handleEmit"
  >
  </InsertImage>
  <UploadImg ref="uploadRef" :options="{ title: '上传图片' }" @emitUpload="handleEmit" />
</template>

<script setup>
import { ref } from 'vue'
import { CloudUploadOutlined, PaperClipOutlined, PictureOutlined } from '@ant-design/icons-vue'
import { validateUrl } from '@/utils/pattern.ts'
import InsertImage from './insert-model/index.vue'
import UploadImg from './upload-model/UploadImg.vue'

const props = defineProps(['editor'])

const headers = [
  {
    formItem: {
      name: 'url',
      rules: [{ required: true, validator: validateUrl, trigger: 'blur' }]
    },
    component: {
      name: 'input',
      placeholder: 'URL of Image'
    }
  }
]

const insertRef = ref()
const uploadRef = ref()
const handleEmit = (fileList) => {
  console.log(fileList)
  for (const file of fileList) {
    if (file.url) {
      props.editor.chain().focus().setImage({ src: file.url }).run()
    }
  }
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
