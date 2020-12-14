// 定义模板
let tpl = ` export const {{apiname}} = ({{params}}) => request('{{url}}', {{{query}}}, {
    method: '{{method}}',
    body: {{body}},
  });
  `

module.exports = {
    // entry 是swagger的一个叫api-doc的接口，可以从浏览器的网络面板中查看
    entry: 'http://192.168.1.17:8088/v2/api-docs?group=grid',
    template: tpl, // 渲染的模板
    header: `import request from  '../../request'`, // 该文件需要引入的模块
    typescript: false, // 是否支持ts
    output: {
        path: './apitest',
    },
}
