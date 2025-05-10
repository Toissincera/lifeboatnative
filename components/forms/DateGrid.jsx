import { Alert, Grid, TextField } from '@mui/material'

export const DateGrid = ({
  fKey,
  label,
  size = 12,
  register = () => {},
  errors = {},
  inputType = 'date',
  defaultValue,
  disabled = false,
  required,
}) => {
  return (
    <Grid item xs={size} sm={size} mb={1}>
      <TextField
        name={fKey}
        label={label}
        fullWidth
        disabled = { disabled }
        required={required}
        defaultValue={defaultValue}
        type={inputType}
        margin='dense'
        size='small'
        InputLabelProps={{
          shrink: true,
        }}
        // disabled={loading}
        {...register(fKey)}
        error={errors[fKey] ? true : false}
      />
      {errors[fKey] && <Alert severity='error'>{errors[fKey]?.message}</Alert>}
    </Grid>
  )
}
