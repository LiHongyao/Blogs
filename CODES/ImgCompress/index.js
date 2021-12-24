/*
 * @Author: Li-HONGYAO
 * @Date: 2021-05-08 14:23:52
 * @LastEditTime: 2021-05-10 10:02:35
 * @LastEditors: Li-HONGYAO
 * @Description:
 * @FilePath: \02.ImgCompress\index.js
 */

(function () {
  // 压缩图片需要的一些元素和对象
  const reader = new FileReader();
  const img = new Image();
  const eleFile = document.querySelector("#file");
  // 缩放图片需要的canvas
  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d");
  // 选择的文件对象
  let file = null;
  // base64地址图片加载完毕后
  img.onload = function () {
    // 图片原始尺寸
    const originWidth = this.width;
    const originHeight = this.height;
    // 最大尺寸限制
    const maxWidth = 400, maxHeight = 400;
    // 目标尺寸
    const targetWidth = originWidth, targetHeight = originHeight;
    // 图片尺寸超过400x400的限制
    if (originWidth > maxWidth || originHeight > maxHeight) {
      if (originWidth / originHeight > maxWidth / maxHeight) {
        // 更宽，按照宽度限定尺寸
        targetWidth = maxWidth;
        targetHeight = Math.round(maxWidth * (originHeight / originWidth));
      } else {
        targetHeight = maxHeight;
        targetWidth = Math.round(maxHeight * (originWidth / originHeight));
      }
    }

    // canvas对图片进行缩放
    canvas.width = targetWidth;
    canvas.height = targetHeight;
    // 清除画布
    context.clearRect(0, 0, targetWidth, targetHeight);
    // 图片压缩
    context.drawImage(img, 0, 0, targetWidth, targetHeight);
    // canvas转为blob并上传
    canvas.toBlob(function (blob) {
      // 图片ajax上传
      const xhr = new XMLHttpRequest();
      // 文件上传成功
      xhr.onreadystatechange = function () {
        if (xhr.status == 200) {
          // xhr.responseText就是返回的数据
        }
      };
      // 开始上传
      xhr.open("POST", "upload.php", true);
      xhr.send(blob);
    }, file.type || "image/png");
  };
  // 文件base64化，以便获知图片原始尺寸
  reader.onload = function (e) {
    // e.target.result就是图片的base64地址信息
    img.src = e.target.result;
  };
  eleFile.addEventListener("change", (event) => {
    file = event.target.files[0];
    if (/image/.test(file.type)) {
      // 读取文件
      reader.readAsDataURL(file);
    }
  });
})();
