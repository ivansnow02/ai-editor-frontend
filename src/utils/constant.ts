import { ImageDisplay } from './image.ts'

export const Alignment = {
  left: 'left',
  center: 'center',
  right: 'right',
  justify: 'justify'
}

export const DEFAULT_IMAGE_WIDTH = 200
export const DEFAULT_IMAGE_DISPLAY = ImageDisplay.INLINE
export const LINE_HEIGHT_100 = 1.7
export const DEFAULT_LINE_HEIGHT = '100%'

export const DEFAULT_VIDEO_WIDTH = 300

export const enums = {
  INIT: 'init',
  TRANSACTION: 'transaction',
  FOCUS: 'focus',
  BLUR: 'blur',
  PASTE: 'paste',
  DROP: 'drop',
  UPDATE: 'update'
}


export const fontSizeOptions = [
  { value: 34.7, label: '一号' },
  { value: 32, label: '小一' },
  { value: 29.3, label: '二号' },
  { value: 24, label: '小二' },
  { value: 21.3, label: '三号' },
  { value: 20, label: '小三' },
  { value: 18.7, label: '四号' },
  { value: 16, label: '小四' },
  { value: 14, label: '五号' },
  { value: 12, label: '小五' },
  { value: 10, label: '六号' },
  { value: 8.7, label: '小六' },
  { value: 7.3, label: '七号' },
  { value: 6.7, label: '八号' }
]


export const headingFontSize: Record<number, number> = {
  0: 16,
  1: 29.3,
  2: 24,
  3: 21.3,
  4: 20,
  5: 18.7
}


export const fontFamilyOptions = [
  { value: 'Poppins', label: 'Poppins' },
  { value: 'Arial', label: 'Arial' },
  { value: 'Georgia', label: 'Georgia' },
  { value: 'Impact', label: 'Impact' },
  { value: 'Tahoma', label: 'Tahoma' },
  { value: 'Times New Roman', label: 'Times New Roman' },
  { value: 'Verdana', label: 'Verdana' },
  { value: 'Microsoft YaHei', label: '微软雅黑' },
  { value: 'SimSun', label: '宋体' },
  { value: 'SimHei', label: '黑体' },
  { value: 'FangSong', label: '仿宋' },
  { value: 'KaiTi', label: '楷体' },
  { value: 'LiSu', label: '隶书' },
  { value: 'YouYuan', label: '幼圆' },
  { value: 'STXihei', label: '华文细黑' },
  { value: 'STKaiti', label: '华文楷体' },
  { value: 'STSong', label: '华文宋体' },
  { value: 'STZhongsong', label: '华文中宋' },
  { value: 'STFangsong', label: '华文仿宋' },
  { value: 'FZShuTi', label: '方正舒体' },
  { value: 'FZYaoti', label: '方正姚体' },
  { value: 'STCaiyun', label: '华文彩云' },
  { value: 'STHupo', label: '华文琥珀' },
  { value: 'STLiti', label: '华文隶书' },
  { value: 'STXingkai', label: '华文行楷' },
  { value: 'STXinwei', label: '华文新魏' }
]