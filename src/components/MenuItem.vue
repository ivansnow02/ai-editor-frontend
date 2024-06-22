<script lang="ts" setup>
const props = defineProps<{
  icon: string
  title: string
  action: Function
  isActive?: Function
}>()
</script>

<template>
  <v-btn
    :class="{ 'is-active': props.isActive ? props.isActive() : null }"
    :icon="props.icon"
    :title="props.title"
    class="menu-item"
    size="small"
    variant="text"
    @click="props.action"
  >
  </v-btn>
</template>

<style lang="scss">
.menu-item {
  background: transparent;
  border: none;
  border-radius: 0.4rem;
  color: #333;
  cursor: pointer;
  height: 1.75rem;
  padding: 0.25rem;
  margin-right: 0.25rem;
  width: 1.75rem;

  &.is-active,
  &:hover {
    background-color: #d6d6d6;
  }
}
</style>
