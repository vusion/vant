/// <reference types="nasl" />

namespace nasl.ui {
    @Component({
        title: '时间选择',
        icon: 'time-picker',
        description: '时间选择，支持日期、年月、时分等维度',
    })
    export class VanDatetimePicker extends VueComponent {


        @Method({
            title: 'undefined',
            description: '打开',
        })
        open(): void {}

        @Method({
            title: 'undefined',
            description: '关闭',
        })
        close(): void {}
        constructor(options?: Partial<VanDatetimePickerOptions>) { super(); }
    }

    export class VanDatetimePickerOptions {
        @Prop({
            title: '左侧标题',
            description: '左侧文本插槽内容存在时优先展示插槽内容',
        })
        private labelField: nasl.core.String;

        @Prop({
            title: '时间类型',
            setter: {
                type: 'enumSelect',
                titles: ['时间选择', '日期选择', '年月选择器', '日期时间选择'],
            },
        })
        type: 'time' | 'date' | 'year-month' | 'datetime' = 'datetime';

        @Prop<VanDatetimePickerOptions, 'converter'>({
            title: '转换器',
            description: '转换绑定的值类型',
            setter: {
                type: 'enumSelect',
                titles: ['yyyy/MM/dd HH:mm:ss', 'Unix 时间戳', 'JSON', 'Date 对象'],
            },
            if: _ => _.type === 'datetime' || _.type === 'date' || _.type === 'year-month',
        })
        converter: 'format' | 'timestamp' | 'json' | 'date' = 'format';

        @Prop({
            title: '值',
            description: '开关状态',
            syncMode: 'both',
        })
        value: nasl.core.String | nasl.core.Decimal | Date;

        @Prop({
            title: '最小日期',
            description: '当时间选择类型为datetime时可选的最小时间，精确到分钟, 默认为十年前',
        })
        minDate: Date;

        @Prop({
            title: '最大日期',
            description: '当时间选择类型为datetime时可选的最大时间，精确到分钟, 默认为十年后',
        })
        maxDate: Date;

        @Prop({
            title: '最大小时',
            description: '当时间选择类型为 time 时',
        })
        maxHour: nasl.core.String | nasl.core.Decimal = 23;

        @Prop({
            title: '最小小时',
            description: '当时间选择类型为 time 时',
        })
        minHour: nasl.core.String | nasl.core.Decimal = 0;

        @Prop({
            title: '最大分钟',
            description: '当时间选择类型为 time 时',
        })
        maxMinute: nasl.core.String | nasl.core.Decimal = 59;

        @Prop({
            title: '最小分钟',
            description: '当时间选择类型为 time 时',
        })
        minMinute: nasl.core.String | nasl.core.Decimal = 0;

        @Prop({
            title: '自定义展示格式',
            description: '只用于页面上展示的格式，例如：yyyy年MM月dd日',
        })
        displayFormat: nasl.core.String;

        @Prop({
            title: '顶部栏标题',
            description: '左侧文本插槽内容存在时优先展示插槽内容',
        })
        title: nasl.core.String = '';

        @Prop({
            title: '只读',
            description: '是否只读',
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
    }
}
