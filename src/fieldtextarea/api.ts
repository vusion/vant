/// <reference types="nasl" />

namespace nasl.ui {
    @Component({
        title: '多行输入',
        icon: 'textarea',
        description: '多行输入组件',
    })
    export class VanFieldtextarea extends VueComponent {
        constructor(options?: Partial<VanFieldtextareaOptions>) { super(); }

        @Method({
            title: 'undefined',
            description: '让输入框获取焦点。',
        })
        focus(): void {}

        @Method({
            title: 'undefined',
            description: '让输入框失去焦点。',
        })
        blur(): void {}

        @Method({
            title: 'undefined',
            description: '清空输入框。',
        })
        clear(): void {}
    }

    export class VanFieldtextareaOptions {
        @Prop({
            title: '前缀图标',
            description: '前缀图标',
            setter: {
                type: 'enumSelect',
                titles: ['搜索', '暂无'],
            },
        })
        private prefix: 'search' | '' = '';

        @Prop({
            title: '后缀图标',
            description: '后缀图标',
            setter: {
                type: 'enumSelect',
                titles: ['搜索', '暂无'],
            },
        })
        private suffix: 'search' | '' = '';

        @Prop({
            group: '数据属性',
            title: '值',
            description: '用于标识多行输入的值',
            syncMode: 'both',
        })
        value: nasl.core.String;

        @Prop({
            group: '主要属性',
            title: '占位符',
            description: '输入框为空的显示文字',
        })
        placeholder: nasl.core.String;

        @Prop<VanFieldtextareaOptions, 'maxlength'>({
            group: '主要属性',
            title: '最大字符数',
            description: '输入框内可输入的最大字符数，超过时不支持输入。',
            setter: {
                type: 'numberInput',
                placeholder: '不限制',
            },
            onToggle: [
                {
                  update: {'show-word-limit':false},
                  if: _ => _ === 0
                },
            ],
        })
        maxlength: nasl.core.Integer;

        @Prop<VanFieldtextareaOptions, 'showWordLimit'>({
            group: '主要属性',
            title: '显示字数统计',
            description: '设置是否显示「可输入最大字符数」的字数统计',
            setter: {
                type: 'switch',
            },
            if: _ => _.maxlength > 0,
        })
        showWordLimit: nasl.core.Boolean;

        @Prop({
            group: '主要属性',
            title: '自适应内容高度',
            description: '可输入如{maxHeight:100,minHeight:50}，单位默认为px。',
            setter: {
                type: 'input',
                placeholder: '不设置则根据输入内容自适应',
            },
        })
        autosize: nasl.core.Boolean | { maxHeight: nasl.core.Integer, minHeight: nasl.core.Integer };

        @Prop({
            group: '交互属性',
            title: '可清除',
            description: '是否在输入框内展示清除按钮',
            setter: {
                type: 'switch',
            },
        })
        clearable: nasl.core.Boolean;

        @Prop({
            group: '状态属性',
            title: '只读',
            description: '正常显示，但禁止选择/输入',
            setter: {
                type: 'switch',
            },
        })
        readonly: nasl.core.Boolean = false;

        @Prop({
            group: '状态属性',
            title: '禁用',
            description: '置灰显示，且禁止任何交互（焦点、点击、选择、输入等）',
            setter: {
                type: 'switch',
            },
        })
        disabled: nasl.core.Boolean = false;

        @Event({
            title: '输入时',
            description: '输入时触发。',
        })
        onInput: (event: Event) => void;

        @Event({
            title: '改变后',
            description: '值变化时触发。（注意：与原生事件不同）',
        })
        onChange: (event: nasl.core.String) => void;

        @Event({
            title: '获得焦点',
            description: '获得焦点时触发。',
        })
        onFocus: (event: FocusEvent) => void;

        @Event({
            title: '失去焦点',
            description: '失去焦点时触发。',
        })
        onBlur: (event: FocusEvent) => void;

        @Event({
            title: '清空后',
            description: '清空后触发。',
        })
        onClear: () => void;
    }
}
