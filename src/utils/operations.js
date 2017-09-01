/**
 * Matrix Operations module.
 * @module electre/utils/operations
 */

/** MatrixOperations class */
class MatrixOperations {
  /**
   * getWeightsSum.
   * @memberof MatrixOperations
   * @method getWeightsSum
   * @static
   * @param {number[]} array
   * @returns {number}
   */

  static getWeightsSum(array) {
    let sum = 0;
    let i;
    for (i = 0; i < array.length; i += 1) {
      sum += array[i];
    }
    return sum;
  }

  /**
   * getCriterionSum.
   * @memberof MatrixOperations
   * @method getCriterionSum
   * @static
   * @param {number[][]} array
   * @param {number} j
   * @returns {number}
   */

  static getCriterionSum(array, j) {
    let sum = 0;
    let i;
    for (i = 0; i < array[0].length; i += 1) {
      sum += array[i][j];
    }
    return sum;
  }

  /**
   * getNormalizedWeigths.
   * @memberof MatrixOperations
   * @method getNormalizedWeigths
   * @static
   * @param {number[]} array
   * @returns {number[]}
   */

  static getNormalizedWeigths(array) {
    const arrayNW = [];
    const sum = this.getWeightsSum(array);
    let i;
    for (i = 0; i < array.length; i += 1) {
      arrayNW[i] = array[i] / sum;
    }
    return arrayNW;
  }

  /**
   * getColumnSum.
   * @memberof MatrixOperations
   * @method getColumnSum
   * @static
   * @param {number[][]} array
   * @returns {number[]}
   */

  static getColumnSum(array) {
    const arrayC = [];
    let j;
    for (j = 0; j < array[0].length; j += 1) {
      let i;
      for (i = 0; i < array.length; i += 1) {
        arrayC[j] += array[i][j];
      }
    }
    return arrayC;
  }

  /**
   * getRowSum.
   * @memberof MatrixOperations
   * @method getRowSum
   * @static
   * @param {number[][]} array
   * @returns {number[]}
   */

  static getRowSum(array) {
    const arrayR = [];
    let i;
    for (i = 0; i < array.length; i += 1) {
      let j;
      for (j = 0; j < array[0].length; j += 1) {
        arrayR[i] += array[i][j];
      }
    }
    return arrayR;
  }

  /**
   * getNormalizedPerformanceMatrix.
   * @memberof MatrixOperations
   * @method getNormalizedPerformanceMatrix
   * @static
   * @param {number[][]} array
   * @returns {number[][]}
   */

  static getNormalizedPerformanceMatrix(array) {
    const arrayNPM = Array(array.length).fill(Array(array[0].length));
    const a = this.getColumnSum(array);
    let j;
    for (j = 0; j < array[0].length; j += 1) {
      let i;
      for (i = 0; i < array.length; i += 1) {
        arrayNPM[i][j] = array[i][j] / a[j];
      }
    }
    return arrayNPM;
  }

  /**
   * getMaxValueInColumn.
   * @memberof MatrixOperations
   * @method getMaxValueInColumn
   * @static
   * @param {number[][]} array
   * @returns {number[]}
   */

  static getMaxValueInColumn(array) {
    const arrayMax = [];
    let j;
    for (j = 0; j < array[0].length; j += 1) {
      let max = array[0][j];
      let i;
      for (i = 0; i < array.length; i += 1) {
        if (array[i][j] >= max) {
          max = array[i][j];
          arrayMax[j] = array[i][j];
        }
      }
    }
    return arrayMax;
  }

  /**
   * getMaxValueInColumnJ.
   * @memberof MatrixOperations
   * @method getMaxValueInColumnJ
   * @static
   * @param {number[][]} array
   * @param {number} j
   * @returns {number}
   */

  static getMaxValueInColumnJ(array, j) {
    let max = -100001;
    let i;
    for (i = 0; i < array.length; i += 1) {
      if (array[i][j] >= max) {
        max = array[i][j];
      }
    }
    return max;
  }

  /**
   * getMinValueInColumn.
   * @memberof MatrixOperations
   * @method getMinValueInColumn
   * @static
   * @param {number[][]} array
   * @returns {number[]}
   */

  static getMinValueInColumn(array) {
    const arrayMin = [];
    let j;
    for (j = 0; j < array[0].length; j += 1) {
      let min = array[0][j];
      let i;
      for (i = 0; i < array.length; i += 1) {
        if (array[i][j] <= min) {
          min = array[i][j];
          arrayMin[j] = array[i][j];
        }
      }
    }
    return arrayMin;
  }

  /**
   * getMinValueInColumnJ.
   * @memberof MatrixOperations
   * @method getMinValueInColumnJ
   * @static
   * @param {number[][]} array
   * @param {number} j
   * @returns {number}
   */

