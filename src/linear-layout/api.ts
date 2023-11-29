/// <reference types="nasl" />

namespace nasl.ui {
    @Component({
        title: '线性布局',
        icon: 'linear-layout',
        description: '内部元素按照一定的规则布局',
    })
    export class VanLinearLayout extends VueComponent {
        constructor(options?: Partial<VanLinearLayoutOptions>) {
          super();
        }

        @Method({
            title: '打开加载中',
            description: '打开加载中',
        })
        openLoading(): void {}

        @Method({
            title: '关闭加载中',
            description: '关闭加载中',
        })
        closeLoading(): void {}
    }

    export class VanLinearLayoutOptions {
        @Prop<VanLinearLayoutOptions, 'mode'>({
            title: '布局模式',
            description: '设置布局模式',
            tooltipLink: 'http://help.lcap.163yun.com/1.%E5%BC%80%E5%8F%91%E5%BA%94%E7%94%A8/2.%E9%A1%B5%E9%9D%A2/10.H5%E9%A1%B5%E9%9D%A2%E5%9F%BA%E7%A1%80%E7%BB%84%E4%BB%B6/01.%E5%B8%83%E5%B1%80/020.%E7%BA%BF%E6%80%A7%E5%B8%83%E5%B1%80.html',
            bindHide: true,
            setter: {
                type: 'capsules',
                titles: ['行内', '块级', '弹性'],
                icons: ['layout-inline-block', 'layout-block', 'layout-flex'],
                tooltips: ['内联布局', '块级布局', '弹性布局'],
            },
            onToggle: [
                { clear: ['justify','alignment','wrap','layout'] }
            ],
        })
        mode: 'inline' | 'block' | 'flex' = 'block';

        @Prop<VanLinearLayoutOptions, 'direction'>({
            title: '主轴方向',
            bindHide: true,
            setter: {
                type: 'capsules',
                titles: ['横向排列', '纵向排列'],
                icons: ['flex-horizontal', 'flex-vertical'],
                tooltips: ['横向', '纵向'],
            },
            onToggle: [
                { clear: ['justify','alignment'] }
            ],
        })
        direction: 'horizontal' | 'vertical' = 'horizontal';

        @Prop<VanLinearLayoutOptions, '_justify'>({
            title: '横轴对齐',
            bindHide: true,
            setter: {
                type: 'capsules',
                titles: ['左对齐', '居中对齐', '右对齐', '平均分布(两端不留空)', '平均分布'],
                icons: ['horizontal-justify-start', 'horizontal-justify-center', 'horizontal-justify-end', 'horizontal-justify-space-between', 'horizontal-justify-space-around'],
                tooltips: ['左对齐', '居中对齐', '右对齐', '平均分布(两端不留空)', '平均分布'],
            },
            if: _ => _.direction === 'horizontal' || _.mode === 'inline' && _.direction === 'vertical' || _.mode === 'block' && _.direction === 'vertical',
            onToggle: [
                { update: {gap:'normal'}, if: _ => _ === 'space-between' },
                { update: {gap:'normal'}, if: _ => _ === 'space-around' },
            ],
        })
        _justify: 'start' | 'center' | 'end' | 'space-between' | 'space-around' = 'start';

        @Prop<VanLinearLayoutOptions, 'alignment'>({
            title: '纵轴对齐',
            bindHide: true,
            setter: {
                type: 'capsules',
                titles: ['顶对齐', '垂直居中', '底对齐', '行内文字基线对齐', '占满容器高度'],
                icons: ['horizontal-alignment-start', 'horizontal-alignment-center', 'horizontal-alignment-end', 'horizontal-alignment-baseline', 'horizontal-alignment-stretch'],
                tooltips: ['顶对齐', '垂直居中', '底对齐', '行内文字基线对齐', '占满容器高度'],
            },
            if: _ => _.mode === 'flex' && _.direction === 'horizontal',
        })
        alignment: 'start' | 'center' | 'end' | 'baseline' | 'stretch' = 'stretch';

        @Prop<VanLinearLayoutOptions, '_alignment'>({
            title: '横轴对齐',
            bindHide: true,
            setter: {
                type: 'capsules',
                titles: ['左对齐', '居中对齐', '右对齐', '拉伸子元素充满整个父元素空间'],
                icons: ['vertical-alignment-start', 'vertical-alignment-center', 'vertical-alignment-end', 'vertical-alignment-stretch'],
                tooltips: ['左对齐', '居中对齐', '右对齐', '占满容器宽度'],
            },
            if: _ => _.mode === 'flex' && _.direction === 'vertical',
        })
        _alignment: 'start' | 'center' | 'end' | 'stretch' = 'stretch';

        @Prop<VanLinearLayoutOptions, 'justify'>({
            title: '纵轴对齐',
            bindHide: true,
            setter: {
                type: 'capsules',
                titles: ['顶对齐', '垂直居中', '底对齐', '平均分布(两端不留空)', '平均分布'],
                icons: ['vertical-justify-start', 'vertical-justify-center', 'vertical-justify-end', 'vertical-justify-space-between', 'vertical-justify-space-around'],
                tooltips: ['顶对齐', '垂直居中', '底对齐', '平均分布(两端不留空)', '平均分布'],
            },
            if: _ => _.mode === 'flex' && _.direction === 'vertical',
            onToggle: [
                { update: {gap:'normal'}, if: _ => _ === 'space-between' },
                { update: {gap:'normal'}, if: _ => _ === 'space-around' },
            ],
        })
        justify: 'start' | 'center' | 'end' | 'space-between' | 'space-around' = 'start';

        @Prop<VanLinearLayoutOptions, 'wrap'>({
            title: '是否换行',
            description: '弹性布局下子元素总宽度超出父级时子元素是否换行展示',
            if: _ => _.mode === 'flex',
        })
        wrap: nasl.core.Boolean = true;

        @Prop<VanLinearLayoutOptions, 'gap'>({
            title: '内容间隙',
            description: '内容块间隙大小',
            setter: {
                type: 'enumSelect',
                titles: ['收缩', '无', '小', '正常', '大'],
            },
            if: _ => _.justify !== 'space-between' && _.justify !== 'space-around',
        })
        gap: 'shrink' | 'none' | 'small' | 'normal' | 'large' = 'normal';

        @Prop({
            title: '展示方式',
            description: '行内展示，或块级换行展示',
            setter: {
                type: 'enumSelect',
                titles: ['行内', '块级'],
            },
        })
        private display: 'inline' | 'block' = 'block';

        @Prop<VanLinearLayoutOptions, 'layout'>({
            title: '子元素展示方式',
            description: '子元素行内展示或块级换行展示',
            setter: {
                type: 'enumSelect',
                titles: ['子元素默认布局', '子元素行内布局', '子元素块级布局'],
            },
            if: _ => _.mode === 'inline' || _.mode === 'block',
        })
        layout: 'none' | 'inline' | 'block' = 'none';

        @Prop({
            title: '加载中图标',
            description: '加载图标',
            setter: {
                type: 'iconSelect',
            },
        })
        loadingIcon: nasl.core.String = 'loading';

        @Prop({
            title: '加载中图标旋转',
            description: '加载中图标旋转',
        })
        loadingIconRotate: nasl.core.Boolean = true;

        @Prop({
            title: '加载中文案',
            description: '加载中文案',
        })
        loadingText: nasl.core.String = '';

        @Slot({
            title: 'undefined',
            description: '内容',
        })
        slotDefault: () => Array<VueComponent>;

        @Event({
          title: '点击后',
          description: '点击此项时触发',
        })
        onClick: () => void;
    }
}
