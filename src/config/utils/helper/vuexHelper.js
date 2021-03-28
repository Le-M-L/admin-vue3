import store from '@/store';

export function hotModuleUnregisterModule(name) {
  // if (!name || !import.meta.hot) return;
  if (!name) return;
  if (store.state[name]) {
    store.unregisterModule(name);
  }
}
