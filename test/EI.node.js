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
  inputData: params.inputData,
  concordance: [
    [0.0000, 0.8181818181818181, 0.8181818181818181, 1.0000, 0.5454545454545454],
    [0.18181818181818182, 0.0000, 0.7272727272727273, 0.18181818181818182, 0.18181818181818182],
    [0.18181818181818182, 0.8181818181818181, 0.0000, 0.18181818181818182, 0.45454545454545453],
    [0.5454545454545454, 0.8181818181818181, 0.8181818181818181, 0.0000, 0.36363636363636365],
    [0.5454545454545454, 0.8181818181818181, 0.5454545454545454, 0.7272727272727273, 0.0000],
  ],
  discordance: [
    [0.0000, 0.4435483870967742, 0.29569892473118276, 0.0000, 0.7499999999999999],
    [0.9166666666666666, 0.0000, 0.6837016574585635, 0.9166666666666666, 1.0000],
    [0.9166666666666666, 0.1478494623655914, 0.0000, 0.9166666666666666, 1.0000],
    [0.11827956989247308, 0.5618279569892473, 0.4139784946236558, 0.0000, 0.7499999999999999],
    [0.6077348066298343, 0.532258064516129, 0.38440860215053757, 0.5469613259668508, 0.0000],
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

const wrongInput = Object.assign({}, params.inputData, { numberOfCriterias: 99 });

test('Node - EI worker - Execute fine with realistic data', async (t) => {
  const calculation = await electre.start(params.version, params.inputData);
  t.deepEqual(calculation, expected);
});

test('Node - EI worker - No parallel execution allowed', (t) => {
  electre.start(params.version, params.inputData).then(() => {}, () => {});
  t.throws(() => electre.start(params.version, params.inputData), 'Calculator is already busy 👯');
  electre.kill();
});

test('Node - EI worker - Serial executions allowed', async (t) => {
  await electre.start(params.version, params.inputData);
  await electre.start(params.version, params.inputData);
  t.pass();
});

test('Node - EI worker - Kill a running calculation', async (t) => {
  const calculation = electre.start(params.version, params.inputData);
  electre.kill();
  await calculation.then(() => {
    t.fail();
  }, (err) => {
    if (err.message.indexOf('Calculation has been killed 🔫') !== -1) {
      t.pass();
    } else {
      t.fail();
    }
  });
});

test('Node - EI worker - unknown version of ELECTRE support', (t) => {
  t.throws(() => electre.start('foo', params.inputData), 'This version of ELECTRE isn\'t supported 👀');
});

test('Node - EI worker - incorrect input parameters support', async (t) => {
  await electre.start('EI', wrongInput).then(() => {
    t.fail();
  }, (err) => {
    if (err.message.indexOf('Input data doesn\'t respect specified schema') !== -1) {
      t.pass();
    } else {
      t.fail();
    }
  });
});
