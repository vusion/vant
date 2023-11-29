/// <reference types="nasl" />

namespace nasl.ui {
    @Component({
        title: '数据列表',
        icon: 'list-view',
        description: '用于列举大量数据的列表框，支持单选、多选、过滤（搜索）、分页等功能。',
    })
    export class VanListView<T, V, P, M> extends VueComponent {
        constructor(options?: Partial<VanListViewOptions<T, V, P, M>>) { super(); }

        @Method({
            title: 'undefined',
            description: '清除缓存，重新加载',
        })
        reload(): void {}
    }

    export class VanListViewOptions<T, V, P, M> {
        @Prop({
            title: '只读',
            description: '是否只读',
            setter: {
                type: 'switch',
            },
        })
        private readonly: nasl.core.Boolean = false;

        @Prop({
            title: '禁用',
            description: '是否禁用',
            setter: {
                type: 'switch',
            },
        })
        private disabled: nasl.core.Boolean = false;

        @Prop({
            title: '可取消',
            description: '是否可以取消选择',
            setter: {
                type: 'switch',
            },
        })
        private cancelable: nasl.core.Boolean = false;

        @Prop({
            title: '显示头部',
            description: '是否显示头部',
            setter: {
                type: 'switch',
            },
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
            setter: {
                type: 'switch',
            },
        })
        private showFoot: nasl.core.Boolean = false;

        @Prop<VanListViewOptions<T, V, P, M>, any>({
            title: '后端分页',
            description: '是否使用后端分页',
            setter: {
                type: 'switch',
            },
            if: _ => _.pageable !== '',
        })
        private remotePaging: nasl.core.Boolean = false;

        @Prop<VanListViewOptions<T, V, P, M>, any>({
            title: '后端筛选',
            description: '是否使用后端过滤',
            setter: {
                type: 'switch',
            },
            if: _ => _.filterable === true,
        })
        private remoteFiltering: nasl.core.Boolean = false;

        @Prop<VanListViewOptions<T, V, P, M>, any>({
            title: '匹配方法',
            description: '过滤时的匹配方法',
            if: _ => _.filterable === true,
        })
        private matchMethod: nasl.core.String = 'includes';

        @Prop<VanListViewOptions<T, V, P, M>, any>({
            title: '大小写敏感',
            description: '过滤时大小写是否敏感',
            setter: {
                type: 'switch',
            },
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
            group: '数据属性',
            title: '数据源',
            description: '列表的数据源。数组方式表示直接的数据，函数需要返回一个 Promise。',
            designerValue: [{}, {}, {}],
        })
        dataSource: nasl.collection.List<T>;

        @Prop({
            group: '数据属性',
            title: '数据类型',
            description: '数据源返回的数据结构的类型，自动识别类型进行展示说明。',
        })
        dataSchema: T;

        @Prop<VanListViewOptions<T, V, P, M>, 'valueField'>({
            group: '数据属性',
            title: '值字段名',
            description: '选项值的字段名',
            setter: {
                type: 'propertySelect',
            },
        })
        valueField: (item: T) => V;

        @Prop<VanListViewOptions<T, V, P, M>, 'textField'>({
            group: '数据属性',
            title: '文本字段名',
            description: '选项文本的字段名，可用于前端筛选时的匹配',
            setter: {
                type: 'propertySelect',
            },
        })
        textField: (item: T) => nasl.core.String;

        @Prop({
            group: '数据属性',
            title: '值',
            description: '用于标识数据列表的值',
            syncMode: 'both',
        })
        value: M extends true ? nasl.collection.List<V> : V;

        @Prop({
            group: '主要属性',
            title: '分页',
            description: '设置分页类型',
            setter: {
                type: 'enumSelect',
                titles: ['不分页', '滚动加载更多', '点击加载更多', '翻页器'],
            },
        })
        pageable: '' | 'auto-more' | 'load-more' | 'pagination' = '';

        @Prop<VanListViewOptions<T, V, P, M>, 'pageSize'>({
            group: '主要属性',
            title: '默认分页大小',
            description: '分页过小可能会导致滚动加载更多失效',
            setter: {
                type: 'numberInput',
                min: 1,
            },
            if: _ => _.pageable !== '',
        })
        pageSize: nasl.core.Integer = 20;

