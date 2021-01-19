// 入口函数
$(function () {
    // 获取用于信息
    getUesrInfo();

    // 退出
    var layer = layui.layer;
    $('#btnLogout').on('click', function () {
        // 框架提供的询问框
        layer.confirm('是否确定退出?', { icon: 3, title: '提示' }, function (index) {
            // 清空本地token
            localStorage.removeItem('token');
            // 2.页面跳转
            location.href = '/login.html'
            // 关闭询问框
            layer.close(index);
        });

    })
});

// 获取用于信息在别处调用
function getUesrInfo() {
    $.ajax({
        method: 'get',
        url: '/my/userinfo',
        // headers: {
        //     // 重新登陆，以为token过期事件12小时
        //     Authorization: localStorage.getItem('token') || ''
        // },
        success: function (res) {
            // console.log(res);
            if (res.status !== 0) {
                return layui.layer.msg('获取用户信息失败！')
            }
            // 渲染用户信息和头像
            renderAvatar(res.data)
        }
    })
}

function renderAvatar(user) {
    // 1.渲染名称（nickname优先，如果没有，就用username）
    var name = user.nickname || user.username;
    // 设置欢迎的文本
    $('#welcome').html('欢迎&nbsp' + name);
    // 渲染头像
    if (user.user_pic !== null) {
        // 有头像
        $('.layui-nav-img').show().attr('src', user.user_pic);
        $('.text-avatar').hide()
    } else {
        // 没有头像
        $('.layui-nav-img').hide();
        var text = name[0].toUpperCase();//转换大写
        $('.text-avatar').show().html(text);
    }

}