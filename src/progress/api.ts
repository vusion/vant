/// <reference types="nasl" />

namespace nasl.ui {
    @Component({
        title: '进度条',
        icon: 'linear-progress',
        description: '用于展示操作的当前进度。',
    })
    export class VanProgress extends VueComponent {

        constructor(options?: Partial<VanProgressOptions>) { super(); }
    }

    export class VanProgressOptions {
        @Prop({
            title: '进度百分比',
            syncMode: 'both',
        })
        percentage: nasl.core.Decimal;

        @Prop({
            title: '进度条粗细(px)',
        })
        strokeWidth: nasl.core.Decimal = 4;

        @Prop({
            title: '进度条颜色',
        })
        color: nasl.core.String;

        @Prop({
            title: '轨道颜色',
        })
        trackColor: nasl.core.String;

        @Prop({
            title: '进度文字颜色',
        })
        textColor: nasl.core.String;

        @Prop({
            title: '进度文字内容',
        })
        pivotText: nasl.core.String;

        @Prop({
            title: '进度文字背景色',
        })
        pivotColor: nasl.core.String;

        @Prop({
            title: '是否置灰',
        })
        inactive: nasl.core.Boolean = false;

        @Prop({
            title: '是否显示进度文字',
            description: '是否显示进度文字',
        })
        showPivot: nasl.core.Boolean = true;

        @Prop({
            title: '是否自定义',
            description: '是否自定义',
        })
        custom: nasl.core.Boolean = false;

        @Slot({
            title: '默认',
            description: '显示的文本',
        })
        private slotDefault: () => Array<VueComponent>;
    }
}
