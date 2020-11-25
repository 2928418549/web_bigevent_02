$(function(){
    $('#link_reg').on('click',function(){
        $('#form-login').hide()
        $('#form-reg').show()
    })
    $('#link_login').on('click',function(){
        $('#form-login').show()
        $('#form-reg').hide()
    })
    var form = layui.form
    form.verify({
        pwd: [
            /^[\S]{6,12}$/
            ,'密码必须6到12位，且不能出现空格'
          ] ,
        repwd:function(value){
            var pwd = $('#form-reg [name="password"]').val()
            if(pwd !== value){
                return '两次输入不一致'
            }
        }
    })
    $('#form-reg').on('submit',function(e){
        e.preventDefault()
        $.ajax({
            method:'POST',
            url:'/api/reguser',
            data:{
                username:$('#form-reg [name=username]').val(),
                password:$('#form-reg [name=password]').val()
            },
            success:function(res){
                if(res.status!==0){
                    console.log(res);
                    return layer.msg(res.message)
                }
                layer.msg('注册成功')
                $('#link_login').click()
            }
        })
    })
    $('#form-login').on('submit',function(e){
        e.preventDefault()
        $.ajax({
            method:"POST",
            url:'/api/login',
            data:$(this).serialize(),
            success:function(res){
                if(res.status !== 0){
                    return layer.msg(res.message)
                }
                localStorage.setItem('token',res.token)
                location.href ="/index.html"
            }
        })
    })
})