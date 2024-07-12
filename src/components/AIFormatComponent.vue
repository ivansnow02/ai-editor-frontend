<script setup lang="ts">
import { h, ref, reactive, watch, type UnwrapRef } from 'vue'
import { CloseOutlined } from '@ant-design/icons-vue'
import { useEditorStore } from '@/stores/editor'
import type { CascaderProps } from 'ant-design-vue';
const lRail = ref(false)
const handleClose = () => {
  lRail.value = true
}

const editorStore = useEditorStore()
let editorRef = editorStore.editorRef
watch(
  () => editorStore.editorRef,
  (newVal) => {
    if (newVal) {
      editorRef = newVal
    }
  },
  { immediate: true }
)
import { fontFamilyOptions } from '@/utils/constant';
import { fontSizeOptions } from '@/utils/constant';
const value = ref('Poppins')

interface FormatDict {
  [key: string]: { fontSize: string; fontFamily: string; lineHeight: string; };
  h0: { fontSize: string; fontFamily: string; lineHeight: string; };
  h1: { fontSize: string; fontFamily: string; lineHeight: string; };
  h2: { fontSize: string; fontFamily: string; lineHeight: string; };
  h3: { fontSize: string; fontFamily: string; lineHeight: string; };
  h4: { fontSize: string; fontFamily: string; lineHeight: string; };
  h5: { fontSize: string; fontFamily: string; lineHeight: string; };
}

const formatDict: UnwrapRef<FormatDict> = reactive({
  h0: {
    fontSize: '16',
    fontFamily: 'Impact',
    lineHeight: '1.5',
  },
  h1: {
    fontSize: '25',
    fontFamily: 'Impact',
    lineHeight: '1.5',
  },
  h2: {
    fontSize: '24',
    fontFamily: 'Poppins',
    lineHeight: '1.5',
  },
  h3: {
    fontSize: '21.3',
    fontFamily: 'Poppins',
    lineHeight: '1.5',
  },
  h4: {
    fontSize: '20',
    fontFamily: 'Poppins',
    lineHeight: '1.5',
  },
  h5: {
    fontSize: '18.7',
    fontFamily: 'Poppins',
    lineHeight: '1.5',
  },
})

const handleFormat = () => {
  editorRef?.state.doc.descendants((node, pos) => {
    if (node.type.name === 'heading') { // 确保我们只处理标题节点
      const fontSize = `${formatDict[`h${node.attrs.level}`]?.fontSize}px`; // 计算字体大小
      const fontFamily = formatDict[`h${node.attrs.level}`]?.fontFamily; // 计算字体
      // 设置光标位置到节点起始位置
      editorRef?.chain().focus().setTextSelection({ from: pos, to: pos + node.nodeSize }).setFontSize(fontSize).run();
      editorRef?.chain().focus().setTextSelection({ from: pos, to: pos + node.nodeSize }).setFontFamily(fontFamily).run();


    }
    if (node.type.name === 'paragraph') { // 确保我们只处理段落节点
      const fontSize = `${formatDict.h0?.fontSize}px`; // 计算字体大小
      // 设置光标位置到节点起始位置
      editorRef?.chain().focus().setTextSelection({ from: pos, to: pos + node.nodeSize }).setFontSize(fontSize).run();
      editorRef?.chain().focus().setTextSelection({ from: pos, to: pos + node.nodeSize }).setFontFamily(formatDict.h0.fontFamily).run();
    }
  });
};
</script>

