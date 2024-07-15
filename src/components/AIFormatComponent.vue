<script setup lang="ts">
import { h, ref, reactive, watch, type UnwrapRef, inject, type Ref } from 'vue'
import { CloseOutlined } from '@ant-design/icons-vue'
import { useEditorStore } from '@/stores/editor'
import SideBarEditor from './SideBarEditor.vue'
import FormatSelector from './FormatSelector.vue'
const lRail = inject<Ref>('lRail')
const handleClose = () => {
  if (lRail) {
    lRail.value = true
  }
}

const headers = [
  { key: 'h0', label: '正文' },
  { key: 'h1', label: '标题一' },
  { key: 'h2', label: '标题二' },
  { key: 'h3', label: '标题三' },
  { key: 'h4', label: '标题四' },
  { key: 'h5', label: '标题五' }
]
const format_data = ref([
  { label: '自定', value: '0' },
  { label: '论文', value: '1' },
  { label: '智能生成', value: '2' }
])
const format_value = ref('0')
const activeKey = ref(['1'])
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
import { fontFamilyOptions } from '@/utils/constant'
import { fontSizeOptions } from '@/utils/constant'
import { getFormatGen } from '@/apis/generate'
import { type FormatType, BaseFormatOptions, essayFormatOptions } from '@/utils/constant'

const formatDict: UnwrapRef<FormatType> = reactive({ ...BaseFormatOptions })

const handleFormat = () => {
  editorRef?.state.doc.descendants((node, pos) => {
    if (node.type.name === 'heading') {
      // 确保我们只处理标题节点
      const fontSize = `${fontSizeOptions.find((item) => item.label === formatDict[`h${node.attrs.level}`]?.fontSize)?.value}px` // 计算字体大小
      if (!fontSize) return
      const fontFamily = formatDict[`h${node.attrs.level}`]?.fontFamily || 'Poppins' // 计算字体
      // 设置光标位置到节点起始位置
      editorRef
        ?.chain()
        .focus()
        .setTextSelection({ from: pos, to: pos + node.nodeSize })
        .setFontSize(fontSize)
        .run()
      editorRef
        ?.chain()
        .focus()
        .setTextSelection({ from: pos, to: pos + node.nodeSize })
        .setFontFamily(fontFamily)
        .run()
      editorRef
        ?.chain()
        .focus()
        .setTextSelection({ from: pos, to: pos + node.nodeSize })
        .setTextAlign(formatDict[`h${node.attrs.level}`]?.alignment || 'left')
        .run()
      if (formatDict[`h${node.attrs.level}`]?.bold) {
        editorRef
          ?.chain()
          .focus()
          .setTextSelection({ from: pos, to: pos + node.nodeSize })
          .setBold()
          .run()
      }
    } else if (node.type.name === 'paragraph') {
      const fontSize = `${fontSizeOptions.find((item) => item.label === formatDict.h0.fontSize)?.value}px` // 计算字体大小
      console.log(formatDict.h0.fontSize)
      console.log(fontSize)
      // 设置光标位置到节点起始位置
      editorRef
        ?.chain()
        .focus()
        .setTextSelection({ from: pos, to: pos + node.nodeSize })
        .setFontSize(fontSize)
        .run()
      editorRef
        ?.chain()
        .focus()
        .setTextSelection({ from: pos, to: pos + node.nodeSize })
        .setFontFamily(formatDict.h0.fontFamily)
        .run()
      editorRef
        ?.chain()
        .focus()
        .setTextSelection({ from: pos, to: pos + node.nodeSize })
        .setTextAlign(formatDict.h0.alignment)
        .run()
      if (formatDict.h0.bold) {
        editorRef
          ?.chain()
          .focus()
          .setTextSelection({ from: pos, to: pos + node.nodeSize })
          .setBold()
          .run()
      }
    }
  })
}
const current = ref<number>(0)

