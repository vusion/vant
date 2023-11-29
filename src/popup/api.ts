/// <reference types="nasl" />

namespace nasl.ui {
    @Component({
        title: '弹出层',
        icon: 'popuph5',
        description: '弹出层容器，用于展示弹窗、信息提示等内容，支持多个弹出层叠加展示。',
    })
    export class VanPopup extends VueComponent {
        constructor(options?: Partial<VanPopupOptions>) { super(); }

        @Method({
            title: 'undefined',
            description: '打开弹窗',
        })
        openModal(): void {}

        @Method({
            title: 'undefined',
            description: '关闭弹窗',
        })
        closeModal(): void {}

    }

    export class VanPopupOptions {
        @Prop({
            group: '主要属性',
            title: '展示弹层',
            syncMode: 'onlySync',
            setter: {
                type: 'switch',
            },
        })
        value: nasl.core.Boolean = false;

        @Prop({
            group: '主要属性',
            title: '弹出位置',
            description: '设置弹出位置',
            setter: {
                type: 'enumSelect',
                titles: ['上', '下', '右', '左'],
            },
        })
        position: 'top' | 'bottom' | 'right' | 'left' = 'bottom';

        @Prop({
            group: '交互属性',
            title: '点击遮罩层后关闭',
            setter: {
                type: 'switch',
            },
        })
        closeOnClickOverlay: nasl.core.Boolean = false;

        @Event({
            title: '点击弹出层',
            description: '点击弹出层时触发',
        })
        onClick: () => void;

        @Event({
            title: '点击遮罩层',
            description: '点击遮罩层时触发',
        })
        onClickOverlay: () => void;

        @Event({
            title: '打开弹出层后',
            description: '打开弹出层时触发',
        })
        onOpen: () => void;

        @Event({
            title: '关闭弹出层后',
            description: '关闭弹出层时触发',
        })
        onClose: () => void;

        @Slot({
            title: 'undefined',
            description: '内容自定义',
        })
        slotDefault: () => Array<VueComponent>;
    }
}
