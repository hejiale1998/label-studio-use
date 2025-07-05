import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Spinner } from "../../../components";
import { cn } from "../../../utils/bem";
import "./Config.scss";
import { EMPTY_CONFIG } from "./Template";
import { API_CONFIG } from "../../../config/ApiConfig";
import { useAPI } from "../../../providers/ApiProvider";

const configClass = cn("configure");

// 英文到中文的短语映射表
const EN_TO_CN_VALUES = {
  "hole ON log": "树洞在木头上",
  "tree BEHIND bear": "树在熊后面",
  "mouth OF panda": "熊猫的嘴",
  "panda bear holding something in it's paw": "熊猫正拿着东西",
  "trees behind the panda out of focus": "熊猫后面的树有些模糊",
  "piece of bamboo in panda's paw": "熊猫爪子里的竹子",
  "bamboo next to panda": "熊猫旁边的竹子",
  "the panda is cute": "这只熊猫很可爱",
  "markings is black": "花纹是黑色的",
  "nose is black": "鼻子是黑色的",
  "face is round": "脸是圆的",
  "wood is round": "木头是圆的",
  // 新增data.text和data.question的映射
  "The boundary of the region from which no escape is possible is called the event horizon. Although the event horizon has an enormous effect on the fate and circumstances of an object crossing it, according to general relativity it has no locally detectable features.[4] In many ways, a black hole acts like an ideal black body, as it reflects no light.[5][6] Moreover, quantum field theory in curved spacetime predicts that event horizons emit Hawking radiation, with the same spectrum as a black body of a temperature inversely proportional to its mass. This temperature is on the order of billionths of a kelvin for black holes of stellar mass, making it essentially impossible to observe directly.": "无法逃逸的区域边界被称为事件视界。虽然事件视界对穿越它的物体的命运和环境有巨大影响，但根据广义相对论，它本身没有局部可探测的特征。在许多方面，黑洞表现得像一个理想的黑体，不反射任何光。此外，曲率时空中的量子场论预测事件视界会发射霍金辐射，其光谱与温度与质量成反比的黑体相同。对于恒星质量的黑洞，这个温度大约只有十亿分之一开尔文，因此几乎不可能直接观测到。",
  "How could black holes be detected?": "黑洞如何被探测到？",
  "This is a great 3D movie that delivers everything almost right in your face.": "这是一部精彩的 3D 电影，一切内容几乎都呈现在您眼前。",
  "Sample: Your text will go here.": "示例：您的文字将显示在此处。",
  "Microsoft was founded by Bill Gates and Paul Allen on April 4, 1975, to develop and sell BASIC interpreters for the Altair 8800.": "Microsoft 由 Bill Gates 和 Paul Allen 于 1975 年 4 月 4 日创立，致力于开发和销售 Altair 8800 的 BASIC 解释器。",
  // Choice values 映射
  "Toxic": "有毒",
  "Severely Toxic": "严重有毒",
  "Obscene": "淫秽",
  "Threat": "威胁",
  "Insult": "侮辱",
  "Hate": "仇恨",
  "Question": "问题",
  "Request": "请求",
  "Satisfied": "满意",
  "Interested": "感兴趣",
  "Unsatisfied": "不满意",
  // Header values 映射
  "Please provide additional comments": "请提供额外评论",
  "Read the sentence in English": "阅读英文句子",
  "Provide translation in Spanish": "提供西班牙语翻译",
  "Please read the text": "请阅读文本",
  "Provide one sentence summary": "提供一句话总结",
  "Provide Transcription": "提供转录",
  "Transcript": "转录",
  "Sentiment Labels": "情感标签",
  // Label values 映射
  "Positive1": "正面",
  "Location": "地点",
  "Quantity": "数量",
  // Choice values 映射
  "Greeting": "问候",
  "Customer request": "客户请求",
  "Small talk": "闲聊",
  // Data text 映射
  "Dont you hate that?": "你不讨厌那个吗？",
  "Hate what?": "讨厌什么？",
  "Uncomfortable silences. Why do we feel its necessary to yak about nonsense in order to be comfortable?": "令人不适的沉默。为什么我们觉得必须闲聊废话才能感到舒适？",
  "I dont know. Thats a good question.": "我不知道。这是个好问题。",
  "Thats when you know you found somebody really special. When you can just shut the door closed a minute, and comfortably share silence.": "那就是你知道你找到了真正特别的人的时候。当你可以关上门一会儿，舒适地分享沉默的时候。",
  // Author 映射
  "Mia Wallace": "米娅·华莱士",
  "Vincent Vega:": "文森特·维加：",
  "Mia Wallace:": "米娅·华莱士：",
  "Vincent Vega": "文森特·维加",
  // 长文本映射
  "There are two general approaches to automatic summarization: extraction and abstraction. Extraction-based summarization: Here, content is extracted from the original data, but the extracted content is not modified in any way. Examples of extracted content include key-phrases that can be used to \"tag\" or index a text document, or key sentences (including headings) that collectively comprise an abstract, and representative images or video segments, as stated above. For text, extraction is analogous to the process of skimming, where the summary (if available), headings and subheadings, figures, the first and last paragraphs of a section, and optionally the first and last sentences in a paragraph are read before one chooses to read the entire document in detail.[3] Other examples of extraction that include key sequences of text in terms of clinical relevance (including patient/problem, intervention, and outcome).[4] Abstraction-based summarization: This has been applied mainly for text. Abstractive methods build an internal semantic representation of the original content, and then use this representation to create a summary that is closer to what a human might express. Abstraction may transform the extracted content by paraphrasing sections of the source document, to condense a text more strongly than extraction. Such transformation, however, is computationally much more challenging than extraction, involving both natural language processing and often a deep understanding of the domain of the original text in cases where the original document relates to a special field of knowledge. \"Paraphrasing\" is even more difficult to apply to image and video, which is why most summarization systems are extractive.": "自动摘要有两种通用方法：提取和抽象。基于提取的摘要：在这里，内容从原始数据中提取，但提取的内容不会以任何方式修改。提取内容的示例包括可用于标记或索引文本文档的关键短语，或共同构成摘要的关键句子（包括标题），以及如上所述的具有代表性的图像或视频片段。对于文本，提取类似于略读过程，在详细阅读整个文档之前，会先阅读摘要（如果有）、标题和副标题、图表、章节的第一段和最后一段，以及可选地阅读段落中的第一句和最后一句。[3] 其他提取示例包括在临床相关性方面的关键文本序列（包括患者/问题、干预和结果）。[4] 基于抽象的摘要：这主要应用于文本。抽象方法构建原始内容的内部语义表示，然后使用这种表示创建更接近人类表达方式的摘要。抽象可能通过改写源文档的部分内容来转换提取的内容，比提取更强烈地压缩文本。然而，这种转换在计算上比提取更具挑战性，涉及自然语言处理，并且在原始文档涉及特殊知识领域的情况下，通常需要对原始文本领域有深入理解。改写更难应用于图像和视频，这就是为什么大多数摘要系统都是提取性的。",
  "There are two approaches to automatic summarization: extraction and abstraction. In extraction summarization content is extracted from the original data, whereas Abstraction may transform the extracted content by paraphrasing sections of the source document.": "自动摘要有两种方法：提取和抽象。在提取摘要中，内容从原始数据中提取，而抽象可能通过改写源文档的部分内容来转换提取的内容。",
  // 作者映射
  "Human": "人类",
  "Robot": "机器人",
  // 对话内容映射
  "Sample: Hi, Robot!": "示例：你好，机器人！",
  "Sample: Nice to meet you, human! Tell me what you want.": "示例：很高兴见到你，人类！请告诉我你的需求。",
  "Sample: Order me a pizza from Golden Boy at Green Street": "示例：帮我在Green Street的Golden Boy点个披萨",
  "Sample: Done. When do you want to get the order?": "示例：已完成。你想什么时候取餐？",
  "Sample: At 3am in the morning, please": "示例：请在凌晨3点送达",
  // 作者映射
  "Alice": "爱丽丝",
  "Bob": "鲍勃",
  // 对话内容映射
  "Sample: Text #1": "示例：文本 #1",
  "Sample: Text #2": "示例：文本 #2",
  "Sample: Text #3": "示例：文本 #3",
  "Sample: Text #4": "示例：文本 #4",
  "Sample: Text #5": "示例：文本 #5",
  "Provide response": "请作答",
  "Choose response": "选择回复",
  "One": "一",
  "Two": "二",
  "Three": "三",
  "Sample: Response #1": "示例：回复 #1",
  "Sample: Response #2": "示例：回复 #2",
  "Sample: Response #3": "示例：回复 #3",
  "Noun": "名词",
  "Pronoun": "代词",
  "Sample: This is a sample text for coreference resolution and entity linking task.": "示例：这是一个用于共指消解和实体链接任务的示例文本。",
  "Select one of two items": "从两个项目中选择一个",
  "potrostith points out that if school based clinics were established parental permission would be required for students to receive each service offered": "potrostith 指出，如果建立校内诊所，学生接受每项服务都需要家长许可",
  "potrostith points out that if school-based clinics were established parental permission would be required for students to receive each service offered": "potrostith 指出，如果建立校内诊所，学生接受每项服务都需要家长许可",
  "purporting points out that if school based clinics were established parental permission would be required for students to receive each service offered": "purporting 指出，如果建立校内诊所，学生接受每项服务都需要家长许可",
  "pork roasted points out that if school based clinics were establish parental permission would be required for students to receive each service offered": "pork roasted 指出，如果建立校内诊所，学生接受每项服务都需要家长许可",
  "purpose it points out that if school based clinics war establish parental permission would be required for students to receive each service offered": "purpose it 指出，如果建立校内诊所，学生接受每项服务都需要家长许可",
  "An astronaut riding a horse in a photorealistic style": "一名宇航员以照片写实风格骑马",
  "Set how likely it is that these images represent the same thing:": "设置这些图片代表同一事物的可能性：",
  "Which is the biggest black hole in the universe?": "宇宙中最大的黑洞是哪一个？",
  // 搜索结果标题和段落映射
  "List of most massive black holes - Wikipedia": "最巨大的黑洞列表 - 维基百科",
  "Supermassive black hole - Wikipedia": "超大质量黑洞 - 维基百科",
  "Black Hole Size Comparison Chart Gives New View of Universe": "黑洞大小对比图带来宇宙新视角",
  "How Big Is the Largest Black Hole in the Universe? - Business ...": "宇宙中最大的黑洞有多大？- 商业内幕",
  "5 Most Massive Black Holes Discovered So Far. - The Secrets": "迄今发现的5个最大黑洞 - 宇宙的秘密",
  "'Stupendously large' black holes could grow to truly monstrous ...": "“极其巨大的”黑洞可能会变得真正庞大……",
  // 段落内容
  "List ; Messier 59, 2.7×10 · This black hole has a retrograde rotation. ; PG 1411+442, (4.43±1.46)×10 · 79430000 ; Markarian 876, (2.79±1.29)×10 · 240000000 ; Andromeda ...": "列表；梅西耶59，2.7×10 · 这个黑洞有逆行自转；PG 1411+442，(4.43±1.46)×10 · 79430000；马克良876，(2.79±1.29)×10 · 240000000；仙女座...",
  "The largest supermassive black hole in the Milky Way's vicinity appears to be that of Messier 87 (i.e. M87*), at a mass of (6.4±0.5)×109 (c. 6.4 billion) M ☉ at a distance of 53.5 million light-years.": "银河系附近最大的超大质量黑洞似乎是梅西耶87（即M87*），质量为(6.4±0.5)×10^9（约64亿）太阳质量，距离为5350万光年。",
  "Um buraco negro supermassivo é uma classe de buracos negros encontrados principalmente no centro das galáxias. Ao contrário dos buracos negros estelares, que são originados a partir da evolução de estrelas de massa elevada, os buracos negros supermassivos foram formados por imensas nuvens de gás ou por aglomerados de milhões de estrelas que colapsaram sobre a sua própria gravidade quando o universo ainda era bem mais jovem e denso.": "超大质量黑洞是一类主要存在于星系中心的黑洞。与由大质量恒星演化而来的恒星级黑洞不同，超大质量黑洞是由巨大的气体云或数百万颗恒星在宇宙还很年轻且密度很大时因自身引力坍缩形成的。",
  "They can fit multiple solar systems inside of them. Ton 618, the largest ultramassive black hole, appears at the very end of the video, which, ...": "它们可以容纳多个太阳系。Ton 618，最大的超大质量黑洞，出现在视频的最后……",
  "And the supermassive black hole at the center of Messier 87 is so huge that astronomers could see it from 55 million light-years away. It's 24 ...": "梅西耶87中心的超大质量黑洞非常巨大，天文学家能在5500万光年外观测到它。它有24...",
  "The list of the most massive black holes is topped by TON 618. TON 618 is technically a a hyperluminous, broad-absorption line, radio-loud quasar—located near": "最巨大的黑洞榜首是TON 618。TON 618严格来说是一个极亮、宽吸收线、强射电类星体，位于...",
  "Currently the largest known black hole, powering the quasar TON 618, has a mass of 66 billion solar masses. TON 618's enormous bulk led ...": "目前已知最大的黑洞，驱动着类星体TON 618，质量为660亿个太阳质量。TON 618的巨大体积导致...",
  "Buraco negro supermassivo": "超大质量黑洞",
  "Jules: No no, Mr. Wolfe, it's not like that. Your help is definitely appreciated.": "朱尔斯：不不，沃尔夫先生，不是那样的。您的帮助我们真的很感激。",
  "Vincent: Look, Mr. Wolfe, I respect you. I just don't like people barking orders at me, that's all.": "文森特：听着，沃尔夫先生，我很尊重您。我只是不喜欢别人对我大声发号施令，仅此而已。",
  "The Wolf: If I'm curt with you, it's because time is a factor. I think fast, I talk fast, and I need you two guys to act fast if you want to get out of this. So pretty please, with sugar on top, clean the car.": "沃尔夫：如果我对你们说话简短，那是因为时间紧迫。我思考快，说话快，如果你们想脱身，也需要动作快。所以，拜托了，麻烦你们把车清理干净。",
};

