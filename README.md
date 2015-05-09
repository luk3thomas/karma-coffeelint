# karma-coffeelint

A [coffeelint](http://www.coffeelint.org/) for karma.


## Installation

    npm i karma-coffeelint --save-dev

Add the configure the coffeelint plugin inside your karma config file.


```CoffeeScript
    module.exports = (config) ->

      config.set

        frameworks: ["jasmine"]

        reporters: ["dots", "coverage"]

        files: [
          "src/**/*.coffee"
          "test/**/*.coffee"
        ]

        preprocessors:
          "src/**/*.coffee"    : ["coffeelint", "coffee"]
          "test/**/*.coffee"   : ["coffee"]

        coffeelint:
          onStart: false
          onChange: true
          options: 'coffeelint.json'
          reporter:
            type: 'default'
            options:
              colorize: true

        browsers: ["PhantomJS"]
```

## Options

coffeelint options are specified in the karma config file under the key `cofeelint`.

|Name|Description|
|----|-----------|
|`onStart`| Runs coffeelint on every file when karma starts.|
|`onChange`| Runs coffeelint on a file change event. Only the modified file is linted|
|`options`| Path to the `coffeelint.json` config file **relative** to the karma file. Or you can specify the coffeelint options directly, see the [website](http://www.coffeelint.org/) for a complete list of coffeelint options.|
|`reporter.type`| default, jslint, raw, csv, checkstyle|
|`reporter.options`| low level config options for the coffelint reporter. I'm not sure the options are documented, you can read more in the [source](https://github.com/clutchski/coffeelint/blob/master/src/commandline.coffee#L123-L126).|

#### Default options

```javascript
defaults = {
  onStart: false,
  onChange: true,
  options: 'coffeelint.json',
  reporter: {
    type: 'default',
    options: {
      colorize: true
    }
  }
};
```
