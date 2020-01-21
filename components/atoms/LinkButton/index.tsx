import React from 'react'
import { Button, ButtonProps } from '@material-ui/core'
import { Lk } from 'modules/libs/Navigation'
import * as H from 'history'

interface ILinkButton extends ButtonProps {
  replace?: boolean
  busy?: boolean
  params?: object
  to:
    | H.LocationDescriptor<H.LocationState>
    | ((
        location: H.Location<H.LocationState>
      ) => H.LocationDescriptor<H.LocationState>)
}

const LinkButton: React.FC<ILinkButton> = ({
  to,
  replace,
  params,
  disabled,
  ...props
}) => {
  return (
    <Lk
      to={to}
      params={params}
      replace={replace}
      style={{ pointerEvents: disabled ? 'none' : undefined }}
    >
      <Button disabled={disabled} {...props} />
    </Lk>
  )
}

export default LinkButton
