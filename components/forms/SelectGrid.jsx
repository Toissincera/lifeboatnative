import {
  Checkbox,
  FormControl,
  Grid,
  InputLabel,
  ListItemText,
  ListSubheader,
  MenuItem,
  Select,
} from '@mui/material';
import { Controller } from 'react-hook-form';
import { FieldError } from './FieldError';

export const ReactHookFormSelect = ({
  name,
  label,
  control,
  setValue,
  defaultValue,
  multiple = false,
  options = [],
  errors = {},
  size = 'small',
  xs = 12,
  disabled = false,
  onChange = () => {},
  ...props
}) => {
  const labelId = `${name}-label`;

  return (
    <Grid item xs={xs} my={1}>
      <FormControl fullWidth {...props}>
        <InputLabel id={labelId} size={size}>
          {label}
        </InputLabel>
        <Controller
          name={name}
          control={control}
          defaultValue={defaultValue}
          render={({ field }) => (
            <Select
              fullWidth
              size={size}
              {...field}
              multiple={multiple}
              labelId={labelId}
              disabled={disabled}
              label={label}
              onChange={(e) => {
                field.onChange(e);
                onChange(e);
              }}
              error={!!errors[name]}
              inputProps={{ 'aria-label': 'controlled' }}
            >
              {options.map((o) => {
                if (o.type === 'header') {
                  return <ListSubheader key={o.value}>{o.text}</ListSubheader>;
                }
                return (
                  <MenuItem key={o.value} value={o.value}>
                    {multiple && (
                      <Checkbox checked={field.value?.includes(o.value) || false} />
                    )}
                    <ListItemText primary={o.text} />
                  </MenuItem>
                );
              })}
            </Select>
          )}
        />
        <FieldError name={name} errors={errors} />
      </FormControl>
    </Grid>
  );
};