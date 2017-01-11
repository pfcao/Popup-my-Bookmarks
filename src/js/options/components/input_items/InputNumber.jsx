import {autobind} from 'core-decorators'
import {createElement, PropTypes, PureComponent} from 'react'
import _clamp from 'lodash/clamp'

class InputNumber extends PureComponent {
  @autobind
  handleBlur(evt) {
    const {
      maximum,
      minimum,
      optionName,
      updateSingleOption
    } = this.props

    const parsedValue = parseInt(evt.target.value, 10)

    const newOptionValue = _clamp(parsedValue, minimum, maximum)

    updateSingleOption(optionName, newOptionValue)
  }

  @autobind
  handleChange(evt) {
    const {
      optionName,
      updateSingleOption
    } = this.props

    const parsedValue = parseInt(evt.target.value, 10)

    // only allow input number
    if (Number.isNaN(parsedValue)) return

    updateSingleOption(optionName, parsedValue)
  }

  @autobind
  // prevent user try to save by pressing enter
  handleKeyDown(evt) {
    if (evt.keyCode === 13) {
      evt.preventDefault()
    }
  }

  render() {
    const {
      maximum,
      minimum,
      optionName,
      optionValue
    } = this.props

    return (
      <input
        name={optionName}
        type='number'
        min={minimum}
        max={maximum}
        value={String(optionValue)}
        onBlur={this.handleBlur}
        onChange={this.handleChange}
        onKeyDown={this.handleKeyDown}
      />
    )
  }
}

InputNumber.propTypes = {
  maximum: PropTypes.number.isRequired,
  minimum: PropTypes.number.isRequired,
  optionName: PropTypes.string.isRequired,
  optionValue: PropTypes.number.isRequired,
  updateSingleOption: PropTypes.func.isRequired
}

export default InputNumber