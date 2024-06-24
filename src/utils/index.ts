export const _getBase64 = async (file: File) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result)
    reader.onerror = (error) => reject(error)
  })
}

export const clamp = (val: any, min: number, max: number) => {
  if (val < min) {
    return min
  }
  if (val > max) {
    return max
  }
  return val
}


