/* eslint no-console: ["error", { allow: ["warn", "error"] }] */
/* eslint no-underscore-dangle: ["error", { "allowAfterThis": true }] */

/**
 * ELECTRE version for Node.js.
 * @module electre/web
 * @see module:electre/node
 */

export const name = 'web';

/**
 * List of supported ELECTRE versions.
 *
 * @type Array
 */

const allowedVersions = ['EI', 'EII', 'EIII', 'EIV', 'ETri'];

/**
 * List of installed workers.
 *
 * @type Array
 */

const installedWorkers = [];

/**
 * ELECTRE Calculator object for web.
 * @exports electre/web/electre
 * @namespace electre
 */

export const electre = {

  /**
   * Calculator's state.
   * @memberof electre
   * @type {boolean}
   */

  _idle: true,

  /**
   * Start calculation.
   * @memberof electre
   * @method start
   * @returns
   * @throws
   * @fires
   */

  start: function start(version) {
    if (!this._idle) {
      // error
    } else {
      this._idle = false;
      if (allowedVersions.indexOf(version) !== -1) {
        if (installedWorkers.indexOf(version) === -1) {
          const RequiredWorker = require(`./workers/${version}.worker.js`); // eslint-disable-line
          installedWorkers[version] = new RequiredWorker();
          installedWorkers[version].onmessage = (e) => {
            const message = e.data.message;
            console.warn(message);
          };
        }
        // launch process
        installedWorkers[version].postMessage({
          foo: 'bar',
          version,
        });
      } else {
        // ... error
      }
      this._idle = true;
    }
  },

  /**
   * Stop calculation.
   * @memberof electre
   * @method stop
   * @returns
   * @throws
   * @fires
   */

  stop: function stop() {
    console.warn('todo');
  },

};
