<script setup lang="ts">
import { getFileSummary, getStream } from '../apis/generate'
import { computed, inject, ref, type Ref, watch } from 'vue'
import SideBarEditor from './SideBarEditor.vue'
import { getOCRResult } from '@/apis/pic'
import { useEditorStore } from '@/stores/editor'

const Lang = ['英文', '中文', '日语', '法语', '德语', '俄语', '西班牙语']
const Styles = ['原文', '书面语言', '口语', '文言文']
const selectedLang = ref('英文')
const selectedStyle = ref('原文')
const editorStore = useEditorStore()
const TiptapRef = editorStore.editorRef
let editorRef = editorStore.editorRef
const output = ref<'html' | 'json' | 'text'>('html')
const content = TiptapRef?.value?.editor.content
const selection = inject<Ref>('selection')
const ocrURL = inject<Ref>('ocrURL')
const receive = ref('')
const toggle = ref('completion')
watch(
  () => editorStore.editorRef,
  (newVal) => {
    if (newVal) {
      editorRef = newVal
    }
  },
  { immediate: true }
)
//ai functions
// function textInsertContant() {
//   VuetifyTiptapRef?.value?.editor.commands.insertContent("<h1>Hello world</h1>", false);
// }
// function SetStyle() {
//   VuetifyTiptapRef?.value?.editor.commands.setNode('heading', { level: 1 });
// }
// //ai functions
// function Textcompletion() {
//   const value = VuetifyTiptapRef?.value?.editor.getText();
//   aiGetCompletion(value).then((response) => {
//     VuetifyTiptapRef?.value?.editor.commands.insertContent(response.data.data, false);
//   });
// }

// function Textabstraction(word_count: number = 1) {
//   console.log(word_count);
//   const value = VuetifyTiptapRef?.value?.editor.getText();
//   aiGetAbstraction(value, word_count).then((response) => {
//     VuetifyTiptapRef?.value?.editor.commands.setContent(`${value}<p></p>${response.data.data}`, false);
//   });
// }

// function Texttranslation(lang: string = "English") {
//   const value = VuetifyTiptapRef?.value?.editor.getText();
//   aiGetTranslation(value, lang).then((response) => {
//     VuetifyTiptapRef?.value?.editor.commands.setContent(value + "<p></p>" + response.data.data, false);
//   });
// }
// function Textpolish(style: string = "本文原本的") {
//   const value = VuetifyTiptapRef?.value?.editor.getText();
//   aiGetPolish(value, style).then((response) => {
//     VuetifyTiptapRef?.value?.editor.commands.setContent(value + "<p></p>" + response.data.data, false);
//   });
// }
// function Textfix() {
//   const value = VuetifyTiptapRef?.value?.editor.getText();
//   aiGetFix(value).then((response) => {
//     VuetifyTiptapRef?.value?.editor.commands.setContent(value + "<p></p>" + response.data.data);
//   });
// }
const drawer = ref(true)
const rail = inject<Ref>('rail')
//调用流式接口示例，这个是翻译接口，其他接口也可以参考这个示例
// const streamTranslate = async () => {
//   await getStream({
//     input: {
//       human_input: VuetifyTiptapRef?.value?.editor.getHTML(),
//       lang: selectdeLang.value,
//     }
//   },
//     "translate",
//     (data: string) => {
//       VuetifyTiptapRef?.value?.editor.commands.insertContent(data, false);
//     }
//   );
// }
const handleFileTo64Base = (event: Event) => {
  const file = (event.target as HTMLInputElement).files?.[0]
  if (file) {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => {
      const base64String = reader.result as string
      const base64Data = base64String.replace(/^[^,]+,/, '')
      uploadedFile.value = base64Data
    }
  }
}
const insertHTML = (text: string) => {
  // const t = text.replace("<p>", "");
  // console.log(TiptapRef)
  // console.log(editorRef?.getHTML())
  editorRef?.commands.insertContent(text, false)
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
  console.log(response.data.output.output_text)
  receive.value = response.data.output.output_text
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
      const res = response.data.reduce((acc: string, cur: string) => `${acc + cur}\n`, '')
      receive.value = res
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
  if (toggle.value !== 'file_summary' && ocrURL.value === '') {
    return 'text'
  }
  if (toggle.value === 'file_summary' && ocrURL.value === '') {
    return 'file'
  }
  return 'ocr'
})
</script>

<template>
  <a-layout-sider
    :collapsed="rail"
    :trigger="null"
    collapsed-width="0"
    collapsible
    theme="light"
    width="400px"
  >
    <!-- 里面实现ai的功能 -->

    <SideBarEditor v-if="show === 'text'" v-model="selection" />
    <!-- <v-file-input v-if="show === 'file'" clearable label="File input" variant="outlined"
        @change="handleFileTo64Base"></v-file-input> -->
    <a-image v-if="show === 'ocr'" :src="ocrURL"></a-image>
    <button class="btn" @click="generate">生成</button>
    <p></p>
    <v-btn-toggle  v-model="toggle" color="primary" mandatory>
      <button class="btn" value="completion">补全</button>
        <button class="btn" value="translate">翻译</button>
        <button class="btn" value="polish">润色</button>
        <button class="btn"value="fix">纠错</button>
        <button class="btn"></button>
        <button class="btn"></button>
        <v-btn value="translate">翻译</v-btn>
        <v-btn value="polish">润色</v-btn>
        <v-btn value="fix">纠错</v-btn>
        <v-btn value="abstract">总结</v-btn>
        <v-btn value="file_summary">文件总结</v-btn>
      </v-btn-toggle>
    <v-select v-if="toggle === 'translate'" v-model="selectedLang" :items="Lang" label="选择语言"></v-select>
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
    <SideBarEditor v-model="receive" />
    <button class="btn" @click="insertHTML(receive)">插入</button>

  </a-layout-sider>
</template>
<style>
button{
  margin:0;
  padding:0;
}
.btn{
  height: 30px;
  width: 60px;
  box-shadow:0 10px 10px rgba(0, 0, 0, 0.15);
  display: inline-block;
  border-radius: 8px;
  outline: none;
}
.btn:hover{
  height: 30px;
  width: 60px;
  box-shadow:0 10px 10px #D9AFD9;
  display: inline-block;
  color: rgb(56, 97, 230);
  background-color: #D9AFD9;
  background-image: linear-gradient(0deg, #D9AFD9 0%, #97D9E1 100%);
}
.btn:active{
  background-color: #0093E9;
  background-image: linear-gradient(160deg, #0093E9 0%, #80D0C7 100%);
  box-shadow:0 10px 10px #80D0C7;
}
</style>
