/// <reference types="nasl" />

namespace nasl.ui {
    @Component({
        title: '滑动条',
        icon: 'swipe-cell',
        description: '滑动条',
    })
    export class VanSwipeCell extends VueComponent {


        @Method({
            title: '收起单元格侧边栏',
            description: '收起单元格侧边栏',
        })
        close(): void {}
        constructor(options?: Partial<VanSwipeCellOptions>) { super(); }
    }

    export class VanSwipeCellOptions {
        @Prop({
            title: '左侧滑动区域宽度',
            description: '左侧滑动区域宽度',
        })
        leftWidth: nasl.core.Decimal | 'auto' = 'auto';

        @Prop({
            title: '右侧滑动区域宽度',
            description: '右侧滑动区域宽度',
        })
        rightWidth: nasl.core.Decimal | 'auto' = 'auto';

        @Prop({
            title: '禁止滑动',
            description: '禁止滑动',
        })
        disabled: nasl.core.Boolean = false;

        @Event({
            title: '点击后',
            description: '点击后触发',
        })
        onClick: () => void;

        @Slot({
            title: 'undefined',
            description: '插入文本或 HTML。',
        })
        slotDefault: () => Array<VueComponent>;

        @Slot({
            title: 'undefined',
            description: '右侧。',
        })
        slotRight: () => Array<VueComponent>;

        @Slot({
            title: 'undefined',
            description: '左侧。',
        })
        slotLeft: () => Array<VueComponent>;
    }
}