  static getMinValueInColumnJ(array, j) {
    let min = 100001;
    let i;
    for (i = 0; i < array.length; i += 1) {
      if (array[i][j] <= min) {
        min = array[i][j];
      }
    }
    return min;
  }

  /**
   * getMaxValueInRowSorting.
   * @memberof MatrixOperations
   * @method getMaxValueInRowSorting
   * @static
   * @param {number[]} array
   * @returns {number}
   */

  static getMaxValueInRowSorting(array) {
    array.sort((a, b) => a - b);
    const max = array[array.length - 1];
    return max;
  }

  /**
   * getMaxValueInRowNonSorting.
   * @memberof MatrixOperations
   * @method getMaxValueInRowNonSorting
   * @static
   * @param {number[]} array
   * @returns {number}
   */

  static getMaxValueInRowNonSorting(array) {
    let max = -100001;
    let i;
    if (array.length === 1) {
      max = array[0];
    }
    for (i = 0; i < array.length; i += 1) {
      if (max < array[i]) {
        max = array[i];
      }
    }
    return max;
  }

  /**
   * getMinValueInRowNonSorting.
   * @memberof MatrixOperations
   * @method getMinValueInRowNonSorting
   * @static
   * @param {number[]} array
   * @returns {number}
   */

  static getMinValueInRowNonSorting(array) {
    let min = 100001;
    let i;
    for (i = 0; i < array.length; i += 1) {
      if (min > array[i]) {
        min = array[i];
      }
    }
    return min;
  }

  /**
   * getDelta.
   * @memberof MatrixOperations
   * @method getDelta
   * @static
   * @param {number[][]} array
   * @returns {number[]}
   */

  static getDelta(array) {
    const arrayDelta = [];
    const a = this.getMaxValueInColumn(array);
    const b = this.getMinValueInColumn(array);
    let i;
    for (i = 0; i < array[0].length; i += 1) {
      arrayDelta[i] = a[i] - b[i];
    }
    return arrayDelta;
  }

  /**
   * getElementCountZero.
   * @memberof MatrixOperations
   * @method getElementCountZero
   * @static
   * @param {number[]} array
   * @returns {number}
   */

  static getElementCountZero(array) {
    let elementcount = 0;
    let i;
    for (i = 0; i < array.length; i += 1) {
      if (array[i] === 0) {
        elementcount += 1;
      }
    }
    return elementcount;
  }

  /**
   * get2DElementCountSpecificValue.
   * @memberof MatrixOperations
   * @method get2DElementCountSpecificValue
   * @static
   * @param {number[][]} array
   * @param {number} b
   * @returns {number}
   */

  static get2DElementCountSpecificValue(array, b) {
    let elementcount = 0;
    let i;
    for (i = 0; i < array.length; i += 1) {
      let j;
      for (j = 0; j < array[0].length; j += 1) {
        if (array[i][j] === b) {
          elementcount += 1;
        }
      }
    }
    return elementcount;
  }

  /**
   * get2DElementCountSpecificValue.
   * @memberof MatrixOperations
   * @method get2DElementCountSpecificValue
   * @static
   * @param {number[][]} array
   * @returns {number[][]}
   */

  static getTransposed2DMatrix(array) {
    const arrayT2D = Array(array[0].length).fill(Array(array.length));
    let i;
    for (i = 0; i < array.length; i += 1) {
      let j;
      for (j = 0; j < array[0].length; j += 1) {
        arrayT2D[j][i] = array[i][j];
      }
    }
    return arrayT2D;
  }

  /**
   * get2DMatrixSum.
   * @memberof MatrixOperations
   * @method get2DMatrixSum
   * @static
   * @param {number[][]} array1
   * @param {number[][]} array2
   * @returns {number[][]}
   */

  static get2DMatrixSum(array1, array2) {
    const arrayS2D = Array(array1.length).fill(Array(array1[0].length));
    let i;
    for (i = 0; i < array1.length; i += 1) {
      let j;
      for (j = 0; j < array1[0].length; j += 1) {
        arrayS2D[i][j] = array1[i][j] + array2[i][j];
      }
    }
    return arrayS2D;
  }

  /**
   * get2DMatrixTotalSum.
   * @memberof MatrixOperations
   * @method get2DMatrixTotalSum
   * @static
   * @param {number[][]} array
   * @returns {number}
   */

  static get2DMatrixTotalSum(array) {
    let total = 0;
    let i;
    for (i = 0; i < array.length; i += 1) {
      let j;
      for (j = 0; j < array[0].length; j += 1) {
        total += array[i][j];
      }
    }
    return total;
  }

