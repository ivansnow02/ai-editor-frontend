<template>
  <div>
    <div v-if="editor" :class="[isFullScreen ? 'editor--fullscreen' : '']" class="editor">
      <MenuButtons :editor="editor" />
      <editor-content :editor="editor" class="editor-code" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import MenuButtons from './component/menu-buttons/index.vue'
import { onBeforeUnmount, provide, ref, watch } from 'vue'

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
// import { lowlight } from 'lowlight'
// 自定义插件
import Iframe from './extensions/iframe'
import Images from './extensions/image'
import Video from './extensions/video'
import CustomTableCell from './extensions/table'
import Indent from './extensions/indent'

import { useEditorStore } from '@/stores/editor'

// lowlight.registerLanguage('html', html)
// lowlight.registerLanguage('css', css)
// lowlight.registerLanguage('js', js)
// lowlight.registerLanguage('ts', ts)

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
      console.log(newVal.getHTML())
    }
  },
  { immediate: true }
)
onBeforeUnmount(() => {
  editor.value?.destroy()
})
</script>
