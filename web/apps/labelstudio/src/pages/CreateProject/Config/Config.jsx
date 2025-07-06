import React, { useEffect, useMemo, useState } from "react";
import CM from "codemirror";

import { Button, ToggleItems } from "../../../components";
import { Form, Input } from "../../../components/Form";
import { useAPI } from "../../../providers/ApiProvider";
import { Block, cn, Elem } from "../../../utils/bem";
import { Palette } from "../../../utils/colors";
import { FF_UNSAVED_CHANGES, isFF } from "../../../utils/feature-flags";
import { colorNames } from "./colors";
import "./Config.scss";
import { Preview } from "./Preview";
import { DEFAULT_COLUMN, EMPTY_CONFIG, isEmptyConfig, Template } from "./Template";
import { TemplatesList } from "./TemplatesList";

import tags from "@humansignal/core/lib/utils/schema/tags.json";
import { UnsavedChanges } from "./UnsavedChanges";
import { Checkbox, CodeEditor, Select } from "@humansignal/ui";
import { toSnakeCase } from "strman";

const wizardClass = cn("wizard");
const configClass = cn("configure");

// 英文到中文的标签映射
const EN_TO_CN_LABELS = {
  'Car': '汽车',
  'Airplane': '飞机',
  'Person': '人',
  'Planet': '行星',
  'Moonwalker': '月球漫步者',
  'Face': '人脸',
  'Nose': '鼻子',
  'Select label and click the image to start': '选择标签并点击图像开始',
  'Adult content': '成人内容',
  'Weapons': '武器',
  'Violence': '暴力',
  'Text': '文本',
  'Handwriting': '手写',
  "attribute identification": "属性识别",
  "counting": "计数",
  "comparison": "比较",
  "multiple attention": "多重关注",
  "logical operations": "逻辑运算",
  'Benign': '良性',
  'Malignant': '恶性',
  'Normal': '正常',
  'Tumor': '肿瘤',
  'Title': '标题',
  'Date': '日期',
  'Author': '作者',
  'Organization': '组织',
  'Amount': '金额',
  'Answer': '答案',
  'Please read the passage': '请阅读下列短文',
  'Select a text span answering the following question:': '请选择能回答下列问题的文本片段：',
  'Positive': '正面',
  'Negative': '负面',
  'Neutral': '中性',
  'PER': '人名',
  'ORG': '组织',
  'LOC': '地点',
  'MISC': '其他',
  'Choose text sentiment': '选择文本情感',
  "Datetime": '日期时间',
  // 新增的映射
  'Regions': '区域',
  'Attributes': '属性',
  'Relationships': '关系',
  // Choice values 映射
  'Toxic': '有毒',
  'Severely Toxic': '严重有毒',
  'Obscene': '淫秽',
  'Threat': '威胁',
  'Insult': '侮辱',
  'Hate': '仇恨',
  // Header values 映射
  'Please provide additional comments': '请提供额外评论',
  'Read the sentence in English': '阅读英文句子',
  'Provide translation in Spanish': '提供西班牙语翻译',
  'Please read the text': '请阅读文本',
  'Provide one sentence summary': '提供一句话总结',
  'Provide Transcription': '提供转录',
  // Label values 映射
  'Event A': '事件A',
  'Event B': '事件B',
  'Speech': '语音',
  'Noise': '噪音',
  'Speaker one': '说话者一',
  'Speaker two': '说话者二',
  'Segment': '片段',
  // Choice values 映射
  'Question': '问题',
  'Request': '请求',
  'Satisfied': '满意',
  'Interested': '感兴趣',
  'Unsatisfied': '不满意',
  // Header values 映射
  'Transcript': '转录',
  'Sentiment Labels': '情感标签',
  // Label values 映射
  'Positive1': '正面',
  'Location': '地点',
  'Quantity': '数量',
  // Choice values 映射
  'Greeting': '问候',
  'Customer request': '客户请求',
  'Small talk': '闲聊',
  "Provide response": "请作答",
   // Header
   "Choose response": "选择回复",
   // Choices
   "One": "一",
   "Two": "二",
  "Noun": "名词",
  "Pronoun": "代词",
  "Three": "三",
  "Select one of two items": "从两个项目中选择一个",
  "Set how likely it is that these images represent the same thing:": "设置这些图片代表同一事物的可能性：",
  "Select document related to the query:": "选择与查询相关的文档：",
  "Choose similar images:": "选择相似图片：",
  "Search Quality": "搜索质量",
  "Labeling Confidence": "标注置信度",
  "Low": "低",
  "High": "高",
  "Body": "正文",
  "Correct": "正确",
  "Incorrect": "错误",
  "Card Number": "卡号",
  "Surname": "姓",
  "First Name": "名",
  "Cardholder Name": "持卡人姓名",
  "Expiration Date": "有效期",
  "Security Code": "安全码",
  "Sample": "示例",
  "Text": "文本",
  "Up": "上升",
  "Down": "下降",
  "Steady": "持平",
  "Run": "奔跑",
  "Walk": "步行",
  "Fly": "飞行",
  "Swim": "游泳",
  "Ride": "骑行",
  "Velocity": "速度",
  "Acceleration": "加速度",
  "Region": "区域",
  "Good": "好",
  "Medium": "中等",
  "Poor": "差",
  "Change": "变化",
  "Outlier": "离群值",
  "Anomaly": "异常",
  "Man": "男性",
  "Woman": "女性",
  "Other": "其他",
  "blank": "空白",
  "Movement": "运动",
  "Still": "静止",
  "Slow Motion": "慢动作",
  "Blurry": "模糊",
  "Sharp": "清晰",
  "Video timeline segmentation via Audio sync trick": "通过音频同步技巧进行视频时间线分割",
  "Kickflip": "踢翻",
  "360 Flip": "360度翻转",
  "Trick": "技巧",
  "You must provide the response to the prompt": "您必须提供对提示的回复",
  "Type your answer here...": "在此输入您的答案...",
  "Generate a Python function that takes a list of integers as input and returns the sum of all even numbers in the list.": "生成一个Python函数，该函数接受整数列表作为输入并返回列表中所有偶数的和。",
  "Rate this article": "评价这篇文章",
  "Important article": "重要文章",
  "Yellow press": "黄色新闻",
};

