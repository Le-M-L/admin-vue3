// @ts-nocheck
import { LAYOUT, getParentLayout } from '@/router/constant';
import { RoleEnum } from '@/config/enums/roleEnum';
const permission = {
    path: '/permission',
    name: '权限管理',
    component: LAYOUT,
    redirect: '/permission/front/page',
    meta: {
        icon: '',
        title: '权限管理',
    },
    children: [
        {
            path: 'front',
            name: '基于前端权限',
            component: getParentLayout('PermissionFrontDemo'),
            meta: {
                title: '基于前端权限',
            },
            children: [
                {
                    path: 'page',
                    name: '页面权限',
                    component: () => import('@/views/demo/permission/front/index.vue'),
                    meta: {
                        title: '页面权限',
                    },
                },
                {
                    path: 'btn',
                    name: '按钮权限',
                    component: () => import('@/views/demo/permission/front/Btn.vue'),
                    meta: {
                        title: '按钮权限',
                    },
                },
                {
                    path: 'auth-pageA',
                    name: '测试权限A',
                    component: () => import('@/views/demo/permission/front/AuthPageA.vue'),
                    meta: {
                        title: '测试权限A',
                        roles: [RoleEnum.SUPER],
                    },
                },
                {
                    path: 'auth-pageB',
                    name: '测试权限B',
                    component: () => import('@/views/demo/permission/front/AuthPageB.vue'),
                    meta: {
                        title: '测试权限B',
                        roles: [RoleEnum.TEST],
                    },
                },
            ]
        }
    ]
}

export default permission