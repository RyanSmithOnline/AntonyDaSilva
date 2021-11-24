const fileinclude = require('gulp-file-include');
const gulp = require('gulp');


gulp.task('watch', () => {
    gulp.series('fileinclude');
    return gulp.watch(['./src/*.html'], gulp.series('fileinclude'));
});

gulp.task('bootstrapjscopy', () => {
  return gulp.src('node_modules/bootstrap/dist/js/bootstrap.min.*')
    .pipe(gulp.dest('public/js/'))
});

gulp.task('mediacopy', () => {
  return gulp.src('./src/media/*')
    .pipe(gulp.dest('public/media/'))
});

gulp.task('fileinclude', () => {
    return gulp.src(['./src/*.html'])
      .pipe(fileinclude({
        prefix: '@@',
        basepath: '@file'
      }))
      .pipe(gulp.dest('./public/'));
});