// @flow

import React from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Button from '../components/button'
import * as navActions from '../actions/navigation'

type linkProps = {
  actions: Object,
  onClick: Function,
  text: string,
  link?: string
}

const Link = (props: linkProps) => <Button
  text={props.text}
  onClick={() => props.link ? props.actions.navigateTo({key: props.link}) : props.actions.navigateBack()}>
</Button>

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(navActions, dispatch)
  }
}

export default connect(
  null,
  mapDispatchToProps
)(Link)
