const { notEmpty } = require('../utils.js')

module.exports = {
    description: '生成一个单页面模块',
    prompts: [
        {
            type: 'input',
            name: 'name',
            message: '请输入组件name',
            validate: notEmpty('name'),
        },
        {
            type: 'input',
            name: 'title',
            message: '请输入路由title',
        },
        {
            type: 'checkbox',
            name: 'blocks',
            message: 'Blocks:',
            choices: [
                {
                    name: 'auth',
                    value: 'auth',
                    checked: false,
                },
                {
                    name: 'keepAlive',
                    value: 'keepAlive',
                    checked: false,
                },
            ],
            validate(value) {
                // if (value.indexOf('script') === -1 && value.indexOf('template') === -1) {
                //     return 'View require at least a <script> or <template> tag.';
                // }
                return true
            },
        },
    ],
    actions: data => {
        const name = '{{name}}'
        const title = '{{title}}' || name
        console.log(1, name)

        const actions = [
            {
                force: true,
                type: 'add',
                path: `src/views/${name}/index.vue`,
                templateFile: 'plop-templates/spa/index.hbs',
                data: {
                    name: name,
                },
            },
            {
                force: true,
                type: 'add',
                path: `src/views/${name}/router.js`,
                templateFile: 'plop-templates/route/index.hbs',
                data: {
                    name: name,
                    title: title,
                    auth: data.blocks.includes('auth'),
                    keepAlive: data.blocks.includes('keepAlive'),
                },
            },
        ]

        return actions
    },
}
