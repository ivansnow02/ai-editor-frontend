<script setup lang="ts">
import { h, ref, reactive, watch, type UnwrapRef, inject, type Ref } from "vue";
import { CloseOutlined } from "@ant-design/icons-vue";
import { useEditorStore } from "@/stores/editor";
const lRail = inject<Ref>("lRail");
const handleClose = () => {
  if (lRail) {
    lRail.value = true;
  }
};
const activeKey = ref(["1"]);
const editorStore = useEditorStore();
let editorRef = editorStore.editorRef;
watch(
	() => editorStore.editorRef,
	(newVal) => {
		if (newVal) {
			editorRef = newVal;
		}
	},
	{ immediate: true },
);
import { fontFamilyOptions } from "@/utils/constant";
import { fontSizeOptions } from "@/utils/constant";

interface FormatDict {
	[key: string]: {
		fontSize?: string;
		fontFamily?: string;
		lineHeight?: string;
		width?: number;
		display?: string;
		height?: number | null;
	};
	h0: { fontSize: string; fontFamily: string; lineHeight: string };
	h1: { fontSize: string; fontFamily: string; lineHeight: string };
	h2: { fontSize: string; fontFamily: string; lineHeight: string };
	h3: { fontSize: string; fontFamily: string; lineHeight: string };
	h4: { fontSize: string; fontFamily: string; lineHeight: string };
	h5: { fontSize: string; fontFamily: string; lineHeight: string };
	image: { width: number; display: string; height: number | null };
}

const formatDict: UnwrapRef<FormatDict> = reactive({
	h0: {
		fontSize: "小四",
		fontFamily: "Impact",
		lineHeight: "1.5",
	},
	h1: {
		fontSize: "二号",
		fontFamily: "Impact",
		lineHeight: "1.5",
	},
	h2: {
		fontSize: "小二",
		fontFamily: "Poppins",
		lineHeight: "1.5",
	},
	h3: {
		fontSize: "三号",
		fontFamily: "Poppins",
		lineHeight: "1.5",
	},
	h4: {
		fontSize: "小三",
		fontFamily: "Poppins",
		lineHeight: "1.5",
	},
	h5: {
		fontSize: "四号",
		fontFamily: "Poppins",
		lineHeight: "1.5",
	},
	image: {
		width: 100,
		display: "block",
		height: null,
	},
});

const handleFormat = () => {
	editorRef?.state.doc.descendants((node, pos) => {
		if (node.type.name === "heading") {
			// 确保我们只处理标题节点
			const fontSize = `${fontSizeOptions.find((item) => item.label === formatDict[`h${node.attrs.level}`]?.fontSize)?.value}px`; // 计算字体大小
			if (!fontSize) return;
			const fontFamily =
				formatDict[`h${node.attrs.level}`]?.fontFamily || "Poppins"; // 计算字体
			// 设置光标位置到节点起始位置
			editorRef
				?.chain()
				.focus()
				.setTextSelection({ from: pos, to: pos + node.nodeSize })
				.setFontSize(fontSize)
				.run();
			editorRef
				?.chain()
				.focus()
				.setTextSelection({ from: pos, to: pos + node.nodeSize })
				.setFontFamily(fontFamily)
				.run();
		} else if (node.type.name === "paragraph") {
			const fontSize = `${fontSizeOptions.find((item) => item.label === formatDict.h0.fontSize)?.value}px`; // 计算字体大小
			console.log(formatDict.h0.fontSize);
			console.log(fontSize);
			// 设置光标位置到节点起始位置
			editorRef
				?.chain()
				.focus()
				.setTextSelection({ from: pos, to: pos + node.nodeSize })
				.setFontSize(fontSize)
				.run();
			editorRef
				?.chain()
				.focus()
				.setTextSelection({ from: pos, to: pos + node.nodeSize })
				.setFontFamily(formatDict.h0.fontFamily)
				.run();
		} else if (node.type.name === "image") {
			console.log(node.attrs);
			// 设置节点属性
			editorRef
				?.chain()
				.focus()
				.setTextSelection({ from: pos, to: pos + node.nodeSize })
				.updateAttributes(node.type, {
          width: formatDict.image.width,
          display: formatDict.image.display,
          height: formatDict.image.height,
        })
				.run();
		}
	});
};
</script>

