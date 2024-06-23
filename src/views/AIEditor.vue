<script setup lang="ts">
import { computed, provide, ref, unref, type Ref } from 'vue'
import { useTheme } from 'vuetify'
import AIComponent from '@/components/AIComponent.vue'
import Login from '@/components/Login.vue'
import regist from '@/components/regist.vue'
import {
  ActionButton,
  BaseKit,
  Blockquote,
  Bold,
  BulletList,
  Clear,
  Code,
  CodeBlock,
  Color,
  defaultBubbleList,
  FontFamily,
  FontSize,
  Fullscreen,
  Heading,
  Highlight,
  History,
  HorizontalRule,
  Image,
  Indent,
  Italic,
  Link,
  MarkdownTheme,
  OrderedList,
  Strike,
  SubAndSuperScript,
  Table,
  TaskList,
  TextAlign,
  Underline,
  Video,
  VuetifyTiptap,
  type Editor,
} from 'vuetify-pro-tiptap'
import type { Selection } from 'prosemirror-model'
import { DOMSerializer } from 'prosemirror-model'
// import CustomLang from './compone./components/AIComponent.vue
import preview from '@/extensions/preview'

import LinkDialog from '@/components/LinkDialog.vue'
import SelectImage from '@/components/SelectImage.vue'
import { markRaw } from 'vue'
import { useRouter } from 'vue-router'
const ocrURL = ref('')

const selection = ref("");
const extensions = [
  BaseKit.configure({
      placeholder: {
        placeholder: '请输入...'
      },
      bubble: {
        list: {
          image: [
            'float-left',
            'float-none',
            'float-right',
            'divider',
            'size-small',
            'size-medium',
            'size-large',
            'divider',
            'textAlign',
            'divider',
            'image',
            'image-aspect-ratio',
            'remove',
            'divider',
            'ocr',
          ],
          text: [
            'bold',
            'italic',
            'underline',
            'strike',
            'divider',
            'color',
            'highlight',
            'textAlign',
            'divider',
            'link',
            'completion'
          ],
          video: ['video', 'remove']
        },
        defaultBubbleList: (editor) => {
          // You can customize the bubble menu here
          const defaultList = defaultBubbleList(editor); // default customize bubble list
          
          defaultList.push({
            type: 'completion',
            component: ActionButton,
            componentProps: {
              tooltip: 'AI功能',
              icon: 'check',
              action: () => {
                selection.value = getHTMLFromSelection(editor, editor.state.selection);
                rail.value = false;
                }
              }
          });
          defaultList.push({
            type: 'ocr',
            component: ActionButton,
            componentProps: {
              tooltip: 'OCR',
              icon: 'check',
              action: () => {
                const imgNode = getHTMLFromSelection(editor, editor.state.selection);
                console.log(imgNode);
                const match = imgNode.match(/src="([^"]*)"/);
                if (match !== null) {
                  const imgURL = match[1];
                  ocrURL.value = imgURL;
                  rail.value = false;
                }
              }
            }
          });
          return defaultList
        }
      }
    }),
    Bold,
    Italic,
    Underline,
    Strike,
    Code.configure({ divider: true }),
    Heading,
    TextAlign,
    FontFamily,
    FontSize,
    Color,
    Highlight.configure({ divider: true }),
    SubAndSuperScript.configure({ divider: true }),
    Clear.configure({ divider: true }),
    BulletList,
    OrderedList,
    TaskList,
    Indent.configure({ divider: true }),
    Link.configure({
      dialogComponent: () => LinkDialog
    }),
    Image.configure({
      imageTabs: [{ name: 'SELECT', component: markRaw(SelectImage) }],
      width: 500,
      hiddenTabs: ['upload'],
    }),
    Video,
    Table.configure({ divider: true }),
    Blockquote,
    HorizontalRule,
    CodeBlock.configure({ divider: true }),
    History.configure({ divider: true }),
    MarkdownTheme.configure({
      markdownThemes: [
        {
          title: 'Github',
          value: 'github'
        },
        {
          title: 'Maidragon',
          value: 'maidragon'
        }
      ]
    }),
    Fullscreen.configure({
      useWindow: true
    }),
  preview.configure({ spacer: true }),

]

const theme = useTheme()


