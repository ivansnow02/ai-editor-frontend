<template>
  <div>
    <a-tooltip placement="top">
      <template #title>
        <span>字体</span>
      </template>
      <div class="header_button">
        <a-select v-model:value="title" @change="handleChange">
          <a-select-option :value="0">正文</a-select-option>
          <a-select-option :value="1">H1</a-select-option>
          <a-select-option :value="2"><span class="header--title">H2</span></a-select-option>
          <a-select-option :value="3"><span class="header--title">H3</span></a-select-option>
          <a-select-option :value="4"><span class="header--title">H4</span></a-select-option>
          <a-select-option :value="5"><span class="header--title">H5</span></a-select-option>
          <a-select-option :value="6"><span class="header--title">H6</span></a-select-option>
        </a-select>
      </div>
    </a-tooltip>
  </div>
</template>

<script lang="ts" setup>
import { defineModel, inject, type Ref } from 'vue'

const title = defineModel()
const props = defineProps(['editor'])

const handleChange = (value: number) => {
  // console.log('value', value)
  if (value === 0) {
    props.editor.chain().focus().setParagraph().run()
  } else {
    props.editor.chain().focus().toggleHeading({ level: value }).run()
  }
}
// const handleChange = (value: string) => {
//   console.log(`selected ${value}`)
// }
</script>
