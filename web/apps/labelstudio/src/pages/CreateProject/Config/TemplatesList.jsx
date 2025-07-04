import React from "react";
import { Spinner } from "../../../components";
import { useAPI } from "../../../providers/ApiProvider";
import { cn } from "../../../utils/bem";
import "./Config.scss";
import { IconInfo } from "@humansignal/icons";

const listClass = cn("templates-list");

const Arrow = () => (
  <svg width="8" height="12" viewBox="0 0 8 12" fill="none" xmlns="http://www.w3.org/2000/svg">
    <title>Arrow Icon</title>
    <path opacity="0.9" d="M2 10L6 6L2 2" stroke="currentColor" strokeWidth="2" strokeLinecap="square" />
  </svg>
);

const TEMPLATE_GROUP_MAP = {
  "Computer Vision": "计算机视觉",
  "Natural Language Processing": "自然语言处理",
  "Audio/Speech Processing": "音频/语音处理",
  "Conversational AI": "对话式 AI",
  "Ranking & Scoring": "排序与评分",
  "Structured Data Parsing": "结构化数据解析",
  "Time Series Analysis": "时间序列分析",
  "Videos": "视频",
  "Generative AI": "生成式 AI",
};
const TEMPLATE_TITLE_MAP = {
  "Semantic Segmentation with Polygons": "多边形语义分割",
  "Semantic Segmentation with Masks": "掩码语义分割",
  "Object Detection with Bounding Boxes": "边界框目标检测",
  "Keypoint Labeling": "关键点标注",
  "Inventory Tracking": "库存跟踪",
  "Image Classification": "图像分类",
  "Optical Character Recognition": "光学字符识别",
  "Visual Genome": "视觉基因组",
  "Visual Question Answering": "视觉问答",
  "Medical Image Classification with Bounding Boxes": "医学图像分类（含边界框）",
  "Image Captioning": "图像描述生成",
  "Multi-page document annotation": "多页文档标注",
  "Question Answering": "问答",
  "Text Classification": "文本分类",
  "Named Entity Recognition": "命名实体识别",
  "Taxonomy": "分类体系",
  "Relation Extraction": "关系抽取",
  "Content Moderation": "内容审核",
  "Machine Translation": "机器翻译",
  "Text Summarization": "文本摘要",
  "Speech Transcription": "语音转录",
  "Signal Quality Detection": "信号质量检测",
  "Automatic Speech Recognition": "自动语音识别",
  "Sound Event Detection": "声音事件检测",
  "Automatic Speech Recognition using Segments": "分段自动语音识别",
  "Speaker Segmentation": "说话人分割",
  "Intent Classification": "意图分类",
  "Conversational Analysis": "会话分析",
  "Intent Classification and Slot Filling": "意图分类与槽位填充",
  "Response Generation": "回复生成",
  "Response Selection": "回复选择",
  "Coreference Resolution & Entity Linking": "共指消解与实体链接",
  "Pairwise classification": "成对分类",
  "ASR Hypotheses Selection": "ASR 假设选择",
  "Text-to-Image Generation": "文本生成图像",
  "Pairwise regression": "成对回归",
  "Document Retrieval": "文档检索",
  "Content-based Image Retrieval": "基于内容的图像检索",
  "Search Page Ranking": "搜索页面排序",
  "HTML Entity Recognition": "HTML 实体识别",
  "Tabular Data": "表格数据",
  "PDF Classification": "PDF 分类",
  "Freeform Metadata": "自由元数据",
  "Time Series Forecasting": "时间序列预测",
  "Activity Recognition": "活动识别",
  "Signal Quality": "信号质量",
  "Change Point Detection": "变点检测",
  "Outliers & Anomaly Detection": "异常检测",
  "Video Object Tracking": "视频目标跟踪",
  "Video Frame Classification": "视频帧分类",
  "Video Classification": "视频分类",
  "Video Timeline Segmentation": "视频时间线分割",
  "Supervised Language Model Fine-tuning": "有监督语言模型微调",
  "Human Preference collection for RLHF": "RLHF 人类偏好收集",
  "Chatbot Model Assessment": "聊天机器人模型评估",
  "LLM Ranker": "大模型排序器",
  "Visual Ranker": "视觉排序器",
  "LLM Response Grading": "大模型回复评分",
};
const getTemplateGroupText = (text) => TEMPLATE_GROUP_MAP[text] || text;
const getTemplateTitleText = (text) => TEMPLATE_TITLE_MAP[text] || text;

const TemplatesInGroup = ({ templates, group, onSelectRecipe }) => {
  const picked = templates
    .filter((recipe) => recipe.group === group)
    // templates without `order` go to the end of the list
    .sort((a, b) => (a.order ?? Number.POSITIVE_INFINITY) - (b.order ?? Number.POSITIVE_INFINITY));

  return (
    <ul>
      {picked.map((recipe) => (
        <li key={recipe.title} onClick={() => onSelectRecipe(recipe)} className={listClass.elem("template")}>
          <img src={recipe.image} alt={""} />
          <h3>{getTemplateTitleText(recipe.title)}</h3>
        </li>
      ))}
    </ul>
  );
};

export const TemplatesList = ({ selectedGroup, selectedRecipe, onCustomTemplate, onSelectGroup, onSelectRecipe }) => {
  const [groups, setGroups] = React.useState([]);
  const [templates, setTemplates] = React.useState();
  const api = useAPI();

  React.useEffect(() => {
    const fetchData = async () => {
      const res = await api.callApi("configTemplates");

      if (!res) return;
      const { templates, groups } = res;

      setTemplates(templates);
      setGroups(groups);
    };
    fetchData();
  }, []);

  const selected = selectedGroup || groups[0];

  return (
    <div className={listClass}>
      <aside className={listClass.elem("sidebar")}>
        <ul>
          {groups.map((group) => (
            <li
              key={group}
              onClick={() => onSelectGroup(group)}
              className={listClass.elem("group").mod({
                active: selected === group,
                selected: selectedRecipe?.group === group,
              })}
            >
              {getTemplateGroupText(group)}
              <Arrow />
            </li>
          ))}
        </ul>
        <button type="button" onClick={onCustomTemplate} className={listClass.elem("custom-template")}>
          自定义模板
        </button>
      </aside>
      <main>
        {!templates && <Spinner style={{ width: "100%", height: 200 }} />}
        <TemplatesInGroup templates={templates || []} group={selected} onSelectRecipe={onSelectRecipe} />
      </main>
      <footer className="flex items-center justify-center gap-1">
        <IconInfo className={listClass.elem("info-icon")} width="20" height="20" />
        <span>
          请参阅文档{" "}
          <a href="https://labelstud.io/guide" target="_blank" rel="noreferrer">查看文档</a>
          .
        </span>
      </footer>
    </div>
  );
};
