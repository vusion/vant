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
            group: '数据属性',
            title: '数据源',
            description: '展示数据的输入源，可设置为数据集对象或者返回数据集的逻辑。',
            designerValue: [{}, {}, {}],
        })
        dataSource: nasl.collection.List<T>;

        @Prop({
            group: '数据属性',
            title: '数据类型',
            description: '数据源返回的数据结构的类型，自动识别类型进行展示说明。',
        })
        dataSchema: T;

        @Prop({
            group: '数据属性',
            title: '值',
            description: '用于标识多选组的值',
            syncMode: 'both',
        })
        value: nasl.collection.List<V>;

        @Prop({
            group: '数据属性',
            title: '最大可选数量',
            description: '最大可选数量(0为不限制)',
            setter: {
                type: 'numberInput',
                precision: 0,
            },
        })
        max: nasl.core.Integer;

        @Prop({
            group: '数据属性',
            title: '最小可选数量',
            description: '最小可选数量(0为不限制)',
            setter: {
                type: 'numberInput',
                precision: 0,
            },
        })
        min: nasl.core.Integer = 0;

        @Prop<VanCheckboxGroupOptions<T, V>, 'valueField'>({
            group: '数据属性',
            title: '值字段',
            description: '用于标识选中值的字段',
            setter: {
                type: 'propertySelect',
            },
        })
        valueField: (item: T) => V;

        @Prop({
            group: '主要属性',
            title: '排列方向',
            description: '设置多选组的排列方向',
            setter: {
                type: 'enumSelect',
                titles: ['水平', '垂直'],
            },
        })
        direction: 'horizontal' | 'vertical' = 'horizontal';

        @Prop<VanCheckboxGroupOptions<T, V>, 'column'>({
            group: '主要属性',
            title: '排列数',
            description: '水平排列时每行展示的选项数量',
            setter: {
                type: 'numberInput',
                precision: 0,
            },
            if: _ => _.direction === 'horizontal',
        })
        column: nasl.core.Integer;

        @Prop({
            group: '主要属性',
            title: '转换器',
            description: '将选中的值以选择的符号作为连接符，转为字符串格式；选择“json”则转为JSON字符串格式。',
            bindHide: true,
            setter: {
                type: 'enumSelect',
                titles: ["以','连接", "以'|'连接", "以';'连接", 'json', '无'],
            },
        })
        converter: 'join' | 'join:|' | 'join:;' | 'json' | 'none' = 'none';

        @Prop({
            group: '状态属性',
            title: '禁用',
            description: '正常显示，但禁止选择/输入',
            setter: {
                type: 'switch',
            },
        })
        disabled: nasl.core.Boolean = false;

        @Event({
            title: '值改变',
            description: '选择值改变时触发',
        })
        onChange: (event: { value: nasl.collection.List<V> }) => void;

        @Slot({
            title: 'undefined',
            description: '插入`<van-checkbox>`子组件。',
            emptyBackground: 'add-sub',
            snippets: [
                {
                    title: '多选项',
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
            group: '数据属性',
            title: '选中值',
            description: '当前选中的值',
        })
        label: V;

        @Prop({
            group: '主要属性',
            title: '形状',
            description: '选择多选项为方形或圆形',
            setter: {
                type: 'enumSelect',
                titles: ['方形', '圆形'],
            },
        })
        shape: 'square' | 'round' = 'square';

        @Prop({
            group: '主要属性',
            title: '文本位置',
            description: '设置文本居左或居右放置',
            setter: {
                type: 'enumSelect',
                titles: ['右', '左'],
            },
        })
        labelPosition: 'right' | 'lfet' = 'right';

        @Prop({
            group: '交互属性',
            title: '选中',
            description: '是否选中选项',
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
            title: '点击后',
            description: '点击某一项后触发',
        })
        onClick: (event: {
            stopPropagation: () => void,
            preventDefault: () => void,
        }) => void;
    }
}
