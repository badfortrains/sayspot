// @flow

import React from 'react';
import {
  ProgressBarAndroid
} from 'react-native';

const TimerMixin = require('react-timer-mixin');

export default React.createClass({
  mixins: [TimerMixin],

  getInitialState: function() {
    return {
      progress: 0,
    };
  },

  componentDidMount: function() {
    this.setInterval(
      () => {
        var progress = (this.state.progress + 0.02) % 1;
        this.setState({progress: progress});
      }, 25
    );
  },

  render: function() {
    return <ProgressBarAndroid progress={this.state.progress} {...this.props} />;
  },
});
