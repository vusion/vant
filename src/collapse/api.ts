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
            title: '值',
            description: '值',
            syncMode: 'both',
        })
        valueprop: nasl.core.String;

        @Prop({
            title: '是否开启手风琴模式',
            description: '是否开启手风琴模式',
        })
        accordion: nasl.core.Boolean = false;

        @Event({
            title: '切换时',
            description: '切换时',
        })
        onChange: () => void;

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
        toggle(): void {}
        constructor(options?: Partial<VanCollapseItemOptions>) { super(); }
    }

    export class VanCollapseItemOptions {
        @Prop({
            title: '值',
            description: '值',
        })
        name: nasl.core.String;

        @Prop({
            title: '标题',
            description: '标题',
        })
        private title: nasl.core.String;

        @Prop({
            title: '是否显示箭头图标',
            description: '是否显示箭头图标',
        })
        isLink: nasl.core.Boolean = true;

        @Prop({
            title: '是否禁用',
            description: '是否禁用',
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
