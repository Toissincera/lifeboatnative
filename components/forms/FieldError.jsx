import { Alert } from '@mui/material'

export const FieldError = ({ name, errors = {} }) => (
  <>{errors[name] && <Alert severity='error'>{errors[name]?.message}</Alert>}</>
)
