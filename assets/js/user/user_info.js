$(function () {
    var form = layui.form;
    var layer = layui.layer;
    form.verify({
        nickname: function (value) {
            if (value.length > 6) {
                return '昵称长度必须在1~6个字符之间';
            }
        }
    })
    initUserInfo();
    // 初始化用户的基本信息
    function initUserInfo() {
        $.ajax({
            method: 'GET',
            url: '/my/userinfo',
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('获取用户信息失败!');
                }
                // console.log(res);
                // 调用form.val快速为表单赋值，要先拿到赋值的数据对象，然后将对象属性赋值给对应的表单项
                form.val('formUserInfo', res.data);
            }
        })
    }
    // 重置表单的数据
    $('#btnReset').on('click', function (e) {
        // 阻止表单的默认提交行为
        e.preventDefault();
        // 重新重置一下用户的默认信息重新赋值给表单
        initUserInfo();
    })
    $('.layui-form').on('submit', function (e) {
        // 阻止表单的默认提交行为
        e.preventDefault();
        $.ajax({
            method: 'POST',
            url: '/my/userinfo',
            // 这一行的功能就是将form表单中提交的数据序列化成一字符串用作请求数据的data
            // id,nickname,email
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('修改用户信息失败!');
                }
                layer.msg('修改用户信息成功');
                // 调用父页面中的方法，重新渲染用户头像和用户的信息
                // 这里的window就代表iframe的子窗口,parent就代表我们的父页面
                window.parent.getUserinfo();
            }
        })
    })
})