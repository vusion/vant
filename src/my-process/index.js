import _debounce from 'lodash/debounce';
import dayjs from '../utils/dayjs';
import { createNamespace } from '../utils';

import Tabs from '../tabs';
import Tab from '../tab';
import PullRefresh from '../pull-refresh';
import List from '../list';
import Iconv from '../iconv';

import Toolbar from './toolbar';

import mockData from './mock.json';

const [createComponent, bem, t] = createNamespace('my-process');

export default createComponent({
  data() {
    return {
      currentTab: 'myPendingTaskList',

      myPendingTaskList: [],
      myPendingTaskListTotal: 0,
      myPendingTaskListFinished: false,
      myPendingTaskListRefresh: false,
      myPendingTaskListFilter: {
        processDefUniqueKey: null,
        startBy: null,

        createTimeAfter: null, // 开始时间
        createTimeBefore: null, // 结束时间

        page: 1,
        size: 5,
      },

      myCompletedTaskList: [],
      myCompletedTaskListTotal: 0,
      myCompletedTaskListFinished: false,
      myCompletedTaskListFilter: {
        processDefUniqueKey: null,
        startBy: null,

        createTimeAfter: null, // 开始时间
        createTimeBefore: null, // 结束时间

        page: 1,
        size: 5,
      },

      myLaunchList: [],
      myLaunchListTotal: 0,
      myLaunchListFinished: false,
      myLaunchListFilter: {
        processDefUniqueKey: null,
        startBy: null,

        createTimeAfter: null, // 开始时间
        createTimeBefore: null, // 结束时间

        page: 1,
        size: 5,
      },
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
  },

  mounted() {
    if (this.inDesigner()) {
      this.myPendingTaskList = mockData.myPendingTaskList;
    }
  },

  methods: {
    async fetchData(type) {
      if (this.inDesigner()) return;

      const filter = this[`${type}Filter`];
      const { page, size, ...rest } = filter;

      let result;
      if (this.$processV2) {
        const body = {
          taskId: this.taskId,
          page,
          size,
        };
        Object.keys(rest).forEach((key) => {
          if (rest[key]) {
            body[key] = rest[key];
          }
        });
        const { data } = await this.$processV2.getMyTaskList({
          path: {
            taskType: type,
          },
          body,
        });

        result = data;
      } else {
        result = {
          list: mockData[type].slice((page - 1) * size, page * size),
          total: mockData[type].length,
        };
      }

      return result;
    },

    onLoad: _debounce(
      async function (type) {
        if (this.inDesigner()) return;

        if (this[`${type}Refresh`]) return;

        const result = await this.fetchData(type);
        const { list, total } = result;

        this[type].push(...list);
        this[`${type}Total`] = total;
        this[`${type}Finished`] = this[type].length >= total;
        this[`${type}Filter`].page += 1;
      },
      500,
      { leading: true, trailing: false }
    ),

    async reload(type) {
      // 重置分页
      this[`${type}Filter`].page = 1;

      const result = await this.fetchData(type);
      const { list, total } = result;
      this[type] = list;
      this[`${type}Total`] = total;
      this[`${type}Finished`] = this[type].length >= total;
      this[`${type}Filter`].page += 1;
      this[`${type}Refresh`] = false;
    },

    onToolbarChange(fields, tab) {
      if (this.currentTab === tab) {
        Object.assign(this[`${tab}Filter`], fields);

        this.reload(tab);
      }
    },

    async onGotoDetail(taskId) {
      const result = await this.$processV2.getTaskDestinationUrl({
        body: {
          taskId,
        },
      });
      const url = window.location.origin + result.data;
      window.location.href = url;
    },

    // 筛选工具区
    toolbarRender() {
      return <Toolbar tab={this.currentTab} onChange={this.onToolbarChange} />;
    },

    cardRender(data) {
      const {
        taskId,
        processTitle: title,
        processType: type,
        currentNodeList,
        startBy: initiator,
        processStartTime: startTime,
      } = data || {};

      const nodes = (currentNodeList || [])
        .map((item) => item.currentNode)
        .join('，');
      const assignees = (currentNodeList || [])
        .map((item) => item.currentAssignees.join('，'))
        .join('，');

      return (
        <div class={bem('item-card')} onClick={() => this.onGotoDetail(taskId)}>
          <div class={bem('item-card-title')}>
            {title}
            <Iconv name="right-arrow" size={12}></Iconv>
          </div>

          <div class={bem('item-card-line')}>
            <div class={bem('item-card-label')}>{t('type')}</div>
            <div class={bem('item-card-content')}>{type || '-'}</div>
          </div>
          <div class={bem('item-card-line')}>
            <div class={bem('item-card-label')}>{t('currentNode')}</div>
            <div class={bem('item-card-content')}>{nodes || '-'}</div>
          </div>
          <div class={bem('item-card-line')}>
            <div class={bem('item-card-label')}>{t('currentAssignee')}</div>
            <div class={bem('item-card-content')}>{assignees || '-'}</div>
          </div>
          <div class={bem('item-card-line')}>
            <div class={bem('item-card-label')}>{t('initiator')}</div>
            <div class={bem('item-card-content')}>{initiator || '-'}</div>
          </div>
          <div class={bem('item-card-line')}>
            <div class={bem('item-card-label')}>{t('startTime')}</div>
            <div class={bem('item-card-content')}>
              {dayjs(startTime).format('YYYY-MM-DD HH:mm:ss')}
            </div>
          </div>
        </div>
      );
    },
  },

  render() {
    return (
      <div class={bem()} value={this.currentTab}>
        <Tabs vModel={this.currentTab}>
          <Tab title={t('todo')} name="myPendingTaskList">
            {this.toolbarRender()}
            <PullRefresh
              vModel={this.myPendingTaskListRefresh}
              onRefresh={() => this.reload('myPendingTaskList')}
            >
              <List
                class={bem('list-view')}
                onLoad={() => this.onLoad('myPendingTaskList')}
                offset={50}
                finished={this.myPendingTaskListFinished}
              >
                {this.myPendingTaskList.map((item) => {
                  return this.cardRender(item);
                })}

                {!this.myPendingTaskList.length ? (
                  <div class={bem('list-view-empty')}>{t('empty')}</div>
                ) : null}
              </List>
            </PullRefresh>
          </Tab>
          <Tab title={t('done')} name="myCompletedTaskList">
            {this.toolbarRender()}

            <List
              class={bem('list-view')}
              onLoad={() => this.onLoad('myCompletedTaskList')}
              offset={50}
              finished={this.myCompletedTaskListFinished}
            >
              {this.myCompletedTaskList.map((item) => {
                return this.cardRender(item);
              })}

              {!this.myCompletedTaskList.length ? (
                <div class={bem('list-view-empty')}>{t('empty')}</div>
              ) : null}
            </List>
          </Tab>
          <Tab title={t('initiate')} name="myLaunchList">
            {this.toolbarRender()}

            <List
              class={bem('list-view')}
              onLoad={() => this.onLoad('myLaunchList')}
              offset={50}
              finished={this.myLaunchListFinished}
            >
              {this.myLaunchList.map((item) => {
                return this.cardRender(item);
              })}

              {!this.myLaunchList.length ? (
                <div class={bem('list-view-empty')}>{t('empty')}</div>
              ) : null}
            </List>
          </Tab>
        </Tabs>
      </div>
    );
  },
});
