export default file => {
  return map[file] || null
}

const view = name => resolve => require([`../views/${name}`], resolve)

const map = {
  HomeMain: require('@/views/index/mainIndex.vue').default,
  NotFound: require('@/page404').default,
  Layout: require('@/views/layout/layout').default,
  AddArticle: view('article/addArticle'),
  AddArticleEditor: view('article/addArticleEditor'),
  Icon: view('icon/index'),
  Transfer: view('transfer/transfer'),
  DataTable: view('table/dataTables'),
  FilterTable: view('table/filterTable'),
  DragTable: view('table/dragTabe')
}
