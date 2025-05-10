import { useEffect, useState } from 'react'
import { StateService } from '../../data/services/state.service'
import { ReactHookFormSelect } from '../../components/forms'

export const StateSelect = ({
  name,
  errors,
  control,
  setValue,
  xs = 12,
  size = 'small',
  countryId,
  disabled = false,
  onChange = () => {}
}) => {
  const [options, setOptions] = useState([])

  useEffect(() => {
    if (countryId) {
      StateService.get(countryId)
        .then(({ data }) => {
          console.log('State Data => ', data)
          if (Array.isArray(data)) {
            const temp = data.map((d) => ({
              value: d.id,
              text: d.state,
            }))
            setOptions(temp)
          }
        })
        .catch((err) => console.log(err))
    } else {
      setOptions([])
    }
  }, [countryId])

  return (
    <ReactHookFormSelect
      id={`state-type-select-${Math.random()}`}
      name={name}
      errors={errors}
      label='State'
      control={control}
      setValue={setValue}
      options={options}
      xs={xs}
      disabled={disabled}
      defaultValue=''
      size={size}
      onChange={onChange}
    />
  )
}
