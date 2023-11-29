/// <reference types="nasl" />

namespace nasl.ui {
    @Component({
        title: '折叠面板',
        icon: 'collapse',
        description: '将一组内容放置在多个折叠面板中，点击面板的标题可以展开或收缩其内容。',
    })
    export class VanCollapse extends VueComponent {
        constructor(options?: Partial<VanCollapseOptions>) { super(); }
    }

    export class VanCollapseOptions {
        @Prop({
            group: '数据属性',
            title: '值',
            description: '用于标识折叠面板的值',
            syncMode: 'both',
        })
        value: nasl.core.String;

        @Prop({
            group: '交互属性',
            title: '手风琴模式',
            description: '是否开启手风琴模式',
            setter: {
                type: 'switch',
            },
        })
        accordion: nasl.core.Boolean = false;

        @Event({
            title: '切换时',
            description: '切换时',
        })
        onChange: (name: nasl.core.String) => void;

        @Slot({
            title: 'undefined',
            description: '插入`<van-collapse-item>`子组件。',
            emptyBackground: 'add-sub-large',
            snippets: [
                {
                    title: '菜单项',
                    code: '<van-collapse-item><template #title>标签名称n</template></van-collapse-item>',
                },
            ],
        })
        slotDefault: () => Array<VanCollapseItem>;
    }

    @Component({
        title: '面板项',
    })
    export class VanCollapseItem extends VueComponent {
        @Method({
            title: '切换展开状态，传 true 为展开，false 为收起，不传参为切换',
            description: '切换展开状态，传 true 为展开，false 为收起，不传参为切换',
        })
        toggle(expanded?: nasl.core.Boolean): void {}
        constructor(options?: Partial<VanCollapseItemOptions>) { super(); }
    }

    export class VanCollapseItemOptions {
        @Prop({
            title: '标题',
            description: '标题',
        })
        private title: nasl.core.String;

        @Prop({
            group: '数据属性',
            title: '值',
            description: '用于标识面板项的值',
        })
        name: nasl.core.String;

        @Prop({
            group: '主要属性',
            title: '箭头图标',
            description: '是否显示箭头图标',
            setter: {
                type: 'switch',
            },
        })
        isLink: nasl.core.Boolean = true;

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
            title: '展开',
            description: '展开',
        })
        onOpen: () => void;

        @Event({
            title: '收起',
            description: '收起',
        })
        onClose: () => void;
    }
}
