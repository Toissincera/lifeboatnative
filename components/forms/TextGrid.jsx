import { Alert, Grid, TextField } from '@mui/material'

export const TextGrid = ({
  fKey,
  label,
  size = 12,
  register = () => {},
  errors = {},
  inputType = 'text',
  defaultValue,
  required = false,
  ...props
}) => {
  return (
    <Grid item xs={size} mb={1}>
      <TextField
        name={fKey}
        label={label}
        fullWidth
        required={required}
        defaultValue={defaultValue}
        type={inputType}
        size={'small'}
        margin='dense'
        // disabled={loading}
        {...register(fKey)}
        error={errors[fKey] ? true : false}
        {...props}
      />
      {errors[fKey] && <Alert severity='error'>{errors[fKey].message}</Alert>}
    </Grid>
  )
}
