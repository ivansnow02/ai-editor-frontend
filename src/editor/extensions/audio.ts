import { Node } from '@tiptap/core'
import { VueNodeViewRenderer } from '@tiptap/vue-3'
import AudioView from '../component/extensions/AudioView.vue'

const Audio = Node.create({
  name: 'audio',

  group() {
    return 'block'
  },
  draggable: true,

  addAttributes() {
    return {
      src: {
        default: null
      },
      display: {
        default: 'left'
      }
    }
  },
  addCommands() {
    return {
      setAudio:
        (options) =>
        ({ commands }) => {
          return commands.insertContent({
            type: this.name,
            attrs: options
          })
        }
    }
  },

  addNodeView() {
    return VueNodeViewRenderer(AudioView)
  }
})

export default Audio
