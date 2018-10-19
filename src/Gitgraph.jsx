import React, { Component } from 'react';
import 'gitgraph.js';
import 'gitgraph.js/build/gitgraph.css';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.$gitgraph = React.createRef();
  }

  componentDidMount() {
    const gitgraph = new GitGraph({ canvas: this.$gitgraph.current });

    const master = gitgraph
      .branch('master')
      .commit()
      .commit();

    gitgraph
      .branch('dev')
      .commit()
      .commit()
      .merge(master);
  }

  render() {
    return <canvas ref={this.$gitgraph} />;
  }
}
