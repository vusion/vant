<template>
  <demo-section>
    <demo-block card :title="t('basicUsage')">
      <div>pickerValue: {{ pickerValue }}</div>
      <van-pickerson
        :multiple="true"
        :enable-select-all="true"
        :enable-selected-count="false"
        type="list"
        ref="pickerson1"

        title="标题"
        :show-toolbar="true"
        labelField="左侧标题"
        input-align="left"
        :pvalue.sync="pickerValue"
        :data-source="load"
        :columnsprop="[1, 2, 3, 4]"
        :pageable="true"
        :pageSize="10"
        :filterable="true"
        @confirm="confirm111"
        @change="change111">
        <template #title ref="template24">
            <van-text ref="text19" text="标题"></van-text>
        </template>
      </van-pickerson>

      <van-pickerson
        :ref="`pickerson2`"
        title="标题"
        :show-toolbar="true"
        :data-source="[1, 2, 3, 4, 5]"
        :multiple="true"
        type="list"
        :enable-select-all="true"
        :enable-selected-count="true">
          <template #title :ref="`template15`">
                <van-text :ref="`text10`" text="标题"></van-text>
          </template>
      </van-pickerson>
    </demo-block>

    <demo-block card title="只读">
      <van-pickerson
        title="标题"
        :show-toolbar="true"
        :value="1"
        :data-source="[1, 2, 3, 4, 5]"
        type="list"
        :enable-select-all="true"
        :enable-selected-count="true"
        :readonly="true">
          <template #title>
                <van-text :ref="`text10`" text="标题"></van-text>
          </template>
      </van-pickerson>
    </demo-block>

    <demo-block card title="禁用">
      <van-pickerson
        title="标题"
        :show-toolbar="true"
        :value="1"
        :data-source="[1, 2, 3, 4, 5]"
        type="list"
        :enable-select-all="true"
        :enable-selected-count="true"
        :disabled="true">
          <template #title>
                <van-text :ref="`text10`" text="标题"></van-text>
          </template>
      </van-pickerson>
    </demo-block>

    <demo-block card title="临时测试">
        <van-pickerson
        title="标题"
        :show-toolbar="true"
        :value="1"
        :data-source="[1, 2, 3, 4, 5]"
        :close-on-click-overlay="true">
          <template #title>
                <van-text :ref="`text10`" text="标题"></van-text>
          </template>
      </van-pickerson>
    </demo-block>
  </demo-section>
</template>

<script>
import { dateColumns, cascadeColumns } from './data';

const data = [
  { 'text': '浙江省', 'value': '330000' },
  { 'text': '杭州市', 'value': '330100', 'parentId': '330000' },
  { 'text': '宁波市', 'value': '330200', 'parentId': '330000' },
  { 'text': '江苏省', 'value': '320000' },
  { 'text': '江苏省1', 'value': '320001' },
  { 'text': '江苏省2', 'value': '320002' },
  { 'text': '江苏省3', 'value': '320003' },
  { 'text': '江苏省4', 'value': '320004' },
  { 'text': '江苏省5', 'value': '320005' },
  { 'text': '江苏省6', 'value': '320006' },
  { 'text': '江苏省7', 'value': '320007' },
  { 'text': '江苏省8', 'value': '320008' },
  { 'text': '江苏省9', 'value': '320009' },
  { 'text': '江苏省14', 'value': '3200010' },
  { 'text': '江苏省24', 'value': '3201000' },
  { 'text': '江苏省34', 'value': '320000000' },
  { 'text': '江苏省44', 'value': '320100220' },
  { 'text': '江苏省54', 'value': '32011000' },
  { 'text': '江苏省64', 'value': '320111000' },
  { 'text': '江苏省74', 'value': '3210111000' },
  { 'text': '江苏省84', 'value': '3120000' },
  { 'text': '江苏省94', 'value': '32100010' },
  { 'text': '江苏省114', 'value': '31201000' },
  { 'text': '江苏省124', 'value': '32110111000' },
  { 'text': '江苏省134', 'value': '32001100' },
  { 'text': '江苏省144', 'value': '320110010' },
  { 'text': '江苏省154', 'value': '32001111100' },
]

export default {
  i18n: {
    'zh-CN': {
      city: '城市',
      cascade: '级联选择',
      withPopup: '搭配弹出层使用',
      chooseCity: '选择城市',
      showToolbar: '展示顶部栏',
      dateColumns: dateColumns['zh-CN'],
      defaultIndex: '默认选中项',
      disableOption: '禁用选项',
      cascadeColumns: cascadeColumns['zh-CN'],
      multipleColumns: '多列选择',
      setColumnValues: '动态设置选项',
      textColumns: JSON.stringify([
        '杭州',
        '宁波',
        '温州',
        '绍兴',
        '湖州',
        '嘉兴',
        '金华',
        '衢州',
      ]),
      disabledColumns: [
        { text: '杭州', disabled: true },
        { text: '宁波', value: 7777 },
        { text: '温州' },
      ],
      column3: {
        浙江: ['杭州', '宁波', '温州', '嘉兴', '湖州'],
        福建: ['福州', '厦门', '莆田', '三明', '泉州'],
      },
      toastContent: (value, index) => `当前值：${value}, 当前索引：${index}`,
    },
  },

  data() {
    return {
      son: '温州',
      showPicker: false,
      fieldValue: '',
      pupupd: true,

      pickerValue: undefined,
    };
  },

  computed: {
    columns() {
      const column = this.t('column3');
      return [
        {
          values: Object.keys(column),
          className: 'column1',
        },
        {
          values: column[Object.keys(column)[0]],
          className: 'column2',
          defaultIndex: 2,
        },
      ];
    },
  },

  methods: {
    onChange1(picker, value, index) {
      this.$toast(this.t('toastContent', value, index));
    },

    onChange2(picker, values) {
      picker.setColumnValues(1, this.t('column3')[values[0]]);
    },

    onConfirm(value, index) {
      this.$toast(this.t('toastContent', value, index));
    },

    onCancel() {
      this.$toast(this.t('cancel'));
    },

    onClickField() {
      this.showPicker = true;
    },

    onConfirm2(value) {
      this.showPicker = false;
      this.fieldValue = value;
    },
    onConfirm222(value) {
      console.log(value);
    },
    onCancel2() {
      this.showPicker = false;
    },
    confirm111(value, index) {
      console.log('pickerValue', this.pickerValue);
      console.log(`confirm 当前值：${value}, 当前索引：${index}`);
    },
    change111(picker, value, index) {
      console.log('pickerValue', this.pickerValue);
      console.log(`change 当前值：${value}, 当前索引：${index}`);
    },
    load(params) {
      console.log('load arguments:', arguments);
      const { page, size, filterText } = params;

      let arr = data.filter(item => item.text.includes(filterText))

      return {
        total: arr.length,
        list: arr.slice((page - 1) * size, page * size)
      }
    }
  },
};
</script>
