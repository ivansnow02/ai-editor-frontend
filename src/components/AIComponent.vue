<script setup lang="ts">
import { aiGetCompletion, aiGetAbstraction, aiGetFix, aiGetTranslation, aiGetPolish, getFileSummary } from '../apis/generate';
import { mdiArrowLeftDropCircleOutline, mdiArrowRightDropCircleOutline } from '@mdi/js';
import { computed, inject, ref, watch, type Ref } from 'vue';
import { ActionButton, BaseKit, Bold, createVuetifyProTipTap, defaultBubbleList, Italic, Link, VuetifyTiptap } from 'vuetify-pro-tiptap';
import { getCompletion } from '../apis/generate';
import { streamAiGetAbstraction, streamAiGetCompletion, streamAiGetFix, streamAiGetPolish, streamAiGetTranslation } from '../apis/stream';
import { getStream } from '../apis/generate';
import SideBarEditor from './SideBarEditor.vue';
import { toBase64 } from '@/utils/file2base64';
import { getOCRResult } from '@/apis/pic';
const Lang = ["英文", "中文", "日语", "法语", "德语", "俄语", "西班牙语",];
const Styles = ["原文", "书面语言", "口语", "文言文"];
const selectedLang = ref("英文");
const selectedStyle = ref("原文");

const VuetifyTiptapRef = inject<Ref>('VuetifyTiptapRef');
const output = ref<'html' | 'json' | 'text'>('html');
const content = VuetifyTiptapRef?.value?.editor.content;
const selection = inject<Ref>("selection");
const ocrURL = inject<Ref>("ocrURL");
const receive = ref("");
const toggle = ref("补全");
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
const drawer = ref(true);
const rail = defineModel({
  type: Boolean,
});
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
  const file = (event.target as HTMLInputElement).files?.[0];
  if (file) {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const base64String = reader.result as string;
      const base64Data = base64String.replace(/^[^,]+,/, '');
      uploadedFile.value = base64Data;
    };
  }
};
const insertHTML = (text: string) => {
  // const t = text.replace("<p>", "");
  VuetifyTiptapRef?.value?.editor.commands.insertContent(text, false);
};
type Body = {
  input: {
    human_input?: string;
    lang?: string;
    style?: string;
    files?: unknown;
  };
};
const uploadedFile = ref('');



const fileSummaryInvoke = async () => {
  const body: Body = {
    input: {
      files: uploadedFile.value,
    }
  };
  const response = await getFileSummary(body);
  console.log(response.data.output.output_text);
  receive.value = response.data.output.output_text;
};


const textGenerate = async () => {
  let body: Body = { input: {} };

  body = {
    input: {
      human_input: selection?.value,
    }
  };

  if (toggle.value === "translate") {
    body.input.lang = selectedLang.value;
  }
  if (toggle.value === "polish") {
    body.input.style = selectedStyle.value;
  }
  await getStream(
    body,
    toggle.value,
    (data: string) => {
      receive.value += data;
    }
  );
}

const ocrGenerate = async () => {
  if (ocrURL) {
    await getOCRResult(ocrURL.value).then((response) => {
      const res = response.data.data.reduce((acc: string, cur: string) => `${acc + cur}\n`, '');
      receive.value = res;
    });
  }
}

const generate = async () => {
  receive.value = "";
  switch (show.value) {
    case 'text':
      await textGenerate();
      break;
    case 'file':
      await fileSummaryInvoke();
      break;
    case 'ocr':
      await ocrGenerate();
      break;
  }
  
}

const show = computed(() => {
  if (toggle.value !== 'file_summary' && !ocrURL) {
    return 'text';
  }
  if (toggle.value === 'file_summary' && !ocrURL) {
    return 'file';
  }
    return 'ocr';
});





</script>

<template>

  <v-navigation-drawer location="right" v-model="drawer" :rail="rail" permanent width="400" border="0" app >
    <template v-slot:append>
      <VBtn icon variant="text" @click.stop="rail = !rail">
        <VIcon>{{ rail === true ? `svg:${mdiArrowLeftDropCircleOutline}` : `svg:${mdiArrowRightDropCircleOutline}` }}
        </VIcon>
      </VBtn>
    </template>
    <v-divider></v-divider>

    <!-- 里面实现ai的功能 -->
    <v-container fluid fill-height>
      <v-layout align-center justify-center>
        <v-flex xs12 sm8 md4>
          <v-sheet min-width="360px" max-width="360px" v-if="!rail">
            <!-- <VTextarea v-model="selection" clearable label="Label" variant="solo-filled"></VTextarea> -->
            <SideBarEditor v-model="selection" v-if="show==='text'" />
            <v-file-input clearable label="File input" variant="outlined" v-if="show === 'file'"
            @change="handleFileTo64Base"></v-file-input>
            <v-img :src="ocrURL" v-if="show==='ocr'"></v-img>
            <v-btn-toggle v-model="toggle" color="primary" mandatory v-if="show!=='ocr'">
              <v-btn value="completion">补全</v-btn>
              <v-btn value="translate">翻译</v-btn>
              <v-btn value="polish">润色</v-btn>
              <v-btn value="fix">纠错</v-btn>
              <v-btn value="abstract">总结</v-btn>
              <v-btn value="file_summary">文件总结</v-btn>
            </v-btn-toggle>
            <v-select label="选择语言" :items="Lang" v-model="selectedLang" v-if="toggle === 'translate'"></v-select>
            <v-select label="选择风格" v-if="toggle === 'polish'" :items="Styles" v-model="selectedStyle"></v-select>
            <VBtn class="mb-4" color="secondary" @click="generate"> 生成 </VBtn>


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
            <VBtn class="mb-4" color="secondary" @click="insertHTML(receive)"> 插入 </VBtn>
          </v-sheet>
        </v-flex>
      </v-layout>
    </v-container>

  </v-navigation-drawer>





</template>
<style></style>