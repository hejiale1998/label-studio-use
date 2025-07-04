import { useCallback, useContext, useEffect, useState } from "react";
import { Description } from "../../../components/Description/Description";
import { Divider } from "../../../components/Divider/Divider";
import { EmptyState } from "../../../components/EmptyState/EmptyState";
import { IconPredictions } from "@humansignal/ui";
import { useAPI } from "../../../providers/ApiProvider";
import { ProjectContext } from "../../../providers/ProjectProvider";
import { Spinner } from "../../../components/Spinner/Spinner";
import { PredictionsList } from "./PredictionsList";
import { Block, Elem } from "../../../utils/bem";
import "./PredictionsSettings.scss";

export const PredictionsSettings = () => {
  const api = useAPI();
  const { project } = useContext(ProjectContext);
  const [versions, setVersions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loaded, setLoaded] = useState(false);

  const fetchVersions = useCallback(async () => {
    setLoading(true);
    const versions = await api.callApi("projectModelVersions", {
      params: {
        pk: project.id,
        extended: true,
      },
    });

    if (versions) setVersions(versions.static);
    setLoading(false);
    setLoaded(true);
  }, [project, setVersions]);

  useEffect(() => {
    if (project.id) {
      fetchVersions();
    }
  }, [project]);

  return (
    <Block name="prediction-settings">
      <Elem name={"wrapper"}>
        {loading && <Spinner size={32} />}

        {loaded && versions.length > 0 && (
          <Elem name="title-block">
            <Elem name="title">预测结果列表</Elem>
            <Description style={{ marginTop: "1em" }}>
              项目中可用的预测结果列表。每张卡片对应一个模型版本。了解如何导入预测结果，
              <a href="https://labelstud.io/guide/predictions.html" target="_blank" rel="noreferrer">
                查看文档
              </a>
              。
            </Description>
          </Elem>
        )}

        {loaded && versions.length === 0 && (
          <EmptyState
            icon={<IconPredictions />}
            title="尚未上传预测结果"
            description="预测结果可用于预标注或模型验证。您可以上传并选择多个模型版本的预测结果，也可以在模型标签页连接实时模型。"
            footer={
              <div>
                需要帮助？
                <br />
                <a href="https://labelstud.io/guide/predictions" target="_blank" rel="noreferrer">
                  查看如何上传预测结果的文档
                </a>
              </div>
            }
          />
        )}

        <PredictionsList project={project} versions={versions} fetchVersions={fetchVersions} />

        <Divider height={32} />
      </Elem>
    </Block>
  );
};

PredictionsSettings.title = "预测结果";
PredictionsSettings.path = "/predictions";
