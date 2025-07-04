export const recipes = [
  {
    title: "目标检测（边界框）",
    type: "community",
    group: "计算机视觉",
    image: "bbox.png",
    details: `<h1>简单目标检测</h1>
    <p>用于边界框标注的示例配置</p>
    <p>你可以自定义标签及其颜色</p>`,
    config: `<View>
  <Image name="image" value="$image"/>
  <RectangleLabels name="label" toName="image">
    <Label value="飞机" background="green"/>
    <Label value="汽车" background="blue"/>
  </RectangleLabels>
</View>`,
  },
  {
    title: "多边形标注",
    type: "community",
    group: "计算机视觉",
    image: "polygon.png",
    details: "",
    config: `<View>
  <Header value="选择标签后点击图片开始标注"/>
  <Image name="image" value="$image"/>
  <PolygonLabels name="label" toName="image"
                 strokeWidth="3" pointSize="small"
                 opacity="0.9">
    <Label value="飞机" background="red"/>
    <Label value="汽车" background="blue"/>
  </PolygonLabels>
</View>
`,
  },
  {
    title: "命名实体识别",
    type: "community",
    group: "自然语言处理",
    image: "text.png",
    config: `<View>
  <Labels name="label" toName="text">
    <Label value="人" background="red"/>
    <Label value="组织" background="darkorange"/>
    <Label value="事实" background="orange"/>
    <Label value="金钱" background="green"/>
    <Label value="日期" background="darkblue"/>
    <Label value="时间" background="blue"/>
    <Label value="序数" background="purple"/>
    <Label value="百分比" background="#842"/>
    <Label value="产品" background="#428"/>
    <Label value="语言" background="#482"/>
    <Label value="地点" background="rgba(0,0,0,0.8)"/>
  </Labels>

  <Text name="text" value="$text"/>
</View>`,
  },
];
