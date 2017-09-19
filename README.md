# electre-js

[![version](https://img.shields.io/npm/v/electre-js.svg?style=flat)](https://www.npmjs.com/package/electre-js)  [![tests](http://img.shields.io/travis/liitfr/electre-js/master.svg?style=flat)](https://travis-ci.org/static-dev/electre-js)
[![coverage](https://img.shields.io/coveralls/liitfr/electre-js.svg?style=flat)](https://coveralls.io/github/liitfr/electre-js?branch=master)  [![dependencies](http://img.shields.io/david/liitfr/electre-js.svg?style=flat)](https://david-dm.org/liitfr/electre-js)
[![Greenkeeper badge](https://badges.greenkeeper.io/liitfr/electre-js.svg)](https://greenkeeper.io/)
[![Codacy Badge](https://api.codacy.com/project/badge/Grade/f1a2b5421583482891725ddcae612e2e)](https://www.codacy.com/app/liitfr/electre-js?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=liitfr/electre-js&amp;utm_campaign=Badge_Grade)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

ELECTRE is a set of multi-criteria decision analysis methods.  
If you've never heard of these methods, you can have a look at this [document](http://www.lgi.ecp.fr/~mousseau/mcda-ss/pmwiki-2.1.27/uploads/Main/SlidesFigueira.pdf) from José Rui FIGUEIRA.    

You can use this package in your Node.js and / or web projects.  
It uses **Workers** to calculate results in a separated thread.  

## Implemented methods

Algorithms come from [J-Electre](https://github.com/Valdecy/J-Electre).  

### Methods for **choosing**

- [x] ELECTRE I
- [ ] ELECTRE Is (Seuil)
- [ ] ELECTRE Iv (Veto)

### Methods for **ranking**

- [ ] ELECTRE II
- [ ] ELECTRE III
- [ ] ELECTRE IV

### Methods for **ordinal classification or sorting**

- [ ] ELECTRE TRI
- [ ] ELECTRE TRI ME (Multi-Evaluator)

Only checked methods are implemented at this time, I'll slowly implement the others but tell me if you want to focus on a particular one.

## Web version

If you want to use this package in its web version and are using a bundler, you'll have to manually copy web workers.

### Example with [Spike](https://www.spike.cf/) SSG

By using [copy-webpack-plugin](https://github.com/kevlened/copy-webpack-plugin) in your `app.js`:

```js
const CopyWebpackPlugin = require('copy-webpack-plugin')
const path = require('path')

module.exports = {
  // ...
  afterSpikePlugins: [
    new CopyWebpackPlugin([{
      from: path.resolve(__dirname, 'node_modules/electre-js/lib/workers'),
      to: path.resolve(__dirname, 'public/workers')
    }])
  ]
}
```

## API

### How to use
```
import electre from 'electre-js';
```
where `electre` is an object with two methods : `start` & `kill` as described bellow.  
**You can only run one calculation at a time.**  

### electre.start(version, inputData)

Set calculator state to busy (`electre._idle = false`) and send a message to related worker that will handle calculation. Throws an error if calculator isn't idle.  

#### inputData

An object with following properties :

| properties              | mandatory   | expected in methods   | type                          | rules                                                                             |
|-------------------------|-------------|-----------------------|-------------------------------|-----------------------------------------------------------------------------------|
| numberOfCriterias       | true        | I                     | number                        | > 0                                                                               |
| numberOfAlternatives    | true        | I                     | number                        | > 1                                                                               |
| criterias               | true        | I                     | array of strings              | size = numberOfCriterias, all values are unique, no undefined                     |
| weights                 | true        | I                     | array of numbers              | size = size of criterias, no undefined                                            |
| alternatives            | true        | I                     | array of strings              | size = numberOfAlternatives, all values are unique, no undefined                  |
| evaluations             | true        | I                     | array of arrays of numbers    | matrix n * p where n = size of alternatives & p = size of criterias, no undefined |
| cThreshold              | true        | I                     | number                        | 0 < value < 1                                                                     |
| dThreshold              | true        | I                     | number                        | 0 < value < 1                                                                     |

#### returns

A promise of an object with following properties :   

| properties   |  type                        | rules                                                             | returned in methods   |
|--------------|------------------------------|-------------------------------------------------------------------|-----------------------|
| inputData    |  object                      | inputData passed to the worker                                    | I                     |
| concordance  |  array of arrays of numbers  | square matrix n * n where n = alternatives size                   | I                     |
| discordance  |  array of arrays of numbers  | square matrix n * n where n = alternatives size                   | I                     |
| credibility  |  array of arrays of numbers  | square matrix n * n where n = alternatives size. Values = 0 or 1  | I                     |
| kernel       |  array of strings            | partition of alternatives                                         | I                     |
| dominated    |  array of strings            | partition of alternatives                                         | I                     |

### electre.kill()

Ask to `terminate` busy worker and set calculator state back to idle (`electre._idle = true`).  
Promise returned when `electre.start()` is rejected.  

## Demo

On [electre-www](https://electre.netlify.com), you can discover `electre-js` and use ELECTRE methods

# Credits

Algorithms come from [J-Electre](https://github.com/Valdecy/J-Electre).
