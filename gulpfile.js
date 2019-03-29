const gulp = require('gulp'); 
const watch = require('gulp-watch');
const sass = require('gulp-sass');
const minify = require('gulp-minify');

gulp.task('sass', function () {
    return gulp.src(['style/*.scss'])
      .pipe(sass().on('error', sass.logError))
      .pipe(gulp.dest('./style/'));
});

gulp.task('demo', function () {
    return gulp.src(['demo/*.scss'])
      .pipe(sass().on('error', sass.logError))
      .pipe(gulp.dest('./demo'));
  });

gulp.task('stream', function() {
  gulp.start('sass');
  gulp.start('compress');
  return gulp.watch(['style/*.scss','demo/*.scss','src/script.js'], function() {
      gulp.start('sass');
      gulp.start('demo');
      gulp.start('compress');
  });
});

gulp.task('compress', function() {
  gulp.src(['src/script.js'])
    .pipe(minify())
    .pipe(gulp.dest('dist'))
});