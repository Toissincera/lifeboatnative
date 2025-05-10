import { YesNoOptionCode } from './form-data.util'
import { RadioGrid } from './RadioGrid'

export const YesNoRadioGroup = (props) => {
  return <RadioGrid {...props} options={YesNoOptionCode} />
}
