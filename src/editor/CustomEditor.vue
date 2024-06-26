<template>
  <div>
    <div v-if="editor" :class="[isFullScreen ? 'editor--fullscreen' : '']" class="editor">
      <MenuButtons :editor="editor" />
      <editor-content :editor="editor" class="editor-code" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import MenuButtons from './component/menu-buttons/MenuButtons.vue'
import { onBeforeUnmount, provide, ref, watch } from 'vue'
import CodeBlockLights from './extensions/code-block-light'
import Highlight from '@tiptap/extension-highlight'
import TiptapUnderline from '@tiptap/extension-underline'
import { EditorContent, useEditor } from '@tiptap/vue-3'
import StarterKit from '@tiptap/starter-kit'
import TextAlign from '@tiptap/extension-text-align'
import Link from '@tiptap/extension-link'
import Table from '@tiptap/extension-table'
import TableHeader from '@tiptap/extension-table-header'
import { Color } from '@tiptap/extension-color'
import TableRow from '@tiptap/extension-table-row'
import TextStyle from '@tiptap/extension-text-style'
import css from 'highlight.js/lib/languages/css'
import js from 'highlight.js/lib/languages/javascript'
import ts from 'highlight.js/lib/languages/typescript'
import html from 'highlight.js/lib/languages/xml'
import { createLowlight } from 'lowlight'
// 自定义插件
import Iframe from './extensions/iframe'
import Images from './extensions/image'
import Video from './extensions/video'
import CustomTableCell from './extensions/table'
import Indent from './extensions/indent'

import { useEditorStore } from '@/stores/editor'

const lowlight = createLowlight()
lowlight.register({ html, ts, css, js })

const isFullScreen = ref(false)
const toggleFullscreen = () => {
  isFullScreen.value = !isFullScreen.value
}
provide('isFullScreen', isFullScreen.value)
provide('toggleFullscreen', toggleFullscreen)
const editorStore = useEditorStore()

const valueHtml = ref('<p>I’m running Tiptap with Vue.js. 🎉</p>')
const editor = useEditor({
  content: valueHtml.value,
  extensions: [
    Highlight.configure({
      multicolor: true
    }),
    TiptapUnderline,
    Indent,
    StarterKit,
    Images,
    Iframe,
    Color,
    TextStyle,
    CodeBlockLights.configure({ lowlight }),
    TextAlign.configure({
      types: ['heading', 'paragraph']
    }),
    Link.configure({
      openOnClick: true
    }),
    Table.configure({
      resizable: true
    }),
    TableRow,
    TableHeader,
    CustomTableCell,
    Video
  ],
  autofocus: 'end'
})

watch(
  editor,
  (newVal) => {
    if (newVal) {
      editorStore.setEditorRef(newVal)
    }
  },
  { immediate: true }
)
onBeforeUnmount(() => {
  editor.value?.destroy()
})
</script>
