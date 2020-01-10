//渲染数据 信息+图片 歌曲作者， 渲染是否喜欢
(function ($,root) {
    //为了避免调用文件时，每次都从window上拿
    //渲染图片
    function renderImg(src) {
        var img = new Image();
        img.src = src;
        img.onload = function () {
            $('.img-box img').attr('src',src);//插入歌手的的图片
            root.blurImg(img,$('body'));//根据图片高斯模糊背景
        }
    }
    //渲染歌曲信息
    function info(data){
        var str = ''
        str +=' <div class="song-name">'+ data.song + '</div>\
                    <div class="song-album">'+ data.singer + '</div>\
                   <div class="singer">'+data.album+'</div>'
        $('.song-info').html(str);
    }
    //渲染是否喜欢
    function like(isLike){
        if (isLike){
            $('.like').addClass('liking');
        } else{
            $('.like').removeClass('liking');
        }
    }
    root.render = function (data) {
        renderImg(data.image);
        info(data);
        like(data.isLike);
    }
})(window.Zepto,window.player || (window.player = {}));