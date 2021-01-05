// 定义模板
let tpl = ` export const {{apiname}} = ({{params}}) => request('{{url}}', {{{query}}}, {
    method: '{{method}}',
    body: {{body}},
  });
`

let mockTPL = ` export const {{apiname}} = function(
    opts,
    query,
) {
    const { pageNum, pageSize } = query
    return mock({
        code: 2001,
        data: {{data}},
        message: '请求提示',
    })
}
`

module.exports = {
    method: 'post',
    headers: {
        // 'ssid':'123abc',
        'X-Requested-With': 'XMLHttpRequest',
        'Content-Type': 'application/json;charset=UTF-8',
        //'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
    },
    // entry 是swagger的一个叫api-doc的接口，可以从浏览器的网络面板中查看
    //entry: 'http://192.168.1.17:8088/v2/api-docs?group=grid',
    entry: 'http://192.168.1.72:9001/doc/apis/list',
    template: tpl, // 渲染的模板
    header: `import request from  '../../request'`, // 该文件需要引入的模块
    typescript: false, // 是否支持ts
    mockTPL,
    output: {
        path: './apitest',
    },
}
