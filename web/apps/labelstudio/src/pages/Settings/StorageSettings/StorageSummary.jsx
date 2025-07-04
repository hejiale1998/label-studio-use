import { format } from "date-fns/esm";
import { Space, Tooltip } from "@humansignal/ui";
import { Button } from "../../../components";
import { DescriptionList } from "../../../components/DescriptionList/DescriptionList";
import { modal } from "../../../components/Modal/Modal";
import { Oneof } from "../../../components/Oneof/Oneof";
import { getLastTraceback } from "../../../utils/helpers";

export const StorageSummary = ({ target, storage, className, storageTypes = [] }) => {
  const storageStatus = storage.status.replace(/_/g, " ").replace(/(^\w)/, (match) => match.toUpperCase());
  const last_sync_count = storage.last_sync_count ? storage.last_sync_count : 0;

  const tasks_existed =
    typeof storage.meta?.tasks_existed !== "undefined" && storage.meta?.tasks_existed !== null
      ? storage.meta.tasks_existed
      : 0;
  const total_annotations =
    typeof storage.meta?.total_annotations !== "undefined" && storage.meta?.total_annotations !== null
      ? storage.meta.total_annotations
      : 0;

  // help text for tasks and annotations
  const tasks_added_help = `${last_sync_count} 个新任务在最后一次同步中添加。`;
  const tasks_total_help = [
    `${tasks_existed} 个任务已被发现并已同步，不会再次添加到项目中。`,
    `${tasks_existed + last_sync_count} 个任务已添加到该项目中。`,
  ].join("\n");
  const annotations_help = `${last_sync_count} 个注释在最后一次同步中成功保存。`;
  const total_annotations_help =
    typeof storage.meta?.total_annotations !== "undefined"
      ? `${storage.meta.total_annotations} 个注释在同步时刻项目中可见。`
      : "";

  const handleButtonClick = () => {
    const msg =
      `Error logs for ${target === "export" ? "export " : ""}${storage.type} ` +
      `storage ${storage.id} in project ${storage.project} and job ${storage.last_sync_job}:\n\n` +
      `${getLastTraceback(storage.traceback)}\n\n` +
      `meta = ${JSON.stringify(storage.meta)}\n`;
    const targetType = target === "export" ? "Target" : "Source";

    modal({
      title: "Storage error logs",
      body: (
        <>
          <pre className="bg-neutral-surface-inset text-neutral-content-subtler p-base mb-base rounded-md text-xs overflow-scroll">
            {msg}
          </pre>
          <Space spread>
            <Button
              size="compact"
              onClick={() => {
                navigator.clipboard.writeText(msg);
              }}
            >
              Copy
            </Button>
            <a
              target="_blank"
              rel="noreferrer"
              href={`https://labelstud.io/guide/storage.html#${targetType}-storage-permissions`}
            >
              Check {targetType} Storage documentation
            </a>
          </Space>
        </>
      ),
      style: { width: "700px" },
      optimize: false,
      allowClose: true,
    });
  };

  return (
    <div className={className}>
      <DescriptionList>
        <DescriptionList.Item term="类型">
          {(storageTypes ?? []).find((s) => s.name === storage.type)?.title ?? storage.type}
        </DescriptionList.Item>

        <Oneof value={storage.type}>
          <SummaryS3 case={["s3", "s3s"]} storage={storage} />
          <GSCStorage case="gcs" storage={storage} />
          <AzureStorage case="azure" storage={storage} />
          <RedisStorage case="redis" storage={storage} />
          <LocalStorage case="localfiles" storage={storage} />
        </Oneof>

        <DescriptionList.Item
          term="状态"
          help={[
            "已初始化：存储已添加，但从未同步；可用于启动 URI 链接解析",
            "已排队：同步任务已进入队列，但尚未开始",
            "进行中：同步任务正在运行",
            "失败：同步任务已停止，发生错误",
            "已完成：同步任务已成功完成",
          ].join("\n")}
        >
          {storageStatus === "Failed" ? (
            <span style={{ cursor: "pointer", borderBottom: "1px dashed gray" }} onClick={handleButtonClick}>
              失败
            </span>
          ) : (
            storageStatus === "Initialized" ? "已初始化" :
            storageStatus === "Queued" ? "已排队" :
            storageStatus === "In progress" ? "进行中" :
            storageStatus === "Completed" ? "已完成" :
            storageStatus
          )}
        </DescriptionList.Item>

        {target === "export" ? (
          <DescriptionList.Item term="标注" help={`${annotations_help}\n${total_annotations_help}`}>
            <Tooltip title={annotations_help}>
              <span>{last_sync_count}</span>
            </Tooltip>
            <Tooltip title={total_annotations_help}>
              <span>（共 {total_annotations} 条）</span>
            </Tooltip>
          </DescriptionList.Item>
        ) : (
          <DescriptionList.Item term="任务" help={`${tasks_added_help}\n${tasks_total_help}`}>
            <Tooltip title={`${tasks_added_help}\n${tasks_total_help}`} style={{ whiteSpace: "pre-wrap" }}>
              <span>{last_sync_count + tasks_existed}</span>
            </Tooltip>
            <Tooltip title={tasks_added_help}>
              <span>（新增 {last_sync_count} 条）</span>
            </Tooltip>
          </DescriptionList.Item>
        )}

        <DescriptionList.Item term="上次同步">
          {storage.last_sync ? format(new Date(storage.last_sync), "yyyy年MM月dd日 ∙ HH:mm:ss") : "尚未同步"}
        </DescriptionList.Item>
      </DescriptionList>
    </div>
  );
};

const SummaryS3 = ({ storage }) => {
  return <DescriptionList.Item term="Bucket">{storage.bucket}</DescriptionList.Item>;
};

const GSCStorage = ({ storage }) => {
  return <DescriptionList.Item term="Bucket">{storage.bucket}</DescriptionList.Item>;
};

const AzureStorage = ({ storage }) => {
  return <DescriptionList.Item term="Container">{storage.container}</DescriptionList.Item>;
};

const RedisStorage = ({ storage }) => {
  return (
    <>
      <DescriptionList.Item term="Path">{storage.path}</DescriptionList.Item>
      <DescriptionList.Item term="Host">
        {storage.host}
        {storage.port ? `:${storage.port}` : ""}
      </DescriptionList.Item>
    </>
  );
};

const LocalStorage = ({ storage }) => {
  return <DescriptionList.Item term="Path">{storage.path}</DescriptionList.Item>;
};
