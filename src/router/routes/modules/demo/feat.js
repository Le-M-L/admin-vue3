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
        {
            path: 'download',
            name: '文件下载',
            component: () => import('@/views/demo/feat/download/index.vue'),
            meta: {
                title: '文件下载',
            },
        },
        {
            path: 'print',
            name: '打印',
            component: () => import('@/views/demo/feat/print/index.vue'),
            meta: {
                title: '打印',
            },
        },
        {
            path: 'msg',
            name: '消息提示',
            component: () => import('@/views/demo/feat/msg/index.vue'),
            meta: {
                title: '消息提示',
            },
        },
        {
            path: 'full-screen',
            name: '全屏',
            component: () => import('@/views/demo/feat/full-screen/index.vue'),
            meta: {
                title: '全屏',
            },
        },
    ]
}
export default feat;