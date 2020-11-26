$(function(){
    getUserInfo()
    $('#logout').on('click',function(){
        layer.confirm('是否退出?', {icon: 3, title:'提示'}, function(index){
            //do something
            localStorage.removeItem('token')
            location.href ="/login.html"
            layer.close(index);
          });
    })
})
function getUserInfo(){
    $.ajax({
        url:'/my/userinfo',
        // headers:{
        //     Authorization:localStorage.getItem('token') || ''
        // },
        success:function(res){
            if(res.status !==0){
                return layer.msg(res.message)
            }
            renderAvatar(res.data)
        }
    })
}
function renderAvatar(user){
    var name = user.nickname || user.username
    $('#welcome').html('欢迎'+name)
    if(user.user_pic!==null){
        $('.layui-nav-img').attr('src',user.user_pic).show()
        $('.text-avatar').hide()
    }else{
        $('.layui-nav-img').hide()
        var fiset = name[0].toUpperCase()
        $('.text-avatar').html(fiset)
    }
}