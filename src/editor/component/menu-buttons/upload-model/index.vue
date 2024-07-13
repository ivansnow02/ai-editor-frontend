<template>
  <a-modal v-model:open="open" :title="options.title">
    <a-form-item>
      <a-upload-dragger
        v-model:fileList="fileList"
        :auto-upload="false"
        :before-upload="beforeUpload"
        :show-upload-list="false"
        name="file"
      >
        <p class="ant-upload-drag-icon">
          <inbox-outlined></inbox-outlined>
        </p>
        <p class="ant-upload-text">Click or drag file to this area to upload</p>
        <p class="ant-upload-hint">
          Support for a single or bulk upload. Strictly prohibit from uploading company data or
          other band files
        </p>
      </a-upload-dragger>
    </a-form-item>
    <slot />
    <template #footer></template>
  </a-modal>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { InboxOutlined } from '@ant-design/icons-vue'
import { message } from 'ant-design-vue'
import { _getBase64 } from '@/utils/index'

const open = ref(false)
const emit = defineEmits(['emitUpload'])
const props = defineProps(['options'])
const { fileType } = props.options

const showModal = () => {
  open.value = true
}
const closeModal = () => {
  open.value = false
}

const fileList = ref([])
const beforeUpload = async (file) => {
  const isVideoType = file.type === 'video/mp4'
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png'
  const isPDF = file.type === 'application/pdf'
  const isPhoto = isJpgOrPng || file.type === 'image/gif' || file.type === 'image/webp'
  const isAudio = file.type === 'audio/mp3' || file.type === 'audio/wav'
  const reg = new RegExp(fileType, 'ig')
  if (!reg.test(file.type)) {
    message.error('请上传视频格式文件')
    return false
  }
  // if (isPhoto) {
  //   // const response = await uploadImg(file)
  //   console.log('pic')
  // }

  if (isVideoType || isPDF || isAudio || isPhoto) {
    const imgBase64 = await _getBase64(file)
    emit('emitUpload', { url: imgBase64 })
  }

  return false
}

defineExpose({
  showModal,
  closeModal
})
</script>

<style lang="scss" scoped></style>
