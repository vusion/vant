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
            title: '值',
            description: '值',
            syncMode: 'both',
        })
        defaultDate: nasl.core.String | Date | Array;

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
            title: '最小日期',
            description: '最小日期,默认为一年前',
        })
        minDate: Date | String;

        @Prop({
            title: '最大日期',
            description: '最大日期,默认为一年后',
        })
        maxDate: Date | String;

        @Prop({
            title: '日历标题',
        })
        title: nasl.core.String = '选择日期';

        @Prop({
            title: '只读',
        })
        readonly: nasl.core.Boolean = false;

        @Prop({
            title: '禁用',
            description: '是否禁用',
        })
        disabled: nasl.core.Boolean = false;

        @Prop({
            title: '右侧内容对齐方式',
            description: '右侧内容对齐方式',
            setter: {
                type: 'enumSelect',
                titles: ['左', '中', '右'],
            },
        })
        inputAlign: 'left' | 'center' | 'right' = 'left';

        @Prop({
            title: '点击遮罩层后关闭',
            description: '是否点击遮罩层后关闭',
        })
        closeOnClickOverlay: nasl.core.Boolean = false;

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
    }
}
