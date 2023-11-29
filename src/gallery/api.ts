/// <reference types="nasl" />

namespace nasl.ui {
    @Component({
        title: '画廊',
        icon: 'gallery',
        description: '画廊',
    })
    export class VanGallery<T> extends VueComponent {
        constructor(options?: Partial<VanGalleryOptions<T>>) { super(); }
    }

    export class VanGalleryOptions<T> {
        @Prop({
            group: '数据属性',
            title: '数据源',
            description: '展示数据的输入源，可设置为数据集对象或者返回数据集的逻辑。',
        })
        dataSource: nasl.collection.List<T>;
    }
}
