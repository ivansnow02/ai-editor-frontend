import type { GeneralOptions } from 'vuetify-pro-tiptap'
import { Extension } from '@tiptap/core'

import CompletionActionBubbleButton from '../components/CompletionActionBubbleButton.vue'

export type CompletionOptions = GeneralOptions<CompletionOptions>

export default Extension.create<CompletionOptions>({
  name: 'completion',
  addOptions() {
    return {
      divider: false,
      spacer: false,
      button: () => ({
        component: CompletionActionBubbleButton,
        componentProps: {}
      })
    }
  }
})
