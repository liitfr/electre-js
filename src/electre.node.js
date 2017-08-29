/* eslint no-console: ["error", { allow: ["warn", "error"] }] */
/* eslint no-underscore-dangle: ["error", { "allowAfterThis": true }] */

import * as NodeWorker from 'tiny-worker';

/**
 * ELECTRE version for Node.js.
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
 * ELECTRE Calculator object for node.
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
        if (installedWorkers.indexOf(version) !== -1) {
          installedWorkers[version] = new NodeWorker(`./workers/${version}.worker.js`);
        }
        // launch process
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
