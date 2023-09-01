/// <reference types="nasl" />

namespace nasl.ui {
    @Component({
        title: '多选组',
        icon: 'checkboxes',
        description: '多项中选择一个或多个时使用',
    })
    export class VanCheckboxGroup<T, V> extends VueComponent {

        constructor(options?: Partial<VanCheckboxGroupOptions<T, V>>) { super(); }
    }

    export class VanCheckboxGroupOptions<T, V> {
        @Prop({
            title: '数据源',
            description: '集合类型变量或者输出参数为集合类型的逻辑',
            designerValue: [{}, {}, {}],
        })
        dataSource: nasl.collection.List<T>;

        @Prop({
            title: '数据类型',
            description: '集合类型每一元素的数据类型',
        })
        dataSchema: T;

        @Prop({
            title: '值',
            description: '当前选择的值',
            syncMode: 'both',
        })
        value: V;

        @Prop({
            title: '最大可选数',
            description: '最大可选数(0为不限制)',
        })
        max: nasl.core.Decimal;

        @Prop({
            title: '最小选择数量',
            description: '最小选择数量',
        })
        min: nasl.core.Decimal = 0;

        @Prop({
            title: '禁用',
            description: '是否禁用',
        })
        disabled: nasl.core.Boolean = false;

        @Prop({
            title: '排列方向',
            description: '是否禁用',
            setter: {
                type: 'enumSelect',
                titles: ['水平', '垂直'],
            },
        })
        direction: 'horizontal' | 'vertical' = 'horizontal';

        @Prop<VanCheckboxGroupOptions<T, V>, 'column'>({
            title: '每行排列数',
            description: '水平排列时每行展示的选项数量',
            if: _ => _.direction === 'horizontal',
        })
        column: nasl.core.Decimal;

        @Prop({
            title: '转换器',
            description: '将选中的值以选择的符号作为连接符，转为字符串格式；选择“json”则转为JSON字符串格式',
            bindHide: true,
            setter: {
                type: 'enumSelect',
                titles: ["以','连接", "以'|'连接", "以';'连接", 'json', '无'],
            },
        })
        converter: 'join' | 'join:|' | 'join:;' | 'json' | 'none' = 'none';

        @Event({
            title: '值改变',
            description: '选择值改变时触发',
        })
        onChange: () => void;

        @Slot({
            title: 'undefined',
            description: '插入`<van-checkbox>`子组件。',
            emptyBackground: 'add-sub',
            snippets: [
                {
                    title: '复选项',
                    code: '<van-checkbox name="n" shape="square"><van-text text="节点"></van-text></van-checkbox>',
                },
            ],
        })
        slotDefault: () => Array<VanCheckbox<V>>;

        @Slot({
            title: 'undefined',
            description: '自定义选项的结构和样式',
        })
        slotItem: (current: Current<T>) => Array<VueComponent>;
    }

    @Component({
        title: '多选项',
    })
    export class VanCheckbox<V> extends VueComponent {

        constructor(options?: Partial<VanCheckboxOptions<V>>) { super(); }
    }

    export class VanCheckboxOptions<V> {
        @Prop({
            title: '文本',
            description: '文本',
        })
        private title: nasl.core.String;

        @Prop({
            title: '选中的值',
            description: '选中的值',
        })
        name: V;

        @Prop({
            title: '是否选中',
            description: '是否选中',
            syncMode: 'both',
        })
        value: nasl.core.Boolean = false;

        @Prop({
            title: '形状',
            description: '形状',
            setter: {
                type: 'enumSelect',
                titles: ['方形', '圆形'],
            },
        })
        shape: 'square' | 'round' = 'square';

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

        @Prop({
            title: '文本位置',
            description: '是否禁用',
            setter: {
                type: 'enumSelect',
                titles: ['右', '左'],
            },
        })
        labelPosition: 'right' | 'lfet' = 'right';

        @Event({
            title: '点击后',
            description: '点击某一项后触发',
        })
        onClick: () => void;
    }
}
