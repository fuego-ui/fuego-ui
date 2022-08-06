// import process from 'node:process';
const sysprocess = require('process');
const { exec } = require('child_process');
const { spawn } = require('node:child_process');
const util = require('util');
// import { exec } from 'node:child_process';
// import util from 'node:util';
// promisify exec

const execPromise = util.promisify(exec);
const baseCmd = 'npm version';

async function buildLibrary() {
  console.info('Building Library...');
  const { stdout, stderr } = await execPromise('nx build fuego-ui');
  printOutput({ stdout, stderr });
  console.info('Library Built');
}

async function publishLibrary() {
  const { stdout, stderr } = await execPromise('npm publish');
  printOutput({ stdout, stderr });
  console.info('Library Published');
}

function getVersionCommand(type) {
  switch (type) {
    case 'major':
      return baseCmd + ' major';
    case 'minor':
      return baseCmd + ' minor';
    case 'patch':
      return baseCmd + ' patch';
    default:
      throw new Error('No valid Revision Type provided');
  }
}

function printOutput({ stdout = null, stderr = null }) {
  if (stdout) {
    console.log(`${stdout}`);
  }
  if (stderr) {
    console.log(`${stderr}`);
  }
}

async function buildToPublish() {
  try {
    if (!process.env.npm_config_rev) {
      throw new Error(
        'No Revision Type provided, provide --rev parameter with either "major", "minor" or "patch" as value'
      );
    }
    const versionCmd = getVersionCommand(process.env.npm_config_rev);

    // Npm Version
    console.log('Updating Version...');
    process.chdir('./packages/fuego-ui');
    await execPromise(versionCmd);
    console.log('Version Updated');

    // Library Build
    process.chdir('./../../');
    await buildLibrary();

    // Publish Library
    process.chdir('./dist/packages/fuego-ui');
    await publishLibrary();
  } catch (error) {
    console.log(error);
  }
}

buildToPublish();
