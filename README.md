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

TODO : parameters & return specs

### electre.kill()

TODO : parameters & return specs

## Demo

On [electre-www](https://electre.netlify.com), you can discover `electre-js` and use ELECTRE methods
