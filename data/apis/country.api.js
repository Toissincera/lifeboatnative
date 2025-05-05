import { URLs } from '../../utils/path'
import { apiManager } from '../services/api.manager'

export const CountryAPI = {
  list: () => {
    const path = URLs.country.list
    return apiManager.get(path, true)
  },
}
