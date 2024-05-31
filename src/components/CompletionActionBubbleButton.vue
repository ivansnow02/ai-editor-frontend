<!-- src/components/AppendText.vue -->
<template>
  <ActionButton tooltip="ai续写" :disabled="disabled" @click="appendText" >
    <VIcon>{{ `svg:${mdiFountainPenTip}` }}</VIcon>
  </ActionButton>

</template>

<script setup lang="ts">
import { getCompletion } from '@/apis/generate'
import type { Editor } from '@tiptap/vue-3'
import { mdiFountainPenTip } from '@mdi/js';
interface Props {
  editor: Editor
  tooltip?: string
  disabled?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  tooltip: undefined,
  disabled: false
})


const appendText = async () => {
      const formData = {
        input: {
          human_input: props.editor.getText()
        }
      }
      const result = await getCompletion(formData)
      props.editor.chain().insertContent(result.data.output).run()
    }

</script>