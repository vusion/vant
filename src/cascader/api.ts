/// <reference types="nasl" />

namespace nasl.ui {
    @Component({
        title: '级联选择',
        icon: 'cascade-select',
        description: '级联选择框，用于多层级数据的选择，典型场景为省市区选择',
    })
    export class VanCascader extends VueComponent {

        constructor(options?: Partial<VanCascaderOptions>) { super(); }
    }

    export class VanCascaderOptions {
        @Prop({
            title: '值',
            description: '选中的值',
            syncMode: 'both',
        })
        value: nasl.core.String | nasl.core.Decimal = '';

        @Prop({
            title: '左侧标题',
            description: '左侧标题',
        })
        private labelField: nasl.core.String;

        @Prop({
            title: '数据源',
            description: '一个包含字符串或对象的数组',
        })
        dataSource: array;

        @Prop({
            title: '顶部栏标题',
            description: '顶部栏标题',
        })
        title: nasl.core.String = '标题';

        @Prop({
            title: '未选中时的提示文案',
            description: '未选中时的提示文案',
        })
        placeholder: nasl.core.String = '请选择';

        @Prop({
            title: '文本字段',
            description: '文本字段',
        })
        textField: nasl.core.String = 'text';

        @Prop({
            title: '值字段',
            description: '值字段',
        })
        valueField: nasl.core.String = 'value';

        @Prop({
            title: '树形模式',
            description: '将平铺数据转为树形结构数据',
        })
        treeDisplay: nasl.core.Boolean = false;

        @Prop({
            title: '父级字段',
            description: '父级字段',
        })
        parentField: nasl.core.String = 'parentId';

        @Prop({
            title: '子级字段',
            description: '子级字段',
        })
        childrenField: nasl.core.String = 'children';

        @Prop({
            title: '可筛选',
            description: '是否可以过滤（搜索），开启将会显示搜索框。',
        })
        filterable: nasl.core.Boolean = false;

        @Prop({
            title: '自定义 options 结构中的字段',
            description: '自定义 options 结构中的字段',
        })
        private fieldNamesp: nasl.core.String;

        @Prop({
            title: '右侧内容对齐方式',
            description: '右侧内容对齐方式',
            setter: {
                type: 'enumSelect',
                titles: ['左', '中', '右'],
            },
        })
        inputAlign: 'left' | 'center' | 'right' = 'left';

        @Prop({
            title: '点击遮罩层后关闭',
            description: '是否点击遮罩层后关闭',
        })
        closeOnClickOverlay: nasl.core.Boolean = false;

        @Event({
            title: '全部选项选择完成后触发',
            description: '全部选项选择完成后触发',
        })
        onFinish: () => void;

        @Event({
            title: '选中项变化时触发',
            description: '选中项变化时触发',
        })
        onChange: () => void;
    }
}
