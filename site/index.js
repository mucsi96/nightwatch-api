import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import Root from './components/Root';

const render = locals => `<!DOCTYPE html>${renderToStaticMarkup(<Root {...locals} />)}`;

export default render;
