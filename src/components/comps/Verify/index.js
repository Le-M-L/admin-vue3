import { createAsyncComponent } from '@/config/utils/factory/createAsyncComponent';

export const BasicDragVerify = createAsyncComponent(() => import('./src/DragVerify'));
export const RotateDragVerify = createAsyncComponent(() => import('./src/ImgRotate'));
