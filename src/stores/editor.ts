import { defineStore } from 'pinia'
import type { Editor } from '@tiptap/core'

export const useEditorStore = defineStore({
  id: 'editor',
  state: () => ({
    editorRef: null as Editor | null
  }),
  actions: {
    setEditorRef(ref: Editor) {
      this.editorRef = ref
    }
  }
})
