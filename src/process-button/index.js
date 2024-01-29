import { createNamespace } from '../utils';

import Button from '../button';
import Popover from '../popover';
import Dialog from '../dialog/Dialog';
import Form from '../form';
import Field from '../field';
import Input from '../fieldinput';
import Picker from '../pickerson';

const [createComponent, bem, t] = createNamespace('process-button');

export default createComponent({
  props: {
    target: { type: String, default: '_self' },
    destination: String,
    link: [String, Function],
  },

  data() {
    return {
      taskId: null,
      permissionDetails: [],

      showPopover: false,
      showDialog: false,

      dialog: {
        item: null,
        message: '',

        value: '',
        usePicker: false,
      },
    };
  },

  created() {
    if (this.inDesigner()) {
      return;
    }

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

  mounted() {
    if (this.inDesigner()) {
      this.permissionDetails = [
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
        {
          name: 'transfer',
          operateEnable: true, // 操作权限开关
          showText: '转交', // 操作按钮文本
          opinionsEnable: true, // 意见开关
        },
      ]
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

    async submit(item) {
      const operate = `${item.name}TaskInstance`;
      const body = {
        taskId: this.taskId,
      };
      if (item.name === 'transfer') {
        body.userName = this.dialog.value;
      } else {
        body.comment = this.dialog.value;
      }

      if (this.$processV2) {
        await this.$processV2.setTaskInstance({
          path: {
            operate,
          },
          body,
        });
      }
    },

    async confirm() {
      const { item } = this.dialog;

      const isValid = await this.checkValue();
      if (!isValid) {
        return;
      }

      await this.submit(item);
      this.showDialog = false;

      if (this.destination || this.link) {
        this.$refs.link.$el.click();
      } else {
        window.location.reload();
      }
    },

    async checkValue() {
      let isValid = true;

      const result = await this.$refs.form.validate();

      isValid = result.valid;

      return isValid;
    },

    async beforeClose(action, done) {
      if (action === 'confirm') {
        const isValid = await this.checkValue();
        if (!isValid) {
          done(false);
        } else {
          done(true);
        }
      } else {
        done(true);
      }
    },

    // 提交
    async onClickSubmit(submit) {
      await this.submit(submit);

      if (this.destination || this.link) {
        this.$refs.link.$el.click();
      } else {
        window.location.reload();
      }
    },

    // 同意
    onClickConsent(consent) {
      this.dialog = {
        item: consent,
        message: '请输入审批意见',
      };
      this.showDialog = true;
    },

    // 不同意
    onClickReject(reject) {
      this.dialog = {
        item: reject,
        message: '请输入审批意见',
      };
      this.showDialog = true;
    },

    // 回退
    onClickRevert(revert) {
      this.dialog = {
        item: revert,
        message: '请输入审批意见',
      };
      this.showDialog = true;
    },

    // 转交
    onClickTransfer(transfer) {
      this.dialog = {
        item: transfer,
        message: '请输入转交人',
        usePicker: true,
      };
      this.showDialog = true;
    },

    onInput(event) {
      this.dialog.value = event.target.value;
    },

    onPickerConfirm(value) {
      this.dialog.value = value;
    },

    resetDialog() {
      this.dialog = {
        item: {},
        message: '',
        value: '',
        usePicker: false,
      };
    },
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
          <Button
            type="info"
            size="large"
            squareroud="round"
            onClick={() => this.onClickSubmit(submit)}
          >
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
            {revert ? (
              <div
                class={bem('popover-item')}
                onClick={() => this.onClickRevert(revert)}
              >
                {revert.showText}
              </div>
            ) : null}
            {transfer ? (
              <div
                class={bem('popover-item')}
                onClick={() => this.onClickTransfer(transfer)}
              >
                {transfer.showText}
              </div>
            ) : null}
          </Popover>
        ) : null}
        <div class={bem('operation', { center: !hasMore })}>
          {reject ? (
            <Button
              type="default"
              squareroud="round"
              onClick={() => this.onClickReject(reject)}
            >
              {reject.showText}
            </Button>
          ) : null}
          {consent ? (
            <Button
              type="info"
              squareroud="round"
              onClick={() => this.onClickConsent(consent)}
            >
              {consent.showText}
            </Button>
          ) : null}
        </div>

        <van-link
          ref="link"
          class={bem('link')}
          destination={this.destination}
          target={this.target}
          link={this.link}
        ></van-link>

        <Dialog
          vModel={this.showDialog}
          title={this.dialog.item?.showText}
          onConfirm={this.confirm}
          onClosed={this.resetDialog}
          beforeClose={this.beforeClose}
          showCancelButton
          showConfirmButton
          closeOnClickOverlay
          nomattershowfoot
        >
          <div class={bem('dialog')}>
            <div class={bem('dialog-message')}>{this.dialog.message}</div>
            <Form ref="form">
              {this.dialog.usePicker && (
                <Field
                  rules={[
                    {
                      validate: 'filled',
                      message: `选择框不得为空`,
                      trigger: 'input+blur',
                      required: true,
                    },
                  ]}
                  scopedSlots={{
                    input: () => (
                      <Picker
                        value={this.dialog.value}
                        class={bem('dialog-picker')}
                        dataSource={[1, 2, 3, 4, 5, 6]}
                        onConfirm={this.onPickerConfirm}
                        placeholder="请选择"
                        title=""
                        showToolbar
                        closeOnClickOverlay
                        inputAlign="left"
                      />
                    ),
                  }}
                />
              )}

              {!this.dialog.usePicker && (
                <Field
                  rules={[
                    {
                      validate: 'filled',
                      message: `输入框不得为空`,
                      trigger: 'input+blur',
                      required: true,
                    },
                  ]}
                  scopedSlots={{
                    input: () => (
                      <Input
                        value={this.dialog.value}
                        onInput={this.onInput}
                        class={bem('dialog-input')}
                        placeholder="请输入"
                        inputAlign="left"
                      />
                    ),
                  }}
                ></Field>
              )}
            </Form>
          </div>
        </Dialog>
      </div>
    );
  },
});
