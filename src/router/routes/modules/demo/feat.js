// @ts-nocheck
import { LAYOUT } from '@/router/constant';
const feat = {
    path: '/feat',
    name: '功能Demo',
    component: LAYOUT,
    redirect: '/feat/icon',
    meta: {
        title: '功能',
    },
    children: [
        {
            path: 'ws',
            name: 'WebSocket',
            component: () => import('@/views/demo/feat/ws/index.vue'),
            meta: {
                title: 'WebSocket',
            },
        },
        {
            path: 'img-preview',
            name: '图片预览',
            component: () => import('@/views/demo/feat/img-preview/index.vue'),
            meta: {
                title: '图片预览',
            },
        },
    ]
}
export default feat;