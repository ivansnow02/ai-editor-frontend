export const toBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      if (reader.result) {
        const base64String = reader.result as string;
        const base64Data = base64String.replace(/^[^,]+,/, '');
        resolve(base64Data);
      } else {
        reject(new Error('No result from FileReader'));
      }
    };
    reader.onerror = (error) => reject(error);
  });
};