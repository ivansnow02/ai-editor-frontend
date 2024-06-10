export const toBase64 = (file: File) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => {
  if (reader.result) {
    const base64String  = reader.result as string;
    const base64Data = base64String.replace(/^[^,]+,/, '');
    return base64Data;
  }

}

}
