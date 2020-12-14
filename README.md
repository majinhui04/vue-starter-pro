# vue 脚手架

[![license](https://img.shields.io/badge/vue-2.6.10-brightgreen.svg)](https://github.com/vuejs/vue)

🚀 基于@vue/CLI3 构建的前后端分离项目

## 说明

todo

### 特性

-   基于`@vue/cli3`
-   CSS 预编译语言：[less](http://lesscss.org/)，全局样式初始化
-   ajax 封装，借助 Axios 库实现 http 请求
-   vue-router 封装；懒加载、拦截
-   基于 plop 实现组件模板化开发
-   封装了`sharegood-ui`的 pc 端通用组件
-   数据 mock 服务
-   百度地图的封装

### 功能

todo

### 目录结构

```
├── README.md                   // help
├── .vscode                     // 编辑器配置
├── plop-templates              // 路由和组件模板
├── public                      // 静态资源
├── src                         // 开发
│   ├── api                     // api请求
│   ├── assets                  // 静态资源
│   ├── components
│   │   ├── BaseXxx.vue         // 非业务通用组件
│   │   │── TheXxx.vue          // 单例组件
│   │   │── ExXxx.vue           // 扩展/包装第三方开源组件或内部公共库组件
│   │   │── XxxXxx.vue
│   │   │── ComponentExamples   // 非单例公共组件需要在这里写示例
│   │   │── SvgIcon             // svg-sprite 图标组件
│   │   │── directives          // 可复用的自定义指令（局部注册）
│   │   │── mixins              // 可复用的混入（局部注册）
│   ├── entry                   // 多文件入口
│   ├── injects                 // vue 全局注册 (慎用)
│   ├── libs                    // 无法使用 import 引用的类库 (只能通过全局变量引用)
│   ├── router                  // 路由
│   ├── scripts                 // 函数以及类库
│   │   ├── utils               // 通用方法
│   │   ├── constants           // 常量 (多使用 Object.freeze)
│   │   ├── http                // axios 实例
│   │   │   ├── index.js
│   │   │   ├── exShowLoading.js
│   │   │   ├── exShowErrMessage.js
│   ├── store                   // 状态管理
│   ├── styles                  // 样式管理
│   │   ├── global.less
│   │   ├── reset.less
│   │   ├── vars.less           // less 全局变量
│   ├── views                   // 单页面
│   │   ├── Xxx.vue
│   │   ├── Xxx                 // 专属模块要内聚在同一目录下
│   │   │   ├── index.vue
│   │   │   ├── router.js
│   │   │   ├── components
│   │   │   ├── assets
│   └── test.json               // 测试环境
├── tests                       // 自动化测试
├── docs                        // 文档
├── .env.development            // 开发配置
├── .env.development.local      // 本地开发配置（不提交git,需手动新建）
├── .env.production             // 生产配置
├── .env.production-stage       // 测试配置
├── .env.production-stage       // 测试配置
├── babel.config.js             // babel配置
├── plopfile.js                 // 模板配置
├── node_modules
├── package.json
├── static-server.js            // 静态资源服务 (node 运行)，通常用于预览/检查打包结果
├── vue.config.js
└── sw.config.js                // 自动生成api
```

## 上手指南

### 使用

```bash
# 初始化依赖配置
npm install

# 启动
npm start
or
npm run serve

# 新建业务
npm run new

# 打包为 prod 环境
npm run build

# 启用静态资源服务
npm run dist


# 版本号操作 major(主版本号).minor(次版本号).patch(修订号)
npm version major|minor|patch

# 检查包大小
npm run build --report

```

## 开发指南

-   [接口文档地址](http://192.168.1.17:8088/doc.html)

### commit 格式

格式`type: subject`

> 比如 feat: 新增登录模块

```javascript
;[
    'docs', // Adds or alters documentation. 仅仅修改了文档，比如README, CHANGELOG, CONTRIBUTE等等
    'chore', // Other changes that don't modify src or test files. 改变构建流程、或者增加依赖库、工具等
    'feat', // Adds a new feature. 新增feature
    'fix', // Solves a bug. 修复bug
    'merge', // Merge branch ? of ?.
    'perf', // Improves performance. 优化相关，比如提升性能、体验
    'refactor', // Rewrites code without feature, performance or bug changes. 代码重构，没有加新功能或者修复bug
    'revert', // Reverts a previous commit. 回滚到上一个版本
    'style', // Improves formatting, white-space. 仅仅修改了空格、格式缩进、都好等等，不改变代码逻辑
    'test', // Adds or modifies tests. 测试用例，包括单元测试、集成测试等
]
```

### 环境全局变量

```bash
#
# 编译时可用的：process.env.*
# 运行时可用的：process.env.NODE_ENV、process.env.BASE_URL、process.env.VUE_APP_*
#
# BASE_URL 需要尾斜杠，接口前缀不需要尾斜杠
# BASE_URL 可以为空，详情：https://cli.vuejs.org/zh/config/#publicpath
#

# 打包模式
NODE_ENV = production
# 打包对应的环境 test 表示测试环境
VUE_APP_ENV = test
# 项目根路径
BASE_URL = '/'
# 后端接口服务地址
VUE_APP_BASEURL_API = http://192.168.1.17:8088
# 是否开启mock
VUE_APP_MOCK = false


```

## 发布部署

todo

### 环境要求

-   node 10.28+
-   git 2+

### nginx 配置

nginx/1.19.2

```
server {
        listen       9000;
        server_name  localhost;
        location /api {
            proxy_pass http://192.168.1.17:8088/;
        }

        location / {

            root  /webapp/web-admin-jxhn/dist;
            index  index.html;
            try_files $uri $uri/ /index.html;

            # 首页禁止缓存
            if ($request_filename ~ .*\.(htm|html)$) {
                add_header Cache-Control "no-cache,no-store";
            }
            # 静态资源默认缓存14天
            if ($request_filename ~ .*\.(js|css|png|jpg)$) {
                expires 336h;
            }
        }

        error_page   500 502 503 504  /50x.html;
        location = /50x.html {
            root   html;
        }

    }
```

### 构建命令

#### 测试环境

分支： `develop`

> 目标文件夹 `dist`

```bash
npm install
npm run build:test
```

#### 生产环境

```bash
npm install
npm run build
```

## 参考资料

### 依赖包说明

-   `commander` 一款重量轻，表现力和强大的命令行框架
-   `chalk` 用于打印彩色的信息
-   `boxen` 创建小“面板”
-   `inquirer` 交互式命令行用户界面的集合
-   `ora` 用于创建 spinner，添加下载模板 loading 效果
-   update-notifier 用于检查包的线上版本与本地版本
-   download-git-repo 从节点下载并提取 git 存储库

### 文档地址

-   [vue-cli](https://cli.vuejs.org/zh/)

### 开发相关插件/工具

-   VSCode 相关插件
    -   必要插件
        -   `ESLint`
        -   `Vetur`
        -   `Prettier - Code formatter`
        -   `path Autocomplete`
    -   推荐插件
        -   `stylelint`
        -   `vscode-element-helper` (element-ui 专用)
        -   `Debugger for Chrome`
        -   `GitLens -- Git supercharged`
-   Chrome 相关插件
    -   必要插件
        -   `vue-devtools`
    -   推荐插件
        -   `json-formatter`
-   其它工具
    -   推荐：`Postman` 或 `Postwoman`
