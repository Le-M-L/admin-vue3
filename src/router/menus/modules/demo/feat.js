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
            {
                path: 'download',
                name: '文件下载',
                tag: {
                    dot: true,
                    type: 'warn',
                },
            },
            {
                path: 'print',
                name: '打印',
                tag: {
                    dot: true,
                    type: 'warn',
                },
            },
            {
                path: 'msg',
                name: '消息提示',
                tag: {
                    dot: true,
                    type: 'warn',
                },
            },
            {
                path: 'full-screen',
                name: '全屏',
                tag: {
                    dot: true,
                    type: 'warn',
                },
            },
        ],
    }
}
export default menu;