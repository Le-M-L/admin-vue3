// Transform vue-count-to to support vue3 version

import { createAsyncComponent } from '@/config/utils/factory/createAsyncComponent';
export const CountTo = createAsyncComponent(() => import('./src/index.vue'));
