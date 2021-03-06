import * as React from 'react'

import type { OPTIONS } from '../../../core/constants'
import {
  useDeleteOptions,
  useGetOptions,
  useUpdateOptions,
} from '../../../core/hooks/options'
import type { OptionsConfig } from '../../../core/types/options'
import { getOptionsConfig } from '../../../core/utils'
import { OPTION_TABLE_MAP } from '../../constants'
import { useNavigationContext } from '../navigationContext'
import OptionForm from './OptionForm'

function useGetOptionsWithDefaultValues({
  optionsConfig,
}: {
  optionsConfig?: OptionsConfig
}) {
  const [isFilledDefaultValues, setIsFilledDefaultValues] = React.useState(
    false,
  )

  const { data: options } = useGetOptions()
  const { mutateAsync: setOptions } = useUpdateOptions()

  React.useEffect(() => {
    if (!options || !optionsConfig) return

    const missingOptionNames = (Object.keys(optionsConfig) as OPTIONS[]).filter(
      (optionName) => options[optionName] === undefined,
    )

    if (missingOptionNames.length > 0) {
      const missingOptions = Object.fromEntries(
        missingOptionNames.map((optionName) => [
          optionName,
          optionsConfig[optionName].default,
        ]),
      )
      setOptions(missingOptions).catch(console.error)
    } else {
      setIsFilledDefaultValues(true)
    }

    return () => {
      setIsFilledDefaultValues(false)
    }
  }, [options, optionsConfig, setOptions])

  return isFilledDefaultValues ? options : null
}

const OptionFormContainer = () => {
  const { currentPath } = useNavigationContext()

  const [optionsConfig, setOptionsConfig] = React.useState<OptionsConfig>()
  React.useEffect(() => {
    getOptionsConfig().then(setOptionsConfig).catch(console.error)
  }, [])

  const options = useGetOptionsWithDefaultValues({ optionsConfig })

  const { mutateAsync: deleteOptions } = useDeleteOptions()
  const { mutateAsync: updateOptions } = useUpdateOptions()

  if (!options || !optionsConfig) return null

  return (
    <OptionForm
      defaultValues={options}
      optionsConfig={optionsConfig}
      selectedOptionFormMap={OPTION_TABLE_MAP[currentPath]}
      onReset={deleteOptions}
      onSubmit={updateOptions}
    />
  )
}

export default OptionFormContainer
