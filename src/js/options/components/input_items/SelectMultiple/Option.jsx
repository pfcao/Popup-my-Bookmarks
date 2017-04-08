import {autobind} from 'core-decorators'
import {createElement, PureComponent} from 'react'
import _uniqueId from 'lodash/uniqueId'
import Immutable from 'seamless-immutable'
import PropTypes from 'prop-types'

class Option extends PureComponent {
  componentWillMount() {
    this.id = _uniqueId(Option.name)
  }

  @autobind
  handleChange(evt) {
    const {
      optionName,
      optionValue,
      updateSingleOption
    } = this.props

    const checkboxValue = parseInt(evt.target.value, 10)

    const wasChecked = optionValue.includes(checkboxValue)

    let newOptionValue
    if (wasChecked) {
      newOptionValue = optionValue
        .filter((x) => x !== checkboxValue)
    } else {
      const mutableNewOptionValue = [checkboxValue]
        .concat(optionValue)
        .sort()
      newOptionValue = Immutable(mutableNewOptionValue)
    }

    updateSingleOption(optionName, newOptionValue)
  }

  render() {
    const {
      optionChoice,
      optionChoiceIndex,
      optionName,
      optionValue
    } = this.props

    const isChecked = optionValue.includes(optionChoiceIndex)

    return (
      <label htmlFor={this.id}>
        <input
          id={this.id}
          name={optionName}
          type='checkbox'
          value={String(optionChoiceIndex)}
          checked={isChecked}
          onChange={this.handleChange}
        />
        {optionChoice}
      </label>
    )
  }
}

Option.propTypes = {
  optionChoice: PropTypes.string.isRequired,
  optionChoiceIndex: PropTypes.number.isRequired,
  optionName: PropTypes.string.isRequired,
  optionValue: PropTypes.arrayOf(PropTypes.number).isRequired,
  updateSingleOption: PropTypes.func.isRequired
}

export default Option
