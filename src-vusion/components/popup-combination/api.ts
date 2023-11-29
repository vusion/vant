/// <reference types="nasl" />

namespace nasl.ui {
    @Component({
        title: '气泡弹出框',
        icon: 'popup',
        description: '点击，弹出气泡式的卡片浮层。',
    })
    export class VanPopupCombination extends VueComponent {


        @Method({
            title: 'undefined',
            description: '弹出实例。',
        })
        open(): void {}

        @Method({
            title: 'undefined',
            description: '关闭实例。',
        })
        close(): void {}

        @Method({
            title: 'undefined',
            description: '切换弹出/关闭状态。',
        })
        toggle(
            @Param({
                title: 'undefined',
                description: '可选。弹出/关闭状态',
            })
            opened?: nasl.core.Boolean,
        ): void {}

        @Method({
            title: 'undefined',
            description: '更新 popper 实例。参考 [Popper.update()](https://popper.js.org/popper-documentation.html#Popper.update)。',
        })
        update(): void {}

        @Method({
            title: 'undefined',
            description: '在下次 UI 渲染时一块更新 popper 实例，比`update()`性能要好。参考 [Popper.scheduleUpdate()](https://popper.js.org/popper-documentation.html#Popper.scheduleUpdate)。',
        })
        scheduleUpdate(): void {}
        constructor(options?: Partial<VanPopupCombinationOptions>) { super(); }
    }

    export class VanPopupCombinationOptions {
        @Prop({
            title: '触发方式',
            description: '弹出框的触发方式',
            setter: {
                type: 'enumSelect',
                titles: ['点击', '悬浮', '右击', '双击', '手动'],
            },
        })
        private trigger: 'click' | 'hover' | 'right-click' | 'double-click' | 'manual' = 'click';

        @Prop({
            title: '弹出层偏移',
            description: `弹出层偏移，如：'10', '10px 10px', '10% 10%', 第一个值表示水平偏移，第二个值表示垂直位移, 默认单位是`px``,
        })
        private offset: nasl.core.String = '0';

        @Prop({
            title: '跟随鼠标',
            description: '是否跟随鼠标',
            setter: {
                type: 'switch',
            },
        })
        private followCursor: nasl.core.Boolean = false;

        @Prop({
            title: '合并边框',
            description: '是否自动合并内外边框',
            setter: {
                type: 'switch',
            },
        })
        private mergeBorders: nasl.core.Boolean = true;

        @Prop({
            group: '主要属性',
            title: '标题',
        })
        title: nasl.core.String;

        @Prop({
            group: '主要属性',
            title: '弹出状态',
            description: '弹出状态分为“True(弹出)/False(关闭)”，默认为“弹出”',
            syncMode: 'onlySync',
            setter: {
                type: 'switch',
            },
        })
        opened: nasl.core.Boolean = false;

        @Prop({
            group: '主要属性',
            title: '弹出位置',
            description: '设置弹出位置',
            setter: {
                type: 'enumSelect',
                titles: ['上', '下', '左', '右'],
            },
        })
        placement: 'top' | 'bottom' | 'left' | 'right' = 'bottom';

        @Prop({
            group: '主要属性',
            title: '消失延迟时间',
            description: '当触发方式为“悬浮”时，提示内容消失延迟时间，单位为ms。',
            setter: {
                type: 'numberInput',
            },
        })
        hideDelay: nasl.core.Decimal = 200;

        @Prop({
            group: '主要属性',
            title: '展示方式',
            description: '设置展示方式',
            setter: {
                type: 'enumSelect',
                titles: ['行内展示', '块级展示，宽度会充满父元素'],
            },
        })
        display: 'inline' | 'block' = 'inline';

        @Prop({
            group: '主要属性',
            title: '省略显示',
            description: '文字过长时是否省略显示',
            setter: {
                type: 'switch',
            },
        })
        private ellipsis: nasl.core.Boolean = false;

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
            title: '弹出前',
            description: '弹出前触发。',
        })
        private onBeforeOpen: (event: EventTarget) => void;

        @Event({
            title: '弹出时',
            description: '弹出时触发。',
        })
        onOpen: (event: nasl.ui.BaseEvent) => void;

        @Event({
            title: '隐藏前',
            description: '隐藏前触发。',
        })
        private onBeforeClose: (event: EventTarget) => void;

        @Event({
            title: '隐藏后',
            description: '隐藏时触发。',
        })
        onClose: (event: nasl.ui.BaseEvent) => void;

        @Event({
            title: '展开折叠前',
            description: '@deprecated',
        })
        private onBeforeToggle: () => void;

        @Event({
            title: '展开折叠后',
            description: '@deprecated',
        })
        private onToggle: () => void;

        @Slot({
            title: 'undefined',
            description: '自定义弹出的内容。',
        })
        slotDefault: () => Array<VueComponent>;

        @Slot({
            title: 'undefined',
            description: '弹出层触发节点。',
        })
        slotReference: () => Array<VueComponent>;
    }
}
