import { URLs } from '../../utils/path'
import { apiManager } from '../services/api.manager';

export const StateAPI = {
  get: (countryId) => {
    const params = new URLSearchParams();
    params.append('country_id', countryId);
    const path = URLs.state.get + '?' + params.toString();
    return apiManager.get(path, true)
  },
}
