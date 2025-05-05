import { URLs } from '../../utils/path'
import { apiManager } from '../services/api.manager';

export const CityAPI = {
  get: (stateId) => {
    const params = new URLSearchParams();
    params.append('state_id', stateId);
    const path = URLs.city.get + '?' + params.toString();
    return apiManager.get(path, true)
  },
}