        @Prop({
            group: '主要属性',
            title: '可筛选',
            description: '是否可以过滤（搜索），开启将会显示搜索框。',
            setter: {
                type: 'switch',
            },
        })
        filterable: nasl.core.Boolean = false;

        @Prop<VanListViewOptions<T, V, P, M>, 'placeholder'>({
            group: '主要属性',
            title: '筛选输入框显示文字',
            if: _ => _.filterable === true,
        })
        placeholder: nasl.core.String = '请输入';

        @Prop<VanListViewOptions<T, V, P, M>, 'clearable'>({
            group: '主要属性',
            title: '筛选清除按钮',
            description: '搜索框是否展示清除按钮',
            setter: {
                type: 'switch',
            },
            if: _ => _.filterable === true,
        })
        clearable: nasl.core.Boolean = false;

        @Prop({
            group: '交互属性',
            title: '可选择',
            description: '是否可以选择',
            setter: {
                type: 'switch',
            },
        })
        private selectable: nasl.core.Boolean = true;

        @Prop({
            group: '交互属性',
            title: '多选',
            description: '设置是否可以多选行，不开启则为单选。',
            setter: {
                type: 'switch',
            },
        })
        multiple: nasl.core.Boolean = false;

        @Prop<VanListViewOptions<T, V, P, M>, 'selectedIcon'>({
            group: '交互属性',
            title: '已选图标',
            setter: {
                type: 'iconSelect',
            },
            if: _ => _.selectable === true,
        })
        selectedIcon: nasl.core.String;

        @Prop<VanListViewOptions<T, V, P, M>, 'unselectedIcon'>({
            group: '交互属性',
            title: '未选图标',
            setter: {
              type: 'iconSelect',
            },
            if: _ => _.selectable === true,
        })
        unselectedIcon: nasl.core.String;

        @Prop<VanListViewOptions<T, V, P, M>, 'pullRefresh'>({
            group: '交互属性',
            title: '下拉刷新',
            description: '是否开启下拉刷新',
            setter: {
                type: 'switch',
            },
            if: _ => _.pageable !== 'pagination',
        })
        pullRefresh: nasl.core.Boolean = true;

        @Prop<VanListViewOptions<T, V, P, M>, 'pullingText'>({
            group: '交互属性',
            title: '下拉过程中提示文案',
            if: _ => _.pullRefresh === true && _.pageable !== 'pagination',
        })
        pullingText: nasl.core.String = '下拉刷新';

        @Prop<VanListViewOptions<T, V, P, M>, 'loosingText'>({
            group: '交互属性',
            title: '释放过程中提示文案',
            if: _ => _.pullRefresh === true && _.pageable !== 'pagination',
        })
        loosingText: nasl.core.String = '释放刷新';

        @Prop<VanListViewOptions<T, V, P, M>, 'successText'>({
            group: '交互属性',
            title: '刷新成功提示文案',
            if: _ => _.pullRefresh === true && _.pageable !== 'pagination',
        })
        successText: nasl.core.String = '已刷新';

        @Prop<VanListViewOptions<T, V, P, M>, 'successDuration'>({
            group: '交互属性',
            title: '展示时长',
            description: '设置刷新成功后提示展示时长，单位为ms。',
            setter: {
                type: 'numberInput',
                precision: 0,
            },
            if: _ => _.pullRefresh === true && _.pageable !== 'pagination',
        })
        successDuration: nasl.core.Integer = 500;

        @Prop<VanListViewOptions<T, V, P, M>, 'pullDistance'>({
            group: '交互属性',
            title: '刷新距离',
            description: '设置触发下拉刷新的距离，单位为px。',
            setter: {
                type: 'numberInput',
            },
            if: _ => _.pullRefresh === true && _.pageable !== 'pagination',
        })
        pullDistance: nasl.core.Decimal = 50;

