/* eslint import/no-extraneous-dependencies: ["error", {"devDependencies": true}] */

import test from 'ava';
import electre from '../lib/electre.node.min';

const params = {
  version: 'EI',
  inputData: {
    numberOfCriterias: 4,
    numberOfAlternatives: 5,
    criterias: ['g1', 'g2', 'g3', 'g4'],
    weights: [2, 1, 5, 3],
    alternatives: ['a1', 'a2', 'a3', 'a4', 'a5'],
    evaluations: [
      [150, 1, 20, 3000],
      [300, 0, 10, 0],
      [250, 0, 10, 2250],
      [110, 1, 20, 2800],
      [120, 1, 50, 1000],
    ],
    cThreshold: 0.7,
    dThreshold: 0.6,
  },
};

const expected = {
  alternatives: ['a1', 'a2', 'a3', 'a4', 'a5'],
  concordance: [
    [0.0000, 0.8182, 0.8182, 1.0000, 0.5455],
    [0.1818, 0.0000, 0.7273, 0.1818, 0.1818],
    [0.1818, 0.8182, 0.0000, 0.1818, 0.4545],
    [0.5455, 0.8182, 0.8182, 0.0000, 0.3636],
    [0.5455, 0.8182, 0.5455, 0.7273, 0.0000],
  ],
  discordance: [
    [0.0000, 0.4435, 0.2957, 0.0000, 0.7500],
    [0.9167, 0.0000, 0.6837, 0.9167, 1.0000],
    [0.9167, 0.1478, 0.0000, 0.9167, 1.0000],
    [0.1183, 0.5618, 0.4140, 0.0000, 0.7500],
    [0.6077, 0.5323, 0.3844, 0.5470, 0.0000],
  ],
  credibility: [
    [0, 1, 1, 1, 0],
    [0, 0, 0, 0, 0],
    [0, 1, 0, 0, 0],
    [0, 1, 1, 0, 0],
    [0, 1, 0, 1, 0],
  ],
  kernel: ['a1', 'a5'],
  dominated: ['a2', 'a3', 'a4'],
};

test('Node - EI worker - Execute', async (t) => {
  const calculation = await electre.start(params.version, params.inputData);
  console.warn(calculation.credibility);
  t.is(calculation.result, expected.result);
});

test('Node - EI worker - No parallel execution allowed', async (t) => {
  electre.start(params.version, params.inputData).then(() => {}, () => {});
  t.throws(() => electre.start(params.version, params.inputData));
});

test('Node - EI worker - Serial executions allowed', async (t) => {
  electre.kill();
  await electre.start(params.version, params.inputData);
  await electre.start(params.version, params.inputData);
  t.pass();
});

test.todo('Node - EI worker - correct input parameters');

test.todo('Node - EI worker - incorrect input parameters');

test.todo('Node - EI worker - output is conform to spec');
