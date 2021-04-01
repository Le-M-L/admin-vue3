const menu = {
    orderNo: 3,
    menu: {
        name: '权限管理',
        path: '/permission',
        children: [
            {
                path: 'front',
                name: '基于前端权限',
                children: [
                    {
                        path: 'page',
                        name: '页面权限',
                    },
                    {
                        path: 'btn',
                        name: '按钮权限',
                    },
                    {
                        path: 'auth-pageA',
                        name: '测试权限A',
                    },
                    {
                        path: 'auth-pageB',
                        name: '测试权限B',
                    },
                ],
            },
        ]
    }
}
export default menu;