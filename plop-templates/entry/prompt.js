const { notEmpty } = require('../utils.js')

module.exports = {
    description: '生成一个入口文件',
    prompts: [
        {
            type: 'input',
            name: 'name',
            message: '请输入入口文件name，比如 "login" "order/list"等',
            validate: notEmpty('name'),
        },
        {
            type: 'input',
            name: 'title',
            message: '请输入页面title',
        },
        // {
        //     type: 'checkbox',
        //     name: 'blocks',
        //     message: 'Blocks:',
        //     choices: [
        //         {
        //             name: 'auth',
        //             value: 'auth',
        //             checked: false,
        //         },
        //         {
        //             name: 'keepAlive',
        //             value: 'keepAlive',
        //             checked: false,
        //         },
        //     ],
        //     validate(value) {
        //         // if (value.indexOf('script') === -1 && value.indexOf('template') === -1) {
        //         //     return 'View require at least a <script> or <template> tag.';
        //         // }
        //         return true
        //     },
        // },
    ],
    actions: data => {
        const name = '{{name}}'
        const title = '{{title}}'

        const actions = [
            {
                force: false,
                type: 'add',
                path: `src/entry/${name}/App.vue`,
                templateFile: 'plop-templates/entry/app.hbs',
                data: {
                    name: name,
                },
            },
            {
                force: false,
                type: 'add',
                path: `src/entry/${name}/main.js`,
                templateFile: 'plop-templates/entry/main.hbs',
                data: {
                    name: name,
                },
            },
            {
                force: false,
                type: 'add',
                path: `src/entry/${name}/config.json`,
                templateFile: 'plop-templates/entry/config.hbs',
                data: {
                    title: title,
                },
            },
            // {
            //     force: true,
            //     type: 'add',
            //     path: `src/views/${name}/router.js`,
            //     templateFile: 'plop-templates/route/index.hbs',
            //     data: {
            //         name: name,
            //         title: title,
            //         auth: data.blocks.includes('auth'),
            //         keepAlive: data.blocks.includes('keepAlive'),
            //     },
            // },
        ]

        return actions
    },
}
