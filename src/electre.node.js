/* eslint no-console: ["error", { allow: ["warn", "error"] }] */

const NodeWorker = require('tiny-worker');

const allowedVersions = ['EI', 'EII', 'EIII', 'EIV', 'ETri'];
const installedWorkers = [];

const electre = {
  idle: true,
  start: function start(version) {
    if (!this.idle) {
      // error
    } else {
      this.idle = false;
      if (allowedVersions.indexOf(version) !== -1) {
        if (installedWorkers.indexOf(version) !== -1) {
          installedWorkers[version] = new NodeWorker(`./workers/${version}.worker.js`);
        }
        // launch process
      } else {
        // ... error
      }
      this.idle = true;
    }
  },
  stop: function stop() {
    console.warn('todo');
  },
};

export default electre;
