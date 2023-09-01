/// <reference types="nasl" />

namespace nasl.ui {
    @Component({
        title: '子页面容器',
        icon: 'router-view',
        description: '放置子页面的容器。',
    })
    export class VanRouterView extends VueComponent {

        constructor(options?: Partial<VanRouterViewOptions>) { super(); }
    }

    export class VanRouterViewOptions {

    }
}
