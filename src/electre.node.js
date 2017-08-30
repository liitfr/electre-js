/* eslint no-console: ["error", { allow: ["warn", "error"] }] */
/* eslint no-underscore-dangle: ["error", { "allowAfterThis": true }] */

import Worker from 'tiny-worker';

/**
 * ELECTRE for Node.js usage.
 * @module electre/node
 * @see module:electre/web
 */

export const name = 'node';

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
 * ELECTRE Calculator object for Node.js.
 * @type {object}
 * @exports electre/node/electre
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
   * Current ELECTRE version requested.
   * @memberof electre
   * @type {string}
   */

  _version: null,

  /**
   * Promise object returned by caculator.
   * @memberof electre
   * @type {Promise}
   */

  _promise: null,

  /**
   * Start calculation.
   * @memberof electre
   * @method start
   * @param {string} version Version of ELECTRE to use
   * @param {object} inputData All data needed by requested worker
   * (the latter will check that data are valid)
   * @returns {Promise.<object>} ELECTRE resolution
   * @throws
   * @fires
   */

  start: function start(version, inputData) {
    if (!this._idle) {
      throw new Error('Calculator is already busy 👯');
    } else {
      this._idle = false;
      if (allowedVersions.indexOf(version) !== -1) {
        // Create a new Promise that will be returned
        this._promise = new Promise((resolve, reject) => {
          if (installedWorkers.indexOf(version) === -1) {
            installedWorkers[version] = new Worker(`./workers/${version}.worker.js`);
            // callback when web worker's calculation is finished
            installedWorkers[version].onmessage = (e) => {
              resolve(e.data);
              this._idle = true;
            };
            // callback when web worker encountered an error
            installedWorkers[version].onerror = (err) => {
              reject(new Error(err.message));
              this._idle = true;
            };
          }
          // define current version
          this._version = version;
          // Now we can start calculation by calling web worker
          installedWorkers[version].postMessage(inputData);
        });
        return this._promise;
      }
      throw new Error('This version of ELECTRE isn\'t supported 👀');
    }
  },

  /**
   * Kill runing calculation 🔫
   * @memberof electre
   * @method kill
   * @throws
   * @fires
   */

  kill: function kill() {
    if (!this._idle) {
      // terminate
      installedWorkers[this._version].terminate();
      this._promise.reject(new Error('Calculation has been killed 🔫'));
    }
    throw new Error('There\'s no calculation to kill 👀');
  },

};
