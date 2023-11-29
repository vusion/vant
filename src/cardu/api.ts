/// <reference types="nasl" />

namespace nasl.ui {
    @Component({
        title: '卡片',
        icon: 'card',
        description: '用于快速布局',
    })
    export class VanCardu extends VueComponent {
        constructor(options?: Partial<VanCarduOptions>) { super(); }
    }

    export class VanCarduOptions {
        @Prop({
            group: '交互属性',
            title: '链接类型',
            setter: {
                type: 'enumSelect',
                titles: ['页面跳转', '下载链接'],
            },
        })
        linkType: 'destination' | 'download' = 'destination';

        @Prop({
            group: '交互属性',
            title: '链接地址',
        })
        hrefAndTo: nasl.core.String;

        @Prop({
            group: '交互属性',
            title: '打开方式',
            description: '父级窗口和顶级窗口仅适用于iframe组件嵌套的情况，若不存在嵌套，则打开方式同当前窗口。',
            setter: {
                type: 'enumSelect',
                titles: ['新窗口', '当前窗口', '父级窗口', '顶级窗口'],
            },
        })
        target: '_blank' | '_self' | '_parent' | '_top' = '_self';

        @Prop({
            group: '样式属性',
            title: '宽度',
            description: '卡片宽度：像素或百分比',
        })
        private width: nasl.core.String;

        @Prop({
            group: '样式属性',
            title: '图片风格',
            setter: {
                type: 'enumSelect',
                titles: ['方角', '圆角'],
            },
        })
        sr: 's' | 'r' = 'r';

        @Prop({
            group: '样式属性',
            title: '卡片阴影',
            setter: {
                type: 'switch',
            },
        })
        shadow: nasl.core.Boolean = true;

        @Prop({
            group: '样式属性',
            title: '卡片边框',
            setter: {
                type: 'switch',
            },
        })
        border: nasl.core.Boolean = true;

        @Prop({
            group: '样式属性',
            title: '分割线',
            setter: {
                type: 'switch',
            },
        })
        split: nasl.core.Boolean = false;

        @Event({
            title: '点击后',
            description: '点击事件',
        })
        onClick: (event: MouseEvent) => void;

        @Slot({
            title: 'undefined',
            description: '插入默认的元素',
        })
        slotDefault: () => Array<VueComponent>;

        @Slot({
            title: 'undefined',
            description: '插入图片',
        })
        slotCover: () => Array<VueComponent>;
    }

    @Component({
        title: '卡片组',
        description: '卡片组',
    })
    class VanCarduGroup extends VueComponent {
        constructor(options?: Partial<VanCarduGroupOptions>) { super(); }
    }

    class VanCarduGroupOptions {
        @Prop({
            title: '标题',
            description: '卡片组的标题',
        })
        title: nasl.core.String;

        @Slot({
            title: 'undefined',
            description: '插入默认的元素',
        })
        slotDefault: () => Array<VueComponent>;

        @Slot({
            title: 'undefined',
            description: '插入图片',
        })
        slotCover: () => Array<VueComponent>;
    }
}
