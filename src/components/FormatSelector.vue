<template>
  <div>
    <a-form-item label="字号">
      <a-select v-model:value="fontSize" style="width: 150px">
        <a-select-option v-for="font in fontSizeOptions" :key="font.value" :value="font.label">
          {{ font.label }}
        </a-select-option>
      </a-select>
    </a-form-item>
    <a-form-item label="字体">
      <a-select v-model:value="fontFamily" style="width: 150px">
        <a-select-option v-for="font in fontFamilyOptions" :key="font.value" :value="font.value">
          <p :style="{ 'font-family': font.value }">{{ font.label }}</p>
        </a-select-option>
      </a-select>
    </a-form-item>
    <a-form-item label="对齐方式">
    <a-segmented v-model:value="alignment" block :options="Alignment" />
    </a-form-item>  
    <a-form-item label="加粗">
      <a-switch v-model:checked="bold" />
    </a-form-item>
    

  </div>
</template>

<script setup lang="ts">
import { defineModel } from 'vue'
import { fontSizeOptions, fontFamilyOptions } from '@/utils/constant'

const Alignment = [
  {
    label: '左对齐',
    value: 'left'
    },
    {
    label: '居中',
    value: 'center'
    },
    {
    label: '右对齐',
    value: 'right'
    },
]

const fontSize = defineModel('fontSize')
const fontFamily = defineModel('fontFamily')
const alignment = defineModel('alignment')
const bold = defineModel('bold')

</script>
