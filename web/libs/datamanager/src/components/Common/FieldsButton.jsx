import { inject, observer } from "mobx-react";
import React from "react";
import { Button } from "./Button/Button";
import { Checkbox, Tooltip } from "@humansignal/ui";
import { Dropdown } from "./Dropdown/Dropdown";
import { Menu } from "./Menu/Menu";
import { Elem } from "../../utils/bem";

const injector = inject(({ store }) => {
  return {
    columns: Array.from(store.currentView?.targetColumns ?? []),
  };
});

// 引入与 OrderButton 相同的中英文映射表
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
};
const getColumnTitle = (title) => {
  if (!title) return title;
  const key = Object.keys(COLUMN_TITLE_MAP).find(k => k.toLowerCase() === title.toLowerCase());
  return key ? COLUMN_TITLE_MAP[key] : title;
};

const FieldsMenu = observer(({ columns, WrapperComponent, onClick, onReset, selected, resetTitle }) => {
  const MenuItem = (col, onClick) => {
    return (
      <Menu.Item key={col.key} name={col.key} onClick={onClick} disabled={col.disabled}>
        {WrapperComponent && col.wra !== false ? (
          <WrapperComponent column={col} disabled={col.disabled}>
            {getColumnTitle(col.title)}
          </WrapperComponent>
        ) : (
          getColumnTitle(col.title)
        )}
      </Menu.Item>
    );
  };

  return (
    <Menu size="small" selectedKeys={selected ? [selected] : ["none"]} closeDropdownOnItemClick={false}>
      {onReset &&
        MenuItem(
          {
            key: "none",
            title: getColumnTitle(resetTitle ?? "Default"),
            wrap: false,
          },
          onReset,
        )}

      {columns.map((col) => {
        if (col.children) {
          return (
            <Menu.Group key={col.key} title={getColumnTitle(col.title)}>
              {col.children.map((col) => MenuItem(col, () => onClick?.(col)))}
            </Menu.Group>
          );
        }
        if (!col.parent) {
          return MenuItem(col, () => onClick?.(col));
        }

        return null;
      })}
    </Menu>
  );
});

export const FieldsButton = injector(
  ({
    columns,
    size,
    style,
    wrapper,
    title,
    icon,
    className,
    trailingIcon,
    onClick,
    onReset,
    resetTitle,
    filter,
    selected,
    tooltip,
    tooltipTheme = "dark",
    openUpwardForShortViewport = true,
  }) => {
    const content = [];

    if (title) content.push(<React.Fragment key="f-button-title">{title}</React.Fragment>);

    const renderButton = () => {
      return (
        <Button size={size} icon={icon} extra={trailingIcon} style={style} className={className}>
          {content.length ? content : null}
        </Button>
      );
    };

    return (
      <Dropdown.Trigger
        content={
          <FieldsMenu
            columns={filter ? columns.filter(filter) : columns}
            WrapperComponent={wrapper}
            onClick={onClick}
            onReset={onReset}
            selected={selected}
            resetTitle={resetTitle}
          />
        }
        style={{
          maxHeight: 280,
          overflow: "auto",
        }}
        openUpwardForShortViewport={openUpwardForShortViewport}
      >
        {tooltip ? (
          <Elem name={"field-button"} style={{ zIndex: 1000 }}>
            <Tooltip title={tooltip} theme={tooltipTheme}>
              {renderButton()}
            </Tooltip>
          </Elem>
        ) : (
          renderButton()
        )}
      </Dropdown.Trigger>
    );
  },
);

FieldsButton.Checkbox = observer(({ column, children, disabled }) => {
  return (
    <Checkbox
      size="small"
      checked={!column.hidden}
      onChange={column.toggleVisibility}
      style={{ width: "100%", height: "100%" }}
      disabled={disabled}
    >
      {children}
    </Checkbox>
  );
});
