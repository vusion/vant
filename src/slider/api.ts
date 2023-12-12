/// <reference types="nasl" />

namespace nasl.ui {
    @Component({
        title: '滑块',
        icon: 'slider',
        description: '滑动输入条，用于在给定的范围内选择一个值。',
    })
    export class VanSlider extends ViewComponent {
        constructor(options?: Partial<VanSliderOptions>) { super(); }
    }

    export class VanSliderOptions {
        @Prop({
            group: '数据属性',
            title: '值',
            description: '用于标识滑块的值',
            syncMode: 'both',
            setter: {
                type: 'numberInput',
            },
        })
        value: nasl.core.Decimal;

        @Prop({
            group: '数据属性',
            title: '最大值',
            setter: {
                type: 'numberInput',
            },
        })
        max: nasl.core.Decimal = 100;

        @Prop({
            group: '数据属性',
            title: '最小值',
            setter: {
                type: 'numberInput',
            },
        })
        min: nasl.core.Decimal = 0;

        @Prop({
            group: '主要属性',
            title: '双滑块模式',
            description: '是否开启双滑块模式',
            setter: {
                type: 'switch',
            },
        })
        range: nasl.core.Boolean = false;

        @Prop({
            group: '主要属性',
            title: '自定义组件',
            setter: {
                type: 'switch',
            },
        })
        custom: nasl.core.Boolean = false;

        @Prop({
            group: '交互属性',
            title: '禁用',
            description: '置灰显示，且禁止任何交互（焦点、点击、选择、输入等）',
            setter: {
                type: 'switch',
            },
        })
        disabled: nasl.core.Boolean = false;

        @Prop({
            group: '交互属性',
            title: '垂直展示',
            description: '是否垂直展示',
            setter: {
                type: 'switch',
            },
        })
        vertical: nasl.core.Boolean = false;

        @Prop({
            group: '样式属性',
            title: '步长',
        })
        step: nasl.core.Decimal | nasl.core.String = 0;

        @Prop({
            group: '样式属性',
            title: '进度条高度',
            description: '设置进度条高度，单位为px',
            setter: {
                type: 'numberInput',
            },
        })
        barHeight: nasl.core.Decimal = 2;

        @Prop({
            group: '样式属性',
            title: '滑块按钮大小',
            description: '设置滑块按钮大小，单位为px',
            setter: {
                type: 'numberInput',
            },
        })
        buttonSize: nasl.core.Decimal = 24;

        @Prop({
            group: '样式属性',
            title: '进度条激活态颜色',
        })
        activeColor: nasl.core.String;

        @Prop({
            group: '样式属性',
            title: '进度条非激活态颜色',
        })
        inactiveColor: nasl.core.String;

        @Event({
            title: '改变时',
            description: '进度变化时实时触发',
        })
        onInput: (event: nasl.core.Decimal) => void;

        @Event({
            title: '改变后',
            description: '进度变化且结束拖动后触发',
        })
        onChange: (event: nasl.core.Decimal) => void;

        @Event({
            title: '开始拖动时触发',
            description: '开始拖动时触发',
        })
        onDragStart: () => void;

        @Event({
            title: '结束拖动时触发',
            description: '结束拖动时触发',
        })
        onDragEnd: () => void;
    }
}
