<script setup lang="ts">
import { getFileSummary, getStream } from '../apis/generate';
import { computed, inject, ref, type Ref, watch } from 'vue';
import SideBarEditor from './SideBarEditor.vue';
import { getOCRResult } from '@/apis/pic';
import { useEditorStore } from '@/stores/editor';
import { InboxOutlined, CloseOutlined } from '@ant-design/icons-vue';
import type { UploadProps } from 'ant-design-vue';

const Lang = ['英文', '中文'];
const Styles = ['专业', '随意', '文言文', '推文'];
const selectedLang = ref('英文');
const selectedStyle = ref('专业');
const editorStore = useEditorStore();
let editorRef = editorStore.editorRef;
import { h } from 'vue';

const output = ref<'html' | 'json' | 'text'>('html');
const selection = inject<Ref>('selection');
const ocrURL = inject<Ref>('ocrURL');
const receive = ref('');
const toggle = ref('completion');
const funcList = ref([
  { label: '补全', value: 'completion' },
  { label: '翻译', value: 'translate' },
  { label: '润色', value: 'polish' },
  { label: '纠错', value: 'fix' },
  { label: '总结', value: 'abstract' },
  { label: '文件', value: 'file_summary' }
]);
watch(
  () => editorStore.editorRef,
  (newVal) => {
    if (newVal) {
      editorRef = newVal;
    }
  },
  { immediate: true }
);
const fileList = ref<UploadProps['fileList']>([]);
const rail = inject<Ref>('rail');

const insertHTML = () => {
  editorRef?.commands.insertContent(receive.value, false);
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
      files: uploadedFile.value
    }
  };
  const response = await getFileSummary(body);
  receive.value = response.output.output_text;
};

const textGenerate = async () => {
  let body: Body = { input: {} };

  body = {
    input: {
      human_input: selection?.value
    }
  };

  if (toggle.value === 'translate') {
    body.input.lang = selectedLang.value;
  }
  if (toggle.value === 'polish') {
    body.input.style = selectedStyle.value;
  }
  await getStream(body, toggle.value, (data: string) => {
    receive.value += data;
  });
};

const ocrGenerate = async () => {
  if (ocrURL) {
    await getOCRResult(ocrURL.value).then((response) => {
      receive.value = response.data.reduce((acc: string, cur: string) => `${acc + cur}\n`, '');
    });
  }
};

const generate = async () => {
  receive.value = '';
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
};

const show = computed(() => {
  if (toggle.value !== 'file_summary' && ocrURL?.value === '') {
    return 'text';
  }
  if (toggle.value === 'file_summary' && ocrURL?.value === '') {
    return 'file';
  }
  return 'ocr';
});

const handleUpload = async (info: any) => {
  const file = info.file;
  if (file) {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const base64String = reader.result as string;
      uploadedFile.value = base64String.replace(/^[^,]+,/, '');
    };
  }
  fileList.value?.pop();
  fileList.value?.push({
    uid: file.uid,
    name: file.name,
    status: 'done'
  });
};

const handleClose = () => {
  if (ocrURL)
    ocrURL.value = '';
  toggle.value = 'completion';
  if (rail)
    rail.value = true;
};
const handleTitle = computed(() => {

  if (show.value === 'ocr') {
    return '图片识别';
  }

  return funcList.value.find((item) => item.value === toggle.value)?.label;
});
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
    <a-card class="ai-component-card" hoverable :title="handleTitle"
      :bodyStyle="{ padding: '0', overflow: 'auto', maxHeight: 'calc(100vh - 190px - 30px - 56px)' }">
      <template #extra>
        <a-button :icon="h(CloseOutlined)" shape="circle" size="small" type="text" @click="handleClose"></a-button>
      </template>
      <div :style="{ paddingBottom: toggle !== 'translate' && toggle !== 'polish' ? '32px' : '0' }">
        <a-segmented v-if="show !== 'ocr'" v-model:value="toggle" :options="funcList" block>
          <template #label="{ label }">
            <div style="padding: 4px">
              {{ label }}
            </div>
          </template>
        </a-segmented>
        <a-segmented v-if="toggle === 'translate'" v-model:value="selectedLang" :options="Lang" block />
        <a-segmented v-if="toggle === 'polish'" v-model:value="selectedStyle" :options="Styles" block />
      </div>
      <a-card class="sidebar-editor" :bordered="false" :type="'inner'">

        <SideBarEditor v-if="show === 'text'" v-model:text="selection" />

        <a-image v-if="show === 'ocr'" :src="ocrURL"></a-image>



        <a-upload-dragger v-if="show === 'file'" v-model:fileList="fileList" :customRequest="handleUpload" style="margin-top: 20px;margin-bottom: 20px;">
          <p class="ant-upload-drag-icon">
            <inbox-outlined></inbox-outlined>
          </p>
          <p class="ant-upload-text">拖拽上传</p>
          <p class="ant-upload-hint">
            上传word、pdf、txt文件
          </p>
        </a-upload-dragger>
        <button class="btn" @click="generate">生成</button>



        <SideBarEditor v-model:text="receive" />

        <a-button class="btn" color="secondary" @click="insertHTML()"> 插入</a-button>
      </a-card>

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

$top: 190px;

.ai-component {
  height: calc(100vh - $top);
  margin-top: $top;
  background: none !important;
}

.ai-component-card {
  height: calc(100vh - $top - 30px);
}
</style>
