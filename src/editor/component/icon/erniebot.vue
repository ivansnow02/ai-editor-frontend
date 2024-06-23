<script lang="ts" setup>
import Icon from 'vue'

const icons = import.meta.globEager('/public/*.ico')
const iconSrc = icons['/public/文心一言.ico'].default
</script>

<template>
  <icon>
    <template #component>
      <img :src="iconSrc" alt="Ernie Icon" />
    </template>
  </icon>
</template>

<style lang="scss" scoped></style>
