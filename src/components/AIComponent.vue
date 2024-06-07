
<script setup lang="ts">
import { aiGetCompletion, aiGetAbstraction, aiGetFix, aiGetTranslation, aiGetPolish } from '../apis/generate';
import { mdiFountainPenTip, mdiClose, mdiArrowLeftDropCircleOutline, mdiArrowRightDropCircleOutline } from '@mdi/js';
import {ref, type Ref } from 'vue';
import { ActionButton } from 'vuetify-pro-tiptap'
const Lang = ["English", "Chinese", "Jpanese", "French", "German", "Russian", "Spanish",];
const Styles = ["original", "written language", "spoken language", "Classical Chinese"];
const selectdeLang = ref("English");
const selectedStyle = ref("original");


const VuetifyTiptapRef = ref<null | Record<string, any>>(null);
const output = ref<'html' | 'json' | 'text'>('html');
const content = ref('');

//ai functions
function Textcompletion() {
  const value = VuetifyTiptapRef.value?.editor.getText();
  aiGetCompletion(value).then(function (response) {
    VuetifyTiptapRef.value?.editor.commands.setContent(response.data.data, false);
  });
}

function Textabstraction(word_count: number = 1) {
  console.log(word_count);
  const value = VuetifyTiptapRef.value?.editor.getText();
  aiGetAbstraction(value, word_count).then(function (response) {
    VuetifyTiptapRef.value?.editor.commands.setContent(response.data.data, false);
  });
}

function Texttranslation(lang: string = "English") {
  const value = VuetifyTiptapRef.value?.editor.getText();
  aiGetTranslation(value, lang).then(function (response) {
    VuetifyTiptapRef.value?.editor.commands.setContent(response.data.data, false);
  });
}
function Textpolish(style: string = "本文原本的") {
  const value = VuetifyTiptapRef.value?.editor.getText();
  aiGetPolish(value, style).then(function (response) {
    VuetifyTiptapRef.value?.editor.commands.setContent(response.data.data, false);
  });
}
function Textfix() {
  const value = VuetifyTiptapRef.value?.editor.getText();
  aiGetFix(value).then(function (response) {
    VuetifyTiptapRef.value?.editor.commands.setContent(response.data.data);
  });
}
const drawer = ref(true);
const rail = ref(true);
//调用流式接口示例，这个是翻译接口，其他接口也可以参考这个示例
const streamTranslate = async () => {
  await getStream({
    input: {
      human_input: VuetifyTiptapRef.value?.editor.getHTML(),
      lang: selectdeLang.value,
    }
  },
    "translate",
    (data: string) => {
      content.value += data;
    }
  );
}

</script>

<template>

  <v-navigation-drawer location="right" v-model="drawer" :rail="rail" permanent width="400" flat app>
    <template v-slot:append>
      <VBtn icon variant="text" @click.stop="rail = !rail">
        <VIcon>{{ rail === true ? `svg:${mdiArrowLeftDropCircleOutline}` : `svg:${mdiArrowRightDropCircleOutline}` }}
        </VIcon>
      </VBtn>
    </template>
    <v-divider></v-divider>
<!-- 里面实现ai的功能 -->
    <v-sheet min-width="400px" v-if="!rail">
      <VBtn class="mb-4" color="secondary" @click="Textcompletion()"> Completion </VBtn>
      <VBtn class="mb-4" color="secondary" @click="Textabstraction()"> Abstract </VBtn>
      <VBtn class="mb-4" color="secondary" @click="Textpolish(selectedStyle)"> Polish </VBtn>
      <v-select label="选择风格" :items="Styles" v-model="selectedStyle"></v-select>
      <VBtn class="mb-4" color="secondary" @click="Texttranslation(selectdeLang)"> Translate </VBtn>
      <v-select label="选择语言" :items="Lang" v-model="selectdeLang"></v-select>


      <VBtn class="mb-4" color="secondary" @click="Textfix()"> Fix </VBtn>
      <VBtn class="mb-4" color="secondary" @click="" type="file">FileAbstraction</VBtn>
      <VBtn class="mb-4" color="secondary" @click="streamTranslate()"> 流式翻译 </VBtn>
    </v-sheet>
  </v-navigation-drawer>





</template>
<style>

</style>