export default {
  confirm: '确定',
  cancel: '取消',

  // 日历
  vanCalendar_title: '日期选择',
  vanCalendar_confirm: '确定',
  vanCalendar_weekdays: '日,一,二,三,四,五,六',
  vanCalendar_monthTitle: '{year}年{month}月',
  vanCalendar_end: '结束',
  vanCalendar_start: '开始',
  vanCalendar_startEnd: '开始/结束',

  // 级联选择
  vanCascader_select: '请选择',

  // 日期时间选择
  vanDatetimePicker_confirm: '确定',
  vanDatetimePicker_cancel: '取消',
  vanDatetimePicker_rangeTabStart: '开始',
  vanDatetimePicker_rangeTabTo: '至',
  vanDatetimePicker_rangeTabEnd: '结束',

  // 选择器
  vanPickerson_confirm: '确定',
  vanPickerson_cancel: '取消',
  vanPickerson_searchPlaceholder: '请输入搜索关键词',
  vanPickerPick_confirm: '确定',
  vanPickerPick_cancel: '取消',
  vanPickerList_selected: '当前已选中',
  vanPickerList_selectAll: '全选',
  vanPickerList_cancelSelectAll: '取消全选',

  // 表单项
  validateLabel: '字段',

  // 文件上传
  vanUploader_uploading: '上传中...',
  vanUploader_fail: '上传失败',
  vanUploader_typeError: '文件类型不匹配，请上传{accept}的文件类型',
  vanUploader_maxSize: '文件{name}超出大小{size}MB！',

  // 复制
  vanCopy_fail: '无复制对象',

  // 数据网格
  vanGridView_loading: '加载中',

  // 以下为未用到组件的翻译
  name: '姓名',
  tel: '电话',
  save: '保存',
  confirm: '确认',
  cancel: '取消',
  delete: '删除',
  complete: '完成',
  loading: '加载中...',
  telEmpty: '请填写电话',
  nameEmpty: '请填写姓名',
  nameInvalid: '请输入正确的姓名',
  confirmDelete: '确定要删除吗',
  telInvalid: '请输入正确的手机号',

  vanContactCard: {
    addText: '添加联系人',
  },
  vanContactList: {
    addText: '新建联系人',
  },
  vanPagination: {
    prev: '上一页',
    next: '下一页',
  },
  vanPullRefresh: {
    pulling: '下拉即可刷新...',
    loosing: '释放即可刷新...',
  },
  vanSubmitBar: {
    label: '合计：',
  },
  vanCoupon: {
    unlimited: '无使用门槛',
    discount: (discount: number) => `${discount}折`,
    condition: (condition: number) => `满${condition}元可用`,
  },
  vanCouponCell: {
    title: '优惠券',
    tips: '暂无可用',
    count: (count: number) => `${count}张可用`,
  },
  vanCouponList: {
    empty: '暂无优惠券',
    exchange: '兑换',
    close: '不使用优惠券',
    enable: '可用',
    disabled: '不可用',
    placeholder: '请输入优惠码',
  },
  vanAddressEdit: {
    area: '地区',
    postal: '邮政编码',
    areaEmpty: '请选择地区',
    addressEmpty: '请填写详细地址',
    postalEmpty: '邮政编码格式不正确',
    defaultAddress: '设为默认收货地址',
    telPlaceholder: '收货人手机号',
    namePlaceholder: '收货人姓名',
    areaPlaceholder: '选择省 / 市 / 区',
  },
  vanAddressEditDetail: {
    label: '详细地址',
    placeholder: '街道门牌、楼层房间号等信息',
  },
  vanAddressList: {
    add: '新增地址',
  },
};
