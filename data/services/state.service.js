import { DAL_CONFIG } from './config'

export const StateService = {
  get: (countryId) => {
    return DAL_CONFIG.state.get(countryId)
  },
}
