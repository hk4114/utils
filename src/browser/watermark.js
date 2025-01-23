// 默认水印配置
const defaultOptions = {
  text: "",
  font: "14px Arial",
  fillStyle: "rgba(0, 0, 0, .1)",
  rotate: -20,
  zIndex: 100000,
  width: 200,
  height: 150,
  id: "1.23452384164.123412415",
};

// 创建水印
const createWatermark = (options = {}) => {
  const config = { ...defaultOptions, ...options };
  const { text, width, height, font, fillStyle, rotate, id } = config;

  // 创建离屏 canvas
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;

  const ctx = canvas.getContext("2d");
  ctx.rotate((rotate * Math.PI) / 180);
  ctx.font = font;
  ctx.fillStyle = fillStyle;
  ctx.textAlign = "left";
  ctx.textBaseline = "middle";

  // 支持多行文本
  const textLines = Array.isArray(text) ? text : [text];
  const lineHeight = height / (textLines.length + 1);
  textLines.forEach((line, index) => {
    ctx.fillText(line, 0, lineHeight * (index + 1));
  });

  return {
    id,
    dataUrl: canvas.toDataURL("image/png"),
  };
};

// 应用水印
const applyWatermark = (options = {}) => {
  const { id } = options;

  // 移除已存在的水印
  const existingWatermark = document.getElementById(id);
  if (existingWatermark) {
    document.body.removeChild(existingWatermark);
  }

  const { dataUrl } = createWatermark(options);

  const container = document.createElement("div");
  container.id = id;
  Object.assign(container.style, {
    pointerEvents: "none",
    position: "fixed",
    top: "0",
    left: "0",
    width: "100%",
    height: "100%",
    zIndex: options.zIndex,
    background: `url(${dataUrl}) repeat`,
  });

  // 使用 DocumentFragment 优化 DOM 操作
  const fragment = document.createDocumentFragment();
  fragment.appendChild(container);
  document.body.appendChild(fragment);

  // 防篡改监控
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      const target = mutation.target;
      if (target === container || target.contains(container)) {
        if (mutation.type === "childList" && !document.getElementById(id)) {
          document.body.appendChild(container.cloneNode(true));
        } else if (mutation.type === "attributes") {
          // 恢复被修改的样式
          const originalStyles = {
            position: "fixed",
            pointerEvents: "none",
            zIndex: options.zIndex,
          };
          Object.assign(target.style, originalStyles);
        }
      }
    });
  });

  observer.observe(document.body, {
    attributes: true,
    childList: true,
    subtree: true,
    attributeFilter: ["style"],
  });

  return container;
};

// 导出优化后的水印方法
export const setWaterMark = async (text, extraText = "") => {
  const options = {
    ...defaultOptions,
    text: [text, extraText].filter(Boolean),
    id: defaultOptions.id,
  };
  return applyWatermark(options);
};

export const removeWaterMark = () => {
  const watermark = document.getElementById(defaultOptions.id);
  if (watermark) {
    document.body.removeChild(watermark);
  }
};

// 添加水印
setWaterMark('公司名称', '员工姓名');

// 移除水印
removeWaterMark();

// 自定义配置添加水印
applyWatermark({
  text: ['自定义水印', '第二行文本'],
  font: '16px Arial',
  fillStyle: 'rgba(0, 0, 0, 0.2)',
  rotate: -30,
  width: 300,
  height: 200
});