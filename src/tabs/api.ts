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
            group: '数据属性',
            title: '值',
            description: '用于标识选项卡的值',
            syncMode: 'both',
        })
        value: nasl.core.String;

        @Prop({
            group: '主要属性',
            title: '样式类型',
            description: '设置选项卡为线条类型或胶囊类型',
            setter: {
                type: 'enumSelect',
                titles: ['线条', '胶囊'],
            },
        })
        type: 'line' | 'card' = 'line';

        @Prop({
            group: '主要属性',
            title: '自动吸顶',
            setter: {
                type: 'switch',
            },
        })
        sticky: nasl.core.Boolean = false;

        @Prop({
            group: '主要属性',
            title: '导航模式',
            description: '设置选项卡的导航模式',
            setter: {
                type: 'enumSelect',
                titles: ['切换导航', '滚动导航'],
            },
        })
        scrollspystr: 'no' | 'scrollspy' = 'no';

        @Prop({
            group: '交互属性',
            title: '滑动切换',
            setter: {
                type: 'switch',
            },
        })
        swipeable: nasl.core.Boolean = false;

        @Prop({
            group: '交互属性',
            title: '开启转场动画',
            setter: {
                type: 'switch',
            },
        })
        animated: nasl.core.Boolean = false;

        @Prop({
            group: '状态属性',
            title: '禁用',
            description: '置灰显示，且禁止任何交互（焦点、点击、选择、输入等）',
            setter: {
                type: 'switch',
            },
        })
        disabled: nasl.core.Boolean = false;

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
            title: '标题',
            description: '自定义标题',
        })
        private title: nasl.core.String = '标题';

        @Prop({
            group: '数据属性',
            title: '选项值',
            description: '用于标识选项的值',
        })
        name: nasl.core.String;

        @Prop({
            group: '数据属性',
            title: '显示徽章',
            setter: {
                type: 'switch',
            },
        })
        badgebtn: nasl.core.Boolean = false;

        @Prop({
            group: '数据属性',
            title: '徽章值',
        })
        badge: nasl.core.String, nasl.core.Decimal;

        @Prop({
            group: '数据属性',
            title: '徽章最大值',
            description: '徽章内容为数字时显示的最大值',
            setter: {
                type: 'numberInput',
            },
        })
        badgemax: nasl.core.Decimal;

        @Prop({
            group: '状态属性',
            title: '禁用',
            description: '置灰显示，且禁止任何交互（焦点、点击、选择、输入等）',
            setter: {
                type: 'switch',
            },
        })
        disabled: nasl.core.Boolean = false;

        @Slot({
            title: '默认',
            description: '显示的内容',
        })
        slotDefault: () => Array<VueComponent>;
    }
}
