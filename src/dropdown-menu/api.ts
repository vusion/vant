/// <reference types="nasl" />

namespace nasl.ui {
    @Component({
        title: '下拉菜单',
        icon: 'dropdown-menu',
        description: '向下弹出的菜单列表。',
    })
    export class VanDropdownMenu extends VueComponent {
      constructor(options?: Partial<VanDropdownMenuOptions>) {
        super();
      }
    }

    export class VanDropdownMenuOptions {
        @Prop({
            title: '菜单值',
            description: '菜单值',
            syncMode: 'both',
        })
        private value: nasl.core.String;

        @Prop({
            title: '菜单展开方向',
            description: '菜单展开方向',
            setter: {
                type: 'enumSelect',
                titles: ['上', '下'],
            },
        })
        direction: 'up' | 'down' = 'down';

        @Prop({
            title: '是否显示遮罩层',
            description: '是否显示遮罩层',
        })
        overlay: nasl.core.Boolean = true;

        @Prop({
            title: '是否点击遮罩层后关闭菜单',
            description: '是否点击遮罩层后关闭菜单',
        })
        closeOnClickOverlay: nasl.core.Boolean = true;

        @Prop({
            title: '是否开启路由模式',
            description: '是否开启路由模式',
        })
        private route: nasl.core.Boolean = false;

        @Slot({
            title: 'undefined',
            description: '插入`<van-dropdown-menu>`子组件。',
            emptyBackground: 'add-sub',
            snippets: [
                {
                    title: '菜单项',
                    code: '<van-dropdown-item title="标题"><van-dropdown-item-son clickable :isLink="false"><template #title>标题1</template></van-dropdown-item-son></van-dropdown-item>',
                },
            ],
        })
        slotDefault: () => Array<VanDropdownMenu>;
    }

    @Component({
        title: '菜单项',
    })
    export class VanDropdownItem extends VueComponent {
        constructor(options?: Partial<VanDropdownItemOptions>) {
          super();
        }

        @Method({
            title: 'undefined',
            description: '切换菜单展示状态',
        })
        toggle(show: nasl.core.Boolean, options?: { immediate: nasl.core.Boolean } ): void {}
    }

    export class VanDropdownItemOptions {
        @Prop({
            title: '菜单项值',
            description: '菜单项值',
            syncMode: 'both',
            group: '数据属性'
        })
        value: nasl.core.String;

        @Prop({
            title: '标题',
            description: '标题',
        })
        title: nasl.core.String = '标题';

        @Prop({
            title: '禁用',
            description: '禁用',
            group: '状态属性'
        })
        disabled: nasl.core.Boolean = false;

        @Prop({
            title: '是否通过点击菜单子项关闭',
            description: '是否通过点击菜单子项关闭',
            group: '交互属性'
        })
        shutself: nasl.core.Boolean = true;

        @Event({
            title: '点击选项导致 value 变化时触发',
            description: '点击选项导致 value 变化时触发',
        })
        onChange: (value: nasl.core.String) => void;

        @Event({
            title: '打开菜单栏时触发',
            description: '打开菜单栏时触发',
        })
        onOpen: () => void;

        @Event({
            title: '关闭菜单栏时触发',
            description: '关闭菜单栏时触发',
        })
        onClose: () => void;

        @Slot({
            title: 'undefined',
            description: '插入`<van-dropdown-item-son>`子组件。',
            emptyBackground: 'add-sub',
            snippets: [
                {
                    title: '菜单项',
                    code: '<van-dropdown-item-son clickable :isLink="false" notitle title="标题n"></van-dropdown-item-son>',
                },
            ],
        })
        slotDefault: () => Array<VanDropdownItemSon>;
    }

    @Component({
        title: '菜单子项',
    })
    export class VanDropdownItemSon extends VueComponent {
        constructor(options?: Partial<VanDropdownItemSonOptions>) {
          super();
        }
    }

    export class VanDropdownItemSonOptions {
        @Prop({
            title: '箭头',
            description: '是否展示箭头',
        })
        isLink: nasl.core.Boolean = true;

        @Prop({
            title: '箭头方向',
            description: '箭头得方向',
            setter: {
                type: 'enumSelect',
                titles: ['左', '上', '下', '右'],
            },
        })
        arrowDirection: 'left' | 'up' | 'down' | 'right' = 'right';

        @Prop({
            title: '垂直居中',
            description: '是否垂直居中',
        })
        center: nasl.core.Boolean = true;

        @Prop({
            title: '左侧文本',
            description: '左侧文本',
        })
        title: nasl.core.String;

        @Prop({
            title: '值',
            description: '值',
            group: '数据属性'
        })
        value: nasl.core.String;

        @Prop({
            title: '右侧文本',
            description: '右侧文本',
        })
        private rtitle: nasl.core.String;

        @Prop({
            title: '标题下方的描述信息',
            description: '标题下方的描述信息',
        })
        private label: nasl.core.String = '这是单元格';

        @Prop({
            title: '图标',
            description: '图标',
            setter: {
                type: 'iconSelect',
            },
        })
        icon: nasl.core.String = '';

        @Prop({
            title: '链接类型',
            description: '链接类型',
            group: '交互属性',
            setter: {
                type: 'enumSelect',
                titles: ['页面跳转', '下载链接'],
            },
        })
        linkType: 'destination' | 'download' = 'destination';

        @Prop({
            title: '链接',
            description: '链接地址',
            group: '交互属性',
        })
        hrefAndTo: nasl.core.String;

        @Prop({
            title: '打开方式',
            description: '父级窗口和顶级窗口仅适用于iframe组件嵌套的情况，若不存在嵌套，则打开方式同当前窗口。',
            group: '交互属性',
            setter: {
                type: 'enumSelect',
                titles: ['新窗口', '当前窗口', '父级窗口', '顶级窗口'],
            },
        })
        target: '_blank' | '_self' | '_parent' | '_top' = '_self';

        @Event({
            title: '点击后',
            description: '点击某一项后触发',
        })
        onClick: (event: nasl.ui.MouseEvent) => void;

        @Slot({
            title: 'undefined',
            description: '插入文本或 HTML。',
        })
        slotDefault: () => Array<VueComponent>;

        @Slot({
            title: 'undefined',
            description: '右侧图标。',
        })
        private slotRightIcon: () => Array<VueComponent>;
    }
}
