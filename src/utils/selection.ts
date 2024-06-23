import type { Editor } from 'vuetify-pro-tiptap'
import type { Selection } from 'prosemirror-model'
import { DOMSerializer } from 'prosemirror-model'

export const getHTMLFromSelection = (editor: Editor, selection: Selection) => {
  const slice = selection.content()
  const serializer = DOMSerializer.fromSchema(editor.schema)
  const fragment = serializer.serializeFragment(slice.content)
  const div = document.createElement('div')
  div.appendChild(fragment)

  return div.innerHTML
}
