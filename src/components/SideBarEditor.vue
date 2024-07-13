<template>
  <editor-content :editor="editor" class="side-bar-editor" />
</template>

<script setup>
import StarterKit from '@tiptap/starter-kit'
import { EditorContent, useEditor } from '@tiptap/vue-3'
import Highlight from '@tiptap/extension-highlight'
import TiptapUnderline from '@tiptap/extension-underline'
import Indent from '@/editor/extensions/indent.ts'
import Images from '@/editor/extensions/image.ts'
import Iframe from '@/editor/extensions/iframe.ts'
import { Color } from '@tiptap/extension-color'
import TextStyle from '@tiptap/extension-text-style'
import TextAlign from '@tiptap/extension-text-align'
import Link from '@tiptap/extension-link'
import Table from '@tiptap/extension-table'
import TableRow from '@tiptap/extension-table-row'
import TableHeader from '@tiptap/extension-table-header'
import CustomTableCell from '@/editor/extensions/table.ts'
import Video from '@/editor/extensions/video.ts'
import { onBeforeUnmount, defineModel, watch } from 'vue'

const text = defineModel('text')

const editor = useEditor({
  content: '',
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
  console.log('newVal', newVal)
  editor.value?.chain().setContent(newVal).run()
})
watch(
  () => editor.value?.getHTML(),
  (newVal) => {
    text.value = newVal
  }
)
onBeforeUnmount(() => {
  editor.value?.destroy()
})
</script>
<style lang="scss">
.side-bar-editor {
  min-height: 160px;
  max-height: 160px;
  padding: 5px;
  border: 1px solid #ddd;
  border-radius: 4px;
  background: white;
  margin: 20px 0;
  overflow: auto;

  > * + * {
    margin-top: 0.75em;
  }
  code {
    background-color: rgba(#616161, 0.1);
    color: #616161;
  }
}
.tiptap {
  >*+* {
    margin-top: 0.75em;
  }

  ul,
  ol {
    counter-reset: none;
    list-style-type: none;
    margin-bottom: 0;
    margin-left: 24px;
    margin-top: 0;
    padding-bottom: 5px;
    padding-left: 0;
    padding-top: 5px;
  }

  li>p {
    margin: 0;

    &:first-child::before {
      content: counter(tiptap-counter) ".";
      display: inline-block;
      left: -5px;
      line-height: 1;
      margin-left: -24px;
      position: relative;
      text-align: right;
      top: 0;
      width: 24px;
    }
  }

  ul li>p {
    &:first-child::before {
      content: "\2022";
      text-align: center;
    }
  }

  ol {
    counter-reset: tiptap-counter;

    li>p:first-child::before {
      counter-increment: tiptap-counter;
    }
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    line-height: 1.1;
  }

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

  pre {
    color: #fff;
    font-family: "JetBrainsMono", monospace;

    .hljs-comment,
    .hljs-quote {
      color: #616161;
    }

    code {
      background-color: rgba(#616161, 0.1);
    }

    .hljs-variable,
    .hljs-template-variable,
    .hljs-attribute,
    .hljs-tag,
    .hljs-name,
    .hljs-regexp,
    .hljs-link,
    .hljs-name,
    .hljs-selector-id,
    .hljs-selector-class {
      color: #f98181;
    }

    .hljs-number,
    .hljs-meta,
    .hljs-built_in,
    .hljs-builtin-name,
    .hljs-literal,
    .hljs-type,
    .hljs-params {
      color: #fbbc88;
    }

    .hljs-string,
    .hljs-symbol,
    .hljs-bullet {
      color: #b9f18d;
    }

    .hljs-title,
    .hljs-section {
      color: #faf594;
    }

    .hljs-keyword,
    .hljs-selector-tag {
      color: #70cff8;
    }

    .hljs-emphasis {
      font-style: italic;
    }

    .hljs-strong {
      font-weight: 700;
    }
  }

  p {
    margin-bottom: 0;
    margin-top: 0;
    outline: none;
  }

  img {
    max-width: 100%;
    height: auto;
  }

  blockquote {
    padding-left: 16px;
    border-left: 4px solid rgba(#ecf5ff, 0.81);
    border-radius: 2px;
    margin: 10px 0;
  }

  hr {
    border: none;
    border-top: 1px solid rgba(#0d0d0d, 0.1);
    margin: 2rem 0;
  }

  a {
    color: #68cef8;
    text-decoration: underline;
  }
}
</style>