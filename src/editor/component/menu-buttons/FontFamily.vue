<template>
  <div>
    <a-tooltip placement="top">
      <template #title>
        <span>字体</span>
      </template>
      <div class="header_button">
        <a-select v-model:value="value" style="width: 150px" @change="handleChange">
          <a-select-option v-for="font in fontFamilyOptions" :key="font.value" :value="font.value">
            <p :style="{ 'font-family': font.value }">{{ font.label }}</p>
          </a-select-option>
        </a-select>
      </div>
    </a-tooltip>
  </div>
</template>

<script lang="ts" setup>
import { defineModel } from 'vue'
import { fontFamilyOptions } from '@/utils/constant'

const value = defineModel()

const props = defineProps(['editor', 'placement'])

const handleChange = (value: string) => {
  props.editor.chain().focus().setFontFamily(value).run()
}
</script>
