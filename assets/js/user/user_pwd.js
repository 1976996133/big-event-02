$(function () {//入口函数

    // 定义检验规则
    var form = layui.form
    form.verify({
        // 1.密码
        pwd: [
            /^[\S]{6,12}$/
            , '密码必须6~12位,且不能出现空格'
        ],
        // 2.新旧不重复
        samePwd: function (value) {
            if (value == $('[name=oldPwd]').val()) {
                return "新密码不能和原密码相同"
            }
        },
        // 3.两次新密码必须相同
        rePwd: function (value) {
            if (value !== $('[name=newPwd]').val()) {
                return "两次输入不一致!"
            }
        },
    }),

        // 表单提交 
        $('.layui-form').on('submit', function (e) {
            // 阻止默认行为
            e.preventDefault();
            $.ajax({
                method: "POST",
                url: "/my/updatepwd",
                data: $(this).serialize(),
                success: function (res) {
                    // 修改失败
                    if (res.status !== 0) {
                        return layui.layer.msg('更新密码失败!')
                    }
                    // 修改成功
                    layui.layer.msg('修改密码成功');
                    // 重置表单
                    $('.layui-form')[0].reset();
                }
            })
        })
})