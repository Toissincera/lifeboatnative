import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  Radio,
  RadioGroup,
} from '@mui/material'
import { Controller } from 'react-hook-form'
import { FieldError } from './FieldError'

export const RadioGrid = ({
  name,
  label,
  control,
  setValue,
  defaultValue,
  options = [],
  errors,
  size = 'small',
  sm = 12,
  horizontal = true,
  ...props
}) => {
  const labelId = `${name}-label`

  return (
    <Grid sm={sm} item>
      <FormControl fullWidth {...props}>
        <FormLabel id={labelId}>{label}</FormLabel>

        <Controller
          render={({ field }) => (
            <>
              <RadioGroup
                row
                size={size}
                aria-labelledby={`row-button-label-${labelId}`}
                name={`radio-buttons-${labelId}`}
                {...field}
                labelId={labelId}
                defaultValue={defaultValue}
                onChange={(e) => field.onChange(e)}
                error={errors[name] ? true : false}
              >
                {options.map((o, i) => (
                  <FormControlLabel
                    key={o.value}
                    value={o.value}
                    control={<Radio />}
                    label={o.text}
                  />
                ))}
              </RadioGroup>
            </>
          )}
          name={name}
          control={control}
        />
        <FieldError name={name} errors={errors} />
      </FormControl>
    </Grid>
  )
}
