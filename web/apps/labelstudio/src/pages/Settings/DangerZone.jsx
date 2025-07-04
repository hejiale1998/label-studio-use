import { useMemo, useState } from "react";
import { useHistory } from "react-router";
import { Button } from "../../components";
import { Label } from "../../components/Form";
import { confirm } from "../../components/Modal/Modal";
import { Spinner } from "../../components/Spinner/Spinner";
import { useAPI } from "../../providers/ApiProvider";
import { useProject } from "../../providers/ProjectProvider";
import { cn } from "../../utils/bem";

export const DangerZone = () => {
  const { project } = useProject();
  const api = useAPI();
  const history = useHistory();
  const [processing, setProcessing] = useState(null);

  const handleOnClick = (type) => () => {
    confirm({
      title: "操作确认",
      body: "您即将删除所有内容。此操作不可撤销。",
      okText: "继续",
      buttonLook: "destructive",
      onOk: async () => {
        setProcessing(type);
        if (type === "annotations") {
          // console.log('delete annotations');
        } else if (type === "tasks") {
          // console.log('delete tasks');
        } else if (type === "predictions") {
          // console.log('delete predictions');
        } else if (type === "reset_cache") {
          await api.callApi("projectResetCache", {
            params: {
              pk: project.id,
            },
          });
        } else if (type === "tabs") {
          await api.callApi("deleteTabs", {
            body: {
              project: project.id,
            },
          });
        } else if (type === "project") {
          await api.callApi("deleteProject", {
            params: {
              pk: project.id,
            },
          });
          history.replace("/projects");
        }
        setProcessing(null);
      },
    });
  };

  const buttons = useMemo(
    () => [
      {
        type: "annotations",
        disabled: true, //&& !project.total_annotations_number,
        label: `删除 ${project.total_annotations_number} 条标注`,
      },
      {
        type: "tasks",
        disabled: true, //&& !project.task_number,
        label: `删除 ${project.task_number} 条任务`,
      },
      {
        type: "predictions",
        disabled: true, //&& !project.total_predictions_number,
        label: `删除 ${project.total_predictions_number} 条预测`,
      },
      {
        type: "reset_cache",
        help:
          "如果由于现有标签的校验错误导致无法修改标注配置，但您确定这些标签已不存在，可以尝试重置缓存后重试。",
        label: "重置缓存",
      },
      {
        type: "tabs",
        help: "如果数据管理器无法加载，清空所有数据管理器标签页可能有助于恢复。",
        label: "清空所有标签页",
      },
      {
        type: "project",
        help: "删除项目会移除所有任务、标注和项目信息，且无法恢复。",
        label: "删除项目",
      },
    ],
    [project],
  );

  return (
    <div className={cn("simple-settings")}>
      <h1>危险操作区</h1>
      <Label description="请谨慎操作，本页面的操作不可撤销。请确保您的数据已备份。" />

      {project.id ? (
        <div style={{ marginTop: 16 }}>
          {buttons.map((btn) => {
            const waiting = processing === btn.type;
            const disabled = btn.disabled || (processing && !waiting);

            return (
              btn.disabled !== true && (
                <div className={cn("settings-wrapper")} key={btn.type}>
                  <h3>{btn.label.replace('Delete', '删除').replace('Reset', '重置').replace('Remove', '移除').replace('Clear', '清空')}</h3>
                  {btn.help && <Label description={btn.help.replace('This action cannot be undone.', '此操作不可撤销。').replace('Make sure your data is backed up.', '请确保您的数据已备份。').replace('Perform these actions at your own risk.', '请谨慎操作。')} style={{ width: 600, display: "block" }} />}
                  <Button
                    key={btn.type}
                    look="danger"
                    disabled={disabled}
                    waiting={waiting}
                    onClick={handleOnClick(btn.type)}
                    style={{ marginTop: 16 }}
                  >
                    {btn.label.replace('Delete', '删除').replace('Reset', '重置').replace('Remove', '移除').replace('Clear', '清空')}
                  </Button>
                </div>
              )
            );
          })}
        </div>
      ) : (
        <div style={{ display: "flex", justifyContent: "center", marginTop: 32 }}>
          <Spinner size={32} />
        </div>
      )}
    </div>
  );
};

DangerZone.title = "危险操作区";
DangerZone.path = "/danger-zone";