const VuetifyTiptapRef = ref<null | Record<string, any>>(null)
const output = ref<'html' | 'json' | 'text'>('html')
const content = ref('')
const markdownTheme = ref('')
const outlined = ref(true)
const dense = ref(false)
const editHtml = ref(false)
const hideToolbar = ref(false)
const disableToolbar = ref(false)
const errorMessages = ref(null)
provide('VuetifyTiptapRef', VuetifyTiptapRef);
provide('selection', selection);
provide('ocrURL', ocrURL);

const getHTMLFromSelection = (editor: Editor, selection: Selection) => {
  const slice = selection.content();
  const serializer = DOMSerializer.fromSchema(editor.schema);
  const fragment = serializer.serializeFragment(slice.content);
  const div = document.createElement('div');
  div.appendChild(fragment);

  return div.innerHTML;
}
const toggleTheme = () => {
  theme.global.name.value = theme.global.current.value.dark ? 'light' : 'dark'
}
//TODO 待完成
  const links = [
    '编辑器',
    '登录',
  ]

const rail = ref(true)

const router = useRouter();
const jump = () => {
  router.push("/");
}

</script>
<template>
  <VApp id="app">
    <v-main class="bg-grey-lighten-3" >
      <v-app-bar border="0" flat  >
        <v-container class="mx-auto d-flex align-center justify-center" >
          <v-avatar class="me-4 " color="grey-darken-1" size="32"></v-avatar>
          <V-Btn @click="jump" variant="flat" color="surface-variant">返回首页</V-Btn>
          <V-Btn @click="toggleTheme" variant="flat" color="surface-variant">更换主题</V-Btn>
          <v-spacer></v-spacer>
          <Login/>
          <regist/> 
        </v-container>
      </v-app-bar>
      <AIComponent v-model="rail"></AIComponent>
      <v-sheet rounded="lg"  width="1200" > 
        <VuetifyTiptap class="editor" ref="VuetifyTiptapRef" v-model="content" markdown-theme="markdownTheme"
          :output="output" :hide-toolbar="hideToolbar" :disable-toolbar="disableToolbar" :outlined="outlined"
          :dense="dense" :error-messages="errorMessages" rounded :extensions="extensions" max-width="1500"
          >
        </VuetifyTiptap>
      </v-sheet>
    </v-main>
  </VApp>
</template>

<style>
.vuetify-pro-tiptap-editor__content{
  height: 100%;
  width: 120%;

}

.px-4 {
  bottom: 0;
}

.buttons{

  background-color:#fff;
  top: 0;
  left: 0;
  width: 100%;
  height: 80px;
  border: 1px solid skyblue;
  border-radius: 10px;
  padding: 10px;
}
.buttonA{
  margin: 0px;
  border: 0px;
  padding: 0px;
  background-color: aqua;
}

.vuetify-pro-tiptap {
    overflow-wrap: anywhere
}

.vuetify-pro-tiptap-editor {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: calc(100vh - 72px);
}


.vuetify-pro-tiptap-editor__menu-bubble .v-toolbar__content {
    padding: 0;
    
}

.vuetify-pro-tiptap-editor__toolbar .v-toolbar__content {
    flex-wrap: wrap;
    row-gap: 4px;
    padding: 4px 12px;
}

.vuetify-pro-tiptap-editor__toolbar .v-toolbar__content .v-divider--vertical {
    height: inherit
}

.vuetify-pro-tiptap-editor__content :focus-visible {
    outline: -webkit-focus-ring-color auto 0
}

.vuetify-pro-tiptap-editor__content img {
    display: inline-block;
    float: none
}

.vuetify-pro-tiptap-editor__content img[data-display=inline] {
    padding-right: 12px;
    padding-left: 12px
}

.vuetify-pro-tiptap-editor__content img[data-display=block] {
    display: block
}

.vuetify-pro-tiptap-editor__content img[data-display=left] {
    float: left;
    padding-right: 12px;
    padding-left: 0
}

.vuetify-pro-tiptap-editor__content img[data-display=right] {
    float: right;
    padding-right: 0;
    padding-left: 12px
}

.vuetify-pro-tiptap-editor__content .task-list {
    padding-left: 0;
    list-style: none
}

.vuetify-pro-tiptap-editor__content .task-list .task-list-item {
    display: flex;
    list-style: none
}

.vuetify-pro-tiptap-editor__content .task-list .task-list-item>label {
    flex: 0 0 auto;
    padding-right: 8px;
    padding-left: 8px;
    user-select: none
}

