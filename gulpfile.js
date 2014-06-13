var gulp = require('gulp')
  , concat = require('gulp-concat')
  , uglify = require('gulp-uglify');

gulp.task('scripts', function () {
  gulp.src([
    'bower_components/Countable/Countable.js'
  , 'js/wordcount.js'
  , 'js/initialize.js'
  ])
    .pipe(uglify())
    .pipe(concat('wordcount.min.js'))
    .pipe(gulp.dest('js'));
});

gulp.task('watch', function () {
  gulp.watch(['js/**', '!js/wordcount.min.js'], ['concat']);
});
