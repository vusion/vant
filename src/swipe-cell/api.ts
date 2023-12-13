/// <reference types="@nasl/types" />

namespace nasl.ui {
    @Component({
        title: '滑动条',
        icon: 'swipe-cell',
        description: '滑动条',
    })
    export class VanSwipeCell extends ViewComponent {


        @Method({
            title: '收起单元格侧边栏',
            description: '收起单元格侧边栏',
        })
        close(): void {}
        constructor(options?: Partial<VanSwipeCellOptions>) { super(); }
    }

    export class VanSwipeCellOptions {
        @Prop({
            group: '主要属性',
            title: '左侧滑动区域宽度',
            setter: {
                concept: 'NumberInputSetter',
            },
        })
        leftWidth: nasl.core.Decimal;

        @Prop({
            group: '主要属性',
            title: '右侧滑动区域宽度',
            setter: {
                concept: 'NumberInputSetter',
            },
        })
        rightWidth: nasl.core.Decimal;

        @Prop({
            group: '交互属性',
            title: '禁止滑动',
            setter: {
                concept: 'SwitchSetter',
            },
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
        slotDefault: () => Array<ViewComponent>;

        @Slot({
            title: 'undefined',
            description: '右侧。',
        })
        slotRight: () => Array<ViewComponent>;

        @Slot({
            title: 'undefined',
            description: '左侧。',
        })
        slotLeft: () => Array<ViewComponent>;
    }
}