        @Prop({
            group: '交互属性',
            title: '隐藏空态文案',
            description: '是否隐藏表格末尾“没有更多了”文案',
            setter: {
                type: 'switch',
            },
        })
        hiddenempty: nasl.core.Boolean = false;

        @Prop({
            group: '状态属性',
            title: '初始加载',
            description: '是否在初始时立即加载',
            setter: {
                type: 'switch',
            },
        })
        initialLoad: nasl.core.Boolean = true;

        @Prop({
            group: '状态属性',
            title: '加载状态',
            description: '设置加载状态',
            bindHide: true,
            setter: {
                type: 'enumSelect',
                titles: ['加载完成-有数据', '加载完成-暂无数据', '加载中', '加载失败'],
            },
        })
        designerMode: 'success' | 'empty' | 'loading' | 'error' = 'success';

        @Prop<VanListViewOptions<T, V, P, M>, 'loadingText'>({
            group: '状态属性',
            title: '加载中文案',
            description: '加载中状态显示的文案',
            docDescription: '当数据正在加载时展示的文字，默认为"加载中..."。',
            if: _ => _.designerMode === 'loading',
        })
        loadingText: nasl.core.String = '正在加载中...';

        @Prop<VanListViewOptions<T, V, P, M>, 'loading'>({
            group: '状态属性',
            title: '加载中触发条件',
            description: '加载中状态的触发条件，未设置则默认为系统定义条件。',
            bindOpen: true,
            setter: {
                type: 'switch',
            },
            if: _ => _.designerMode === 'loading',
        })
        loading: nasl.core.Boolean;

        @Prop<VanListViewOptions<T, V, P, M>, 'errorText'>({
            group: '状态属性',
            title: '加载失败文案',
            description: '加载失败状态显示的提示文案',
            docDescription: '加载失败的提示文字。默认"加载失败，请重试"',
            if: _ => _.designerMode === 'error',
        })
        errorText: nasl.core.String = '加载失败，请重试';

        @Prop<VanListViewOptions<T, V, P, M>, 'error'>({
            group: '状态属性',
            title: '加载失败触发条件',
            description: '加载失败状态的触发条件，未设置则默认为系统定义条件。',
            docDescription: '控制表格加载失败的展示时机。默认关闭。',
            bindOpen: true,
            setter: {
                type: 'switch',
            },
            if: _ => _.designerMode === 'error',
        })
        error: nasl.core.Boolean;

        @Prop<VanListViewOptions<T, V, P, M>, 'emptyText'>({
            group: '状态属性',
            title: '暂无数据文案',
            description: '暂无数据状态显示的提示文案',
            docDescription: '当列表为空时的提示文字。默认"暂无数据"',
            if: _ => _.designerMode === 'empty',
        })
        emptyText: nasl.core.String = '暂无数据';

        @Prop({
            group: '样式属性',
            title: '斑马条纹',
            description: '是否按斑马线条纹显示',
            setter: {
                type: 'switch',
            },
        })
        striped: nasl.core.Boolean = false;

        @Event({
            title: '选择时',
            description: '选择某一项时触发',
        })
        onInput: (event: M extends true ? nasl.collection.List<V> : V) => void;

        @Event({
            title: '选择后',
            description: '选择某一项时触发',
        })
        onSelect: (event: {
          selected: nasl.core.Boolean,
          item: T,
          value: M extends true ? nasl.collection.List<V> : V,
        }) => void;

        @Event({
            title: '改变后',
            description: '选择值改变时触发。',
        })
        onChange: (event: {
          item: T,
          value: M extends true ? nasl.collection.List<V> : V,
        }) => void;

        @Event({
            title: '加载前',
            description: '加载前触发',
        })
        onBeforeLoad: () => void;

        @Event({
            title: '加载后',
            description: '加载时触发',
        })
        onLoad: () => void;

        @Slot({
            title: 'undefined',
            description: '插入<van-cell />',
            emptyBackground: 'drag-entity-here',
            snippets: [
                {
                    title: '单元格',
                    code: '<template #item="current"><van-cell isLink><template #title>文本</template></van-cell></template>',
                },
            ],
        })
        private slotDefault: () => Array<VanCell>;

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
