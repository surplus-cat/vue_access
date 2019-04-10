/**
 * Created by WebStorm.
 * User: nirongxu
 * Date: 2018/12/15
 * Description: 文件描述
 */
import Vue from 'vue'

// 按钮权限
Vue.directive('roleBtn', {
  bind: function (el, binding) {
    let roleArr = binding.value
    let arr = []
    let userRole = JSON.parse(sessionStorage.user).data.userMenu
    userRole.reduce((a, b) => {
      if (b.children && b.children.length > 0) {
        b.children.filter(k => {
          if (k.path === roleArr[0]) {
            arr.push(k)
          }
        })
      } else {
        if (b.path === roleArr[0]) {
          arr.push(b)
        }
      }
    })

    if (!arr[0].meta.handleAuth[roleArr[1]]) {
      console.log(el.parentNode)
      // el.parentNode.removeChild(el)
      el.style.display = 'none'
    }
  }
})
export default Vue
