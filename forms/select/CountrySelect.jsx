import { useEffect, useState } from "react";
import { CountryService } from "../../data/services/country.service";
import { ReactHookFormSelect } from "../../components/forms";

export const CountrySelect = ({
  name,
  errors,
  control,
  setValue,
  xs = 12,
  size = "small",
  disabled = false,
  onChange = () => {},
}) => {
  const [options, setOptions] = useState([]);

  useEffect(() => {
    CountryService.list()
      .then((data) => {
        let countries = data.data
        console.log("Country data => ", countries);
        if (Array.isArray(countries)) {
          const temp = countries.map((d) => ({ value: d.id, text: d.country }));
          setOptions(temp);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <ReactHookFormSelect
      id="country-type-select"
      name={name}
      errors={errors}
      label="Country"
      control={control}
      setValue={setValue}
      options={options}
      defaultValue=""
      disabled={disabled}
      xs={xs}
      size={size}
      onChange={onChange}
    />
  );
};
