/// <reference types="nasl" />

namespace nasl.ui {
    @Component({
        title: '环形进度条',
        icon: 'circular-progress',
        description: '圆环形的进度条组件',
    })
    export class VanCircle extends VueComponent {

        constructor(options?: Partial<VanCircleOptions>) { super(); }
    }

    export class VanCircleOptions {
        @Prop({
            title: '当前进度',
            syncMode: 'both',
        })
        value: nasl.core.Decimal = 50;

        @Prop({
            title: '圆环直径(px)',
        })
        size: nasl.core.Decimal = 100;

        @Prop({
            title: '进度条颜色',
        })
        color: nasl.core.String;

        @Prop({
            title: '轨道颜色',
        })
        layerColor: nasl.core.String;

        @Prop({
            title: '填充颜色',
        })
        fill: nasl.core.String;

        @Prop({
            title: '文字',
        })
        private text: nasl.core.String;

        @Prop({
            title: '进度条宽度',
        })
        strokeWidth: nasl.core.Decimal | nasl.core.String = 40;

        @Prop({
            title: '是否顺时针增加',
            description: '是否顺时针增加',
        })
        clockwise: nasl.core.Boolean = true;

        @Slot({
            title: '默认',
            description: '显示的文本',
        })
        private slotDefault: () => Array<VueComponent>;
    }
}
