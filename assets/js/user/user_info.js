$(function () {
    var form = layui.form
    form.verify({
        nickname: function (value) {
            if (value.length > 6) {
                return '1-6个字符'
            }
        }
    })
    initUserInfo()

    function initUserInfo(){
        $.ajax({
            method:"GET",
            url:'/my/userinfo',
            success:function(res){
                if(res.status!==0){
                    return layer.msg(res.message)
                }
                form.val("formUserinfo",res.data)
            }
        })
    }
    $('#btnReset').on('click',function (e) {
        e.preventDefault()
        initUserInfo()
    })
    $('.layui-form').on('submit',function (e) {
        e.preventDefault()
        $.ajax({
            method:'POST',
            url:'/my/userinfo',
            data:$(this).serialize(),
            success:function (res) {
                if(res.status!==0){
                    return layer.msg(res.message)
                }
                layer.msg('更新成功')
                window.parent.getUserInfo()
            }
        })
    })
})