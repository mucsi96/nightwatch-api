import React from 'react';
import Markdown from 'react-markdown';
import text from '../data/index.md';

const Home = () => <Markdown escapeHtml={true} source={text} />;

export default Home;
