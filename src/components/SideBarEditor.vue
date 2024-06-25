<template>
  <editor-content :editor="editor" class="side-bar-editor" />
</template>

<script setup>
import StarterKit from '@tiptap/starter-kit'
import { EditorContent, useEditor } from '@tiptap/vue-3'
import Highlight from '@tiptap/extension-highlight'
import TiptapUnderline from '@tiptap/extension-underline'
import Indent from '@/editor/extensions/indent.js'
import Images from '@/editor/extensions/image.js'
import Iframe from '@/editor/extensions/iframe.js'
import { Color } from '@tiptap/extension-color'
import TextStyle from '@tiptap/extension-text-style'
import TextAlign from '@tiptap/extension-text-align'
import Link from '@tiptap/extension-link'
import Table from '@tiptap/extension-table'
import TableRow from '@tiptap/extension-table-row'
import TableHeader from '@tiptap/extension-table-header'
import CustomTableCell from '@/editor/extensions/table.js'
import Video from '@/editor/extensions/video.js'
import { onBeforeUnmount, defineModel, watch } from 'vue'

const text = defineModel('text')

const editor = useEditor({
  content: text.value,
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
watch(text, (newVal) => {
  editor.value?.chain().setContent(newVal).run()
})
onBeforeUnmount(() => {
  editor.value?.destroy()
})
</script>
<style lang="scss">
.side-bar-editor {
  min-height: 200px;
  padding: 5px;
  border: 1px solid #ddd;
  border-radius: 4px;
  background: white;
  margin: 20px 0;

  > * + * {
    margin-top: 0.75em;
  }
  code {
    background-color: rgba(#616161, 0.1);
    color: #616161;
  }
}
.content {
  padding: 1rem 0 0;

  h3 {
    margin: 1rem 0 0.5rem;
  }

  pre {
    border-radius: 5px;
    color: #333;
  }

  code {
    display: block;
    white-space: pre-wrap;
    font-size: 0.8rem;
    padding: 0.75rem 1rem;
    background-color: #e9ecef;
    color: #495057;
  }
}
</style>