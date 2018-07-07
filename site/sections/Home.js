import React from 'react';
import markdown from '../data/intro/getting-started.md';
import Article from '../components/Article';

const Home = () => <Article markdown={markdown} />;

export default Home;
