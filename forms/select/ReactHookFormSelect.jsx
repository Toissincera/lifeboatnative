import { FormControl, InputLabel, Select, MenuItem, FormHelperText } from "@mui/material";

export const ReactHookFormSelect = ({
  id,
  name,
  label,
  options,
  sm = 12,
  disabled = false,
  defaultValue = "",
  size = "small",
  value,
  onChange,
  errors,
}) => {
  return (
    <FormControl fullWidth margin="normal" size={size} disabled={disabled}>
      <InputLabel id={`${id}-label`}>{label}</InputLabel>
      <Select
        labelId={`${id}-label`}
        id={id}
        name={name}
        value={value || defaultValue}
        onChange={onChange}
      >
        <MenuItem value="">Select Status</MenuItem>
        {options.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.text}
          </MenuItem>
        ))}
      </Select>
      {errors && errors[name] && (
        <FormHelperText error>{errors[name].message}</FormHelperText>
      )}
    </FormControl>
  );
};