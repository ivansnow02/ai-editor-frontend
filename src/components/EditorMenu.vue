<template>
  <v-toolbar density="compact" flat height="18px">
    <template v-for="(item, index) in items">
      <v-spacer v-if="item.type === 'divider'" :key="`divider${index}`" />
      <MenuItem v-else :key="index" v-bind="item" />
    </template>
  </v-toolbar>
</template>

<script lang="ts" setup>
import { Editor } from '@tiptap/vue-3'
import MenuItem from '@/components/MenuItem.vue'

const props = defineProps<{ editor: Editor }>()

const items = [
  {
    icon: 'mdi-format-bold',
    title: 'Bold',
    action: () => props.editor?.chain().focus().toggleBold().run(),
    isActive: () => props.editor?.isActive('bold')
  },
  {
    icon: 'mdi-format-italic',
    title: 'Italic',
    action: () => props.editor?.chain().focus().toggleItalic().run(),
    isActive: () => props.editor?.isActive('italic')
  },
  {
    icon: 'mdi-format-strikethrough',
    title: 'Strike',
    action: () => props.editor?.chain().focus().toggleStrike().run(),
    isActive: () => props.editor?.isActive('strike')
  },
  {
    icon: 'mdi-code-brackets',
    title: 'Code',
    action: () => props.editor?.chain().focus().toggleCode().run(),
    isActive: () => props.editor?.isActive('code')
  },
  {
    icon: 'mdi-format-color-highlight',
    title: 'Highlight',
    action: () => props.editor?.chain().focus().toggleHighlight().run(),
    isActive: () => props.editor?.isActive('highlight')
  },
  {
    type: 'divider'
  },
  {
    icon: 'mdi-format-header-1',
    title: 'Heading 1',
    action: () => props.editor?.chain().focus().toggleHeading({ level: 1 }).run(),
    isActive: () => props.editor?.isActive('heading', { level: 1 })
  },
  {
    icon: 'mdi-format-header-2',
    title: 'Heading 2',
    action: () => props.editor?.chain().focus().toggleHeading({ level: 2 }).run(),
    isActive: () => props.editor?.isActive('heading', { level: 2 })
  },
  {
    icon: 'mdi-format-header-3',
    title: 'Heading 3',
    action: () => props.editor?.chain().focus().toggleHeading({ level: 3 }).run(),
    isActive: () => props.editor?.isActive('heading', { level: 3 })
  },
  {
    icon: 'mdi-format-header-4',
    title: 'Heading 4',
    action: () => props.editor?.chain().focus().toggleHeading({ level: 4 }).run(),
    isActive: () => props.editor?.isActive('heading', { level: 4 })
  },
  {
    icon: 'mdi-format-paragraph',
    title: 'Paragraph',
    action: () => props.editor?.chain().focus().setParagraph().run(),
    isActive: () => props.editor?.isActive('paragraph')
  },
  {
    icon: 'mdi-format-list-bulleted',
    title: 'Bullet List',
    action: () => props.editor?.chain().focus().toggleBulletList().run(),
    isActive: () => props.editor?.isActive('bulletList')
  },
  {
    icon: 'mdi-format-list-numbered',
    title: 'Ordered List',
    action: () => props.editor?.chain().focus().toggleOrderedList().run(),
    isActive: () => props.editor?.isActive('orderedList')
  },
  {
    icon: 'mdi-format-list-checkbox',
    title: 'Task List',
    action: () => props.editor?.chain().focus().toggleTaskList().run(),
    isActive: () => props.editor?.isActive('taskList')
  },
  {
    icon: 'mdi-code-block-braces',
    title: 'Code Block',
    action: () => props.editor?.chain().focus().toggleCodeBlock().run(),
    isActive: () => props.editor?.isActive('codeBlock')
  },
  {
    type: 'divider'
  },
  {
    icon: 'mdi-format-quote-open',
    title: 'Blockquote',
    action: () => props.editor?.chain().focus().toggleBlockquote().run(),
    isActive: () => props.editor?.isActive('blockquote')
  },
  {
    icon: 'mdi-minus',
    title: 'Horizontal Rule',
    action: () => props.editor?.chain().focus().setHorizontalRule().run()
  },
  {
    type: 'divider'
  },
  {
    icon: 'mdi-format-text-wrapping-clip',
    title: 'Hard Break',
    action: () => props.editor?.chain().focus().setHardBreak().run()
  },
  {
    icon: 'mdi-format-clear',
    title: 'Clear Format',
    action: () => props.editor?.chain().focus().clearNodes().unsetAllMarks().run()
  },
  {
    type: 'divider'
  },
  {
    icon: 'mdi-undo',
    title: 'Undo',
    action: () => props.editor?.chain().focus().undo().run()
  },
  {
    icon: 'mdi-redo',
    title: 'Redo',
    action: () => props.editor?.chain().focus().redo().run()
  }
]
</script>

<style lang="scss"></style>
