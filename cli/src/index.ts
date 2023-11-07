import { command, parse } from 'commander';

// commands
import { dev } from './commands/dev';
import { clean } from './commands/clean';
import { build } from './commands/build';
import { buildSite } from './commands/build-site';

command('dev')
  .description('Run webpack dev server')
  .action(dev);

command('clean')
  .description('Clean all dist files')
  .action(clean);

command('build')
  .description('Compile components in production mode')
  .option('--watch', 'Watch file change')
  .action(build);

command('build-site')
  .description('Compile site in production mode')
  .action(buildSite);

parse();
