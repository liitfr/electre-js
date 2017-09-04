/* eslint no-console: ["error", { allow: ["warn", "error"] }] */

// Joi is useful but makes bundles really heavy ...
// https://github.com/hapijs/joi/issues/528
import Joi from 'joi';

import MatrixOperations from '../utils/operations';
import Credibility from '../utils/credibility';
import Concordance from '../utils/concordance';
import Discordance from '../utils/discordance';

/** Worker that calculates ELECTRE I */

self.onmessage = (e) => {
  const inputData = e.data;

  const inputSchema = Joi.object().keys({
    numberOfCriterias: Joi.number()
      .min(1)
      .required(),
    numberOfAlternatives: Joi.number()
      .min(2)
      .required(),
    criterias: Joi.array()
      .unique()
      .items(Joi.string())
      .length(Joi.ref('numberOfCriterias'))
      .sparse(false)
      .required(),
    weights: Joi.array()
      .items(Joi.number())
      .length(Joi.ref('numberOfCriterias'))
      .sparse(false)
      .required(),
    alternatives: Joi.array()
      .unique()
      .min(2)
      .items(Joi.string())
      .length(Joi.ref('numberOfAlternatives'))
      .sparse(false)
      .required(),
    evaluations: Joi.array()
      .length(Joi.ref('numberOfAlternatives'))
      .items(
        Joi.array()
          .items(Joi.number())
          .length(Joi.ref('numberOfCriterias'))
          .sparse(false)
          .required(),
      )
      .sparse(false)
      .required(),
    cThreshold: Joi.number()
      .min(0)
      .max(1)
      .required(),
    dThreshold: Joi.number()
      .min(0)
      .max(1)
      .required(),
  });

  const validationResult = Joi.validate(inputData, inputSchema);

  if (validationResult.err) {
    throw new Error(`Input Schema doesn't respect specification. ${validationResult.err}`);
  }

  let i;
  let j;
  const credibility = Credibility.getCredibilityMatrixEI(
    inputData.evaluations, inputData.weights, inputData.cThreshold, inputData.dThreshold);

  // keep a copy of credibility square matrix
  const credibilityCopy = [];
  for (i = 0; i < credibility.length; i += 1) {
    const row = [];
    for (j = 0; j < credibility.length; j += 1) {
      row.push(credibility[i][j]);
    }
    credibilityCopy.push(row);
  }
  let credibilityVector = MatrixOperations.getColumnSum(credibility);
  const vector = Array(credibilityVector.length).fill(0);

  // First pass
  for (i = 0; i < credibilityVector.length; i += 1) {
    if (credibilityVector[i] === 0) {
      vector[i] = i + 1;
    }
  }
  let setKD = 0;
  if (MatrixOperations.getElementCountZero(credibilityVector) !== 0) {
    setKD = 1;
  }
  for (i = 0; i < vector.length; i += 1) {
    if (vector[i] === 0) {
      for (j = 0; j < credibility[0].length; j += 1) {
        credibility[i][j] = 0;
      }
    }
  }

  // Second pass
  credibilityVector = MatrixOperations.getColumnSum(credibility);
  for (i = 0; i < credibilityVector.length; i += 1) {
    if (credibilityVector[i] === 0) {
      vector[i] = i + 1;
    }
  }

  // Kernel & Dominated sets partition
  const elementCountZero = MatrixOperations.getElementCountZero(vector);
  const kernel = [];
  const dominated = [];

  if (elementCountZero === 0 && setKD === 1) {
    for (i = 0; i < vector.length; i += 1) {
      if (vector[i] > 0) {
        kernel.push(inputData.alternatives[i]);
      }
    }
  } else if (elementCountZero === 0 && setKD === 1) {
    for (i = 0; i < vector.length; i += 1) {
      if (vector[i] > 0) {
        dominated.push(inputData.alternatives[i]);
      }
    }
  } else if (elementCountZero !== 0) {
    for (i = 0; i < vector.length; i += 1) {
      if (vector[i] > 0) {
        kernel.push(inputData.alternatives[i]);
      } else {
        dominated.push(inputData.alternatives[i]);
      }
    }
  }

  const response = {
    inputData,
    concordance: Concordance.getConcordanceMatrixEI(inputData.evaluations, inputData.weights),
    discordance: Discordance.getDiscordanceMatrixEI(inputData.evaluations),
    credibility: credibilityCopy,
    kernel,
    dominated,
  };
  self.postMessage(response);
};
