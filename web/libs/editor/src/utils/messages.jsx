import { htmlEscape } from "./html";

const URL_CORS_DOCS = "https://labelstud.io/guide/storage.html#Troubleshoot-CORS-and-access-problems";
const URL_TAGS_DOCS = "https://labelstud.io/tags";

export default {
  DONE: "完成！",
  NO_COMP_LEFT: "没有更多标注了",
  NO_NEXT_TASK: "队列中没有更多任务",
  NO_ACCESS: "你没有权限访问此任务",

  CONFIRM_TO_DELETE_ALL_REGIONS: "请确认是否要删除所有已标注区域",

  // Tree validation messages
  ERR_REQUIRED: ({ modelName, field }) => {
    return `标签 <b>${modelName}</b> 的属性 <b>${field}</b> 为必填项`;
  },

  ERR_UNKNOWN_TAG: ({ modelName, field, value }) => {
    return `名称为 <b>${value}</b> 的标签未注册。被 <b>${modelName}#${field}</b> 引用。`;
  },

  ERR_TAG_NOT_FOUND: ({ modelName, field, value }) => {
    return `配置中不存在名称为 <b>${value}</b> 的标签。被 <b>${modelName}#${field}</b> 引用。`;
  },

  ERR_TAG_UNSUPPORTED: ({ modelName, field, value, validType }) => {
    return `标签 <b>${modelName}</b> 的属性 <b>${field}</b> 无效：引用的标签为 <b>${value}</b>，但 <b>${modelName}</b> 只能控制 <b>${[]
      .concat(validType)
      .join(", ")}</b>`;
  },

  ERR_PARENT_TAG_UNEXPECTED: ({ validType, value }) => {
    return `标签 <b>${value}</b> 必须作为 <b>${[].concat(validType).join(", ")}</b> 的子标签。`;
  },

  ERR_BAD_TYPE: ({ modelName, field, validType }) => {
    return `标签 <b>${modelName}</b> 的属性 <b>${field}</b> 类型无效。有效类型为：<b>${validType}</b>。`;
  },

  ERR_INTERNAL: ({ value }) => {
    return `内部错误。请查看浏览器控制台获取更多信息。请重试或联系开发者。<br/>${value}`;
  },

  ERR_GENERAL: ({ value }) => {
    return value;
  },

  // Object loading errors
  URL_CORS_DOCS,
  URL_TAGS_DOCS,

  ERR_LOADING_AUDIO({ attr, url, error }) {
    return (
      <div data-testid="error:audio">
        <p>
          加载音频时出错。请检查任务中的 <code>{attr}</code> 字段。
        </p>
        <p>技术描述: {error}</p>
        <p>URL: {htmlEscape(url)}</p>
      </div>
    );
  },

  ERR_LOADING_S3({ attr, url }) {
    return `
    <div>
      <p>
        加载 <code>${attr}</code> 字段的 URL 时出错。
        请求参数无效。
        如果你使用 S3，请确保已指定正确的 bucket 区域名。
      </p>
      <p>URL: <code><a href="${encodeURI(url)}" target="_blank" rel="noreferrer">${htmlEscape(url)}</a></code></p>
    </div>`;
  },

  ERR_LOADING_CORS({ attr, url }) {
    return `
    <div>
      <p>
        加载 <code>${attr}</code> 字段的 URL 时出错。
        很可能是静态服务器的 CORS 设置过于宽松。
        <a href="${this.URL_CORS_DOCS}" target="_blank">点击此处了解详情。</a>
      </p>
      <p>
        还请检查：
        <ul>
          <li>URL 是否有效</li>
          <li>网络是否可达</li>
        </ul>
      </p>
      <p>URL: <code><a href="${encodeURI(url)}" target="_blank" rel="noreferrer">${htmlEscape(url)}</a></code></p>
    </div>`;
  },

  ERR_LOADING_HTTP({ attr, url, error }) {
    return `
    <div data-testid="error:http">
      <p>
        加载 <code>${attr}</code> 字段的 URL 时出错
      </p>
      <p>
        请注意以下事项：
        <ul>
          <li>URL 是否有效</li>
          <li>URL 协议与服务协议是否一致，如 https 与 https</li>
          <li>
            静态服务器的 CORS 设置是否过于宽松，
            <a href=${this.URL_CORS_DOCS} target="_blank">点击此处了解详情</a>
          </li>
        </ul>
      </p>
      <p>
        技术描述: <code>${error}</code>
        <br />
        URL: <code><a href="${encodeURI(url)}" target="_blank" rel="noreferrer">${htmlEscape(url)}</a></code>
      </p>
    </div>`;
  },
};
