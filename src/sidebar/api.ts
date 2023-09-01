/// <reference types="nasl" />

namespace nasl.ui {
    @Component({
        title: '侧边导航',
        icon: 'sidebarh5',
        description: '侧边导航',
    })
    export class VanSidebar extends VueComponent {

        constructor(options?: Partial<VanSidebarOptions>) { super(); }
    }

    export class VanSidebarOptions {
        @Prop({
            title: '菜单值',
            description: '菜单值',
            syncMode: 'both',
        })
        value: nasl.core.String;

        @Prop({
            title: '是否开启路由模式',
            description: '是否开启路由模式',
        })
        route: nasl.core.Boolean = false;

        @Event({
            title: '切换导航时',
            description: '切换导航时',
        })
        onChange: () => void;

        @Slot({
            title: 'undefined',
            description: '插入`<van-sidebar-item>`子组件。',
            emptyBackground: 'add-sub',
            snippets: [
                {
                    title: '菜单项',
                    code: '<van-sidebar-item><template #title>标签名称n</template></van-sidebar-item>',
                },
            ],
        })
        slotDefault: () => Array<VanSidebarItem>;
    }

    @Component({
        title: '菜单项',
    })
    export class VanSidebarItem extends VueComponent {

        constructor(options?: Partial<VanSidebarItemOptions>) { super(); }
    }

    export class VanSidebarItemOptions {
        @Prop({
            title: '菜单项值',
            description: '菜单项值',
            syncMode: 'both',
        })
        value: nasl.core.String;

        @Prop({
            title: '标题',
            description: '标题',
        })
        private title: nasl.core.String = '标题';

        @Prop({
            title: '是否显示徽章',
            description: '是否显示徽章',
        })
        showbaget: nasl.core.Boolean = true;

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
            title: '禁用',
            description: '禁用',
        })
        disabled: nasl.core.Boolean = false;

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
            title: '点击菜单项',
            description: '点击选项导致 value 变化时触发',
        })
        onClick: () => void;
    }
}
