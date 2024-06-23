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
  <!--  <div id="app">-->
  <!--    <v-app-bar border="0" flat>-->
  <!--      <v-container class="mx-auto d-flex align-center justify-center">-->
  <!--        <v-avatar class="me-4" color="grey-darken-1" size="32"></v-avatar>-->
  <!--        <Login />-->

  <!--        <v-spacer></v-spacer>-->
  <!--      </v-container>-->
  <!--    </v-app-bar>-->

  <!--      <CustomEditor />-->
  <!--    <CustomTipTap />-->
  <!--    <ElTipTap></ElTipTap>-->
  <!--  </div>-->
  <!-- <VAlert class="mb-4" type="info" title="Support repository" variant="tonal">
      <template #text>
        <div class="d-flex align-center">
          If you like the repository, you can give us
          <iframe
            class="ms-2"
            src="https://ghbtns.com/github-btn.html?user=ivansnow02&repo=ai-editor-backend&type=star&count=true"
            frameborder="0"
            scrolling="0"
            width="120"
            height="20"
            title="GitHub"
          ></iframe>
        </div>
      </template>
    </VAlert> -->

  <!-- <VBtn class="mb-4" color="primary" @click="toggleTheme">
      {{ $vuetify.theme.current.dark ? 'dark' : 'light' }}
    </VBtn>

    <VBtn class="mb-4 ms-4" color="primary" @click="locale.setLang('zhHans')"> set Chinese </VBtn>

    <VBtn class="mb-4 ms-4" color="primary" @click="locale.setLang('en')"> set English </VBtn> -->

  <!--
    <div class="my-4">
      <VBtn-toggle v-model="markdownTheme" color="deep-purple-accent-3" rounded="0" group>
        <VBtn value=""> Global </VBtn>

        <VBtn value="default"> Default </VBtn>

        <VBtn value="github"> Github </VBtn>

        <VBtn value="maidragon"> Maidragon </VBtn>
      </VBtn-toggle>
    </div> -->

  <!-- <div class="my-4">
      <VBtn-toggle v-model="output" color="deep-purple-accent-3" rounded="0" group>
        <VBtn value="html"> Html </VBtn>

        <VBtn value="json"> Json </VBtn>

        <VBtn value="text"> Text </VBtn>
      </VBtn-toggle>
    </div> -->

  <!-- <div class="my-4">
      <VDialog :width="maxWidth">
        <template #activator="{ props }">
          <VBtn v-bind="props" class="mb-4" color="primary" text="Viewer" />
        </template>

        <VCard>
          <VCardText>
            <VuetifyViewer :value="content" />
          </VCardText>
        </VCard>
      </VDialog>
    </div> -->

  <!--
    <VDivider class="my-4" />

    <JsonEditorVue v-model="content" read-only height="400px" /> -->
  <!-- <VTextarea :value="content" readonly auto-grow /> -->
  <!--
    <VDivider class="my-4" /> -->

  <!-- <VuetifyTiptap
      v-model:markdown-theme="markdownTheme"
      label="Editor 2"
      :outlined="outlined"
      :dense="dense"
      rounded
      :max-height="465"
      :max-width="maxWidth"
      :extensions="extensions"
    /> -->

  <!-- <VDivider class="my-4" />

    <VDivider class="my-4" /> -->
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
</style>