const EmptyConfigPlaceholder = () => (
  <div className={configClass.elem("empty-config")}>
    <p>您的标注配置为空。标注数据前必须先配置。</p>
    <p>
    可从预设模板开始，或在代码模式下自定义配置。标注配置为 XML 格式，详见
      <a href="https://labelstud.io/tags/" target="_blank" rel="noreferrer">标签文档</a>
      。
    </p>
  </div>
);

const Label = ({ label, template, color }) => {
  const value = label.getAttribute("value");

  return (
    <li className={configClass.elem("label").mod({ choice: label.tagName === "Choice" })}>
      <label style={{ background: color }}>
        <Input
          type="color"
          className={configClass.elem("label-color")}
          value={colorNames[color] || color}
          onChange={(e) => template.changeLabel(label, { background: e.target.value })}
        />
      </label>
      <span>{EN_TO_CN_LABELS[value] || value}</span>
      <button
        type="button"
        className={configClass.elem("delete-label")}
        onClick={() => template.removeLabel(label)}
        aria-label="删除标签"
      >
        <svg
          width="14"
          height="14"
          viewBox="0 0 14 14"
          fill="none"
          stroke="red"
          strokeWidth="2"
          strokeLinecap="square"
          xmlns="http://www.w3.org/2000/svg"
        >
          <title>删除标签</title>
          <path d="M2 12L12 2" />
          <path d="M12 12L2 2" />
        </svg>
      </button>
    </li>
  );
};

const ConfigureControl = ({ control, template }) => {
  const refLabels = React.useRef();
  const tagname = control.tagName;

  if (tagname !== "Choices" && !tagname.endsWith("Labels")) return null;
  const palette = Palette();

  const onAddLabels = () => {
    if (!refLabels.current) return;
    template.addLabels(control, refLabels.current.value);
    refLabels.current.value = "";
  };
  const onKeyPress = (e) => {
    if (e.key === "Enter" && e.ctrlKey) {
      e.preventDefault();
      onAddLabels();
    }
  };

  return (
    <div className={configClass.elem("labels")}>
      <form className={configClass.elem("add-labels")} action="">
        <h4>{tagname === "Choices" ? "添加选项" : "添加标签名称"}</h4>
        <span>每行一个，可批量添加</span>
        <textarea
          name="labels"
          id=""
          cols="50"
          rows="5"
          ref={refLabels}
          onKeyPress={onKeyPress}
          className="lsf-textarea-ls p-2 px-3"
        />
        <Button type="button" size="compact" onClick={onAddLabels}>
          添加
        </Button>
      </form>
      <div className={configClass.elem("current-labels")}>
        <h3>
          {tagname === "Choices" ? "选项" : "标签"}（{control.children.length}）
        </h3>
        <ul>
          {Array.from(control.children).map((label) => (
            <Label
              label={label}
              template={template}
              key={label.getAttribute("value")}
              color={label.getAttribute("background") || palette.next().value}
            />
          ))}
        </ul>
      </div>
    </div>
  );
};

