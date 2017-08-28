/* eslint no-console: ["error", { allow: ["warn", "error"] }] */

const allowedVersions = ['EI', 'EII', 'EIII', 'EIV', 'ETri'];
const installedWorkers = [];

// where to put workers ?
// copy workers ?
// externals

const electre = {
  idle: true,
  start: function start(version) {
    if (!this.idle) {
      // error
    } else {
      this.idle = false;
      if (allowedVersions.indexOf(version) !== -1) {
        if (installedWorkers.indexOf(version) !== -1) {
          const RequiredWorker = require(`./workers/${version}.worker.js`); // eslint-disable-line
          installedWorkers[version] = new RequiredWorker();
          installedWorkers[version].onmessage = (e) => {
            const message = e.data.message;
            console.warn(message);
          };
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