<template>
  <a-layout-sider
    :collapsed="lRail"
    :trigger="null"
    collapsed-width="0"
    collapsible
    theme="light"
    :style="{
      overflow: 'auto',
      position: 'fixed',
      left: 0,
      top: 0,
      bottom: 0,
      marginLeft: '5px'
    }"
    class="ai-component"
    width="20%"
  >
    <a-card
      class="ai-component-card"
      hoverable
      title="智能排版"
      :bodyStyle="{
        padding: '0',
        overflow: 'auto',
        maxHeight: 'calc(100vh - 250px - 30px - 56px)'
      }"
    >
      <template #extra>
        <a-button
          :icon="h(CloseOutlined)"
          shape="circle"
          size="small"
          type="text"
          @click="handleClose"
        ></a-button>
      </template>
      <a-form :model="formatDict">
        <a-collapse v-model:activeKey="activeKey" :bordered="false">
          <a-collapse-panel key="1" header="标题一">
            <a-form-item label="字号">
              <a-select v-model:value="formatDict.h1.fontSize" style="width: 150px">
                <a-select-option
                  v-for="font in fontSizeOptions"
                  :key="font.value"
                  :value="font.label"
                >
                  {{ font.label }}
                </a-select-option>
              </a-select>
            </a-form-item>
            <a-form-item label="字体">
              <a-select v-model:value="formatDict.h1.fontFamily" style="width: 150px">
                <a-select-option
                  v-for="font in fontFamilyOptions"
                  :key="font.value"
                  :value="font.value"
                >
                  <p :style="{ 'font-family': font.value }">{{ font.label }}</p>
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-collapse-panel>
          <a-collapse-panel key="2" header="标题二">
            <a-form-item label="字号">
              <a-select v-model:value="formatDict.h2.fontSize" style="width: 150px">
                <a-select-option
                  v-for="font in fontSizeOptions"
                  :key="font.value"
                  :value="font.label"
                >
                  {{ font.label }}
                </a-select-option>
              </a-select>
            </a-form-item>
            <a-form-item label="字体">
              <a-select v-model:value="formatDict.h2.fontFamily" style="width: 150px">
                <a-select-option
                  v-for="font in fontFamilyOptions"
                  :key="font.value"
                  :value="font.value"
                >
                  <p :style="{ 'font-family': font.value }">{{ font.label }}</p>
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-collapse-panel>
          <a-collapse-panel key="3" header="标题三">
            <a-form-item label="字号">
              <a-select v-model:value="formatDict.h3.fontSize" style="width: 150px">
                <a-select-option
                  v-for="font in fontSizeOptions"
                  :key="font.value"
                  :value="font.label"
                >
                  {{ font.label }}
                </a-select-option>
              </a-select>
            </a-form-item>
            <a-form-item label="字体">
              <a-select v-model:value="formatDict.h3.fontFamily" style="width: 150px">
                <a-select-option
                  v-for="font in fontFamilyOptions"
                  :key="font.value"
                  :value="font.value"
                >
                  <p :style="{ 'font-family': font.value }">{{ font.label }}</p>
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-collapse-panel>
          <a-collapse-panel key="4" header="标题四">
            <a-form-item label="字号">
              <a-select v-model:value="formatDict.h4.fontSize" style="width: 150px">
                <a-select-option
                  v-for="font in fontSizeOptions"
                  :key="font.value"
                  :value="font.label"
                >
                  {{ font.label }}
                </a-select-option>
              </a-select>
            </a-form-item>
            <a-form-item label="字体">
              <a-select v-model:value="formatDict.h4.fontFamily" style="width: 150px">
                <a-select-option
                  v-for="font in fontFamilyOptions"
                  :key="font.value"
                  :value="font.value"
                >
                  <p :style="{ 'font-family': font.value }">{{ font.label }}</p>
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-collapse-panel>
          <a-collapse-panel key="5" header="标题五">
            <a-form-item label="字号">
              <a-select v-model:value="formatDict.h5.fontSize" style="width: 150px">
                <a-select-option
                  v-for="font in fontSizeOptions"
                  :key="font.value"
                  :value="font.label"
                >
                  {{ font.label }}
                </a-select-option>
              </a-select>
            </a-form-item>
            <a-form-item label="字体">
              <a-select v-model:value="formatDict.h5.fontFamily" style="width: 150px">
                <a-select-option
                  v-for="font in fontFamilyOptions"
                  :key="font.value"
                  :value="font.value"
                >
                  <p :style="{ 'font-family': font.value }">{{ font.label }}</p>
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-collapse-panel>
          <a-collapse-panel key="6" header="正文">
            <a-form-item label="字号">
              <a-select v-model:value="formatDict.h0.fontSize" style="width: 150px">
                <a-select-option
                  v-for="font in fontSizeOptions"
                  :key="font.value"
                  :value="font.label"
                >
                  {{ font.label }}
                </a-select-option>
              </a-select>
            </a-form-item>
            <a-form-item label="字体">
              <a-select v-model:value="formatDict.h0.fontFamily" style="width: 150px">
                <a-select-option
                  v-for="font in fontFamilyOptions"
                  :key="font.value"
                  :value="font.value"
                >
                  <p :style="{ 'font-family': font.value }">{{ font.label }}</p>
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-collapse-panel>
        </a-collapse>
      </a-form>
      <a-button type="primary" @click="handleFormat">智能排版</a-button>
    </a-card>
  </a-layout-sider>
</template>

<style scoped lang="scss">
$top: 250px;

.ai-component {
  height: calc(100vh - $top);
  margin-top: $top;
  background: none !important;
}

.ai-component-card {
  height: calc(100vh - $top - 30px);
}

.ant-collapse-item {
  overflow: auto;
}
</style>

<style lang="scss">
.editor .tiptap {
  h1 {
    font-size: 29.3px;
  }

  h2 {
    font-size: 24px;
  }

  h3 {
    font-size: 21.3px;
  }

  h4 {
    font-size: 20px;
  }

  h5 {
    font-size: 18.7px;
  }
}
</style>
