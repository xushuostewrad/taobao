var gulp  = require('gulp');
let cleanCSS = require('gulp-clean-css');
var minifyjs = require('gulp-js-minify');
const imagemin = require('gulp-imagemin');
var connect = require('gulp-connect');
gulp.task('html',function(){
     var options = {
        collapseWhitespace:true,
        collapseBooleanAttributes:true,
        removeComments:true,
        removeEmptyAttributes:true,
        removeScriptTypeAttributes:true,
        removeStyleLinkTypeAttributes:true,
        minifyJS:true,
        minifyCSS:true   
    };
gulp.src('app/*.html')
           .pipe(htmlmin(options))
           .pipe(gulp.dest('dest'));   
});
gulp.task('miniCss',function(){
       gulp.src('app/**/*.css')
      .pipe(cleanCSS({compatibility: 'ie8'}))
      .pipe(gulp.dest('dist'));
  });
  gulp.task('minify-js', function(){
    gulp.src('app/**/*.js')
      .pipe(minifyjs())
      .pipe(gulp.dest('dist2'));
  });
  gulp.task('default', () =>
    gulp.src('src/images/*')
        .pipe(imagemin())
        .pipe(gulp.dest('dist/images'))
);
gulp.task('default', ['allFile','connect','watch']);
gulp.task('allFile', function() {
    gulp.src('app/**/*')
    .pipe(gulp.dest('dist'))
    .pipe(connect.reload());
  });
  gulp.task('watch', function () {
    gulp.watch(['app/**/*'], ['allFile']);
  });
  gulp.task('connect', function() {
    connect.server({
      root: 'dist',
      livereload: true,
      port: 7878
    });
  });

 gulp.task('all', ['allFile', 'connect', 'watch']);
