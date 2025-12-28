const React = require('react');
const ReactDOMServer = require('react-dom/server');
const App = require('../src/App').default;

module.exports.renderApp = () => {
  return ReactDOMServer.renderToString(<App />);
};
