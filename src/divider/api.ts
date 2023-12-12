/// <reference types="nasl" />

namespace nasl.ui {
    @Component({
        title: '分隔线',
        icon: 'divider',
        description: '用于将内容分隔为多个区域',
    })
    export class VanDivider extends ViewComponent {
        constructor(options?: Partial<VanDividerOptions>) { super(); }
    }

    export class VanDividerOptions {
        @Prop({
            title: '内容位置',
            description: '设置内容位置',
            setter: {
                type: 'enumSelect',
                titles: ['居中', '左', '右'],
            },
        })
        contentPosition: 'center' | 'left' | 'right' = 'center';

        @Prop({
            title: '文本',
            description: '文本',
        })
        private title: nasl.core.String;

        @Prop({
            group: '主要属性',
            title: '线条类型',
            setter: {
                type: 'enumSelect',
                titles: ['虚线', '实线'],
            },
        })
        dashed: 'b' | 'a' = 'a';

        @Slot({
            title: '默认',
            description: '显示的文本',
        })
        private slotDefault: () => Array<ViewComponent>;
    }
}
