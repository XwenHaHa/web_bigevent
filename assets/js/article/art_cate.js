$(function () {
    initArtCateList();
    var layer = layui.layer;
    var form = layui.form;
    // 获取文章分类的列表
    function initArtCateList() {
        $.ajax({
            method: 'GET',
            url: '/my/article/cates',
            success: function (res) {
                // 把res给模板那么我们在模板中就可以拿到这个数据
                var htmlstr = template('tpl-table', res);
                $('tbody').html(htmlstr);
            }
        })
    }
    var indexAdd = null;
    // 为添加类别按钮绑定一个点击事件
    $('#btnAddCate').on('click', function () {
        indexAdd = layer.open({
            type: 1,
            area: ['500px', '250px'],
            title: '添加文章分类',
            content: $('#dialogAdd').html()
        });
    })
    // 由于当前的form不是写死在html页面中的，使我们通过js动态添加的
    // 这里我们需要通过代理的方式为form-add表单绑定submit事件
    // 给body绑定一个点击事件代理到form上
    $('body').on('submit', '#formadd', function (e) {
        e.preventDefault();
        $.ajax({
            method: 'POST',
            url: '/my/article/addcates',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    layer.msg('新增文章分类失败！');
                }
                initArtCateList();
                layer.msg('新增文章分类成功！');
                // 根据索引关闭弹出层
                console.log(indexAdd);
                layer.close(indexAdd);
            }
        })
    })
    var indexEdit = null;
    // 通过代理的方式为编辑按钮绑定submit事件
    $('tbody').on('click', '.btn-edit', function (e) {
        e.preventDefault();
        indexEdit = layer.open({
            type: 1,
            area: ['500px', '250px'],
            title: '修改文章信息',
            content: $('#dialogEdit').html()
        });
        var id = $(this).attr('data-id');
        // console.log(id);
        // 发起ajax请求获取对应框的数据
        $.ajax({
            method: 'GET',
            url: '/my/article/cates/' + id,
            success: function (res) {
                // console.log(res);
                // 调用form.val快速为表单赋值，要先拿到赋值的数据对象，然后将对象属性赋值给对应的表单项
                form.val('formedit', res.data);
            }
        })
    })
    // 通过代理的形式为修改分类的表单绑定submit事件
    $('body').on('submit', '#formedit', function (e) {
        // 阻止表单的默认提交行为
        e.preventDefault();
        // 发起ajax请求
        $.ajax({
            method: 'POST',
            url: '/my/article/updatecate',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('更新分类信息失败！');
                }
                layer.msg('更新分类信息成功！');
                layer.close(indexEdit);
                initArtCateList();
            }
        })
    })
    // 通过代理的形式为删除按钮绑定点击事件
    $('tbody').on('click', '.btn-delete', function (e) {
        var id = $(this).attr('data-id');
        // 询问是否删除
        layer.confirm('是否删除?', {
            icon: 3,
            title: '提示'
        }, function (index) {
            // 发起ajax请求
            $.ajax({
                method: 'GET',
                url: '/my/article/deletecate/' + id,
                success: function (res) {
                    if (res.status !== 0) {
                        return layer.msg('删除文章分类失败！');
                    }
                    layer.msg('删除文章分类成功！');
                    // 关闭询问框
                    layer.close(index);
                    // 重新获取一下文章列表
                    initArtCateList();
                }
            })
        });
    })
})