const ConfigureSettings = ({ template }) => {
  const { settings } = template;

  if (!settings) return null;
  const keys = Object.keys(settings);

  const items = keys.map((key) => {
    const options = settings[key];
    const type = Array.isArray(options.type) ? Array : options.type;
    const $object = options.object;
    const $tag = options.control ? options.control : $object;

    if (!$tag) return null;
    if (options.when && !options.when($tag)) return;
    let value = false;

    if (options.value) value = options.value($tag);
    else if (typeof options.param === "string") value = $tag.getAttribute(options.param);
    if (value === "true") value = true;
    if (value === "false") value = false;
    let onChange;
    let size;

    switch (type) {
      case Array:
        onChange = (val) => {
          if (typeof options.param === "function") {
            options.param($tag, val);
          } else {
            $object.setAttribute(options.param, val);
          }
          template.render();
        };
        return (
          <li key={key}>
            <Select
              triggerClassName="border"
              value={value}
              onChange={onChange}
              options={options.type}
              label={options.title}
              isInline={true}
              dataTestid={`select-trigger-${options.title.replace(/\s+/g, "-").replace(":", "").toLowerCase()}-${value}`}
            />
          </li>
        );
      case Boolean:
        onChange = (e) => {
          if (typeof options.param === "function") {
            options.param($tag, e.target.checked);
          } else {
            $object.setAttribute(options.param, e.target.checked ? "true" : "false");
          }
          template.render();
        };
        return (
          <li key={key}>
            <Checkbox checked={value} onChange={onChange}>
              {options.title}
            </Checkbox>
          </li>
        );
      case String:
      case Number:
        size = options.type === Number ? 5 : undefined;
        onChange = (e) => {
          if (typeof options.param === "function") {
            options.param($tag, e.target.value);
          } else {
            $object.setAttribute(options.param, e.target.value);
          }
          template.render();
        };
        return (
          <li key={key}>
            <label>
              {options.title} <Input type="text" onInput={onChange} value={value} size={size} />
            </label>
          </li>
        );
    }
  });

  // check for active settings
  if (!items.filter(Boolean).length) return null;

  return (
    <ul className={configClass.elem("settings")}>
      <li>
        <h4>配置设置</h4>
        <ul className={configClass.elem("object-settings")}>{items}</ul>
      </li>
    </ul>
  );
};

// configure value source for `obj` object tag
const ConfigureColumn = ({ template, obj, columns }) => {
  const valueAttr = obj.hasAttribute("valueList") ? "valueList" : "value";
  const value = obj.getAttribute(valueAttr)?.replace(/^\$/, "");
  // if there is a value set already and it's not in the columns
  // or data was not uploaded yet
  const [isManual, setIsManual] = useState(!!value && !columns?.includes(value));
  // value is stored in state to make input conrollable
  // changes will be sent by Enter and blur
  const [newValue, setNewValue] = useState(`$${value}`);

  // update local state when external value changes
  useEffect(() => setNewValue(`$${value}`), [value]);

  const updateValue = (value) => {
    const newValue = value.replace(/^\$/, "");

    obj.setAttribute(valueAttr, `$${newValue}`);
    template.render();
  };

  const selectValue = (value) => {
    if (value === "-") {
      setIsManual(true);
      return;
    }
    if (isManual) {
      setIsManual(false);
    }

    updateValue(value);
  };

  const handleChange = (e) => {
    const newValue = e.target.value.replace(/^\$/, "");

    setNewValue(`$${newValue}`);
  };

  const handleBlur = () => {
    updateValue(newValue);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      updateValue(e.target.value);
    }
  };

  const columnsList = useMemo(() => {
    const cols = (columns ?? []).map((col) => {
      return {
        value: col,
        label: col === DEFAULT_COLUMN ? "<导入的文件>" : `$${col}`,
      };
    });
    if (!columns?.length) {
      cols.push({ value, label: "<导入的文件>" });
    }
    cols.push({ value: "-", label: "<手动设置>" });
    return cols;
  }, [columns, DEFAULT_COLUMN, value]);

  return (
    <>
      <Select
        onChange={selectValue}
        value={isManual ? "-" : value}
        options={columnsList}
        isInline={true}
        label={
          <>
            使用 {obj.tagName.toLowerCase()}
            {template.objects > 1 && ` 用于 ${obj.getAttribute("name")}`}
            {" 从 "}
            {columns?.length > 0 && columns[0] !== DEFAULT_COLUMN && "字段 "}
          </>
        }
        labelProps={{ className: "inline-flex" }}
        dataTestid={`select-trigger-use-image-from-field-${isManual ? "-" : value}`}
      />
      {isManual && <Input value={newValue} onChange={handleChange} onBlur={handleBlur} onKeyDown={handleKeyDown} />}
    </>
  );
};

