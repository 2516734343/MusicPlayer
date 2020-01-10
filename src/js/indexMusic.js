var root = window.player;
var dataList = [];
var len = 0;
// var nowIndex = 0;
var audio = root.audioManage;
var control = null;
var timer = null;
var duration =0;
function getData(url) {
    $.ajax({
        url:url,
        type:'get',
        // dataType:'jsonp',
        success:function (data) {
            // console.log(data);
            len = data.length;
            dataList = data;
            root.render(data[0]);
            control = new root.controlIndex(len);
            audio.getAudio(data[0].audio);
            root.pro.renderAlltime(data[0].duration);
            duration = data[0].duration;
            renderList(dataList);
            bindEvent();
            touchEvent();
        },
        error:function () {
            console.log('error');
        }
    })
}
function renderList(dataList) {
    dataList.forEach(function (ele,index) {
        var li = $('<li></li>');
        $('<span>'+ ele.song +'</span>').addClass('name').appendTo(li);
        $('<span> -'+ ele.singer +'</span>').addClass('actor').appendTo(li);
        $('.list-wrapper').append(li);
    })
    $('.list-wrapper li').eq(0).find('span').addClass('green');
}
function bindEvent(){
    $('body').on('playChange',function (e,index) {
        root.render(dataList[index]);
        audio.getAudio(dataList[index].audio);
        root.pro.renderAlltime(dataList[index].duration);
        duration = dataList[index].duration;
        if (audio.status == 'play') {
            audio.play();
            $('span','.list-wrapper li').removeClass('green');
            $('.list-wrapper li').eq(index).find('span').addClass('green');
            root.pro.start(0);
            rotate(0);
        }else if(audio.status == 'pause'){
            $('.play').addClass('playing');
            audio.play();
            root.pro.start(0);
            rotate(0);
        } else{
            root.pro.update(0);//从0开始播放下一首歌曲
        }
        $('.img-box').attr('data-deg',0);
        $('.img-box').css({
            transform:'rotateZ('+ 0 + 'deg)',
            transition:'none'
        })

    })
    $('.prev').on('click',function (e) {
        // if (nowIndex == 0){
        //     nowIndex = len -1;
        // }else {
        //     nowIndex --;
        // }
        // console.log(nowIndex);
        var i = control.prev();
        $('body').trigger('playChange',i);

    })
    $('.next').on('click',function (e) {
        // if (nowIndex == len - 1){
        //     nowIndex = 0;
        // }else {
        //     nowIndex ++;
        // }
        // console.log(nowIndex);
        var i = control.next();
        // root.render(dataList[i]);
        $('body').trigger('playChange',i);
    })
    $('.play').on('click',function (e) {
        if (audio.status == 'pause'){
            audio.play();
            root.pro.start();
            var deg = $('.img-box').attr('data-deg') || 0;
            rotate(deg);
        } else{
            audio.pause();
            root.pro.stop();
            clearInterval(timer);//清除定时器，
        }
        $(this).toggleClass('playing');
    })
    //是否喜欢
    $('.like').on('click',function () {
        $(this).toggleClass('liking');
    })
    //展开播放列表
    $('.list').on('click',function () {
        $('.play-list').addClass('show');
    })
    //切换歌曲
    $('.list-wrapper li').click(function (e) {
        var index = $(this).index();
        $('span','.list-wrapper li').removeClass('green');
        $(this).find('span').addClass('green');
        $('body').trigger('playChange',index);
    })
    //点击关闭播放列表
    $('.close-btn').on('click',function () {
        $('.play-list').removeClass('show');
    })
}
function rotate(deg){
    clearInterval(timer);
    deg = parseInt(deg);
    timer = setInterval(function () {
        deg += 2;
        $('.img-box').attr('data-deg',deg);
        $('.img-box').css({
            transform:'rotateZ('+ deg + 'deg)',
            transition:'transform 0.2s linear'
        })
    },200)
}
function touchEvent(){
    var left = $('.pro-bottom').offset().left;
    var width = $('.pro-bottom').offset().width;
    $('.spot').on('touchstart',function (e) {
        root.pro.start();
    }).on('touchmove',function (e) {
        // console.log(e);
        var x = e.changedTouches[0].clientX - left;
        var per = x / width;
        if (per >= 0 && per < 1){
            root.pro.update(per);
        }
    }).on('touchend',function (e) {
        var x = e.changedTouches[0].clientX - left;
        var per = x / width;
        var curTime = per * duration;
        if (per >= 0 && per < 1){
            audio.playTo(curTime);
            audio.play();
            root.pro.start(per);//从当前进度播放
            $('.play').addClass('playing');
        }
    })
}
$(audio.audio).on('ended',function () {
    $('.next').trigger('click');
})
getData('../mock/data.json');
// getData('http://www.tsm1.cn/jmm/QQMusic/dist/mock/data.json');