import React, { Fragment } from "react";
import markdown from "../data/index.md";
import Article from "../components/Article";

const Home = () => <Article markdown={markdown} />;

export default Home;
