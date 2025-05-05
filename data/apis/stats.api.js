import { URLs } from '../../utils/path'
import { apiManager } from '../services/api.manager';

export const StatsAPI = {
  get: () => {
    const path = URLs.stats.get
    return apiManager.get(path, true)
  },
}
