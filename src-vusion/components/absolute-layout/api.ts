/// <reference types="@nasl/types" />

namespace nasl.ui {
    @Component({
        title: '自由布局',
        icon: 'absolute-layout',
        description: '拖拽内部元素到任意位置',
    })
    export class VanAbsoluteLayout extends ViewComponent {

        constructor(options?: Partial<VanAbsoluteLayoutOptions>) { super(); }
    }

    export class VanAbsoluteLayoutOptions {


        @Event({
            title: '点击后',
            description: '点击此项时触发',
        })
        onClick: () => void;

        @Slot({
            title: 'undefined',
            description: '内容',
        })
        slotDefault: () => Array<ViewComponent>;
    }
}
