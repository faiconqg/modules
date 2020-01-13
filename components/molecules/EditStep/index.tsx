import React from 'react'
import { StepLabel, StepButton } from '@material-ui/core'
import Avatar from '../Avatar'
import Edit from '@material-ui/icons/Edit'

interface IEditStep {
  active?: boolean
  alternativeLabel?: boolean
  completed?: boolean
  disabled?: boolean
  last?: boolean
  icon?: number
  onClick?: () => void
}

const EditStep: React.FC<IEditStep> = ({
  completed,
  onClick,
  children,
  ...props
}) => {
  return completed ? (
    <StepButton
      {...props}
      completed={completed}
      onClick={onClick}
      icon={
        <Avatar color="primary" iconClass={Edit}>
          {children}
        </Avatar>
      }
    >
      {children}
    </StepButton>
  ) : (
    <StepLabel {...props}>{children}</StepLabel>
  )
}

export default EditStep
