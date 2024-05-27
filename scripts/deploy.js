const vusion = require('vusion-api');
const argv = require('minimist')(process.argv.slice(2));

let commandTgz = `node bin/deploy-lcp-tgz`;
let commandDist = `lcap deploy dist-theme`;
let commandImage = `node bin/deploy-lcp-images`;

if (argv.platform) {
  commandTgz += ` --platform ${argv.platform}`;
  commandDist += ` --platform ${argv.platform}`;
  commandImage += ` --platform ${argv.platform}`;
}

if (argv.username) {
  commandTgz += ` --username ${argv.username}`;
  commandDist += ` --username ${argv.username}`;
  commandImage += ` --username ${argv.username}`;
}

if (argv.password) {
  commandTgz += ` --password ${argv.password}`;
  commandDist += ` --password ${argv.password}`;
  commandImage += ` --password ${argv.password}`;
}

vusion.cli.execSync(commandTgz);
vusion.cli.execSync(commandDist);
vusion.cli.execSync(commandImage);
