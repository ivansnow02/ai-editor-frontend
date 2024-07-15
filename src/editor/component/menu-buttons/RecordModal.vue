<script setup lang="ts">
import {ref} from "vue";
const open = ref(false)
import TapirWidget from 'vue-audio-tapir';
import 'vue-audio-tapir/dist/vue-audio-tapir.css';
import { _getBase64 } from '@/utils'
const emit = defineEmits(['emitInsert'])
const showModal = () => {
  open.value = true
}

const closeModal = () => {
  open.value = false
}

const handleEmit = async (data: any) => {
  const isAudio = data.type === 'audio/mp3' || data.type === 'audio/wav'
  const base64Url = await _getBase64(data)
  if (isAudio) {
    emit('emitInsert', { url: base64Url })
  }

}



defineExpose({
  showModal,
  closeModal
})
</script>

<template>
  <a-modal v-model:open="open" :footer="null">
    <tapir-widget :time="2" :customUpload="handleEmit"
                  />
  </a-modal>
</template>

<style scoped lang="scss">
.shadow-lg {
  border-style: none !important;
  box-shadow: none !important;

}

</style>