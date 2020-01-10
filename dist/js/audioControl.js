(function ($,root) {
    //渲染音频
    function AudioManage(src) {
        //创建音频对象
        this.audio = new Audio();
        //音频状态
        this.status = 'pause';
    }
    AudioManage.prototype = {
        play:function(){
            this.audio.play();//音频播放
            this.status = 'play'
        },
        pause:function(){
            this.audio.pause();//音频暂停
            this.status = 'pause'
        },
        getAudio:function (src) {
            this.audio.src = src;
            this.audio.load();
        },
        playTo:function (time) {
            this.audio.currentTime = time;
        }
    }
    root.audioManage = new AudioManage();//传构造函数过去，方便其他操作
})(window.Zepto,window.player || (window.player = {}))