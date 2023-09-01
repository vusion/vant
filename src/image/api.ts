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
            title: '地址',
            description: '图片地址',
            setter: {
                type: 'imageSelect',
            },
        })
        src: nasl.core.String = '';

        @Prop({
            title: '填充方式',
            description: '图片地址',
            setter: {
                type: 'enumSelect',
                titles: ['适应', '适应（图片小于父元素时以原尺寸展示）', '原尺寸', '拉伸', '填充'],
            },
        })
        fit: 'contain' | 'scale-down' | 'none' | 'fill' | 'cover' = 'contain';

        @Prop({
            title: '图片风格',
            description: '图片风格',
            setter: {
                type: 'enumSelect',
                titles: ['方形', '圆形'],
            },
        })
        sr: 's' | 'r' = 's';

        @Prop({
            title: '点击放大',
            description: '是否支持点击放大全屏展示',
        })
        preview: nasl.core.Boolean = true;

        @Event({
            title: '点击后',
            description: '点击此项时触发',
        })
        onClick: () => void;
    }
}
