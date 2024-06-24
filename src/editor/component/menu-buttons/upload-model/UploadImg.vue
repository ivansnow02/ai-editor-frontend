<template>
  <a-modal v-model:open="open" :title="options.title" @ok="handleOK">
    <a-upload
      v-model:file-list="fileList"
      :customRequest="handleUpload"
      list-type="picture-card"
      @preview="handlePreview"
    >
      <div v-if="fileList.length < 8">
        <plus-outlined />
        <div style="margin-top: 8px">Upload</div>
      </div>
    </a-upload>
    <a-modal :footer="null" :open="previewVisible" :title="previewTitle" @cancel="handleCancel">
      <img :src="previewImage" alt="example" style="width: 100%" />
    </a-modal>
  </a-modal>
</template>
<script lang="ts" setup>
import { PlusOutlined } from '@ant-design/icons-vue'
import { ref } from 'vue'
import type { UploadProps } from 'ant-design-vue'
import options from 'axios'
import { getImg, uploadImg } from '@/apis/pic'
import { ROOT_URL } from '@/utils/request'

function getBase64(file: File) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result)
    reader.onerror = (error) => reject(error)
  })
}

const emit = defineEmits(['emitUpload'])
const open = ref(false)
const previewVisible = ref(false)
const previewImage = ref('')
const previewTitle = ref('')
const showModal = () => {
  open.value = true
}
const closeModal = () => {
  open.value = false
}
const fileList = ref<UploadProps['fileList']>([])

const handleCancel = () => {
  previewVisible.value = false
  previewTitle.value = ''
}
const handlePreview = async (file: UploadProps['fileList'][number]) => {
  if (!file.url && !file.preview) {
    file.preview = (await getBase64(file.originFileObj)) as string
  }
  previewImage.value = file.url || file.preview
  previewVisible.value = true
  previewTitle.value = file.name || file.url.substring(file.url.lastIndexOf('/') + 1)
}

async function handleUpload(info) {
  const file = info.file
  console.log(file)
  let formdata = new FormData()
  formdata.append('file', file)
  uploadImg(formdata).then(async (res) => {
    const pk = res.data.id
    const r = await getImg(pk)
    const url = `${ROOT_URL}/${r.data.path}`

    fileList.value?.pop()
    fileList.value?.push({
      uid: file.uid,
      name: file.name,
      status: 'done',
      url: url
    })
    console.log(fileList.value)
  })
}

const handleOK = () => {
  emit('emitUpload', fileList.value)
  closeModal()
}
defineExpose({
  showModal,
  closeModal
})
</script>
<style scoped>
/* you can make up upload button and sample style by using stylesheets */
.ant-upload-select-picture-card i {
  font-size: 32px;
  color: #999;
}

.ant-upload-select-picture-card .ant-upload-text {
  margin-top: 8px;
  color: #666;
}
</style>
