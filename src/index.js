var path = require('path'),
    extend = require('extend'),
    linter = require('./linter'),
    defaults,
    karmaCoffeelint;

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

karmaCoffeelint = function (config) {
  var settings;

  settings = extend(true, {}, defaults, config.coffeelint || {});

  if (typeof settings.options === 'string') {
    settings.options = require(path.join(config.basePath, settings.options));
  } else {
    settings.options = settings.options || {};
  }

  return function (content, file, done) {
    var result;

    if (!file.content && settings.onStart ||
        file.content && settings.onChange) {

      result = linter(file.path,
                      content,
                      settings.options,
                      settings.reporter.type,
                      settings.reporter.options);

      if (result.hasErrors) {
        result.report.publish();
      }
    }
    return done(content);
  }
}


karmaCoffeelint.$inject = ['config']

module.exports = {
  'preprocessor:coffeelint': ['factory', karmaCoffeelint]
}
