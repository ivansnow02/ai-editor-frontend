<script lang="ts" setup>
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
  type Editor,
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
  VuetifyTiptap
} from 'vuetify-pro-tiptap'
import LinkDialog from '@/components/LinkDialog.vue'
import { inject, markRaw, type Ref } from 'vue'
import SelectImage from '@/components/SelectImage.vue'
import preview from '@/extensions/preview'
import { DOMSerializer, type Selection } from 'prosemirror-model'

const getHTMLFromSelection = (editor: Editor, selection: Selection) => {
  const slice = selection.content()
  const serializer = DOMSerializer.fromSchema(editor.schema)
  const fragment = serializer.serializeFragment(slice.content)
  const div = document.createElement('div')
  div.appendChild(fragment)

  return div.innerHTML
}
const VuetifyTiptapRef = inject<Ref>('VuetifyTiptapRef')
const selection = inject<Ref>('selection')
const rail = inject<Ref>('rail')
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
          'ocr'
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
        video: ['video', 'remove'],
        table: ['table', 'remove']
      },
      defaultBubbleList: (editor) => {
        // You can customize the bubble menu here
        const defaultList = defaultBubbleList(editor) // default customize bubble list

        defaultList.push({
          type: 'completion',
          component: ActionButton,
          componentProps: {
            tooltip: 'AI功能',
            icon: 'check',
            action: () => {
              selection.value = getHTMLFromSelection(editor, editor.state.selection)
              rail.value = false
            }
          }
        })
        defaultList.push({
          type: 'ocr',
          component: ActionButton,
          componentProps: {
            tooltip: 'OCR',
            icon: 'check',
            action: () => {
              const imgNode = getHTMLFromSelection(editor, editor.state.selection)
              console.log(imgNode)
              const match = imgNode.match(/src="([^"]*)"/)
              if (match !== null) {
                const imgURL = match[1]
                ocrURL.value = imgURL
                rail.value = false
              }
            }
          }
        })
        // Add the new button to the list
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
    hiddenTabs: ['upload']
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
  preview.configure({ spacer: true })
]
</script>

<template>
  <v-sheet rounded="lg">
    <VuetifyTiptap
      ref="VuetifyTiptapRef"
      :extensions="extensions"
      class="editor"
      markdown-theme="markdownTheme"
      max-width="1000"
      rounded
    >
    </VuetifyTiptap>
  </v-sheet>
</template>

<style scoped></style>