<template>
  <a-layout-sider :collapsed="lRail" :trigger="null" collapsed-width="0" collapsible theme="light" :style="{
      overflow: 'auto',
      position: 'fixed',
      left: 0,
      top: 0,
      bottom: 0,
      marginLeft: '5px'
    }" class="ai-component" width="20%">
    <a-card class="ai-component-card" hoverable title="智能排版">
      <template #extra>
        <a-button :icon="h(CloseOutlined)" shape="circle" size="small" type="text" @click="handleClose"></a-button>
      </template>
      <a-form
        :model="formatDict">
        <a-form-item label="H1">
          <a-form-item label="字体大小">
            <a-select v-model:value="formatDict.h1.fontSize" style="width: 150px">
              <a-select-option v-for="font in fontSizeOptions" :key="font.value" :value="font.value">
                {{ font.label }}
              </a-select-option>
            </a-select>
          </a-form-item>
          <a-form-item label="字号">
            <a-select v-model:value="formatDict.h1.fontFamily" style="width: 150px">
              <a-select-option v-for="font in fontFamilyOptions" :key="font.value" :value="font.value">
                <p :style="{ 'font-family': font.value }">{{ font.label }}</p>
              </a-select-option>
            </a-select>
          </a-form-item>
        </a-form-item>
        <a-form-item label="H2">
          <a-form-item label="字体大小">
            <a-select v-model:value="formatDict.h2.fontSize" style="width: 150px">
              <a-select-option v-for="font in fontSizeOptions" :key="font.value" :value="font.value">
                {{ font.label }}
              </a-select-option>
            </a-select>
          </a-form-item>
          <a-form-item label="字号">
            <a-select v-model:value="formatDict.h2.fontFamily" style="width: 150px">
              <a-select-option v-for="font in fontFamilyOptions" :key="font.value" :value="font.value">
                <p :style="{ 'font-family': font.value }">{{ font.label }}</p>
              </a-select-option>
            </a-select>
          </a-form-item>
        </a-form-item>
        <a-form-item label="H3">
          <a-form-item label="字体大小">
            <a-select v-model:value="formatDict.h3.fontSize" style="width: 150px">
              <a-select-option v-for="font in fontSizeOptions" :key="font.value" :value="font.value">
                {{ font.label }}
              </a-select-option>
            </a-select>
          </a-form-item>
          <a-form-item label="字号">
            <a-select v-model:value="formatDict.h3.fontFamily" style="width: 150px">
              <a-select-option v-for="font in fontFamilyOptions" :key="font.value" :value="font.value">
                <p :style="{ 'font-family': font.value }">{{ font.label }}</p>
              </a-select-option>
            </a-select>
          </a-form-item>
        </a-form-item>
        <a-form-item label="H4">
          <a-form-item label="字体大小">
            <a-select v-model:value="formatDict.h4.fontSize" style="width: 150px">
              <a-select-option v-for="font in fontSizeOptions" :key="font.value" :value="font.value">
                {{ font.label }}
              </a-select-option>
            </a-select>
          </a-form-item>
          <a-form-item label="字号">
            <a-select v-model:value="formatDict.h4.fontFamily" style="width: 150px">
              <a-select-option v-for="font in fontFamilyOptions" :key="font.value" :value="font.value">
                <p :style="{ 'font-family': font.value }">{{ font.label }}</p>
              </a-select-option>
            </a-select>
          </a-form-item>
        </a-form-item>
        <a-form-item label="H5">
          <a-form-item label="字体大小">
            <a-select v-model:value="formatDict.h5.fontSize" style="width: 150px">
              <a-select-option v-for="font in fontSizeOptions" :key="font.value" :value="font.value">
                {{ font.label }}
              </a-select-option>
            </a-select>
          </a-form-item>
          <a-form-item label="字号">
            <a-select v-model:value="formatDict.h5.fontFamily" style="width: 150px">
              <a-select-option v-for="font in fontFamilyOptions" :key="font.value" :value="font.value">
                <p :style="{ 'font-family': font.value }">{{ font.label }}</p>
              </a-select-option>
            </a-select>
          </a-form-item>
        </a-form-item>
        <a-form-item label="正文">
          <a-form-item label="字体大小">
            <a-select v-model:value="formatDict.h0.fontSize" style="width: 150px">
              <a-select-option v-for="font in fontSizeOptions" :key="font.value" :value="font.value">
                {{ font.label }}
              </a-select-option>
            </a-select>
          </a-form-item>
          <a-form-item label="字号">
            <a-select v-model:value="formatDict.h0.fontFamily" style="width: 150px">
              <a-select-option v-for="font in fontFamilyOptions" :key="font.value" :value="font.value">
                <p :style="{ 'font-family': font.value }">{{ font.label }}</p>
              </a-select-option>
            </a-select>
          </a-form-item>
        </a-form-item>


      </a-form>
      <a-select v-model:value="value" style="width: 150px">
        <a-select-option v-for="font in fontFamilyOptions" :key="font.value" :value="font.value">
          <p :style="{ 'font-family': font.value }">{{ font.label }}</p>
        </a-select-option>
      </a-select>
      <a-button type="primary" @click="handleFormat">智能排版</a-button>
    </a-card>
  </a-layout-sider>
</template>

<style scoped lang="scss">
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

<style lang="scss">
.editor .tiptap{
  h1 {
    font-size: 29.3px;
  }

  h2 {
    font-size: 24px;
  }

  h3 {
    font-size: 21.3px;
  }

  h4 {
    font-size: 20px;
  }

  h5 {
    font-size: 18.7px;
  }
}
</style>