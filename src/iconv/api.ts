/// <reference types="nasl" />

namespace nasl.ui {
    @Component({
        title: '图标',
        icon: 'icon',
        description: '图标',
    })
    export class VanIconv extends VueComponent {

        constructor(options?: Partial<VanIconvOptions>) { super(); }
    }

    export class VanIconvOptions {
        @Prop({
            group: '主要属性',
            title: '图标',
        })
        name: icon = '';

        @Prop({
            group: '主要属性',
            title: '布局类型',
            description: '设置图标布局类型',
            setter: {
                type: 'enumSelect',
                titles: ['仅图标', '组合图标-上下', '组合图标-左右'],
            },
        })
        icotype: 'only' | 'top' | 'left' = 'top';

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

        @Event({
            title: '点击后',
            description: '点击此项时触发',
        })
        onClick: () => void;

        @Slot({
            title: 'undefined',
            description: '插入文本或HTML',
        })
        private slotDefault: () => Array<VueComponent>;
    }
}
