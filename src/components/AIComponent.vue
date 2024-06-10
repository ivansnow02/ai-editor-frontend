
<script setup lang="ts">

import { aiGetCompletion, aiGetAbstraction, aiGetFix, aiGetTranslation, aiGetPolish } from '../apis/generate';
import { mdiFountainPenTip, mdiClose, mdiArrowLeftDropCircleOutline, mdiArrowRightDropCircleOutline } from '@mdi/js';
import { inject, ref, type Ref } from 'vue';
import { ActionButton } from 'vuetify-pro-tiptap';
import '@mdi/font/css/materialdesignicons.css'
import { getCompletion, getStream, getCompletionStream} from '../apis/generate';
import { uploadimg} from '../apis/orc';
import { aiFileSummary, getFileStream } from '@/apis/file_summary'; 
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
const File = ref('')
const binaryfile = ref('')


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

const textFileSummary = () => {
  streamFileFuntcion(File.value)
  responseStoreContent.value = "";
}
const imgUpload = () => {
  uploadimg(binaryfile._value)
}
const handleFileTo64Base = (event) => {
  const file = event.target.files[0];
  if(file) {
    console.log(file.name)
    console.log(file.type)
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const base64String = reader.result;
        const base64Data= base64String.replace(/^[^,]+,/, '');
        File.value = base64Data;
    }
  }
}

const handleFileToBinary = (event) => {
  const file = event.target.files[0];
  console.log(file.type)
  if(file) {
    console.log(file.name)
    console.log(file.type)
      const reader = new FileReader();
      
      reader.readAsArrayBuffer(file)
      const binarData = reader.result;
      console.log(binarData)
      console.log(binarData.type)
      console.log()
      reader.onload = () => {
        
        console.log("nihao")
        
        binaryfile.value = binarData;
        // console.log(binaryfile.type)
        console.log(binaryfile._rawValue)
        console.log(binaryfile._value.type)
       
    }
  }
}

const handleFileUpload = (event) =>  {//get text file
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      const content = e.target.result;
      console.log(content)
      store.upDateContent( content)
      streamFunction("abstract", content)
      if(store.getContent() == ""){
        store.upDateContent(store.getResponseContent())
        console.log(store.getContent())
      }
      responseStoreContent.value = ""
    };
    reader.readAsText(file);
  }
}

const handleImageFile = (event) => {
  const img = event.target.files[0];
  // uplodimg(img).then(function(response){
  //   console.log(response)
  // })
  // const imgReader = new FileReader();
  // imgReader.onload = () => {
  //   const base64String = imgReader.result;
  //   Image.value = base64String;
  // };
  // imgReader.readAsDataURL(img)
}

const orcUpLoadimg = () => {
  // const val= Image.value
  uplodimg(bianrfile).then(function(response){
    console.log(response.data)
  })
  
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
    }
  );
}

const streamFileFuntcion = async(Input: string) => {
  await getFileStream({
    input: {
      files: Input,
    }
  },
    "file_summary",
    (data: string) => {
      responseStoreContent.value += data;
      
    })
}
const testFunction = () =>{
  console.log(File.value)
  console.log(binaryfile);
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
      <VBtn class="mb-4" color="secondary" @click="Textfix()"> Fix </VBtn>
      <p></p>
      <VBtn class="mb-4" color="secondary" @click="Textpolish()"> Polish </VBtn>
      <v-select label="选择风格" :items="Styles" v-model="selectedStyle"></v-select>
      <VBtn class="mb-4" color="secondary" @click="Texttranslation()"> Translate </VBtn>
      <v-select label="选择语言" :items="Lang" v-model="selectdeLang"></v-select>

      
      <VBtn class="mb-4" color="secondary" @click="" type="file">FileAbstraction</VBtn>
      <VBtn class="mb-4" color="secondary" @click="testFunction()">testButton</VBtn>

        <v-file-input
          prepend-icon="mdi-camera"
          class="mb-4"
          label="选择文件生成摘要" 
          @change="handleFileTo64Base"
          counter
          multiple
          show-size
         ></v-file-input>
         <VBtn class="mb-4" color="secondary" @click="textFileSummary()">file_summary</VBtn>
        <v-file-input
          label="ORC读取图片内容"
          @change="handleFileToBinary"
        ></v-file-input>
        <VBtn class="mb-4" color="secondary" @click="imgUpload()">uploadimg</VBtn>
         
        
    </v-sheet>
  </v-navigation-drawer>





</template>
<style>
.lBut{
  width: 120px;
  height: 36px;
  font-size: 14px;
  line-height: 1.15;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 4px;
  padding: 8px 10px;
  margin-left: 28px;
  transition: all 0.5s;
  white-space: nowrap;
  background-color: rgba(72, 169, 166, 1);
  color: white;
  border: 1px solid rgba(72, 169, 166, 1);
}
</style>