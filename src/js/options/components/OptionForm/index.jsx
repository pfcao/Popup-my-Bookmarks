import R from 'ramda'
import {connect} from 'react-redux'
import {createElement, PureComponent} from 'react'

import getOptionsConfig from '../../../common/lib/getOptionsConfig'
import OptionForm from './OptionForm'
import {Creators as optionsCreators} from '../../reduxs/optionsRedux'
import {OPTION_TABLE_MAP} from '../../constants'

const mapDispatchToProps = R.pick(
  ['saveOptions', 'resetToDefaultOptions', 'updateSingleOption'],
  optionsCreators
)

class OptionFormContainer extends PureComponent {
  state = {
    optionsConfig: null
  }

  async componentWillMount() {
    this.setState({
      optionsConfig: await getOptionsConfig()
    })
  }

  render = () =>
    (this.state.optionsConfig ? (
      <OptionForm {...this.props} optionsConfig={this.state.optionsConfig} />
    ) : null)
}

const mapStateToProps = (state) => ({
  options: state.options,
  selectedOptionFormMap: OPTION_TABLE_MAP[state.navigation.selectedNavModule]
})

export default connect(mapStateToProps, mapDispatchToProps)(OptionFormContainer)
