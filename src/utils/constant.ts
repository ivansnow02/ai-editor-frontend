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