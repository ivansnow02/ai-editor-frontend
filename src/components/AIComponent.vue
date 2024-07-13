<script setup lang="ts">
import { getFileSummary, getStream } from '../apis/generate'
import { computed, inject, ref, type Ref, watch } from 'vue'
import SideBarEditor from './SideBarEditor.vue'
import { getOCRResult } from '@/apis/pic'
import { useEditorStore } from '@/stores/editor'
import { InboxOutlined, CloseOutlined } from '@ant-design/icons-vue'
import type { UploadProps } from 'ant-design-vue'

const Lang = ['英文', '中文', '日语', '法语', '德语', '俄语', '西班牙语']
const Styles = ['原文', '书面语言', '口语', '文言文']
const selectedLang = ref('英文')
const selectedStyle = ref('原文')
const editorStore = useEditorStore()
let editorRef = editorStore.editorRef
import { h } from 'vue'

const output = ref<'html' | 'json' | 'text'>('html')
const selection = inject<Ref>('selection')
const ocrURL = inject<Ref>('ocrURL')
const receive = ref('')
const toggle = ref('completion')
const funcList = ref([
  { label: '补全', value: 'completion' },
  { label: '翻译', value: 'translate' },
  { label: '润色', value: 'polish' },
  { label: '纠错', value: 'fix' },
  { label: '总结', value: 'abstract' },
  { label: '文件总结', value: 'file_summary' }
])
watch(
  () => editorStore.editorRef,
  (newVal) => {
    if (newVal) {
      editorRef = newVal
    }
  },
  { immediate: true }
)
const fileList = ref<UploadProps['fileList']>([])
const drawer = ref(true)
const rail = inject<Ref>('rail')

const insertHTML = () => {
  editorRef?.commands.insertContent(receive.value, false)
}
type Body = {
  input: {
    human_input?: string
    lang?: string
    style?: string
    files?: unknown
  }
}
const uploadedFile = ref('')

const fileSummaryInvoke = async () => {
  const body: Body = {
    input: {
      files: uploadedFile.value
    }
  }
  const response = await getFileSummary(body)
  receive.value = response.output.output_text
}

const textGenerate = async () => {
  let body: Body = { input: {} }

  body = {
    input: {
      human_input: selection?.value
    }
  }

  if (toggle.value === 'translate') {
    body.input.lang = selectedLang.value
  }
  if (toggle.value === 'polish') {
    body.input.style = selectedStyle.value
  }
  await getStream(body, toggle.value, (data: string) => {
    receive.value += data
  })
}

const ocrGenerate = async () => {
  if (ocrURL) {
    await getOCRResult(ocrURL.value).then((response) => {
      receive.value = response.data.reduce((acc: string, cur: string) => `${acc + cur}\n`, '')
    })
  }
}

const generate = async () => {
  receive.value = ''
  switch (show.value) {
    case 'text':
      await textGenerate()
      break
    case 'file':
      await fileSummaryInvoke()
      break
    case 'ocr':
      await ocrGenerate()
      break
  }
}

const show = computed(() => {
  if (toggle.value !== 'file_summary' && ocrURL?.value === '') {
    return 'text'
  }
  if (toggle.value === 'file_summary' && ocrURL?.value === '') {
    return 'file'
  }
  return 'ocr'
})

const handleUpload = async (info: any) => {
  const file = info.file
  if (file) {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => {
      const base64String = reader.result as string
      uploadedFile.value = base64String.replace(/^[^,]+,/, '')
    }
  }
  fileList.value?.pop()
  fileList.value?.push({
    uid: file.uid,
    name: file.name,
    status: 'done'
  })
}

const handleClose = () => {
  rail.value = true
}
</script>

