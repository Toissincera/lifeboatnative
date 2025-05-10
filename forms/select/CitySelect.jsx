import { useEffect, useState } from 'react'
import { ReactHookFormSelect } from '../../components/forms'
import { CityService } from '../../data/services/city.service'

export const CitySelect = ({
  name,
  errors,
  control,
  setValue,
  xs = 12,
  size = 'small',
  stateId,
  disabled = false,
}) => {
  const [options, setOptions] = useState([])

  useEffect(() => {
    if (stateId) {
      CityService.get(stateId)      
        .then(({ data }) => {
          console.log('City Data => ', data)
          if (Array.isArray(data)) {
            const temp = data.map((d) => ({
              value: d.id,
              text: d.city,
            }))
            setOptions(temp)
          }
        })
        .catch((err) => console.log(err))
    } else {
      setOptions([])
    }
  }, [stateId])

  return (
    <ReactHookFormSelect
      id={`city-type-select-${Math.random()}`}
      name={name}
      errors={errors}
      label='City'
      control={control}
      setValue={setValue}
      options={options}
      xs={xs}
      disabled={disabled}
      defaultValue=''
      size={size}
    />
  )
}
