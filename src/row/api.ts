/// <reference types="nasl" />

namespace nasl.ui {
    @Component({
        title: '栅格布局',
        icon: 'row',
        description: '内部元素按照一定的规则布局',
    })
    export class VanRow extends VueComponent {
        constructor(options?: Partial<VanRowOptions>) { super(); }
    }

    export class VanRowOptions {
        @Prop<VanRowOptions, 'type'>({
            group: '样式属性',
            title: '布局模式',
            description: '设置布局模式',
            tooltipLink: 'http://help.lcap.163yun.com/1.%E5%BC%80%E5%8F%91%E5%BA%94%E7%94%A8/2.%E9%A1%B5%E9%9D%A2/10.H5%E9%A1%B5%E9%9D%A2%E5%9F%BA%E7%A1%80%E7%BB%84%E4%BB%B6/01.%E5%B8%83%E5%B1%80/030.%E6%A0%85%E6%A0%BC%E5%B8%83%E5%B1%80.html',
            bindHide: true,
            setter: {
                type: 'capsules',
                titles: ['正常', '弹性布局'],
                icons: ['layout-block', 'layout-flex'],
                tooltips: ['块级布局', '弹性布局'],
            },
        })
        type: '-' | 'flex' = 'flex';

        @Prop<VanRowOptions, 'justify'>({
            group: '样式属性',
            title: '横轴对齐',
            bindHide: true,
            setter: {
                type: 'capsules',
                titles: ['左对齐', '居中对齐', '右对齐', '平均分布(两端不留空)', '水平分布-左右留空'],
                icons: ['horizontal-justify-start', 'horizontal-justify-center', 'horizontal-justify-end', 'horizontal-justify-space-between', 'horizontal-justify-space-around'],
                tooltips: ['左对齐', '居中对齐', '右对齐', '平均分布(两端不留空)', '平均分布'],
            },
            if: _ => _.type === 'flex',
        })
        justify: 'start' | 'center' | 'end' | 'space-between' | 'space-around' = 'start';

        @Prop<VanRowOptions, 'alignment'>({
          group: '样式属性',
          title: '纵轴对齐',
          bindHide: true,
          setter: {
            type: 'capsules',
            titles: ['顶对齐', '垂直居中', '底对齐', '行内文字基线对齐', '占满容器高度'],
            icons: ['horizontal-alignment-start', 'horizontal-alignment-center', 'horizontal-alignment-end', 'horizontal-alignment-baseline', 'horizontal-alignment-stretch'],
            tooltips: ['顶对齐', '垂直居中', '底对齐', '行内文字基线对齐', '占满容器高度'],
          },
          if: _ => _.type === 'flex',
        })
        alignment: 'start' | 'center' | 'end' | 'baseline' | 'stretch' = 'stretch';

        @Prop({
            group: '样式属性',
            title: '列间距',
            description: '列元素之间的间距，单位为 px。',
            setter: {
                type: 'enumSelect',
                titles: ['无（0）', '小（10）', '正常（20）', '大（30）'],
            },
        })
        gutter: '0' | '10' | '20' | '30' = '0';

        @Slot({
            title: 'undefined',
            description: '插入`<van-col>`子组件。',
            emptyBackground: 'add-sub',
            snippets: [
                {
                    title: '插入一列',
                    code: '<van-col span="8"></van-col>',
                },
            ],
        })
        slotDefault: () => Array<VanCol>;
    }

    @Component({
        title: '栅格列',
        description: '内部元素行内列布局',
    })
    export class VanCol extends VueComponent {

        constructor(options?: Partial<VanColOptions>) { super(); }
    }

    export class VanColOptions {
        @Prop<VanColOptions, 'direction'>({
            title: '主轴方向',
            bindHide: true,
            setter: {
                type: 'capsules',
                titles: ['横向排列', '纵向排列'],
                icons: ['flex-horizontal', 'flex-vertical'],
                tooltips: ['横向', '纵向'],
            },
            if: _ => _.mode === 'flex',
            onToggle: [
                { clear: ['justify','alignment'] }
            ],
        })
        direction: 'horizontal' | 'vertical' = 'horizontal';

      @Prop<VanColOptions, '_justify'>({
        group: '主要属性',
        title: '横轴对齐',
        docDescription: '主轴方向为横向时：支持左对齐、居中对齐、右对齐、平均分布（两端不留空）、平均分布。主轴方向为纵向时：支持左对齐、居中对齐、右对齐、占满容器宽度。',
        bindHide: true,
        setter: {
          type: 'capsules',
          titles: ['左对齐', '居中对齐', '右对齐', '平均分布(两端不留空)', '平均分布'],
          icons: ['horizontal-justify-start', 'horizontal-justify-center', 'horizontal-justify-end', 'horizontal-justify-space-between', 'horizontal-justify-space-around'],
          tooltips: ['左对齐', '居中对齐', '右对齐', '平均分布(两端不留空)', '平均分布'],
        },
        if: _ => _.mode === 'flex' && _.direction === 'horizontal',
        onToggle: [
          { update: { gap: 'normal' }, if: _ => _ === 'space-between' },
          { update: { gap: 'normal' }, if: _ => _ === 'space-around' },
        ],
      })
      _justify: 'start' | 'center' | 'end' | 'space-between' | 'space-around' = 'start';

