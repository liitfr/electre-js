/* eslint no-console: ["error", { allow: ["warn", "error"] }] */

// Joi makes bundle really, really heavy ...
// https://github.com/hapijs/joi/issues/528
import Joi from 'joi';
// import MatrixOperations from '../utils/operations';
import Credibility from '../utils/credibility';
import Concordance from '../utils/concordance';
import Discordance from '../utils/discordance';

/** Worker that calculates ELECTRE I */

self.onmessage = (e) => {
  // properties     type              rules
  // alternatives   array of strings  = input.alternatives
  // concordance    array of arrays   square matrix n * n where
  //                of numbers        n = alternatives size
  // discordance    array of arrays   square matrix n * n where
  //                of numbers        n = alternatives size
  // credibility    array of arrays   square matrix n * n where
  //                of numbers        n = alternatives size.
  //                                  Values = 0 || 1
  // kernel         array of strings  partition of alternatives
  // dominated      array of strings  partition of alternatives
  //
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

  const credibility = Credibility.getCredibilityMatrixEI(
    inputData.evaluations, inputData.weights, inputData.cThreshold, inputData.dThreshold);

  // const credibilityVector = MatrixOperations.getColumnSum(credibility);

  const response = {
    inputData,
    concordance: Concordance.getConcordanceMatrixEI(inputData.evaluations, inputData.weights),
    discordance: Discordance.getDiscordanceMatrixEI(inputData.evaluations),
    credibility,
    kernel: [],
    dominated: [],
  };
  self.postMessage(response);
};
