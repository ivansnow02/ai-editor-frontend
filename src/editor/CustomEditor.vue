<template>
  <a-layout>
    <div v-if="editor" :class="[isFullScreen ? 'editor--fullscreen' : '']" class="editor">
      <a-layout-header
        :style="{ position: 'fixed', zIndex: 1, width: '100%', marginTop: '62px' }"
        class="editor-menu_wrapper"
      >
        <MenuButtons :editor="editor" />
      </a-layout-header>
      <a-layout-content :style="{ padding: '0 50px', marginTop: '250px' }">
        <a-card class="editor-card">
          <editor-content :editor="editor" class="editor-code" />
        </a-card>
      </a-layout-content>
    </div>
  </a-layout>
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
import FontSize from 'tiptap-extension-font-size'
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
import FontFamily from '@tiptap/extension-font-family'
import Iframe from './extensions/iframe'
import Images from './extensions/image'
import Video from './extensions/video'
import CustomTableCell from './extensions/table'
import Indent from './extensions/indent'
import Audio from './extensions/audio'

import { useEditorStore } from '@/stores/editor'

const lowlight = createLowlight()
lowlight.register({ html, ts, css, js })

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
    FontSize,
    FontFamily,
    Audio,
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

<style lang="scss" scoped>
.editor-code {
  overflow: auto;
}

.editor-menu_wrapper {
  padding: 5px;
  background: none;
}

.editor-card {
  border-radius: 10px;
  margin-bottom: 10px;
  margin-left: auto;
  margin-right: auto;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  min-height: calc(100vh - 280px);
  max-width: 60%;
}
</style>