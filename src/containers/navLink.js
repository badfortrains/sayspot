// @flow
import { TouchableWithoutFeedback } from 'react-native'
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

type plainLinkProps = {
  actions: Object,
  link: string,
  params: Object,
  children: Object
}

const PlainLinkComponent = (props: plainLinkProps) => {
  console.log('render plain')
  return (
    <TouchableWithoutFeedback onPress={() => console.log('onclick') || props.actions.navigateTo({key: props.link, params: props.params})}>
      {props.children}
    </TouchableWithoutFeedback>
  )
}

export const PlainLink = connect(null, mapDispatchToProps)(PlainLinkComponent)

export default connect(
  null,
  mapDispatchToProps
)(Link)
