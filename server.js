const path = require('path');
const fs = require('fs');
const reload = require('reload');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 9000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.text({ type: 'text/html' }));
app.use(bodyParser.json({ type: 'application/*+json' }));
app.use(bodyParser.raw({ type: 'application/vnd.custom-type' }));

app.use(express.static(path.resolve(__dirname, './www')));
app.use('/js/*', express.static(path.resolve(__dirname, './js/*')));
app.use('/css/*', express.static(path.resolve(__dirname, './css/*')));

app.use(express.static(path.resolve(__dirname, './coverage')));
app.use('/lcov-report/*', express.static(path.resolve(__dirname, './coverage/lcov-report/*')));

const coverage = path.resolve(__dirname, './coverage/lcov-report/index.html');
app.use('/coverage', (req, res) => {
  return res.sendFile(coverage);
});

const index = path.resolve(__dirname, './www/index.html');
app.use('/*', (req, res) => {
  return res.sendFile(index);
});

app.listen(port, console.log(`Listening on port ${port}`));
