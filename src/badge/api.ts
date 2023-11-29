/// <reference types="nasl" />

namespace nasl.ui {
    @Component({
        title: '徽标',
        icon: 'badge',
        description: '在右上角展示徽标数字或小红点。',
    })
    export class VanBadge extends VueComponent {

        constructor(options?: Partial<VanBadgeOptions>) { super(); }
    }

    export class VanBadgeOptions {
        @Prop({
            group: '数据属性',
            title: '徽章值',
            setter: {
              type: 'numberInput',
            },
        })
        content: nasl.core.Decimal = 2;

        @Prop({
            group: '数据属性',
            title: '徽章最大值',
            description: '徽章内容为数字时显示的最大值',
            setter: {
                type: 'numberInput',
            },
        })
        max: nasl.core.Decimal;

        @Prop({
            group: '主要属性',
            title: '显示徽章',
            setter: {
                type: 'switch',
            },
        })
        dot: nasl.core.Boolean = false;

        @Slot({
            title: 'undefined',
            description: '插入徽章内容',
        })
        slotDefault: () => Array<VueComponent>;
    }
}
