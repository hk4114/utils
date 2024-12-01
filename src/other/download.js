/**
 * 下载文件
 * @param {String} path - 请求的地址
 * @param {String} fileName - 文件名
 */
const downloadByForm = (downloadUrl, fileName) => {
  // 创建表单
  const formObj = document.createElement("form");
  formObj.action = downloadUrl;
  formObj.method = "get";
  formObj.style.display = "none";
  // 创建input，主要是起传参作用
  const formItem = document.createElement("input");
  formItem.value = fileName; // 传参的值
  formItem.name = "fileName"; // 传参的字段名
  // 插入到网页中
  formObj.appendChild(formItem);
  document.body.appendChild(formObj);
  formObj.submit(); // 发送请求
  document.body.removeChild(formObj); // 发送完清除掉
};
/**
 * 下载文件
 * @param {String} url - 请求的地址
 * @param {String} filename - 文件名
 */
const downloadByLink = (filename, url) => {
  // 声明一下文件的header的 Content-Disposition信息
  let a = document.createElement("a");
  a.style = "display: none"; // 创建一个隐藏的a标签
  a.download = filename;
  a.href = url;
  document.body.appendChild(a);
  a.click(); // 触发a标签的click事件
  document.body.removeChild(a);
  // 等效
  // <a href="/images/download.jpg" download="myFileName">
  // window.open(url)
};

/**
 * 下载文件
 * @param {String} path - 下载地址/下载请求地址。
 * @param {String} name - 下载文件的名字/重命名（考虑到兼容性问题，最好加上后缀名）
 */
const downloadFileByBlob = (path, fname, method) => {
  const xhr = new XMLHttpRequest();
  xhr.open(method, path, true);
  req.responseType = "blob"; //如果不指定，下载后文件会打不开
  req.setRequestHeader("Content-Type", "application/json");

  xhr.onload = function () {
    // 文件名最好用后端返的Content-disposition
    // 需要后端设置 Access-Control-Expose-Headers: Content-disposition 使得浏览器将该字段暴露给前端
    const content = req.getResponseHeader("Content-Disposition");
    const name = content && content.split(";")[1].split("filename=")[1];
    const fileName = decodeURIComponent(name);
    // 如果是IE10及以上，不支持download属性，采用msSaveOrOpenBlob方法，但是IE10以下也不支持msSaveOrOpenBlob
    if ("msSaveOrOpenBlob" in navigator) {
      navigator.msSaveOrOpenBlob(this.response, name);
      return;
    }
    // const blob = new Blob([this.response], { type: xhr.getResponseHeader('Content-Type') });
    // const url = URL.createObjectURL(blob);
    const url = URL.createObjectURL(this.response);
    const a = document.createElement("a");
    a.style.display = "none";
    a.href = url;
    a.download = fname || fileName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };
  xhr.send();
};

/**
 * 下载文件
 * @param {String} path - 下载地址/下载请求地址。
 * @param {String} name - 下载文件的名字（考虑到兼容性问题，最好加上后缀名）
 */
const downloadByBase64 = (path, name) => {
  const xhr = new XMLHttpRequest();
  xhr.open("get", path);
  xhr.responseType = "blob";
  xhr.send();
  xhr.onload = function () {
    if (this.status === 200 || this.status === 304) {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(this.response);
      fileReader.onload = function () {
        const a = document.createElement("a");
        a.style.display = "none";
        a.href = this.result;
        a.download = name;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
      };
    }
  };
};