const next = async () => {
  if (text.value === '<p></p>') {
    return
  }
  if (format_value.value === '1') {
    for (const key in essayFormatOptions) {
      formatDict[key].fontFamily = essayFormatOptions[key].fontFamily
      formatDict[key].fontSize = essayFormatOptions[key].fontSize
      formatDict[key].alignment = essayFormatOptions[key].alignment
      formatDict[key].bold = essayFormatOptions[key].bold
    }
  }
  else if (format_value.value === '2') {
    const form = {
      input: { query: text.value }
    }
    const res = await getFormatGen(form)
    for (const key in res.output[0]) {
      if (key === '正文') {
        formatDict.h0.fontFamily = res.output[0][key].字体
        formatDict.h0.fontSize = res.output[0][key].字体大小
        if (res.output[0][key].对齐方式 === '左对齐') {
          formatDict.h0.alignment = 'left'
        } else if (res.output[0][key].对齐方式 === '居中对齐') {
          formatDict.h0.alignment = 'center'
        } else {
          formatDict.h0.alignment = 'right'
        }
        formatDict.h0.bold = res.output[0][key].加粗 === '加粗'
      } else {
        const index = Number.parseInt(key.slice(-1))
        if (
          res.output[0][key].字体 === undefined ||
          res.output[0][key].字体大小 === undefined ||
          res.output[0][key].对齐方式 === undefined ||
          res.output[0][key].加粗 === undefined
        ) {
          continue
        }
        formatDict[`h${index}`].fontFamily = res.output[0][key].字体
        formatDict[`h${index}`].fontSize = res.output[0][key].字体大小
        if (res.output[0][key].对齐方式 === '左对齐') {
          formatDict[`h${index}`].alignment = 'left'
        } else if (res.output[0][key].对齐方式 === '居中对齐') {
          formatDict[`h${index}`].alignment = 'center'
        } else {
          formatDict[`h${index}`].alignment = 'right'
        }
        formatDict[`h${index}`].bold = res.output[0][key].加粗 === '加粗'
      }

      
    }
  }
  current.value++
}

const prev = () => {
  current.value--
}
const text = ref('')
</script>

<template>
  <a-layout-sider
    :collapsed="lRail"
    :trigger="null"
    collapsed-width="0"
    collapsible
    theme="light"
    :style="{
      overflow: 'auto',
      position: 'fixed',
      left: 0,
      top: 0,
      bottom: 0,
      marginLeft: '5px'
    }"
    class="ai-component"
    width="20%"
  >
    <a-card
      class="ai-component-card"
      hoverable
      title="智能排版"
      :bodyStyle="{
        padding: '0',
        overflow: 'auto',
        maxHeight: 'calc(100vh - 190px - 30px - 56px)'
      }"
    >
      <template #extra>
        <a-button
          :icon="h(CloseOutlined)"
          shape="circle"
          size="small"
          type="text"
          @click="handleClose"
        ></a-button>
      </template>

      <a-steps
        type="navigation"
        :current="current"
        size="small"
        :items="[
          {
            title: '开始'
          },
          {
            title: '调整'
          }
        ]"
      ></a-steps>
      <div class="format-container">
        <a-segmented
          v-if="current === 0"
          v-model:value="format_value"
          block
          :options="format_data"
        />
        <div class="format-editor">
          <SideBarEditor
            v-if="current === 0 && format_value === '2'"
            v-model:text="text"
            style="margin: 0"
          />
        </div>
        <a-form :model="formatDict" v-if="current === 1">
          <a-collapse v-model:activeKey="activeKey" :bordered="false">
            <a-collapse-panel v-for="header in headers" :key="header.key" :header="header.label">
              <FormatSelector
                :fontSizeOptions="fontSizeOptions"
                v-model:fontFamilyOptions="fontFamilyOptions"
                v-model:fontSize="formatDict[header.key].fontSize"
                v-model:fontFamily="formatDict[header.key].fontFamily"
                v-model:alignment="formatDict[header.key].alignment"
                v-model:bold="formatDict[header.key].bold"
              />
            </a-collapse-panel>
          </a-collapse>
        </a-form>
      </div>
      <div class="steps-action">
        <a-button v-if="current < 1" type="primary" @click="next">下一步</a-button>
        <a-button v-if="current == 1" type="primary" @click="handleFormat"> 完成 </a-button>
        <a-button v-if="current > 0" style="margin-left: 8px" @click="prev">上一步</a-button>
      </div>
    </a-card>
  </a-layout-sider>
</template>

<style scoped lang="scss">
$top: 190px;

.ai-component {
  height: calc(100vh - $top);
  margin-top: $top;
  background: none !important;
}

.ai-component-card {
  height: calc(100vh - $top - 30px);
}

.ant-collapse-item {
  overflow: auto;
}
</style>

<style lang="scss">
.format-container {
  height: calc(100vh - 190px - 30px - 32px - 56px - 36px - 30px);
  overflow: auto;
  margin-bottom: 10px;
}

.format-editor {
  padding: 10px;
  overflow: auto;
}
</style>
