/// <reference types="nasl" />

namespace nasl.ui {
    @Component({
        title: '选项卡',
        icon: 'tabsh5',
        description: '选项卡切换组件，常用于平级区域大块内容的收纳和展现',
    })
    export class VanTabs extends VueComponent {

        constructor(options?: Partial<VanTabsOptions>) { super(); }
    }

    export class VanTabsOptions {
        @Prop({
            title: '值',
            description: '选中标签页的值。',
            syncMode: 'both',
        })
        active: nasl.core.String;

        @Prop({
            title: '禁用',
            description: '是否禁用。',
        })
        disabled: nasl.core.Boolean = false;

        @Prop({
            title: '展示外观',
            description: '选项卡样式风格',
            setter: {
                type: 'enumSelect',
                titles: ['线条', '胶囊'],
            },
        })
        type: 'line' | 'card' = 'line';

        @Prop({
            title: '自动吸顶',
            description: '是否自动吸顶',
        })
        sticky: nasl.core.Boolean = false;

        @Prop({
            title: '滑动切换',
            description: '是否滑动切换',
        })
        swipeable: nasl.core.Boolean = false;

        @Prop({
            title: '导航模式',
            description: '导航模式',
            setter: {
                type: 'enumSelect',
                titles: ['切换导航', '滚动导航'],
            },
        })
        scrollspystr: 'no' | 'scrollspy' = 'no';

        @Prop({
            title: '切换动画',
            description: '是否开启转场动画',
        })
        animated: nasl.core.Boolean = false;

        @Event({
            title: '点击标签',
            description: '点击标签时触发',
        })
        onClick: () => void;

        @Event({
            title: '标签改变',
            description: '当前激活的标签改变时触发',
        })
        onChange: () => void;

        @Slot({
            title: '默认',
            description: '插入`<van-tab>`子组件。',
            emptyBackground: 'add-sub',
            snippets: [
                {
                    title: '子选项',
                    code: '<van-tab title="标签页">内容</van-tab>',
                },
            ],
        })
        slotDefault: () => Array<VanTab>;
    }

    @Component({
        title: '标签页',
    })
    export class VanTab extends VueComponent {

        constructor(options?: Partial<VanTabOptions>) { super(); }
    }

    export class VanTabOptions {
        @Prop({
            title: '值',
            description: '标签页的值',
        })
        name: nasl.core.String;

        @Prop({
            title: '标题',
            description: '自定义标题',
        })
        private title: nasl.core.String = '标题';

        @Prop({
            title: '禁用',
            description: '是否禁用',
        })
        disabled: nasl.core.Boolean = false;

        @Prop({
            title: '徽章',
            description: '是否显示徽章',
        })
        badgebtn: nasl.core.Boolean = false;

        @Prop({
            title: '徽章值',
            description: '徽章的内容',
        })
        badge: nasl.core.String | nasl.core.Decimal;

        @Prop({
            title: '最大值',
            description: '徽章内容为数字时显示的最大值',
        })
        badgemax: nasl.core.Decimal;

        @Slot({
            title: '默认',
            description: '显示的内容',
        })
        slotDefault: () => Array<VueComponent>;
    }
}
