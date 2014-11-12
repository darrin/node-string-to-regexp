(function () {
    'use strict';
    var assert = require('assert');
    var stringToRegExp = require('../string-to-regexp.js');

    exports['can build a RegExp with flags.'] = function (test) {
        var regExpAsString = '/^Heya$/i';
        var regexp = stringToRegExp(regExpAsString);
        var nativeRegexp = /^Heya$/i;
        test.ok(regexp.test('Heya'));
        test.ok(regexp.test('heya'));
        test.ok(!regexp.test('eya'));
        test.deepEqual(regexp, nativeRegexp);
        test.done();
    };

    exports['can build a RegExp without flags.'] = function (test) {
        var regExpAsString = '^Heya$';
        var regexp = stringToRegExp(regExpAsString);
        var nativeRegexp = /^Heya$/;
        assert.ok(regexp.test('Heya'));
        assert.ok(!regexp.test('heya'));
        assert.ok(!regexp.test('eya'));
        test.deepEqual(regexp, nativeRegexp);
        test.done();
    };

    exports['can build a RegExp with empty flags.'] = function (test) {
        var regExpAsString = '/^Heya$/';
        var regexp = stringToRegExp(regExpAsString);
        var nativeRegexp = /^Heya$/;
        assert.ok(regexp.test('Heya'));
        assert.ok(!regexp.test('heya'));
        assert.ok(!regexp.test('eya'));
        test.deepEqual(regexp, nativeRegexp);
        test.done();
    };

    var complexPattern = '^/dev/[^/]+(/[^/]+)*$';
    exports['should detect when complex patterns do not match'] =  function(test) {
        var value = 'should not match';
        var regexp = stringToRegExp(complexPattern);
        assert.ok(!regexp.test(value));
        test.done();
    };

    exports['should detect when complex patterns do not match'] =  function(test) {
        var value = '/dev/sda';
        var regexp = stringToRegExp(complexPattern);
        assert.ok(regexp.test(value));
        test.done();
    };

    var basicUrlPattern = '^((https?|ftp|file):\/\/[-a-zA-Z0-9+&@#%?=~_|!:,.;]+)?(\/?[-a-zA-Z0-9+&@#%=~_|?]+)*$';
    exports['should detect when more complex patterns do not match'] =  function(test) {
        var illegalUrl = 'http://foo`';
        var regexp = stringToRegExp(basicUrlPattern);
        assert.ok(!regexp.test(illegalUrl));
        test.done();
    };

    exports['should detect when more complex patterns do match'] =  function(test) {
        var legalUrl = 'http://foo.com';
        var regexp = stringToRegExp(basicUrlPattern);
        assert.ok(regexp.test(legalUrl));
        test.done();
    };

})();
