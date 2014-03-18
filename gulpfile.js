var gulp = require('gulp')
  , concat = require('gulp-concat')
  , uglify = require('gulp-uglify');

gulp.task('concat', function () {
  gulp.src([
    'js/wordcount.js'
  , 'js/initialize.js'
  ])
    .pipe(uglify())
    .pipe(concat('wordcount.min.js'))
    .pipe(gulp.dest('js'));
});

gulp.task('watch', function () {
  gulp.watch(['js/**', '!js/wordcount.min.js'], ['concat']);
});
