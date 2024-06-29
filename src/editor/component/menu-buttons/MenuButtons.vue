<template>
  <a-card
    :active-tab-key="key"
    :tab-list="tabList"
    bodyStyle="padding: 0px"
    @tabChange="(key) => onTabChange(key, 'key')"
    class="editor-menu"
    hoverable
    title="编辑器"
  >
    <template #extra>
      <div style="display: flex; flex-direction: row">
        <ToolButton :desserts="tools" :editor="editor" />
      </div>
    </template>
    <div class="editor-tools">
      <LinkButton v-show="key === 'tab2'" :editor="editor" />
      <FontSize v-show="key === 'tab1'" v-model="font_s" :editor="editor" />
      <FontFamily v-show="key === 'tab1'" v-model="font_f" :editor="editor" />
      <HeaderButton v-show="key === 'tab1'" v-model="title" :editor="editor" />
      <ToolButton :desserts="contentList[key]" :editor="editor" />
      <ImageButton v-show="key === 'tab2'" :editor="editor" />
      <VideoButton v-show="key === 'tab2'" :editor="editor" />
      <PdfButton v-show="key === 'tab2'" :editor="editor" />
      <TableButton v-show="key === 'tab2'" :editor="editor" />
      <FontColor v-show="key === 'tab3'" :editor="editor" placement="bottom" />
      <BgColor v-show="key === 'tab3'" :editor="editor" />
      <AudioButton v-show="key === 'tab2'" :editor="editor" />
      <bubble-menu
        v-if="editor"
        :editor="editor"
        :tippy-options="{ duration: 100, arrow: false, zIndex: 0 }"
      >
        <a-card class="editor-bubble" hoverable size="small">
          <div v-if="activeMenu === true" class="bubble-menu_wrap">
            <FontSize v-model="font_s" :editor="editor" />
            <FontFamily v-model="font_f" :editor="editor" />
            <FontColor :editor="editor" placement="left" />
            <ToolButton :desserts="bubbleMenuTools" :editor="editor" />
          </div>
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
  DisconnectOutlined,
  ExpandOutlined,
  ItalicOutlined,
  LinkOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  MinusOutlined,
  OrderedListOutlined,
  RedoOutlined,
  RobotOutlined,
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

import { type Ref, watch, onMounted } from 'vue'
import { inject, reactive, ref } from 'vue'
import { getHTMLFromSelection } from '@/utils/selection.ts'
import { fontFamilyOptions, fontSizeOptions, headingFontSize } from '@/utils/constant'

import FontFamily from '@/editor/component/menu-buttons/FontFamily.vue'
import FontSize from '@/editor/component/menu-buttons/FontSize.vue'
import AudioButton from '@/editor/component/menu-buttons/AudioButton.vue'

const props = defineProps(['editor'])
const font_s = ref(16)
const font_f = ref('Poppins')
const activeMenu = ref(false)
const title = ref(0)
const isFullScreen = inject('isFullScreen')
const toggleFullscreen = inject('toggleFullscreen')
const selection = inject<Ref>('selection')
const rail = inject<Ref>('rail')

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
  }
]
const contentList = {
  tab1: editMenuTools,
  tab2: insertMenuTools,
  tab3: editorTools
}

const key = ref('tab1')

const onTabChange = (value: string, type: string) => {
  console.log(value, type)
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
//.bubble-menu_wrap {
//  display: flex;
//  border-radius: 3px;
//  background-color: #fff;
//  padding: 2px 5px;
//  box-shadow: 0 0 3px rgba(0, 0, 0, 0.15);
//}
//
//.bubble-menu_wrap:hover {
//  background-color: #d9afd9;
//  background-image: linear-gradient(0deg, #d9afd9 0%, #97d9e1 100%);
//  box-shadow: 0 0 3px rgba(0, 0, 0, 0.15);
//}
// .btn:hover{
//   height: 30px;
//   width: 60px;
//   box-shadow:0 10px 10px rgba(0, 0, 0, 0.4);
//   display: inline-block;
//   color: rgb(56, 97, 230);

// }
//.bubble-menu_wrap:active {
//  background-color: #0093e9;
//  background-image: linear-gradient(160deg, #0093e9 0%, #80d0c7 100%);
//  box-shadow: 0 0 3px rgba(128, 208, 199, 0.15);
//}

.ant-select-selector {
  height: 40px !important;
}

.ant-select {
  margin: 2px !important;
  margin-right: 5px !important;
  margin-left: 5px !important;
}

//.editor-bubble {
//  position: relative;
//  z-index: 0;
//}
#tippy-1 {
  z-index: 0 !important;
}
</style>
