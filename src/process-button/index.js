import { createNamespace } from '../utils';

import Button from '../button';
import Popover from '../popover';
import PopoverItem from '../popover-item';
import Dialog from '../dialog/Dialog';
import Input from '../fieldinput';

const [createComponent, bem, t] = createNamespace('process-button');

export default createComponent({
  data() {
    return {
      taskId: null,
      permissionDetails: [
        // {
        //   name: 'submit',
        //   operateEnable: true, // 操作权限开关
        //   showText: '提交', // 操作按钮文本
        //   opinionsEnable: true, // 意见开关
        // },
        {
          name: 'consent',
          operateEnable: true, // 操作权限开关
          showText: '同意', // 操作按钮文本
          opinionsEnable: true, // 意见开关
        },
        {
          name: 'reject',
          operateEnable: true, // 操作权限开关
          showText: '拒绝', // 操作按钮文本
          opinionsEnable: true, // 意见开关
        },
        {
          name: 'revert',
          operateEnable: true, // 操作权限开关
          showText: '回退', // 操作按钮文本
          opinionsEnable: true, // 意见开关
        },
        // {
        //   name: 'transfer',
        //   operateEnable: true, // 操作权限开关
        //   showText: '转交', // 操作按钮文本
        //   opinionsEnable: true, // 意见开关
        // },
      ],

      showPopover: false,
      showDialog: false,
    };
  },

  created() {
    location.search
      .replace('?', '')
      .split('&')
      .forEach((item) => {
        const [key, value] = item.split('=');
        if (key === 'taskId') {
          this.taskId = value;
        }
      });

    if (this.taskId) {
      this.getOperationPermissionDetail();
    }
  },

  methods: {
    async getOperationPermissionDetail() {
      const res = await this.$processV2.operationPermissionDetail({
        body: {
          taskId: this.taskId,
        },
      });

      this.permissionDetails = res.data;
    },

    // 同意
    onClickConsent() {
      // Dialog.confirm({
      //   title: '同意',
      //   message: '请输入审批意见',
      //   confirmButtonText: '提交',
      //   closeOnClickOverlay: true,
      //   getContainer: 'body',
      // });

      this.showDialog = true;
    }
  },

  render() {
    const { permissionDetails } = this;
    const hasPermission = permissionDetails?.length > 0;

    // 提交
    const submit = permissionDetails.find((item) => item.name === 'submit');
    // 同意
    const consent = permissionDetails.find((item) => item.name === 'consent');
    // 不同意
    const reject = permissionDetails.find((item) => item.name === 'reject');
    // 回退
    const revert = permissionDetails.find((item) => item.name === 'revert');
    // 转交
    const transfer = permissionDetails.find((item) => item.name === 'transfer');

    if (submit) {
      return (
        <div vShow={hasPermission} class={bem('wrap')}>
          <Button type="info" size="large" squareroud="round">
            {submit.showText}
          </Button>
        </div>
      );
    }

    const hasMore = revert || transfer;

    return (
      <div vShow={hasPermission} class={bem('wrap')}>
        {hasMore ? (
          <Popover
            vModel={this.showPopover}
            trigger="click"
            placement="top-start"
            scopedSlots={{
              reference: () => <div class={bem('more')}>{t('more')}</div>,
            }}
          >
            {revert ? <PopoverItem text={revert.showText} /> : null}
            {transfer ? <PopoverItem text={transfer.showText} /> : null}
          </Popover>
        ) : null}
        <div class={bem('operation', { center: !hasMore })}>
          {reject ? (
            <Button type="default" squareroud="round">
              {reject.showText}
            </Button>
          ) : null}
          {consent ? (
            <Button
              type="info"
              squareroud="round"
              onClick={this.onClickConsent}
            >
              {consent.showText}
            </Button>
          ) : null}
        </div>

        <Dialog
          vModel={this.showDialog}
          title="同意"
          message="请输入审批意见"
          showCancelButton
          showConfirmButton
          closeOnClickOverlay
          nomattershowfoot
        >
          <div class={bem('dialog')}>
            <div class={bem('dialog-message')}>请输入审批意见</div>
            <Input
              class={bem('dialog-input')}
              placeholder="请输入"
              inputAlign="left"
            />
          </div>
        </Dialog>
      </div>
    );
  },
});
