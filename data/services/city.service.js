import { DAL_CONFIG } from './config'

export const CityService = {
  get: (stateId) => {
    return DAL_CONFIG.city.get(stateId)
  },
}
