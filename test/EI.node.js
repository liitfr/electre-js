/* eslint import/no-extraneous-dependencies: ["error", {"devDependencies": true}] */

import test from 'ava';
import electre from '../lib/electre.node.min';

const params = {
  version: 'EI',
  inputData: {
    threshold: 10,
  },
};

const expected = {
  message: 'thanks for using EI',
  result: 55,
};

test('Node - EI worker - Execute', async (t) => {
  const calculation = await electre.start(params.version, params.inputData);
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
