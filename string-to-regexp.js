module.exports = (function () {
    'use strict';

    var matchesRegExpWithFlags = /^\/(.*)\/{1}([gimy]{0,4})$/;

    /**
     *
     * @param string
     * @returns {RegExp} - returns RegExp when string is a valid RegExp pattern - null otherwise.
     */
    var stringToRegExp = function (string) {
        try {
            // If it's a valid regex with pattern use the two arg constructor otherwise pass the whole string in.
            var m = matchesRegExpWithFlags.exec(string);
            var regex = string;
            var flags;
            if (m) {
                // There are flags - use the two arg constructor.
                regex = m[1];
                if (m.length === 3) {
                    flags = m[2];
                }
            }

            if (flags && flags.length) {
                return new RegExp(regex, flags);
            } else {
                // No flags...
                return new RegExp(regex);
            }
        }
        catch (err) {
        }
        return null;
    };
    return stringToRegExp;
})();