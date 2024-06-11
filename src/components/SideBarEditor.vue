<template>
  <editor-content :editor="editor" class="side-bar-editor"/>

</template>

<script>
import StarterKit from '@tiptap/starter-kit';
import { Editor, EditorContent } from '@tiptap/vue-3';
import {

  Blockquote,
  Bold,
  BulletList,
  Clear,
  Code,
  CodeBlock,
  Color,
  defaultBubbleList,
  FontFamily,
  FontSize,
  Fullscreen,
  Heading,
  Highlight,
  History,
  HorizontalRule,
  Image,
  Indent,
  Italic,
  Link,
  MarkdownTheme,
  OrderedList,
  Strike,
  SubAndSuperScript,
  Table,
  TaskList,
  TextAlign,
  Underline,
  Video,
} from 'vuetify-pro-tiptap';
export default {
  components: {
    EditorContent,
  },

  props: {
    modelValue: {
      type: String,
      default: '',
    },
  },

  emits: ['update:modelValue'],

  data() {
    return {
      editor: null,
    };
  },

  watch: {
    modelValue(value) {
      // HTML
      const isSame = this.editor.getHTML() === value;

      // JSON
      // const isSame = JSON.stringify(this.editor.getJSON()) === JSON.stringify(value)

      if (isSame) {
        return;
      }

      this.editor.commands.setContent(value, false);
    },
  },

  mounted() {
    this.editor = new Editor({
      extensions: [
        StarterKit,
      ],
      content: this.modelValue,
      onUpdate: () => {
        // HTML
        this.$emit('update:modelValue', this.editor.getHTML());

        // JSON
        // this.$emit('update:modelValue', this.editor.getJSON())
      },
    });
  },

  beforeUnmount() {
    this.editor.destroy();
  },
};
</script>
<style lang="scss">
.side-bar-editor {
  min-height: 200px;
  padding: 5px;
  border: 1px solid #ddd;
  border-radius: 4px;
  background: white;
  margin: 20px 0;
  >*+* {
      margin-top: 0.75em;
    }
  code {
      background-color: rgba(#616161, 0.1);
      color: #616161;
    }
}
.content {
  padding: 1rem 0 0;

 h3 {
    margin: 1rem 0 0.5rem;
  }

  pre {
    border-radius: 5px;
    color: #333;
  }

  code {
    display: block;
    white-space: pre-wrap;
    font-size: 0.8rem;
    padding: 0.75rem 1rem;
    background-color: #e9ecef;
    color: #495057;
  }
}

</style>