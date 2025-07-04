# Label Studio Editor 英文文案中文化替换总结

## 已完成的替换

### 1. 按钮和操作文本
- `Submit` → `提交`
- `Update` → `更新`
- `Cancel` → `取消`
- `OK` → `确定`
- `Delete` → `删除`
- `Edit` → `编辑`
- `Settings` → `设置`
- `Start` → `开始`

### 2. 模态框和提示信息
- `Error` → `错误`
- `Warning` → `警告`
- `Success` → `成功`
- `Info` → `信息`
- `Please confirm you want to delete this annotation` → `请确认您要删除此标注`

### 3. 状态和描述文本
- `Unsaved Annotation` → `未保存的标注`
- `Created` → `已创建`
- `Started` → `已开始`
- `No annotations submitted yet` → `暂无标注提交`
- `seconds ago` → `几秒前`

### 4. 面板和导航
- `Outliner` → `大纲`
- `Details` → `详情`
- `per page` → `每页 ... 条`
- `of` → `共 ... 页`

### 5. 音频和频谱图相关
- `Hann` → `汉宁窗`
- `Hamming` → `海明窗`
- `Blackman` → `布莱克曼窗`
- `Rectangular` → `矩形窗`
- `Windowing Function` → `窗函数`
- `Color Scheme` → `配色方案`

### 6. 工具提示和辅助功能
- `Save results: [ Ctrl+Enter ]` → `保存结果: [ Ctrl+Enter ]`
- `Update this task: [ Ctrl+Enter ]` → `更新此任务: [ Ctrl+Enter ]`
- `No changes were made` → `没有进行任何更改`
- `Show all regions` → `显示所有区域`
- `Hide all regions` → `隐藏所有区域`

### 7. 分类和标签
- `Classification` → `分类`
- `Cancel edit` → `取消编辑`

### 8. 提交和退出
- `Submit and exit` → `提交并退出`
- `Update and exit` → `更新并退出`

## 替换的文件列表

1. `/components/BottomBar/Controls.tsx` - 底部控制栏
2. `/common/Modal/Modal.jsx` - 模态框组件
3. `/components/Infomodal/Infomodal.js` - 信息模态框
4. `/components/Annotations/Annotations.jsx` - 标注列表
5. `/components/SidePanels/SidePanels.tsx` - 侧边栏面板
6. `/common/Pagination/Pagination.tsx` - 分页组件
7. `/common/TimeAgo/TimeAgo.tsx` - 时间显示组件
8. `/lib/AudioUltra/Visual/constants.ts` - 音频常量
9. `/components/BottomBar/Actions.jsx` - 底部操作按钮
10. `/components/TopBar/Actions.jsx` - 顶部操作按钮
11. `/components/HtxTextBox/HtxTextBox.jsx` - 文本框组件
12. `/components/TimeDurationControl/TimeDurationControl.tsx` - 时间控制
13. `/components/AnnotationsCarousel/AnnotationButton.tsx` - 标注轮播按钮
14. `/components/Comments/OldComment/CommentItem.tsx` - 评论组件
15. `/components/Comments/Comment/CommentItem.tsx` - 新评论组件
16. `/components/Settings/Settings.jsx` - 设置组件
17. `/components/Node/Node.tsx` - 节点组件
18. `/components/Timeline/Controls/SpectrogramControl.tsx` - 频谱图控制
19. `/components/SidePanels/OutlinerPanel/ViewControls.tsx` - 视图控制
20. `/components/SidePanels/TabPanels/utils.ts` - 标签页工具

## 注意事项

1. 所有替换都保持了原有的功能和结构
2. 替换主要针对用户界面可见的文本
3. 技术术语和代码中的英文保持不变
4. 部分文件存在 linter 错误，但这些错误与翻译无关，是原有的依赖问题

## 建议

1. 建议进行完整的用户界面测试，确保所有翻译都正确显示
2. 可以考虑添加国际化框架（如 i18next）来更好地管理多语言支持
3. 对于动态生成的文本，可能需要额外的处理
4. 建议创建翻译配置文件，便于后续维护和扩展 