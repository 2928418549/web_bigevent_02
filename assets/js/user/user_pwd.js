$(function(){
    var form = layui.form
    form.verify({
        pwd: [
            /^[\S]{6,12}$/
            ,'密码必须6到12位，且不能出现空格'
          ] ,
        nickname:function(value){
            if(value===$('.layui-form [name="oldPwd"]').val()){
                return '新密码不能和旧密码一致'
            }
        },
        repwd:function(value){
            if(value!==$('[name="newPwd"]').val()){
                return '两次输入不一致'
            }
        }
    })
    $('.layui-form').on('submit',function(e){
        e.preventDefault()
        $.ajax({
            method:'POST',
            url:'/my/updatepwd',
            data:$(this).serialize(),
            success:function(res){
                if(res.status!==0){
                    return layer.msg('更新失败')
                }
                layer.msg('更新成功')
                $('.layui-form')[0].reset()
            }
        })
    })
})