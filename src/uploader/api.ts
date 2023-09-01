/// <reference types="nasl" />

namespace nasl.ui {
    @Component({
        title: '文件上传',
        icon: 'uploader',
        description: '上传文件。',
    })
    export class VanUploader extends VueComponent {


        @Method({
            title: 'undefined',
            description: '主动调起文件选择，由于浏览器安全限制，只在触发操作的上下文中调用才有效',
        })
        chooseFile(): void {}
        constructor(options?: Partial<VanUploaderOptions>) { super(); }
    }

    export class VanUploaderOptions {
        @Prop({
            title: '值',
            description: '已上传的文件列表',
            syncMode: 'both',
        })
        fileListProp: Array;

        @Prop({
            title: '上传的文件字段名',
            description: '上传的文件字段名，后端需要这个字段获取',
        })
        name: nasl.core.String = 'file';

        @Prop({
            title: '支持上传的文件类型',
            description: '若要限制上传文件类型，请输入类型名称，格式为“.后缀名”，多个文件类型时使用英文逗号隔开。例如“.jpeg,.png,.gif”',
            tooltipLink: 'https://help.lcap.163yun.com/1.%E5%BC%80%E5%8F%91%E5%BA%94%E7%94%A8/2.%E9%A1%B5%E9%9D%A2/10.H5%E9%A1%B5%E9%9D%A2%E5%9F%BA%E7%A1%80%E7%BB%84%E4%BB%B6/06.%E8%A1%A8%E5%8D%95/150.%E6%96%87%E4%BB%B6%E4%B8%8A%E4%BC%A0.html',
            setter: {
                type: 'input',
                placeholder: '所有类型',
            },
        })
        accept: nasl.core.String;

        @Prop({
            title: '转换器',
            description: '转换器',
            setter: {
                type: 'enumSelect',
                titles: ['JSON', 'URL字符串'],
            },
        })
        converter: 'json' | 'simple' = 'json';

        @Prop({
            title: '文件读取结果的类型',
            description: '文件读取结果的类型，上传大文件时，建议使用 file 类型，避免卡顿',
            setter: {
                type: 'enumSelect',
                titles: ['dataUrl', 'text', 'file'],
            },
        })
        private resultType: 'dataUrl' | 'text' | 'file' = 'dataUrl';

        @Prop({
            title: '上传地址',
            description: '文件上传的地址',
        })
        url: nasl.core.String;

        @Prop({
            title: '请求 headers',
            description: '请求 headers',
        })
        headers: Object;

        @Prop({
            title: '附加数据',
            description: '附加数据',
        })
        data: object;

        @Prop({
            title: '是否只读',
            description: '是否自动上传',
        })
        readonlyy: nasl.core.Boolean = false;

        @Prop({
            title: '设置cookie值',
            description: '通过设置 withCredentials 为 true 获得的第三方 cookies，将会依旧享受同源策略',
        })
        withCredentials: nasl.core.Boolean = false;

        @Prop({
            title: 'URL 字段名',
            description: '请求返回的 URL 字段名',
        })
        urlField: nasl.core.String = 'result';

        @Prop({
            title: '是否自动上传',
            description: '是否自动上传',
        })
        autoUpload: nasl.core.Boolean = true;

        @Prop({
            title: '多文件上传',
            description: '多文件上传',
        })
        multiple: nasl.core.Boolean = false;

        @Prop({
            title: '列表数量上限',
            description: '列表数量上限',
        })
        maxCount: nasl.core.Decimal | nasl.core.String = 999;

        @Prop({
            title: '最大文件大小,单位为MB',
            description: '文件大小限制，默认为50MB',
        })
        maxSize: nasl.core.Decimal | nasl.core.String = 50;

        @Prop({
            title: '图片选择模式',
            description: '图片选择模式',
            setter: {
                type: 'enumSelect',
                titles: ['图库', '相机'],
            },
        })
        capture: 'waga' | 'camera' = 'waga';

        @Prop({
            title: '禁用',
            description: '是否禁用',
        })
        disabled: nasl.core.Boolean = false;

        @Prop({
            title: '文件访问策略',
            setter: {
                type: 'enumSelect',
                titles: ['任何人可访问', '用户登录后可访问'],
            },
        })
        access: 'public' | 'private';

        @Prop({
            title: '文件有效期',
            description: '是否开启文件有效期控制',
        })
        ttl: nasl.core.Boolean;

        @Prop<VanUploaderOptions, 'ttlValue'>({
            title: '上传后有效天数',
            description: '文件有效期天数',
            if: _ => _.ttl === true,
        })
        ttlValue: nasl.core.Decimal;

        @Event({
            title: '点击',
            description: '点击上传区域时触发',
        })
        onClickUpload: () => void;

        @Event({
            title: '文件大小超额',
            description: '文件大小超额时触发',
        })
        onOversize: () => void;

        @Event({
            title: '删除预览',
            description: '删除文件预览时触发',
        })
        onDelete: () => void;

        @Event({
            title: '上传开始时',
            description: '上传开始时触发',
        })
        onStart: () => void;

        @Event({
            title: '上传中',
            description: '上传中进度',
        })
        onProgress: () => void;

        @Event({
            title: '上传成功时',
            description: '上传成功时触发',
        })
        onSuccess: () => void;

        @Event({
            title: '上传错误时',
            description: '上传报错时触发',
        })
        onError: () => void;
    }
}
