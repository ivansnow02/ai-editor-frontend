<script setup lang="ts">

// const output = ref<'html' | 'json' | 'text'>('html')
// const content = ref('')
// const markdownTheme = ref('')
// const outlined = ref(true)
// const dense = ref(false)
// const editHtml = ref(false)
// const hideToolbar = ref(false)
// const disableToolbar = ref(false)
// const errorMessages = ref(null)

// watch(content, val => {
//   console.log('output :>> ', val)
// })

//TODO 待完成
const links = ['编辑器', '登录']
// async function onChangeEditor({ editor, output }: VuetifyTiptapOnChange) {
//   const formData = {
//     input: {
//       human_input: editor.getText()
//     }
//   }
//   if (editor.getText().endsWith('，')) {
//     const result = await getCompletion(formData)
//     console.log('result :>> ', result.data.output)
//   }
// }
</script>
<template>
  <v-app>
    <router-view />
  </v-app>

</template>

<style>
#app {
  margin: 0;
  padding: 0;
  position: relative;
  width: 100%;
  height: 100%;
  display: grid;
}
*{
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'Poppins',sans-serif;
}
</style>
