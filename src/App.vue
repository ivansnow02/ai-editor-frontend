<!--
  * @Date: 2023-05-27 17:21:21
  * @LastEditors: yikoyu 2282373181@qq.com
  * @LastEditTime: 2023-09-09 21:36:31
  * @FilePath: \vuetify-pro-tiptap\examples\App.vue
-->
<script setup lang="ts">
import { computed, ref, unref } from 'vue'
import { useTheme } from 'vuetify'
import { BaseKit, Heading, type VuetifyTiptapOnChange } from 'vuetify-pro-tiptap'

// import CustomLang from './components/CustomLang.vue'
import preview from './extensions/preview'
import completion from './extensions/completion'
import { getCompletion } from './apis/generate'
import { aiGetCompletion, aiGetAbstraction, aiGetFix, aiGetTranslation, aiGetPolish } from './apis/generate'
const extensions = [
  preview.configure({ spacer: true }),
  completion.configure(),
  BaseKit.configure({
    placeholder: {
      placeholder: '请输入...'
    }
  }),
  Heading.configure({
    levels: [1, 2, 3, 4, 5, 6]
  })
]

const theme = useTheme()

const Lang = ["English", "Chinese", "Jpanese", "French", "German", "Russian", "Spanish",]
const Styles = ["original","written language" , "spoken language", "Classical Chinese"]
const selectdeLang = "English"
const selectedStyle = "original"


const VuetifyTiptapRef = ref<null | Record<string, any>>(null)
const output = ref<'html' | 'json' | 'text'>('html')
const content = ref('')
const markdownTheme = ref('')
const outlined = ref(true)
const dense = ref(false)
const editHtml = ref(false)
const hideToolbar = ref(false)
const disableToolbar = ref(false)
const errorMessages = ref(null)
const maxWidth = ref<number>(900)
const maxHeight = ref<number>(900)

// watch(content, val => {
//   console.log('output :>> ', val)
// })

function toggleTheme() {
  theme.global.name.value = theme.global.current.value.dark ? 'light' : 'dark'
}

//ai functions
function Textcompletion(){
  const value = VuetifyTiptapRef.value?.editor.getText();
  aiGetCompletion(value).then(function(response){
    VuetifyTiptapRef.value?.editor.commands.setContent(response.data.data, false)
  })
}

function Textabstraction(word_count: number  = 1){
  console.log(word_count)
  const value = VuetifyTiptapRef.value?.editor.getText();
  aiGetAbstraction(value,word_count).then(function(response){
    VuetifyTiptapRef.value?.editor.commands.setContent(response.data.data, false)
  })
}

