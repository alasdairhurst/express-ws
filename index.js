/* eslint-disable-next-line no-underscore-dangle */
const _require = require('esm')(module);

module.exports = _require('./src/index').default;

module.exports.addWsMethod = _require('./src/add-ws-method').default;
