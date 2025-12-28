
require('ignore-styles');

require('@babel/register')({
  ignore: [/(node_modules)/],
  presets: ['@babel/preset-env', '@babel/preset-react']
});

const express = require('express');
const fs = require('fs');
const path = require('path');
const { renderApp } = require('./render');

const app = express();
const PORT = 3001;

app.use(express.static(path.resolve(__dirname, '..', 'build')));

app.get('*', (req, res) => {
  const appString = renderApp();
  const indexFile = path.resolve('./javascript_runtimes/react-ssr-app/build/index.html');

  fs.readFile(indexFile, 'utf8', (err, data) => {
    if (err) {
      console.error('Something went wrong:', err);
      return res.status(500).send('Oops, better luck next time!');
    }

    return res.send(
      data.replace('<div id="root"></div>', `<div id="root">${appString}</div>`)
    );
  });
});

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
