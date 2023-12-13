/// <reference types="@nasl/types" />

namespace nasl.ui {
    @Component({
        title: '标签栏',
        icon: 'tabbar',
        description: '标签栏',
    })
    export class VanTabbar extends ViewComponent {

        constructor(options?: Partial<VanTabbarOptions>) { super(); }
    }

    export class VanTabbarOptions {
        @Prop({
            group: '数据属性',
            title: '值',
            description: '用于标识标签栏的值',
            sync: true,
        })
        value: nasl.core.String;

        @Prop({
            group: '主要属性',
            title: '固定底部',
            setter: {
                concept: 'SwitchSetter',
            },
        })
        fixed: nasl.core.Boolean = false;

        @Prop({
            group: '主要属性',
            title: '开启路由模式',
            description: '是否开启路由模式',
            setter: {
                concept: 'SwitchSetter',
            },
        })
        route: nasl.core.Boolean = false;

        @Prop({
            group: '样式属性',
            title: '显示外边框',
            setter: {
                concept: 'SwitchSetter',
            },
        })
        border: nasl.core.Boolean = true;

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
    export class VanTabbarItem extends ViewComponent {

        constructor(options?: Partial<VanTabbarItemOptions>) { super(); }
    }

    export class VanTabbarItemOptions {
        @Prop({
            group: '数据属性',
            title: '标签项值',
            description: '用于标识标签项的值',
        })
        name: nasl.core.Decimal,nasl.core.String;

        @Prop({
            group: '数据属性',
            title: '显示徽章',
            description: '是否显示徽章',
            setter: {
                concept: 'SwitchSetter',
            },
        })
        showbaget: nasl.core.Boolean = false;

        @Prop({
            group: '数据属性',
            title: '徽章值',
        })
        badge: nasl.core.String, nasl.core.Decimal = '';

        @Prop({
            group: '数据属性',
            title: '徽章最大值',
            setter: {
                concept: 'NumberInputSetter',
            },
        })
        badgemax: nasl.core.Decimal;

        @Prop({
            group: '主要属性',
            title: '图标',
            description: '标签项的图标',
        })
        icon: icon = '';

        @Prop({
            group: '交互属性',
            title: '链接类型',
            setter: {
                concept: 'EnumSelectSetter',
                options: [{ title: '页面跳转' }, { title: '下载链接' }],
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
                concept: 'EnumSelectSetter',
                options: [{ title: '新窗口' }, { title: '当前窗口' }, { title: '父级窗口' }, { title: '顶级窗口' }],
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
