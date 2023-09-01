/// <reference types="nasl" />

namespace nasl.ui {
    @Component({
        title: '标签栏',
        icon: 'tabbar',
        description: '标签栏',
    })
    export class VanTabbar extends VueComponent {

        constructor(options?: Partial<VanTabbarOptions>) { super(); }
    }

    export class VanTabbarOptions {
        @Prop({
            title: '值',
            description: '值',
            syncMode: 'both',
        })
        value: nasl.core.String;

        @Prop({
            title: '是否固定在底部',
            description: '是否固定在底部',
        })
        fixed: nasl.core.Boolean = false;

        @Prop({
            title: '是否显示外边框',
            description: '是否显示外边框',
        })
        border: nasl.core.Boolean = true;

        @Prop({
            title: '是否开启路由模式',
            description: '是否开启路由模式',
        })
        route: nasl.core.Boolean = false;

        @Event({
            title: '切换后',
            description: '切换标签时触发',
        })
        onChange: () => void;

        @Slot({
            title: 'undefined',
            description: '插入`<van-tabbar-item>`子组件。',
            emptyBackground: 'add-sub',
            snippets: [
                {
                    title: '标签项',
                    code: '<van-tabbar-item icon="默认" style="font-size:24px"><van-text text="标签"></van-text></van-tabbar-item>',
                },
            ],
        })
        slotDefault: () => Array<VanTabbarItem>;
    }

    @Component({
        title: '标签项',
    })
    export class VanTabbarItem extends VueComponent {

        constructor(options?: Partial<VanTabbarItemOptions>) { super(); }
    }

    export class VanTabbarItemOptions {
        @Prop({
            title: '标签项值',
            description: '标签项值',
        })
        name: nasl.core.String;

        @Prop({
            title: '图标',
            description: '图标',
            setter: {
                type: 'iconSelect',
            },
        })
        icon: nasl.core.String = '';

        @Prop({
            title: '是否显示徽章',
            description: '是否显示徽章',
        })
        showbaget: nasl.core.Boolean = false;

        @Prop({
            title: '徽章值',
            description: '徽章值',
        })
        badge: nasl.core.Integer;

        @Prop({
            title: '徽章最大值',
            description: '徽章最大值',
        })
        badgemax: nasl.core.Integer;

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
            title: '点击标签项',
            description: '点击选项导致 value 变化时触发',
        })
        onClick: () => void;
    }
}
