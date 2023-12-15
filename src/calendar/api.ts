/// <reference types="@nasl/types" />

namespace nasl.ui {
  @Component({
    title: '日期选择',
    icon: 'date-time-picker',
    description: '日历组件用于选择日期或日期区间',
    group: "Selector"
  })
  export class VanCalendar extends ViewComponent {
    constructor(options?: Partial<VanCalendarOptions>) {
      super();
    }
    @Method({
      title: '日期重置',
      description: '将选中的日期重置到指定日期，未传参时会重置到默认日期'
    })
    reset(): void {}
  }
  export class VanCalendarOptions {
    @Prop({
      title: '左侧标题',
      description: '左侧标题'
    })
    private labelField: nasl.core.String;
    @Prop({
      title: '类型',
      description: '选择类型',
      setter: {
        concept: "EnumSelectSetter",
        options: [{
          title: 'single'
        }, {
          title: 'multiple'
        }, {
          title: 'range'
        }]
      }
    })
    private type: 'single' | 'multiple' | 'range' = 'single';
    @Prop({
      title: '是否使用新版外观',
      description: '是否使用新版外观',
      setter: {
        concept: "SwitchSetter"
      }
    })
    isNew: nasl.core.Boolean = false;
    @Prop({
      group: '数据属性',
      title: '值',
      description: '用于标识日期选择的值',
      sync: true
    })
    value: nasl.core.String;
    @Prop({
      group: '数据属性',
      title: '最小日期',
      description: '最小日期，默认为一年前。'
    })
    minDate: nasl.core.String;
    @Prop({
      group: '数据属性',
      title: '最大日期',
      description: '最大日期，默认为一年后。'
    })
    maxDate: nasl.core.String;
    @Prop({
      group: '主要属性',
      title: '日历标题'
    })
    title: nasl.core.String = '选择日期';
    @Prop({
      group: '主要属性',
      title: '对齐方式',
      description: '设置右侧内容的对齐方式',
      setter: {
        concept: "EnumSelectSetter",
        options: [{
          title: '左'
        }, {
          title: '中'
        }, {
          title: '右'
        }]
      }
    })
    inputAlign: 'left' | 'center' | 'right' = 'left';
    @Prop({
      group: '交互属性',
      title: '点击遮罩层后关闭',
      setter: {
        concept: "SwitchSetter"
      }
    })
    closeOnClickOverlay: nasl.core.Boolean = false;
    @Prop({
      group: '状态属性',
      title: '只读',
      description: '正常显示，但禁止选择/输入',
      setter: {
        concept: "SwitchSetter"
      }
    })
    readonly: nasl.core.Boolean = false;
    @Prop({
      group: '状态属性',
      title: '禁用',
      description: '置灰显示，且禁止任何交互（焦点、点击、选择、输入等）',
      setter: {
        concept: "SwitchSetter"
      }
    })
    disabled: nasl.core.Boolean = false;
    @Event({
      title: '确认',
      description: '点击完成按钮时触发的事件'
    })
    onConfirm: (event: nasl.core.Date) => void;
    @Event({
      title: '点击',
      description: '点击并选中任意日期时触发'
    })
    onSelect: (event: nasl.core.Date) => void;
    @Event({
      title: '取消',
      description: '点击完成取消时触发的事件'
    })
    onCancel: () => void;
    @Slot({
      title: 'undefined',
      description: '插入`<van-picker-action-slot>`子组件',
      snippets: [{
        title: '事件插槽',
        code: '<van-picker-action-slot target-method="confirm"></van-picker-action-slot>'
      }]
    })
    slotDefault: () => Array<VanPickerActionSlot>;
  }
}