<template>
  <a-card :active-tab-key="key" :bodyStyle="{padding: '0',display: 'flex',flexWrap: 'nowrap',overflowX: 'auto'}"
          :tab-list="tabList"
          class="editor-menu" hoverable title="矿小计" @tabChange="(key) => onTabChange(key, 'key')">
    <template #extra>
      <a-space align="center">
        <div style="display: flex; flex-direction: row">
          <ToolButton :desserts="tools" :editor="editor" />
        </div>
        <UserComponent />
      </a-space>

    </template>
    <div class="editor-tools">
      <LinkButton v-show="key === 'tab2'" :editor="editor" />
      <FontSize v-show="key === 'tab1'" v-model="font_s" :editor="editor" />
      <FontFamily v-show="key === 'tab1'" v-model="font_f" :editor="editor" />
      <HeaderButton v-show="key === 'tab1'" v-model="title" :editor="editor" />
      <FontColor v-show="key === 'tab1'" :editor="editor" placement="bottom" />
      <BgColor v-show="key === 'tab1'" :editor="editor" />
      <ToolButton :desserts="contentList[key]" :editor="editor" />
      <ImageButton v-show="key === 'tab2'" :editor="editor" />
      <VideoButton v-show="key === 'tab2'" :editor="editor" />
      <PdfButton v-show="key === 'tab2'" :editor="editor" />
      <TableButton v-show="key === 'tab2'" :editor="editor" />
      <AudioButton v-show="key === 'tab2'" :editor="editor" />
      <AIFormatTrigger v-show="key === 'tab3'" />
      <bubble-menu v-if="editor" :editor="editor" :tippy-options="{ duration: 100, arrow: false, zIndex: 0 }">
        <a-card class="editor-bubble" hoverable size="small">
          <a-space-compact  direction="vertical" v-if="activeMenu === true" class="bubble-menu_wrap">
            <FontSize v-model="font_s" :editor="editor" />
            <FontFamily v-model="font_f" :editor="editor" />
            <FontColor :editor="editor" placement="left" />
            <ToolButton :desserts="bubbleMenuTools" :editor="editor" />
          </a-space-compact >
        </a-card>
      </bubble-menu>
    </div>
  </a-card>
</template>

<script lang="ts" setup>
import { BubbleMenu } from '@tiptap/vue-3'
import ToolButton from './ToolButtom.vue'
import { AllSelection, TextSelection } from '@tiptap/pm/state'

import {
  AlignCenterOutlined,
  AlignLeftOutlined,
  AlignRightOutlined,
  BlockOutlined,
  BoldOutlined,
  ClearOutlined,
  CodeOutlined,
  DisconnectOutlined, InboxOutlined,
  ItalicOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  MinusOutlined,
  OrderedListOutlined,
  RedoOutlined,
  RobotOutlined, SaveOutlined,
  StrikethroughOutlined,
  UnderlineOutlined,
  UndoOutlined,
  UnorderedListOutlined
} from '@ant-design/icons-vue'
import HeaderButton from './HeaderButton.vue'
import ImageButton from './ImageButton.vue'
import VideoButton from './VideoButton.vue'
import PdfButton from './PDFButton.vue'
import TableButton from './TableButton.vue'
import LinkButton from './LinkButton.vue'
import FontColor from './FontColor.vue'
import BgColor from './BgColor.vue'
import AIFormatTrigger from './AIFormatTrigger.vue'
import { inject, onMounted, reactive, type Ref, ref, watch } from 'vue'
import { getHTMLFromSelection } from '@/utils/selection.ts'
import { fontFamilyOptions, fontSizeOptions, headingFontSize } from '@/utils/constant'
import FontFamily from '@/editor/component/menu-buttons/FontFamily.vue'
import FontSize from '@/editor/component/menu-buttons/FontSize.vue'
import AudioButton from '@/editor/component/menu-buttons/AudioButton.vue'
import UserComponent from '@/components/UserComponent.vue'
import { useEditorStore } from '@/stores/editor'
import {saveAs} from 'file-saver'

const props = defineProps(['editor'])
const font_s = ref(16)
const font_f = ref('Poppins')
const activeMenu = ref(false)
const title = ref(0)
const selection = inject<Ref>('selection')
const rail = inject<Ref>('rail')
const editorStore = useEditorStore()
let editorRef = editorStore.editorRef

watch(
  () => editorStore.editorRef,
  (newVal) => {
    if (newVal) {
      editorRef = newVal;
    }
  },
  { immediate: true }
);

const fileMenuTools = reactive([
  {
    name: 'save',
    component: SaveOutlined,
    tip: '保存',
    click() {
      if (editorRef?.getHTML())
        saveAs(new Blob([editorRef?.getHTML()]), 'editor.html')
    }
  },
  {
    name: 'load',
    component: InboxOutlined,
    tip: '加载',
    click() {
      const input = document.createElement('input')
      input.type = 'file'
      input.accept = '.html'
      input.onchange = () => {
        const file = input.files?.[0]
        if (file) {
          const reader = new FileReader()
          reader.onload = () => {
            editorRef?.chain().setContent(reader.result as string).run()
            localStorage.setItem('customEditorContent', reader.result as string)
          }
          reader.readAsText(file)
        }
      }
      input.click()

  }},

  ]);

