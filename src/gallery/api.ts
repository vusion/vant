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
            title: '数据源',
            description: '数据源',
        })
        dataSource: nasl.collection.List<T>;
    }
}