function Texttranslation(lang: string = "English"){
  const value = VuetifyTiptapRef.value?.editor.getText();
  aiGetTranslation(value,lang).then(function(response){
    VuetifyTiptapRef.value?.editor.commands.setContent(response.data.data,false)
  })
}
function Textpolish(style: string = "本文原本的"){
  const value = VuetifyTiptapRef.value?.editor.getText();
  aiGetPolish(value, style).then(function(response){
    VuetifyTiptapRef.value?.editor.commands.setContent(response.data.data,false)
  })
}
function Textfix(){
  const value = VuetifyTiptapRef.value?.editor.getText();
  aiGetFix(value).then(function(response){
    VuetifyTiptapRef.value?.editor.commands.setContent(response.data.data)
  })
}
// async function onChangeEditor({ editor, output }: VuetifyTiptapOnChange) {
//   const formData = {
//     input: {
//       human_input: editor.getText()
//     }
//   }
//   if (editor.getText().endsWith('，')) {
//     const result = await getCompletion(formData)
//     console.log('result :>> ', result.data.output)
//   }
// }
</script>
<template>
  <VApp id="app">
    <VContainer>
      <VAlert class="mb-4" type="info" title="Support repository" variant="tonal">
        <template #text>
          <div class="d-flex align-center">
            If you like the repository, you can give us
            <iframe
              class="ms-2"
              src="https://ghbtns.com/github-btn.html?user=ivansnow02&repo=ai-editor-backend&type=star&count=true"
              frameborder="0"
              scrolling="0"
              width="120"
              height="20"
              title="GitHub"
            ></iframe>
          </div>
        </template>
      </VAlert>

      <!-- <VBtn class="mb-4" color="primary" @click="toggleTheme">
        {{ $vuetify.theme.current.dark ? 'dark' : 'light' }}
      </VBtn>

      <VBtn class="mb-4 ms-4" color="primary" @click="locale.setLang('zhHans')"> set Chinese </VBtn>

      <VBtn class="mb-4 ms-4" color="primary" @click="locale.setLang('en')"> set English </VBtn> -->

      <!-- 
      <div class="my-4">
        <VBtn-toggle v-model="markdownTheme" color="deep-purple-accent-3" rounded="0" group>
          <VBtn value=""> Global </VBtn>

          <VBtn value="default"> Default </VBtn>

          <VBtn value="github"> Github </VBtn>

          <VBtn value="maidragon"> Maidragon </VBtn>
        </VBtn-toggle>
      </div> -->

      <!-- <div class="my-4">
        <VBtn-toggle v-model="output" color="deep-purple-accent-3" rounded="0" group>
          <VBtn value="html"> Html </VBtn>

          <VBtn value="json"> Json </VBtn>

          <VBtn value="text"> Text </VBtn>
        </VBtn-toggle>
      </div> -->
      
      <VAlert class="mb-4" type="success" title="aiOrders" variant="tonal">
        <!-- <template #text> -->
          <div class="d-flex align-center">
            <VBtn class="mb-4" color="secondary" @click="Textcompletion()"> Completion </VBtn>
            <VBtn class="mb-4" color="secondary" @click="Textabstraction()"> Abstract </VBtn>
            <VBtn class="mb-4" color="secondary" @click="Textpolish(selectedStyle)"> Polish </VBtn>
            select style: <select id="select" v-model="selectedStyle">
              <option v-for="option in Styles" v-bind:value="option">
              {{ option }}
              </option>
            </select>
            <VBtn class="mb-4" color="secondary" @click="Texttranslation(selectdeLang)"> Translate </VBtn>
            select language: <select id="select" v-model="selectdeLang">
              <option v-for="option in Lang" v-bind:value="option">
              {{ option }}
              </option>
            </select>
            
            <VBtn class="mb-4" color="secondary" @click="Textfix()"> Fix </VBtn>
            <VBtn class="mb-4" color="secondary" @click="" type="file">FileAbstraction</VBtn>
          </div>
        <!-- </template> -->
      </VAlert>
      <!-- <div class="mb-4">
        
      </div> -->
      <!-- <VBtn class="mb-4" color="primary" @click="getHTML"> getHTML </VBtn>

      <VBtn class="mb-4 ms-4" color="primary" @click="getJSON"> getJSON </VBtn>

      <VBtn class="mb-4 ms-4" color="primary" @click="getText"> getText </VBtn> -->

      <!-- <div class="my-4">
        <VDialog :width="maxWidth">
          <template #activator="{ props }">
            <VBtn v-bind="props" class="mb-4" color="primary" text="Viewer" />
          </template>

          <VCard>
            <VCardText>
              <VuetifyViewer :value="content" />
            </VCardText>
          </VCard>
        </VDialog>
      </div> -->

      <VuetifyTiptap
        class="editor"
        ref="VuetifyTiptapRef"
        v-model="content"
        v-model:markdown-theme="markdownTheme"
        label="Title"
        :output="output"
        :hide-toolbar="hideToolbar"
        :disable-toolbar="disableToolbar"
        :outlined="outlined"
        :dense="dense"
        :error-messages="errorMessages"
        rounded
        :max-height="maxHeight"
        :max-width="maxWidth"
        :extensions="extensions"
      />
      <!-- 
      <VDivider class="my-4" />

      <JsonEditorVue v-model="content" read-only height="400px" /> -->
      <!-- <VTextarea :value="content" readonly auto-grow /> -->
      <!-- 
      <VDivider class="my-4" /> -->

      <!-- <VuetifyTiptap
        v-model:markdown-theme="markdownTheme"
        label="Editor 2"
        :outlined="outlined"
        :dense="dense"
        rounded
        :max-height="465"
        :max-width="maxWidth"
        :extensions="extensions"
      /> -->

      <!-- <VDivider class="my-4" />

      <VDivider class="my-4" /> -->
    </VContainer>
  </VApp>
</template>

<style>
.jse-main {
  max-height: auto;
}
.buttons{
  /* z-index: 999; */
  background-color:#fff;
  top: 0;
  left: 0;
  width: 100%;
  height: 80px;
  border: 1px solid skyblue;
  border-radius: 10px;
  padding: 10px;
}
.buttonA{
  margin: 0px;
  border: 0px;
  padding: 0px;
  background-color: aqua;
}

</style>
