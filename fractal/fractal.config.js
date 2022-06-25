'use strict';

// INIT PATH
const path = require('path');

// INIT MODULE
const fractal = module.exports = require('@frctl/fractal').create();

// TITLE
fractal.set('project.title', 'fractal');

// COMPONENT DIRECTORY
fractal.components.set('path', path.join(__dirname, 'components'));

// PREVIEW DIRECTORY
fractal.components.set('default.preview', '@page');

// ASSETS DIRECTORY
fractal.web.set('static.path', path.join(__dirname, 'public'));
