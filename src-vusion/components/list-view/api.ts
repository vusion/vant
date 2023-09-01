/// <reference types="nasl" />

namespace nasl.ui {
    @Component({
        title: '数据列表',
        icon: 'list-view',
        description: '用于列举大量数据的列表框，支持单选、多选、过滤（搜索）、分页等功能。',
    })
    export class VanListView<T, V, P extends boolean, M extends boolean, C extends string> extends VueComponent {
        @Prop({
            title: '数据',
        })
        data: VanListViewOptions<T, V, P, M, C>['dataSource'];

        @Method({
            title: 'undefined',
            description: '清除缓存，重新加载',
        })
        reload(): void {}
        constructor(options?: Partial<VanListViewOptions<T, V, P, M, C>>) { super(); }
    }

    export class VanListViewOptions<T, V, P extends boolean, M extends boolean, C extends string> {
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
            group: '状态属性',
            title: '初始加载',
            description: '是否在初始时立即加载',
        })
        initialLoad: nasl.core.Boolean = true;

        @Prop({
            group: '状态属性',
            title: '加载状态设置',
            description: '设置不同加载状态的展示内容',
            bindHide: true,
            setter: {
                type: 'enumSelect',
                titles: ['加载完成-有数据', '加载完成-暂无数据', '加载中', '加载失败'],
            },
        })
        designerMode: 'success' | 'empty' | 'loading' | 'error' = 'success';

        @Prop<VanListViewOptions<T, V, P, M, C>, 'loadingText'>({
            group: '状态属性',
            title: '加载中文案',
            description: '加载中状态显示的文案',
            docDescription: '当数据正在加载时展示的文字，默认为"加载中..."。',
            if: _ => _.designerMode === 'loading',
        })
        loadingText: nasl.core.String = '正在加载中...';

        @Prop<VanListViewOptions<T, V, P, M, C>, 'loading'>({
            group: '状态属性',
            title: '加载中触发条件',
            description: '加载中状态的触发条件，未设置则默认为系统定义条件',
            bindOpen: true,
            if: _ => _.designerMode === 'loading',
        })
        loading: nasl.core.Boolean;

        @Prop<VanListViewOptions<T, V, P, M, C>, 'errorText'>({
            group: '状态属性',
            title: '加载失败文案',
            description: '加载失败状态显示的提示文案',
            docDescription: '加载失败的提示文字。默认"加载失败，请重试"',
            if: _ => _.designerMode === 'error',
        })
        errorText: nasl.core.String = '加载失败，请重试';

        @Prop<VanListViewOptions<T, V, P, M, C>, 'error'>({
            group: '状态属性',
            title: '加载失败触发条件',
            description: '加载失败状态的触发条件，未设置则默认为系统定义条件',
            docDescription: '控制表格加载失败的展示时机。默认关闭。',
            bindOpen: true,
            if: _ => _.designerMode === 'error',
        })
        error: nasl.core.Boolean;

        @Prop<VanListViewOptions<T, V, P, M, C>, 'emptyText'>({
            group: '状态属性',
            title: '暂无数据文案',
            description: '暂无数据状态显示的提示文案',
            docDescription: '当列表为空时的提示文字。默认"暂无数据"',
            if: _ => _.designerMode === 'empty',
        })
        emptyText: nasl.core.String = '暂无数据';

        @Prop({
            title: '只读',
            description: '是否只读',
        })
        private readonly: nasl.core.Boolean = false;

        @Prop({
            title: '禁用',
            description: '是否禁用',
        })
        private disabled: nasl.core.Boolean = false;

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
        private textField: (item: T) => nasl.core.String;

        @Prop({
            title: '值字段名',
            description: '选项值的字段名',
        })
        private valueField: (item: T) => V;

        @Prop({
            title: '可取消',
            description: '是否可以取消选择',
        })
        private cancelable: nasl.core.Boolean = false;

        @Prop({
            group: '交互属性',
            title: '可选择',
            description: '是否可以选择',
        })
        private selectable: nasl.core.Boolean = true;

        @Prop({
            group: '交互属性',
            title: '可多选',
            description: '设置是否可以多选行，不开启则为单选',
        })
        multiple: M = false;

        @Prop<VanListViewOptions<T, V, P, M, C>, 'selectedIcon'>({
            group: '交互属性',
            title: '已选图标',
            setter: {
                type: 'iconSelect',
            },
            if: _ => _.selectable === true,
        })
        selectedIcon: nasl.core.String = '';

        @Prop<VanListViewOptions<T, V, P, M, C>, 'unselectedIcon'>({
            group: '交互属性',
            title: '未选图标',
            setter: {
                type: 'iconSelect',
            },
            if: _ => _.selectable === true,
        })
        unselectedIcon: nasl.core.String = '';

        @Prop({
            title: '显示头部',
            description: '是否显示头部',
        })
        private showHead: nasl.core.Boolean = false;

        @Prop({
            title: '列表标题',
            description: '列表标题',
        })
        private title: nasl.core.String = '列表';

        @Prop({
            title: '显示底部',
            description: '是否显示底部',
        })
        private showFoot: nasl.core.Boolean = false;

        @Prop({
            group: '数据属性',
            title: '分页',
            description: '是否需要分页',
            setter: {
                type: 'enumSelect',
                titles: ['不分页', '滚动加载更多', '点击加载更多', '翻页器'],
            },
        })
        pageable: '' | 'auto-more' | 'load-more' | 'pagination' = '';

        @Prop<VanListViewOptions<T, V, P, M, C>, any>({
            title: '后端分页',
            description: '是否使用后端分页',
            if: _ => _.pageable !== '',
        })
        private remotePaging: nasl.core.Boolean = false;

        @Prop<VanListViewOptions<T, V, P, M, C>, 'pageSize'>({
            group: '数据属性',
            title: '默认分页大小',
            description: '分页过小可能会导致滚动加载更多失效',
            if: _ => _.pageable !== '',
        })
        pageSize: nasl.core.Decimal = 20;

        @Prop<VanListViewOptions<T, V, P, M, C>, 'pullRefresh'>({
            group: '交互属性',
            title: '下拉刷新',
            description: '是否开启下拉刷新',
            if: _ => _.pageable !== 'pagination',
        })
        pullRefresh: nasl.core.Boolean = true;

        @Prop<VanListViewOptions<T, V, P, M, C>, 'pullingText'>({
            group: '交互属性',
            title: '下拉过程中提示文字',
            if: _ => _.pullRefresh === true && _.pageable !== 'pagination',
        })
        pullingText: nasl.core.String = '下拉刷新';

        @Prop<VanListViewOptions<T, V, P, M, C>, 'loosingText'>({
            group: '交互属性',
            title: '释放过程中提示文字',
            if: _ => _.pullRefresh === true && _.pageable !== 'pagination',
        })
        loosingText: nasl.core.String = '释放刷新';

        @Prop<VanListViewOptions<T, V, P, M, C>, 'successText'>({
            group: '交互属性',
            title: '刷新成功提示文字',
            if: _ => _.pullRefresh === true && _.pageable !== 'pagination',
        })
        successText: nasl.core.String = '已刷新';

        @Prop<VanListViewOptions<T, V, P, M, C>, 'successDuration'>({
            group: '交互属性',
            title: '刷新成功提示展示时长(ms)',
            if: _ => _.pullRefresh === true && _.pageable !== 'pagination',
        })
        successDuration: nasl.core.Decimal = 500;

        @Prop<VanListViewOptions<T, V, P, M, C>, 'pullDistance'>({
            group: '交互属性',
            title: '触发下拉刷新的距离',
            if: _ => _.pullRefresh === true && _.pageable !== 'pagination',
        })
        pullDistance: nasl.core.Decimal = 50;

        @Prop({
            group: '数据属性',
            title: '可筛选',
            description: '是否可以过滤（搜索），开启将会显示搜索框。',
        })
        filterable: nasl.core.Boolean = false;

        @Prop<VanListViewOptions<T, V, P, M, C>, any>({
            title: '后端筛选',
            description: '是否使用后端过滤',
            if: _ => _.filterable === true,
        })
        private remoteFiltering: nasl.core.Boolean = false;

        @Prop({
            group: '交互属性',
            title: '隐藏空态文案',
            description: '是否隐藏表格末尾“没有更多了”文案',
        })
        hiddenempty: nasl.core.Boolean = false;

        @Prop<VanListViewOptions<T, V, P, M, C>, 'placeholder'>({
            group: '数据属性',
            title: '筛选输入框的占位符',
            description: '搜索框的占位符',
            if: _ => _.filterable === true,
        })
        placeholder: nasl.core.String = '请输入';

        @Prop<VanListViewOptions<T, V, P, M, C>, 'clearable'>({
            group: '数据属性',
            title: '筛选清除按钮',
            description: '搜索框是否有清除按钮',
            if: _ => _.filterable === true,
        })
        clearable: nasl.core.Boolean = false;

        @Prop<VanListViewOptions<T, V, P, M, C>, any>({
            title: '匹配方法',
            description: '过滤时的匹配方法',
            if: _ => _.filterable === true,
        })
        private matchMethod: nasl.core.String = 'includes';

        @Prop<VanListViewOptions<T, V, P, M, C>, any>({
            title: '大小写敏感',
            description: '过滤时大小写是否敏感',
            if: _ => _.filterable === true,
        })
        private caseSensitive: nasl.core.Boolean = false;

        @Prop({
            title: '尺寸',
            description: '大小扩展，支持一个值或两个值的组合，前者表示高度，后者表示宽度',
            setter: {
                type: 'enumSelect',
                titles: ['占满', '巨大', '大', '正常', '自适应'],
            },
        })
        private size: 'full' | 'huge' | 'large' | 'normal' | 'auto' = 'normal';

        @Prop({
            group: '样式属性',
            title: '斑马条纹',
            description: '是否按斑马线条纹显示',
        })
        striped: nasl.core.Boolean = false;

        @Event({
            title: '选择时',
            description: '选择某一项时触发',
        })
        onInput: (event: String) => void;

        @Event({
            title: '选择后',
            description: '选择某一项时触发',
        })
        onSelect: (event: nasl.ui.ChangeItemEvent) => void;

        @Event({
            title: '改变后',
            description: '选择值改变时触发。',
        })
        onChange: (event: nasl.ui.ChangeItemEvent) => void;

        @Event({
            title: '加载前',
            description: '加载前触发',
        })
        onBeforeLoad: (event: EventTarget) => void;

        @Event({
            title: '加载后',
            description: '加载时触发',
        })
        onLoad: (event: nasl.ui.BaseEvent) => void;

        @Slot({
            title: 'undefined',
            description: '插入<van-cell />',
            emptyBackground: 'drag-entity-here',
        })
        private slotDefault: () => Array<VueComponent>;

        @Slot({
            title: 'undefined',
            description: '自定义选项的结构和样式',
        })
        slotItem: (current: Current<T>) => Array<VueComponent>;

        @Slot({
            title: 'undefined',
            description: '自定义上一页',
        })
        slotPrev: () => Array<VueComponent>;

        @Slot({
            title: 'undefined',
            description: '自定义下一页',
        })
        slotNext: () => Array<VueComponent>;
    }
}
