# Introduction

You want to allow users to pass in a RegExp with flags or without from string input.  Here's how javascript would
handle these:

    ^Hola$     // matches only the string 'Hola'
    /^Hola$/   // same - matches only the string 'Hola'
    /^Hola$/i  // case insensitve match of 'Hola'

Unfortunately new RegExp(string) doesn't parse out these flags as javascript would.  This library creates that
behavior - you will get exactly the same behavior as if you had the unquoted string in your javascript source.

Of course the bold and brave can get the same effect by using 'eval'.  Because this module is all about creating a regex from a user provided input string - the use of eval in this context scares the b-jesus out of me. So then this module is for the weak of heart - like me - who would prefer to avoid the potential of someone hijacking my software by way of some clever javascript introduced where a regexp was expected.

Invalid regex expressions in fact produce a 'null' value at this time which you should look for.

## Installation

    npm install string-to-regexp --save

## Usage

    var stringToRegExp = require('string-to-regexp.js');

    /^Hola$/i === stringToRegExp('/^Hola$/i');  // true
    /^Hola$/  === stringToRegExp('/^Hola$/');   // true
    /^Hola$/  === stringToRegExp('^Hola$');     // true


### Avoiding Edge Cases

This library will always prefer to the Javascript RegExp notation with flags to an alternative interpretation. So beware if you're building a regex that looks similar to the Javascript RegExp.

If you're not sure this is the regular expression we use to determine whether to break out the flags:

        var matchesRegExpWithFlags = /^\/(.*)\/{1}([gimy]{0,4})$/;

If your input regex matches this the input will be dealt with as if it had flags.  Here are some examples:

    /^foo$/i                                            // matches "foo" case-insensitive.
    stringToRegExp('/^foo$/i');                         // matches "foo" case-insensitive.
    /\/^foo$\/i/                                        // matches string containing "/^foo$/i"
    stringToRegExp('/\\/^foo$\\/i/');                   // matches string containing "/^foo$/i"
    /^foo$/i  === stringToRegExp('/^foo$/i');           // true
    //^foo$/i/ === stringToRegExp('/\\/^foo$\\/i/');    // true
    //^foo$/i/ === stringToRegExp('/^foo$/i');          // false

_Note: that escaped characters will need to be double-escaped in strings compared to their Javascript object
equivalents._

In general you can avoid these edge cases by always using the javascript object style notation even when there are no
flags - it is safe to start and end with a slash ('/').

## Tests

  npm test

## Contributing

In lieu of a formal style guide, please maintain the existing coding style. Add unit tests for any new or changed functionality. Run 'grunt ci' to make sure all tests and jshint rules pass.

## Release History

* 0.1.0 Initial release

# Reference

* [Regular_Expressions - Advanced_Searching_With_Flags](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions#Advanced_Searching_With_Flags)
* [JavaScript RegExp Reference](http://www.w3schools.com/jsref/jsref_obj_regexp.asp)
