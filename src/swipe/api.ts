/// <reference types="nasl" />

namespace nasl.ui {
    @Component({
        title: '幻灯片',
        icon: 'swipe',
        description: '用于循环播放一组图片或内容',
    })
    export class VanSwipe extends VueComponent {
        constructor(options?: Partial<VanSwipeOptions>) { super(); }
    }

    export class VanSwipeOptions {
        @Prop({
            title: '循环播放',
            description: '是否循环播放',
            setter: {
                type: 'switch',
            },
        })
        private loop: nasl.core.Boolean = true;

        @Prop({
            title: '指示器',
            description: '是否显示指示器',
            setter: {
                type: 'switch',
            },
        })
        private showIndicators: nasl.core.Boolean = true;

        @Prop({
            group: '主要属性',
            title: '动画时间',
            description: '单位：毫秒，幻灯片切换时间，如果设置值小于动画时长，会在动画完成后切换。',
            setter: {
                type: 'numberInput',
            },
        })
        duration: nasl.core.Decimal = 4000;

        @Prop({
            group: '交互属性',
            title: '手势滑动',
            description: '是否支持手势滑动',
            setter: {
                type: 'switch',
            },
        })
        touchable: nasl.core.Boolean = true;

        @Slot({
            title: 'undefined',
            description: '插入`van-swipe-item`子组件。',
            emptyBackground: 'add-sub-large',
            snippets: [
                {
                    title: '幻灯片子项',
                    code: '<van-swipe-item vusion-slot-name="default"><van-image style="width:100%;height:100%" src="https://static-vusion.163yun.com/assets/cloud-ui/1.jpg"></van-image></van-swipe-item>',
                },
            ],
        })
        slotDefault: () => Array<VanSwipeItem>;
    }

    @Component({
        title: '幻灯片选项',
        description: '幻灯片选项',
    })
    export class VanSwipeItem extends VueComponent {
        constructor(options?: Partial<VanSwipeItemOptions>) { super(); }
    }

    export class VanSwipeItemOptions {
        @Event({
            title: '点击后',
            description: '点击某一项后触发',
        })
        onClick: (event: MouseEvent) => void;

        @Slot({
            title: 'undefined',
            description: '插入幻灯片内容，如图片',
        })
        slotDefault: () => Array<VueComponent>;
    }
}
