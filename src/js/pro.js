(function ($,root) {
    var duration = 0;
    var lastPer = 0;
    var startTime = null;
    var frameId = null;

    function renderAlltime(time) {
        duration = time;
        time = formatTime(time);
        lastPer = 0;//每次切换歌曲时，置0
        $('.all-time').html(time);
    }
    function formatTime(t) {
        t = Math.round(t);
        var m = Math.floor(t / 60);//分钟
        var s = t - m * 60;//秒
        if (m < 10){
            m  = '0' + m;
        }
        if (s < 10){
            s = '0' + s;
        }
        return m +':'+ s;
    }
    function start(p) {
        lastPer = p === undefined ? lastPer : p;//start是否传值，如果没有传值则是从0开始的，如果传值则总当前值开始
        startTime = new Date().getTime();//存储当前点击播放时的时间戳
        function frame() {
            var curTime = new Date().getTime();
            // 当前歌曲播放的总进度 = 上一段的进度 + 当前段的进度
            var per = lastPer + (curTime - startTime) / (duration * 1000);//当前播放的进度占总进度的百分比
            update(per);
            frameId = requestAnimationFrame(frame);
        }
        frame();
    }
    function stop() {
        cancelAnimationFrame(frameId);
        var curTime = new Date().getTime();
        var per = (curTime - startTime) / (duration * 1000);
        lastPer += per;
    }
    function update(per){
        var curTime = per * duration;
        curTime = formatTime(curTime);//处理时间值为分秒的形式
        $('.cur-time').html(curTime);
        var translateX = (per - 1) *100 +'%';
        $('.pro-top').css({
            transform:'translateX('+ translateX + ')'//更改进度条的位置
        })
    }
    root.pro = {
        renderAlltime :renderAlltime,
        start:start,
        stop:stop,
        update:update,

    }
})(window.Zepto,window.player || (window.player = {}))