const menu = {
    orderNo: 2,
    menu: {
        path: '/feat',
        name: '功能',
        tag: {
            dot: true,
        },
        children: [
            {
                path: 'ws',
                name: 'WebSocket',
                tag: {
                    dot: true,
                    type: 'warn',
                },
            },
            {
                path: 'img-preview',
                name: '图片预览',
                tag: {
                    dot: true,
                    type: 'warn',
                },
            },
        ],
    }
}
export default menu;