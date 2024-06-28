<template>
  <div>
    <a-tooltip placement="top">
      <template #title>
        <span>字号</span>
      </template>
      <div class="header_button">
        <a-select v-model:value="value" :options="fontSizeOptions" @change="handleChange" />
      </div>
    </a-tooltip>
  </div>
</template>

<script lang="ts" setup>
import { defineModel, inject, type Ref } from 'vue'
import { fontSizeOptions } from '@/utils/constant'

const value = defineModel()

const props = defineProps(['editor'])

const handleChange = (value: string) => {
  const fontSize = `${value}px`
  props.editor.chain().focus().setFontSize(fontSize).run()
}
</script>
