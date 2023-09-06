### 基础用法

```html
<van-datetime-picker type="datetime" title="选择完整时间">
  <template #top-cancel>
    <van-iconv name="left-arrow" icotype="only"> </van-iconv>
  </template>
  <template #title>
    <van-text text="顶部标题"></van-text>
  </template>
  <template #bottom-cancel>
    <van-button
      type="info_secondary"
      size="normal"
      text="取消"
      squareroud="round"
    ></van-button>
  </template>
  <template #bottom-confirm>
    <van-button
      type="info"
      size="normal"
      text="确认"
      squareroud="round"
    ></van-button>
  </template>
</van-datetime-picker>
```
