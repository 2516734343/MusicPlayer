(function ($,root) {
    function Control(len){
        this.len = len;
        this.index = 0;
    }
    Control.prototype = {
        prev:function () {
            // if (this.index == 0){
            //     this.index = len - 1;
            // } else{
            //     this.index --;
            // }
            return this.getIndex(-1);
        },
        next:function () {
            // if (this.index == len -1){
            //     this.index = 0;
            // } else{
            //     this.index ++;
            // }
            return this.getIndex(1);
        },
        getIndex:function (val) {
            //当前索引值
            var index = this.index;
            var len = this.len;
            this.index = (index + val + len) % len;
            //改变后的索引
            return this.index;
        }
    }

    root.controlIndex = Control;
})(window.Zepto,window.player || (window.player = {}))