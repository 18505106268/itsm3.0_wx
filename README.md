# ITSM3.0 微信端

注明页面制作注意事项

 基础 				| 网址
-----------	|----------------------
 登录页面 		| http://localhost:8080/#/login
 系统首页 		| http://localhost:8080/#/home
 Webfont 		| https://www.iconfont.cn/

### 新增清单

 第一层 			| 第二层 				| 第三层 		| 网址
----------------|-----------------------|---------------|-------------
 登录 		    |  			            | 				| http://localhost:8080/#/login
 忘记密码 		|  			            | 				| http://localhost:8080/#/find
 验证并重置 		|  			            | 				| http://localhost:8080/#/check
 首页 		    |  			            | 				| http://localhost:8080/#/home

### 编辑备忘录

1. 公用scss文件
	+ src/assets/styles/global.scss

2. 公用组件文件夹
	+ src/components

3. 公用路由配置文件
	+ src/config/routes.js
    + src/config/router.js
    
4. 全局api文件
	+ src/model/client.model.js

5. 公用域名配置文件
	+ src/util/parameters.js

### 网站地图

+ 📦 登录 `login`

+ 📦 首页 `home`

+ 📦 忘记密码 `find`
    + 📦 验证并重置 `check`

### 变量命名

+ 小写开头
+ 驼峰式命名
+ 尽量减少使用下划线

### JS 规范

+ 使用 === 和 !== 包含类别判断

```javascript
  if (this.serveCode === this.code) {}
  
  if (this.serveCode !== this.code) {}
```

### HTML 格式參考

+ HTML加入区块注解,提高可维护性

```html
    <div id="login" :style="{height: `${height}px`}">
        <!--Title Start-->
        <div class="title">
          欢迎来到云惠ITSM
        </div>
        <!--Title End-->
    
        <!--Form Start-->
        <div class="form">
          
        </div>
        <!--Form End-->
    
        <!--Button Start-->
        <div class="sign-in">
        
        </div>
        <!-- Button End-->
    </div>
```
### Router 格式參考
```javascript
    export default [
      {
        path: '/',
        meta: {
          index: 0
        }
      },
      // 登录
      {
        name: 'login',
        path: '/login',
        component: () => import('../views/login/login.vue')
      },
      // 忘记密码
      {
        name: 'find',
        path: '/find',
        component: () => import('../views/find/find.vue')
      }
    ]
 ```     
### SCSS 格式參考

+ 字体大小使用`$font-size`变量计算
+ padding margin 等使用`$space`变量计算
+ 间距，行高，字体大小等尽量不要直接使用固定px值

```scss
    #login {
      width: 100%;
      padding: ($space * 7) ($space * 4) 0 ($space * 4);
      overflow: hidden;
      @include background-image('../../assets/imgs/bg.jpg', auto)
    }
    
    .title {
      font-size: $font-size * 1.8;
      color: $color-black;
      margin-bottom: $space * 3;
    }
    
    .form {
      font-size: $font-size;
      > div {
        padding-top: $space * 2.5;
        padding-bottom: $space * 1.2;
        display: flex;
        border-bottom: 1px solid gainsboro;
      }
      > div:nth-child(1) {
        span:nth-child(1) {
          @include center;
          color: $color-grey;
          margin-right: $space;
        }
        span:nth-child(2) {
          width: 80%;
        }
      }
    }
```
### 指令說明

+ 安装环境：`npm insatll`

+ 环境启动：`npm run dev`

+ 调试工具：`vue-devtools`

+ dist 生成：`npm run build`

### 技术栈说明

+ vue：`^2.5.17`

+ vue-router：`^3.0.1`

+ vuex：`^3.0.1`

+ vant：`^1.5.0`

+ vue-meta：`^1.5.8`

+ axios：`^0.18.0`

### 运行环境

+ node.js 10+


