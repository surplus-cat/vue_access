// const view = name => require(`@/views/${name}`)

// const view = name => () => import(`@/views/${name}`).then(m => m.default)

// const view = (AsyncView) => ({
//   // 需要加载的组件 (应该是一个 `Promise` 对象)
//   component: AsyncView,
//   // 异步组件加载时使用的组件
//   //loading: LoadingComponent,
//   // 加载失败时使用的组件
//   //error: ErrorComponent,
//   // 展示加载时组件的延时时间。默认值是 200 (毫秒)
//   delay: 200,
//   // 如果提供了超时时间且组件加载也超时了，
//   // 则使用加载失败时使用的组件。默认值是：`Infinity`
//   timeout: 3000
// })

// const view = name = resolve => require.ensure([], () => resolve(require(`${name}`)), 'thunk')

// const view = name => require.ensure([`./views/${name}`], function(require) {
//   require(`./views/${name}`);
// });

const view = name => resolve => require([`../views/${name}`], resolve)
// const view = name => () => import(/* webpackChunkName: "index" */ `@/views/${name}`)

export default {
  Common: {
    // UpdatePassword: r => require.ensure([], () => r(require('../../vue/pages/users/UpdatePassword')), 'users'),
    HomeMain: require('@/views/index/mainIndex.vue').default,
    NotFound: require('@/page404').default,
    Layout: require('@/views/layout/layout').default
  },
  func: {
    AddArticle: view('article/addArticle'),
    AddArticleEditor: view('article/addArticleEditor'),
    Icon: view('icon/index'),
    Transfer: view('transfer/transfer'),
    DataTable: view('table/dataTables'),
    FilterTable: view('table/filterTable'),
    DragTable: view('table/dragTabe')
  }
}

/*
  {
  "data": {
    "userMenu": [
      {
        "path": "/",
        "redirect": "/index",
        "hidden": true,
        "children": []
      },
      {
        "path": "/index",
        "iconCls": "fa fa-dashboard",
        "name": "首页",
        "component": "Common.Layout",
        "alone": true,
        "children": [
          {
            "path": "/index",
            "iconCls": "fa fa-dashboard",
            "name": "主页",
            "component": "Common.HomeMain",
            "children": [],
            "display": true
          }
        ]
      },
      {
        "path": "/",
        "iconCls": "el-icon-tickets",
        "name": "文章管理",
        "component": "Common.Layout",
        "children": [
          {
            "path": "/addArticle",
            "iconCls": "el-icon-edit-outline",
            "name": "发布文章",
            "component": "func.AddArticle",
            "children": [],
            "display": false
          },
          {
            "path": "/addArticleEditor",
            "iconCls": "el-icon-edit-outline",
            "name": "发布文章-富文本",
            "component": "func.AddArticleEditor",
            "children": [],
            "display": true
          }
        ]
      },
      {
        "path": "/",
        "iconCls": "fa fa-paw",
        "name": "图标",
        "component": "Common.Layout",
        "children": [
          {
            "path": "/icon",
            "iconCls": "fa fa-life-ring",
            "name": "内置图标",
            "component": "func.Icon",
            "children": [],
            "display": false
          }
        ]
      },
      {
        "path": "/",
        "iconCls": "fa fa-exchange",
        "name": "穿梭框",
        "component": "Common.Layout",
        "children": [
          {
            "path": "/transfer",
            "iconCls": "fa fa-sign-in",
            "name": "穿梭框demo",
            "component": "func.Transfer",
            "children": [],
            "display": false
          }
        ]
      },
      {
        "path": "/",
        "iconCls": "fa fa-newspaper-o",
        "name": "表格",
        "component": "Common.Layout",
        "children": [
          {
            "path": "/dataTable",
            "iconCls": "fa fa-sliders",
            "name": "多选数据表格",
            "component": "func.DataTable",
            "children": [],
            "display": false,
            "meta": {
              "handleAuth": {
                "add": false,
                "edit": true,
                "del": false
              }
            }
          },
          {
            "path": "/filterTable",
            "iconCls": "fa fa-sort-amount-asc",
            "name": "筛选表格",
            "component": "func.FilterTable",
            "children": [],
            "display": true,
            "meta": {
              "handleAuth": {
                "add": true,
                "edit": false,
                "del": false
              }
            }
          },
          {
            "path": "/dragTabe",
            "iconCls": "fa fa-hand-stop-o",
            "name": "拖拽排序",
            "component": "func.DragTable",
            "children": [],
            "display": false,
            "meta": {
              "handleAuth": {
                "add": false,
                "edit": true,
                "del": true
              }
            }
          }
        ]
      },
      {
        "path": "/404",
        "component": "Common.NotFound",
        "name": "404",
        "hidden": true,
        "children": []
      },
      {
        "path": "*",
        "redirect": "/404",
        "hidden": true,
        "children": []
      }
    ]
  }
}
*/
