module.exports = [
    {
        path: '/dashboard',
        meta: {
            title: '首\u2002\u2002\u2002页',
            icon: 'iconfont iconshouye',
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
    {
        path: '/system',
        meta: {
            title: '系统管理',
            icon: 'el-icon-date',
        },
        alwaysShow: true,
        children: [
            {
                path: '/system/role',
                meta: {
                    title: '角色管理',
                },
            },
            {
                path: '/system/role1',
                meta: {
                    title: '角色管理111',
                },
            },
        ],
    },
]
