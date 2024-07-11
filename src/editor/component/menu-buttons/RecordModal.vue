<script setup lang="ts">
import {ref} from "vue";
const open = ref(false)
import TapirWidget from 'vue-audio-tapir';
import 'vue-audio-tapir/dist/vue-audio-tapir.css';
const showModal = () => {
  open.value = true
}

const closeModal = () => {
  open.value = false
}

defineExpose({
  showModal,
  closeModal
})
</script>

<template>
  <a-modal v-model:open="open">
    <tapir-widget :time="2" backendEndpoint="https://your-endpoint.com/.netlify/functions/audio-message"
                  buttonColor="green"/>
  </a-modal>
</template>

<style scoped lang="scss">

</style>