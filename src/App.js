import React, { Component } from 'react';
import './App.css';
import 'gitgraph.js';

export default class App extends Component {
  componentDidMount() {
    this.gitGraph = getGitGraph();
    this.master();
  }
  master = () => {
    const master = this.gitGraph
      .branch('master')
      .commit()
      .commit();

    this.gitGraph
      .branch('dev')
      .commit()
      .commit()
      .merge(master);
  };
  render() {
    return (
      <div>
        <canvas id="gitGraph" />
      </div>
    );
  }
}

const getGitGraph = () => {
  const gitGraph = window.GitGraph;
  const gitgraph = new gitGraph({
    elementId: 'gitGraph',
    template: 'metro',
    orientation: 'horizontal'
  });
  return gitgraph;
};
