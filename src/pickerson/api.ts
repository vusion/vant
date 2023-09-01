/// <reference types="nasl" />

namespace nasl.ui {
    @Component({
        title: '选择器',
        icon: 'picker',
        description: '提供多个选项集合供用户选择，支持单列选择和多列级联。',
    })
    export class VanPickerson<T, V, M extends boolean, P extends boolean> extends VueComponent {

        constructor(options?: Partial<VanPickersonOptions<T, V, M, P>>) { super(); }
    }

    export class VanPickersonOptions<T, V, M extends boolean, P extends boolean> {
        @Prop({
            group: '数据属性',
            title: '值',
            description: '选中的值',
            syncMode: 'both',
        })
        pvalue: M extends true ? nasl.collection.List<V> : V;

        @Prop({
            group: '数据属性',
            title: '数据源',
            description: '列表的数据源。数组方式表示直接的数据，函数需要返回一个 Promise。',
            designerValue: [{}, {}, {}],
        })
        dataSource: P extends true ? { list: nasl.collection.List<T>; total: nasl.core.Integer } : nasl.collection.List<T>;

        @Prop({
            group: '数据属性',
            title: '数据类型',
            description: '表格每一行的数据类型',
        })
        dataSchema: T;

        @Prop({
            group: '数据属性',
            title: '值字段',
            description: '选项值的字段名',
        })
        valueField: (item: T) => nasl.core.String;

        @Prop({
            group: '数据属性',
            title: '文本字段',
            description: '选项文本的字段名',
        })
        textField: (item: T) => V;

        @Prop({
            group: '数据属性',
            title: '分页',
            description: '设置是否分页加载更多',
        })
        pageable: nasl.core.Boolean = false;

        @Prop<VanPickersonOptions<T, V, M, P>, 'pageSize'>({
            group: '数据属性',
            title: '默认每页条数',
            setter: {
                type: 'numberInput',
                min: 10,
            },
            if: _ => _.pageable === true,
        })
        pageSize: nasl.core.Decimal = 50;

        @Prop({
            group: '数据属性',
            title: '初始化排序规则',
            description: '设置数据初始化时的排序字段和顺序规则',
        })
        sorting: { field: nasl.core.String, order: nasl.core.String, compare?: Function } = {field:'undefined',order:'desc'};

        @Prop({
            group: '数据属性',
            title: '筛选',
            description: '设置是否可以筛选，开启将会支持搜索。',
        })
        filterable: nasl.core.Boolean = false;

        @Prop<VanPickersonOptions<T, V, M, P>, 'matchMethod'>({
            group: '数据属性',
            title: '匹配方法',
            description: '过滤时的匹配方法',
            setter: {
                type: 'enumSelect',
                titles: ['包括', '匹配开头', '匹配结尾'],
            },
            if: _ => _.filterable === true,
        })
        matchMethod: 'includes' | 'startsWith' | 'endsWith' = 'includes';

        @Prop({
            title: '初始加载',
            description: '是否在初始时立即加载',
        })
        initialLoad: nasl.core.Boolean = true;

        @Prop({
            title: '左侧标题',
            description: '左侧标题',
        })
        private labelField: nasl.core.String;

        @Prop({
            title: '数据源(一维数组)',
            description: '一个包含字符串或对象的数组',
        })
        private columnsprop: array;

        @Prop({
            title: '选项对象中，选项文字对应的键名',
            description: '选项对象中，选项文字对应的键名',
        })
        private valueKey: nasl.core.String = 'text';

        @Prop({
            title: '默认选中项的索引',
            description: '默认选中项的索引',
        })
        private defaultIndex: nasl.core.Decimal = 0;

        @Prop({
            title: '顶部栏标题',
            description: '顶部栏标题',
        })
        title: nasl.core.String = '标题';

        @Prop({
            title: '确认按钮文字',
            description: '确认按钮文字',
        })
        confirmButtonText: nasl.core.String = '确认';

        @Prop({
            title: '取消按钮文字',
            description: '取消按钮文字',
        })
        cancelButtonText: nasl.core.String = '取消';

        @Prop({
            title: '可见选项个数',
            description: '可见选项个数',
        })
        visibleItemCount: nasl.core.Decimal = 6;

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

        @Prop({
            title: '显示顶部栏',
            description: '是否显示顶部栏',
        })
        showToolbar: nasl.core.Boolean = true;

        @Event({
            title: '点击完成按钮时触发',
            description: '回调参数：选中值，选中值对应的索引',
        })
        onConfirm: () => void;

        @Event({
            title: '点击取消按钮时触发',
            description: '回调参数：选中值，选中值对应的索引',
        })
        onCancel: () => void;

        @Event({
            title: '选项改变时触发',
            description: '回调参数：Picker 实例，选中值，选中值对应的索引',
        })
        onChange: () => void;
    }
}
