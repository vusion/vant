### 基础用法

```html
<van-datetime-picker type="datetime" title="顶部标题">
  <template #title>
    <van-text text="顶部标题"></van-text>
  </template>
  <template #pannel-title>
    <van-text text="顶部标题"></van-text>
  </template>
  <template #top>
    <van-datetime-picker-action-slot
      :vusion-disabled-cut="true"
      :vusion-disabled-move="true"
      :vusion-disabled-drag="true"
      target-method="cancel"
    >
      <van-iconv name="left-arrow" icotype="only"> </van-iconv>
    </van-datetime-picker-action-slot>
    <van-datetime-picker-action-slot
      :vusion-disabled-cut="true"
      :vusion-disabled-move="true"
      :vusion-disabled-drag="true"
      target-method="confirm"
    >
    </van-datetime-picker-action-slot>
  </template>
  <template #bottom>
    <van-datetime-picker-action-slot
      :vusion-disabled-cut="true"
      :vusion-disabled-move="true"
      :vusion-disabled-drag="true"
      target-method="cancel"
    >
      <van-button
        type="info_secondary"
        size="normal"
        text="取消"
        squareroud="round"
      ></van-button>
    </van-datetime-picker-action-slot>
    <van-datetime-picker-action-slot
      :vusion-disabled-cut="true"
      :vusion-disabled-move="true"
      :vusion-disabled-drag="true"
      target-method="confirm"
    >
      <van-button
        type="info"
        size="normal"
        text="确认"
        squareroud="round"
      ></van-button>
    </van-datetime-picker-action-slot>
  </template>
</van-datetime-picker>
```
