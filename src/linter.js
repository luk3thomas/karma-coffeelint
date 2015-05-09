var coffeelint = require('coffeelint'),
    reporter,
    Report,
    literate;

literate = function (path) {
  return /litcoffee|md/i.test(path);
}

module.exports = function (path, contents, lintOptions, reporterType, reporterOptions) {
  reporter = new coffeelint.getErrorReport();
  reporter.lint(path, contents, lintOptions, literate(path));
  Report = require('coffeelint/lib/reporters/' + reporterType);

  return {
    report: new Report(reporter, reporterOptions),
    hasErrors: reporter.paths[path].length
  };
}
