const { TextEncoder } = require('node:util');

global.TextEncoder = TextEncoder;
process.env.REACT_APP_API_ROOT = 'http://localhost:3001';

global.matchMedia =
    global.matchMedia ||
    function () {
        return {
            matches: false,
            addListener: function () {},
            removeListener: function () {},
        };
    };
