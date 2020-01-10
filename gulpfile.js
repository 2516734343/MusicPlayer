var gulp = require('gulp');

//gulp插件应用
//压缩html
var htmlClean = require('gulp-htmlclean');
//压缩图片
var imageMin = require('gulp-imagemin');
//压缩js
var uglify = require('gulp-uglify');
//去掉js中的调试语句
var debug = require('gulp-strip-debug');
//将less转换成css
var less = require('gulp-less');
//压缩css
var cleanCss = require('gulp-clean-css');
//添加css3的前缀  postcss autoprefixer
var postCss = require('gulp-postcss');
var autoPrefixer = require('autoprefixer');
//开启服务器
var connect = require('gulp-connect');

var concat = require("gulp-concat");

var folder = {
    src:'src/',
    dist:'dist/'
}
//判断当前环境变量
var devMod = process.env.NODE_ENV == "development"
// console.log(devMod);
// 设置环境变量 export NODE_ENV=development
gulp.task('html',function () {
   var page = gulp.src(folder.src + 'html/*')
        .pipe(connect.reload());
        if(!devMod){//非开发环境下
            page.pipe(htmlClean ())//压缩html
        }
        page.pipe(gulp.dest(folder.dist + 'html/'))
})
gulp.task('image',function () {
    gulp.src(folder.src + 'image/*')
        .pipe(imageMin())//压缩图片
        .pipe(gulp.dest(folder.dist + 'image/'))
})
gulp.task('css',function () {
   var page = gulp.src(folder.src + 'css/*')
        .pipe(connect.reload())
        .pipe(less())//将less转换为css
        .pipe(postCss([autoPrefixer()]))//添加前缀
        if(!devMod){//非开发环境下
            page.pipe(cleanCss())//压缩css
        }
        page.pipe(gulp.dest(folder.dist + 'css/'))
})
gulp.task('js',function () {
    var page = gulp.src(folder.src + 'js/*')
        .pipe(connect.reload())
        if(!devMod){//非开发环境下
            page.pipe(debug())//去掉调试语句
            page.pipe(uglify())//压缩js文件
        }
        page.pipe(gulp.dest(folder.dist + 'js/'))
})
//服务器
gulp.task('server',function () {
    connect.server({
        port:'8081',
        livereload:true
    });
})
//监听文件变化
gulp.task('watch',function () {
    gulp.watch(folder.src + "html/*",["html"]);
    gulp.watch(folder.src + "image/*",["image"]);
    gulp.watch(folder.src + "css/*",["css"]);
    gulp.watch(folder.src + "js/*",["js"]);
})
gulp.task("default",["html","image","css","js","server","watch"]);

// less--自动添加css3前缀--->压缩--->css文件

// gulp.src()
// gulp.dest()
// gulp.task()
// gulp.watch()

// runner task ----gulp
// module bundle ---webpack