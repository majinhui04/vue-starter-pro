module.exports = [
    {
        path: '/dashboard',
        meta: {
            title: '控制面板',
            icon: 'example2',
        },
    },
    {
        path: '/demo',
        meta: {
            title: '组件使用案例',
            icon: 'el-icon-date',
        },
        alwaysShow: true,
        children: [
            {
                path: '/demo/form',
                meta: {
                    title: '表单',
                },
            },
            {
                path: '/demo/table',
                meta: {
                    title: '表格',
                },
            },
        ],
    },
]
