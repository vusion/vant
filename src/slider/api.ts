/// <reference types="nasl" />

namespace nasl.ui {
    @Component({
        title: '滑块',
        icon: 'slider',
        description: '滑动输入条，用于在给定的范围内选择一个值。',
    })
    export class VanSlider extends VueComponent {

        constructor(options?: Partial<VanSliderOptions>) { super(); }
    }

    export class VanSliderOptions {
        @Prop({
            title: '当前进度百分比',
            syncMode: 'both',
        })
        value: nasl.core.Decimal;

        @Prop({
            title: '最大值',
        })
        max: nasl.core.Decimal = 100;

        @Prop({
            title: '最小值',
        })
        min: nasl.core.Decimal = 0;

        @Prop({
            title: '步长',
        })
        step: nasl.core.Decimal | nasl.core.String = 0;

        @Prop({
            title: '进度条高度(px)',
        })
        barHeight: nasl.core.Decimal = 2;

        @Prop({
            title: '滑块按钮大小(px)',
        })
        buttonSize: nasl.core.Decimal = 24;

        @Prop({
            title: '进度条激活态颜色',
        })
        activeColor: nasl.core.String;

        @Prop({
            title: '进度条非激活态颜色',
        })
        inactiveColor: nasl.core.String;

        @Prop({
            title: '是否开启双滑块模式',
        })
        range: nasl.core.Boolean = false;

        @Prop({
            title: '是否禁用滑块',
        })
        disabled: nasl.core.Boolean = false;

        @Prop({
            title: '是否垂直展示',
        })
        vertical: nasl.core.Boolean = false;

        @Prop({
            title: '是否自定义组件',
        })
        custom: nasl.core.Boolean = false;

        @Event({
            title: '改变时',
            description: '进度变化时实时触发',
        })
        onInput: () => void;

        @Event({
            title: '改变后',
            description: '进度变化且结束拖动后触发',
        })
        onChange: () => void;

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
