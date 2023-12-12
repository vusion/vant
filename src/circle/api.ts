/// <reference types="nasl" />

namespace nasl.ui {
    @Component({
        title: '环形进度条',
        icon: 'circular-progress',
        description: '圆环形的进度条组件',
    })
    export class VanCircle extends ViewComponent {
        constructor(options?: Partial<VanCircleOptions>) { super(); }
    }

    export class VanCircleOptions {
        @Prop({
            title: '文字',
        })
        private text: nasl.core.String;

        @Prop({
            group: '主要属性',
            title: '当前进度',
            syncMode: 'both',
            setter: {
                type: 'numberInput',
                min: 0,
            },
        })
        value: nasl.core.Decimal;

        @Prop({
            group: '交互属性',
            title: '顺时针增加',
            description: '是否按照顺时针顺序增加',
            setter: {
                type: 'switch',
            },
        })
        clockwise: nasl.core.Boolean = true;

        @Prop({
            group: '样式属性',
            title: '圆环直径',
            description: '设置圆环直径，单位为px。',
            setter: {
                type: 'numberInput',
            }
        })
        size: nasl.core.Decimal = 100;

        @Prop({
            group: '样式属性',
            title: '进度条颜色',
        })
        color: nasl.core.String;

        @Prop({
            group: '样式属性',
            title: '轨道颜色',
        })
        layerColor: nasl.core.String;

        @Prop({
            group: '样式属性',
            title: '填充颜色',
        })
        fill: nasl.core.String;

        @Prop({
            group: '样式属性',
            title: '进度条宽度',
            setter: {
                type: 'numberInput',
                min: 0,
            }
        })
        strokeWidth: nasl.core.Decimal = 40;

        @Slot({
            title: '默认',
            description: '显示的文本',
        })
        private slotDefault: () => Array<ViewComponent>;
    }
}
