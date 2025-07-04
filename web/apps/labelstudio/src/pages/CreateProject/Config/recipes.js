export const recipes = [
  {
    title: "Bbox object detection",
    type: "community",
    group: "Computer Vision",
    image: "bbox.png",
    details: `<h1>Simple object detection</h1>
    <p>Sample config to label with bboxes</p>
    <p>You can configure labels and their colors</p>`,
    config: `<View>
  <Image name="image" value="$image"/>
  <RectangleLabels name="label" toName="image">
    <Label value="飞机" background="green"/>
    <Label value="汽车" background="blue"/>
  </RectangleLabels>
</View>`,
  },
  {
    title: "Polygon labeling",
    type: "community",
    group: "Computer Vision",
    image: "polygon.png",
    details: "",
    config: `<View>
  <Header value="Select label and click on image to start"/>
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
    title: "Named entity recognition",
    type: "community",
    group: "NLP",
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
