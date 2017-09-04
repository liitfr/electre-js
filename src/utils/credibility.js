import Concordance from './concordance';
import Discordance from './discordance';

/**
 * Credibility calculation module
 * @module electre/utils/credibility
 */

/**
 * Credibility class
 *
 * @class
 * @memberof module:electre/utils/credibility
 */
class Credibility {
  /**
   * getCredibilityMatrixEI
   * @param {number[][]} array
   * @param {number[]} weights
   * @param {number} p strong preference
   * @param {number} q weak preference
   * @returns {number[][]}
   */

  static getCredibilityMatrixEI(array, weights, p, q) {
    const arrayCredM = [];
    const arrayCM = Concordance.getConcordanceMatrixEI(array, weights);
    const arrayDM = Discordance.getDiscordanceMatrixEI(array);

    let i;
    for (i = 0; i < array.length; i += 1) {
      let j;
      const row = [];
      for (j = 0; j < array.length; j += 1) {
        if (i === j) {
          row.push(0);
        } else if (arrayCM[i][j] >= p && arrayDM[i][j] <= q) {
          row.push(1);
        } else {
          row.push(0);
        }
      }
      arrayCredM.push(row);
    }
    return arrayCredM;
  }
}

export {
  /**
   * Credibility class
   */
  Credibility as default };
