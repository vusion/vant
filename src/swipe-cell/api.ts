/// <reference types="nasl" />

namespace nasl.ui {
    @Component({
        title: '滑动条',
        icon: 'swipe-cell',
        description: '滑动条',
    })
    export class VanSwipeCell extends VueComponent {
        constructor(options?: Partial<VanSwipeCellOptions>) { super(); }

        @Method({
            title: '收起单元格侧边栏',
            description: '收起单元格侧边栏',
        })
        close(position: nasl.core.String): void {}
    }

    export class VanSwipeCellOptions {
        @Prop({
            group: '主要属性',
            title: '左侧滑动区域宽度',
            setter: {
                type: 'numberInput',
            },
        })
        leftWidth: nasl.core.String;

        @Prop({
            group: '主要属性',
            title: '右侧滑动区域宽度',
            setter: {
                type: 'numberInput',
            },
        })
        rightWidth: nasl.core.String;

        @Prop({
            group: '交互属性',
            title: '禁止滑动',
            setter: {
                type: 'switch',
            },
        })
        disabled: nasl.core.Boolean = false;

        @Event({
            title: '点击',
            description: '点击后触发',
        })
        onClick: (position: nasl.core.String) => void;

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
