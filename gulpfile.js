const gulp = require('gulp'); 
const watch = require('gulp-watch');
const sass = require('gulp-sass');

gulp.task('sass', function () {
    return gulp.src('style/*.scss')
      .pipe(sass().on('error', sass.logError))
      .pipe(gulp.dest('./style/'));
  });

gulp.task('stream', function() {
  return gulp.watch(['style/*.scss'], function() {
      gulp.start('sass');
  });
});