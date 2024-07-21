import { Command } from 'commander';

const program = new Command();
program
  .option('--mode <mode>', 'modo de trabajo', 'development')
  .parse();

console.log('Option: ', program.opts());

export default program;