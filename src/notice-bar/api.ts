/// <reference types="nasl" />

namespace nasl.ui {
    @Component({
        title: '通知栏',
        icon: 'notice-bar',
        description: '用于循环播放展示一组消息通知。',
    })
    export class VanNoticeBar extends VueComponent {

        constructor(options?: Partial<VanNoticeBarOptions>) { super(); }
    }

    export class VanNoticeBarOptions {
        @Prop({
            title: '通知栏模式',
            description: '通知栏模式',
            setter: {
                type: 'enumSelect',
                titles: ['可关闭', '链接', '普通'],
            },
        })
        mode: 'closeable' | 'link' | 'normal' = 'normal';

        @Prop({
            title: '通知文本内容',
            description: '通知文本内',
        })
        private text: nasl.core.String;

        @Prop({
            title: '是否开启滚动播放',
            description: '是否开启滚动播放',
        })
        scrollable: nasl.core.Boolean = true;

        @Prop({
            title: '是否开启文本换行',
            description: '是否开启文本换行（当关闭滚动播放时，该属性才生效）',
        })
        wrapable: nasl.core.Boolean = false;

        @Prop({
            title: '链接类型',
            description: '链接类型',
            setter: {
                type: 'enumSelect',
                titles: ['页面跳转', '下载链接'],
            },
        })
        linkType: 'destination' | 'download' = 'destination';

        @Prop({
            title: '链接',
            description: '链接地址',
        })
        hrefAndTo: nasl.core.String;

        @Prop({
            title: '打开方式',
            description: '父级窗口和顶级窗口仅适用于iframe组件嵌套的情况，若不存在嵌套，则打开方式同当前窗口。',
            setter: {
                type: 'enumSelect',
                titles: ['新窗口', '当前窗口', '父级窗口', '顶级窗口'],
            },
        })
        target: '_blank' | '_self' | '_parent' | '_top' = '_self';

        @Event({
            title: '点击通知栏时触发',
            description: '点击通知栏时触发',
        })
        onClick: () => void;

        @Event({
            title: '关闭通知栏时触发',
            description: '关闭通知栏时触发',
        })
        onClose: () => void;

        @Event({
            title: '点击链接',
            description: '点击链接',
        })
        onRout: () => void;

        @Slot({
            title: 'undefined',
            description: '文本插槽',
        })
        slotDefault: () => Array<VueComponent>;
    }
}
