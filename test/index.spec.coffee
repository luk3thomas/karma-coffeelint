kc = require('../src/')
curry = require('curry')
intercept = require('intercept-stdout')
stdout = ''

unhook = intercept (txt) ->
  stdout += txt

describe "karma-coffeelint", ->

  beforeEach ->
    self = @
    @valid   = 'a=1'
    @invalid = 'a=1;'
    @file = path: 'foo.coffee'
    @options = (options) ->
      basePath: "#{process.cwd()}/test/fixtures/"
      coffeelint: options or {}

    @kc = curry (options, file, content) ->
      kc['preprocessor:coffeelint'][1](self.options(options))(content, file, ->)

  afterEach ->
    stdout = ''


  describe "onStart", ->
    beforeEach ->
      @kc = @kc(onStart: true, onChange: false)

    it "lints files on start", ->
      @file.content = false
      @kc(@file, @invalid)
      expect(stdout).toMatch /error/

    it "does not lint files on start", ->
      @file.content = true
      @kc(@file, @invalid)
      expect(stdout).not.toMatch /error/


  describe "onChange", ->
    beforeEach ->
      @kc = @kc(onStart: false, onChange: true)

    it "lints files on change", ->
      @file.content = true
      @kc(@file, @invalid)
      expect(stdout).toMatch /error/

    it "does not lint files on change", ->
      @file.content = false
      @kc(@file)
      expect(stdout).not.toMatch /error/

    it "passes on change", ->
      @file.content = true
      @kc(@file, @valid)
      expect(stdout).not.toMatch /error/
