$(function () {
    var form = layui.form;
    var layer = layui.layer;
    form.verify({
        pwd: [
            /^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'
        ],
        // 判断新密码框与旧密码框里面的值是不是一样
        samePwd: function (value) {
            if (value == $('[name=oldPwd]').val()) {
                return '新旧密码不能一致!'
            }
        },
        // 判断确认密码框跟新密码框里面的值是否一样
        rePwd: function (value) {
            if (value !== $('[name=newPwd]').val()) {
                return '两次输入的密码不一致!'
            }
        }
    })
    // 给表单绑定一个提交事件
    $('.layui-form').on('submit', function (e) {
        e.preventDefault();
        $.ajax({
            method: 'POST',
            url: '/my/updatepwd',
            // 表单快速获取信息
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('更新密码失败!');
                }
                layer.msg('更新密码成功!');
                // 重置表单只有原生的DOM才可以调用
                $('.layui-form')[0].reset();
            }
        })
    })
})