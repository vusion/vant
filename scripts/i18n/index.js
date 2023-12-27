const fs = require('fs');
const path = require('path');
const zh = require('../../src/locale/lang/zh-CN/data.json');


const i18n = {
  'zh-CN': zh
}

// 写入i8n.json文件到dist-theme
fs.writeFileSync(path.resolve(__dirname, '../../dist-theme/i18n.json'), JSON.stringify(i18n, null, 2), 'utf8');