      @Prop<VanColOptions, 'alignment'>({
        group: '主要属性',
        title: '纵轴对齐',
        docDescription: '主轴方向为横向时：支持顶对齐、垂直居中、底对齐、行内文字基线对齐、占满容器高度。主轴方向为纵向时：支持顶对齐、垂直居中、底对齐、平均分布（两端不留空）、平均分布。',
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

      @Prop<VanColOptions, '_alignment'>({
        group: '主要属性',
        title: '纵轴对齐',
        docDescription: '主轴方向为横向时：支持顶对齐、垂直居中、底对齐、行内文字基线对齐、占满容器高度。主轴方向为纵向时：支持顶对齐、垂直居中、底对齐、平均分布（两端不留空）、平均分布。',
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

      @Prop<VanColOptions, 'justify'>({
        group: '主要属性',
        title: '横轴对齐',
        docDescription: '主轴方向为横向时：支持左对齐、居中对齐、右对齐、平均分布（两端不留空）、平均分布。 主轴方向为纵向时：支持左对齐、居中对齐、右对齐、占满容器宽度。',
        bindHide: true,
        setter: {
          type: 'capsules',
          titles: ['顶对齐', '垂直居中', '底对齐', '平均分布(两端不留空)', '平均分布'],
          icons: ['vertical-justify-start', 'vertical-justify-center', 'vertical-justify-end', 'vertical-justify-space-between', 'vertical-justify-space-around'],
          tooltips: ['顶对齐', '垂直居中', '底对齐', '平均分布(两端不留空)', '平均分布'],
        },
        if: _ => _.mode === 'flex' && _.direction === 'vertical',
        onToggle: [
          { update: { gap: 'normal' }, if: _ => _ === 'space-between' },
          { update: { gap: 'normal' }, if: _ => _ === 'space-around' },
        ],
      })
      justify: 'start' | 'center' | 'end' | 'space-between' | 'space-around' = 'start';

        @Prop<VanColOptions, 'wrap'>({
            title: '是否换行',
            description: '弹性布局下子元素总宽度超出父级时子元素是否换行展示',
            setter: {
                type: 'switch',
            },
            if: _ => _.mode === 'flex',
        })
        wrap: nasl.core.Boolean = true;

        @Prop<VanColOptions, 'gap'>({
            title: '内容间隙',
            description: '内容块间隙大小',
            setter: {
                type: 'enumSelect',
                titles: ['收缩', '无', '小', '正常', '大'],
            },
            if: _ => _.mode === 'flex' && _.justify !== 'space-between' && _.justify !== 'space-around',
        })
        gap: 'shrink' | 'none' | 'small' | 'normal' | 'large' = 'normal';

        @Prop<VanColOptions, 'span'>({
            group: '主要属性',
            title: '占据列数',
            description: '栅格列宽度，栅格行最大为24列。',
            setter: {
                type: 'numberInput',
                min: 1,
                max: 24,
                precision: 1,
            },
        })
        span: nasl.core.Integer = 1;

        @Prop<VanColOptions, 'offset'>({
            group: '主要属性',
            title: '偏移数',
            description: '栅格列向右偏移列数',
            setter: {
                type: 'numberInput',
                precision: 1,
            },
        })
        offset: nasl.core.Integer = 0;

        @Prop<VanColOptions, 'mode'>({
            group: '主要属性',
            title: '布局模式',
            description: '设置布局模式',
            tooltipLink: 'http://help.lcap.163yun.com/1.%E5%BC%80%E5%8F%91%E5%BA%94%E7%94%A8/2.%E9%A1%B5%E9%9D%A2/10.H5%E9%A1%B5%E9%9D%A2%E5%9F%BA%E7%A1%80%E7%BB%84%E4%BB%B6/01.%E5%B8%83%E5%B1%80/030.%E6%A0%85%E6%A0%BC%E5%B8%83%E5%B1%80.html',
            bindHide: true,
            setter: {
                type: 'capsules',
                titles: ['块级', '弹性'],
                icons: ['layout-inline-block', 'layout-flex'],
                tooltips: ['内联布局', '弹性布局'],
            },
            onToggle: [
                { clear: ['justify','alignment','wrap','gap'] }
            ],
        })
        mode: 'inline' | 'flex' = 'inline';

        @Slot({
            title: 'undefined',
            description: '插入需要布局的元素。',
        })
        slotDefault: () => Array<VueComponent>;
    }
}
