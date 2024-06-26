<template>
  <a-card
    :active-tab-key="key"
    :tab-list="tabList"
    title="Card title"
    @tabChange="(key) => onTabChange(key, 'key')"
  >
    <div class="editor-tools">
      <HeaderButton v-show="key === 'tab1'" v-model="title" :editor="editor" />
      <ToolButton :desserts="contentList[key]" :editor="editor" />
      <ImageButton v-show="key === 'tab2'" :editor="editor" />
      <VideoButton v-show="key === 'tab2'" :editor="editor" />
      <PdfButton v-show="key === 'tab2'" :editor="editor" />
      <TableButton v-show="key === 'tab2'" :editor="editor" />
      <FontColor v-show="key === 'tab1'" :editor="editor" />
      <BgColor v-show="key === 'tab1'" :editor="editor" />
      <LinkButton v-show="key === 'tab1'" :editor="editor" />
      <fontSize v-show="key === 'tab1'" v-model="fontSize" :editor="editor" />

      <bubble-menu v-if="editor" :editor="editor" :tippy-options="{ duration: 100 }">
        <div v-if="activeMenu === true" class="bubble-menu_wrap">
          <fontSize v-show="key === 'tab1'" v-model="fontSize" :editor="editor" />
          <FontColor :editor="editor" />
          <LinkButton :editor="editor" />
          <ToolButton :desserts="bubbleMenuTools" :editor="editor" />
        </div>
      </bubble-menu>
    </div>
  </a-card>
</template>

<script lang="ts" setup>
import { BubbleMenu } from '@tiptap/vue-3'
import ToolButton from './tool-button.vue'
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
import HeaderButton from './header-button.vue'
import ImageButton from './image-button.vue'
import VideoButton from './video-button.vue'
import PdfButton from './pdf-button.vue'
import TableButton from './table-button.vue'
import LinkButton from './link-button.vue'
import FontColor from './font-color.vue'
import BgColor from './bg-color.vue'

import { provide, type Ref, watch, onMounted } from 'vue'
import { defineComponent, inject, reactive, ref } from 'vue'
import { getHTMLFromSelection } from '@/utils/selection.ts'
import { fontSizeOptions, headingFontSize } from '@/utils/constant'
import FontSize from '@/editor/component/menu-buttons/font-size.vue'

const props = defineProps(['editor'])
const fontSize = ref(16)
const activeMenu = ref(false)
const title = ref(0)
const isFullScreen = inject('isFullScreen')
const toggleFullscreen = inject('toggleFullscreen')
const selection = inject<Ref>('selection')
const rail = inject<Ref>('rail')

// h1 {
//   font-size: 29.3px;
// }
//
// h2 {
//   font-size: 24px;
// }
//
// h3 {
//   font-size: 21.3px;
// }
//
// h4 {
//   font-size: 20px;
// }
//
// h5 {
//   font-size: 18.7px;
// }
const getFontSize = () => {
  const activeFontSizeOption = fontSizeOptions.find((option) =>
    props.editor.isActive('textStyle', { fontSize: `${option.value}px` })
  )

  fontSize.value = activeFontSizeOption ? activeFontSizeOption.value : headingFontSize[title.value]
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
      console.log(getHTMLFromSelection(props.editor, props.editor.state.selection))
      if (selection && rail) {
        selection.value = getHTMLFromSelection(props.editor, props.editor.state.selection)

        rail.value = false
      }
    }
  }
])

const editorTools = reactive([
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
  },
  {
    name: 'MinusOutlined',
    component: MinusOutlined,
    tip: '水平线',
    click() {
      props.editor.chain().focus().setHorizontalRule().run()
    },
    active: false
  },
  ...bubbleMenuTools,
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
  },
  {
    name: 'ExpandOutlined',
    component: ExpandOutlined,
    tip: '全屏',
    click: toggleFullscreen,
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
    tab: 'tab2'
  }
]
const contentList = {
  tab1: editMenuTools,
  tab2: editorTools
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
  })
})
</script>

<style lang="scss" scoped>
.bubble-menu_wrap {
  display: flex;
  border-radius: 3px;
  background-color: #fff;
  padding: 2px 5px;
  box-shadow: 0 0 3px rgba(0, 0, 0, 0.15);
}

.bubble-menu_wrap:hover {
  background-color: #d9afd9;
  background-image: linear-gradient(0deg, #d9afd9 0%, #97d9e1 100%);
  box-shadow: 0 0 3px rgba(0, 0, 0, 0.15);
}
// .btn:hover{
//   height: 30px;
//   width: 60px;
//   box-shadow:0 10px 10px rgba(0, 0, 0, 0.4);
//   display: inline-block;
//   color: rgb(56, 97, 230);

// }
.bubble-menu_wrap:active {
  background-color: #0093e9;
  background-image: linear-gradient(160deg, #0093e9 0%, #80d0c7 100%);
  box-shadow: 0 0 3px rgba(128, 208, 199, 0.15);
}
</style>
