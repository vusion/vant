/// <reference types="nasl" />

namespace nasl.ui {
    @Component({
        title: '开关',
        icon: 'switch',
        description: '开关',
    })
    export class VanSwitch extends ViewComponent {
        constructor(options?: Partial<VanSwitchOptions>) { super(); }
    }

    export class VanSwitchOptions {
        @Prop({
            group: '数据属性',
            title: '值',
            description: '用于标识开关的值',
            syncMode: 'both',
            setter: {
                type: 'switch',
            },
        })
        value: nasl.core.Boolean = false;

        @Prop({
            group: '状态属性',
            title: '禁用',
            description: '正常显示，但禁止选择/输入',
            setter: {
                type: 'switch',
            },
        })
        disabled: nasl.core.Boolean = false;

        @Prop({
            group: '状态属性',
            title: '只读',
            description: '置灰显示，且禁止任何交互（焦点、点击、选择、输入等）',
            setter: {
                type: 'switch',
            },
        })
        readonly: nasl.core.Boolean = false;

        @Event({
            title: '点击',
            description: '点击时触发',
        })
        onClick: (event: {
            stopPropagation: () => void,
            preventDefault: () => void,
        }) => void;

        @Event({
            title: '状态切换',
            description: '开关状态切换时触发',
        })
        onChange: (event: nasl.core.Boolean) => void;
    }
}
