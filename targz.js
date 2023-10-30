const { execSync } = require('child_process');
const { version } = require('./package.json');


// 创建临时目录mobile-ui
execSync(`mkdir -p mobile-ui`);

const files = [
  'package.json',
  'dist-theme'
]

// 遍历文件列表，拷贝文件到mobile-ui
files.forEach(file => {
  execSync(`cp -r ${file} mobile-ui`);
});

// 打包mobile-ui
const cmd = `tar -cvf mobile-ui.${version}.tar.gz mobile-ui/package.json mobile-ui/dist-theme`;
execSync(cmd);

// 删除临时目录mobile-ui
execSync(`rm -rf mobile-ui`);
