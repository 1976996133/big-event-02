// 开发环境服务器地址
var baseURL = 'http://api-breakingnews-web.itheima.net'
//拦截所有ajax请求 处理函数
$.ajaxPrefilter(function (params) {
    //拼接对应环境服务器
    // 1.添加根路径
    params.url = baseURL + params.url;

    // 2.身份认证
    if (params.url.indexOf("/my/") !== -1) {
        params.headers = {
            Authorization: localStorage.getItem('token') || ''
        }
    }
    // console.log(params);
    // 拦截所有的响应,判断身份认证信息
    params.complete = function (res) {
        console.log(res.responseJSON);
        var obj = res.responseJSON;
        if (obj.status == 1 && obj.message == "身份认证失败！") {
            // 清空本地token
            localStorage.removeItem("token");
            // 页面跳转
            location.href = "/login.html";
        }
    }


})
