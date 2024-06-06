<!-- src/components/AppendText.vue -->
<template>
  <VBtn tooltip="ai续写"  @click="appendText" >
    <VIcon>{{ `svg:${mdiFountainPenTip}` }}</VIcon>
  </VBtn>

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