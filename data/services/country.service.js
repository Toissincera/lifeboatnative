import { DAL_CONFIG } from './config'

export const CountryService = {
  list: () => {
    return DAL_CONFIG.country.list()
  },
}
