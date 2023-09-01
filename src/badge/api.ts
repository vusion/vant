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
            title: '徽章值',
            description: '徽章值',
        })
        content: nasl.core.Integer = 2;

        @Prop({
            title: '是否展示为小红点',
            description: '是否展示为小红点',
        })
        dot: nasl.core.Boolean = false;

        @Prop({
            title: '徽章最大值',
            description: '徽章最大值',
        })
        max: nasl.core.Integer;

        @Slot({
            title: 'undefined',
            description: '插入徽章内容',
        })
        slotDefault: () => Array<VueComponent>;
    }
}