  /**
   * get2DDirectMatrixMult.
   * @memberof MatrixOperations
   * @method get2DDirectMatrixMult
   * @static
   * @param {number[][]} array1
   * @param {number[][]} array2
   * @returns {number[][]}
   */

  static get2DDirectMatrixMult(array1, array2) {
    const arrayM2D = Array(array1.length).fill(Array(array1.length));
    let i;
    for (i = 0; i < array1.length; i += 1) {
      let j;
      for (j = 0; j < array1[0].length; j += 1) {
        arrayM2D[i][j] = array1[i][j] * array2[i][j];
      }
    }
    return arrayM2D;
  }

  /**
   * get2DRemoveRow.
   * @memberof MatrixOperations
   * @method get2DRemoveRow
   * @static
   * @param {number[][]} array1
   * @param {number} row
   * @returns {number[][]}
   */

  static get2DRemoveRow(array1, row) {
    const arrayRD = Array(array1.length - 1).fill(Array(array1[0].length));
    let p = 0;
    let i;
    for (i = 0; i < array1.length; i += 1) {
      if (i !== row) {
        let q = 0;
        let j;
        for (j = 0; j < array1[0].length; j += 1) {
          arrayRD[p][q] = array1[i][j];
          q += 1;
        }
        p += 1;
      }
    }
    return arrayRD;
  }

  /**
   * get2DSearchString.
   * @memberof MatrixOperations
   * @method get2DSearchString
   * @static
   * @param {string} R
   * @param {string} C
   * @param {string[][]} array
   * @returns {string}
   */

  static get2DSearchString(R, C, array) {
    let value = 'Not Found!';
    let i;
    for (i = 1; i < array.length; i += 1) {
      let j;
      for (j = 1; j < array[0].length; j += 1) {
        if (array[i][0].equals(R) && array[0][j].equals(C)) {
          value = array[i][j];
          break;
        }
      }
    }
    return value;
  }

  /**
   * get2DSearchStringUpper.
   * @memberof MatrixOperations
   * @method get2DSearchStringUpper
   * @static
   * @param {string} R
   * @param {string} C
   * @param {string[][]} array
   * @returns {string}
   */

  static get2DSearchStringUpper(R, C, array) {
    let value = 'Not Found!';
    let i;
    for (i = 1; i < array.length; i += 1) {
      let j;
      for (j = i + 1; j < array[0].length; j += 1) {
        if (array[i][0].equals(R) && array[0][j].equals(C)) {
          value = array[i][j];
          break;
        }
      }
    }
    return value;
  }

  /**
   * get2DRemoveColumn.
   * @memberof MatrixOperations
   * @method get2DRemoveColumn
   * @static
   * @param {number[][]} array1
   * @param {number} column
   * @returns {number[][]}
   */

  static get2DRemoveColumn(array1, column) {
    const arrayRD = Array(array1.length).fill(Array(array1[0].length - 1));
    let p = 0;
    let i;
    for (i = 0; i < array1.length; i += 1) {
      let q = 0;
      let j;
      for (j = 0; j < array1[0].length; j += 1) {
        if (j !== column) {
          arrayRD[p][q] = array1[i][j];
          q += 1;
        }
      }
      p += 1;
    }
    return arrayRD;
  }

  /**
   * get2DRemoveColumnString.
   * @memberof MatrixOperations
   * @method get2DRemoveColumnString
   * @static
   * @param {number[][]} array1
   * @param {number} column
   * @returns {number[][]}
   */

  static get2DRemoveColumnString(array1, column) {
    const arrayRD = Array(array1.length).fill(Array(array1[0].length - 1));
    let p = 0;
    let i;
    for (i = 0; i < array1.length; i += 1) {
      let q = 0;
      let j;
      for (j = 0; j < array1[0].length; j += 1) {
        if (j !== column) {
          arrayRD[p][q] = array1[i][j];
          q += 1;
        }
      }
      p += 1;
    }
    return arrayRD;
  }

  /**
   * get2DRemoveRowString.
   * @memberof MatrixOperations
   * @method get2DRemoveRowString
   * @static
   * @param {string[][]} array1
   * @param {number} row
   * @returns {string[][]}
   */

  static get2DRemoveRowString(array1, row) {
    const arrayRD = Array(array1.length - 1).fill(Array(array1[0].length));
    let p = 0;
    let i;
    for (i = 0; i < array1.length; i += 1) {
      if (i !== row) {
        let q = 0;
        let j;
        for (j = 0; j < array1[0].length; j += 1) {
          arrayRD[p][q] = array1[i][j];
          q += 1;
        }
        p += 1;
      }
    }
    return arrayRD;
  }
}

export { MatrixOperations as default };
