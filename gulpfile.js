const gulp = require('gulp'); 
const watch = require('gulp-watch');
const sass = require('gulp-sass');
const minify = require('gulp-minify');

gulp.task('sass', function () {
    return gulp.src('style/*.scss')
      .pipe(sass().on('error', sass.logError))
      .pipe(gulp.dest('./style/'));
  });

gulp.task('stream', function() {
  gulp.start('sass');
  return gulp.watch(['style/*.scss'], function() {
      gulp.start('sass');
  });
});

gulp.task('compress', function() {
  gulp.src(['src/script.js'])
    .pipe(minify())
    .pipe(gulp.dest('dist'))
});