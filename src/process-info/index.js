import { createNamespace } from '../utils';
import dayjs from '../utils/dayjs';

const [createComponent, bem, t] = createNamespace('process-info');

export default createComponent({
  props: {},

  data() {
    return {
      detail: {},
      taskId: null,
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
      this.getProcessInfo();
    }
  },

  mounted() {
    if (this.inDesigner()) {
      this.detail = {
        processInstanceId: 'ac33c3f2-ba69-11ee-bb3f-fa9450476323',
        startBy: '张三',
        processStartTime: '2024-01-24T03:35:52.000Z',
        status: 'PENDING',
        currentNodeList: [
          {
            currentNode: '多人审批任务',
            currentAssignees: ['李四', '王五'],
            taskCreateTime: '2024-01-24T03:35:52.000Z',
          },
          {
            currentNode: '多人审批任务',
            currentAssignees: ['赵六'],
            taskCreateTime: '2024-01-24T03:35:52.000Z',
          },
        ],
      };
    }
  },

  methods: {
    async getProcessInfo() {
      if (this.$processV2) {
        const result = await this.$processV2.getProcessInstanceInfo({
          body: {
            taskId: this.taskId,
          },
        });
        this.detail = result.data || {};
      }
    },
  },

  render() {
    const {
      startBy,
      processStartTime: startTime,
      status,
      currentNodeList,
    } = this.detail;

    const nodes = (currentNodeList || [])
      .map((item) => item.currentNode)
      .join('，');
    const assignees = (currentNodeList || [])
      .map((item) => item.currentAssignees.join('，'))
      .join('，');

    return (
      <div class={bem()}>
        <div class={bem('card')}>
          <div class={bem('card-line')}>
            <div class={bem('card-label')}>{t('initiator')}</div>
            <div class={bem('card-content')}>{startBy || '-'}</div>
          </div>
          <div class={bem('card-line')}>
            <div class={bem('card-label')}>{t('startTime')}</div>
            <div class={bem('card-content')}>
              {startTime ? dayjs(startTime).format('YYYY-MM-DD HH:mm:ss') : '-'}
            </div>
          </div>
          <div class={bem('card-line')}>
            <div class={bem('card-label')}>{t('status')}</div>
            <div class={bem('card-content')}>{status || '-'}</div>
          </div>
          <div class={bem('card-line')}>
            <div class={bem('card-label')}>{t('node')}</div>
            <div class={bem('card-content')}>{nodes || '-'}</div>
          </div>
          <div class={bem('card-line')}>
            <div class={bem('card-label')}>{t('assignee')}</div>
            <div class={bem('card-content')}>{assignees || '-'}</div>
          </div>
        </div>
      </div>
    );
  },
});
