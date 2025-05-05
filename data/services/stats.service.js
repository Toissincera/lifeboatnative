import { DAL_CONFIG } from './config'

export const StatsService = {
  get: () => {
    return DAL_CONFIG.stats.get()
  },
}
