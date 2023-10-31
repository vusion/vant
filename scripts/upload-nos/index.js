const { NosClient } = require('@xgheaven/nos-node-sdk');
const fs = require('fs');
const path = require('path');
const minimist = require('minimist');

// 从执行命令中获取参数
// node scripts/upload-nos/index.js --version ${{ env.VERSION }} --bucket ${{ secrets.NOS_BUCKET }} --access-key-id ${{ secrets.NOS_ACCESS_KEY_ID }} --access-key-secret ${{ secrets.NOS_ACCESS_KEY_SECRET }}
const argv = minimist(process.argv.slice(2));
const accessKey = argv['access-key-id'];
const accessSecret = argv['access-key-secret'];
const defaultBucket = argv.bucket;

const client = new NosClient({
  accessKey,
  accessSecret,
  endpoint: 'http://nos-eastchina1.126.net', // endpoint，不同地域不同
  defaultBucket,
});

const tgzName = `lcap-mobile-ui-${argv.version}.tgz`;
const tgzPath = path.resolve(__dirname, '../../', tgzName);

if (fs.existsSync(tgzPath)) {
  const objectKey = `mobile-ui/${tgzName}`;
  const fileinfo = fs.readFileSync(tgzPath);

  client
    .putObject({
      objectKey,
      body: Buffer.from(fileinfo),
    })
    .then(() => {
      console.log(`NosClient: 上传成功 --------> ${objectKey}`);
    })
    .catch((error) => {
      console.log(`NosClient: 上传失败 --------> ${objectKey} Error:`, error);
    });
}
