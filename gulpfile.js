/**
 * TGUI Workflow Automation
 * 
 * Author: sonichuang
 * LastModify: 2015-12-01
 */

/*
 * Gulp Plugins
 */
var gulp      = require('gulp'),
    Promise   = require('promise'),
    del       = require('del'),
    connect   = require('gulp-connect');
    /*
    minifyCSS = require('gulp-minify-css'),
    replace   = require('gulp-replace'),
    concat    = require('gulp-concat'),
    convertEncoding = require('gulp-convert-encoding');*/

/*
 * Setting Pathsstella
 */
var paths = {
	src	: "src/",
    dist : "dist/document/html/"
};

/* ---------------------------------------------------
 * Task Gulp Connect [搭建一个localhost:8080 的服务器]
 * https://github.com/avevlad/gulp-connect
 */
gulp.task('connect', function() {
   return new Promise(function (resolve, reject) {
    connect.server({
      root: paths.src,
      livereload: true
    });
 });
});
gulp.task('reload-html', function () {
  return gulp.src([paths.src+'**/*.htm',paths.src+'**/*.html'])
    .pipe(connect.reload());
});

/* ---------------------------------------------------
 * Task Watch [CSS/JS 变更自动主让页面刷新]
 * https://github.com/floatdrop/gulp-watch
 */
gulp.task('watch-file', function () {
    return gulp.watch([paths.src+'**/*.html',paths.src+'**/*.htm', paths.src+'css/**/*.css'], gulp.parallel('reload-html'));
});


/* ---------------------------------------------------
 * Task demo Build [向/dist/document/html/ 目录输出相关文件]
 */
gulp.task('svn-clean', function(done) {
   return del([paths.dist+'**/*.*'],done);
});

gulp.task('svn-copy', function(){
  return gulp.src([paths.src+'**/*'])
    .pipe(gulp.dest(paths.dist))
});


/* ---------------------------------------------------
 * 自动化组合
 */ 
// gulp 4.0 改写
gulp.task('watch',gulp.parallel('connect','watch-file'));              //专题文件更新自动 F5 
gulp.task('build-svn',gulp.series('svn-clean','svn-copy'));








