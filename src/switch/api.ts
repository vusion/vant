/// <reference types="nasl" />

namespace nasl.ui {
    @Component({
        title: '开关',
        icon: 'switch',
        description: '开关',
    })
    export class VanSwitch extends VueComponent {

        constructor(options?: Partial<VanSwitchOptions>) { super(); }
    }

    export class VanSwitchOptions {
        @Prop({
            title: '值',
            description: '开关状态',
            syncMode: 'both',
        })
        value: nasl.core.Boolean = false;

        @Prop({
            title: '禁用',
            description: '是否禁用',
        })
        disabled: nasl.core.Boolean = false;

        @Prop({
            title: '只读',
            description: '是否只读',
        })
        readonly: nasl.core.Boolean = false;

        @Event({
            title: '点击',
            description: '点击时触发',
        })
        onClick: () => void;

        @Event({
            title: '状态切换',
            description: '开关状态切换时触发',
        })
        onChange: () => void;
    }
}
