// 注意:每次调用$.get()或者$.post()或者$.ajax()的时候，
// 会先调用这个函数
// 在这个函数中可以拿到我们给ajax提供的配置对象
$.ajaxPrefilter(function (options) {
  options.url = 'http://api-breakingnews-web.itheima.net' + options.url
  // options.url = 'http://127.0.0.1:8082' + options.url
  // 统一为有权限的接口，设置headers请求头,只有包含/my/的接口才有权限问题所以只给这类接口加
  if (options.url.indexOf('/my/') != -1) {
    options.headers = {
      Authorization: localStorage.getItem('token') || '',
    }
  }

  // 全局统一挂载complete回调函数
  options.complete = function (res) {
    // console.log('执行了complete回调');
    // console.log(res);
    // 在complete回调函数中，可以使用res.responseJSON拿到服务器响应回来的数据
    if (
      res.responseJSON.status === 1 &&
      res.responseJSON.message === '身份认证失败！'
    ) {
      // 1.强制清空token
      localStorage.removeItem('token')
      // 2.强制跳转
      location.href = '/login.html'
    }
  }
})
