/// <reference types="nasl" />

namespace nasl.ui {
    @Component({
        title: '数据网格',
        icon: 'grid-view',
        description: '数据网格',
    })
    export class VanGridView<T, V, P extends boolean, M extends boolean, C extends string> extends VueComponent {
        @Prop({
            title: '数据',
        })
        data: VanGridViewOptions<T, V, P, M, C>['dataSource'];

        @Method({
            title: 'undefined',
            description: '清除缓存，重新加载',
        })
        reload(): void {}
        constructor(options?: Partial<VanGridViewOptions<T, V, P, M, C>>) { super(); }
    }

    export class VanGridViewOptions<T, V, P extends boolean, M extends boolean, C extends string> {
        @Prop({
            group: '数据属性',
            title: '数据源',
            description: '数据网格的数据源，数据集对象或者返回数据集的逻辑',
            designerValue: [{}, {}, {}, {}, {}, {}, {}, {}],
        })
        dataSource: P extends true ? { list: nasl.collection.List<T>; total: nasl.core.Integer } : nasl.collection.List<T>;

        @Prop({
            group: '数据属性',
            title: '数据类型',
            description: '表格每一行的数据类型',
        })
        dataSchema: T;

        @Prop({
            group: '样式属性',
            title: '瀑布模式',
            description: '瀑布模式',
        })
        iffall: nasl.core.Boolean = false;

        @Prop({
            group: '数据属性',
            title: '初始加载',
            description: '是否在初始时立即加载',
        })
        initialLoad: nasl.core.Boolean = true;

        @Prop({
            group: '数据属性',
            title: '分页加载更多',
            description: '是否需要分页',
            setter: {
                type: 'enumSelect',
                titles: ['不分页', '滚动加载更多', '点击加载更多'],
            },
        })
        pageable: '' | 'auto-more' | 'load-more' = '';

        @Prop({
            group: '数据属性',
            title: '分页大小',
        })
        pageSize: nasl.core.Decimal = 20;

        @Prop({
            title: '下拉刷新',
            description: '是否开启下拉刷新',
        })
        pullRefresh: nasl.core.Boolean = true;

        @Prop({
            title: '下拉过程中提示文字',
        })
        pullingText: nasl.core.String = '下拉刷新';

        @Prop({
            title: '释放过程中提示文字',
        })
        loosingText: nasl.core.String = '释放刷新';

        @Prop({
            title: '刷新成功提示文字',
        })
        successText: nasl.core.String = '已刷新';

        @Prop({
            title: '刷新成功提示展示时长(ms)',
        })
        successDuration: nasl.core.Decimal = 500;

        @Prop({
            title: '触发下拉刷新的距离',
        })
        pullDistance: nasl.core.Decimal = 50;

        @Prop({
            group: '数据属性',
            title: '可筛选',
            description: '是否可以过滤（搜索），开启将会显示搜索框。',
        })
        filterable: nasl.core.Boolean = false;

        @Prop({
            group: '数据属性',
            title: '后端分页',
        })
        remotePaging: nasl.core.Boolean = false;

        @Prop({
            group: '数据属性',
            title: '后端筛选',
        })
        remoteFiltering: nasl.core.Boolean = false;

        @Prop({
            group: '数据属性',
            title: '匹配方法',
            description: '过滤时的匹配方法',
        })
        private matchMethod: nasl.core.String = 'includes';

        @Prop({
            group: '数据属性',
            title: '大小写敏感',
            description: '过滤时是否区分大小写',
        })
        private caseSensitive: nasl.core.String = 'includes';

        @Prop({
            group: '样式属性',
            title: '网格数',
            description: '每行排列几项',
        })
        col: nasl.core.Decimal = 2;

        @Prop({
            group: '状态属性',
            title: '加载中文字',
            description: '加载时的文字。使用分页加载时才会出现',
        })
        loadingText: nasl.core.String = '加载中...';

        @Prop({
            group: '状态属性',
            title: '是否加载失败',
            description: '手动设置是否加载失败。',
        })
        private error: nasl.core.Boolean;

        @Prop({
            group: '状态属性',
            title: '加载失败文字',
            description: '加载失败时的文字。',
        })
        errorText: nasl.core.String = '加载失败，请重试';

        @Prop({
            group: '状态属性',
            title: '暂无数据文字',
            description: '暂无数据时的文字。',
        })
        emptyText: nasl.core.String = '暂无数据';

        @Prop({
            title: '搜索框占位符',
            description: '搜索框为空时提示文本',
        })
        placeholder: nasl.core.String = '请输入';

        @Prop({
            title: '值',
            description: '当前选择的值',
            syncMode: 'both',
        })
        private value: M extends true ? (C extends '' ? nasl.collection.List<V> : nasl.core.String) : V;

        @Prop({
            title: '文本字段名',
            description: '选项文本的字段名',
        })
        private field: nasl.core.String = 'text';

        @Prop({
            title: '文本字段名',
            description: '选项文本的字段名',
        })
        private textField: (item: T) => nasl.core.String;

        @Prop({
            title: '值字段名',
            description: '选项值的字段名',
        })
        private valueField: (item: T) => V;

        @Prop({
            title: '可取消',
        })
        private cancelable: nasl.core.Boolean = false;

        @Prop({
            title: '可多选',
        })
        private multiple: M;

        @Prop({
            title: '筛选清除按钮',
            description: '搜索框是否有清除按钮',
        })
        private clearable: nasl.core.Boolean = false;

        @Prop({
            group: '状态属性',
            title: '只读',
        })
        private readonly: nasl.core.Boolean = false;

        @Prop({
            group: '状态属性',
            title: '禁用',
        })
        private disabled: nasl.core.Boolean = false;

        @Event({
            title: '加载后',
            description: '加载时触发',
        })
        onLoad: (event: nasl.ui.BaseEvent) => void;

        @Slot({
            title: 'undefined',
            description: '插入<van-cardu />',
            emptyBackground: 'drag-entity-here',
            snippets: [
                {
                    title: '卡片',
                    code: '<template #item="current"><van-cardu><template #head><van-text text="标题"></van-text></template><van-text  text="卡片内容"></van-text></van-cardu></template>',
                },
            ],
        })
        slotDefault: () => Array<VanCardu>;

        @Slot({
            title: 'undefined',
            description: '自定义选项的结构和样式',
        })
        slotItem: (current: Current<T>) => Array<VueComponent>;
    }
}
