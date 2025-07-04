import { useEffect, useRef, useState } from "react";
import { useHistory } from "react-router";
import { Button } from "../../components";
import { Form, Input } from "../../components/Form";
import { Modal } from "../../components/Modal/Modal";
import { Space } from "../../components/Space/Space";
import { useAPI } from "../../providers/ApiProvider";
import { useFixedLocation, useParams } from "../../providers/RoutesProvider";
import { BemWithSpecifiContext } from "../../utils/bem";
import { isDefined } from "../../utils/helpers";
import "./ExportPage.scss";

// const formats = {
//   json: 'JSON',
//   csv: 'CSV',
// };

const downloadFile = (blob, filename) => {
  const link = document.createElement("a");

  link.href = URL.createObjectURL(blob);
  link.download = filename;
  link.click();
};

const { Block, Elem } = BemWithSpecifiContext();

const wait = () => new Promise((resolve) => setTimeout(resolve, 5000));

const EXPORT_FORMAT_MAP = {
  "JSON": "JSON",
  "List of items in raw JSON format stored in one JSON file. Use to export both the data and the annotations for a dataset. It's Label Studio Common Format": "以原始 JSON 格式导出，存储在一个 JSON 文件中。可同时导出数据和标注结果（Label Studio 通用格式）",
  "JSON–MIN": "JSON-精简版",
  "List of items where only \"from_name\", \"to_name\" values from the raw JSON format are exported. Use to export only the annotations for a dataset.": "仅导出原始 JSON 格式中的 from_name、to_name 字段，仅包含标注信息。",
  "CSV": "CSV",
  "Results are stored as comma–separated values with the column names specified by the values of the \"from_name\" and \"to_name\" fields.": "以逗号分隔值（CSV）格式导出，列名由 from_name 和 to_name 字段指定。",
  "TSV": "TSV",
  "Results are stored in tab–separated tabular file with column names specified by \"from_name\" \"to_name\" values": "以制表符分隔值（TSV）格式导出，列名由 from_name 和 to_name 字段指定。",
  "YOLOv8 OBB": "YOLOv8 OBB",
  "Popular TXT format is created for each image file. Each txt file contains annotations for the corresponding image file. The YOLO OBB format designates bounding boxes by their four corner points with coordinates normalized between 0 and 1, so it is possible to export rotated objects.": "为每个图片生成一个 TXT 文件，包含对应图片的标注。YOLO OBB 格式用四个角点坐标（归一化到 0-1）表示旋转框，支持导出旋转目标。",
  "YOLOv8 OBB with Images": "YOLOv8 OBB（含图片）",
  "YOLOv8 OBB format with images downloaded.": "YOLOv8 OBB 格式并下载图片。",
  "CONLL2003": "CONLL2003",
  "Popular format used for the CoNLL-2003 named entity recognition challenge.": "CoNLL-2003 命名实体识别挑战常用格式。",
  "COCO": "COCO",
  "Popular machine learning format used by the COCO dataset for object detection and image segmentation tasks with polygons and rectangles.": "COCO 数据集常用的机器学习格式，适用于目标检测和图像分割（多边形、矩形）。",
  "COCO with Images": "COCO（含图片）",
  "COCO format with images downloaded.": "COCO 格式并下载图片。",
  "Pascal VOC XML": "Pascal VOC XML",
  "Popular XML format used for object detection and polygon image segmentation tasks.": "常用 XML 格式，适用于目标检测和多边形分割任务。",
  "YOLO": "YOLO",
  "Popular TXT format is created for each image file. Each txt file contains annotations for the corresponding image file, that is object class, object coordinates, height & width.": "为每个图片生成一个 TXT 文件，包含类别、坐标、高度和宽度等标注信息。",
  "YOLO with Images": "YOLO（含图片）",
  "YOLO format with images downloaded.": "YOLO 格式并下载图片。",
  "Brush labels to NumPy": "画笔标签转 NumPy",
  "Export your brush labels as NumPy 2d arrays. Each label outputs as one image.": "将画笔标签导出为 NumPy 2D 数组，每个标签输出为一张图片。",
  "Brush labels to PNG": "画笔标签转 PNG",
  "Export your brush labels as PNG images. Each label outputs as one image.": "将画笔标签导出为 PNG 图片，每个标签输出为一张图片。",
  "ASR Manifest": "ASR 标注清单",
  "Export audio transcription labels for automatic speech recognition as the JSON manifest format expected by NVIDIA NeMo models.": "以 NVIDIA NeMo 兼容的 JSON 清单格式导出音频转录标注。",
  "Brush labels to COCO": "画笔标签转 COCO",
  "Export your brush labels as COCO format for segmentation tasks. Converts RLE encoded masks to COCO polygons.": "将画笔标签导出为 COCO 格式用于分割任务，将 RLE 掩码转换为 COCO 多边形。",
  "Results are stored in tab-separated tabular file with column names specified by \"from_name\" \"to_name\" values": "结果存储在以制表符分隔的表格文件中，列名由\“from_name\”\“to_name\”值指定",
  "Results are stored as comma-separated values with the column names specified by the values of the \"from_name\" and \"to_name\" fields.": "结果存储在以逗号分隔的表格文件中，列名由\“from_name\”\“to_name\”值指定",
};

