import { createNamespace } from "../utils";
import DataSourceMixin from "../mixins/DataSource";

import PullRefresh from "../pull-refresh";

const [createComponent, bem] = createNamespace("list-view");

export default createComponent({
  mixins: [DataSourceMixin],
  render() {
    return <div class={bem()}></div>;
  },
});
