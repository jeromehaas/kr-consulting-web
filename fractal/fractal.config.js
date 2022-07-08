'use strict';

// INIT PATH
const path = require('path');

// INIT MODULE
const fractal = module.exports = require('@frctl/fractal').create();

// TITLE
fractal.set('project.title', 'KR Consulting Website');

// COMPONENT DIRECTORY
fractal.components.set('path', path.join(__dirname, 'components'));
fractal.components.set('ext', '.hbs');


// ASSETS DIRECTORY
fractal.web.set('static.path', path.join(__dirname, '/public'));

// PREVIEW DIRECTORY
fractal.components.set('default.preview', '@barebone');