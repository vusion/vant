/// <reference types="@nasl/types" />

namespace nasl.ui {
  @Component({
    title: '数字输入',
    icon: 'numberh5',
    description: '数字输入框'
  })
  export class VanStepperNew extends ViewComponent {
    constructor(options?: Partial<VanStepperNewOptions>) {
      super();
    }
  }
  export class VanStepperNewOptions {
    @Prop({
      group: '数据属性',
      title: '值',
      description: '用于标识数字输入的值',
      sync: true,
      setter: {
        concept: "NumberInputSetter"
      }
    })
    value: nasl.core.Decimal | nasl.core.Integer;
    @Prop({
      group: '数据属性',
      title: '最小值',
      setter: {
        concept: "NumberInputSetter"
      }
    })
    min: nasl.core.Decimal;
    @Prop({
      group: '数据属性',
      title: '最大值',
      setter: {
        concept: "NumberInputSetter"
      }
    })
    max: nasl.core.Decimal;
    @Prop({
      group: '数据属性',
      title: '精度',
      description: '固定显示的小数位数',
      setter: {
        concept: "NumberInputSetter",
        precision: 0,
        min: 0
      }
    })
    decimalLength: nasl.core.Integer;
    @Prop<VanStepperNewOptions, 'decimalPlaces'>({
      group: '主要属性',
      title: '小数位数',
      description: '控制数据展示时小数点后保留几位，仅影响展示，不影响数据实际存储的值。例如：小数位数为2，则数据展示时小数点后保留2位。',
      bindHide: true,
      if: _ => _.advancedFormat.enable === false
    })
    decimalPlaces: {
      places: nasl.core.Integer | nasl.core.String;
      omit: nasl.core.Boolean;
    } = {
      places: '',
      omit: true
    };
    @Prop<VanStepperNewOptions, 'thousandths'>({
      group: '主要属性',
      title: '千位符',
      bindHide: true,
      setter: {
        concept: "SwitchSetter"
      },
      if: _ => _.advancedFormat.enable === false
    })
    thousandths: nasl.core.Boolean = false;
    @Prop<VanStepperNewOptions, 'percentSign'>({
      group: '主要属性',
      title: '百分号',
      bindHide: true,
      setter: {
        concept: "SwitchSetter"
      },
      if: _ => _.advancedFormat.enable === false
    })
    percentSign: nasl.core.Boolean = false;
    @Prop({
      group: '主要属性',
      title: '单位',
      description: '输入框中显示的单位',
      bindHide: true
    })
    unit: {
      type: nasl.core.String;
      value: nasl.core.String;
    } = {
      type: 'prefix',
      value: ''
    };
    @Prop({
      group: '主要属性',
      title: '高级格式化',
      description: '用来控制数字的展示格式',
      bindHide: true
    })
    advancedFormat: {
      enable: nasl.core.Boolean;
      value: nasl.core.String;
    } = {
      enable: false,
      value: ''
    };
    @Prop({
      group: '主要属性',
      title: '占位符',
      description: '输入框为空的显示文字'
    })
    placeholder: nasl.core.String = '请输入';
    @Prop({
      group: '交互属性',
      title: '显示增加按钮',
      setter: {
        concept: "SwitchSetter"
      }
    })
    showPlus: nasl.core.Boolean = true;
    @Prop({
      group: '交互属性',
      title: '显示减少按钮',
      setter: {
        concept: "SwitchSetter"
      }
    })
    showMinus: nasl.core.Boolean = true;
    @Prop({
      group: '交互属性',
      title: '禁用增加按钮',
      setter: {
        concept: "SwitchSetter"
      }
    })
    disablePlus: nasl.core.Boolean = false;
    @Prop({
      group: '交互属性',
      title: '禁用减少按钮',
      setter: {
        concept: "SwitchSetter"
      }
    })
    disableMinus: nasl.core.Boolean = false;
    @Prop({
      group: '状态属性',
      title: '只读',
      description: '正常显示，但禁止选择/输入。',
      setter: {
        concept: "SwitchSetter"
      }
    })
    disableInput: nasl.core.Boolean = false;
    @Prop({
      group: '状态属性',
      title: '禁用',
      description: '置灰显示，且禁止任何交互（焦点、点击、选择、输入等）',
      setter: {
        concept: "SwitchSetter"
      }
    })
    disabled: nasl.core.Boolean = false;
    @Prop({
      group: '样式属性',
      title: '风格',
      setter: {
        concept: "EnumSelectSetter",
        options: [{
          title: '默认'
        }, {
          title: '圆角'
        }]
      }
    })
    theme: 'fang' | 'round' = 'fang';
    @Prop({
      group: '样式属性',
      title: '步长',
      description: '表示点击按钮或按上下键所增加或减少的量'
    })
    step: nasl.core.String | nasl.core.Decimal = 1;
    @Prop({
      group: '样式属性',
      title: '对齐方式',
      description: '设置对齐方式',
      setter: {
        concept: "EnumSelectSetter",
        options: [{
          title: '左对齐'
        }, {
          title: '居中对齐'
        }, {
          title: '右对齐'
        }]
      }
    })
    align: 'left' | 'center' | 'right' = 'center';
    @Event({
      title: '点击加减按钮',
      description: '点击加减按钮时触发'
    })
    onClick: () => void;
    @Event({
      title: '值改变',
      description: '值改变时触发'
    })
    onChange: (event: nasl.core.Decimal | nasl.core.Integer) => void;
  }
}