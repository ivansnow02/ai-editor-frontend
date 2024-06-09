
<script setup lang="ts">

import { aiGetCompletion, aiGetAbstraction, aiGetFix, aiGetTranslation, aiGetPolish } from '../apis/generate';
import { mdiFountainPenTip, mdiClose, mdiArrowLeftDropCircleOutline, mdiArrowRightDropCircleOutline } from '@mdi/js';
import { inject, ref, type Ref } from 'vue';
import { ActionButton } from 'vuetify-pro-tiptap';
import { getCompletion, getStream, getCompletionStream} from '../apis/generate';
import { useStore } from '@/stores';
import { storeToRefs } from 'pinia';
let store = useStore();
let { storeContent, responseStoreContent} = storeToRefs(store);
const Lang = ["English", "Chinese", "Jpanese", "French", "German", "Russian", "Spanish",];
const Styles = ["original", "written language", "spoken language", "Classical Chinese"];
const selectdeLang = ref("English");
const selectedStyle = ref("original");

// cosnt VuetifyTiptapRef = inject <ref>('VuetifyTiptapRef');
// const VuetifyTiptapRef = ref<null | Record<string, any>>(null);
const output = ref<'html' | 'json' | 'text'>('html');
const content = ref('');


const storeRequest = () => {
  store.upDateContent();
}
const storeResponse = () => {
  // console.log(Test.value)
  console.log(storeContent)
}


//ai functions
// function textInsertContant() {
//   VuetifyTiptapRef.value?.editor.commands.insertContent("<h1>Hello world</h1>", false);
// }

//ai functions
function Textcompletion() {
  streamCompletion();
  responseStoreContent.value = "";
}

function Textabstraction(word_count: number = 1) {
  streamFunction("abstract",storeContent.value)
  responseStoreContent.value = "";
}

function Texttranslation() {
  streamFunction("translate",storeContent.value)
  responseStoreContent.value = "";
}
function Textpolish() {
  streamFunction("polish", storeContent.value)
  responseStoreContent.value = "";
}
function Textfix() {
  streamFunction("fix", storeContent.value)
 responseStoreContent.value = "";
}

const handleFileUpload = (event) =>  {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      const content = e.target.result;
      streamFunction("abstract", content)
      responseStoreContent.value = ""
      console.log(content)
    };
    reader.readAsText(file);
  }
}
const drawer = ref(true);
const rail = ref(true);
//调用流式接口示例，这个是翻译接口，其他接口也可以参考这个示例
const streamFunction = async (fun: string, Input: string) => {
  await getStream({
    input: {
      human_input: Input,
      lang: selectdeLang.value,
      style: selectedStyle.value,
      word_count: 300
    }
  },
    fun,
    (data: string) => {
      responseStoreContent.value += data;
    }
  );
}

const streamCompletion = async () => {
  await getCompletionStream({
    input: {
      human_input: storeContent.value,
      lang: selectdeLang.value,
    }
  },
    "completion",
    (data: string) => {
      responseStoreContent.value += data;
      console.log(data)
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
      <VBtn class="mb-4" color="secondary" @click="Textpolish()"> Polish </VBtn>
      <v-select label="选择风格" :items="Styles" v-model="selectedStyle"></v-select>
      <!-- <VBtn class="mb-4" color="secondary" @click="Texttranslation(selectdeLang)"> Translate </VBtn> -->
      <VBtn class="mb-4" color="secondary" @click="Texttranslation()"> 流式翻译 </VBtn>
      <v-select label="选择语言" :items="Lang" v-model="selectdeLang"></v-select>


      <VBtn class="mb-4" color="secondary" @click="Textfix()"> Fix </VBtn>
      <VBtn class="mb-4" color="secondary" @click="" type="file">FileAbstraction</VBtn>
      <input class="mb-4" color="secondary" type="file" @change="handleFileUpload($event)">


      <VBtn class="mb-4" color="secondary" @click="testFunction()">testButton</VBtn>

    </v-sheet>
  </v-navigation-drawer>





</template>
<style>

</style>