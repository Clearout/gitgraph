import React, { Component } from 'react';
import './App.css';
import 'gitgraph.js';

export default class App extends Component {
  componentDidMount() {
    featureGraph();
    featureDuringReleaseGraph();
    releaseGraph();
    hotfixGraph();
  }
  render() {
    return (
      <div className={'main'}>
        <h2>Feature or bug</h2>
        <div className={'canvasholder'}>
          <canvas id="featureGraph" />
        </div>
        <h2>Release handling</h2>
        <div className={'canvasholder'}>
          <canvas id="releaseGraph" />
        </div>
        <h2>Feature or bug during release</h2>
        <div className={'canvasholder'}>
          <canvas id="featureDuringReleaseGraph" />
        </div>
        <h2>Hotfix</h2>
        <div className={'canvasholder'}>
          <canvas id="hotfixGraph" />
        </div>
      </div>
    );
  }
}

const featureGraph = () => {
  const gitGraph = initGraph('featureGraph');
  const develop = gitGraph
    .branch('develop')
    .commit({ message: 'this is a commit' });
  const feature = develop.branch('feature/my-feature');
  const bug = develop.branch('bug/my-bug');
  feature.commit({ message: 'this is a commit' });
  bug
    .commit({ message: 'this is a commit' })
    .commit({ message: 'this is a commit' });
  feature.commit({ message: 'this is a commit' }).merge(develop);
  bug.merge(develop);
};

const releaseGraph = () => {
  const gitGraph = initGraph('releaseGraph');
  const master = gitGraph.branch('master');
  const develop = gitGraph.orphanBranch('develop');
  develop.commit({ message: 'this is a commit' });
  master.commit({ message: 'this is a commit' });
  const release = develop
    .branch('release/10.0.0')
    .commit({ message: 'this is a commit' });
  develop
    .commit({ message: 'this is a commit' })
    .commit({ message: 'this is a commit' });
  release.commit({ message: 'this is a commit' }).merge(master);
  develop.commit({ message: 'this is a commit' });
};

const featureDuringReleaseGraph = () => {
  const gitGraph = initGraph('featureDuringReleaseGraph');
  const develop = gitGraph
    .branch('develop')
    .commit({ message: 'this is a commit' })
    .commit({ message: 'this is a commit' });
  const release = develop
    .branch('release/10.0.0')
    .commit({ message: 'this is a commit' });
  develop.commit({ message: 'this is a commit' });
  const bug = release
    .branch('bug/my-bug')
    .commit({ message: 'this is a commit' });
  develop.commit({ message: 'this is a commit' });
  bug.commit({ message: 'this is a commit' });
  develop.commit({ message: 'this is a commit' });
  bug.merge(release).merge(develop);
};

const hotfixGraph = () => {
  const gitGraph = initGraph('hotfixGraph');
  const master = gitGraph.branch('master');
  const develop = gitGraph.orphanBranch('develop');

  develop.commit({ message: 'this is a commit' });
  master.commit({ message: 'this is a commit' });
  develop.commit({ message: 'this is a commit' });

  const hotfix = master
    .branch('hotfix/my-hotfix')
    .commit({ message: 'this is a commit' })
    .commit({ message: 'this is a commit' });

  develop.commit({ message: 'this is a commit' });
  hotfix.merge(master).merge(develop);
};

const initGraph = elementId => {
  const graphObj = window.GitGraph;
  const template = new graphObj.Template({
    colors: ['#CD5C5C', '#008fb5', '#f1c109'],
    branch: {
      lineWidth: 5,
      spacingX: 70,
      labelRotation: 0,
      showLabel: true,
    },
    commit: {
      spacingY: -80,
      dot: {
        size: 8,
      },
      message: {
        font: 'normal 10pt Arial',
      },
      tooltipHTMLFormatter: function(commit) {
        return (
          '<div style="background: #fff; border: #000 1px solid">&nbsp;&nbsp;&nbsp;' +
          commit.message +
          '</div>'
        );
      },
    },
  });
  const gitGraph = new graphObj({
    elementId: elementId,
    template: template,
    orientation: 'horizontal',
    mode: 'compact',
  });
  return gitGraph;
};
