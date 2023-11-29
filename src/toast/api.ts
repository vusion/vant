/// <reference types="nasl" />

namespace nasl.ui {
    @Component({
        title: '弹出消息',
        icon: 'toast',
        description: '在页面中间弹出黑色半透明提示，用于消息通知、加载提示、操作结果提示等场景。',
    })
    export class VanToast extends VueComponent {


        @Method({
            title: 'undefined',
            description: '打开弹出消息',
        })
        open(): void {}

        @Method({
            title: 'undefined',
            description: '关闭弹出消息',
        })
        close(): void {}
        constructor(options?: Partial<VanToastOptions>) { super(); }
    }

    export class VanToastOptions {
        @Prop({
            title: '是否展示',
            description: '是否展示弹出消息',
            syncMode: 'both',
            setter: {
                type: 'switch',
            },
        })
        private value: nasl.core.Boolean = false;

        @Prop({
            title: '提示内容',
            description: '默认提示内容',
        })
        message: nasl.core.String = '弹出消息';

        @Prop({
            title: '消息类型',
            description: '提示的类型',
            setter: {
                type: 'enumSelect',
                titles: ['成功', '警告', '失败', '加载中', '自定义'],
            },
        })
        type: 'success' | 'warning' | 'fail' | 'loading' | 'custom' = 'custom';

        @Prop<VanToastOptions, 'customIcon'>({
            title: '自定义图标',
            if: _ => _.type === 'custom',
        })
        customIcon: icon;

        @Prop({
            title: '停留时间',
            description: '自动关闭的延时，单位毫秒。设为 0 时不自动关闭',
            setter: {
                type: 'numberInput',
            },
        })
        duration: nasl.core.Decimal = 2000;

        @Prop({
            title: '位置',
            setter: {
                type: 'enumSelect',
                titles: ['顶部', '中间', '底部'],
            },
        })
        private position: 'top' | 'middle' | 'bottom' = 'middle';

        @Event({
            title: '打开弹出消息后',
            description: '打开弹出消息时触发',
        })
        onOpen: () => void;

        @Event({
            title: '关闭弹出消息后',
            description: '关闭弹出消息时触发',
        })
        onClose: () => void;
    }
}
