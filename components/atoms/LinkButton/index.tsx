import React, { FC } from 'react'
import { Button, ButtonProps } from '@material-ui/core'
import { Lk } from 'modules/libs/Navigation'
import * as H from 'history'

interface ILinkButton extends ButtonProps {
  replace?: boolean
  busy?: boolean
  to:
    | H.LocationDescriptor<H.LocationState>
    | ((
        location: H.Location<H.LocationState>
      ) => H.LocationDescriptor<H.LocationState>)
}

const LinkButton: FC<ILinkButton> = ({ to, replace, disabled, ...props }) => {
  return (
    <Lk
      to={to}
      replace={replace}
      style={{ pointerEvents: disabled ? 'none' : undefined }}
    >
      <Button disabled={disabled} {...props} />
    </Lk>
  )
}

export default LinkButton
