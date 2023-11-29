/// <reference types="nasl" />

namespace nasl.ui {
    @Component({
        title: '图片展示',
        icon: 'image',
        description: '可以用来展示一张图片，支持设置图片地址。',
    })
    export class VanImage extends VueComponent {
        constructor(options?: Partial<VanImageOptions>) { super(); }
    }

    export class VanImageOptions {
        @Prop({
            title: '加载样式',
            setter: {
                type: 'enumSelect',
                titles: ['Loading', '不显示加载状态', '自定义默认图'],
            },
        })
        loadingType: 'loading' | 'none' | 'placeholder' = 'loading';

        @Prop<VanImageOptions, 'placeholderSrc'>({
            title: '默认图地址',
            if: _ => _.loadingType === 'placeholder',
        })
        placeholderSrc: nasl.core.String = 'https://static-vusion.nos-eastchina1.126.net/h5-template/lietu.png';

        @Prop({
            group: '主要属性',
            title: '图片地址',
            setter: {
              type: 'imageSelect',
            }
        })
        src: nasl.core.String = '';

        @Prop({
            group: '主要属性',
            title: '填充方式',
            description: '设置图片的填充方式',
            setter: {
                type: 'enumSelect',
                titles: ['适应', '适应（图片小于父元素时以原尺寸展示）', '原尺寸', '拉伸', '填充'],
            },
        })
        fit: 'contain' | 'scale-down' | 'none' | 'fill' | 'cover' = 'contain';

        @Prop({
            group: '主要属性',
            title: '图片风格',
            description: '选择图片为方形或圆形',
            setter: {
                type: 'enumSelect',
                titles: ['方形', '圆形'],
            },
        })
        sr: 's' | 'r' = 's';

        @Prop({
            group: '交互属性',
            title: '点击放大',
            description: '是否支持点击放大全屏展示',
            setter: {
                type: 'switch',
            },
        })
        preview: nasl.core.Boolean = false;

        @Event({
            title: '点击后',
            description: '点击此项时触发',
        })
        onClick: (event: MouseEvent) => void;
    }
}
