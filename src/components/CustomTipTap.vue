<script lang="ts" setup>
import { EditorContent, useEditor } from '@tiptap/vue-3'
import StarterKit from '@tiptap/starter-kit'

// 列表
// 代码
import css from 'highlight.js/lib/languages/css'
import js from 'highlight.js/lib/languages/javascript'
import ts from 'highlight.js/lib/languages/typescript'
import html from 'highlight.js/lib/languages/xml'
import { createLowlight } from 'lowlight'
import { BulletList, OrderedList, TaskList } from 'vuetify-pro-tiptap'
import { TaskItem } from '@tiptap/extension-task-item'
import { Placeholder } from '@tiptap/extension-placeholder'
import { ListItem } from '@tiptap/extension-list-item'
import AIComponent from '@/components/AIComponent.vue'
import { provide, ref } from 'vue'
import EditorMenu from '@/components/EditorMenu.vue'
// 字数统计

const lowlight = createLowlight()
lowlight.register({ html, ts, css, js })
const ocrURL = ref('')

const selection = ref('')
const rail = ref(true)
provide('selection', selection)
provide('ocrURL', ocrURL)
provide('rail', rail)

const editor = useEditor({
  content: ``,
  extensions: [
    StarterKit,
    TaskList,
    TaskItem,
    Placeholder.configure({
      placeholder: '开始输入文本 …'
    }),
    OrderedList,
    BulletList,
    ListItem
  ],
  injectCSS: false
})
</script>

<template>
  <v-main>
    <EditorMenu :editor="editor" />
    <el-container class="fill-height" style="padding: 0">
      <!--    <div class="lefttools"></div>-->

      <el-card class="editor-card">
        <EditorContent :editor="editor" style="overflow-y: auto" />
      </el-card>
    </el-container>
  </v-main>
  <AIComponent />
</template>

<style lang="scss" scoped>
.editor-card {
  position: relative;
  width: 100%;
  height: 100%;
  display: grid;
}

.editor-card .editor {
  position: relative;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  display: grid;
}

.bottomcount {
  background-color: rgba(207, 220, 245, 0.199);
  border-top: 1px dashed #9ca19f65;
  height: 100%;
  width: 100%;
  display: grid;
  grid-template-columns: 100%;
  grid-template-rows: 100%;
  justify-items: center;
  align-items: center;
}

b {
  font-weight: bold;
}

.ProseMirror {
  overflow-y: scroll;
}

.ProseMirror p {
  margin: 0;
}

.ProseMirror:focus {
  outline: none;
}

.tiptap p.is-editor-empty:first-child::before {
  color: #adb5bd;
  content: attr(data-placeholder);
  float: left;
  height: 0;
  pointer-events: none;
}

.tiptap {
  > * + * {
    margin-top: 0.75em;
  }

  ul {
    padding: 0 2rem;
    list-style: square;
  }

  ol {
    padding: 0 2rem;
    list-style: decimal;
  }

  table {
    border-collapse: collapse;
    table-layout: fixed;
    width: 100%;
    margin: 0;
    overflow: hidden;

    td,
    th {
      min-width: 1em;
      border: 2px solid #ced4da;
      padding: 3px 5px;
      vertical-align: top;
      box-sizing: border-box;
      position: relative;

      > * {
        margin-bottom: 0;
      }
    }

    th {
      font-weight: bold;
      text-align: left;
      background-color: #f1f3f5;
    }

    .selectedCell:after {
      z-index: 2;
      position: absolute;
      content: '';
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      background: rgba(200, 200, 255, 0.4);
      pointer-events: none;
    }

    .column-resize-handle {
      position: absolute;
      right: -2px;
      top: 0;
      bottom: -2px;
      width: 4px;
      background-color: #adf;
      pointer-events: none;
    }

    p {
      margin: 0;
    }
  }

  pre {
    background: #0d0d0d;
    color: #fff;
    font-family: 'JetBrainsMono', monospace;
    padding: 0.75rem 1rem;
    border-radius: 0.5rem;

    code {
      color: inherit;
      padding: 0;
      background: none;
      font-size: 0.8rem;
    }

    .hljs-comment,
    .hljs-quote {
      color: #616161;
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
}

.tableWrapper {
  overflow-x: auto;
}

.resize-cursor {
  cursor: col-resize;
}
</style>
