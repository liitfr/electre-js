# electre-js

ELECTRE is a set of multi-criteria decision analysis methods.  
👀 work in progress, in very early development: Do not use  

You can use this package in your Node.js and / or web projects.  
It uses Workers to calculate results in a separated thread.  

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

### import electre-js

```
import electre from 'electre-js';
```
TODO : singleton

### electre.start(version, inputData)

#### EI

##### inputData

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

##### return

| properties   |  type                        | rules                                                             |
|--------------|------------------------------|-------------------------------------------------------------------|
| inputData    |  object                      | inputData passed to the worker                                    |
| concordance  |  array of arrays of numbers  | square matrix n * n where n = alternatives size                   |
| discordance  |  array of arrays of numbers  | square matrix n * n where n = alternatives size                   |
| credibility  |  array of arrays of numbers  | square matrix n * n where n = alternatives size. Values = 0 or 1  |
| kernel       |  array of strings            | partition of alternatives                                         |
| dominated    |  array of strings            | partition of alternatives                                         |

### electre.kill()

TODO : parameters & return specs

## Demo

On [electre-www](https://electre.netlify.com), you can discover `electre-js` and use ELECTRE methods
