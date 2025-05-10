import { Checkbox, FormControl, FormControlLabel, Grid } from "@mui/material";
import { Controller } from "react-hook-form";
import { FieldError } from "./FieldError";

export const CheckboxGrid = ({
  name,
  label,
  control,
  setValue,
  defaultValue,
  options = [],
  errors,
  size = "small",
  horizontal = true,
  disabled = false,
  mt,
  changeFn = () => {},
  ...props
}) => {
  const labelId = `${name}-label`;
  return (
    <Grid item mt={mt} {...props}>
      <FormControl fullWidth>
        <Controller
          render={({ field }) => (
            <>
              <FormControlLabel
                disabled={disabled}
                size={size}
                aria-labelledby={`checkbox-label-${labelId}`}
                name={name}
                {...field}
                labelId={labelId}
                defaultValue={defaultValue}
                onChange={(e) => {
                  changeFn(e)
                  return field.onChange(e);
                }}
                error={errors[name] ? true : false}
                control={
                  <Checkbox
                    size={size}
                    checked={
                      field.value === undefined ? defaultValue : field.value
                    }
                    inputProps={{ "aria-label": "controlled" }}
                  />
                }
                label={label}
              />
            </>
          )}
          name={name}
          control={control}
        />
        <FieldError name={name} errors={errors} />
      </FormControl>
    </Grid>
  );
};
