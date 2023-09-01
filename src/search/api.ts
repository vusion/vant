/// <reference types="nasl" />

namespace nasl.ui {
    @Component({
        title: '搜索框',
        icon: 'search',
        description: '内部元素按照一定的规则布局',
    })
    export class VanSearch extends VueComponent {

        constructor(options?: Partial<VanSearchOptions>) { super(); }
    }

    export class VanSearchOptions {
        @Prop({
            title: '值',
            description: '值',
            syncMode: 'both',
        })
        value: nasl.core.Any;

        @Prop({
            title: '占位提示文字',
            description: '占位提示文字',
        })
        placeholder: nasl.core.String;

        @Prop({
            title: '搜索框形状',
            description: '搜索框形状',
            setter: {
                type: 'enumSelect',
                titles: ['方形', '圆形'],
            },
        })
        shape: 'square' | 'round' = 'square';

        @Prop({
            title: '输入的最大字符数',
            description: '输入的最大字符数',
        })
        maxlength: nasl.core.String | nasl.core.Decimal;

        @Prop({
            title: '是否启用清除图标',
            description: '是否启用清除图标，点击清除图标后会清空输入框',
        })
        clearable: nasl.core.Boolean;

        @Prop({
            title: '显示清除图标',
            description: '显示清除图标',
            setter: {
                type: 'enumSelect',
                titles: ['一直显示', '输入框获取焦点且不为空时展示'],
            },
        })
        cleartrigger: 'always' | 'focus';

        @Prop({
            title: '按钮文字',
            description: '按钮文字',
        })
        private actiontext: nasl.core.String;

        @Prop({
            title: '只读',
            description: '只读',
        })
        readonly: nasl.core.Boolean;

        @Prop({
            title: '禁用',
            description: '禁用',
        })
        disabled: nasl.core.Boolean;

        @Prop({
            title: '内容对齐方式',
            description: '搜索框形状',
            setter: {
                type: 'enumSelect',
                titles: ['左对齐', '居中对齐', '右对齐'],
            },
        })
        inputAlign: 'left' | 'center' | 'right';

        @Prop({
            title: '搜索图标位置',
            description: '搜索图标位置',
            setter: {
                type: 'enumSelect',
                titles: ['左', '右'],
            },
        })
        iconalign: 'left' | 'right';

        @Event({
            title: '确定搜索时触发',
            description: '确定搜索时触发',
        })
        onSearch: () => void;

        @Event({
            title: '点击搜索图标时触发',
            description: '点击搜索图标时触发',
        })
        onIconsearch: () => void;

        @Event({
            title: '输入框内容变化时触发',
            description: '输入框内容变化时触发',
        })
        onInput: () => void;

        @Event({
            title: '输入框获得焦点时触发',
            description: '输入框获得焦点时触发',
        })
        onFocus: () => void;

        @Event({
            title: '输入框失去焦点时触发',
            description: '输入框失去焦点时触发',
        })
        onBlur: () => void;

        @Event({
            title: '点击输入区域时触发',
            description: '点击输入区域时触发',
        })
        onClickinput: () => void;

        @Event({
            title: '点击清除图标时触发',
            description: '点击清除图标时触发',
        })
        onClear: () => void;

        @Slot({
            title: 'undefined',
            description: '内容',
        })
        private slotDefault: () => Array<VueComponent>;
    }
}
