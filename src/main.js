// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from './btnPermission'
import ElementUI from 'element-ui'

import 'element-ui/lib/theme-chalk/index.css'
import './assets/iconfont/iconfont.css'
import 'font-awesome/css/font-awesome.css'

import App from './App.vue'
import Router from 'vue-router'
import store from './vuex'
import componentConfig from './extra/componentConfigs'
import _import from './extra/_import'
import axios from 'axios'
// import Worker from './test.worker.js';

Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.use(Router)

axios.post('https://www.easy-mock.com/mock/5c9da69927388d303f3837b7/example/login', {
  username: '1111',
  password: '1111'
}).then(res => {
  sessionStorage.user = JSON.stringify(res.data)
})
// if (!sessionStorage.user) location.href = 'http://localhost:8964/login.html'
const menu = sessionStorage.user ? JSON.parse(sessionStorage.user).data.userMenu : []

// 创建 worker 实例
// var worker = new Worker(); // 传入 worker 脚本文件的路径即可

// worker.onmessage = function (event) {
//   console.log(event.data)
// };

// worker.postMessage('11111')
// aDedicatedWorker.postMessage(menu, [menu.abBuffer]);
// worker.postMessage(JSON.stringify(menu));

// 处理数据
var newData = menu.map(v => {
  if (!v.children) return { ...v }
  return { ...v, children: v.children.filter(n => n.display) }
})

// function createWebWorker(file) {
//   let work_blob = new Blob(file);
//   let worker = new Worker(work_blob);
//   return worker;
// }

// var jsFileURI = require('');
// var worker = new Worker("./test.worker.js", { name : 'myWorker' });

// worker.postMessage({'cmd': 'average', 'data': [1, 2, 3, 4]});

// worker.onmessage = function (event) {
//   console.log('Received message ' + event.data);
// }

// worker.addEventListener('message', function(e) {
//   console.log(e.data);
// }, false);

// function assignRouter (prev, next) {
//   prev.reduce((a, b) => {
//     if (b.children && b.children.length > 0) {
//       if (b.component) {
//         let squs = Object.keys(next).findIndex(v => { return b.component.indexOf(v) > -1 })
//         let nums = Object.keys(Object.values(next)[squs]).findIndex(v => { return b.component.indexOf(v) > -1 })

//         b.component = Object.values(next)[squs][Object.keys(Object.values(next)[squs])[nums]]
//       }
//       b.children.filter(k => {
//         let index = Object.keys(next).findIndex(v => { return k.component.indexOf(v) > -1 })
//         let idx = Object.keys(Object.values(next)[index]).findIndex(v => { return k.component.indexOf(v) > -1 })

//         k.component = Object.values(next)[index][Object.keys(Object.values(next)[index])[idx]]
//       })
//     } else {
//       if (b.component) {
//         let squ = Object.keys(next).findIndex(v => { return b.component.indexOf(v) > -1 })
//         let num = Object.keys(Object.values(next)[squ]).findIndex(v => { return b.component.indexOf(v) > -1 })
//         b.component = Object.values(next)[squ][Object.keys(Object.values(next)[squ])[num]]
//       }
//     }
//   }, [])
//   return prev
// }

function assignRouter (routerlist) {
  routerlist.reduce((a, b) => {
    if (b.children && b.children.length > 0) {
      if (b.component) {
        b.component = _import(b.component)
      }
      b.children.filter(k => {
        k.component = _import(k.component)
      })
    } else {
      if (b.component) {
        b.component = _import(b.component)
      }
    }
  }, [])
  return routerlist
}

// new Login(function (err, data) {
//   if (err) {
//     // 登录出错
//   } else {
//     // 登录成功
//     init(data);
//   }
// }).init();

const init = function (data) {
  // 先配置路由信息
  // componentConfigs 是本地的组件配置
  let routes = assignRouter(data)
  console.log(routes)
  // console.log(routes)
  // 实例化路由
  let router = new Router({ routes })

  router.beforeEach((to, from, next) => {
    if (!sessionStorage.user) {
      console.log('token丢失')
      // location.href = 'http://localhost:8964/login.html'
      next()
    } else {
      next()
    }
  })
  store.commit('setRouters', routes)
  store.commit('initTab', sessionStorage.tabnavBox ? JSON.parse(sessionStorage.tabnavBox) : [
    {
      title: '主页',
      path: '/index'
    }
  ])
  // 再实例化vue
  new Vue({
    name: 'app',
    store,
    router,
    render: h => h(App)
  }).$mount('#app')
}

init(newData)