const getFontSize = () => {
  const activeFontSizeOption = fontSizeOptions.find((option) =>
    props.editor.isActive('textStyle', { fontSize: `${option.value}px` })
  )

  font_s.value = activeFontSizeOption ? activeFontSizeOption.value : headingFontSize[title.value]
}
const getFontFamily = () => {
  const activeFontFamilyOption = fontFamilyOptions.find((option) =>
    props.editor.isActive('textStyle', { fontFamily: option.value })
  )
  font_f.value = activeFontFamilyOption ? activeFontFamilyOption.value : 'Poppins'
}
const getHeadingLevel = () => {
  const activeHeadingLevel = [...Array(7).keys()]
    .slice(1)
    .find((level) => props.editor.isActive('heading', { level }))

  title.value = activeHeadingLevel || 0
}
const editMenuTools = reactive([
  {
    name: 'bold',
    component: BoldOutlined,
    click() {
      props.editor.chain().focus().toggleBold().run()
    },
    tip: '粗体',
    active: false
  },
  {
    name: 'underline',
    component: UnderlineOutlined,
    click() {
      props.editor.chain().focus().toggleUnderline().run()
    },
    tip: '下划线',
    active: false
  },
  {
    name: 'italic',
    component: ItalicOutlined,
    tip: '斜体',
    click() {
      props.editor.chain().focus().toggleItalic().run()
    },
    active: false
  },
  {
    name: 'left',
    component: AlignLeftOutlined,
    click() {
      props.editor.chain().focus().setTextAlign('left').run()
    },
    tip: '左对齐',
    active: false
  },
  {
    name: 'center',
    component: AlignCenterOutlined,
    tip: '居中对齐',
    click() {
      props.editor.chain().focus().setTextAlign('center').run()
    },
    active: false
  },
  {
    name: 'right',
    component: AlignRightOutlined,
    tip: '右对齐',
    click() {
      props.editor.chain().focus().setTextAlign('right').run()
    },
    active: false
  },
  {
    name: 'bulletList',
    component: UnorderedListOutlined,
    tip: '无序列表',
    click() {
      props.editor.chain().focus().toggleBulletList().run()
    },
    active: false
  },
  {
    name: 'orderedList',
    component: OrderedListOutlined,
    tip: '有序列表',
    click() {
      props.editor.chain().focus().toggleOrderedList().run()
    },
    active: false
  },
  {
    name: 'MenuUnfoldOutlined',
    component: MenuUnfoldOutlined,
    tip: '缩进',
    click() {
      props.editor.chain().focus().indent().run()
    },
    active: false
  },
  {
    name: 'MenuFoldOutlined',
    component: MenuFoldOutlined,
    tip: '取消缩进',
    click() {
      props.editor.chain().focus().outdent().run()
    },
    active: false
  }
])
const tools = reactive([
  {
    name: 'UndoOutlined',
    component: UndoOutlined,
    tip: '撤销',
    click() {
      props.editor.chain().focus().undo().run()
    },
    active: false
  },
  {
    name: 'RedoOutlined',
    component: RedoOutlined,
    tip: '重做',
    click() {
      props.editor.chain().focus().redo().run()
    },
    active: false
  }
])
const bubbleMenuTools = reactive([
  {
    name: 'bold',
    component: BoldOutlined,
    click() {
      props.editor.chain().focus().toggleBold().run()
    },
    tip: '粗体',
    active: false
  },
  {
    name: 'strike',
    component: StrikethroughOutlined,
    click() {
      props.editor.chain().focus().toggleStrike().run()
    },
    tip: '删除线',
    active: false
  },
  {
    name: 'ClearOutlined',
    component: ClearOutlined,
    tip: '清除格式',
    click() {
      props.editor.chain().focus().clearNodes().unsetAllMarks().run()
    },
    active: false
  },
  {
    name: 'SendToAI',
    component: RobotOutlined,
    tip: 'AI功能',
    click() {
      if (selection && rail) {
        selection.value = getHTMLFromSelection(props.editor, props.editor.state.selection)

        rail.value = false
      }
    }
  }
])

const editorTools = reactive([
  {
    name: 'blockquote',
    component: BlockOutlined,
    click() {
      props.editor.chain().focus().toggleBlockquote().run()
    },
    tip: '引用',
    active: false
  },
  {
    name: 'codeBlock',
    component: CodeOutlined,
    click() {
      props.editor.chain().focus().toggleCodeBlock().run()
    },
    tip: '代码块',
    active: false
  }
])
const insertMenuTools = reactive([
  {
    name: 'unsetlink',
    component: DisconnectOutlined,
    tip: '取消链接',
    click() {
      props.editor.chain().focus().extendMarkRange('link').unsetLink().run()
    },
    active: false
  },
  {
    name: 'MinusOutlined',
    component: MinusOutlined,
    tip: '水平线',
    click() {
      props.editor.chain().focus().setHorizontalRule().run()
    },
    active: false
  }
])

const tabList = [
  {
    key: 'tab1',
    tab: '编辑'
  },
  {
    key: 'tab2',
    tab: '插入'
  },
  {
    key: 'tab3',
    tab: '工具'
  },
  {
    key: 'tab4',
    tab: '文件'
  }
]
const contentList = {
  tab1: editMenuTools,
  tab2: insertMenuTools,
  tab3: editorTools,
  tab4: fileMenuTools
}

const key = ref('tab1')

const onTabChange = (value: string, type: string) => {
  if (type === 'key') {
    key.value = value
  }
}

const getCurrentMenuType = () => {
  return (
    props.editor.state.selection instanceof TextSelection ||
    props.editor.state.selection instanceof AllSelection
  )
}

watch(
  () => props.editor.state.selection,
  (selection) => {
    activeMenu.value = getCurrentMenuType()
  }
)

onMounted(() => {
  props.editor.on('transaction', () => {
    getHeadingLevel()
    getFontSize()
    getFontFamily()
  })
})
</script>

<style lang="scss">


.ant-select-selector {
  height: 40px !important;
}

.ant-select {
  margin: 2px !important;
  margin-right: 5px !important;
  margin-left: 5px !important;
}

#tippy-1 {
  z-index: 0 !important;
}
</style>
