/// <reference types="nasl" />

namespace nasl.ui {
    @Component({
        title: '自由布局',
        icon: 'absolute-layout',
        description: '拖拽内部元素到任意位置',
    })
    export class VanAbsoluteLayout extends VueComponent {
        constructor(options?: Partial<VanAbsoluteLayoutOptions>) {
          super();
        }
    }

    export class VanAbsoluteLayoutOptions {
        @Event({
            title: '点击',
            description: '在元素上按下并释放任意鼠标按钮时触发。',
        })
        onClick: () => void;

        @Slot({
            title: 'undefined',
            description: '内容',
        })
        slotDefault: () => Array<VueComponent>;
    }
}
