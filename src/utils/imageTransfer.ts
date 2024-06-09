import axios from "axios";
const getBase64Image = (img) => {
      var canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;
      var ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0, img.width, img.height);
      var ext = img.src.substring(img.src.lastIndexOf(".") + 1).toLowerCase();
      var dataURL = canvas.toDataURL("image/" + ext);
      return dataURL
    }
const base64toFile = (dataurl, filename = 'file') => {
      let arr = dataurl.split(',')
      let mime = arr[0].match(/:(.*?);/)[1]
      let suffix = mime.split('/')[1]
      let bstr = atob(arr[1])//atob() 方法用于解码使用 base-64 编码的字符串，浏览器中需要使用这个方法，nodeJS中会提示使用Buffer类来实现。但是浏览器window中没有这个类，因此这里就使用浏览器中有的方法
      let n = bstr.length
      let u8arr = new Uint8Array(n)
      while (n--) {
        u8arr[n] = bstr.charCodeAt(n)
      }
      let file = new File([u8arr], `${filename}.${suffix}`, {
        type: mime
      })
      return file
    }
      let imgLink = "图片链接地址";
      let tempImage = new Image();
      tempImage.src = imgLink;
      tempImage.crossOrigin = "*";
      const headers = { 'token': localStorage.getItem('token') };
      tempImage.headers = headers;
      tempImage.onload = function () {
        let base64 = getBase64Image(tempImage);
        let file = base64toFile(base64);
        const formData = new FormData();
        formData.append('faceFile', file);
        let url = 'localhost:8000';
        axios.defaults.headers["Content-Type"] = "multipart/form-data;boundary=" + new Date().getTime();
        axios.defaults.headers['token'] = localStorage.getItem('token');
        axios.defaults.headers['X-Requested-With'] = 'XMLHttpRequest'
        axios.post(url, formData).then(res => {
          console.log(res)
        }).catch(err => {
          console.log(err)
        })

      }