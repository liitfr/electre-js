# electre-js

[![version](https://img.shields.io/npm/v/electre-js.svg?style=flat)](https://www.npmjs.com/package/electre-js)  [![tests](http://img.shields.io/travis/liitfr/electre-js/master.svg?style=flat)](https://travis-ci.org/static-dev/electre-js)
[![coverage](https://img.shields.io/coveralls/liitfr/electre-js.svg?style=flat)](https://coveralls.io/github/liitfr/electre-js?branch=master)  [![dependencies](http://img.shields.io/david/liitfr/electre-js.svg?style=flat)](https://david-dm.org/liitfr/electre-js)
[![Greenkeeper badge](https://badges.greenkeeper.io/liitfr/electre-js.svg)](https://greenkeeper.io/)
[![Codacy Badge](https://api.codacy.com/project/badge/Grade/f1a2b5421583482891725ddcae612e2e)](https://www.codacy.com/app/liitfr/electre-js?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=liitfr/electre-js&amp;utm_campaign=Badge_Grade) 

ELECTRE is a set of multi-criteria decision analysis methods.  
👀 **work in progress**, in very early development: Do not use  

You can use this package in your Node.js and / or web projects.  
It uses **Workers** to calculate results in a separated thread.  

## Implemented methods

- [x] ELECTRE I
- [ ] ELECTRE I_s
- [ ] ELECTRE I_v
- [ ] ELECTRE II
- [ ] ELECTRE III
- [ ] ELECTRE IV
- [ ] ELECTRE TRI
- [ ] ELECTRE TRI ME

Algorithms come from [J-Electre](https://github.com/Valdecy/J-Electre).  
I'll slowly implement these methods on my spare time.  

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

#### if version is 'EI'

##### inputData

An object with following properties :

| properties              | mandatory   | type                          | rules                                                                             |
|-------------------------|-------------|-------------------------------|-----------------------------------------------------------------------------------|
| numberOfCriterias       | true        | number                        | > 0                                                                               |
| numberOfAlternatives    | true        | number                        | > 1                                                                               |
| criterias               | true        | array of strings              | size = numberOfCriterias, all values are unique, no undefined                     |
| weights                 | true        | array of numbers              | size = size of criterias, no undefined                                            |
| alternatives            | true        | array of strings              | size = numberOfAlternatives, all values are unique, no undefined                  |
| evaluations             | true        | array of arrays of numbers    | matrix n * p where n = size of alternatives & p = size of criterias, no undefined |
| cThreshold              | true        | number                        | 0 < value < 1                                                                     |
| dThreshold              | true        | number                        | 0 < value < 1                                                                     |

##### returns

A promise of an object with following properties :   

| properties   |  type                        | rules                                                             |
|--------------|------------------------------|-------------------------------------------------------------------|
| inputData    |  object                      | inputData passed to the worker                                    |
| concordance  |  array of arrays of numbers  | square matrix n * n where n = alternatives size                   |
| discordance  |  array of arrays of numbers  | square matrix n * n where n = alternatives size                   |
| credibility  |  array of arrays of numbers  | square matrix n * n where n = alternatives size. Values = 0 or 1  |
| kernel       |  array of strings            | partition of alternatives                                         |
| dominated    |  array of strings            | partition of alternatives                                         |

### electre.kill()

Ask to `terminate` busy worker and set calculator state back to idle (`electre._idle = true`).  
Promise returned when `electre.start()` is rejected.  

## Demo

On [electre-www](https://electre.netlify.com), you can discover `electre-js` and use ELECTRE methods
