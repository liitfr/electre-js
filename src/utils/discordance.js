import MatrixOperations from './operations';

/**
 * Discordance calculation module
 * @module electre/utils/discordance
 */

/**
 * Discordance class
 *
 * @class
 * @memberof module:electre/utils/discordance
 */
class Discordance {
  /**
   * getDiscordanceMatrixEI
   * @param {number[][]} array
   * @returns {number[][]}
   */

  static getDiscordanceMatrixEI(array) {
    const arrayN = MatrixOperations.getNormalizedPerformanceMatrix(array);
    const arrayDM = [];
    const arrayDMTemp = Array(array[0].length).fill(0);
    const arrayDelta = MatrixOperations.getDelta(arrayN);
    const delta = MatrixOperations.getMaxValueInRowSorting(arrayDelta);

    let i;
    let j;
    for (i = 0; i < array.length; i += 1) {
      const row = [];
      for (j = 0; j < array.length; j += 1) {
        if (i === j) {
          row.push(0);
        } else {
          let k;
          for (k = 0; k < array[0].length; k += 1) {
            arrayDMTemp[k] = (arrayN[j][k] - arrayN[i][k]);
          }

          arrayDMTemp.sort((a, b) => a - b);

          if (arrayDMTemp[arrayDMTemp.length - 1] >= 0) {
            row.push(arrayDMTemp[arrayDMTemp.length - 1] / delta);
          } else {
            row.push(0);
          }
        }
      }
      arrayDM.push(row);
    }
    return arrayDM;
  }
}

export {
  /**
   * Discordance class
   */
  Discordance as default };
