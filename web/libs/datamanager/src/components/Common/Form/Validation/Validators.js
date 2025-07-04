import { isEmptyString } from "../../../../utils/helpers";
import { isDefined } from "../../../../utils/utils";
import "./Validation.scss";

export const required = (fieldName, value) => {
  if (!isDefined(value) || isEmptyString(value)) {
    return `${fieldName} 是必填项`;
  }
};

export const matchPattern = (pattern) => (fieldName, value) => {
  pattern = typeof pattern === "string" ? new RegExp(pattern) : pattern;

  if (!isEmptyString(value) && value.match(pattern) === null) {
    return `${fieldName} 必须匹配模式 ${pattern}`;
  }
};

export const json = (fieldName, value) => {
  const err = `${fieldName} 必须是有效的 JSON 字符串`;

  if (!isDefined(value) || value.trim().length === 0) return;

  if (/^(\{|\[)/.test(value) === false || /(\}|\])$/.test(value) === false) {
    return err;
  }

  try {
    JSON.parse(value);
  } catch (e) {
    return err;
  }
};

export const regexp = (fieldName, value) => {
  try {
    new RegExp(value);
  } catch (err) {
    return `${fieldName} 必须是有效的正则表达式`;
  }
};