const EXPORT_TAG_MAP = {
  "image segmentation": "图像分割",
  "object detection": "目标检测",
  "text tagging": "文本标注",
  "named entity recognition": "命名实体识别",
  "keypoints": "关键点",
  "speech recognition": "语音识别",
  "brush annotations": "画笔标注",
};

const getExportFormatText = (text) => EXPORT_FORMAT_MAP[text] || text;
const getExportTagText = (tag) => EXPORT_TAG_MAP[tag] || tag;

export const ExportPage = () => {
  const history = useHistory();
  const location = useFixedLocation();
  const pageParams = useParams();
  const api = useAPI();

  const [previousExports, setPreviousExports] = useState([]);
  const [downloading, setDownloading] = useState(false);
  const [downloadingMessage, setDownloadingMessage] = useState(false);
  const [availableFormats, setAvailableFormats] = useState([]);
  const [currentFormat, setCurrentFormat] = useState("JSON");

  /** @type {import('react').RefObject<Form>} */
  const form = useRef();

  const proceedExport = async () => {
    setDownloading(true);

    const message = setTimeout(() => {
      setDownloadingMessage(true);
    }, 1000);

    const params = form.current.assembleFormData({
      asJSON: true,
      full: true,
      booleansAsNumbers: true,
    });

    const response = await api.callApi("exportRaw", {
      params: {
        pk: pageParams.id,
        ...params,
      },
    });

    if (response.ok) {
      const blob = await response.blob();

      downloadFile(blob, response.headers.get("filename"));
    } else {
      api.handleError(response);
    }

    setDownloading(false);
    setDownloadingMessage(false);
    clearTimeout(message);
  };

  useEffect(() => {
    if (isDefined(pageParams.id)) {
      api
        .callApi("previousExports", {
          params: {
            pk: pageParams.id,
          },
        })
        .then(({ export_files }) => {
          setPreviousExports(export_files.slice(0, 1));
        });

      api
        .callApi("exportFormats", {
          params: {
            pk: pageParams.id,
          },
        })
        .then((formats) => {
          setAvailableFormats(formats);
          setCurrentFormat(formats[0]?.name);
        });
    }
  }, [pageParams]);

  return (
    <Modal
      onHide={() => {
        const path = location.pathname.replace(ExportPage.path, "");
        const search = location.search;

        history.replace(`${path}${search !== "?" ? search : ""}`);
      }}
      title="导出数据"
      style={{ width: 720 }}
      closeOnClickOutside={false}
      allowClose={!downloading}
      // footer="Read more about supported export formats in the Documentation."
      visible
    >
      <Block name="export-page">
        <FormatInfo
          availableFormats={availableFormats}
          selected={currentFormat}
          onClick={(format) => setCurrentFormat(format.name)}
        />

        <Form ref={form}>
          <Input type="hidden" name="exportType" value={currentFormat} />
        </Form>

        <Elem name="footer">
          <Space style={{ width: "100%" }} spread>
            <Elem name="recent">{/* {exportHistory} */}</Elem>
            <Elem name="actions">
              <Space>
                {downloadingMessage && "正在准备导出文件，可能需要一些时间。"}
                <Button type="submit" look="primary" style={{ width: 120 }} onClick={proceedExport} waiting={downloading}>
                  导出
                </Button>
              </Space>
            </Elem>
          </Space>
        </Elem>

        <Form.Indicator><span case="success">已导出！</span></Form.Indicator>
      </Block>
    </Modal>
  );
};

const FormatInfo = ({ availableFormats, selected, onClick }) => {
  return (
    <Block name="formats">
      <Elem name="info">你可以将数据集导出为以下格式之一：</Elem>
      <Elem name="list">
        {availableFormats.map((format) => (
          <Elem
            key={format.name}
            name="item"
            mod={{
              active: !format.disabled,
              selected: format.name === selected,
            }}
            onClick={!format.disabled ? () => onClick(format) : null}
          >
            <Elem name="name">
              {getExportFormatText(format.title)}
              <Space size="small">
                {format.tags?.map?.((tag, index) => (
                  <Elem key={index} name="tag">
                    {getExportTagText(tag)}
                  </Elem>
                ))}
              </Space>
            </Elem>

            {format.description && <Elem name="description">{getExportFormatText(format.description)}</Elem>}
          </Elem>
        ))}
      </Elem>
      <Elem name="feedback">
        找不到需要的导出格式？
        <br />
        请在
        <a className="no-go" href="https://slack.labelstud.io/?source=product-export" target="_blank" rel="noreferrer">
          Slack 社区
        </a>
        反馈，或在
        <a
          className="no-go"
          href="https://github.com/HumanSignal/label-studio-converter/issues"
          target="_blank"
          rel="noreferrer"
        >
          GitHub 仓库
        </a>
        提交 issue。
      </Elem>
    </Block>
  );
};

ExportPage.path = "/export";
ExportPage.modal = true;
