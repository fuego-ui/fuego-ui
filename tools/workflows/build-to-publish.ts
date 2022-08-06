// import process from 'node:process';
const sysprocess = require('process');
const { exec } = require('child_process');
const util = require('util');
// import { exec } from 'node:child_process';
// import util from 'node:util';
// promisify exec

const execPromise = util.promisify(exec);
const baseCmd = 'npm version';

async function buildToPublish() {
  let versionCmd = '';
  try {
    if (!process.env.npm_config_rev) {
      throw new Error('No Revision Type provided');
    }
    switch (process.env.npm_config_rev) {
      case 'major':
        versionCmd = baseCmd + ' major';
        break;
      case 'minor':
        versionCmd = baseCmd + ' minor';
        break;
      case 'patch':
        versionCmd = baseCmd + ' patch';
        break;
      default:
        throw new Error('No valid Revision Type provided');
    }

    // wait for version command to complete
    await execPromise(versionCmd);
    process.chdir('./../../');
    await execPromise('nx build fuego-ui');
    process.chdir('./dist/packages/fuego-ui');
    console.log(process.cwd());
  } catch (error) {
    console.log(error);
  }
}

buildToPublish();