.vuetify-pro-tiptap-editor__content .task-list .task-list-item>div {
    flex: 1 1 auto
}

.vuetify-pro-tiptap .ProseMirror {
    min-height: 180px;
    padding: 8px 18px;
    overflow-wrap: anywhere
}

.vuetify-pro-tiptap .ProseMirror p.is-editor-empty:first-child::before {
    float: left;
    height: 0;
    color: #adb5bd;
    pointer-events: none;
    content: attr(data-placeholder)
}

.vuetify-pro-tiptap .ProseMirror .iframe-wrapper.focus>div {
    outline: 4px solid #409eff
}

.vuetify-pro-tiptap .ProseMirror table.table-wrapper .selectedCell {
    position: relative
}

.vuetify-pro-tiptap .ProseMirror table.table-wrapper .selectedCell::after {
    position: absolute;
    inset: 0;
    z-index: 2;
    pointer-events: none;
    content: "";
    background: rgba(200, 200, 255, .4)
}

.vuetify-pro-tiptap .ProseMirror .image-view {
    display: inline-block;
    float: none;
    max-width: 100%;
    line-height: 0;
    vertical-align: baseline;
    user-select: none
}

.vuetify-pro-tiptap .ProseMirror .image-view--inline {
    margin-right: 0;
    margin-left: 0
}

.vuetify-pro-tiptap .ProseMirror .image-view--block {
    display: block
}

.vuetify-pro-tiptap .ProseMirror .image-view--left {
    float: left;
    margin-right: 12px;
    margin-left: 0
}

.vuetify-pro-tiptap .ProseMirror .image-view--right {
    float: right;
    margin-right: 0;
    margin-left: 12px
}

.vuetify-pro-tiptap .ProseMirror .image-view__body {
    position: relative;
    display: inline-block;
    max-width: 100%;
    clear: both;
    outline: rgba(0, 0, 0, 0) solid 2px;
    transition: all .2s ease-in
}

.vuetify-pro-tiptap .ProseMirror .image-view__body:hover {
    outline-color: #ffc83d
}

.vuetify-pro-tiptap .ProseMirror .image-view__body--focused:hover,
.vuetify-pro-tiptap .ProseMirror .image-view__body--resizing:hover {
    outline-color: rgba(0, 0, 0, 0)
}

.vuetify-pro-tiptap .ProseMirror .image-view__body__placeholder {
    position: absolute;
    top: 0;
    left: 0;
    z-index: -1;
    width: 100%;
    height: 100%
}

.vuetify-pro-tiptap .ProseMirror .image-view__body__image {
    margin: 0;
    cursor: pointer !important
}

.vuetify-pro-tiptap .ProseMirror .image-view.focus img {
    outline: 2px solid #409eff
}

.vuetify-pro-tiptap .ProseMirror .image-resizer {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 1;
    width: 100%;
    height: 100%;
    border: 1px solid #409eff
}

.vuetify-pro-tiptap .ProseMirror .image-resizer__handler {
    position: absolute;
    z-index: 2;
    box-sizing: border-box;
    display: block;
    width: 12px;
    height: 12px;
    background-color: #409eff;
    border: 1px solid #fff;
    border-radius: 2px
}

.vuetify-pro-tiptap .ProseMirror .image-resizer__handler--tl {
    top: -6px;
    left: -6px;
    cursor: nw-resize
}

.vuetify-pro-tiptap .ProseMirror .image-resizer__handler--tr {
    top: -6px;
    right: -6px;
    cursor: ne-resize
}

.vuetify-pro-tiptap .ProseMirror .image-resizer__handler--bl {
    bottom: -6px;
    left: -6px;
    cursor: sw-resize
}

.vuetify-pro-tiptap .ProseMirror .image-resizer__handler--br {
    right: -6px;
    bottom: -6px;
    cursor: se-resize
}

.vuetify-pro-tiptap.dense .ProseMirror {
    min-height: 32px;
    padding: 6px 12px
}

.vuetify-pro-tiptap.dense p {
    padding: 0;
    line-height: 1.2rem
}

.table-grid-size-editor__cell__inner {
    box-sizing: border-box;
    width: 16px;
    height: 16px;
    padding: 4px;
    border: 1px solid #dcdfe6;
    border-radius: 2px
}

.table-grid-size-editor__cell--selected .table-grid-size-editor__cell__inner {
    background-color: #ecf5ff;
    border-color: #409eff
}
</style>
