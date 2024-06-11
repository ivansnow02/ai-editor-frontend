<script setup lang="ts">
import { computed, ref, unref, watch } from 'vue'

interface SelectImageProps {
  modelValue?: Record<string, string>
  upload?: (file: File) => Promise<string> // vue warn
  t: (path: string) => string // vue warn
}

type SelectImageEmits = (event: 'update:modelValue', form?: Record<string, string>) => void

const props = withDefaults(defineProps<SelectImageProps>(), {
  modelValue: () => ({}),
  upload: undefined
})

const emits = defineEmits<SelectImageEmits>()

const uploadedFile = ref('')

const form = computed({
  get: () => props.modelValue,
  set: val => {
    emits('update:modelValue', val)
  }
})

const items = [
  { alt: 'Test 1', src: 'https://picsum.photos/1920/1080.webp?t=1' },
  { alt: 'Test 2', src: 'https://picsum.photos/1920/1080.webp?t=2' },
  { alt: 'Test 3', src: 'https://picsum.photos/1920/1080.webp?t=3' }
]
const handleFileTo64Base = (event: Event) => {
  const file = (event.target as HTMLInputElement).files?.[0];
  if (file) {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const base64String = reader.result as string;
      form.value.src = base64String;
    };
  }
};
watch(
  () => unref(form).src,
  val => {
    const find = items.find(k => k.src === val)
    if (find) {
      form.value.alt = find.alt
    }
  }
)
</script>

<template>

  <v-file-input clearable label="上传图片" variant="outlined"
    @change="handleFileTo64Base"></v-file-input>

  <VTextField v-model="form.alt" label="Alt" />

  <VCheckbox v-model="form.lockAspectRatio" label="Lock original aspect ratio" />
</template>