const downloadByAxios = (url, params) => {
  const downloadFile = (fileStream, name, extension, type = "") => {
    const blob = new Blob([fileStream], { type });
    const fileName = `${name}.${extension}`;
    if ("download" in document.createElement("a")) {
      const elink = document.createElement("a");
      elink.download = fileName;
      elink.style.display = "none";
      elink.href = URL.createObjectURL(blob);
      document.body.appendChild(elink);
      elink.click();
      URL.revokeObjectURL(elink.href);
      document.body.removeChild(elink);
    } else {
      navigator.msSaveBlob(blob, fileName);
    }
  };
  axios({
    method: "post",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
    },
    url,
    responseType: "blob",
    headers: {
      //如果需要权限下载的话，加在这里
      Authorization: "123456",
    },
    data: JSON.stringify(params),
  }).then(function (res) {
    var content = res.headers["content-disposition"];
    var name = content && content.split(";")[1].split("filename=")[1];
    var fileName = decodeURIComponent(name);
    downloadFile(res.data, fileName);
  });
};

// 通用下载方法
export function download(url, params, filename, config, method = "post") {
  downloadLoadingInstance = Loading.service({
    text: "正在下载数据，请稍候",
    spinner: "el-icon-loading",
    background: "rgba(0, 0, 0, 0.7)",
  });
  const configs = [
    url,
    params,
    {
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      responseType: "blob",
      ...config,
    },
  ];

  // 拼接get请求的参数
  if (method.toUpperCase().includes("GET")) {
    configs[2].transformRequest = [
      (params) => {
        return tansParams(params);
      },
    ];
  } else {
    // 生成post请求的参数
    configs[2].data = params;
  }

  return service[method](...configs)
    .then(async (data) => {
      const isLogin = await blobValidate(data);
      const blob = new Blob([data]);
      saveAs(blob, filename);
      downloadLoadingInstance.close();
    })
    .catch((r) => {
      console.error(r);
      Message.error("下载文件出现错误，请联系管理员！");
      downloadLoadingInstance.close();
    });
}

import axios from "axios";
import { Message } from "element-ui";
import { saveAs } from "file-saver";
import { getToken } from "@/utils/auth";
import errorCode from "@/utils/errorCode";
import { blobValidate } from "@/utils/ruoyi";

const baseURL = process.env.VUE_APP_BASE_API;

export default {
  name(name, isDelete = true) {
    var url =
      baseURL +
      "/common/download?fileName=" +
      encodeURIComponent(name) +
      "&delete=" +
      isDelete;
    axios({
      method: "get",
      url: url,
      responseType: "blob",
      headers: { Authorization: "Bearer " + getToken() },
    }).then(async (res) => {
      const isLogin = await blobValidate(res.data);
      if (isLogin) {
        const blob = new Blob([res.data]);
        this.saveAs(blob, decodeURIComponent(res.headers["download-filename"]));
      } else {
        this.printErrMsg(res.data);
      }
    });
  },
  resource(resource) {
    var url =
      baseURL +
      "/common/download/resource?resource=" +
      encodeURIComponent(resource);
    axios({
      method: "get",
      url: url,
      responseType: "blob",
      headers: { Authorization: "Bearer " + getToken() },
    }).then(async (res) => {
      const isLogin = await blobValidate(res.data);
      if (isLogin) {
        const blob = new Blob([res.data]);
        this.saveAs(blob, decodeURIComponent(res.headers["download-filename"]));
      } else {
        this.printErrMsg(res.data);
      }
    });
  },
  zip(url, name) {
    var url = baseURL + url;
    axios({
      method: "get",
      url: url,
      responseType: "blob",
      headers: { Authorization: "Bearer " + getToken() },
    }).then(async (res) => {
      const isLogin = await blobValidate(res.data);
      if (isLogin) {
        const blob = new Blob([res.data], { type: "application/zip" });
        this.saveAs(blob, name);
      } else {
        this.printErrMsg(res.data);
      }
    });
  },
  saveAs(text, name, opts) {
    saveAs(text, name, opts);
  },
  async printErrMsg(data) {
    const resText = await data.text();
    const rspObj = JSON.parse(resText);
    const errMsg = errorCode[rspObj.code] || rspObj.msg || errorCode["default"];
    Message.error(errMsg);
  },
};
