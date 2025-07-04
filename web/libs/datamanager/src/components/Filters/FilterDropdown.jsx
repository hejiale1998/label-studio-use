import { observer } from "mobx-react";
import { Select } from "../Common/Form";
import { useCallback, useMemo } from "react";

// 引入与 OrderButton/FieldsButton 相同的中英文映射表
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
  "And": "且",
  "Or": "或",
  "Where": "条件",
};
const getColumnTitle = (title) => {
  if (!title) return title;
  const key = Object.keys(COLUMN_TITLE_MAP).find(k => k.toLowerCase() === title.toLowerCase());
  return key ? COLUMN_TITLE_MAP[key] : title;
};

export const FilterDropdown = observer(
  ({
    placeholder,
    defaultValue,
    items,
    style,
    disabled,
    onChange,
    multiple,
    value,
    optionRender,
    dropdownClassName,
    outputFormat,
    searchFilter,
  }) => {
    const parseItems = useCallback(
      (item) => {
        const OptionVisuals =
          optionRender ??
          (() => {
            return <>{getColumnTitle(item?.label ?? item?.title ?? item?.value ?? item)}</>;
          });
        const option =
          typeof item === "string" || typeof item === "number"
            ? { label: <OptionVisuals item={item} />, value: item, original: item }
            : {
                ...item,
                label: item?.original?.field?.parent ? (
                  <OptionVisuals item={item} />
                ) : (
                  getColumnTitle(item?.title ?? item?.label ?? item?.name)
                ),
                value: item?.value ?? item,
                children: item?.options?.map(parseItems),
              };
        return option;
      },
      [optionRender],
    );
    const options = useMemo(() => items.map(parseItems), [items, parseItems]);

    return (
      <Select
        multiple={multiple}
        placeholder={placeholder}
        defaultValue={defaultValue}
        value={value}
        onChange={(value) => onChange(outputFormat?.(value) ?? value)}
        disabled={disabled}
        size="small"
        options={options}
        searchable={true}
        triggerClassName="whitespace-nowrap"
        searchFilter={searchFilter}
      />
    );
  },
);
