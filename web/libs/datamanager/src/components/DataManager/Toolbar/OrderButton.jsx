import { inject } from "mobx-react";
import { IconSortDown, IconSortUp } from "@humansignal/icons";
import { Button } from "../../Common/Button/Button";
import { FieldsButton } from "../../Common/FieldsButton";
import { Space } from "../../Common/Space/Space";

const injector = inject(({ store }) => {
  const view = store?.currentView;

  return {
    view,
    ordering: view?.currentOrder,
  };
});

const COLUMN_TITLE_MAP = {
  "Default": "默认",
  "ID": "编号",
  "Inner ID": "内部编号",
  "Completed": "已完成",
  "Annotations": "标注",
  "Cancelled": "已取消",
  "Predictions": "预测",
  "Annotated by": "标注人",
  "Annotation results": "标注结果",
  "Annotation IDs": "标注ID",
  "Prediction score": "预测分数",
  "Prediction model versions": "预测模型版本",
  "Prediction results": "预测结果",
  "Upload filename": "上传文件名",
  "Storage filename": "存储文件名",
  "Created at": "创建时间",
  "Updated at": "更新时间",
  "Updated by": "更新人",
  "Lead Time": "用时",
  "Drafts": "草稿",
  "data": "数据",
  "Task ID": "任务编号",
  "Project": "项目",
  "Data": "数据",
  "Status": "状态",
  "Owner": "拥有者",
  "Annotator": "标注员",
  "Reviewer": "复核员",
  "Created By": "创建人",
  "Total Annotations": "标注总数",
  "Total Predictions": "预测总数",
  "Cancelled Annotations": "取消标注数",
  "Reviews Accepted": "通过复核数",
  "Reviews Rejected": "拒绝复核数",
  "Ground Truth": "基准真值",
  "Comment Count": "评论数",
  "Unresolved Comment Count": "未解决评论数",
  "Name": "名称",
  "Value": "值",
  "Type": "类型",
  "Description": "描述",
  "Label": "标签",
  "Score": "分数",
  "Prediction": "预测",
  "Result": "结果",
  "File": "文件",
  "File Name": "文件名",
  "File Size": "文件大小",
  "Email": "邮箱",
  "Role": "角色",
  "Last Activity": "最近活跃",
  "data": "数据",
  // 可根据实际表格字段继续补充
};

const getColumnTitle = (title) => COLUMN_TITLE_MAP[title] || title;

export const OrderButton = injector(({ size, ordering, view, ...rest }) => {
  return (
    <Space style={{ fontSize: 12 }}>
      <Button.Group collapsed {...rest}>
        <FieldsButton
          size={size}
          style={{ minWidth: 67, textAlign: "left", marginRight: -1 }}
          title={ordering ? getColumnTitle(ordering.column?.title) : "排序"}
          onClick={(col) => view.setOrdering(col.id)}
          onReset={() => view.setOrdering(null)}
          resetTitle="Default"
          selected={ordering?.field}
          filter={(col) => {
            return col.orderable ?? col.original?.orderable;
          }}
          wrapper={({ column, children }) => (
            <Space style={{ width: "100%", justifyContent: "space-between" }}>
              {getColumnTitle(children)}

              <div
                style={{
                  width: 24,
                  height: 24,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {column?.icon}
              </div>
            </Space>
          )}
          openUpwardForShortViewport={false}
        />

        <Button
          size={size}
          disabled={!!ordering === false}
          icon={ordering?.desc ? <IconSortUp /> : <IconSortDown />}
          onClick={() => view.setOrdering(ordering?.field)}
        />
      </Button.Group>
    </Space>
  );
});
