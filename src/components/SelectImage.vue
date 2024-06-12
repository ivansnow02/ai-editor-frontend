<script setup lang="ts">
import { computed, ref, unref, watch } from 'vue'
import { uploadImg } from '../apis/pic'
import { ROOT_URL } from '@/utils/request';
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

const uploadedFile = ref<File | null>(null)

const form = computed({
  get: () => props.modelValue,
  set: val => {
    emits('update:modelValue', val)
  }
})


const uploadFile = (event: Event) => {
  if (uploadedFile.value === null) {
    console.error('No file uploaded');
    return;
  }

  const body = new FormData();
  body.append('file', uploadedFile.value);

  uploadImg(body).then(res => {
    console.log(res.data.data.url);
    const url = `${ROOT_URL}/${res.data.data.url}`;
    console.log(url);
    form.value.src = url;
  });
};
// watch(
//   () => unref(form).src,
//   val => {
//     const find = items.find(k => k.src === val)
//     if (find) {
//       form.value.alt = find.alt
//     }
//   }
// )
</script>

<template>

  <v-file-input clearable v-model="uploadedFile" label="上传图片" variant="outlined"
    @change="uploadFile"></v-file-input>

  <VTextField v-model="form.alt" label="Alt" />

  <VCheckbox v-model="form.lockAspectRatio" label="Lock original aspect ratio" />
</template>