import { useEffect, useState } from 'react';
import { CaseService } from '../../data/services/case.service';
import { ReactHookFormSelect } from './ReactHookFormSelect';

export const CaseStatusSelect = ({
  name,
  errors,
  sm = 12,
  size = 'small',
  disabled = false,
  value,
  onChange,
}) => {
  const [options, setOptions] = useState([]);

  useEffect(() => {
    CaseService.getCaseStatusOptions()
      .then((data) => {
        console.log('Case Status Options => ', data);
        if (Array.isArray(data)) {
          const temp = data.map((d) => ({
            value: d.status,
            text: d.text,
          }));
          setOptions(temp);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <ReactHookFormSelect
      id={`case-status-select-${Math.random()}`}
      name={name}
      errors={errors}
      label="Choose Case Status"
      options={options}
      sm={sm}
      disabled={disabled}
      defaultValue=""
      size={size}
      value={value}
      onChange={onChange}
    />
  );
};