// 去除HTML标签的辅助函数
function stripHtmlTags(str) {
  if (typeof str !== 'string') return str;
  return str.replace(/<[^>]+>/g, '').trim();
}

// 递归翻译html字符串中的h2、p、a标签内的英文为中文
function translateHtmlText(html) {
  if (typeof html !== 'string') return html;
  // 替换h2、p、a标签内的文本
  return html.replace(/(<(h2|p|a)[^>]*>)([\s\S]*?)(<\/\2>)/gi, (match, start, tag, text, end) => {
    let replaced = text;
    Object.entries(EN_TO_CN_VALUES).forEach(([en, cn]) => {
      if (en && cn && replaced.includes(en)) {
        replaced = replaced.split(en).join(cn);
      }
    });
    return start + replaced + end;
  });
}

// 递归翻译所有对象/数组中的value字段
function translateDataValues(obj) {
  if (Array.isArray(obj)) {
    return obj.map(translateDataValues);
  } else if (obj && typeof obj === 'object') {
    const newObj = {};
    for (const key in obj) {
      if (typeof obj[key] === 'string') {
        const trimmed = obj[key].trim();
        // 如果是html字段，递归翻译标签内文本
        if (key === 'html') {
          newObj[key] = translateHtmlText(trimmed);
        } else {
          newObj[key] = EN_TO_CN_VALUES[trimmed]
            || EN_TO_CN_VALUES[stripHtmlTags(trimmed)]
            || obj[key];
        }
      } else {
        newObj[key] = translateDataValues(obj[key]);
      }
    }
    return newObj;
  }
  return obj;
}

