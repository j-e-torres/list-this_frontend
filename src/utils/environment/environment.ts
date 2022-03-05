import { environment } from '../../environments/environment';

export function getBackendUrl() {
  // remove trailing slash
  return (environment.API || '').replace(/\/$/, '');
}
