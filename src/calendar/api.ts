/// <reference types="nasl" />

namespace nasl.ui {
    @Component({
        title: '日期选择',
        icon: 'date-time-picker',
        description: '日历组件用于选择日期或日期区间',
    })
    export class VanCalendar extends VueComponent {


        @Method({
            title: '日期重置',
            description: '将选中的日期重置到指定日期，未传参时会重置到默认日期',
        })
        reset(): void {}
        constructor(options?: Partial<VanCalendarOptions>) { super(); }
    }

    export class VanCalendarOptions {
        @Prop({
            title: '左侧标题',
            description: '左侧标题',
        })
        private labelField: nasl.core.String;

        @Prop({
            title: '类型',
            description: '选择类型',
            setter: {
                type: 'enumSelect',
                titles: ['single', 'multiple', 'range'],
            },
        })
        private type: 'single' | 'multiple' | 'range' = 'single';

        @Prop({
            title: '是否使用新版外观',
            description: '是否使用新版外观',
            setter: {
                type: 'switch',
            },
        })
        isNew: nasl.core.Boolean = false;

        @Prop({
            group: '数据属性',
            title: '值',
            description: '用于标识日期选择的值',
            syncMode: 'both',
        })
        value: nasl.core.String, Date, Array;

        @Prop({
            group: '数据属性',
            title: '最小日期',
            description: '最小日期，默认为一年前。',
        })
        minDate: Date,String;

        @Prop({
            group: '数据属性',
            title: '最大日期',
            description: '最大日期，默认为一年后。',
        })
        maxDate: Date,String;

        @Prop({
            group: '主要属性',
            title: '日历标题',
        })
        title: nasl.core.String = '选择日期';

        @Prop({
            group: '主要属性',
            title: '对齐方式',
            description: '设置右侧内容的对齐方式',
            setter: {
                type: 'enumSelect',
                titles: ['左', '中', '右'],
            },
        })
        inputAlign: 'left' | 'center' | 'right' = 'left';

        @Prop({
            group: '交互属性',
            title: '点击遮罩层后关闭',
            setter: {
                type: 'switch',
            },
        })
        closeOnClickOverlay: nasl.core.Boolean = false;

        @Prop({
            group: '状态属性',
            title: '只读',
            description: '正常显示，但禁止选择/输入',
            setter: {
                type: 'switch',
            },
        })
        readonly: nasl.core.Boolean = false;

        @Prop({
            group: '状态属性',
            title: '禁用',
            description: '置灰显示，且禁止任何交互（焦点、点击、选择、输入等）',
            setter: {
                type: 'switch',
            },
        })
        disabled: nasl.core.Boolean = false;

        @Event({
            title: '确认',
            description: '点击完成按钮时触发的事件',
        })
        onConfirm: () => void;

        @Event({
            title: '点击',
            description: '点击并选中任意日期时触发',
        })
        onSelect: () => void;

        @Event({
            title: '取消',
            description: '点击完成取消时触发的事件',
        })
        onCancel: () => void;

        @Slot({
            title: 'undefined',
            description: '插入`<van-picker-action-slot>`子组件',
            snippets: [
                {
                    title: '事件插槽',
                    code: '<van-picker-action-slot target-method="confirm"></van-picker-action-slot>',
                },
            ],
        })
        slotDefault: () => Array<VanPickerActionSlot>;
    }
}