const ConfigureColumns = ({ columns, template }) => {
  if (!template.objects.length) return null;

  return (
    <div className={configClass.elem("object")}>
      <h4>配置数据</h4>
      {template.objects.length > 1 && columns?.length > 0 && columns.length < template.objects.length && (
        <p className={configClass.elem("object-error")}>该模板需要的数据字段比你当前拥有的更多</p>
      )}
      {columns?.length === 0 && (
        <p className={configClass.elem("object-error")}>如需选择要标注的字段，请先上传数据。或者可通过代码模式手动提供。</p>
      )}
      {template.objects.map((obj) => (
        <ConfigureColumn key={obj.getAttribute("name")} {...{ obj, template, columns }} />
      ))}
    </div>
  );
};

const Configurator = ({
  columns,
  config,
  project,
  template,
  setTemplate,
  onBrowse,
  onSaveClick,
  onValidate,
  disableSaveButton,
  warning,
  hasChanges,
}) => {
  const [configure, setConfigure] = React.useState(isEmptyConfig(config) ? "code" : "visual");
  const [visualLoaded, loadVisual] = React.useState(configure === "visual");
  const [waiting, setWaiting] = React.useState(false);
  const [saved, setSaved] = React.useState(false);

  // config update is debounced because of user input
  const [configToCheck, setConfigToCheck] = React.useState();
  // then we wait for validation and sample data for this config
  const [error, setError] = React.useState();
  const [parserError, setParserError] = React.useState();
  const [data, setData] = React.useState();
  const [loading, setLoading] = useState(false);
  // and only with them we'll update config in preview
  const [configToDisplay, setConfigToDisplay] = React.useState(config);

  const debounceTimer = React.useRef();
  const api = useAPI();

  React.useEffect(() => {
    // config may change during init, so wait for that, but for a very short time only
    debounceTimer.current = window.setTimeout(() => setConfigToCheck(config), configToCheck ? 500 : 30);
    return () => window.clearTimeout(debounceTimer.current);
  }, [config]);

  React.useEffect(() => {
    const validate = async () => {
      if (!configToCheck) return;

      setLoading(true);

      const validation = await api.callApi("validateConfig", {
        params: { pk: project.id },
        body: { label_config: configToCheck },
        errorFilter: () => true,
      });

      if (validation?.error) {
        setError(validation.response);
        setLoading(false);
        return;
      }

      setError(null);
      onValidate?.(validation);

      const sample = await api.callApi("createSampleTask", {
        params: { pk: project.id },
        body: { label_config: configToCheck },
        errorFilter: () => true,
      });

      setLoading(false);
      if (sample && !sample.error) {
        setData(sample.sample_task);
        setConfigToDisplay(configToCheck);
      } else {
        // @todo validation can be done in this place,
        // @todo but for now it's extremely slow in /sample-task endpoint
        setError(sample?.response);
      }
    };
    validate();
  }, [configToCheck]);

  // code should be reloaded on every render because of uncontrolled codemirror
  // visuals should be always rendered after first render
  // so load it on the first access, then just show/hide
  const onSelect = (value) => {
    setConfigure(value);
    if (value === "visual") loadVisual(true);
  };

  const onChange = React.useCallback(
    (config) => {
      try {
        setParserError(null);
        setTemplate(config);
      } catch (e) {
        setParserError({
          detail: "解析错误",
          validation_errors: [e.message],
        });
      }
    },
    [setTemplate],
  );

  const onSave = async () => {
    setError(null);
    setWaiting(true);
    const res = await onSaveClick();

    setWaiting(false);

    if (res === true) {
      setSaved(true);
      setTimeout(() => setSaved(false), 1500);
    } else {
      setError(res);
    }
    return res;
  };

  function completeAfter(cm, pred) {
    if (!pred || pred()) {
      setTimeout(() => {
        if (!cm.state.completionActive) cm.showHint({ completeSingle: false });
      }, 100);
    }
    return CM.Pass;
  }

  function completeIfInTag(cm) {
    return completeAfter(cm, () => {
      const token = cm.getTokenAt(cm.getCursor());

      if (token.type === "string" && (!/['"]$/.test(token.string) || token.string.length === 1)) return false;

      const inner = CM.innerMode(cm.getMode(), token.state).state;

      return inner.tagName;
    });
  }

  const extra = (
    <p className={configClass.elem("tags-link")}>
      使用标签配置标注界面。
      <br />
      <a href="https://labelstud.io/tags/" target="_blank" rel="noreferrer">标签文档</a>
      。
    </p>
  );

  // 在传递给Preview前做config内容的中英文映射
  function localizeConfig(config) {
    // 解析 XML
    const parser = new window.DOMParser();
    const xmlDoc = parser.parseFromString(config, 'text/xml');

    // 递归处理所有节点
    function traverse(node) {
      if (node.nodeType === 1) { // 元素节点
        // 处理 value 属性
        if (node.hasAttribute('value')) {
          const value = node.getAttribute('value');
          const translated = EN_TO_CN_LABELS[(value || '').trim()] || value;
          node.setAttribute('value', translated);
          // 如果没有label属性，则同步设置label属性为翻译后的value
          if (!node.hasAttribute('label')) {
            node.setAttribute('label', translated);
          }
        }
        // 处理 label 属性（如有）
        if (node.hasAttribute('label')) {
          const label = node.getAttribute('label');
          const translated = EN_TO_CN_LABELS[(label || '').trim()] || label;
          node.setAttribute('label', translated);
        }
        // 处理 children 是纯文本的情况（如 <Header>xxx</Header>）
        if (
          node.childNodes.length === 1 &&
          node.childNodes[0].nodeType === 3 // TEXT_NODE
        ) {
          const text = node.childNodes[0].nodeValue.trim();
          const translated = EN_TO_CN_LABELS[text] || text;
          if (translated !== text) {
            node.childNodes[0].nodeValue = translated;
          }
        }
        // 递归处理子节点
        for (let i = 0; i < node.childNodes.length; i++) {
          traverse(node.childNodes[i]);
        }
      }
    }

    traverse(xmlDoc.documentElement);

    // 序列化回字符串
    const serializer = new window.XMLSerializer();
    return serializer.serializeToString(xmlDoc);
  }

  return (
    <div className={configClass}>
      <div className={configClass.elem("container")}>
        <h1>标注界面{hasChanges ? " *" : ""}</h1>
        <header>
          <Button
            look="secondary"
            type="button"
            data-leave={true}
            onClick={onBrowse}
            size="compact"
            style={{ width: 160 }}
          >
            浏览模板
          </Button>
          <ToggleItems items={{ code: "代码", visual: "可视化" }} active={configure} onSelect={onSelect} />
        </header>
        <div className={configClass.elem("editor")}>
          {configure === "code" && (
            <div className={configClass.elem("code")} style={{ display: configure === "code" ? undefined : "none" }}>
              <CodeEditor
                name="code"
                id="edit_code"
                value={config}
                autoCloseTags={true}
                smartIndent={true}
                detach
                border
                extensions={["hint", "xml-hint"]}
                options={{
                  mode: "xml",
                  theme: "默认",
                  lineNumbers: true,
                  extraKeys: {
                    "'<'": completeAfter,
                    // "'/'": completeIfAfterLt,
                    "' '": completeIfInTag,
                    "'='": completeIfInTag,
                    "Ctrl-Space": "自动完成",
                  },
                  hintOptions: { schemaInfo: tags },
                }}
                // don't close modal with Escape while editing config
                onKeyDown={(editor, e) => {
                  if (e.code === "Escape") e.stopPropagation();
                }}
                onChange={(editor, data, value) => onChange(value)}
              />
            </div>
          )}
          {visualLoaded && (
            <div
              className={configClass.elem("visual")}
              style={{ display: configure === "visual" ? undefined : "none" }}
            >
              {isEmptyConfig(config) && <EmptyConfigPlaceholder />}
              <ConfigureColumns columns={columns} project={project} template={template} />
              {template.controls.map((control) => (
                <ConfigureControl control={control} template={template} key={control.getAttribute("name")} />
              ))}
              <ConfigureSettings template={template} />
            </div>
          )}
        </div>
        {disableSaveButton !== true && onSaveClick && (
          <Form.Actions size="small" extra={configure === "code" && extra} valid>
            {saved && (
              <Block name="form-indicator">
                <Elem tag="span" mod={{ type: "success" }} name="item">
                  已保存！
                </Elem>
              </Block>
            )}
            <Button look="primary" size="compact" style={{ width: 120 }} onClick={onSave} waiting={waiting}>
              {waiting ? "保存中..." : "保存"}
            </Button>
            {isFF(FF_UNSAVED_CHANGES) && <UnsavedChanges hasChanges={hasChanges} onSave={onSave} />}
          </Form.Actions>
        )}
      </div>
      <Preview
        config={localizeConfig(configToDisplay)}
        data={data}
        project={project}
        loading={loading}
        error={parserError || error || (configure === "code" && warning)}
      />
    </div>
  );
};

export const ConfigPage = ({
  config: initialConfig = "",
  columns: externalColumns,
  project,
  onUpdate,
  onSaveClick,
  onValidate,
  disableSaveButton,
  show = true,
  hasChanges,
}) => {
  const [config, _setConfig] = React.useState("");
  const [mode, setMode] = React.useState("list"); // view | list
  const [selectedGroup, _setSelectedGroup] = React.useState(null);
  const [selectedRecipe, setSelectedRecipe] = React.useState(null);
  const [template, setCurrentTemplate] = React.useState(null);
  const api = useAPI();

  const setSelectedGroup = React.useCallback(
    (group) => {
      _setSelectedGroup(group);
      __lsa(`labeling_setup.list.${toSnakeCase(group)}`);
    },
    [_setSelectedGroup],
  );

  const setConfig = React.useCallback(
    (config) => {
      _setConfig(config);
      onUpdate(config);
    },
    [_setConfig, onUpdate],
  );

  const setTemplate = React.useCallback(
    (config) => {
      const tpl = new Template({ config });

      tpl.onConfigUpdate = setConfig;
      setConfig(config);
      setCurrentTemplate(tpl);
    },
    [setConfig, setCurrentTemplate],
  );

  const [columns, setColumns] = React.useState();

  React.useEffect(() => {
    if (externalColumns?.length) setColumns(externalColumns);
  }, [externalColumns]);

  const [warning, setWarning] = React.useState();

  React.useEffect(() => {
    const fetchData = async () => {
      if (!externalColumns || (project && !columns)) {
        const res = await api.callApi("dataSummary", {
          params: { pk: project.id },
          // 404 is ok, and errors here don't matter
          errorFilter: () => true,
        });

        if (res?.common_data_columns) {
          setColumns(res.common_data_columns);
        }
      }
      fetchData();
    };
  }, [columns, project]);

  const onSelectRecipe = React.useCallback((recipe) => {
    if (!recipe) {
      setSelectedRecipe(null);
      setMode("list");
      __lsa("labeling_setup.view.empty");
    } else {
      setTemplate(recipe.config);
      setSelectedRecipe(recipe);
      setMode("view");
      __lsa(`labeling_setup.view.${toSnakeCase(recipe.group)}.${toSnakeCase(recipe.title)}`);
    }
  });

  const onCustomTemplate = React.useCallback(() => {
    setTemplate(EMPTY_CONFIG);
    setMode("view");
    __lsa("labeling_setup.view.custom");
  });

  const onBrowse = React.useCallback(() => {
    setMode("list");
    __lsa("labeling_setup.list.browse");
  }, []);

  React.useEffect(() => {
    if (initialConfig) {
      setTemplate(initialConfig);
      setMode("view");
    }
  }, []);

  if (!show) return null;

  return (
    <div className={wizardClass} data-mode="list" id="config-wizard">
      {mode === "list" && (
        <TemplatesList
          case="list"
          selectedGroup={selectedGroup}
          selectedRecipe={selectedRecipe}
          onSelectGroup={setSelectedGroup}
          onSelectRecipe={onSelectRecipe}
          onCustomTemplate={onCustomTemplate}
        />
      )}
      {mode === "view" && (
        <Configurator
          case="view"
          columns={columns}
          config={config}
          project={project}
          selectedRecipe={selectedRecipe}
          template={template}
          setTemplate={setTemplate}
          onBrowse={onBrowse}
          onValidate={onValidate}
          disableSaveButton={disableSaveButton}
          onSaveClick={onSaveClick}
          warning={warning}
          hasChanges={hasChanges}
        />
      )}
    </div>
  );
};
