<template>
    <div>
        <a-tooltip placement="top">
            <template #title>
                <span>智能排版</span>
            </template>
            <div :class="[
                'tools__button',
                {
                    'tool--active': !lRail
                }
            ]" @click="handleClick">
                <FormOutlined style="font-size: 16px; font-weight: 600" />
            </div>
        </a-tooltip>
    </div>
</template>
<script setup lang="ts">
import { FormOutlined } from '@ant-design/icons-vue'
import { inject, type Ref } from 'vue';
const lRail = inject<Ref>('lRail')

const handleClick = () => {
    console.log('AI')
    if (lRail) {
        lRail.value = !lRail.value
    }
}
</script>
<style lang="scss" scoped>
</style>