const { genPackageEntry } = require('@vant/cli/lib/compiler/gen-package-entry');
const path = require('path');

genPackageEntry({
    outputPath: path.resolve(__dirname, 'package-entry.js')
});
console.log('生成测试入口成功！')
