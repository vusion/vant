/// <reference types="nasl" />

namespace nasl.ui {
    @Component({
        title: '弹出框',
        icon: 'dialog',
        description: '弹出框，常用于消息提示、消息确认，或在当前页面内完成特定的交互操作。',
    })
    export class VanDialog extends VueComponent {
        constructor(options?: Partial<VanDialogOptions>) { super(); }

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

    export class VanDialogOptions {
        @Prop({
            title: '是否展示确认按钮',
            description: '是否展示确认按钮',
            setter: {
                type: 'switch',
            },
        })
        private showConfirmButton: nasl.core.Boolean = true;

        @Prop({
            title: '是否展示取消按钮',
            description: '是否展示取消按钮',
            setter: {
                type: 'switch',
            },
        })
        private showCancelButton: nasl.core.Boolean = true;

        @Prop({
            group: '主要属性',
            title: '展示弹框',
            syncMode: 'both',
            setter: {
                type: 'switch',
            },
        })
        value: nasl.core.Boolean = false;

        @Prop({
            group: '交互属性',
            title: '点击遮罩层后关闭',
            setter: {
                type: 'switch',
            },
        })
        closeOnClickOverlay: nasl.core.Boolean = false;

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
