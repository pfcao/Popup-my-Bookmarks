import * as React from 'react'

import classes from './mask.css'

interface Props {
  backgroundColor: string
  onClick: React.MouseEventHandler
  opacity: number
}
const Mask = (props: Props) => {
  const styles = React.useMemo(
    (): object => ({
      '--backgroundColor': props.backgroundColor,
      '--opacity': props.opacity
    }),
    [props.backgroundColor, props.opacity]
  )

  return <div className={classes.main} style={styles} onClick={props.onClick} />
}

export default Mask