<template>
  <a-layout-sider :collapsed="rail" :trigger="null" collapsed-width="0" collapsible theme="light" :style="{
      overflow: 'auto',
      position: 'fixed',
      right: 0,
      top: 0,
      bottom: 0,
      marginRight: '5px'
    }" class="ai-component" width="20%">
    <!-- 里面实现ai的功能 -->
    <a-card class="ai-component-card" hoverable title="AI功能" :style="{ overflow: 'auto' }" bodyStyle="padding: 10px;">
      <template #extra>
        <a-button :icon=" h(CloseOutlined)" shape="circle" size="small" type="text" @click="handleClose"></a-button>
      </template>
      <SideBarEditor v-if="show === 'text'" v-model:text="selection" />
      <!-- <v-file-input v-if="show === 'file'" clearable label="File input" variant="outlined"
      @change="handleFileTo64Base"></v-file-input> -->
      <a-image v-if="show === 'ocr'" :src="ocrURL"></a-image>

      <!--      <p></p>-->
      <!--      <v-btn-toggle v-model="toggle" color="primary" mandatory>-->
      <!--        <button class="btn" value="completion">补全</button>-->
      <!--        <button class="btn" value="translate" v-module="toggle">翻译</button>-->
      <!--        <button class="btn" value="polish">润色</button>-->
      <!--        <button class="btn" value="fix">纠错</button>-->
      <!--        <button class="btn" value="abstract">总结</button>-->
      <!--        <button class="btn" value="file_summary">文件总结</button>-->
      <!--      </v-btn-toggle>-->
      <!-- <v-select v-if="toggle=== 'translate'" v-model="selectedLang" :items="Lang" label="选择语言"></v-select> -->

      <a-upload-dragger v-if="show === 'file'" v-model:fileList="fileList" :customRequest="handleUpload">
        <p class="ant-upload-drag-icon">
          <inbox-outlined></inbox-outlined>
        </p>
        <p class="ant-upload-text">拖拽上传</p>
        <p class="ant-upload-hint">
          上传word、pdf、txt文件
        </p>
      </a-upload-dragger>
      <button class="btn" @click="generate">生成</button>
      <a-image v-if="show === 'ocr'" :src="ocrURL"></a-image>
      <!--    <v-btn-toggle v-if="show !== 'ocr'" v-model="toggle" color="primary" mandatory>-->
      <!--      <v-btn value="completion">补全</v-btn>-->
      <!--      <v-btn value="translate">翻译</v-btn>-->
      <!--      <v-btn value="polish">润色</v-btn>-->
      <!--      <v-btn value="fix">纠错</v-btn>-->
      <!--      <v-btn value="abstract">总结</v-btn>-->
      <!--      <v-btn value="file_summary">文件总结</v-btn>-->
      <!--    </v-btn-toggle>-->
      <a-segmented v-if="show !== 'ocr'" v-model:value="toggle" :options="funcList" block>
        <template #label="{ label }">
          <!--        <p>你好</p>-->
          <div style="padding: 4px">
            {{ label }}
          </div>
        </template>
      </a-segmented>
      <!--    <a-select-->
      <!--      v-if="toggle === 'translate'"-->
      <!--      v-model="selectedLang"-->
      <!--      :items="Lang"-->
      <!--      label="选择语言"-->
      <!--    ></a-select>-->
      <a-segmented v-if="toggle === 'translate'" v-model:value="selectedLang" :options="Lang" block />
      <a-segmented v-if="toggle === 'polish'" v-model:value="selectedStyle" :options="Styles" block />
      <!-- <v-select v-if="toggle === 'polish'" v-model="selectedStyle" :items="Styles" label="选择风格"></v-select> -->

      <!-- <VBtn class="mb-4" color="secondary" @click="Textcompletion()"> Completion </VBtn>
            <VBtn class="mb-4" color="secondary" @click="Textabstraction()"> Abstract </VBtn>
            <VBtn class="mb-4" color="secondary" @click="Textpolish(selectedStyle)"> Polish </VBtn>
            <v-select label="选择风格" :items="Styles" v-model="selectedStyle"></v-select>
            <VBtn class="mb-4" color="secondary" @click="Texttranslation(selectdeLang)"> Translate </VBtn>
            <v-select label="选择语言" :items="Lang" v-model="selectdeLang"></v-select>


            <VBtn class="mb-4" color="secondary" @click="Textfix()"> Fix </VBtn>
            <VBtn class="mb-4" color="secondary" @click="" type="file">FileAbstraction</VBtn>
            <VBtn class="mb-4" color="secondary" @click="streamTranslate()"> 流式翻译 </VBtn>


            <VBtn class="mb-4" color="secondary" @click="Textfix()"> Fix </VBtn>
            <VBtn class="mb-4" color="secondary" @click="textInsertContant()">textInsertContant</VBtn>
            <VBtn class="mb-4" color="secondary" @click="SetStyle()">SetStyle</VBtn> -->

      <SideBarEditor v-model:text="receive" />

      <a-button class="btn" color="secondary" @click="insertHTML()"> 插入</a-button>
    </a-card>
  </a-layout-sider>
</template>
<style lang="scss" scoped>
button {
  margin: 0;
  padding: 0;
}

.btn {
  height: 30px;
  width: 60px;
  box-shadow: 0 10px 10px rgba(0, 0, 0, 0.15);
  display: inline-block;
  border-radius: 8px;
  outline: none;
}

.btn:hover {
  height: 30px;
  width: 60px;
  box-shadow: 0 10px 10px #d9afd9;
  display: inline-block;
  color: rgb(56, 97, 230);
  background-color: #d9afd9;
  background-image: linear-gradient(0deg, #d9afd9 0%, #97d9e1 100%);
}

.btn:active {
  background-color: #0093e9;
  background-image: linear-gradient(160deg, #0093e9 0%, #80d0c7 100%);
  box-shadow: 0 10px 10px #80d0c7;
}

$top: 250px;
.ai-component {
  height: calc(100vh - $top);
  margin-top: $top;
  background: none !important;
}

.ai-component-card {
  height: calc(100vh - $top - 30px);
}
</style>