// Lazy load Label Studio with a single promise to avoid multiple loads
// and enable as early as possible to load the dependencies once this component is mounted for the first time
let dependencies;
const loadDependencies = async () => {
  if (!dependencies) {
    dependencies = import("@humansignal/editor");
  }
  return dependencies;
};

export const Preview = ({ config, data, error, loading, project }) => {
  console.log(config, 'config111------');
  console.log('data for preview:', data);
  // @see comment about dependencies above
  loadDependencies();

  const [storeReady, setStoreReady] = useState(false);
  const lsf = useRef(null);
  const rootRef = useRef();
  const api = useAPI();
  const projectRef = useRef(project);
  projectRef.current = project;

  const translatedData = useMemo(() => {
    const translated = translateDataValues(data);
    return translated;
  }, [data]);
  const currentTask = useMemo(() => {
    return {
      id: 1,
      annotations: [],
      predictions: [],
      data: translatedData,
    };
  }, [translatedData]);

  /**
   * Proxy urls to presign them if storage is connected
   * @param {*} _ LS instance
   * @param {string} url http/https are not proxied and returned as is
   */
  const onPresignUrlForProject = async (_, url) => {
    const parsedUrl = new URL(url);

    // return same url if http(s)
    if (["http:", "https:"].includes(parsedUrl.protocol)) return url;

    const projectId = projectRef.current.id;

    const fileuri = btoa(url);

    return api.api.createUrl(API_CONFIG.endpoints.presignUrlForProject, { projectId, fileuri }).url;
  };

  const currentConfig = useMemo(() => {
    // empty string causes error in LSF
    return config ?? EMPTY_CONFIG;
  }, [config]);

  const initLabelStudio = useCallback(async (config, task) => {
    // wait for dependencies to load, the promise is resolved only once
    // and is started when the component is mounted for the first time
    await loadDependencies();

    if (lsf.current || !task.data) return;

    try {
      lsf.current = new window.LabelStudio(rootRef.current, {
        config,
        task,
        interfaces: ["side-column"],
        // with SharedStore we should use more late event
        onStorageInitialized(LS) {
          LS.settings.bottomSidePanel = true;

          const initAnnotation = () => {
            const as = LS.annotationStore;
            const c = as.createAnnotation();

            as.selectAnnotation(c.id);
            setStoreReady(true);
          };

          // and even then we need to wait a little even after the store is initialized
          setTimeout(initAnnotation);
        },
      });

      lsf.current.on("presignUrlForProject", onPresignUrlForProject);
    } catch (err) {
      console.error(err);
    }
  }, []);

  useEffect(() => {
    const opacity = loading || error ? 0.6 : 1;
    // to avoid rerenders and data loss we do it this way

    document.getElementById("label-studio").style.opacity = opacity;
  }, [loading, error]);

  useEffect(() => {
    initLabelStudio(currentConfig, currentTask).then(() => {
      if (storeReady && lsf.current?.store) {
        const store = lsf.current.store;

        store.resetState();
        store.assignTask(currentTask);
        store.assignConfig(currentConfig);
        store.initializeStore(currentTask);

        const c = store.annotationStore.addAnnotation({
          userGenerate: true,
        });

        store.annotationStore.selectAnnotation(c.id);
        console.log("LSF updated");
      }
    });
  }, [currentConfig, currentTask, storeReady]);

  useEffect(() => {
    return () => {
      if (lsf.current) {
        console.info("Destroying LSF");
        lsf.current.destroy();
        lsf.current = null;
      }
    };
  }, []);

  return (
    <div className={configClass.elem("preview")}>
      <h3>UI 预览</h3>
      {error && (
        <div className={configClass.elem("preview-error")}>
          <h2>
            {error.detail} {error.id}
          </h2>
          {error.validation_errors?.non_field_errors?.map?.((err) => (
            <p key={err}>{err}</p>
          ))}
          {error.validation_errors?.label_config?.map?.((err) => (
            <p key={err}>{err}</p>
          ))}
          {error.validation_errors?.map?.((err) => (
            <p key={err}>{err}</p>
          ))}
        </div>
      )}
      {!data && loading && <Spinner style={{ width: "100%", height: "50vh" }} />}
      <div id="label-studio" className={configClass.elem("preview-ui")} ref={rootRef} />
    </div>
  );
};
