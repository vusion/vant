### 基础用法

```html
<van-cascader
  title="请选择"
  converter="json"
  labelField="级联选择"
  input-align="left"
  
  :tree-display="true"
  parent-field="parentId"
><template #title>标题</template></van-cascader>
```
