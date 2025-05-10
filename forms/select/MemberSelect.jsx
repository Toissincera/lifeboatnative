import { useEffect, useState } from 'react';
import { MemberService } from '../../data/services/member.service';
import { ReactHookFormSelect } from '../../components/forms';

export const MemberSelect = ({
  name,
  errors,
  sm = 12,
  size = 'small',
  label = 'Case Assignee',
  disabled = false,
  value,
  control,
  onChange,
}) => {
  const [options, setOptions] = useState([]);

  useEffect(() => {
    MemberService.getAll()
      .then((data) => {
        console.log('Members => ', data);
        if (Array.isArray(data)) {
          const temp = data.map((d) => ({
            value: d.id,
            text: d.name,
          }));
          setOptions(temp);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <ReactHookFormSelect
      id={`member-select-${Math.random()}`}
      name={name}
      errors={errors}
      label={label}
      options={options}
      control={control}
      sm={sm}
      disabled={disabled}
      defaultValue=""
      size={size}
      value={value}
      onChange={onChange}
    />
  );
};