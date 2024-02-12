const { TextEncoder } = require('node:util');

global.TextEncoder = TextEncoder;
process.env.REACT_APP_API_ROOT = 'http://localhost:3001';
