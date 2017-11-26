var gulp = require('gulp');
// sass 插件var
var sass = require('gulp-sass');
// 给css3属性添加浏览器前缀插件
var autoprefixer = require('gulp-autoprefixer');

// 编译sass文件，添加css3属性浏览器前缀
gulp.task('sass', function() {
  return gulp.src('./scss/*.scss').pipe(sass()).pipe(autoprefixer()).pipe(gulp.dest('./css'));
});

// 监控任务
gulp.task('watch', ['sass'], function() {
  gulp.watch('./scss/*.scss', ['sass']);
});
